#!/usr/bin/env bash
set -Eeuo pipefail

container="rashed-job-scout"
status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "${container}" 2>/dev/null || true)"

if [[ "${status}" == "healthy" || "${status}" == "starting" ]]; then
  exit 0
fi

logger -t rashed-job-scout-watchdog "Container status is '${status:-missing}'; recovering service."
cd /opt/rashed-job-scout
sudo -u rashedops docker compose up -d scout
docker restart "${container}" >/dev/null
