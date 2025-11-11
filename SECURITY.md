# 🔒 Security Checklist - Open Source

## ✅ Pre-Commit Checklist

Antes de hacer push a GitHub, verifica lo siguiente:

### 📝 **Archivos que PUEDES subir (seguros)**

- ✅ `src/environments/environment.ts` - Contiene valores públicos
  - `wordpressApiUrl`: URL pública del API ✅
  - `recaptchaV3SiteKey`: Clave pública de reCAPTCHA ✅
  
- ✅ `wp-content/plugins/hackeruna-contact/` - Plugin usa variables de entorno
  - ✅ NO contiene claves hardcodeadas
  - ✅ Usa `getenv('RECAPTCHA_SECRET_KEY')`

- ✅ Código fuente Angular (TypeScript, HTML, SCSS)
- ✅ Tests (*.spec.ts)
- ✅ Documentación (README.md, TESTING.md, etc.)
- ✅ Configuraciones de proyecto (package.json, angular.json, etc.)

### ❌ **Archivos que NO DEBES subir**

- ❌ `src/environments/environment.prod.ts` - Si contiene claves reales
- ❌ `.env` - Variables de entorno locales
- ❌ `wp-config.php` - Configuración de WordPress con DB credentials
- ❌ `node_modules/` - Dependencias (ya en .gitignore)
- ❌ `dist/` - Build artifacts (ya en .gitignore)
- ❌ Archivos con credenciales o tokens personales

### 🔍 **Verificación Manual**

Antes de hacer commit, ejecuta:

```bash
# 1. Buscar claves secretas en el código
grep -r "secret" src/ --include="*.ts" --include="*.js"
grep -r "password" src/ --include="*.ts" --include="*.js"
grep -r "api_key" src/ --include="*.ts" --include="*.js"

# 2. Verificar .gitignore
cat .gitignore

# 3. Ver qué archivos se van a subir
git status
git diff --cached

# 4. Verificar archivos sensibles NO están staged
git ls-files | grep -E '\.env$|wp-config\.php|environment\.prod\.ts'
```

## 🔐 Claves y Secretos

### reCAPTCHA v3

| Clave | Tipo | Ubicación | ¿Público? |
|-------|------|-----------|-----------|
| Site Key | Pública | `environment.ts` (frontend) | ✅ SÍ - Seguro exponer |
| Secret Key | Privada | Variable de entorno (backend) | ❌ NO - Nunca exponer |

**Ejemplo seguro:**

```typescript
// ✅ CORRECTO - Frontend (environment.ts)
export const environment = {
  recaptchaV3SiteKey: '6LfO4gYUAAAAAPZhUTm6ko6SrP7hSXh9LGDaqp1v' // Público
};
```

```php
// ✅ CORRECTO - Backend (hackeruna-contact.php)
$recaptcha_secret = getenv('RECAPTCHA_SECRET_KEY'); // Desde variable de entorno
```

```php
// ❌ INCORRECTO - NO HACER ESTO
$recaptcha_secret = '6LfO4gYUAAAAAXXXXXXXXXXXXXXXXXXXXX'; // NUNCA hardcodear
```

## 🚨 ¿Qué hacer si expusiste un secreto?

Si accidentalmente hiciste commit de un secreto:

### 1. **Regenerar la clave inmediatamente**
   - reCAPTCHA: https://www.google.com/recaptcha/admin
   - Generar nuevas claves

### 2. **Eliminar del historial de Git**
```bash
# Usar BFG Repo-Cleaner o git filter-branch
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/file' \
  --prune-empty --tag-name-filter cat -- --all

# Forzar push
git push origin --force --all
```

### 3. **Actualizar .gitignore y verificar**
```bash
echo "environment.prod.ts" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore to prevent secrets exposure"
```

## 📋 Configuración Recomendada para Producción

### Frontend (Angular)

**Archivo: `src/environments/environment.prod.ts`** (NO subir a repo)

```typescript
export const environment = {
  production: true,
  wordpressApiUrl: 'https://hackeruna.com/wp-json/wp/v2',
  recaptchaV3SiteKey: 'YOUR_REAL_SITE_KEY' // Público - OK
};
```

### Backend (WordPress)

**Variable de entorno en servidor:**

```bash
# En servidor de producción
export RECAPTCHA_SECRET_KEY='your_real_secret_key'
```

O en `wp-config.php` (si este archivo NO está en repo):

```php
putenv('RECAPTCHA_SECRET_KEY=your_real_secret_key');
```

## 🎯 Buenas Prácticas

1. **Usa variables de entorno** para todo lo sensible
2. **Nunca hardcodees** credenciales en el código
3. **Revisa el diff** antes de cada commit
4. **Usa .gitignore** apropiadamente
5. **Documenta** qué variables de entorno se necesitan (como en `.env.example`)
6. **Separa** claves públicas (frontend) de privadas (backend)
7. **Rota claves** periódicamente

## 📚 Referencias

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [OWASP: Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12 Factor App: Config](https://12factor.net/config)

---

**Última actualización:** 10 de noviembre, 2025  
**Autor:** Juan Urquiza - Hackeruna
