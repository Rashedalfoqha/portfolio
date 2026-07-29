# Rashed Remote Job Scout

## Production VPS

The production service runs continuously on the Ubuntu VPS and restarts
automatically after a reboot.

- Job dashboard: `http://127.0.0.1:8080/login` through the SSH desktop shortcut.
- Server monitor: `http://127.0.0.1:19999` through the same shortcut.
- Scheduled collection: every six hours at 00:00, 06:00, 12:00, and 18:00
  Asia/Amman.
- Gmail delivery runs after collection and document generation. It sends only
  previously unreported matching jobs, includes original application links,
  and attaches the tracker plus available tailored PDFs within the size limit.
- Active sources: Remotive, Arbeitnow, Jobicy, We Work Remotely,
  Himalayas, Remote OK, and curated company career boards powered by
  Lever, Greenhouse, and Ashby.
- A host-level watchdog checks the application every five minutes and recovers
  a stopped or unhealthy container. Docker also starts the service automatically
  after a VPS reboot.
- The service is not exposed directly to the public internet.
- Dashboard credentials are stored outside the repository.

The Windows desktop contains:

- `Open Rashed Job Scout.cmd` — opens an encrypted tunnel and both dashboards.
- `Rashed Job Scout Login.txt` — dashboard username and password.

Keep the tunnel window open while using either dashboard. Closing the window
only closes local dashboard access; the VPS automation continues running.

A local, zero-subscription prototype that collects remote software roles plus
hybrid roles located in Jordan, scores them against a factual professional
profile, removes duplicates, and prepares review-ready application documents.

## What it does

- Collects public remote jobs from Remotive, Arbeitnow, Jobicy,
  We Work Remotely, Himalayas, Remote OK, and direct public company
  career APIs from Lever and Greenhouse.
- Collects fresh public LinkedIn Jobs results through LinkedIn's guest job
  pages. This source uses no account, password, cookies, or signed-in session.
- Runs separate LinkedIn searches for Remote roles and Hybrid roles in
  Jordan/Amman. Hybrid vacancies outside Jordan are rejected automatically.
- Checks a low-frequency public web index for recent LinkedIn hiring posts
  containing the verified stack. Indexed posts are labelled separately and
  location-ambiguous posts remain review items rather than assumed matches.
- Scores Full Stack, Frontend, Backend, and Software Engineer roles.
- Hard-rejects senior/lead roles and jobs whose title or required core stack is
  outside the verified CV (including Java, C++, C#, .NET, PHP/Laravel, Ruby,
  Golang, Flutter, Angular, Vue.js, Kotlin, and Swift).
- Requires overlap with at least two verified core skill groups before a job can
  enter the tracker. A narrowly titled React, Next.js, Node.js, JavaScript, or
  TypeScript role can pass with one explicit core group because public job cards
  sometimes expose only a short summary. All unsupported-stack blocks still apply.
- Produces:
  - `output/dashboard.html`
  - `output/Rashed_Remote_Job_Tracker.xlsx`
  - `output/job_tracker.csv`
  - tailored CV and cover-letter DOCX files under `output/applications/`
  - human-written application briefs under `output/manual-review/` when an employer prohibits generated application content
- Preserves application statuses between runs.
- Tracks successful Gmail deliveries in `state/email_delivery.json` to prevent
  duplicate notifications.

## Gmail delivery

Use a dedicated Google account as the sender. Turn on Google two-step
verification, create an App Password for this service, and place it only in the
VPS `.env` file. Never store the normal Google password in the repository.

Required environment values:

```dotenv
EMAIL_ENABLED=true
EMAIL_SMTP_USER=dedicated-automation-account@gmail.com
EMAIL_SMTP_APP_PASSWORD=the-16-character-app-password
EMAIL_TO=rashedmohammadalfuqaha@gmail.com
```

On the production VPS, run the interactive setup without exposing the App
Password in chat or shell history:

```bash
sudo /opt/rashed-job-scout/deploy/configure-gmail.sh
```

When Gmail is not configured, the scout remains operational and records
`configuration_required` or `disabled` in `state/email_delivery.json`.

## Run now

Right-click `run.ps1` and choose **Run with PowerShell**, or execute:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\run.ps1
```

## Schedule it

Run once:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-schedule.ps1
```

This schedules runs at 08:00 and 18:00. The computer must be powered on; missed runs start when Windows becomes available.

## Safety

- The system does not submit applications.
- It does not send LinkedIn messages or change the LinkedIn profile.
- It does not store a LinkedIn password or session.
- Every document must be reviewed before use.
- Employer-specific AI policies override document generation.
- `config/profile.json` is the machine-readable truth source and is aligned with
  `Rashed_Mohammad_Alfuqaha_Full_Stack_Software_Engineer_CV`. Update it only
  with verified facts.
- Tailored CVs use an ATS-safe, single-column Arial template derived from the
  approved base CV. Tailoring reorders verified evidence and keywords; it does
  not invent claims.

## Current prototype limitation

The automatic writer is deterministic rather than an unattended ChatGPT session. It reorders verified evidence and keywords but never invents claims. A VPS or a free model integration can be added after the local results are approved.
