from __future__ import annotations

import csv
import email.utils
import hashlib
import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config"
DATA = ROOT / "data"
STATE = ROOT / "state"
OUTPUT = ROOT / "output"


@dataclass
class Job:
    source: str
    source_id: str
    title: str
    company: str
    location: str
    remote: bool
    published_at: str
    url: str
    description: str
    salary: str = ""
    score: int = 0
    matched_skills: list[str] | None = None
    missing_skills: list[str] | None = None
    reasons: list[str] | None = None
    status: str = "New"
    first_seen: str = ""
    application_warning: str = ""
    policy_source: str = ""
    workplace_type: str = ""

    def __post_init__(self) -> None:
        if not self.workplace_type:
            self.workplace_type = "Remote" if self.remote else "On-site"


def read_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def strip_html(value: str | None) -> str:
    if not value:
        return ""
    value = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def fetch_json(url: str) -> Any:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Rashed-Remote-Job-Scout/0.1 (+personal-use)",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Rashed-Remote-Job-Scout/1.0 (+personal-use)",
            "Accept": "application/rss+xml, application/xml, text/xml",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def fetch_public_html(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/126.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def safe_fetch_text(name: str, url: str, *, public_html: bool = False) -> str:
    try:
        return fetch_public_html(url) if public_html else fetch_text(url)
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"[warning] {name} unavailable: {exc}", file=sys.stderr)
        return ""


def safe_fetch(name: str, url: str) -> Any | None:
    try:
        return fetch_json(url)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        print(f"[warning] {name} unavailable: {exc}", file=sys.stderr)
        return None


def parse_remotive() -> list[Job]:
    payload = safe_fetch(
        "Remotive",
        "https://remotive.com/api/remote-jobs?category=software-dev&limit=100",
    )
    if not payload:
        return []
    jobs: list[Job] = []
    for item in payload.get("jobs", []):
        jobs.append(
            Job(
                source="Remotive",
                source_id=str(item.get("id", "")),
                title=item.get("title", "").strip(),
                company=item.get("company_name", "").strip(),
                location=item.get("candidate_required_location", "Remote").strip(),
                remote=True,
                published_at=item.get("publication_date", "")[:10],
                url=item.get("url", "").strip(),
                description=strip_html(item.get("description")),
                salary=item.get("salary", "") or "",
            )
        )
    return jobs


def parse_arbeitnow(page_count: int) -> list[Job]:
    jobs: list[Job] = []
    for page in range(1, page_count + 1):
        payload = safe_fetch(
            f"Arbeitnow page {page}",
            f"https://www.arbeitnow.com/api/job-board-api?page={page}",
        )
        if not payload:
            continue
        for item in payload.get("data", []):
            jobs.append(
                Job(
                    source="Arbeitnow",
                    source_id=str(item.get("slug", "")),
                    title=item.get("title", "").strip(),
                    company=item.get("company_name", "").strip(),
                    location=item.get("location", "").strip(),
                    remote=bool(item.get("remote")),
                    published_at=datetime.fromtimestamp(
                        int(item.get("created_at", 0)), tz=timezone.utc
                    ).date().isoformat()
                    if item.get("created_at")
                    else "",
                    url=item.get("url", "").strip(),
                    description=strip_html(item.get("description")),
                    salary="",
                )
            )
    return jobs


def parse_jobicy() -> list[Job]:
    payload = safe_fetch(
        "Jobicy",
        "https://jobicy.com/api/v2/remote-jobs?count=100&industry=engineering",
    )
    if not payload:
        return []
    jobs: list[Job] = []
    for item in payload.get("jobs", []):
        salary_parts = [
            str(item.get("salaryMin") or ""),
            str(item.get("salaryMax") or ""),
            str(item.get("salaryCurrency") or ""),
            str(item.get("salaryPeriod") or ""),
        ]
        salary = " ".join(part for part in salary_parts if part).strip()
        jobs.append(
            Job(
                source="Jobicy",
                source_id=str(item.get("id", "")),
                title=item.get("jobTitle", "").strip(),
                company=item.get("companyName", "").strip(),
                location=item.get("jobGeo", "Remote").strip(),
                remote=True,
                published_at=str(item.get("pubDate", ""))[:10],
                url=item.get("url", "").strip(),
                description=strip_html(item.get("jobDescription") or item.get("jobExcerpt")),
                salary=salary,
            )
        )
    return jobs


def parse_himalayas(page_count: int = 5) -> list[Job]:
    jobs: list[Job] = []
    for page in range(page_count):
        payload = safe_fetch(
            f"Himalayas page {page + 1}",
            f"https://himalayas.app/jobs/api?limit=20&offset={page * 20}",
        )
        if not payload:
            continue
        for item in payload.get("jobs", []):
            restrictions = item.get("locationRestrictions") or []
            location = (
                ", ".join(str(value) for value in restrictions)
                if restrictions
                else "Worldwide"
            )
            published = ""
            if item.get("pubDate"):
                published = datetime.fromtimestamp(
                    int(item["pubDate"]),
                    tz=timezone.utc,
                ).date().isoformat()
            salary = " ".join(
                str(value)
                for value in (
                    item.get("minSalary") or "",
                    item.get("maxSalary") or "",
                    item.get("currency") or "",
                    item.get("salaryPeriod") or "",
                )
                if value
            )
            jobs.append(
                Job(
                    source="Himalayas",
                    source_id=str(item.get("guid", "")),
                    title=str(item.get("title", "")).strip(),
                    company=str(item.get("companyName", "")).strip(),
                    location=location,
                    remote=True,
                    published_at=published,
                    url=str(item.get("applicationLink", "")).strip(),
                    description=strip_html(
                        item.get("description") or item.get("excerpt")
                    ),
                    salary=salary,
                )
            )
    return jobs


