#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="/opt/rashed-job-scout"
ARCHIVE="/home/rashedops/job-scout-deploy.tar.gz"
APP_USER="rashedops"

install -d -m 755 -o "${APP_USER}" -g "${APP_USER}" "${APP_DIR}"
tar -xzf "${ARCHIVE}" -C "${APP_DIR}"
chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"

install -d -m 750 -o 10001 -g 10001 \
  "${APP_DIR}/state" \
  "${APP_DIR}/output" \
  "${APP_DIR}/logs"
chown -R 10001:10001 \
  "${APP_DIR}/state" \
  "${APP_DIR}/output" \
  "${APP_DIR}/logs"

install -m 750 -o root -g root \
  "${APP_DIR}/deploy/job-scout-watchdog.sh" \
  /usr/local/sbin/rashed-job-scout-watchdog
install -m 644 -o root -g root \
  "${APP_DIR}/deploy/rashed-job-scout-watchdog.service" \
  /etc/systemd/system/rashed-job-scout-watchdog.service
install -m 644 -o root -g root \
  "${APP_DIR}/deploy/rashed-job-scout-watchdog.timer" \
  /etc/systemd/system/rashed-job-scout-watchdog.timer
systemctl daemon-reload
systemctl enable --now rashed-job-scout-watchdog.timer

if [[ ! -f "${APP_DIR}/.env" ]]; then
  dashboard_password="$(
    openssl rand -base64 48 |
      tr -dc 'A-Za-z0-9_@%+=-' |
      head -c 32
  )"
  cat >"${APP_DIR}/.env" <<EOF
SCOUT_USER=rashed
SCOUT_PASSWORD=${dashboard_password}
TZ=Asia/Amman
EOF
  chmod 600 "${APP_DIR}/.env"
  chown "${APP_USER}:${APP_USER}" "${APP_DIR}/.env"
fi

cd "${APP_DIR}"
sudo -u "${APP_USER}" docker compose build --pull
sudo -u "${APP_USER}" docker compose up -d --remove-orphans

for _ in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:8080/healthz >/tmp/job-scout-health.json; then
    break
  fi
  sleep 2
done

curl -fsS http://127.0.0.1:8080/healthz
printf '\nDEPLOY_OK\n'
