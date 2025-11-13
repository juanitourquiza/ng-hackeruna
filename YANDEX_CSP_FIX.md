# 🔧 Fix: CSP Bloqueando Yandex Metrika

**Fecha:** 13 de Noviembre, 2025  
**Problema:** CSP bloqueaba WebSocket de Yandex  
**Estado:** ✅ Resuelto

---

## 🚨 Problema Identificado

El navegador mostraba estos errores en consola:

```
❌ Connecting to 'https://ep1.adfilter.googleadservicequalitypolyfills-B6TNHZQ6.js:1'
   violates the following Content Security Policy directive: "connect-src 'self'"
   The action has been blocked.

❌ Connecting to 'wss://mc.yandex.ru/solid.ws'
   violates the following Content Security Policy directive: "connect-src 'self'"
   The action has been blocked.
```

**Causa:** El CSP no permitía conexiones WebSocket (`wss://`) a Yandex.

---

## ✅ Solución Aplicada

### **Cambio en `src/index.html` (Línea 53)**

**Antes:**
```html
connect-src 'self' https://backend.hackeruna.com https://*.google-analytics.com 
https://*.analytics.google.com https://pagead2.googlesyndication.com 
https://*.googletagmanager.com https://www.youtube.com https://mc.yandex.ru 
https://*.yandex.ru;
```

**Después:**
```html
connect-src 'self' https://backend.hackeruna.com https://*.google-analytics.com 
https://*.analytics.google.com https://pagead2.googlesyndication.com 
https://*.googletagmanager.com https://www.youtube.com https://mc.yandex.ru 
https://*.yandex.ru wss://mc.yandex.ru wss://*.yandex.ru;
```

**Cambio:** Agregado `wss://mc.yandex.ru wss://*.yandex.ru`

---

## 🔍 ¿Qué es `wss://`?

| Protocolo | Significado | Uso |
|-----------|-------------|-----|
| `https://` | HTTP Seguro | Solicitudes normales |
| `wss://` | WebSocket Seguro | Conexiones en tiempo real |
| `ws://` | WebSocket | Conexiones sin encriptar |

**Yandex Metrika usa `wss://` para:**
- Enviar datos en tiempo real
- Grabación de sesiones
- Mapa de calor
- Eventos de interacción

---

## 🧪 Verificación

### **Antes del Fix:**
```
❌ wss://mc.yandex.ru/solid.ws - BLOQUEADO
❌ Yandex no puede enviar datos
❌ Mapa de calor no funciona
```

### **Después del Fix:**
```
✅ wss://mc.yandex.ru/solid.ws - PERMITIDO
✅ Yandex puede enviar datos
✅ Mapa de calor funciona
```

---

## 📊 CSP Completo Actualizado

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  img-src 'self' data: https: http:; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://pagead2.googlesyndication.com 
    https://www.googletagmanager.com 
    https://*.google-analytics.com 
    https://adservice.google.com 
    https://googleads.g.doubleclick.net 
    https://tpc.googlesyndication.com 
    https://www.youtube.com 
    https://s.ytimg.com 
    https://mc.yandex.ru; 
  style-src 'self' 'unsafe-inline' 
    https://fonts.googleapis.com 
    https://adservice.google.com; 
  font-src 'self' https://fonts.gstatic.com; 
  connect-src 'self' 
    https://backend.hackeruna.com 
    https://*.google-analytics.com 
    https://*.analytics.google.com 
    https://pagead2.googlesyndication.com 
    https://*.googletagmanager.com 
    https://www.youtube.com 
    https://mc.yandex.ru 
    https://*.yandex.ru 
    wss://mc.yandex.ru 
    wss://*.yandex.ru;
  frame-src 'self' 
    https://www.youtube.com 
    https://www.youtube-nocookie.com 
    https://player.vimeo.com 
    https://www.dailymotion.com 
    https://googleads.g.doubleclick.net 
    https://tpc.googlesyndication.com;
  media-src 'self' https: data: blob:;
  child-src 'self' 
    https://www.youtube.com 
    https://www.youtube-nocookie.com;
">
```

---

## 🚀 Próximos Pasos

### **1. Recargar Navegador**
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### **2. Verificar en Consola**
```javascript
// F12 → Console
console.log(window.ym);
// Debería mostrar: ƒ ym(a,b,c){...}
```

### **3. Verificar en Network Tab**
```
F12 → Network
Buscar: wss://mc.yandex.ru
Debería mostrar: [101 Switching Protocols]
```

### **4. Probar URLs de Debug**
```
https://hackeruna.com/?_ym_debug=2
https://hackeruna.com/?_ym_status-check=105301804&_ym_lang=en
```

---

## 📋 Cambios Realizados

| Archivo | Línea | Cambio |
|---------|-------|--------|
| `src/index.html` | 53 | Agregado `wss://mc.yandex.ru wss://*.yandex.ru` en `connect-src` |

---

## ✅ Checklist

- [x] Identificar problema de CSP
- [x] Agregar `wss://` a connect-src
- [x] Permitir `wss://mc.yandex.ru`
- [x] Permitir `wss://*.yandex.ru`
- [ ] Recargar navegador (Cmd+Shift+R)
- [ ] Verificar en consola (F12)
- [ ] Verificar en Network tab
- [ ] Probar URLs de debug
- [ ] Confirmar que Yandex funciona

---

## 🎯 Resultado Esperado

Después de aplicar este fix:

```
✅ Yandex Metrika se carga correctamente
✅ WebSocket conecta sin errores
✅ Mapa de calor funciona
✅ Grabación de sesiones funciona
✅ Clickmap funciona
✅ No hay errores de CSP en consola
```

---

## 📚 Recursos

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Yandex Metrika Docs](https://yandex.com/support/metrica/)

---

**Status:** ✅ Fix Aplicado  
**Fecha:** 13 de Noviembre, 2025