def parse_remote_ok() -> list[Job]:
    payload = safe_fetch("Remote OK", "https://remoteok.com/api")
    if not isinstance(payload, list):
        return []
    jobs: list[Job] = []
    for item in payload:
        if not isinstance(item, dict) or not item.get("id"):
            continue
        salary = " ".join(
            str(value)
            for value in (
                item.get("salary_min") or "",
                item.get("salary_max") or "",
            )
            if value
        )
        jobs.append(
            Job(
                source="Remote OK",
                source_id=str(item.get("id", "")),
                title=str(item.get("position", "")).strip(),
                company=str(item.get("company", "")).strip(),
                location=str(item.get("location") or "Worldwide").strip(),
                remote=True,
                published_at=str(item.get("date", ""))[:10],
                url=str(item.get("url") or item.get("apply_url") or "").strip(),
                description=strip_html(item.get("description")),
                salary=salary,
            )
        )
    return jobs


def parse_lever_sites(sites: list[str]) -> list[Job]:
    jobs: list[Job] = []
    for site in sites:
        payload = safe_fetch(
            f"Lever/{site}",
            f"https://api.lever.co/v0/postings/{site}?mode=json",
        )
        if not isinstance(payload, list):
            continue
        for item in payload:
            categories = item.get("categories") or {}
            description = " ".join(
                str(item.get(field) or "")
                for field in (
                    "descriptionPlain",
                    "descriptionBodyPlain",
                    "openingPlain",
                    "additionalPlain",
                )
            )
            workplace = str(item.get("workplaceType") or "").lower()
            location = str(categories.get("location") or "").strip()
            broad_remote = any(
                marker in description.lower()
                for marker in (
                    "globally remote",
                    "global remote",
                    "work from anywhere",
                    "worldwide",
                    "anywhere in the world",
                )
            )
            if workplace == "remote" and broad_remote:
                location = "Worldwide"
            published = ""
            if item.get("createdAt"):
                published = datetime.fromtimestamp(
                    int(item["createdAt"]) / 1000,
                    tz=timezone.utc,
                ).date().isoformat()
            jobs.append(
                Job(
                    source=f"Lever/{site}",
                    source_id=str(item.get("id", "")),
                    title=str(item.get("text", "")).strip(),
                    company=site.replace("-", " ").title(),
                    location=location or ("Remote" if workplace == "remote" else ""),
                    remote=workplace == "remote"
                    or "remote" in str(categories.get("commitment") or "").lower(),
                    published_at=published,
                    url=str(item.get("hostedUrl") or item.get("applyUrl") or "").strip(),
                    description=strip_html(description),
                )
            )
    return jobs


def parse_greenhouse_boards(boards: list[str]) -> list[Job]:
    jobs: list[Job] = []
    for board in boards:
        payload = safe_fetch(
            f"Greenhouse/{board}",
            "https://boards-api.greenhouse.io/v1/boards/"
            f"{urllib.parse.quote(board)}/jobs?content=true",
        )
        if not payload:
            continue
        for item in payload.get("jobs", []):
            location = str((item.get("location") or {}).get("name") or "").strip()
            description = strip_html(item.get("content"))
            jobs.append(
                Job(
                    source=f"Greenhouse/{board}",
                    source_id=str(item.get("id", "")),
                    title=str(item.get("title", "")).strip(),
                    company=board.replace("-", " ").title(),
                    location=location,
                    remote="remote" in location.lower()
                    or "globally remote" in description.lower()
                    or "worldwide" in description.lower(),
                    published_at=str(item.get("updated_at", ""))[:10],
                    url=str(item.get("absolute_url", "")).strip(),
                    description=description,
                )
            )
    return jobs


def parse_ashby_boards(boards: dict[str, str]) -> list[Job]:
    jobs: list[Job] = []
    for board, company in boards.items():
        payload = safe_fetch(
            f"Ashby/{company}",
            "https://api.ashbyhq.com/posting-api/job-board/"
            f"{urllib.parse.quote(board)}?includeCompensation=true",
        )
        if not payload:
            continue
        for item in payload.get("jobs", []):
            if item.get("isListed") is False:
                continue
            secondary_locations = [
                str(value.get("location") or "").strip()
                for value in (item.get("secondaryLocations") or [])
                if isinstance(value, dict) and value.get("location")
            ]
            locations = [
                str(item.get("location") or "").strip(),
                *secondary_locations,
            ]
            location = ", ".join(dict.fromkeys(value for value in locations if value))
            description = strip_html(
                item.get("descriptionPlain") or item.get("descriptionHtml")
            )
            compensation = item.get("compensation") or {}
            salary = str(
                compensation.get("scrapeableCompensationSalarySummary")
                or compensation.get("compensationTierSummary")
                or ""
            ).strip()
            remote = bool(item.get("isRemote")) or any(
                marker in f"{location} {description}".lower()
                for marker in (
                    "remote",
                    "worldwide",
                    "work from anywhere",
                    "hire globally",
                    "globally distributed",
                )
            )
            jobs.append(
                Job(
                    source=f"Ashby/{company}",
                    source_id=str(item.get("id", "")),
                    title=str(item.get("title", "")).strip(),
                    company=company,
                    location=location or ("Remote" if remote else ""),
                    remote=remote,
                    published_at=str(item.get("publishedAt", ""))[:10],
                    url=str(item.get("jobUrl") or item.get("applyUrl") or "").strip(),
                    description=description,
                    salary=salary,
                )
            )
    return jobs


