# Hackeruna Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-22-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-green)](https://hackeruna.com)

> Modern Angular 22 frontend for [Hackeruna.com](https://hackeruna.com) — the multi-language technology blog **and portfolio** of Juan Urquiza, powered by WordPress as a headless CMS. Dark-tech design system, SEO/AEO/GEO optimized.

**Follow us:**
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/hackeruna)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/hackeruna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanitourquiza)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/juanitourquiza/ng-hackeruna)

[🇪🇸 Versión en Español](./README.es.md)

## ✨ What's New in v2.2.0

- 🚀 **Angular 22** + **TypeScript 6.0** — upgraded core
- 🎨 **Dark-tech design system** — new terminal-inspired look (light/dark), branded project cards, "My Stack" section
- 🧩 **Portfolio revamp** — single source of truth for projects (Pulsai, ShipFrame, Kupyo, GreenWay/Herald, medicProof, KipuBank…), AI category, no more repeated images
- 👤 **About page** rebuilt from CV — profile, metrics, career timeline, book, richer Schema.org (Person + Book)
- 🔎 **SEO / AEO / GEO** — JSON-LD graph (WebSite + Person + Organization), canonical + hreflang, `robots.txt` (AI crawlers), `sitemap.xml`, refreshed `llms.txt`
- 🌐 **Multi-language** (Spanish & English) with Transloco + AI-powered translations (GPT-4o-mini)
- 💬 **Giscus comments** powered by GitHub Discussions

> ℹ️ **Node requirement:** Angular 22 requires Node.js `^20.19`, `^22.12` or `^24`. Node 26 is **not** supported yet — use Node 22 or 24 (e.g. `nvm use 22`).

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🌐 **i18n** | Full Spanish/English support with Transloco |
| 🎨 **Dark/Light Mode** | System preference detection |
| ⚡ **Performance** | Lazy loading, code splitting, defer blocks |
| 📱 **Responsive** | Mobile-first design |
| 💬 **Comments** | Giscus (GitHub Discussions) |
| 🔍 **SEO** | Meta tags, Schema.org, hreflang |

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/juanitourquiza/ng-hackeruna.git
cd ng-hackeruna

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/es` (Spanish) or `http://localhost:4200/en` (English).

## 🏗️ Build

```bash
npm run build
```

Output: `dist/hackeruna-frontend` (~414 KB initial)

## 📁 Project Structure

```
src/app/
├── core/
│   ├── data/
│   │   └── projects.data.ts          # Single source of truth for the portfolio
│   └── services/
│       ├── wordpress-api.service.ts  # WordPress REST API (headless)
│       ├── language.service.ts       # i18n state (Transloco)
│       ├── theme.service.ts          # Dark/Light mode
│       ├── meta-tags.service.ts      # Per-route meta tags (SEO)
│       └── schema.service.ts         # JSON-LD Schema.org (AEO/GEO)
├── layout/
│   ├── header/                       # Header + nav + theme toggle
│   └── footer/                       # Dark-tech sticky footer (version badge)
├── shared/components/
│   ├── post-card/  · featured-projects/  · tech-stack/ ("My Stack")
│   ├── popular-tutorials/  · trending-sidebar/  · category-filter/
│   ├── related-posts/  · social-share/  · giscus-comments/
│   └── skeleton-loader/  · loading-spinner/
├── features/
│   ├── home/ · post/ · portfolio/ · about/
│   ├── contact/ · search/ · author/ · privacy/ · terms/
└── assets/i18n/
    ├── es.json  # Spanish translations
    └── en.json  # English translations
```

## 🧩 Components & Libraries

| Area | Libraries / version |
|------|---------------------|
| **Framework** | Angular 22 (standalone components, signals, `@defer`, `@if/@for` control flow) |
| **Language** | TypeScript 6.0 |
| **Styling** | Tailwind CSS 3.4 + `@tailwindcss/forms` · `@tailwindcss/typography` + dark-tech CSS-variable system |
| **i18n** | `@jsverse/transloco` 8.4 (ES/EN) |
| **Reactivity** | RxJS 7.8 · Angular Signals |
| **Build/Tooling** | `@angular/build` 22 (esbuild) · `@analogjs/vite-plugin-angular` 2.7 · zone.js 0.16 |
| **Testing** | Vitest 4 · happy-dom / jsdom |
| **Comments** | Giscus (GitHub Discussions) |
| **Backend** | WordPress REST API + custom plugin (headless CMS) |
| **AI** | OpenAI GPT-4o-mini (content translation) |
| **Analytics/Ads** | Google Analytics 4 · Google AdSense |

## 🌐 WordPress Plugin

For AI-powered content translation, install the included WordPress plugin:

```
wordpress-plugins/hackeruna-translate/
```

**Setup:**
1. Copy to `wp-content/plugins/`
2. Activate in WordPress Admin
3. Go to Settings → Hackeruna Translate
4. Add your OpenAI API Key

**Cost:** ~$0.80 for 500 posts, $0.0016 per new article

## 🛠️ Tech Stack

- **Framework:** Angular 22 (standalone components, signals, `@defer`)
- **TypeScript:** 6.0
- **i18n:** Transloco (ES / EN)
- **Styling:** Tailwind CSS 3.4 + CSS-variable dark-tech design system
- **Comments:** Giscus
- **Backend:** WordPress REST API + Custom Plugin (headless CMS)
- **AI:** OpenAI GPT-4o-mini (content translation)
- **Testing:** Vitest

## 🚢 Deploy

Production is a static build served over HTTP. Build and sync the browser bundle:

```bash
nvm use 22            # Node 22 or 24 (Angular 22 requirement)
npm ci
npm run build:prod    # outputs dist/hackeruna-frontend/browser + .htaccess
# then rsync dist/hackeruna-frontend/browser/ to the web root on the server
```

See `deploy.sh` for the automated rsync deploy.

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 👤 Author

**Juan Urquiza** - [@juanitourquiza](https://github.com/juanitourquiza)

---

**Made with ❤️ and Angular**
