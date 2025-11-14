# 🗑️ Yandex Metrika - Eliminado del Proyecto

**Fecha:** 14 de Noviembre, 2025  
**Razón:** Problemas de compatibilidad  
**Estado:** ✅ Completamente eliminado

---

## 🚫 Elementos Eliminados

### **1. Script de Yandex Metrika (Head)**

**Ubicación:** `src/index.html` (líneas 96-107)

**Eliminado:**
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105301804', 'ym');

  ym(105301804, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
</script>
<!-- /Yandex.Metrika counter -->
```

---

### **2. Noscript de Yandex (Body)**

**Ubicación:** `src/index.html` (líneas 136-137)

**Eliminado:**
```html
<!-- Yandex.Metrika noscript (debe estar en body) -->
<noscript><div><img src="https://mc.yandex.ru/watch/105301804" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

---

### **3. Dominios de Yandex en CSP**

**Ubicación:** `src/index.html` (líneas 50, 53, 54, 56)

**Eliminado de `script-src`:**
- `https://mc.yandex.ru`

**Eliminado de `connect-src`:**
- `https://mc.yandex.ru`
- `https://*.yandex.ru`
- `wss://mc.yandex.ru`
- `wss://*.yandex.ru`

**Eliminado de `frame-src`:**
- `https://mc.yandex.ru`
- `https://*.yandex.ru`

**Eliminado de `child-src`:**
- `https://mc.yandex.ru`
- `https://*.yandex.ru`

---

### **4. DNS Prefetch de Yandex**

**Ubicación:** `src/index.html` (línea 69)

**Eliminado:**
```html
<link rel="dns-prefetch" href="https://mc.yandex.ru">
```

---

## 📊 Servicios de Analytics Restantes

Después de eliminar Yandex Metrika, los siguientes servicios siguen activos:

| Servicio | Estado | Propósito |
|----------|--------|----------|
| **Google Analytics 4** | ✅ Activo | Analytics general |
| **Google AdSense** | ✅ Activo | Monetización |
| **Mixpanel** | ✅ Activo | Event tracking, Session recording |

---

## 📋 CSP Actualizado

**Después de eliminar Yandex:**

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
    https://*.adtrafficquality.google 
    https://region1.google-analytics.com 
    https://region1.analytics.google.com 
    https://cdn.mxpnl.com 
    https://api-js.mixpanel.com 
    https://fundingchoicesmessages.google.com 
    https://*.google.com;
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
    https://*.adtrafficquality.google 
    https://region1.google-analytics.com 
    https://region1.analytics.google.com 
    https://api.mixpanel.com 
    https://api-eu.mixpanel.com 
    https://api-js.mixpanel.com 
    https://cdn.mxpnl.com;
  frame-src 'self' 
    https://www.youtube.com 
    https://www.youtube-nocookie.com 
    https://player.vimeo.com 
    https://www.dailymotion.com 
    https://googleads.g.doubleclick.net 
    https://tpc.googlesyndication.com 
    https://*.adtrafficquality.google 
    https://www.google.com;
  media-src 'self' https: data: blob:;
  child-src 'self' 
    https://www.youtube.com 
    https://www.youtube-nocookie.com 
    https://*.adtrafficquality.google 
    https://www.google.com;
">
```

---

## ✅ Checklist

```
✅ Script de Yandex eliminado del head
✅ Noscript de Yandex eliminado del body
✅ Dominios de Yandex eliminados del CSP
✅ DNS prefetch de Yandex eliminado
✅ CSP limpio y funcional
✅ Solo Google Analytics, AdSense y Mixpanel activos
```

---

## 🔄 Para Restaurar Yandex (Opcional)

Si en el futuro quieres restaurar Yandex Metrika:

1. Revisar archivos de documentación:
   - `YANDEX_METRIKA_SETUP.md`
   - `YANDEX_METRIKA_CONEXION.md`
   - `YANDEX_CSP_FIX.md`

2. Agregar dominios al CSP:
   - `script-src`: `https://mc.yandex.ru`
   - `connect-src`: `https://mc.yandex.ru https://*.yandex.ru wss://mc.yandex.ru wss://*.yandex.ru`
   - `frame-src`: `https://mc.yandex.ru https://*.yandex.ru`
   - `child-src`: `https://mc.yandex.ru https://*.yandex.ru`

3. Agregar script en `<head>`
4. Agregar noscript en `<body>`
5. Agregar DNS prefetch

---

## 📚 Documentación Obsoleta

Los siguientes archivos de documentación ahora son obsoletos:

- `YANDEX_METRIKA_SETUP.md` (mantener para referencia)
- `YANDEX_METRIKA_CONEXION.md` (mantener para referencia)
- `YANDEX_CSP_FIX.md` (mantener para referencia)

**No eliminar:** Pueden ser útiles si decides restaurar Yandex en el futuro.

---

## 🎯 Resumen

**Cambios realizados:**

1. ✅ Yandex Metrika eliminado completamente
2. ✅ CSP actualizado y limpio
3. ✅ DNS prefetch optimizado
4. ✅ Solo servicios esenciales activos

**Servicios activos:**
- Google Analytics 4
- Google AdSense
- Mixpanel

**Ventajas:**
- Menos scripts cargando
- CSP más limpio
- Menos complejidad
- Sin problemas de Yandex

---

**Status:** ✅ Yandex Completamente Eliminado  
**Última Actualización:** 14 de Noviembre, 2025  
**Próximo Paso:** Recargar navegador y verificar que todo funciona