def parse_workable_boards(boards: dict[str, str]) -> list[Job]:
    jobs: list[Job] = []
    for board, configured_name in boards.items():
        payload = safe_fetch(
            f"Workable/{configured_name}",
            "https://www.workable.com/api/accounts/"
            f"{urllib.parse.quote(board)}?details=true",
        )
        if not payload:
            continue
        company = str(payload.get("name") or configured_name).strip()
        for item in payload.get("jobs", []):
            location_parts = [
                str(item.get("city") or "").strip(),
                str(item.get("state") or "").strip(),
                str(item.get("country") or "").strip(),
            ]
            location = ", ".join(
                dict.fromkeys(value for value in location_parts if value)
            )
            remote = bool(item.get("telecommuting"))
            jobs.append(
                Job(
                    source=f"Workable/{company}",
                    source_id=str(item.get("shortcode") or item.get("code") or ""),
                    title=str(item.get("title", "")).strip(),
                    company=company,
                    location=location or ("Remote" if remote else ""),
                    remote=remote,
                    published_at=str(
                        item.get("published_on") or item.get("created_at") or ""
                    )[:10],
                    url=str(
                        item.get("url")
                        or item.get("shortlink")
                        or item.get("application_url")
                        or ""
                    ).strip(),
                    description=strip_html(item.get("description")),
                )
            )
    return jobs


def parse_we_work_remotely() -> list[Job]:
    try:
        payload = fetch_text(
            "https://weworkremotely.com/categories/remote-programming-jobs.rss"
        )
        root = ET.fromstring(payload)
    except (urllib.error.URLError, TimeoutError, ET.ParseError) as exc:
        print(f"[warning] We Work Remotely unavailable: {exc}", file=sys.stderr)
        return []

    jobs: list[Job] = []
    for item in root.findall(".//item"):
        title_text = (item.findtext("title") or "").strip()
        company = ""
        title = title_text
        if ":" in title_text:
            company, title = [part.strip() for part in title_text.split(":", 1)]
        description = strip_html(item.findtext("description"))
        link = (item.findtext("link") or "").strip()
        published_raw = (item.findtext("pubDate") or "").strip()
        published = ""
        if published_raw:
            try:
                published = email.utils.parsedate_to_datetime(
                    published_raw
                ).date().isoformat()
            except (TypeError, ValueError):
                published = published_raw[:10]
        location = "Remote"
        for child in item:
            if child.tag.rsplit("}", 1)[-1].lower() in {"region", "location"}:
                location = (child.text or "Remote").strip()
                break
        jobs.append(
            Job(
                source="We Work Remotely",
                source_id=(item.findtext("guid") or link).strip(),
                title=title,
                company=company or "Company listed on WWR",
                location=location,
                remote=True,
                published_at=published,
                url=link,
                description=description,
            )
        )
    return jobs


def parse_linkedin_seed() -> list[Job]:
    path = DATA / "linkedin-seed.json"
    if not path.exists():
        return []
    return [
        Job(
            source=item["source"],
            source_id=str(item["sourceId"]),
            title=item["title"],
            company=item["company"],
            location=item["location"],
            remote=bool(item["remote"]),
            published_at=item["publishedAt"],
            url=item["url"],
            description=item.get("description", ""),
            salary=item.get("salary", ""),
        )
        for item in read_json(path)
    ]


def extract_linkedin_text(block: str, class_name: str) -> str:
    match = re.search(
        rf"<[^>]+class=[\"'][^\"']*\b{re.escape(class_name)}\b[^\"']*[\"'][^>]*>"
        rf"(.*?)</[^>]+>",
        block,
        flags=re.I | re.S,
    )
    return strip_html(match.group(1)) if match else ""


def parse_linkedin_card(
    block: str,
    workplace_type: str = "Remote",
) -> Job | None:
    identifier = re.search(r"urn:li:jobPosting:(\d+)", block)
    link = re.search(
        r'class=["\'][^"\']*base-card__full-link[^"\']*["\'][^>]+href=["\']([^"\']+)',
        block,
        flags=re.I,
    )
    if not identifier or not link:
        return None
    title = extract_linkedin_text(block, "base-search-card__title")
    company = extract_linkedin_text(block, "base-search-card__subtitle")
    location = extract_linkedin_text(block, "job-search-card__location")
    published = re.search(
        r'<time[^>]+datetime=["\']([^"\']+)',
        block,
        flags=re.I,
    )
    if not title or title.startswith("{["):
        return None
    return Job(
        source="LinkedIn Jobs",
        source_id=identifier.group(1),
        title=title,
        company=company or "Company on LinkedIn",
        location=location or "Remote",
        remote=workplace_type == "Remote",
        published_at=(published.group(1)[:10] if published else ""),
        url=html.unescape(link.group(1)).split("?", 1)[0],
        description="",
        workplace_type=workplace_type,
    )


def parse_linkedin_cards(
    document: str,
    workplace_type: str = "Remote",
) -> list[Job]:
    blocks = re.findall(
        r'(<div[^>]+data-entity-urn=["\']urn:li:jobPosting:\d+["\'][\s\S]*?</li>)',
        document,
        flags=re.I,
    )
    jobs: list[Job] = []
    for block in blocks:
        job = parse_linkedin_card(block, workplace_type)
        if job:
            jobs.append(job)
    return jobs


def linkedin_detail(job_id: str) -> str:
    document = safe_fetch_text(
        f"LinkedIn job {job_id}",
        f"https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{job_id}",
        public_html=True,
    )
    if not document:
        return ""
    match = re.search(
        r'<div[^>]+class=["\'][^"\']*show-more-less-html__markup[^"\']*["\'][^>]*>'
        r"([\s\S]*?)</div>",
        document,
        flags=re.I,
    )
    return strip_html(match.group(1) if match else document)


def job_is_recent(job: Job, maximum_days: int) -> bool:
    if not job.published_at:
        return True
    try:
        published = datetime.fromisoformat(job.published_at[:10]).date()
    except ValueError:
        return True
    return (datetime.now(timezone.utc).date() - published).days <= maximum_days


