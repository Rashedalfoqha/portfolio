#!/usr/bin/env bash
set -Eeuo pipefail

ADMIN_USER="rashedops"
SSH_DROPIN="/etc/ssh/sshd_config.d/99-rashed-job-scout.conf"

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y \
  ca-certificates \
  curl \
  fail2ban \
  git \
  jq \
  unattended-upgrades \
  ufw

if ! id "${ADMIN_USER}" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "${ADMIN_USER}"
fi

usermod -aG sudo "${ADMIN_USER}"
install -d -m 700 -o "${ADMIN_USER}" -g "${ADMIN_USER}" "/home/${ADMIN_USER}/.ssh"
install -m 600 -o "${ADMIN_USER}" -g "${ADMIN_USER}" \
  /root/.ssh/authorized_keys \
  "/home/${ADMIN_USER}/.ssh/authorized_keys"

cat >"/etc/sudoers.d/90-${ADMIN_USER}" <<EOF
${ADMIN_USER} ALL=(ALL) NOPASSWD:ALL
EOF
chmod 440 "/etc/sudoers.d/90-${ADMIN_USER}"
visudo -cf "/etc/sudoers.d/90-${ADMIN_USER}"

cat >"${SSH_DROPIN}" <<'EOF'
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
X11Forwarding no
MaxAuthTries 4
LoginGraceTime 30
EOF

sshd -t
systemctl reload ssh

ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw --force enable

systemctl enable --now fail2ban
systemctl enable --now unattended-upgrades

if ! swapon --show=NAME --noheadings | grep -qx "/swapfile"; then
  if [[ ! -f /swapfile ]]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
  fi
  swapon /swapfile
fi

if ! grep -qE '^/swapfile\s' /etc/fstab; then
  printf '/swapfile none swap sw 0 0\n' >> /etc/fstab
fi

timedatectl set-timezone Asia/Amman
hostnamectl set-hostname rashed-job-scout

printf '\nBOOTSTRAP_OK\n'
printf 'admin_user=%s\n' "${ADMIN_USER}"
printf 'firewall=%s\n' "$(ufw status | head -n 1)"
printf 'fail2ban=%s\n' "$(systemctl is-active fail2ban)"
printf 'ssh_password_authentication=disabled\n'
printf 'swap=%s\n' "$(swapon --show=SIZE --noheadings | xargs)"
