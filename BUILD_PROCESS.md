# 🏗️ Proceso de Build Automático - Hackeruna

**Última actualización:** 11 de Noviembre, 2025

---

## 🎯 Resumen

El proceso de build está configurado para **copiar automáticamente** el archivo `.htaccess` al directorio de producción en cada build. Esto asegura que los redirects 301 y las configuraciones del servidor estén siempre presentes.

---

## 📋 Comandos Disponibles

### 1. **Build de Desarrollo**
```bash
npm run build
```

**Hace:**
- ✅ Compila la aplicación Angular
- ✅ Copia `.htaccess` a `dist/hackeruna-frontend/browser/`
- ⚠️ NO aplica optimizaciones de producción

**Uso:** Testing local del build

---

### 2. **Build de Producción** (RECOMENDADO)
```bash
npm run build:prod
```

**Hace:**
- ✅ Compila la aplicación Angular con optimizaciones
- ✅ Minifica JavaScript, CSS y HTML
- ✅ Tree-shaking (elimina código no usado)
- ✅ Compresión adicional
- ✅ Copia `.htaccess` a `dist/hackeruna-frontend/browser/`

**Uso:** Deploy a producción (Cloudways, servidor)

---

### 3. **Desarrollo en Vivo**
```bash
npm start
# o
npm run watch
```

**Hace:**
- ✅ Servidor de desarrollo en `http://localhost:4200`
- ✅ Hot reload (recarga automática)
- ❌ NO copia `.htaccess` (no es necesario en dev)

**Uso:** Desarrollo diario

---

## 🔧 Sistema de Copia Automática

### Archivo: `copy-htaccess.js`

```javascript
#!/usr/bin/env node

/**
 * Script que se ejecuta DESPUÉS de cada build
 * Copia .htaccess desde la raíz al directorio dist
 */

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '.htaccess');
const dest = path.join(__dirname, 'dist/hackeruna-frontend/browser/.htaccess');

// Verifica, copia y valida el archivo
```

### Configuración en `package.json`

```json
{
  "scripts": {
    "build": "ng build && node copy-htaccess.js",
    "build:prod": "ng build --configuration production && node copy-htaccess.js"
  }
}
```

**Nota:** El operador `&&` asegura que el script de copia **solo se ejecute si el build es exitoso**.

---

## ✅ Verificación Automática

El script `copy-htaccess.js` realiza las siguientes verificaciones:

### 1. ✅ Archivo Fuente Existe
```
Verifica que .htaccess existe en la raíz del proyecto
```

### 2. ✅ Directorio Destino Existe
```
Verifica que dist/hackeruna-frontend/browser/ existe
```

### 3. ✅ Copia Exitosa
```
Copia el archivo y confirma que se completó
```

### 4. ✅ Validación de Contenido
```
Verifica que los redirects 301 estén presentes
```

---

## 📊 Salida del Script

### ✅ Éxito
```bash
📋 Copiando .htaccess a dist...

✅ .htaccess copiado exitosamente!
   Origen: /Users/juanurquiza/Documents/dev/ng-hackeruna/.htaccess
   Destino: /Users/juanurquiza/Documents/dev/ng-hackeruna/dist/hackeruna-frontend/browser/.htaccess

✅ Redirects 301 verificados en el archivo

🚀 Listo para deploy!
```

### ❌ Error - Archivo No Existe
```bash
📋 Copiando .htaccess a dist...

❌ Error: .htaccess no existe en la raíz del proyecto
```

### ❌ Error - Directorio No Existe
```bash
📋 Copiando .htaccess a dist...

❌ Error: Directorio dist no existe.
   Ejecuta "npm run build" primero.
```

---

## 🎯 Flujo de Trabajo Completo

### Para Deploy a Producción:

```bash
# 1. Asegurar que el código está limpio
git status

# 2. Build de producción (incluye .htaccess automáticamente)
npm run build:prod

# 3. Verificar el build
ls -lh dist/hackeruna-frontend/browser/

# Deberías ver:
# - index.html
# - *.js (bundles)
# - assets/
# - .htaccess  ✅

# 4. Verificar contenido del .htaccess
cat dist/hackeruna-frontend/browser/.htaccess

# 5. Deploy usando tu método preferido
# - FileZilla (FTP/SFTP)
# - rsync
# - Git deploy
# - Cloudways interface
```

---

## 📁 Estructura del .htaccess

El archivo `.htaccess` en la raíz del proyecto contiene:

### 1. **Redirects 301 de WordPress a Angular**
```apache
# Redirect de URLs antiguas de WordPress
RewriteRule ^[0-9]{4}/[0-9]{2}/[0-9]{2}/(.*)$ /post/$1 [R=301,L]
```

