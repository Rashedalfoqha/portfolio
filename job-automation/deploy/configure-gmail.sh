#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="/opt/rashed-job-scout"
ENV_FILE="${APP_DIR}/.env"
RECIPIENT_DEFAULT="rashedmohammadalfuqaha@gmail.com"

if [[ ! -f "${ENV_FILE}" ]]; then
  printf 'Missing %s\n' "${ENV_FILE}" >&2
  exit 1
fi

read -r -p "Dedicated Gmail sender address: " smtp_user
read -r -p "Report recipient [${RECIPIENT_DEFAULT}]: " recipient
recipient="${recipient:-${RECIPIENT_DEFAULT}}"
read -r -s -p "Google 16-character App Password (hidden): " app_password
printf '\n'
app_password="${app_password// /}"

if [[ ! "${smtp_user}" =~ ^[^[:space:]@]+@gmail\.com$ ]]; then
  printf 'Sender must be a valid @gmail.com address.\n' >&2
  exit 1
fi
if [[ ! "${recipient}" =~ ^[^[:space:]@]+@[^[:space:]@]+$ ]]; then
  printf 'Recipient is not a valid email address.\n' >&2
  exit 1
fi
if [[ ! "${app_password}" =~ ^[[:alnum:]]{16}$ ]]; then
  printf 'App Password must contain 16 letters/numbers (spaces are allowed when pasted).\n' >&2
  exit 1
fi

temporary="$(mktemp)"
trap 'rm -f "${temporary}"' EXIT

sudo awk '!/^EMAIL_/' "${ENV_FILE}" >"${temporary}"
cat >>"${temporary}" <<EOF
EMAIL_ENABLED=true
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=465
EMAIL_SMTP_USER=${smtp_user}
EMAIL_SMTP_APP_PASSWORD=${app_password}
EMAIL_TO=${recipient}
EMAIL_FROM_NAME=Rashed Job Scout
EMAIL_MIN_SCORE=40
EMAIL_MAX_JOBS=12
EMAIL_SEND_EMPTY_REPORT=true
EMAIL_ATTACH_TRACKER=true
EMAIL_MAX_ATTACHMENT_BYTES=12000000
EOF

owner="$(stat -c '%U:%G' "${ENV_FILE}")"
sudo install -m 600 -o "${owner%:*}" -g "${owner#*:}" "${temporary}" "${ENV_FILE}"

cd "${APP_DIR}"
sudo -u rashedops docker compose up -d --force-recreate scout

for _ in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:8080/healthz >/dev/null; then
    break
  fi
  sleep 2
done

printf '\nSending the first report now...\n'
sudo docker exec rashed-job-scout python /app/src/send_email_report.py
printf '\nGmail delivery is configured. Future reports run after every scheduled collection.\n'
