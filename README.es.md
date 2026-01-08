# Hackeruna Frontend

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-green)](https://hackeruna.com)

> Frontend moderno en Angular 21 para [Hackeruna.com](https://hackeruna.com) - Un blog de tecnología multiidioma con WordPress como CMS headless.

**Síguenos:**
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/hackeruna)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/hackeruna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanitourquiza)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/juanitourquiza/ng-hackeruna)

[🇺🇸 English Version](./README.md)

## ✨ Novedades en v2.1.0

- 🚀 **Angular 21** - Última versión estable
- 📝 **TypeScript 5.9.3** - Últimas características
- 🌐 **Soporte multiidioma** (Español e Inglés) con Transloco
- 🤖 **Traducciones con IA** usando GPT-4o-mini para contenido del blog
- 🔄 **URLs con idioma** (`/es/post/...`, `/en/post/...`)
- 💬 **Comentarios Giscus** integrados con GitHub Discussions

## 🎯 Características

| Característica | Descripción |
|----------------|-------------|
| 🌐 **i18n** | Soporte completo Español/Inglés con Transloco |
| 🎨 **Modo Oscuro/Claro** | Detecta preferencia del sistema |
| ⚡ **Rendimiento** | Lazy loading, code splitting, defer blocks |
| 📱 **Responsivo** | Diseño mobile-first |
| 💬 **Comentarios** | Giscus (GitHub Discussions) |
| 🔍 **SEO** | Meta tags, Schema.org, hreflang |

## 🚀 Inicio Rápido

```bash
# Clonar repositorio
git clone https://github.com/juanitourquiza/ng-hackeruna.git
cd ng-hackeruna

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Navega a `http://localhost:4200/es` (Español) o `http://localhost:4200/en` (Inglés).

## 🏗️ Build

```bash
npm run build
```

Salida: `dist/hackeruna-frontend` (~414 KB inicial)

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   └── services/
│       ├── wordpress-api.service.ts  # WordPress REST API
│       ├── language.service.ts       # Gestión de idioma
│       └── theme.service.ts          # Modo oscuro/claro
├── shared/components/
│   ├── post-card/
│   ├── trending-sidebar/
│   ├── giscus-comments/
│   └── ...
├── features/
│   ├── home/
│   ├── post/
│   ├── portfolio/
│   └── ...
└── assets/i18n/
    ├── es.json  # Traducciones español
    └── en.json  # Traducciones inglés
```

## 🌐 Plugin de WordPress

Para traducciones de contenido con IA, instala el plugin incluido:

```
wordpress-plugins/hackeruna-translate/
```

**Configuración:**
1. Copia a `wp-content/plugins/`
2. Activa en WordPress Admin
3. Ve a Ajustes → Hackeruna Translate
4. Agrega tu OpenAI API Key

**Costo:** ~$0.80 para 500 posts, $0.0016 por artículo nuevo

## 🛠️ Stack Tecnológico

- **Framework:** Angular 21 (standalone components, signals)
- **TypeScript:** 5.9.3
- **i18n:** Transloco
- **Estilos:** Tailwind CSS 3.4
- **Comentarios:** Giscus
- **Backend:** WordPress REST API + Plugin Personalizado
- **IA:** OpenAI GPT-4o-mini

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/increible`)
3. Commit cambios (`git commit -m 'feat: agregar feature increíble'`)
4. Push a la rama (`git push origin feature/increible`)
5. Abrir Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para guías detalladas.

## 📄 Licencia

Licencia MIT - ver archivo [LICENSE](LICENSE).

## 👤 Autor

**Juan Urquiza** - [@juanitourquiza](https://github.com/juanitourquiza)

---

**Hecho con ❤️ y Angular**