def parse_linkedin_public(settings: dict[str, Any]) -> list[Job]:
    """Collect public LinkedIn job cards without an account, cookies, or login."""
    searches = settings.get(
        "linkedinSearches",
        [
            "Full Stack Developer",
            "React Developer",
            "Next.js Developer",
            "Node.js Developer",
            "TypeScript Developer",
        ],
    )
    locations = settings.get(
        "linkedinLocations",
        ["Worldwide", "Middle East", "Jordan"],
    )
    maximum_jobs = int(settings.get("linkedinMaxJobs", 80))
    maximum_age = int(settings.get("maxJobAgeDays", 21))
    pages_per_search = max(1, int(settings.get("linkedinPagesPerSearch", 2)))
    collected: dict[str, Job] = {}

    for search in searches:
        for location in locations:
            for page in range(pages_per_search):
                query = urllib.parse.urlencode(
                    {
                        "keywords": search,
                        "location": location,
                        "f_WT": "2",
                        "f_TPR": f"r{maximum_age * 86400}",
                        "sortBy": "DD",
                        "start": str(page * 25),
                    }
                )
                document = safe_fetch_text(
                    f"LinkedIn Jobs ({search}, {location}, page {page + 1})",
                    "https://www.linkedin.com/jobs-guest/jobs/api/"
                    f"seeMoreJobPostings/search?{query}",
                    public_html=True,
                )
                page_jobs = parse_linkedin_cards(document)
                for job in page_jobs:
                    if job_is_recent(job, maximum_age):
                        collected.setdefault(job.source_id, job)
                if len(collected) >= maximum_jobs or not page_jobs:
                    break
                time.sleep(0.6)
            if len(collected) >= maximum_jobs:
                break
        if len(collected) >= maximum_jobs:
            break

    hybrid_locations = settings.get("linkedinHybridLocations", ["Jordan", "Amman"])
    hybrid_maximum = int(settings.get("linkedinHybridMaxJobs", 40))
    hybrid_collected = 0
    for search in searches:
        for location in hybrid_locations:
            query = urllib.parse.urlencode(
                {
                    "keywords": search,
                    "location": location,
                    "f_WT": "3",
                    "f_TPR": f"r{maximum_age * 86400}",
                    "sortBy": "DD",
                    "start": "0",
                }
            )
            document = safe_fetch_text(
                f"LinkedIn Hybrid Jobs ({search}, {location})",
                "https://www.linkedin.com/jobs-guest/jobs/api/"
                f"seeMoreJobPostings/search?{query}",
                public_html=True,
            )
            for job in parse_linkedin_cards(document, "Hybrid"):
                if job_is_recent(job, maximum_age) and job.source_id not in collected:
                    collected[job.source_id] = job
                    hybrid_collected += 1
            if hybrid_collected >= hybrid_maximum:
                break
            time.sleep(0.6)
        if hybrid_collected >= hybrid_maximum:
            break

    detail_limit = int(settings.get("linkedinDetailLimit", 50))
    detail_count = 0
    title_hints = (
        "full stack",
        "full-stack",
        "frontend",
        "front end",
        "backend",
        "back end",
        "software engineer",
        "software developer",
        "web developer",
        "react",
        "next.js",
        "node.js",
        "typescript",
        "javascript",
        "design engineer",
        "ui engineer",
    )
    detail_queue = sorted(
        collected.values(),
        key=lambda item: item.workplace_type != "Hybrid",
    )
    for job in detail_queue:
        if detail_count >= detail_limit:
            break
        if not any(term in job.title.lower() for term in title_hints):
            continue
        job.description = linkedin_detail(job.source_id)
        detail_count += 1
        time.sleep(0.5)
    return list(collected.values())[: maximum_jobs + hybrid_maximum]


def linkedin_activity_date(url: str) -> str:
    match = re.search(r"(?:activity|share)-(\d{16,})", url)
    if not match:
        return ""
    try:
        timestamp_ms = int(match.group(1)) >> 22
        return datetime.fromtimestamp(
            timestamp_ms / 1000,
            tz=timezone.utc,
        ).date().isoformat()
    except (ValueError, OSError, OverflowError):
        return ""


def linkedin_post_location(searchable: str, settings: dict[str, Any]) -> str:
    normalized = searchable.lower()
    labels = {
        "anywhere in the world": "Anywhere in the World",
        "worldwide": "Worldwide",
        "global remote": "Global Remote",
        "remote globally": "Global Remote",
        "emea": "EMEA",
        "middle east": "Middle East",
        "jordan": "Jordan",
        "amman": "Amman, Jordan",
    }
    for term, label in labels.items():
        if term in normalized:
            return label
    for term in settings.get("restrictedLocationTerms", []):
        if term in normalized:
            return term.title()
    return "Remote — location eligibility not stated"


def parse_linkedin_post_results(document: str, settings: dict[str, Any]) -> list[Job]:
    jobs: list[Job] = []
    link_pattern = re.compile(
        r'<a[^>]+class=["\'][^"\']*result__a[^"\']*["\'][^>]+'
        r'href=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</a>',
        flags=re.I,
    )
    for match in link_pattern.finditer(document):
        redirect = html.unescape(match.group(1))
        parsed_redirect = urllib.parse.urlparse(
            f"https:{redirect}" if redirect.startswith("//") else redirect
        )
        query = urllib.parse.parse_qs(parsed_redirect.query)
        url = urllib.parse.unquote(query.get("uddg", [redirect])[0])
        if "linkedin.com/posts/" not in url:
            continue
        following = document[match.end() : match.end() + 2500]
        snippet_match = re.search(
            r'<[^>]+class=["\'][^"\']*result__snippet[^"\']*["\'][^>]*>'
            r"([\s\S]*?)</[^>]+>",
            following,
            flags=re.I,
        )
        title = strip_html(match.group(2))
        snippet = strip_html(snippet_match.group(1)) if snippet_match else ""
        searchable = f"{title} {snippet}"
        lowered = searchable.lower()
        if not any(
            term in lowered
            for term in ("remote", "work from home", "worldwide", "anywhere", "emea")
        ):
            continue
        published = linkedin_activity_date(url)
        job = Job(
            source="LinkedIn Posts",
            source_id=(
                re.search(r"(?:activity|share)-(\d+)", url).group(1)
                if re.search(r"(?:activity|share)-(\d+)", url)
                else hashlib.sha256(url.encode("utf-8")).hexdigest()[:20]
            ),
            title=title.removesuffix(" - LinkedIn").strip(),
            company="Hiring post on LinkedIn",
            location=linkedin_post_location(searchable, settings),
            remote=True,
            published_at=published,
            url=url,
            description=searchable,
        )
        if job_is_recent(job, int(settings.get("linkedinPostMaxAgeDays", 30))):
            jobs.append(job)
    return jobs