### 2. **Compresión Gzip**
```apache
# Comprimir assets para mejor rendimiento
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### 3. **Cache Headers**
```apache
# Cache de assets estáticos
<FilesMatch "\.(jpg|jpeg|png|gif|css|js|woff|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### 4. **SPA Routing**
```apache
# Redirigir todas las rutas a index.html (Angular routing)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

---

## 🔄 Actualizar el .htaccess

### Editar el Archivo Fuente:
```bash
# Editar .htaccess en la raíz del proyecto
code .htaccess

# O usar cualquier editor
nano .htaccess
vim .htaccess
```

### Aplicar Cambios:
```bash
# Hacer build (copia automáticamente la nueva versión)
npm run build:prod

# El nuevo .htaccess estará en dist/
```

### Deploy:
```bash
# Subir todo el directorio dist/ a producción
# El .htaccess actualizado se incluye automáticamente
```

---

## 🚨 Troubleshooting

### Problema: .htaccess no se copia

**Verificar:**
```bash
# 1. Verificar que el archivo existe en la raíz
ls -la | grep htaccess

# 2. Verificar permisos
ls -l .htaccess

# 3. Ejecutar script manualmente
node copy-htaccess.js

# 4. Verificar package.json
cat package.json | grep build
```

**Solución:**
```bash
# Si el archivo no existe, crearlo
touch .htaccess

# Dar permisos de lectura
chmod 644 .htaccess

# Rebuild
npm run build:prod
```

---

### Problema: Script falla durante build

**Error Común:**
```
❌ Error: Directorio dist no existe.
```

**Solución:**
```bash
# El script se ejecuta DESPUÉS del build
# Si el build falla, el script no se ejecuta

# 1. Limpiar dist
rm -rf dist/

# 2. Rebuild desde cero
npm run build:prod
```

---

### Problema: .htaccess en dist pero no funciona en producción

**Verificar en Servidor:**
```bash
# SSH al servidor
ssh usuario@servidor.com

# Verificar que el archivo existe
ls -la /path/to/public_html/.htaccess

# Verificar contenido
cat /path/to/public_html/.htaccess

# Verificar permisos
ls -l /path/to/public_html/.htaccess
# Debe ser: -rw-r--r-- (644)
```

**Configuración Apache:**
```bash
# Verificar que mod_rewrite está habilitado
apache2ctl -M | grep rewrite

# Si no está, habilitarlo
sudo a2enmod rewrite
sudo service apache2 restart
```

---

## 📊 Checklist de Deploy

- [ ] Código actualizado y sin errores
- [ ] `npm run build:prod` ejecutado exitosamente
- [ ] `.htaccess` presente en `dist/hackeruna-frontend/browser/`
- [ ] Contenido del `.htaccess` verificado
- [ ] Redirects 301 confirmados en el archivo
- [ ] Todo el directorio `dist/` subido al servidor
- [ ] Permisos del `.htaccess` en servidor: `644`
- [ ] Redirects probados en producción
- [ ] Cache y compresión verificados

---

## 🎓 Conceptos Importantes

### ¿Por qué copiar .htaccess?

Angular genera una SPA (Single Page Application) que necesita:

1. **Routing de SPA**: Todas las rutas deben ir a `index.html`
2. **Redirects 301**: URLs antiguas de WordPress → nuevas URLs Angular
3. **Performance**: Compresión y cache de assets
4. **SEO**: Redirects permanentes para mantener rankings

### ¿Por qué no usar angular.json assets?

```json
// ❌ NO FUNCIONA - angular.json no copia archivos ocultos
{
  "assets": [
    ".htaccess"  // Se ignora porque empieza con punto
  ]
}
```

**Solución:** Script personalizado `copy-htaccess.js` ✅

---

## 📝 Notas Adicionales

### Cloudways
- Soporta `.htaccess` nativamente
- No requiere configuración adicional
- Apache/Nginx gestionado automáticamente

### Otros Servidores
- **Apache**: `.htaccess` funciona out-of-the-box
- **Nginx**: Requiere configuración en `nginx.conf` (convertir reglas)
- **IIS**: Usar `web.config` en lugar de `.htaccess`

---

## 🔗 Referencias

**Documentación relacionada:**
- `MIGRACION_URLS.md` - Detalles de los redirects 301
- `OPTIMIZACIONES_IMPLEMENTADAS.md` - Performance y compresión
- `README.md` - Instrucciones generales del proyecto

**Apache .htaccess:**
- [Apache mod_rewrite Documentation](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [.htaccess Tutorial](https://httpd.apache.org/docs/current/howto/htaccess.html)

---

**Última Actualización:** 11 de Noviembre, 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Sistema automático funcionando correctamente  
**Mantenedor:** Juan Urquiza (@juanitourquiza)
