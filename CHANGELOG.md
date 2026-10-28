# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-10-27

### Added
- 🧭 **Sidebar de home ampliado** — 5 más leídas (antes 4), bloque "Un día como hoy" con posts de años anteriores y 2 curiosidades aleatorias, con deduplicación de IDs entre secciones
- 💀 **Skeletons por sección en el sidebar** con `aria-busy`/`role="status"` (nuevo skeleton `type="sidebar"`)
- 🔌 **Plugin WordPress `hackeruna-onthisday`** — endpoints `GET /hackeruna/v1/onthisday` y `/random` con caché diaria, exclusión de IDs y fallback al archivo
- 🗂️ **Índice sticky (TOC)** con scroll-spy para Términos y Privacidad
- 🧪 **Tests nuevos (Vitest)** para `WordpressApiService`, `TrendingSidebarComponent` y `PopularTutorialsComponent` (9 tests)

### Changed
- 📰 **Layout editorial tipo Wired en la noticia** — header y cuerpo alineados en una columna de lectura de 46rem, riel vertical de compartir sticky, barra lateral derecha con autor y "Más leídas", imagen destacada full-bleed respetando la proporción original (máx. 85vh) y breakout de medios ≥1280px
- ⚡ **Más leídas optimizado** — el endpoint ahora consulta solo `id,slug,title,date,views,post_views,post_views_count` con `_fields` en lugar de `_embed` (de ~9.4s a ~1.3s), usado por el sidebar de home y la barra del artículo
- 📐 **Páginas estáticas ampliadas** — About, Contact, Portfolio, Search y Author unificados a `max-w-7xl` con tipografía y espaciados mayores
- 🎲 **Tutoriales Populares variables** — rotación aleatoria con anti-repetición por sesión (`sessionStorage`)
- 🔗 **Enlaces de relacionados y categorías** respetan el idioma activo (`/es`, `/en`)
- 🌐 **i18n es/en** — nuevas claves del sidebar y del índice (`home.onThisDay`, `home.randomPicks`, `home.publishedIn`, `home.fromArchive`, `home.yearsAgo`, `home.yearAgo`, `common.onThisPage`)

### Fixed
- 🧩 **Specs de Contact y Portfolio** — faltaba el provider de Transloco (`NG0201 TRANSLOCO_TRANSPILER`)

## [2.3.0] - 2026-10-24

### Added
- 📺 **Canal de YouTube** (`youtube.com/juanitourquiza`) y 🎧 **Show de Spotify** en el footer — 6 redes sociales
- 🌐 **aria-labels de redes sociales internacionalizados** (`footer.social.*` en es/en)
- 🤖 **ShipFrame AI PR review** — gatekeeper con glm5.3-flash en GitHub Actions + job de tests sin privilegios y script con 28 tests unitarios

### Changed
- Contenedor de redes sociales del footer con hook `data-testid="social-links"` para tests acotados

## [2.1.0] - 2026-01-08

### Added
- 🚀 **Angular 21.0.7** - Última versión estable
- 📝 **TypeScript 5.9.3** - Nuevas características

### Changed
- 20 componentes migrados a block control flow (ng-template → @if/@for)
- DOCUMENT import movido de @angular/common a @angular/core
- @angular/build reemplaza @angular-devkit/build-angular

## [2.0.0] - 2026-01-08

- 🔄 **URLs con prefijo de idioma** (`/es/`, `/en/`)
- 🤖 **Plugin WordPress hackeruna-translate** para traducciones con GPT-4o-mini
- 💬 **Giscus comments** integrado con GitHub Discussions
- 📊 **Sección "Más Leídas"** en sidebar
- 🎨 **Nuevas secciones en home**: Proyectos Destacados, Tutoriales Populares, Recursos Útiles
- 🔧 **LanguageService** con Angular Signals para gestión de estado

### Changed
- Actualizado a Angular 19
- Reestructuradas rutas con soporte de idioma
- Header con selector de idioma (🇺🇸/🇪🇸)
- Fechas localizadas según idioma
- Todos los textos de UI traducibles

### Removed
- Autor en tarjetas de post (por solicitud)
- 52 archivos de documentación obsoletos

## [1.0.2] - 2024-11-14

### Added
- Google Analytics 4 integración
- AdSense preparación
- Content Security Policy optimizado

### Fixed
- YouTube iframes sanitization
- Category filter styles
- Post alignment con videos

## [1.0.1] - 2024-11-11

### Added
- Social share buttons
- Post views counter
- Optimizaciones de rendimiento

## [1.0.0] - 2024-11-07

### Added
- Lanzamiento inicial
- Angular 19 con standalone components
- WordPress REST API integración
- Dark/Light mode
- Responsive design
- Tailwind CSS 4
- Vitest testing