def parse_linkedin_posts(settings: dict[str, Any]) -> list[Job]:
    searches = settings.get(
        "linkedinPostSearches",
        [
            'site:linkedin.com/posts/ "hiring" React Node.js remote',
            'site:linkedin.com/posts/ "hiring" Next.js TypeScript remote',
            'site:linkedin.com/posts/ "full stack developer" remote EMEA',
        ],
    )
    collected: dict[str, Job] = {}
    for search in searches:
        url = "https://html.duckduckgo.com/html/?" + urllib.parse.urlencode(
            {"q": search}
        )
        document = safe_fetch_text(
            f"LinkedIn Posts index ({search})",
            url,
            public_html=True,
        )
        for job in parse_linkedin_post_results(document, settings):
            collected.setdefault(job.source_id, job)
        time.sleep(1)
    return list(collected.values())


def canonical_key(job: Job) -> str:
    raw = "|".join(
        [
            re.sub(r"\W+", "", job.company.lower()),
            re.sub(r"\W+", "", job.title.lower()),
            re.sub(r"[?#].*$", "", job.url.lower()),
        ]
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:20]


def contains(text: str, phrase: str) -> bool:
    normalized_text = re.sub(r"[^a-z0-9+#.]+", " ", text.lower())
    normalized_phrase = re.sub(r"[^a-z0-9+#.]+", " ", phrase.lower()).strip()
    if not normalized_phrase:
        return False
    pattern = (
        rf"(?<![a-z0-9+#]){re.escape(normalized_phrase)}"
        rf"(?![a-z0-9+#])"
    )
    return re.search(pattern, normalized_text) is not None


CORE_SKILL_GROUPS = {
    "JavaScript/TypeScript": ("javascript", "typescript"),
    "React/Next.js": ("react", "react.js", "reactjs", "next.js", "nextjs"),
    "Node.js": ("node.js", "nodejs", "node js"),
    "NestJS/Express": ("nestjs", "nest.js", "express.js", "express"),
    "REST APIs": ("rest api", "restful"),
    "PostgreSQL/MongoDB": ("postgresql", "postgres", "mongodb"),
}


def core_skill_hits(searchable: str) -> list[str]:
    return [
        label
        for label, aliases in CORE_SKILL_GROUPS.items()
        if any(contains(searchable, alias) for alias in aliases)
    ]


def required_technology_mismatch(
    title: str,
    description: str,
    settings: dict[str, Any],
) -> str:
    """Return a blocking technology when it is the advertised role's core stack."""
    combined = f"{title} {description}".lower()
    for role_term in settings.get("hardExcludeRoleTerms", []):
        if role_term in title:
            return role_term
    for technology in settings.get("hardExcludeTitleTechnologies", []):
        if contains(title, technology):
            return technology

    requirement_phrases = (
        "required",
        "requirements",
        "must have",
        "strong experience",
        "proficiency",
        "proficient",
        "expertise",
        "years of experience",
        "core stack",
        "primary language",
        "hands-on experience",
    )
    for technology in settings.get("hardExcludeRequiredTechnologies", []):
        escaped = re.escape(technology)
        patterns = [
            rf"(?:{'|'.join(requirement_phrases)})[^.!?\n]{{0,100}}\b{escaped}\b",
            rf"\b{escaped}\b[^.!?\n]{{0,100}}(?:{'|'.join(requirement_phrases)})",
        ]
        if any(re.search(pattern, combined, flags=re.I) for pattern in patterns):
            return technology
    return ""


def required_experience_years(description: str) -> int:
    """Return the lowest explicit required years-of-experience figure."""
    normalized = description.lower()
    matches = re.findall(
        r"(?:minimum|min\.?|at least|over)?\s*(\d{1,2})(?:\s*[-+\u2013\u2014]\s*\d{1,2})?\s*\+?\s*years?"
        r"(?:\s+of)?\s+(?:professional\s+)?experience",
        normalized,
    )
    return min((int(value) for value in matches), default=0)


def location_is_eligible(location: str, settings: dict[str, Any]) -> bool:
    normalized = location.strip().lower()
    if not normalized:
        return True
    if any(
        term in normalized
        for term in settings.get(
            "eligibleLocationTerms",
            ["worldwide", "anywhere", "global", "emea", "middle east", "jordan"],
        )
    ):
        return True
    if any(
        term in normalized
        for term in settings.get("restrictedLocationTerms", [])
    ):
        return False
    return "remote" in normalized


def job_location_is_eligible(job: Job, settings: dict[str, Any]) -> bool:
    if location_is_eligible(job.location, settings):
        return True
    description = job.description.lower()
    eligible = (
        "worldwide",
        "anywhere in the world",
        "work from anywhere",
        "globally remote",
        "remote globally",
        "remote - global",
        "remote: global",
        "emea",
        "middle east",
        "jordan",
        "amman",
    )
    remote_context_patterns = [
        rf"\bremote\b[^.!?\n]{{0,100}}\b{re.escape(term)}\b"
        for term in eligible
    ] + [
        rf"\b{re.escape(term)}\b[^.!?\n]{{0,100}}\bremote\b"
        for term in eligible
    ]
    return any(
        re.search(pattern, description, flags=re.I)
        for pattern in remote_context_patterns
    )


def normalize_workplace_type(job: Job) -> None:
    searchable = f"{job.title} {job.description} {job.location}".lower()
    if (
        "hybrid" in searchable
        and not job.remote
        and job.workplace_type != "Hybrid"
    ):
        job.workplace_type = "Hybrid"
        job.remote = False


