import json
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from job_scout import (  # noqa: E402
    Job,
    parse_linkedin_cards,
    parse_linkedin_post_results,
    required_experience_years,
    score_job,
)


PROFILE = json.loads((ROOT / "config" / "profile.json").read_text(encoding="utf-8"))
SETTINGS = json.loads((ROOT / "config" / "settings.json").read_text(encoding="utf-8"))


def make_job(title: str, description: str) -> Job:
    return Job(
        source="test",
        source_id=title,
        title=title,
        company="Example",
        location="Anywhere",
        remote=True,
        published_at="2026-07-27",
        url="https://example.com/job",
        description=description,
    )


class MatchingRulesTests(unittest.TestCase):
    def test_extracts_explicit_experience_years(self):
        self.assertEqual(required_experience_years("At least 5 years of professional experience"), 5)
        self.assertEqual(required_experience_years("3-4 years of experience with React"), 3)

    def test_rejects_role_requiring_five_years(self):
        job = score_job(
            make_job(
                "Full Stack Developer",
                "At least 5 years of professional experience with TypeScript, React, Node.js and PostgreSQL.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)
        self.assertIn("Experience requirement", job.reasons[0])

    def test_blocks_java_role_even_when_react_is_mentioned(self):
        job = score_job(
            make_job(
                "Java Developer",
                "Required Java and Spring Boot. React is a plus.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)
        self.assertIn("outside CV", job.reasons[0])

    def test_blocks_cpp_role(self):
        job = score_job(
            make_job(
                "C++ Engineer",
                "Must have strong C++ and embedded systems experience.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)

    def test_keeps_sr_role_as_lower_priority_stretch(self):
        job = score_job(
            make_job(
                "SR Full Stack Developer",
                "TypeScript, React, Node.js and PostgreSQL.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertGreater(job.score, 0)
        self.assertIn("Stretch seniority level", job.reasons)

    def test_blocks_unsupported_technology_named_in_title(self):
        job = score_job(
            make_job(
                "Web Frontend Engineer - JavaScript, React, Flutter",
                "Build web experiences with JavaScript, CSS, React and Flutter.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)
        self.assertIn("flutter", job.missing_skills)

    def test_keeps_matching_full_stack_role(self):
        job = score_job(
            make_job(
                "Full Stack Developer",
                "TypeScript, React, Next.js, Node.js, NestJS and PostgreSQL.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertGreaterEqual(job.score, SETTINGS["minimumScore"])

    def test_extracts_required_experience(self):
        self.assertEqual(required_experience_years("At least 5 years of experience required."), 5)
        self.assertEqual(required_experience_years("2-3 years of professional experience."), 2)

    def test_rejects_role_requiring_five_years(self):
        job = score_job(
            make_job(
                "Full Stack Developer",
                "TypeScript, React, Node.js and PostgreSQL. At least 5 years of experience required.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)
        self.assertIn("outside target range", job.reasons[0])

    def test_rejects_generic_software_engineer_with_one_core_group(self):
        job = score_job(
            make_job(
                "Software Engineer",
                "Work on a Go Terraform platform. TypeScript familiarity is a nice to have.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)

    def test_keeps_focused_react_role_with_short_public_description(self):
        job = score_job(
            make_job(
                "React Developer",
                "Build responsive product interfaces.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertGreaterEqual(job.score, SETTINGS["minimumScore"])

    def test_parses_public_linkedin_job_card(self):
        markup = """
        <li><div class="base-card job-search-card"
          data-entity-urn="urn:li:jobPosting:123456">
          <a class="base-card__full-link"
             href="https://www.linkedin.com/jobs/view/react-developer-123456?x=1"></a>
          <h3 class="base-search-card__title">React Developer</h3>
          <h4 class="base-search-card__subtitle"><a>Example Co</a></h4>
          <span class="job-search-card__location">Worldwide</span>
          <time class="job-search-card__listdate" datetime="2026-07-28"></time>
        </div></li>
        """
        jobs = parse_linkedin_cards(markup)
        self.assertEqual(len(jobs), 1)
        self.assertEqual(jobs[0].source_id, "123456")
        self.assertEqual(jobs[0].company, "Example Co")
        self.assertEqual(
            jobs[0].url,
            "https://www.linkedin.com/jobs/view/react-developer-123456",
        )

        hybrid_jobs = parse_linkedin_cards(markup, "Hybrid")
        self.assertFalse(hybrid_jobs[0].remote)
        self.assertEqual(hybrid_jobs[0].workplace_type, "Hybrid")

    def test_parses_indexed_linkedin_hiring_post(self):
        markup = """
        <a class="result__a"
          href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fwww.linkedin.com%2Fposts%2Fexample_hiring-reactjs-nodejs-activity-7487540029163241472-demo">
          We are hiring a Full Stack Developer - LinkedIn
        </a>
        <div class="result__snippet">
          Remote worldwide role using ReactJS, Node.js and TypeScript.
        </div>
        """
        post_settings = {**SETTINGS, "linkedinPostMaxAgeDays": 3650}
        jobs = parse_linkedin_post_results(markup, post_settings)
        self.assertEqual(len(jobs), 1)
        self.assertEqual(jobs[0].source, "LinkedIn Posts")
        self.assertEqual(jobs[0].location, "Worldwide")
        self.assertIn("linkedin.com/posts/", jobs[0].url)

    def test_allows_design_engineering_overlap(self):
        job = score_job(
            make_job(
                "Design Engineer",
                "Build design systems and Figma tooling with TypeScript and React.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertGreaterEqual(job.score, SETTINGS["minimumScore"])
        self.assertNotIn("Core technology outside CV", " ".join(job.reasons))

    def test_rejects_generic_remote_role_without_cv_stack(self):
        job = score_job(
            make_job(
                "Software Engineer",
                "Work on distributed systems using an unspecified stack.",
            ),
            PROFILE,
            SETTINGS,
        )
        self.assertEqual(job.score, 0)
        self.assertIn("Insufficient overlap", job.reasons[0])

    def test_rejects_remote_role_restricted_to_another_country(self):
        job = make_job(
            "Full Stack Developer",
            "TypeScript, React, Next.js, Node.js, NestJS and PostgreSQL.",
        )
        job.location = "India"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertEqual(job.score, 0)
        self.assertIn("excludes Jordan", job.reasons[0])

    def test_rejects_remote_role_restricted_to_americas(self):
        job = make_job(
            "Product Engineer",
            "TypeScript, React, Next.js, Node.js and PostgreSQL.",
        )
        job.location = "Americas / Remote / Full-time"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertEqual(job.score, 0)
        self.assertIn("excludes Jordan", job.reasons[0])

    def test_accepts_remote_worldwide_in_description_when_card_shows_office(self):
        job = make_job(
            "React Developer",
            "This is a remote worldwide role building interfaces with React.",
        )
        job.location = "Stockholm, Sweden"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertGreaterEqual(job.score, SETTINGS["minimumScore"])

    def test_rejects_us_only_description_when_card_shows_us_office(self):
        job = make_job(
            "React Developer",
            "Remote within the United States only. Build interfaces with React.",
        )
        job.location = "New York, United States"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertEqual(job.score, 0)

    def test_accepts_matching_hybrid_role_in_amman(self):
        job = make_job(
            "Full Stack Developer",
            "Hybrid role using TypeScript, React, Node.js and PostgreSQL.",
        )
        job.remote = False
        job.workplace_type = "Hybrid"
        job.location = "Amman, Jordan"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertGreaterEqual(job.score, SETTINGS["minimumScore"])
        self.assertIn("Hybrid in Jordan", job.reasons)

    def test_rejects_hybrid_role_outside_jordan(self):
        job = make_job(
            "Full Stack Developer",
            "Hybrid role using TypeScript, React, Node.js and PostgreSQL.",
        )
        job.remote = False
        job.workplace_type = "Hybrid"
        job.location = "Dubai, United Arab Emirates"
        job = score_job(job, PROFILE, SETTINGS)
        self.assertEqual(job.score, 0)
        self.assertIn("outside Jordan", job.reasons[0])


if __name__ == "__main__":
    unittest.main()
