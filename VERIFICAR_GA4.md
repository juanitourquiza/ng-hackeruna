# 🔍 Verificar Google Analytics 4

## ⚠️ Problema Actual

**Mensaje en GA:** "La recogida de datos en tu sitio web no está activada"

### Causas:
1. ✅ **Estás en localhost** - GA4 normalmente no envía datos desde localhost
2. ⚠️ **No has hecho deploy** - El sitio en producción aún tiene la versión antigua
3. 🔴 **Errores de CSP** - Content Security Policy bloqueó los scripts

---

## ✅ Solución 1: Verificar en Localhost (Debug Mode)

He activado el **modo debug** en GA4. Ahora puedes verificar que funciona:

### 1. Abrir la Consola del Navegador

```bash
# En Chrome/Edge/Firefox:
F12 → Pestaña "Console"
```

### 2. Verificar que GA4 carga sin errores

Busca mensajes como:
```
✅ Google Analytics initialized
✅ gtag loaded
```

**Si ves errores CSP:**
```
❌ Content Security Policy blocked...
```
Significa que el CSP sigue bloqueando GA4.

### 3. Navegar por el sitio

Ve a diferentes páginas:
- `/` (Home)
- `/about` (Sobre Mí)
- `/contact` (Contacto)
- `/post/algun-post` (Detalle de post)

### 4. Revisar eventos en consola

Con `debug_mode: true`, deberías ver:
```javascript
[GA4] Event: page_view
[GA4] Event: click
[GA4] Event: share
```

---

## ✅ Solución 2: Verificar en Producción (Recomendado)

Google Analytics **SOLO funciona correctamente en producción** (`https://hackeruna.com`).

### Pasos para deploy:

```bash
# 1. Build de producción con todos los cambios
npm run build:prod

# 2. Verificar archivos generados
ls -la dist/hackeruna-frontend/browser/

# 3. Verificar que CSP actualizado está en el build
cat dist/hackeruna-frontend/browser/index.html | grep -A 5 "Content-Security-Policy"

# Debe mostrar todos estos dominios:
# ✅ https://www.googletagmanager.com
# ✅ https://www.google-analytics.com
# ✅ https://region1.google-analytics.com
# ✅ https://pagead2.googlesyndication.com

# 4. Deploy a producción
# (tu método: FTP, rsync, cPanel, etc.)
```

### Después del deploy:

1. **Esperar 5-10 minutos** para que GA4 procese los datos
2. Ir a Google Analytics → **Tiempo Real**
3. Visitar `https://hackeruna.com` en otra pestaña
4. Deberías ver **1 usuario activo** en Tiempo Real

---

## 🔧 Verificación de CSP

### Comprobar que el CSP está correcto:

```bash
# Ver CSP en el build
cat dist/hackeruna-frontend/browser/index.html | grep "Content-Security-Policy" -A 7
```

**Debe incluir:**

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  img-src 'self' data: https: http:; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://pagead2.googlesyndication.com 
    https://www.googletagmanager.com 
    https://www.google-analytics.com 
    https://adservice.google.com 
    https://googleads.g.doubleclick.net 
    https://tpc.googlesyndication.com; 
  connect-src 'self' 
    https://backend.hackeruna.com 
    https://www.google-analytics.com 
    https://analytics.google.com 
    https://region1.google-analytics.com 
    https://region1.analytics.google.com 
    https://pagead2.googlesyndication.com;
  frame-src 'self' 
    https://googleads.g.doubleclick.net 
    https://tpc.googlesyndication.com;
">
```

---

## 🧪 Test Rápido en Browser

### En Chrome DevTools:

1. Abrir: `http://localhost:4200`
2. Abrir DevTools: `F12`
3. Pestaña **Network**
4. Filtrar por: `google-analytics` o `gtag`
5. Navegar a `/about`
6. Deberías ver requests a:
   - ✅ `https://www.google-analytics.com/g/collect?...`
   - ✅ `https://region1.google-analytics.com/g/collect?...`

**Si NO aparecen requests:**
- ⚠️ GA4 está siendo bloqueado por CSP
- ⚠️ Los scripts no están cargando

**Si aparecen requests con status 200:**
- ✅ GA4 está funcionando correctamente

---

## 📊 Verificar en Google Analytics

### 1. Ir a Google Analytics 4

```
https://analytics.google.com/
```

### 2. Seleccionar propiedad "Hackeruna"

### 3. Ir a "Tiempo Real"

```
Informes → Tiempo Real
```

### 4. Visitar tu sitio en producción

```
https://hackeruna.com
https://hackeruna.com/about
https://hackeruna.com/contact
```

### 5. Verificar eventos

Deberías ver en Tiempo Real:
- ✅ **Usuarios activos:** 1 (tú)
- ✅ **Eventos:** page_view, click, etc.
- ✅ **Páginas:** /, /about, /contact

---

## 🎯 Checklist de Verificación

- [ ] Build de producción completado (`npm run build:prod`)
- [ ] CSP actualizado en `dist/hackeruna-frontend/browser/index.html`
- [ ] Deploy a producción realizado
- [ ] Sin errores CSP en consola del navegador
- [ ] Requests a Google Analytics visibles en Network tab
- [ ] Google Analytics muestra datos en Tiempo Real
- [ ] Debug mode activado para ver eventos en consola

---

## ⏰ Timeline Esperado

| Tiempo | Acción | Resultado Esperado |
|--------|--------|-------------------|
| **T+0** | Deploy a producción | Sitio actualizado |
| **T+5min** | Visitar sitio | Datos en Tiempo Real |
| **T+24-48h** | Esperar procesamiento | Datos históricos disponibles |
| **T+48h** | Revisión completa | Dashboard completo con métricas |

---

## 🐛 Troubleshooting

### Problema 1: Errores CSP en consola
**Solución:** Hacer nuevo build con CSP actualizado

### Problema 2: No aparecen datos en Tiempo Real
**Solución:** Esperar 5-10 minutos, luego refrescar Analytics

### Problema 3: "Data collection not active"
**Solución:** Asegurarte que estás en producción, no localhost

### Problema 4: Requests bloqueadas por CORS
**Solución:** Verificar que CSP incluye `connect-src` correcto

---

## 📝 Comandos Útiles

```bash
# Ver versión actual en package.json
cat package.json | grep version

# Hacer build limpio
npm run build:prod

# Verificar CSP en build
cat dist/hackeruna-frontend/browser/index.html | grep -i "content-security-policy" -A 10

# Verificar GA4 script en build
cat dist/hackeruna-frontend/browser/index.html | grep -i "G-RXGCTBC67S"

# Verificar tamaño del build
du -sh dist/hackeruna-frontend/browser/

# Listar todos los archivos del build
ls -lh dist/hackeruna-frontend/browser/
```

---

**Recuerda:** Google Analytics **SIEMPRE tarda 24-48 horas** en mostrar datos históricos completos. El Tiempo Real funciona inmediatamente después del deploy.

---

**Última actualización:** 12 de Noviembre, 2025  
**Versión:** 1.0.1
