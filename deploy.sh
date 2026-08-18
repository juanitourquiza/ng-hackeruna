#!/usr/bin/env bash
#
# deploy.sh — build de producción + deploy por rsync a hackeruna.com
#
# Uso:
#   ./deploy.sh                       # build + deploy (pide contraseña SSH)
#   SKIP_BUILD=1 ./deploy.sh          # solo deploy (usa dist/ ya construido)
#   SSHPASS='...' ./deploy.sh         # deploy no interactivo (requiere sshpass)
#
# Variables configurables por entorno:
#   REMOTE_USER   (default: ng-hackeruna)
#   REMOTE_HOST   (default: 159.203.136.40)
#   REMOTE_PATH   (default: ~/public_html)   <-- AJUSTAR al docroot real del servidor
#   NODE_VERSION  (default: 22)
#
set -euo pipefail

REMOTE_USER="${REMOTE_USER:-ng-hackeruna}"
REMOTE_HOST="${REMOTE_HOST:-159.203.136.40}"
REMOTE_PATH="${REMOTE_PATH:-~/public_html}"
NODE_VERSION="${NODE_VERSION:-22}"
DIST_DIR="dist/hackeruna-frontend/browser"

cd "$(dirname "$0")"

# --- Node correcto (Angular 22 requiere Node 20.19+/22.12+/24) ---
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$HOME/.nvm/nvm.sh"
  nvm use "$NODE_VERSION" >/dev/null 2>&1 || nvm install "$NODE_VERSION"
fi
echo "▶ Node $(node -v)"

# --- Build ---
if [ "${SKIP_BUILD:-0}" != "1" ]; then
  echo "▶ Instalando dependencias (npm ci)..."
  npm ci
  echo "▶ Compilando producción..."
  CI=true npm run build:prod
fi

if [ ! -d "$DIST_DIR" ]; then
  echo "✗ No existe $DIST_DIR. Aborta." >&2
  exit 1
fi
echo "▶ Bundle listo: $DIST_DIR ($(du -sh "$DIST_DIR" | cut -f1))"

# --- Deploy por rsync ---
RSYNC_OPTS=(-avz --delete --exclude '.DS_Store')
TARGET="${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "▶ Desplegando a ${TARGET} ..."
if command -v sshpass >/dev/null 2>&1 && [ -n "${SSHPASS:-}" ]; then
  sshpass -e rsync "${RSYNC_OPTS[@]}" -e "ssh -o StrictHostKeyChecking=accept-new" "$DIST_DIR/" "$TARGET"
else
  rsync "${RSYNC_OPTS[@]}" -e "ssh -o StrictHostKeyChecking=accept-new" "$DIST_DIR/" "$TARGET"
fi

echo "✓ Deploy completado. Verifica: https://hackeruna.com/"
