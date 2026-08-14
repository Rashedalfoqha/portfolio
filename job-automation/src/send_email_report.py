from __future__ import annotations

import html
import json
import mimetypes
import os
import smtplib
import ssl
import sys
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
STATE = ROOT / "state"
OUTPUT = ROOT / "output"
JOBS_PATH = STATE / "jobs.json"
DELIVERY_PATH = STATE / "email_delivery.json"
MANIFEST_PATH = OUTPUT / "applications" / "manifest.json"
SOURCE_STATS_PATH = STATE / "source_stats.json"


def read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return default


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(
        json.dumps(value, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    temporary.replace(path)


def env_bool(name: str, default: bool = False) -> bool:
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def select_unsent_jobs(
    jobs: list[dict[str, Any]],
    sent_keys: set[str],
    minimum_score: int,
    limit: int,
) -> list[dict[str, Any]]:
    eligible = [
        job
        for job in jobs
        if job.get("key")
        and job["key"] not in sent_keys
        and int(job.get("score", 0)) >= minimum_score
        and job.get("status") not in {"Ignored", "Rejected"}
    ]
    eligible.sort(
        key=lambda item: (
            int(item.get("score", 0)),
            str(item.get("published_at", "")),
        ),
        reverse=True,
    )
    return eligible[:limit]


def select_active_jobs(
    jobs: list[dict[str, Any]],
    minimum_score: int,
    limit: int,
) -> list[dict[str, Any]]:
    eligible = [
        job
        for job in jobs
        if int(job.get("score", 0)) >= minimum_score
        and job.get("status") not in {"Ignored", "Rejected", "Applied"}
    ]
    eligible.sort(
        key=lambda item: (
            int(item.get("score", 0)),
            str(item.get("published_at", "")),
        ),
        reverse=True,
    )
    return eligible[:limit]


def render_plain(
    jobs: list[dict[str, Any]],
    source_stats: dict[str, Any] | None = None,
    new_count: int | None = None,
) -> str:
    stats = source_stats or {}
    active = int(stats.get("qualifiedTotal", 0))
    fresh = len(jobs) if new_count is None else new_count
    lines = [
        f"Rashed Job Scout - {fresh} new role(s), {active} active role(s)",
        "",
        f"Scanned: {int(stats.get('rawTotal', 0))} public job postings "
        f"across {len(stats.get('sources', {}))} sources.",
        "The jobs below are the highest-priority active matches for your CV and target level.",
        "",
    ]
    if not jobs:
        lines.extend(
            [
                "No previously unreported role passed all filters in this cycle.",
                "The server and scheduled scan completed successfully.",
                f"There are still {active} active qualified role(s) in your dashboard.",
                "Zero here means zero NEW roles, not a failed search.",
                "",
            ]
        )
    for index, job in enumerate(jobs, start=1):
        skills = ", ".join(job.get("matched_skills") or []) or "Review description"
        gaps = ", ".join(job.get("missing_skills") or []) or "None detected"
        lines.extend(
            [
                f"{index}. {job.get('title', '')} — {job.get('company', '')}",
                f"   Match: {job.get('score', 0)}% | {job.get('workplace_type', 'Remote')} | {job.get('location', '')} | {job.get('source', '')}",
                f"   Matched: {skills}",
                f"   Check: {gaps}",
                f"   Apply: {job.get('url', '')}",
                "",
            ]
        )
    lines.extend(
        [
            "Review every vacancy and generated document before applying.",
            "The automation never submits an application on your behalf.",
        ]
    )
    return "\n".join(lines)


def render_html(
    jobs: list[dict[str, Any]],
    source_stats: dict[str, Any] | None = None,
    new_count: int | None = None,
) -> str:
    stats = source_stats or {}
    active = int(stats.get("qualifiedTotal", 0))
    fresh = len(jobs) if new_count is None else new_count
    cards: list[str] = []
    for job in jobs:
        skills = "".join(
            f"<span>{html.escape(skill)}</span>"
            for skill in (job.get("matched_skills") or [])[:10]
        )
        gaps = ", ".join(job.get("missing_skills") or [])
        warning = job.get("application_warning") or ""
        cards.append(
            f"""
            <article>
              <div class="score">{int(job.get("score", 0))}</div>
              <div class="body">
                <p class="eyebrow">{html.escape(str(job.get("source", "")))} · {html.escape(str(job.get("published_at", "")))}</p>
                <h2>{html.escape(str(job.get("title", "")))}</h2>
                <p class="company">{html.escape(str(job.get("company", "")))} — {html.escape(str(job.get("location", "")))} · {html.escape(str(job.get("workplace_type", "Remote")))}</p>
                <div class="skills">{skills}</div>
                {f'<p class="check"><b>Check:</b> {html.escape(gaps)}</p>' if gaps else ""}
                {f'<p class="warning">{html.escape(warning)}</p>' if warning else ""}
                <a href="{html.escape(str(job.get("url", "")))}">Open original role →</a>
              </div>
            </article>
            """
        )
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{{margin:0;background:#f2efe8;color:#111315;font-family:Arial,sans-serif}}
.wrap{{max-width:760px;margin:auto;padding:32px 20px 48px}}
.kicker,.eyebrow,.skills{{font-family:"Courier New",monospace}}
.kicker{{margin:0;color:#df5d34;font-size:11px;font-weight:700;letter-spacing:.12em}}
h1{{margin:8px 0 10px;font-size:42px;line-height:.95;letter-spacing:-.04em}}
.intro{{margin:0 0 25px;color:#626970;line-height:1.6}}
article{{display:table;width:100%;padding:22px 0;border-top:1px solid #c9c4ba}}
.score,.body{{display:table-cell;vertical-align:top}}
.score{{width:48px;height:48px;background:#08745c;color:#fff;text-align:center;
font:700 17px/48px "Courier New",monospace}}
.body{{padding-left:17px}} .eyebrow{{margin:0;color:#df5d34;font-size:10px;letter-spacing:.08em}}
h2{{margin:5px 0;font-size:21px;line-height:1.15}} .company{{margin:0;color:#3b4147}}
.skills{{margin:12px 0 8px}} .skills span{{display:inline-block;margin:0 5px 5px 0;
padding:4px 7px;border:1px solid #d4d0c8;background:#fff;font-size:10px}}
.check,.warning{{font-size:12px;color:#6b4b3c}} .warning{{padding:9px;border-left:3px solid #df5d34;background:#fff}}
a{{display:inline-block;margin-top:10px;padding:9px 12px;background:#2458ff;color:#fff!important;
font-weight:700;text-decoration:none}} footer{{border-top:1px solid #111315;padding-top:18px;
font-size:12px;color:#626970;line-height:1.55}}
</style></head><body><div class="wrap">
<p class="kicker">PATTERN → OPPORTUNITY / AUTOMATED REPORT</p>
<h1>{fresh} new / {active} active</h1>
<p class="intro"><b>{active} active qualified role(s)</b> remain in the dashboard.
Zero new means no previously unreported match, not a failed search.</p>
<p class="intro">Scanned <b>{int(stats.get("rawTotal", 0))}</b> public job postings across
<b>{len(stats.get("sources", {}))}</b> sources. These roles passed your verified CV
stack, target level, remote-location eligibility, and unsupported-technology filters.</p>
{''.join(cards) if cards else '<p class="intro"><b>Scan completed successfully.</b><br>No previously unreported role passed every filter in this cycle.</p>'}
<footer>Review the original vacancy and every generated document before applying.
The scout prepares material but never submits applications or contacts employers.</footer>
</div></body></html>"""


def attachment_candidates(jobs: list[dict[str, Any]]) -> list[Path]:
    candidates: list[Path] = []
    if env_bool("EMAIL_ATTACH_TRACKER", True):
        tracker = OUTPUT / "Rashed_Remote_Job_Tracker.xlsx"
        if tracker.is_file():
            candidates.append(tracker)

    selected_keys = {job.get("key") for job in jobs}
    manifest = read_json(MANIFEST_PATH, [])
    for item in manifest:
        if item.get("job", {}).get("key") not in selected_keys:
            continue
        for field in ("cvPdf", "coverLetterPdf"):
            raw = item.get(field)
            if not raw:
                continue
            path = Path(raw)
            if not path.is_absolute():
                path = ROOT / path
            if path.is_file():
                candidates.append(path)
    return candidates


def add_attachments(message: EmailMessage, paths: list[Path]) -> list[str]:
    attached: list[str] = []
    maximum_bytes = int(os.environ.get("EMAIL_MAX_ATTACHMENT_BYTES", "12000000"))
    consumed = 0
    for path in paths:
        size = path.stat().st_size
        if consumed + size > maximum_bytes:
            continue
        guessed, _ = mimetypes.guess_type(path.name)
        maintype, subtype = (guessed or "application/octet-stream").split("/", 1)
        message.add_attachment(
            path.read_bytes(),
            maintype=maintype,
            subtype=subtype,
            filename=path.name,
        )
        consumed += size
        attached.append(path.name)
    return attached


def delivery_status(status: str, **extra: Any) -> dict[str, Any]:
    return {
        "status": status,
        "updatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        **extra,
    }


def main() -> int:
    if not env_bool("EMAIL_ENABLED"):
        write_json(DELIVERY_PATH, delivery_status("disabled"))
        print(json.dumps({"email": "disabled"}))
        return 0

    smtp_user = os.environ.get("EMAIL_SMTP_USER", "").strip()
    smtp_password = os.environ.get("EMAIL_SMTP_APP_PASSWORD", "").replace(" ", "")
    recipients = [
        value.strip()
        for value in os.environ.get("EMAIL_TO", "").split(",")
        if value.strip()
    ]
    if not smtp_user or not smtp_password or not recipients:
        write_json(
            DELIVERY_PATH,
            delivery_status(
                "configuration_required",
                message="Set EMAIL_SMTP_USER, EMAIL_SMTP_APP_PASSWORD, and EMAIL_TO.",
            ),
        )
        print("[email] Gmail configuration is incomplete.", file=sys.stderr)
        return 2

    jobs = read_json(JOBS_PATH, [])
    previous = read_json(DELIVERY_PATH, {})
    sent_keys = set(previous.get("sentKeys", []))
    maximum_jobs = int(os.environ.get("EMAIL_MAX_JOBS", "12"))
    selected = select_unsent_jobs(
        jobs,
        sent_keys,
        int(os.environ.get("EMAIL_MIN_SCORE", "40")),
        maximum_jobs,
    )
    new_count = len(selected)
    if env_bool("EMAIL_INCLUDE_ACTIVE_FALLBACK", True):
        active_jobs = select_active_jobs(
            jobs,
            int(os.environ.get("EMAIL_MIN_SCORE", "40")),
            maximum_jobs,
        )
        selected_keys = {str(job.get("key", "")) for job in selected}
        for active_job in active_jobs:
            if len(selected) >= maximum_jobs:
                break
            active_key = str(active_job.get("key", ""))
            if active_key in selected_keys:
                continue
            selected.append(active_job)
            selected_keys.add(active_key)
    send_empty_report = env_bool("EMAIL_SEND_EMPTY_REPORT", True)
    if not selected and not send_empty_report:
        write_json(
            DELIVERY_PATH,
            delivery_status(
                "no_new_jobs",
                sentKeys=sorted(sent_keys),
                lastSuccessfulAt=previous.get("lastSuccessfulAt", ""),
            ),
        )
        print(json.dumps({"email": "skipped", "reason": "no_new_jobs"}))
        return 0

    source_stats = read_json(SOURCE_STATS_PATH, {})
    message = EmailMessage()
    message["From"] = os.environ.get("EMAIL_FROM_NAME", "Rashed Job Scout") + f" <{smtp_user}>"
    message["To"] = ", ".join(recipients)
    message["Subject"] = (
        f"Rashed Job Scout: {len(selected)} new match"
        f"{'es' if len(selected) != 1 else ''} · "
        f"top score {max((int(job.get('score', 0)) for job in selected), default=0)}%"
    )
    active_count = int(source_stats.get("qualifiedTotal", len(jobs)))
    message.replace_header("Subject", (
        f"Rashed Job Scout: {new_count} new | {active_count} active | "
        f"{int(source_stats.get('rawTotal', 0))} scanned"
    ))
    message.set_content(render_plain(selected, source_stats, new_count))
    message.add_alternative(render_html(selected, source_stats, new_count), subtype="html")
    attached = add_attachments(
        message,
        attachment_candidates(selected) if selected else [],
    )

    host = os.environ.get("EMAIL_SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("EMAIL_SMTP_PORT", "465"))
    try:
        with smtplib.SMTP_SSL(
            host,
            port,
            context=ssl.create_default_context(),
            timeout=30,
        ) as smtp:
            smtp.login(smtp_user, smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException) as exc:
        write_json(
            DELIVERY_PATH,
            delivery_status(
                "failed",
                error=f"{type(exc).__name__}: {exc}",
                sentKeys=sorted(sent_keys),
                lastSuccessfulAt=previous.get("lastSuccessfulAt", ""),
            ),
        )
        print(f"[email] delivery failed: {exc}", file=sys.stderr)
        return 1

    sent_keys.update(str(job["key"]) for job in selected)
    success_time = datetime.now().astimezone().isoformat(timespec="seconds")
    write_json(
        DELIVERY_PATH,
        delivery_status(
            "sent" if selected else "sent_empty",
            sentKeys=sorted(sent_keys),
            lastSuccessfulAt=success_time,
            recipients=recipients,
            jobs=[
                {
                    "key": job["key"],
                    "score": job.get("score", 0),
                    "title": job.get("title", ""),
                    "company": job.get("company", ""),
                }
                for job in selected
            ],
            attachments=attached,
        ),
    )
    print(
        json.dumps(
            {
                "email": "sent",
                "jobs": len(selected),
                "recipients": recipients,
                "attachments": attached,
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
