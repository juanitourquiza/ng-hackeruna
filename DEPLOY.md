# Deploy runbook — hackeruna.com

Guía del proceso de despliegue de este proyecto (Angular 22 → Cloudways).

## Contexto

- **Frontend:** Angular 22 (build estático). Salida servida: `dist/hackeruna-frontend/browser/`.
- **Node:** Angular 22 requiere Node `^20.19 || ^22.12 || ^24`. Usa **Node 22** (`nvm use 22`). Node 26 NO está soportado.
- **Hosting:** Cloudways, servidor `159.203.136.40`, usuario SSH `ng-hackeruna`.
  - Web root: `~/public_html/` — la SPA se sirve desde `~/public_html/dist/hackeruna-frontend/browser/` (requiere `.htaccess` para el routing SPA).
  - Home NO escribible (owned root); dirs escribibles: `public_html`, `private_html`, `tmp`.
- **Cloudways “Deployment via GIT”:** remoto `git@github.com:juanitourquiza/ng-hackeruna.git`, branch `main`, deployment path `public_html/`.

## Opción A — Flujo canónico (recomendado, desde tu Terminal)

Construyes local, commiteas el `dist`, push a `main`; Cloudways despliega `main` → `public_html/`.

```bash
cd ~/Documents/dev/ng-hackeruna
git checkout main
nvm use 22
npm ci
npm run build:prod                 # genera dist/hackeruna-frontend/browser + .htaccess
git add -A
git commit -m "release: vX.Y.Z ..."
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --tags
```

Luego en Cloudways → **Deployment via GIT → Start Deployment** (branch `main`).

## Opción B — Build en el servidor + swap (usado cuando el build local no está disponible)

Compila en el servidor con Node 22 y reemplaza el `browser/` de forma casi atómica (sin caer el sitio). Requiere `expect` local (sin `sshpass`).

1. **Node 22 en el server** (una vez): binario oficial en `~/private_html/node22/bin`.
2. **Transferir fuente**: `ssh 'cat > file'` con los archivos cambiados (evita `tar`/`rsync`).
3. **Build**: `cd ~/private_html/ngbuild && npm install && npm run build:prod`
   - `export npm_config_cache=~/private_html/.npmcache TMPDIR=~/private_html/.tmp` (home no escribible)
   - `NG_BUILD_MAX_WORKERS=1 NODE_OPTIONS=--max-old-space-size=1024` (RAM ~1 GB)
   - `rm -rf node_modules` si hay `ENOTEMPTY`.
4. **Copiar `.htaccess`** del `browser/` vivo al nuevo (copy-htaccess.js falla si no hay `.htaccess` en raíz).
5. **Swap**: `cp -r` a `browser.new` → `chgrp -R www-data` + `chmod -R a+rX` → `mv browser browser.prev-$(date) && mv browser.new browser`.
6. **Verificar** en vivo: `curl -I https://hackeruna.com/`, título, `main-*.js` (200), rutas SPA, robots/sitemap/llms.
7. **Notificar** en el canal ClickUp `deploys`.

Backups: `~/private_html/browser-backup-*` y `~/public_html/dist/hackeruna-frontend/browser.prev-*`.

> ⚠️ Si usas la Opción B, recuerda commitear el `dist` a `main` para que un futuro deploy vía GIT de Cloudways no revierta el build.

## Versionado

- La versión del footer viene de `package.json` (`version`). Súbela antes de release.
- Crea tag + GitHub Release: `git tag -a vX.Y.Z`, `gh release create vX.Y.Z`.