def hybrid_location_is_eligible(job: Job, settings: dict[str, Any]) -> bool:
    searchable = f"{job.location} {job.description}".lower()
    return any(
        term in searchable
        for term in settings.get(
            "hybridEligibleLocationTerms",
            ["jordan", "amman", "irbid", "aqaba", "zarqa"],
        )
    )


def score_job(job: Job, profile: dict[str, Any], settings: dict[str, Any]) -> Job:
    normalize_workplace_type(job)
    searchable = f"{job.title} {job.description} {job.location}".lower()
    title = job.title.lower()
    location = job.location.lower()
    reasons: list[str] = []
    score = 0

    if any(term in title for term in settings.get("hardExcludeTitleTerms", [])):
        job.score = 0
        job.matched_skills = []
        job.missing_skills = []
        job.reasons = ["Seniority outside target level"]
        return job

    seniority_penalty_terms = settings.get(
        "seniorityPenaltyTerms", ["senior", "sr.", "sr ", "lead"]
    )
    seniority_penalty = any(term in title for term in seniority_penalty_terms)

    if job.remote and not job_location_is_eligible(job, settings):
        job.score = 0
        job.matched_skills = []
        job.missing_skills = []
        job.reasons = [
            f"Remote location restriction excludes Jordan: {job.location}"
        ]
        return job

    if (
        job.workplace_type == "Hybrid"
        and not hybrid_location_is_eligible(job, settings)
    ):
        job.score = 0
        job.matched_skills = []
        job.missing_skills = []
        job.reasons = [
            f"Hybrid role is outside Jordan: {job.location}"
        ]
        return job

    blocked_technology = required_technology_mismatch(
        title,
        job.description,
        settings,
    )
    if blocked_technology:
        job.score = 0
        job.matched_skills = []
        job.missing_skills = [blocked_technology]
        job.reasons = [f"Core technology outside CV: {blocked_technology}"]
        return job

    required_years = required_experience_years(job.description)
    hard_years = int(settings.get("hardExperienceRequirementYears", 5))
    if required_years >= hard_years:
        job.score = 0
        job.matched_skills = []
        job.missing_skills = [f"{required_years}+ years required"]
        job.reasons = [f"Experience requirement is outside target range: {required_years}+ years"]
        return job

    target_terms = [
        "full stack",
        "full-stack",
        "fullstackdeveloper",
        "software engineer",
        "software developer",
        "product engineer",
        "web engineer",
        "react engineer",
        "react developer",
        "javascript engineer",
        "javascript developer",
        "typescript engineer",
        "typescript developer",
        "node.js engineer",
        "node.js developer",
        "nodejs engineer",
        "nodejs developer",
        "application engineer",
        "frontend",
        "frontenddeveloper",
        "front end",
        "backend",
        "backenddeveloper",
        "back end",
        "web developer",
        "design engineer",
        "design systems engineer",
        "ui engineer",
        "creative developer",
        "frontend designer",
    ]
    title_hits = [term for term in target_terms if term in title]
    if title_hits:
        score += 24
        reasons.append("Target role title")
    if "full stack" in title or "full-stack" in title:
        score += 6
        reasons.append("Full-stack focus")

    primary = profile["skills"]["primary"]
    secondary = profile["skills"]["secondary"]
    primary_hits = [skill for skill in primary if contains(searchable, skill)]
    secondary_hits = [skill for skill in secondary if contains(searchable, skill)]
    grouped_hits = core_skill_hits(searchable)
    minimum_groups = int(settings.get("minimumCoreSkillGroups", 2))
    focused_stack_title = any(
        term in title
        for term in (
            "react",
            "next.js",
            "nextjs",
            "node.js",
            "nodejs",
            "javascript",
            "typescript",
        )
    )
    focused_single_group = (
        minimum_groups > 1
        and len(grouped_hits) == 1
        and focused_stack_title
        and bool(title_hits)
    )
    if len(grouped_hits) < minimum_groups and not focused_single_group:
        job.score = 0
        job.matched_skills = list(dict.fromkeys(primary_hits + secondary_hits))
        job.missing_skills = []
        job.reasons = [
            "Insufficient overlap with the CV core stack",
            f"Core groups matched: {', '.join(grouped_hits) or 'none'}",
        ]
        return job
    if focused_single_group:
        reasons.append("Focused stack match in role title")
    score += min(30, len(primary_hits) * 5)
    score += min(10, len(secondary_hits) * 2)
    if primary_hits:
        reasons.append(f"Primary stack: {', '.join(primary_hits[:5])}")

    if seniority_penalty:
        score -= int(settings.get("seniorityPenalty", 16))
        reasons.append("Stretch seniority level")

    if required_years in (3, 4):
        score -= 10 if required_years == 3 else 18
        reasons.append(f"Experience stretch: {required_years}+ years requested")

    if job.remote:
        score += 8
        reasons.append("Remote")
    elif job.workplace_type == "Hybrid":
        score += 6
        reasons.append("Hybrid in Jordan")
    location_evidence = f"{location} {job.description.lower()}"
    if any(term in location_evidence for term in settings["preferredLocations"]):
        score += 7
        reasons.append("Location appears compatible")
    elif any(
        term in location
        for term in ["usa", "united states", "canada", "latam", "europe", "norway", "india", "singapore"]
    ):
        score -= 12
        reasons.append("Regional eligibility requires verification")

    senior_terms = ["senior", "sr.", "lead"]
    if any(term in title for term in senior_terms):
        score -= 14
        reasons.append("Seniority stretch")
    if any(term in title for term in settings["excludeSeniority"]):
        score -= 35
        reasons.append("Seniority outside target")
    if "intern" in title or "internship" in title:
        score -= 20
        reasons.append("Below target level")
    if "graduate" in title or "working student" in title or "werkstudent" in title:
        score -= 10
        reasons.append("Likely below target level")
    if any(term in searchable for term in settings["excludeTechnologies"]):
        score -= 22
        reasons.append("Core technology mismatch")

    if any(
        restriction in location
        for restriction in [
            "united states only",
            "usa only",
            "us only",
            "canada only",
            "india only",
        ]
    ):
        score -= 20
        reasons.append("Likely location restriction")

    missing_markers = [
        "aws",
        "kubernetes",
        "graphql",
        "java",
        "golang",
        "ruby",
        "php",
        ".net",
        "angular",
        "flutter",
    ]
    missing = [
        marker
        for marker in missing_markers
        if marker in searchable
        and not any(contains(marker, skill) for skill in primary + secondary)
    ]
    title_gaps = [marker for marker in missing if marker in title]
    if title_gaps:
        score -= min(16, len(title_gaps) * 8)
        reasons.append(f"Title-level skill gap: {', '.join(title_gaps)}")

    job.score = max(0, min(100, score))
    job.matched_skills = primary_hits + secondary_hits
    job.missing_skills = missing
    job.reasons = reasons
    return job


