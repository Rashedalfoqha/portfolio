import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from send_email_report import render_html, select_unsent_jobs  # noqa: E402


def job(key: str, score: int, status: str = "New") -> dict:
    return {
        "key": key,
        "score": score,
        "status": status,
        "title": f"Role {key}",
        "company": "Example",
        "location": "Worldwide",
        "source": "Test",
        "published_at": "2026-07-27",
        "url": "https://example.com/job",
        "matched_skills": ["TypeScript", "React"],
        "missing_skills": [],
    }


class EmailReportTests(unittest.TestCase):
    def test_selects_only_unsent_jobs_above_threshold(self):
        selected = select_unsent_jobs(
            [job("already", 90), job("low", 39), job("new", 60)],
            {"already"},
            40,
            12,
        )
        self.assertEqual([item["key"] for item in selected], ["new"])

    def test_excludes_terminal_statuses(self):
        selected = select_unsent_jobs(
            [job("ignored", 90, "Ignored"), job("rejected", 80, "Rejected")],
            set(),
            40,
            12,
        )
        self.assertEqual(selected, [])

    def test_sorts_by_score_and_limits_count(self):
        selected = select_unsent_jobs(
            [job("mid", 55), job("top", 75), job("lower", 50)],
            set(),
            40,
            2,
        )
        self.assertEqual([item["key"] for item in selected], ["top", "mid"])

    def test_html_escapes_job_content(self):
        unsafe = job("unsafe", 60)
        unsafe["title"] = "<script>alert(1)</script>"
        rendered = render_html([unsafe])
        self.assertNotIn("<script>", rendered)
        self.assertIn("&lt;script&gt;", rendered)

    def test_empty_report_confirms_successful_scan(self):
        rendered = render_html(
            [],
            {"rawTotal": 2500, "sources": {"Source A": 100}},
        )
        self.assertIn("2500", rendered)
        self.assertIn("Scan completed successfully", rendered)


if __name__ == "__main__":
    unittest.main()
