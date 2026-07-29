from __future__ import annotations

import html
import base64
import hashlib
import hmac
import json
import os
import secrets
import subprocess
import threading
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote

from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, RedirectResponse


ROOT = Path(__file__).resolve().parents[1]
STATE_PATH = ROOT / "state" / "jobs.json"
SOURCE_STATS_PATH = ROOT / "state" / "source_stats.json"
OUTPUT = ROOT / "output"
LOGS = ROOT / "logs"
SETTINGS_PATH = ROOT / "config" / "settings.json"
ALLOWED_STATUSES = (
    "New",
    "Review",
    "Apply",
    "Applied",
    "Interview",
    "Rejected",
    "Ignored",
    "Manual Review",
)

app = FastAPI(
    title="Rashed Remote Job Scout",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)
run_lock = threading.Lock()
scheduler = BackgroundScheduler(timezone="Asia/Amman")


def expected_credentials() -> tuple[str, str]:
    return (
        os.environ.get("SCOUT_USER", ""),
        os.environ.get("SCOUT_PASSWORD", ""),
    )


def session_signature(payload: bytes, password: str) -> str:
    return hmac.new(password.encode("utf-8"), payload, hashlib.sha256).hexdigest()


def create_session_token(username: str, password: str) -> str:
    payload = json.dumps(
        {
            "username": username,
            "expires": (
                datetime.now(timezone.utc) + timedelta(hours=12)
            ).isoformat(),
        },
        separators=(",", ":"),
    ).encode("utf-8")
    encoded = base64.urlsafe_b64encode(payload).decode("ascii").rstrip("=")
    return f"{encoded}.{session_signature(payload, password)}"


def valid_session(request: Request) -> bool:
    token = request.cookies.get("rashed_scout_session", "")
    expected_user, expected_password = expected_credentials()
    if not token or not expected_user or not expected_password or "." not in token:
        return False
    encoded, supplied_signature = token.rsplit(".", 1)
    try:
        payload = base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4))
        data = json.loads(payload.decode("utf-8"))
        expires = datetime.fromisoformat(data["expires"])
    except (ValueError, KeyError, json.JSONDecodeError):
        return False
    valid_signature = secrets.compare_digest(
        supplied_signature,
        session_signature(payload, expected_password),
    )
    valid_user = secrets.compare_digest(
        str(data.get("username", "")),
        expected_user,
    )
    return bool(
        valid_signature
        and valid_user
        and expires > datetime.now(timezone.utc)
    )


def require_session(request: Request) -> str:
    if not valid_session(request):
        raise HTTPException(status_code=401, detail="Login required")
    return expected_credentials()[0]


def credentials_are_valid(username: str, password: str) -> bool:
    expected_user = os.environ.get("SCOUT_USER", "")
    expected_password = os.environ.get("SCOUT_PASSWORD", "")
    valid_user = secrets.compare_digest(
        username.encode("utf-8"),
        expected_user.encode("utf-8"),
    )
    valid_password = secrets.compare_digest(
        password.encode("utf-8"),
        expected_password.encode("utf-8"),
    )
    return bool(expected_user and expected_password and valid_user and valid_password)


def read_jobs() -> list[dict]:
    if not STATE_PATH.exists():
        return []
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []


def write_jobs(jobs: list[dict]) -> None:
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    temporary = STATE_PATH.with_suffix(".tmp")
    temporary.write_text(
        json.dumps(jobs, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    temporary.replace(STATE_PATH)


def run_pipeline() -> dict:
    if not run_lock.acquire(blocking=False):
        return {"status": "already_running"}
    try:
        LOGS.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now().astimezone().strftime("%Y%m%d-%H%M%S")
        log_path = LOGS / f"run-{stamp}.log"
        commands = [
            ["python", str(ROOT / "src" / "job_scout.py")],
            ["python", str(ROOT / "src" / "generate_documents.py")],
            ["python", str(ROOT / "src" / "send_email_report.py")],
        ]
        outputs: list[str] = []
        for command in commands:
            process = subprocess.run(
                command,
                cwd=ROOT,
                text=True,
                capture_output=True,
                timeout=240,
                check=False,
            )
            outputs.append(process.stdout)
            if process.stderr:
                outputs.append(process.stderr)
            if process.returncode != 0:
                log_path.write_text("\n".join(outputs), encoding="utf-8")
                return {
                    "status": "failed",
                    "step": Path(command[-1]).name,
                    "returncode": process.returncode,
                }
        log_path.write_text("\n".join(outputs), encoding="utf-8")
        return {
            "status": "completed",
            "jobs": len(read_jobs()),
            "finishedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        }
    finally:
        run_lock.release()


def schedule_pipeline() -> None:
    settings = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
    run_hours = settings.get("runHours", [0, 6, 12, 18])
    scheduler.add_job(
        run_pipeline,
        "cron",
        hour=",".join(str(int(hour)) for hour in run_hours),
        minute=0,
        id="job-scout-six-hour-cycle",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=60 * 60,
    )


@app.on_event("startup")
def startup() -> None:
    schedule_pipeline()
    scheduler.start()
    if not STATE_PATH.exists():
        threading.Thread(target=run_pipeline, daemon=True).start()


@app.on_event("shutdown")
def shutdown() -> None:
    scheduler.shutdown(wait=False)


@app.get("/healthz")
def health() -> dict:
    return {
        "status": "ok",
        "jobs": len(read_jobs()),
        "scheduler": scheduler.running,
    }


@app.get("/login", response_class=HTMLResponse)
def login_page(error: str = "") -> str:
    error_markup = (
        '<p class="error">The username or password is incorrect.</p>'
        if error
        else ""
    )
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rashed Job Scout - Login</title>
<style>
:root{{--paper:#f2eee6;--ink:#11100f;--muted:#68635b;--blue:#2458ff;--line:#c9c1b4}}
*{{box-sizing:border-box}} body{{margin:0;min-height:100vh;display:grid;place-items:center;
background:var(--paper);color:var(--ink);font-family:Arial,sans-serif}}
main{{width:min(440px,calc(100% - 32px));border-top:4px solid var(--blue);padding:38px 0}}
.eyebrow{{font:700 11px "Cascadia Mono",monospace;letter-spacing:.14em;color:var(--blue)}}
h1{{font-size:42px;line-height:.95;margin:14px 0 12px;letter-spacing:-.04em}}
p{{color:var(--muted);line-height:1.55}} label{{display:block;margin:20px 0 7px;
font:700 11px "Cascadia Mono",monospace;letter-spacing:.08em}}
input{{width:100%;padding:13px 14px;border:1px solid var(--line);background:#fff;
font:15px "Cascadia Mono",monospace}} button{{margin-top:24px;width:100%;padding:14px;
border:0;background:var(--ink);color:white;font-weight:700;cursor:pointer}}
.error{{padding:10px 12px;border-left:3px solid #dc3b30;background:#fff;color:#8d1c15}}
.note{{font-size:12px;margin-top:22px}}
</style></head><body><main>
<div class="eyebrow">PRIVATE / SSH TUNNEL ONLY</div>
<h1>Rashed Job Scout</h1>
<p>Sign in with the credentials saved in <strong>Rashed Job Scout Login.txt</strong> on your desktop.</p>
{error_markup}
<form method="post" action="/login">
<label for="username">USERNAME</label>
<input id="username" name="username" autocomplete="username" required autofocus>
<label for="password">PASSWORD</label>
<input id="password" name="password" type="password" autocomplete="current-password" required>
<button type="submit">Open dashboard</button>
</form>
<p class="note">Closing the SSH window closes local access only. The VPS automation keeps running.</p>
</main></body></html>"""


@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)) -> RedirectResponse:
    if not credentials_are_valid(username, password):
        return RedirectResponse(url="/login?error=1", status_code=303)
    response = RedirectResponse(url="/", status_code=303)
    response.set_cookie(
        "rashed_scout_session",
        create_session_token(username, password),
        max_age=12 * 60 * 60,
        httponly=True,
        samesite="strict",
        secure=False,
    )
    return response


@app.post("/logout")
def logout() -> RedirectResponse:
    response = RedirectResponse(url="/login", status_code=303)
    response.delete_cookie("rashed_scout_session")
    return response


def application_links() -> dict[str, dict[str, str]]:
    manifest_path = OUTPUT / "applications" / "manifest.json"
    if not manifest_path.exists():
        return {}
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}
    links: dict[str, dict[str, str]] = {}
    for item in manifest:
        key = item.get("job", {}).get("key")
        if not key:
            continue
        current: dict[str, str] = {}
        for label, field in (
            ("CV PDF", "cvPdf"),
            ("Cover Letter", "coverLetterPdf"),
            ("CV DOCX", "cv"),
        ):
            raw = item.get(field)
            if not raw:
                continue
            path = Path(raw)
            try:
                relative = path.resolve().relative_to(OUTPUT.resolve())
            except ValueError:
                continue
            current[label] = f"/files/{quote(relative.as_posix())}"
        links[key] = current
    return links


def render_dashboard(
    jobs: list[dict],
    *,
    query: str,
    selected_status: str,
    selected_source: str,
    min_score: int,
) -> str:
    links = application_links()
    settings = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
    sources = sorted({job.get("source", "") for job in jobs if job.get("source")})
    try:
        source_stats = json.loads(SOURCE_STATS_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        source_stats = {"rawTotal": 0, "sources": {}}
    raw_sources = source_stats.get("sources", {})
    coverage = "".join(
        f"<span><b>{html.escape(str(name))}</b> {int(count)}</span>"
        for name, count in list(raw_sources.items())[:30]
    )
    counts = Counter(job.get("status", "New") for job in jobs)
    high = sum(
        1
        for job in jobs
        if int(job.get("score", 0)) >= int(settings.get("documentScore", 55))
    )
    last_run = (
        datetime.fromtimestamp(STATE_PATH.stat().st_mtime)
        .astimezone()
        .strftime("%d %b %Y · %H:%M")
        if STATE_PATH.exists()
        else "Waiting for first run"
    )

    filtered = []
    normalized_query = query.casefold().strip()
    for job in jobs:
        searchable = " ".join(
            str(job.get(field, ""))
            for field in ("title", "company", "location", "source", "description")
        ).casefold()
        if normalized_query and normalized_query not in searchable:
            continue
        if selected_status and job.get("status") != selected_status:
            continue
        if selected_source and job.get("source") != selected_source:
            continue
        if int(job.get("score", 0)) < min_score:
            continue
        filtered.append(job)

    cards: list[str] = []
    for job in filtered[:250]:
        key = html.escape(job.get("key", ""))
        score = int(job.get("score", 0))
        matched = "".join(
            f"<span>{html.escape(skill)}</span>"
            for skill in (job.get("matched_skills") or [])[:9]
        )
        gaps = ", ".join(job.get("missing_skills") or [])
        files = " ".join(
            f'<a class="file" href="{html.escape(url)}">{html.escape(label)}</a>'
            for label, url in links.get(job.get("key", ""), {}).items()
        )
        options = "".join(
            f'<option value="{html.escape(value)}"'
            f'{" selected" if value == job.get("status") else ""}>'
            f"{html.escape(value)}</option>"
            for value in ALLOWED_STATUSES
        )
        cards.append(
            f"""
            <article class="job">
              <div class="score score-{score // 10}">{score}</div>
              <div class="job-main">
                <p class="eyebrow">{html.escape(job.get("source", ""))} · {html.escape(job.get("published_at", ""))}</p>
                <h2>{html.escape(job.get("title", ""))}</h2>
                <p class="company">{html.escape(job.get("company", ""))} — {html.escape(job.get("location", ""))} · {html.escape(job.get("workplace_type", "Remote"))}</p>
                <div class="skills">{matched}</div>
                <p class="reason">{html.escape(" · ".join(job.get("reasons") or []))}</p>
                {f'<p class="gaps">Check: {html.escape(gaps)}</p>' if gaps else ""}
                <div class="files">{files}</div>
              </div>
              <div class="actions">
                <a class="primary" href="{html.escape(job.get("url", "#"))}" target="_blank" rel="noreferrer">Open role ↗</a>
                <form method="post" action="/jobs/{key}/status">
                  <select name="job_status" aria-label="Application status">{options}</select>
                  <button type="submit">Save</button>
                </form>
              </div>
            </article>
            """
        )

    status_options = '<option value="">All statuses</option>' + "".join(
        f'<option value="{html.escape(value)}"'
        f'{" selected" if value == selected_status else ""}>'
        f"{html.escape(value)} ({counts.get(value, 0)})</option>"
        for value in ALLOWED_STATUSES
    )
    source_options = '<option value="">All sources</option>' + "".join(
        f'<option value="{html.escape(value)}"'
        f'{" selected" if value == selected_source else ""}>'
        f"{html.escape(value)}</option>"
        for value in sources
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rashed — Remote Job Scout</title>
  <style>
    :root{{--paper:#f2efe8;--ink:#111315;--muted:#626970;--line:#d4d0c8;--accent:#df5d34;--blue:#2f62ff;--green:#08745c}}
    *{{box-sizing:border-box}} body{{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 Arial,sans-serif}}
    main{{width:min(1240px,calc(100% - 32px));margin:auto;padding:42px 0 80px}}
    .mono,.eyebrow,.skills,.meta,select,button,.file{{font-family:"Cascadia Mono","JetBrains Mono",monospace}}
    header{{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;border-bottom:1px solid var(--ink);padding-bottom:24px}}
    .kicker{{margin:0;color:var(--accent);font:700 12px/1.4 "Cascadia Mono",monospace;letter-spacing:.12em;text-transform:uppercase}}
    h1{{margin:8px 0 0;font-size:clamp(42px,8vw,90px);line-height:.9;letter-spacing:-.065em}} .meta{{font-size:11px;color:var(--muted);text-align:right}}
    .stats{{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}} .stat{{padding:18px 16px;border-right:1px solid var(--line)}} .stat:last-child{{border:0}}
    .stat b{{display:block;font-size:27px}} .stat span{{font:10px "Cascadia Mono",monospace;text-transform:uppercase;color:var(--muted);letter-spacing:.1em}}
    .coverage{{display:flex;flex-wrap:wrap;gap:7px;padding:14px 0;border-bottom:1px solid var(--line)}} .coverage span{{padding:5px 7px;background:#fff;border:1px solid var(--line);font:10px "Cascadia Mono",monospace}} .coverage b{{font-weight:700}}
    .toolbar{{display:grid;grid-template-columns:1fr 190px 190px 110px auto;gap:10px;padding:18px 0;border-bottom:1px solid var(--ink)}}
    input,select,button{{width:100%;border:1px solid var(--line);background:#fff;color:var(--ink);padding:11px 12px;border-radius:0}} button{{cursor:pointer;font-weight:700}} .run{{background:var(--ink);color:white;border-color:var(--ink)}}
    .job{{display:grid;grid-template-columns:68px minmax(0,1fr) 190px;gap:22px;padding:25px 0;border-bottom:1px solid var(--line)}}
    .score{{width:56px;height:56px;border:1px solid var(--ink);display:grid;place-items:center;font:700 19px "Cascadia Mono",monospace}}
    .score-7,.score-8,.score-9,.score-10{{background:var(--green);color:white;border-color:var(--green)}} .score-6{{background:#dce6ff;border-color:var(--blue)}}
    h2{{font-size:24px;line-height:1.1;margin:3px 0 6px;letter-spacing:-.025em}} p{{margin:0}} .company{{color:#33383e}}
    .eyebrow{{color:var(--accent);font-size:10px;letter-spacing:.1em;text-transform:uppercase}}
    .skills{{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}} .skills span,.file{{font-size:10px;border:1px solid var(--line);background:white;padding:4px 7px;text-decoration:none;color:var(--ink)}}
    .reason,.gaps{{color:var(--muted);margin-top:9px;font-size:13px}} .gaps{{color:#7c442e}} .files{{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}}
    .actions{{display:flex;flex-direction:column;gap:12px}} .actions .primary{{display:block;background:var(--blue);color:white;padding:11px;text-align:center;text-decoration:none;font-weight:700}}
    .actions form{{display:grid;grid-template-columns:1fr 60px;gap:6px}} .actions select,.actions button{{font-size:10px;padding:9px 7px}}
    .empty{{padding:60px 0;color:var(--muted);font-size:20px}}
    @media(max-width:850px){{header{{grid-template-columns:1fr}}.meta{{text-align:left}}.stats{{grid-template-columns:repeat(2,1fr)}}.toolbar{{grid-template-columns:1fr 1fr}}.job{{grid-template-columns:52px 1fr}}.actions{{grid-column:2}}.score{{width:46px;height:46px}}}}
    @media(max-width:520px){{main{{width:min(100% - 22px,1240px);padding-top:24px}}.toolbar{{grid-template-columns:1fr}}.job{{gap:12px}}h2{{font-size:20px}}}}
  </style>
</head>
<body><main>
  <header>
    <div><p class="kicker">Pattern → Opportunity</p><h1>Remote Job Scout</h1></div>
    <p class="meta">LAST COLLECTION<br><b>{last_run}</b><br>RUNS EVERY 6 HOURS · AMMAN</p>
  </header>
  <section class="stats">
    <div class="stat"><b>{len(jobs)}</b><span>Qualified roles</span></div>
    <div class="stat"><b>{high}</b><span>Score 70+</span></div>
    <div class="stat"><b>{counts.get("New", 0)}</b><span>Unreviewed</span></div>
    <div class="stat"><b>{len(raw_sources)}</b><span>Sources scanned</span></div>
  </section>
  <section class="coverage" aria-label="Latest source coverage">{coverage}</section>
  <form class="toolbar" method="get">
    <input name="q" value="{html.escape(query)}" placeholder="Search title, company, stack…">
    <select name="status">{status_options}</select>
    <select name="source">{source_options}</select>
    <input type="number" min="0" max="100" name="min_score" value="{min_score}" aria-label="Minimum score">
    <button type="submit">Filter</button>
  </form>
  <form method="post" action="/run" style="padding:12px 0;border-bottom:1px solid var(--line)">
    <button class="run" type="submit">Collect new jobs now</button>
  </form>
  {''.join(cards) if cards else '<p class="empty">No roles match these filters.</p>'}
</main></body></html>"""


@app.get("/", response_class=HTMLResponse)
def dashboard(
    request: Request,
    q: str = "",
    status_filter: str = "",
    source: str = "",
    min_score: int = 0,
):
    if not valid_session(request):
        return RedirectResponse(url="/login", status_code=303)
    selected_status = request.query_params.get("status", status_filter)
    return render_dashboard(
        read_jobs(),
        query=q,
        selected_status=selected_status,
        selected_source=source,
        min_score=max(0, min(100, min_score)),
    )


@app.post("/run")
def run_now(request: Request) -> RedirectResponse:
    require_session(request)
    threading.Thread(target=run_pipeline, daemon=True).start()
    return RedirectResponse(url="/", status_code=303)


@app.post("/jobs/{job_key}/status")
def update_status(
    request: Request,
    job_key: str,
    job_status: str = Form(...),
) -> RedirectResponse:
    require_session(request)
    if job_status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    jobs = read_jobs()
    found = False
    for job in jobs:
        if job.get("key") == job_key:
            job["status"] = job_status
            found = True
            break
    if not found:
        raise HTTPException(status_code=404, detail="Job not found")
    write_jobs(jobs)
    return RedirectResponse(url="/", status_code=303)


@app.get("/files/{file_path:path}")
def download_file(
    request: Request,
    file_path: str,
) -> FileResponse:
    require_session(request)
    requested = (OUTPUT / file_path).resolve()
    try:
        requested.relative_to(OUTPUT.resolve())
    except ValueError as exc:
        raise HTTPException(status_code=403, detail="Invalid path") from exc
    if not requested.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(requested, filename=requested.name)


@app.get("/api/summary")
def summary(request: Request) -> JSONResponse:
    require_session(request)
    jobs = read_jobs()
    settings = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
    return JSONResponse(
        {
            "total": len(jobs),
            "byStatus": Counter(job.get("status", "New") for job in jobs),
            "bySource": Counter(job.get("source", "Unknown") for job in jobs),
            "highPriority": sum(
                1
                for job in jobs
                if int(job.get("score", 0))
                >= int(settings.get("documentScore", 55))
            ),
            "scheduler": [
                {"id": job.id, "nextRun": str(job.next_run_time)}
                for job in scheduler.get_jobs()
            ],
        }
    )
