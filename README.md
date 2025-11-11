# Hackeruna Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-729B1B)](https://vitest.dev/)
[![Tests](https://img.shields.io/badge/Tests-18%2F23_passing-green)](./TESTING.md)

> Modern Angular 20 frontend for [Hackeruna.com](https://hackeruna.com) - A technology blog powered by WordPress as a headless CMS.

**Follow us:**
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/hackeruna)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/hackeruna)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanitourquiza)

[🇪🇸 Versión en Español](./README.es.md)

## 🎯 Overview

This is an **open-source** Angular frontend that connects to WordPress via REST API, providing a modern, fast, and SEO-friendly interface for the Hackeruna technology blog.

### Key Features

- ✅ **Angular 20** with standalone components
- ✅ **Tailwind CSS 4** for styling with custom design system
- ✅ **WordPress REST API** integration
- ✅ **Dark/Light mode** with system preference detection
- ✅ **Lazy loading** and code splitting
- ✅ **Responsive design** (mobile-first)
- ✅ **TypeScript strict mode**
- ✅ **Vitest** for testing
- ✅ **Clean Architecture** with separation of concerns

## 📁 Project Structure

```
src/
├── app/
│   ├── core/               # Core functionality
│   │   ├── services/       # WordPress API, Theme service
│   │   ├── models/         # TypeScript interfaces
│   │   └── interceptors/   # HTTP interceptors
│   ├── shared/             # Reusable components
│   │   └── components/     # PostCard, TrendingSidebar, LoadingSpinner
│   ├── features/           # Feature modules
│   │   ├── home/           # Home page
│   │   ├── post/           # Post detail
│   │   ├── author/         # Author page
│   │   └── search/         # Search results
│   ├── layout/             # Layout components
│   │   ├── header/         # Header with navigation
│   │   └── footer/         # Footer
│   └── app.routes.ts       # Routing configuration
├── environments/           # Environment configs
└── styles/                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Angular CLI 19+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/juanitourquiza/ng-hackeruna.git
cd ng-hackeruna
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create or edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  wordpressApiUrl: 'https://your-wordpress-site.com/wp-json/wp/v2',
  recaptchaV3SiteKey: 'YOUR_RECAPTCHA_SITE_KEY' // Optional: for contact form
};
```

> ⚠️ **IMPORTANT**: Never commit your production environment file with real API keys!

4. **Configure Backend (Optional - for contact form)**

If you want to use the contact form feature, you need to configure the WordPress plugin:

Set the environment variable in your WordPress server:
```bash
export RECAPTCHA_SECRET_KEY='your_recaptcha_secret_key'
```

Or add it to your WordPress `wp-config.php`:
```php
putenv('RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key');
```

See [RECAPTCHA_SETUP.md](./RECAPTCHA_SETUP.md) for detailed instructions.

5. **Run development server**

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🧪 Testing

Run unit tests with Vitest:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

## 🏗️ Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Design System

The project uses a custom design system inspired by Wired.com:

### Color Palette

- **Primary**: `#0077FF` (Accent Blue)
- **Background Light**: `#FFFFFF`
- **Background Dark**: `#121212`
- **Text Light**: `#121212`
- **Text Dark**: `#E0E0E0`

### Typography

- **Display/Sans**: Inter
- **Monospace**: Roboto Mono

## 📡 WordPress API Integration

### Required WordPress Setup

The frontend expects the following WordPress REST API endpoints:

- `GET /wp-json/wp/v2/posts` - List posts
- `GET /wp-json/wp/v2/posts/{id}` - Single post
- `GET /wp-json/wp/v2/categories` - Categories
- `GET /wp-json/wp/v2/tags` - Tags
- `GET /wp-json/wp/v2/users` - Authors

### Enable CORS (if needed)

Add to your WordPress `wp-config.php` or use a CORS plugin:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

## 🌐 Routes

- `/` - Home page
- `/post/:slug` - Post detail
- `/author/:slug` - Author profile
- `/category/:slug` - Posts by category
- `/search?q=query` - Search results
- `/portfolio` - Portfolio projects
- `/contact` - Contact form

## 🔒 Security

### Environment Variables

**Never commit sensitive information!** The following files should **NEVER** be in your repository:

- ❌ `src/environments/environment.prod.ts` with real API keys
- ❌ `.env` files with secrets
- ❌ `wp-config.php` with database credentials

### What's Safe to Share (Open Source)

- ✅ `src/environments/environment.ts` with **placeholder** values
- ✅ `.env.example` files with example values
- ✅ WordPress plugins (without hardcoded secrets)
- ✅ `recaptchaV3SiteKey` - This is a **public** key (safe to expose)

### What Should Stay Private

- 🔐 `RECAPTCHA_SECRET_KEY` - **Server-side only** (WordPress backend)
- 🔐 Database credentials
- 🔐 API keys for external services
- 🔐 Email server passwords

### reCAPTCHA Keys

- **Site Key (Public)**: Can be in frontend code - ✅ Safe
- **Secret Key (Private)**: Must be environment variable on server - 🔐 Secret

## 🛠️ Tech Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with RxJS
- **Testing**: Vitest
- **Icons**: Material Symbols
- **Fonts**: Google Fonts (Inter, Roboto Mono)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We use Conventional Commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Juan Urquiza**

- Website: [juanitourquiza.github.io](https://juanitourquiza.github.io)
- GitHub: [@juanitourquiza](https://github.com/juanitourquiza)

## 🙏 Acknowledgments

- Design inspired by [Wired.com](https://wired.com)
- WordPress REST API
- Angular Team
- Tailwind CSS Team

## 📚 Resources

- [Angular Documentation](https://angular.dev)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Made with ❤️ and Angular**
