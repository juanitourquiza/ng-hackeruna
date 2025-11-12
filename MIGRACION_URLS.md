# 🔄 Solución de Migración de URLs - WordPress a Angular

**Problema:** Las URLs antiguas de WordPress con fecha ya no funcionan en la nueva aplicación Angular, causando pérdida de SEO y enlaces rotos.

---

## 📋 URLs Antes vs Después

### ❌ URLs Antiguas (WordPress)
```
https://www.hackeruna.com/2025/08/31/la-ia-nos-esta-dejando-sin-codigo-reflexiones-despues-de-20-anos-programando/
```

### ✅ URLs Nuevas (Angular)
```
https://hackeruna.com/post/la-ia-nos-esta-dejando-sin-codigo-reflexiones-despues-de-20-anos-programando
```

---

## 🛠️ Solución Implementada

### 1. **Redirects 301 en .htaccess**

Se agregaron reglas de redirect 301 permanente en `.htaccess` que:

1. **Normalización de dominio** - Redirect de `www` a sin `www`
2. **Redirect de URLs con fecha** - Transforma automáticamente el patrón de WordPress

**Archivo:** `.htaccess`

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# ============================================
# REDIRECTS 301 - WordPress a Angular URLs
# ============================================

# 1. Redirect con www a sin www (normalización)
RewriteCond %{HTTP_HOST} ^www\.hackeruna\.com [NC]
RewriteRule ^(.*)$ https://hackeruna.com/$1 [R=301,L]

# 2. Redirect URLs de WordPress con fecha a nuevo formato
# Patrón: /YYYY/MM/DD/slug/ → /post/slug
RewriteRule ^[0-9]{4}/[0-9]{2}/[0-9]{2}/(.+)/?$ /post/$1 [R=301,L]

# ============================================
# Angular SPA Routing
# ============================================
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔍 Cómo Funciona

### Ejemplo 1: URL con fecha
```
Usuario visita:
https://www.hackeruna.com/2025/08/31/la-ia-nos-esta-dejando-sin-codigo/

Apache detecta el patrón /YYYY/MM/DD/slug/
↓
Redirect 301 a:
https://hackeruna.com/post/la-ia-nos-esta-dejando-sin-codigo

Angular carga la ruta /post/:slug
↓
WordPress API entrega el contenido por slug
```

### Ejemplo 2: URL con www
```
Usuario visita:
https://www.hackeruna.com/portfolio

Redirect 301 a:
https://hackeruna.com/portfolio

Angular carga normalmente
```

---

## ✅ Beneficios

1. **SEO Preservado** ✅
   - Google mantiene el ranking de las URLs antiguas
   - Los enlaces externos siguen funcionando
   - PageRank se transfiere al nuevo dominio

2. **301 Permanente** ✅
   - Google actualiza su índice automáticamente
   - Los navegadores cachean el redirect
   - Usuarios son redirigidos instantáneamente

3. **Normalización de Dominio** ✅
   - Todas las URLs usan `hackeruna.com` (sin www)
   - Evita contenido duplicado
   - Mejor para SEO

---

## 🚀 Deployment

### Opción A: Copiar manualmente
```bash
# Después de hacer build
npm run build

# Copiar .htaccess a dist
cp .htaccess dist/hackeruna-frontend/browser/.htaccess
```

### Opción B: Script automático (Recomendado)

**Crear archivo:** `copy-htaccess.js`

```javascript
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '.htaccess');
const dest = path.join(__dirname, 'dist/hackeruna-frontend/browser/.htaccess');

// Esperar que exista el directorio dist
const distDir = path.dirname(dest);
if (!fs.existsSync(distDir)) {
  console.log('❌ Directorio dist no existe. Ejecuta npm run build primero.');
  process.exit(1);
}

// Copiar archivo
fs.copyFileSync(source, dest);
console.log('✅ .htaccess copiado a dist/');
```

**Actualizar `package.json`:**

```json
{
  "scripts": {
    "build": "ng build",
    "build:prod": "ng build && node copy-htaccess.js"
  }
}
```

**Uso:**
```bash
npm run build:prod
```

### Opción C: Incluir en angular.json

**Actualizar `angular.json`:**

```json
{
  "projects": {
    "hackeruna-frontend": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "src/assets",
              {
                "glob": ".htaccess",
                "input": "./",
                "output": "./"
              }
            ]
          }
        }
      }
    }
  }
}
```

---

## 🧪 Testing

### 1. Test Local

```bash
# Build
npm run build

# Copiar .htaccess
cp .htaccess dist/hackeruna-frontend/browser/.htaccess

# Servir con PHP (simula Apache)
cd dist/hackeruna-frontend/browser
php -S localhost:8080

# Test redirects
curl -I http://localhost:8080/2025/08/31/test-post/
# Debería retornar:
# HTTP/1.1 301 Moved Permanently
# Location: /post/test-post/
```

### 2. Test en Producción

```bash
# Test redirect con fecha
curl -I https://www.hackeruna.com/2025/08/31/la-ia-nos-esta-dejando-sin-codigo/

# Debería retornar:
# HTTP/1.1 301 Moved Permanently
# Location: https://hackeruna.com/post/la-ia-nos-esta-dejando-sin-codigo/

# Test www redirect
curl -I https://www.hackeruna.com/portfolio

# Debería retornar:
# HTTP/1.1 301 Moved Permanently
# Location: https://hackeruna.com/portfolio
```

---

## 📊 Google Search Console

### Después del Deploy:

1. **Verificar Cobertura**
   - Ir a Google Search Console
   - Ver "Cobertura" → "Excluidas"
   - Verificar que URLs con 301 aparezcan como "Redirigida"

2. **Solicitar Re-indexación**
   - Ir a "Inspección de URLs"
   - Ingresar URL antigua con fecha
   - Click en "Solicitar indexación"
   - Google verá el 301 y actualizará

3. **Monitorear Tráfico**
   - Ir a "Rendimiento"
   - Verificar que no haya caída de clics
   - Las URLs nuevas deberían aparecer en 2-4 semanas

---

## ⚠️ Consideraciones

### WordPress Backend
Si aún usas WordPress como headless CMS:

1. **Permalinks en WordPress**
   - Puedes dejar el formato con fecha en WordPress
   - Angular solo usa el `slug` para consultar la API
   - Los redirects manejan la conversión

2. **API Endpoint**
   - WordPress API busca por slug: `/wp/v2/posts?slug=mi-post`
   - No importa el permalink de WordPress
   - Solo el slug debe coincidir

### URLs Futuras
Para posts nuevos:
- WordPress puede seguir usando `/YYYY/MM/DD/slug/`
- El redirect automáticamente convierte a `/post/slug`
- O cambiar permalinks de WordPress a solo `/%postname%/`

---

## 🎯 Checklist de Deployment

- [x] Reglas de redirect agregadas a `.htaccess`
- [x] Regla de normalización www → sin www
- [x] Patrón de fecha `/YYYY/MM/DD/slug/` → `/post/slug`
- [ ] Build de producción
- [ ] Copiar `.htaccess` a `dist/`
- [ ] Deploy a servidor
- [ ] Test de redirects en producción
- [ ] Verificar en Google Search Console
- [ ] Monitorear tráfico por 2-4 semanas

---

## 📚 Referencias

- [Google: Cambio de URLs con 301](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [SEO y Redirects](https://moz.com/learn/seo/redirection)

---

**Última Actualización:** 11 de Noviembre, 2025  
**Estado:** ✅ Implementado - Listo para deploy
