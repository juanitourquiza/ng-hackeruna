# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
