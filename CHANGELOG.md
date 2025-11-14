# Changelog - Hackeruna Frontend

Todos los cambios notables en este proyecto serán documentados en este archivo.

---

## [1.0.2] - 14 de Noviembre, 2025

### ✨ Agregado

- **Mixpanel Analytics**
  - Instalación de script de Mixpanel
  - Configuración de autocapture (100%)
  - Session recording habilitado (100%)
  - Integración con CSP

- **Google AdSense**
  - Creación de archivo `ads.txt`
  - Configuración de autorización de vendedores
  - Documentación de setup

- **Optimizaciones de CSP**
  - Agregar dominios de Google Ad Traffic Quality (`*.adtrafficquality.google`)
  - Agregar dominios regionales de Google Analytics
  - Agregar soporte para Mixpanel APIs

### 🔧 Arreglado

- **Estilos de Código Preformateado**
  - Arreglar visibilidad en light mode
  - Cambiar colores de `<pre>` para mejor contraste
  - Fondo: #F5F5F5 (light) / #1E1E1E (dark)
  - Texto: #1A1A1A (light) / #E8E8E8 (dark)

- **HTML5 Compliance**
  - Mover `<noscript>` de Yandex del `<head>` al `<body>`
  - Cumplir con especificación HTML5 para noscript
  - Eliminar errores de parsing

- **Content Security Policy**
  - Agregar `frame-src` para Google Ad Traffic Quality
  - Agregar `child-src` para Mixpanel
  - Agregar `wss://` para WebSocket de Yandex

### 📊 Analytics

- Yandex Metrika: Mapa de calor, Webvisor, Clickmap
- Google Analytics: GA4 con dominios regionales
- Google Ads: Verificación de calidad de tráfico
- Mixpanel: Autocapture y session recording

### 📝 Documentación

- `MIXPANEL_SETUP.md` - Configuración de Mixpanel
- `ADSENSE_ADS_TXT_SETUP.md` - Setup de ads.txt
- `PREFORMATTED_TEXT_FIX.md` - Fix de estilos de código
- `NOSCRIPT_HTML5_FIX.md` - Fix de HTML5 compliance
- `CSP_GOOGLE_ANALYTICS_FIX.md` - Fix de CSP para Google
- `CSP_FINAL_SUMMARY.md` - Resumen completo del CSP

---

## [1.0.1] - 13 de Noviembre, 2025

### ✨ Agregado

- **Yandex Metrika**
  - Script de tracking instalado
  - Mapa de calor habilitado
  - Webvisor (session recording) habilitado
  - Clickmap habilitado
  - Link tracking habilitado

- **Content Security Policy**
  - Agregar `https://mc.yandex.ru` a `script-src`
  - Agregar `wss://mc.yandex.ru` y `wss://*.yandex.ru` a `connect-src`
  - Agregar `frame-src` para Yandex
  - Agregar `child-src` para Yandex

- **DNS Prefetch**
  - Agregar prefetch para `https://mc.yandex.ru`

### 📝 Documentación

- `YANDEX_METRIKA_SETUP.md` - Configuración inicial
- `YANDEX_METRIKA_CONEXION.md` - Guía de conexión
- `YANDEX_CSP_FIX.md` - Fix de CSP y WebSocket

---

## [1.0.0] - Inicial

### ✨ Agregado

- Proyecto Angular inicial
- Configuración de Tailwind CSS
- Setup de componentes base
- Configuración de routing
- Integración con backend

---

## 📋 Formato de Versión

Este proyecto sigue [Semantic Versioning](https://semver.org/):

- **MAJOR** - Cambios incompatibles
- **MINOR** - Nuevas características compatibles
- **PATCH** - Arreglos de bugs

---

## 🔄 Próximas Versiones Planeadas

### [1.0.3] - Próximo

- [ ] Optimización de performance
- [ ] Mejoras en SEO
- [ ] Más eventos personalizados en Mixpanel
- [ ] Integración con más servicios

### [1.1.0] - Futuro

- [ ] Nuevas características
- [ ] Mejoras en UX
- [ ] Optimizaciones de carga

---

## 📊 Estadísticas

| Versión | Fecha | Cambios | Documentos |
|---------|-------|---------|-----------|
| 1.0.2 | 14/11/2025 | 8 | 6 |
| 1.0.1 | 13/11/2025 | 3 | 3 |
| 1.0.0 | - | - | - |

---

## 🔗 Recursos

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Última Actualización:** 14 de Noviembre, 2025  
**Versión Actual:** 1.0.2