def dedupe(jobs: list[Job]) -> list[Job]:
    selected: dict[str, Job] = {}
    for job in jobs:
        key = canonical_key(job)
        existing = selected.get(key)
        if existing is None or len(job.description) > len(existing.description):
            selected[key] = job
    return list(selected.values())


def load_previous() -> dict[str, dict[str, Any]]:
    path = STATE / "jobs.json"
    if not path.exists():
        return {}
    return {item["key"]: item for item in read_json(path)}


def persist(jobs: list[Job]) -> list[dict[str, Any]]:
    previous = load_previous()
    today = datetime.now().astimezone().isoformat(timespec="seconds")
    records: list[dict[str, Any]] = []
    for job in jobs:
        record = asdict(job)
        key = canonical_key(job)
        old = previous.get(key, {})
        record["key"] = key
        record["first_seen"] = old.get("first_seen", today)
        default_status = "Manual Review" if job.application_warning else "New"
        previous_status = old.get("status", default_status)
        if job.application_warning and previous_status == "New":
            previous_status = "Manual Review"
        record["status"] = previous_status
        records.append(record)
    write_json(STATE / "jobs.json", records)
    return records


def write_csv(records: list[dict[str, Any]]) -> None:
    path = OUTPUT / "job_tracker.csv"
    path.parent.mkdir(parents=True, exist_ok=True)
    columns = [
        "score",
        "status",
        "title",
        "company",
        "location",
        "workplace_type",
        "remote",
        "source",
        "published_at",
        "matched_skills",
        "missing_skills",
        "salary",
        "url",
        "first_seen",
        "application_warning",
    ]
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns)
        writer.writeheader()
        for item in records:
            row = {column: item.get(column, "") for column in columns}
            row["matched_skills"] = ", ".join(item.get("matched_skills") or [])
            row["missing_skills"] = ", ".join(item.get("missing_skills") or [])
            writer.writerow(row)


def write_dashboard(records: list[dict[str, Any]]) -> None:
    cards = []
    for job in records[:100]:
        skills = "".join(
            f"<span>{html.escape(skill)}</span>"
            for skill in (job.get("matched_skills") or [])[:8]
        )
        reasons = " · ".join(job.get("reasons") or [])
        warning = (
            f'<p class="warning">{html.escape(job["application_warning"])}</p>'
            if job.get("application_warning")
            else ""
        )
        cards.append(
            f"""
            <article class="job" data-score="{job['score']}">
              <div class="score">{job['score']}</div>
              <div>
                <p class="eyebrow">{html.escape(job['source'])} · {html.escape(job['published_at'])}</p>
                <h2>{html.escape(job['title'])}</h2>
                <p class="company">{html.escape(job['company'])} — {html.escape(job['location'])} · {html.escape(job.get('workplace_type', 'Remote'))}</p>
                <div class="skills">{skills}</div>
                <p class="reason">{html.escape(reasons)}</p>
                {warning}
              </div>
              <a href="{html.escape(job['url'])}" target="_blank" rel="noreferrer">Inspect role ↗</a>
            </article>
            """
        )
    generated = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M")
    document = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rashed — Remote + Hybrid Job Scout</title>
