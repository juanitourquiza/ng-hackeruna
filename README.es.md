# Hackeruna Frontend

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-19-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

> Frontend moderno en Angular 20 para [Hackeruna.com](https://hackeruna.com) - Un blog de tecnología alimentado por WordPress como CMS headless.

[🇬🇧 English Version](./README.md)

## 🎯 Descripción General

Este es un frontend **open-source** en Angular que se conecta a WordPress mediante REST API, proporcionando una interfaz moderna, rápida y amigable con SEO para el blog de tecnología Hackeruna.

### Características Principales

- ✅ **Angular 20** con componentes standalone
- ✅ **Tailwind CSS 4** para estilos con sistema de diseño personalizado
- ✅ Integración con **WordPress REST API**
- ✅ **Modo oscuro/claro** con detección de preferencia del sistema
- ✅ **Lazy loading** y división de código
- ✅ **Diseño responsive** (mobile-first)
- ✅ **TypeScript modo estricto**
- ✅ **Vitest** para pruebas
- ✅ **Arquitectura limpia** con separación de responsabilidades

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/               # Funcionalidad principal
│   │   ├── services/       # API WordPress, servicio de tema
│   │   ├── models/         # Interfaces TypeScript
│   │   └── interceptors/   # Interceptores HTTP
│   ├── shared/             # Componentes reutilizables
│   │   └── components/     # PostCard, TrendingSidebar, LoadingSpinner
│   ├── features/           # Módulos de características
│   │   ├── home/           # Página principal
│   │   ├── post/           # Detalle de artículo
│   │   ├── author/         # Página de autor
│   │   └── search/         # Resultados de búsqueda
│   ├── layout/             # Componentes de diseño
│   │   ├── header/         # Encabezado con navegación
│   │   └── footer/         # Pie de página
│   └── app.routes.ts       # Configuración de rutas
├── environments/           # Configuraciones de entorno
└── styles/                 # Estilos globales
```

## 🚀 Primeros Pasos

### Prerequisitos

- Node.js 18+
- npm o yarn
- Angular CLI 19+

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/juanitourquiza/ng-hackeruna.git
cd ng-hackeruna
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar entorno**

Edita `src/environments/environment.ts` para apuntar a tu API de WordPress:

```typescript
export const environment = {
  production: false,
  wordpressApiUrl: 'https://tu-sitio-wordpress.com/wp-json/wp/v2'
};
```

4. **Ejecutar servidor de desarrollo**

```bash
npm start
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

## 🧪 Pruebas

Ejecutar pruebas unitarias con Vitest:

```bash
npm run test
```

Ejecutar pruebas con UI:

```bash
npm run test:ui
```

## 🏗️ Compilación

Compilar el proyecto para producción:

```bash
npm run build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`.

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño personalizado inspirado en Wired.com:

### Paleta de Colores

- **Primario**: `#0077FF` (Azul de Acento)
- **Fondo Claro**: `#FFFFFF`
- **Fondo Oscuro**: `#121212`
- **Texto Claro**: `#121212`
- **Texto Oscuro**: `#E0E0E0`

### Tipografía

- **Display/Sans**: Inter
- **Monospace**: Roboto Mono

## 📡 Integración con WordPress API

### Configuración Requerida en WordPress

El frontend espera los siguientes endpoints de WordPress REST API:

- `GET /wp-json/wp/v2/posts` - Listar artículos
- `GET /wp-json/wp/v2/posts/{id}` - Artículo individual
- `GET /wp-json/wp/v2/categories` - Categorías
- `GET /wp-json/wp/v2/tags` - Etiquetas
- `GET /wp-json/wp/v2/users` - Autores

### Habilitar CORS (si es necesario)

Agrega a tu `wp-config.php` de WordPress o usa un plugin CORS:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

## 🌐 Rutas

- `/` - Página principal
- `/post/:slug` - Detalle de artículo
- `/author/:slug` - Perfil de autor
- `/category/:slug` - Artículos por categoría
- `/search?q=query` - Resultados de búsqueda

## 🛠️ Stack Tecnológico

- **Framework**: Angular 20
- **Lenguaje**: TypeScript 5.7
- **Estilos**: Tailwind CSS 4
- **Gestión de Estado**: Angular Signals
- **Cliente HTTP**: Angular HttpClient con RxJS
- **Pruebas**: Vitest
- **Iconos**: Material Symbols
- **Fuentes**: Google Fonts (Inter, Roboto Mono)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

1. Haz fork del proyecto
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios usando [Conventional Commits](https://www.conventionalcommits.org/)
4. Push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

### Convención de Commits

Usamos Conventional Commits:

- `feat:` - Nueva característica
- `fix:` - Corrección de error
- `docs:` - Cambios en documentación
- `style:` - Cambios de estilo de código (formato, etc.)
- `refactor:` - Refactorización de código
- `test:` - Agregar o actualizar pruebas
- `chore:` - Tareas de mantenimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Juan Urquiza**

- Sitio Web: [juanitourquiza.github.io](https://juanitourquiza.github.io)
- GitHub: [@juanitourquiza](https://github.com/juanitourquiza)

## 🙏 Agradecimientos

- Diseño inspirado en [Wired.com](https://wired.com)
- WordPress REST API
- Equipo de Angular
- Equipo de Tailwind CSS

## 📚 Recursos

- [Documentación de Angular](https://angular.dev)
- [Manual de WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

---

**Hecho con ❤️ y Angular**
