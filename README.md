# Hackeruna Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-19-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-green)](https://hackeruna.com)

> Modern Angular 19 frontend for [Hackeruna.com](https://hackeruna.com) - A multi-language technology blog powered by WordPress as a headless CMS.

**Follow us:**
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/hackeruna)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/hackeruna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanitourquiza)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/juanitourquiza/ng-hackeruna)

[🇪🇸 Versión en Español](./README.es.md)

## ✨ What's New in v2.0.0

- 🌐 **Multi-language support** (Spanish & English) with Transloco
- 🤖 **AI-powered translations** using GPT-4o-mini for blog content
- 🔄 **Language-aware URLs** (`/es/post/...`, `/en/post/...`)
- 💬 **Giscus comments** powered by GitHub Discussions
- 📊 **"Most Read" section** showing popular articles

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
│   └── services/
│       ├── wordpress-api.service.ts  # WordPress REST API
│       ├── language.service.ts       # i18n state management
│       └── theme.service.ts          # Dark/Light mode
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
    ├── es.json  # Spanish translations
    └── en.json  # English translations
```

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

- **Framework:** Angular 19 (standalone components, signals)
- **i18n:** Transloco
- **Styling:** Tailwind CSS 4
- **Comments:** Giscus
- **Backend:** WordPress REST API + Custom Plugin
- **AI:** OpenAI GPT-4o-mini

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