<style>
:root{{--ink:#101214;--muted:#6c737d;--line:#dfe3e6;--paper:#f5f3ee;--accent:#de5d33;--good:#167861}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--paper);color:var(--ink);font:15px/1.55 Arial,sans-serif}}
main{{width:min(1120px,calc(100% - 32px));margin:auto;padding:48px 0 80px}} header{{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;border-bottom:1px solid var(--ink);padding-bottom:24px;margin-bottom:24px}}
.kicker,.eyebrow,.skills,.meta{{font-family:"JetBrains Mono","Cascadia Code",monospace;text-transform:uppercase;letter-spacing:.08em}} h1{{font-size:clamp(40px,8vw,88px);line-height:.92;margin:10px 0 0}} .meta{{color:var(--muted);font-size:12px}}
.job{{display:grid;grid-template-columns:72px 1fr auto;gap:24px;align-items:start;padding:28px 0;border-bottom:1px solid var(--line)}} .score{{width:58px;height:58px;display:grid;place-items:center;border:1px solid var(--ink);border-radius:50%;font:700 20px "Cascadia Code",monospace}}
.job[data-score^="8"] .score,.job[data-score^="9"] .score{{background:var(--good);color:white;border-color:var(--good)}} h2{{margin:3px 0 5px;font-size:24px}} p{{margin:0}} .company{{color:#32363a}} .reason{{color:var(--muted);margin-top:10px}} .eyebrow{{color:var(--accent);font-size:11px}}
.skills{{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}} .skills span{{border:1px solid var(--line);padding:4px 7px;font-size:10px;background:#fff}}
.warning{{margin-top:12px;padding:10px 12px;border-left:3px solid var(--accent);background:#fff1eb;color:#8d351d;font:12px/1.5 "Cascadia Code",monospace}}
a{{color:var(--ink);font-weight:700;text-underline-offset:4px;white-space:nowrap}} @media(max-width:760px){{header,.job{{grid-template-columns:1fr}}.score{{width:48px;height:48px}}}}
</style></head><body><main>
<header><div><p class="kicker">Pattern → Opportunity</p><h1>Remote + Hybrid Job Scout</h1></div><p class="meta">Generated {generated}<br>{len(records)} qualified roles</p></header>
{''.join(cards)}
</main></body></html>"""
    (OUTPUT / "dashboard.html").write_text(document, encoding="utf-8")


def write_summary(records: list[dict[str, Any]], raw_count: int) -> None:
    top = records[:10]
    settings = read_json(CONFIG / "settings.json")
    lines = [
        "# Run summary",
        "",
        f"- Generated: {datetime.now().astimezone().isoformat(timespec='minutes')}",
        f"- Raw jobs collected: {raw_count}",
        f"- Qualified unique jobs: {len(records)}",
        f"- High-priority jobs: "
        f"{sum(1 for item in records if item['score'] >= int(settings['documentScore']))}",
        "",
        "## Top matches",
        "",
    ]
    for index, job in enumerate(top, start=1):
        lines.append(
            f"{index}. **{job['title']} — {job['company']}** ({job['score']}%)  \n"
            f"   {job['location']} · {job.get('workplace_type', 'Remote')} · "
            f"{job['source']} · [Open role]({job['url']})"
        )
    (OUTPUT / "run_summary.md").write_text("\n".join(lines), encoding="utf-8")


def write_source_stats(raw_jobs: list[Job]) -> dict[str, Any]:
    counts: dict[str, int] = {}
    for job in raw_jobs:
        counts[job.source] = counts.get(job.source, 0) + 1
    payload = {
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "rawTotal": len(raw_jobs),
        "sources": dict(
            sorted(counts.items(), key=lambda item: (-item[1], item[0].lower()))
        ),
    }
    write_json(STATE / "source_stats.json", payload)
    return payload


def main() -> int:
    profile = read_json(CONFIG / "profile.json")
    settings = read_json(CONFIG / "settings.json")
    policies = read_json(CONFIG / "company_policies.json")
    STATE.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)

    raw_jobs = (
        parse_remotive()
        + parse_arbeitnow(int(settings["arbeitnowPages"]))
        + parse_jobicy()
        + parse_himalayas(int(settings.get("himalayasPages", 5)))
        + parse_remote_ok()
        + parse_lever_sites(settings.get("leverSites", []))
        + parse_greenhouse_boards(settings.get("greenhouseBoards", []))
        + parse_ashby_boards(settings.get("ashbyBoards", {}))
        + parse_workable_boards(settings.get("workableBoards", {}))
        + parse_we_work_remotely()
        + (parse_linkedin_public(settings) or parse_linkedin_seed())
        + parse_linkedin_posts(settings)
    )
    source_stats = write_source_stats(raw_jobs)
    unique_jobs = dedupe(raw_jobs)
    scored = [score_job(job, profile, settings) for job in unique_jobs]
    for job in scored:
        for policy in policies:
            if policy["companyPattern"].lower() in job.company.lower():
                if not policy["generatedApplicationContentAllowed"]:
                    job.application_warning = policy["warning"]
                    job.policy_source = policy["source"]
                break
    qualified = [
        job
        for job in scored
        if job.score >= int(settings["minimumScore"])
        and (
            job.remote
            or (
                settings.get("allowHybrid", False)
                and job.workplace_type == "Hybrid"
            )
            or not settings["remoteOnly"]
        )
    ]
    qualified.sort(key=lambda job: (job.score, job.published_at), reverse=True)
    source_stats["qualifiedTotal"] = len(qualified)
    source_stats["linkedInCollected"] = sum(
        1 for job in raw_jobs if job.source == "LinkedIn Jobs"
    )
    source_stats["linkedInPostsCollected"] = sum(
        1 for job in raw_jobs if job.source == "LinkedIn Posts"
    )
    source_stats["hybridCollected"] = sum(
        1 for job in raw_jobs if job.workplace_type == "Hybrid"
    )
    source_stats["qualifiedWorkplaceTypes"] = {
        workplace: sum(
            1 for job in qualified if job.workplace_type == workplace
        )
        for workplace in ("Remote", "Hybrid")
    }
    qualified_sources: dict[str, int] = {}
    rejection_reasons: dict[str, int] = {}
    for job in qualified:
        qualified_sources[job.source] = qualified_sources.get(job.source, 0) + 1
    for job in scored:
        if job.score >= int(settings["minimumScore"]):
            continue
        reason = (job.reasons or ["Below minimum score"])[0]
        rejection_reasons[reason] = rejection_reasons.get(reason, 0) + 1
    source_stats["qualifiedSources"] = dict(
        sorted(qualified_sources.items(), key=lambda item: (-item[1], item[0]))
    )
    source_stats["topRejectionReasons"] = dict(
        sorted(rejection_reasons.items(), key=lambda item: -item[1])[:8]
    )
    source_stats["linkedInDiagnostics"] = [
        {
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "score": job.score,
            "reason": (job.reasons or [""])[0],
        }
        for job in scored
        if job.source == "LinkedIn Jobs"
    ][:12]
    write_json(STATE / "source_stats.json", source_stats)
    records = persist(qualified)
    write_csv(records)
    write_dashboard(records)
    write_summary(records, len(raw_jobs))
    print(
        json.dumps(
            {
                "raw": len(raw_jobs),
                "qualified": len(records),
                "highPriority": sum(
                    1 for item in records if item["score"] >= settings["documentScore"]
                ),
                "activeSources": len(source_stats["sources"]),
                "output": str(OUTPUT),
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
