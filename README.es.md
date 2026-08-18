# Hackeruna Frontend

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-22-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-green)](https://hackeruna.com)
[![Versión](https://img.shields.io/badge/versión-2.2.0-blueviolet)](https://github.com/juanitourquiza/ng-hackeruna/tags)

> Frontend moderno en Angular 22 para [Hackeruna.com](https://hackeruna.com) — el blog de tecnología **y portafolio** de Juan Urquiza, con WordPress como CMS headless. Sistema de diseño dark-tech y optimización SEO/AEO/GEO.

**Síguenos:**
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/hackeruna)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/hackeruna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanitourquiza)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/juanitourquiza/ng-hackeruna)

[🇺🇸 English Version](./README.md)

## ✨ Novedades en v2.2.0

- 🚀 **Angular 22** + **TypeScript 6.0** — core actualizado
- 🎨 **Sistema de diseño dark-tech** — nuevo look tipo terminal (claro/oscuro), tarjetas de proyecto *branded*, sección "Mi Stack", footer fijo (sticky) rediseñado
- 🧩 **Portafolio renovado** — fuente única de datos de proyectos (Pulsai, ShipFrame, Kupyo, GreenWay/Herald, medicProof, KipuBank…), categoría **AI**, sin imágenes repetidas
- 👤 **Página About** reescrita desde el CV — perfil, métricas, línea de tiempo profesional, libro, Schema.org enriquecido (Person + Book)
- 🔎 **SEO / AEO / GEO** — grafo JSON-LD (WebSite + Person + Organization), canonical + hreflang, `robots.txt` (crawlers de IA), `sitemap.xml`, `llms.txt`
- 🌐 **Multiidioma** (Español e Inglés) con Transloco + traducciones con IA (GPT-4o-mini)
- 💬 **Comentarios Giscus** integrados con GitHub Discussions

> ℹ️ **Requisito de Node:** Angular 22 requiere Node.js `^20.19`, `^22.12` o `^24`. Node 26 **no** está soportado aún — usa Node 22 o 24 (`nvm use 22`).

## 🎯 Características

| Característica | Descripción |
|----------------|-------------|
| 🌐 **i18n** | Soporte completo Español/Inglés con Transloco |
| 🎨 **Dark-tech / Modo Oscuro-Claro** | Variables CSS + detección de preferencia del sistema |
| ⚡ **Rendimiento** | Lazy loading, code splitting, bloques `@defer`, OnPush |
| 📱 **Responsivo** | Diseño mobile-first, sticky footer |
| 💬 **Comentarios** | Giscus (GitHub Discussions) |
| 🔍 **SEO/AEO/GEO** | Meta tags, JSON-LD, hreflang, robots.txt, sitemap.xml, llms.txt |

## 🚀 Inicio Rápido

```bash
git clone https://github.com/juanitourquiza/ng-hackeruna.git
cd ng-hackeruna
nvm use 22          # Node 22 o 24 (requisito de Angular 22)
npm install
npm start
```

Navega a `http://localhost:4200/es` (Español) o `http://localhost:4200/en` (Inglés).

## 🏗️ Build

```bash
nvm use 22
npm run build:prod   # genera dist/hackeruna-frontend/browser + .htaccess
```

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   ├── data/
│   │   └── projects.data.ts          # Fuente única de datos del portafolio
│   └── services/
│       ├── wordpress-api.service.ts  # WordPress REST API (headless)
│       ├── language.service.ts       # Gestión de idioma (Transloco)
│       ├── theme.service.ts          # Modo oscuro/claro
│       ├── meta-tags.service.ts      # Meta tags por ruta (SEO)
│       └── schema.service.ts         # JSON-LD Schema.org (AEO/GEO)
├── layout/
│   ├── header/                       # Cabecera + navegación + toggle de tema
│   └── footer/                       # Footer dark-tech (sticky, versión)
├── shared/components/
│   ├── post-card/                    # Tarjeta de artículo
│   ├── featured-projects/            # Proyectos destacados (home)
│   ├── tech-stack/                   # Sección "Mi Stack"
│   ├── popular-tutorials/            # Tutoriales populares
│   ├── trending-sidebar/             # Más leídas
│   ├── category-filter/ · related-posts/ · social-share/
│   ├── skeleton-loader/ · loading-spinner/ · giscus-comments/
├── features/
│   ├── home/ · post/ · portfolio/ · about/
│   ├── contact/ · search/ · author/ · privacy/ · terms/
└── assets/i18n/
    ├── es.json  # Traducciones español
    └── en.json  # Traducciones inglés
```

## 🧩 Componentes y Librerías

| Área | Librerías / versión |
|------|---------------------|
| **Framework** | Angular 22 (standalone components, signals, `@defer`, control flow `@if/@for`) |
| **Lenguaje** | TypeScript 6.0 |
| **Estilos** | Tailwind CSS 3.4 + `@tailwindcss/forms` · `@tailwindcss/typography` + sistema de variables CSS dark-tech |
| **i18n** | `@jsverse/transloco` 8.4 (ES/EN) |
| **Reactividad** | RxJS 7.8 · Angular Signals |
| **Build/Tooling** | `@angular/build` 22 (esbuild) · `@analogjs/vite-plugin-angular` 2.7 · zone.js 0.16 |
| **Testing** | Vitest 4 · happy-dom / jsdom |
| **Comentarios** | Giscus (GitHub Discussions) |
| **Backend** | WordPress REST API + plugin personalizado (CMS headless) |
| **IA** | OpenAI GPT-4o-mini (traducción de contenido) |
| **Analytics/Ads** | Google Analytics 4 · Google AdSense |

## 🌐 Plugin de WordPress

Para traducciones de contenido con IA, instala el plugin incluido:

```
wordpress-plugins/hackeruna-translate/
```

**Configuración:** copia a `wp-content/plugins/`, actívalo, ve a Ajustes → Hackeruna Translate y agrega tu OpenAI API Key.
**Costo:** ~$0.80 para 500 posts, $0.0016 por artículo nuevo.

## 🚢 Deploy

El sitio es un build estático servido por HTTP (Cloudways, `public_html/dist/hackeruna-frontend/browser`).

```bash
nvm use 22
npm ci
npm run build:prod
# sincronizar dist/hackeruna-frontend/browser/ al web root (o deploy vía GIT en Cloudways, branch main)
```

Ver `deploy.sh` para el deploy automatizado por rsync.

## 📄 Licencia

Licencia MIT - ver archivo [LICENSE](LICENSE).

## 👤 Autor

**Juan Urquiza** — Ingeniero de Software · AI-Native · Ciberseguridad — [@juanitourquiza](https://github.com/juanitourquiza)

---

**Hecho con ❤️ y Angular 22**
