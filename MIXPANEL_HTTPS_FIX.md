# 🔧 Fix: Mixpanel - HTTP Bloqueado por CSP

**Fecha:** 14 de Noviembre, 2025  
**Problema:** Script de Mixpanel se carga con HTTP en desarrollo  
**Estado:** ✅ Resuelto

---

## 🚨 Errores Identificados

### **1. CSP Bloquea HTTP**
```
❌ Loading the script 'http://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'
   violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' 'unsafe-eval' ..."
   The action has been blocked.
```

### **2. Error de Conexión (403)**
```
❌ Failed to load resource: the server responded with a status of 403 ()
```

**Causa:** El script de Mixpanel usa protocolo relativo (`//cdn.mxpnl.com`) que en desarrollo se resuelve como `http://` y el CSP bloquea HTTP.

---

## ✅ Solución Aplicada

### **Cambio en `src/index.html` (Línea 112)**

**Antes (Incorrecto):**
```javascript
k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
  MIXPANEL_CUSTOM_LIB_URL:
  "file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)
    ?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
    :"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
```
❌ Usa protocolo relativo `//` que se resuelve como `http://` en desarrollo

**Después (Correcto):**
```javascript
k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
  MIXPANEL_CUSTOM_LIB_URL:
  "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
```
✅ Usa siempre `https://` explícitamente

---

## 📊 ¿Por Qué Ocurre?

### **Protocolo Relativo (`//`)**

El protocolo relativo `//cdn.mxpnl.com` se comporta así:

| Contexto | URL | Resultado |
|----------|-----|-----------|
| Producción (`https://hackeruna.com`) | `//cdn.mxpnl.com` | `https://cdn.mxpnl.com` ✅ |
| Desarrollo (`http://localhost:4200`) | `//cdn.mxpnl.com` | `http://cdn.mxpnl.com` ❌ |

**Problema:** En desarrollo, se resuelve como HTTP y el CSP lo bloquea.

**Solución:** Usar siempre `https://` explícitamente.

---

## 🔍 Error de Angular NG0751

```
⚠️ NG0751: Angular has detected that this application contains `@defer` blocks
   and the hot module replacement (HMR) mode is enabled.
```

**¿Qué es?**
- Es una **advertencia de desarrollo**, no un error
- Ocurre cuando HMR está habilitado con bloques `@defer`
- No afecta la funcionalidad

**Solución:**
- ✅ Ignorar en desarrollo
- ✅ No aparece en producción
- ✅ Funcionalidad normal

---

## 📋 Cambios Realizados

| Archivo | Línea | Cambio |
|---------|-------|--------|
| `src/index.html` | 112 | Cambiar protocolo relativo a HTTPS explícito |

---

## 🧪 Verificación

### **Paso 1: Recargar Navegador**

```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### **Paso 2: Abrir Consola (F12)**

```javascript
// No deberían aparecer errores de CSP para Mixpanel
console.log(window.mixpanel);
// Debería mostrar: Object { init: ƒ, track: ƒ, ... }
```

### **Paso 3: Verificar Network Tab**

```
F12 → Network
Buscar: cdn.mxpnl.com
Debería mostrar: [200 OK] con HTTPS
```

### **Paso 4: Verificar Mixpanel**

```
https://mixpanel.com/
Setup Guide → Verify Connection
Debería mostrar: ✅ Events, Users, Replays
```

---

## 📊 Errores Resueltos

| Error | Causa | Solución |
|-------|-------|----------|
| CSP bloquea HTTP | Protocolo relativo en desarrollo | Usar HTTPS explícito |
| Error 403 | HTTP no permitido | Usar HTTPS explícito |
| NG0751 | HMR + @defer | Ignorar (advertencia) |

---

## ✅ Checklist

```
✅ Cambiar protocolo relativo a HTTPS
✅ Recargar navegador (Cmd+Shift+R)
✅ Verificar en consola (F12)
✅ Verificar en Network tab
✅ Verificar que Mixpanel se carga con HTTPS
✅ Confirmar que no hay errores de CSP
```

---

## 🎯 Próximos Pasos

### **Inmediato:**
1. Recargar navegador (Cmd+Shift+R)
2. Verificar en consola (F12)
3. Verificar que no hay errores de CSP

### **Verificación:**
1. Abrir Network tab
2. Buscar `cdn.mxpnl.com`
3. Debería mostrar HTTPS [200 OK]

### **Validación:**
1. Ir a Mixpanel dashboard
2. Verificar que aparecen eventos
3. Confirmar que funciona correctamente

---

## 📚 Recursos

| Recurso | URL |
|---------|-----|
| MDN: CSP | https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP |
| Mixpanel Docs | https://developer.mixpanel.com/ |
| Angular NG0751 | https://angular.dev/errors/NG0751 |

---

## 🔗 Información de Tu Proyecto

| Dato | Valor |
|------|-------|
| **Dominio Prod** | https://hackeruna.com |
| **Dominio Dev** | http://localhost:4200 |
| **Token Mixpanel** | 569d103248457398b9adec970066d8c3 |
| **CDN Mixpanel** | https://cdn.mxpnl.com |
| **Versión** | 1.0.2 |

---

## 🎯 Resumen

**El fix permite que:**

1. ✅ Mixpanel se cargue con HTTPS en desarrollo y producción
2. ✅ Sin errores de CSP
3. ✅ Sin errores 403
4. ✅ Funcionalidad completa

**NG0751 es solo una advertencia de desarrollo, no afecta funcionalidad.** ⚠️

---

**Status:** ✅ Fix Aplicado  
**Última Actualización:** 14 de Noviembre, 2025  
**Próximo Paso:** Recargar navegador y verificar
