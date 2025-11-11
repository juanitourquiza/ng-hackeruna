# Quick Start Guide - Hackeruna Frontend

Welcome to your new Angular 20 frontend for Hackeruna.com! 🚀

## What's Been Created

Your project is now fully set up with:

### ✅ Core Features Implemented
- **Angular 20** with standalone components
- **Tailwind CSS 3** for modern styling
- **WordPress REST API** integration
- **Dark/Light theme** with localStorage persistence
- **Responsive layout** (Header, Footer, Main content)
- **Clean architecture** (core, shared, features, layout)

### 📦 Components Created

#### Layout Components
- **HeaderComponent** - Navigation, search, theme toggle
- **FooterComponent** - Social links, copyright

#### Feature Components
- **HomeComponent** - Featured post + recent posts + trending sidebar
- **PostDetailComponent** - Full article view with breadcrumbs
- **SearchComponent** - Search results page
- **AuthorComponent** - Author profile (placeholder)

#### Shared Components
- **PostCardComponent** - Reusable post display (regular & featured)
- **TrendingSidebarComponent** - Trending posts list
- **LoadingSpinnerComponent** - Loading indicator

### 🔧 Services
- **WordpressApiService** - All WordPress REST API calls
- **ThemeService** - Dark/light mode management with signals

## 🎯 Next Steps

### 1. Configure WordPress Connection

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  wordpressApiUrl: 'https://hackeruna.com/wp-json/wp/v2'
};
```

### 2. Test the Application

The dev server is running at: **http://localhost:4201**

Try these routes:
- `/` - Home page
- `/post/:slug` - Post detail (needs WordPress data)
- `/search?q=angular` - Search results
- `/author/:slug` - Author page

### 3. Customize Design

The design system is in `tailwind.config.js`:

```javascript
colors: {
  'accent-blue': '#0077FF',  // Change your primary color
  'dark-bg': '#121212',      // Dark mode background
  // ... more colors
}
```

### 4. Add More Features

Consider implementing:

- [ ] Category filtering on home page
- [ ] Pagination for post lists
- [ ] Related posts section
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] Author bio expansion
- [ ] Meta tags for SEO (use Angular Meta service)
- [ ] Sitemap generation
- [ ] RSS feed

### 5. Testing

Add tests using Vitest:

```bash
npm test
```

Example test location: `src/app/core/services/wordpress-api.service.spec.ts`

### 6. Deployment

Build for production:

```bash
npm run build
```

Deploy the `dist/` folder to:
- Netlify
- Vercel
- Firebase Hosting
- GitHub Pages
- Your own server

## 🎨 Theme Toggle

The theme service automatically:
- Detects system preference on first load
- Saves user choice to localStorage
- Applies classes to `<html>` element
- Updates icon in header

## 📡 WordPress API

### Required Endpoints

Your WordPress site should expose:
- `GET /wp/v2/posts` - List posts
- `GET /wp/v2/posts?slug=:slug` - Single post
- `GET /wp/v2/categories` - Categories
- `GET /wp/v2/users` - Authors

### Enable CORS

If your WordPress is on a different domain, add CORS headers:

```php
// In wp-config.php or functions.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

Or install a WordPress CORS plugin.

## 🐛 Troubleshooting

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts

```bash
# Run on different port
ng serve --port 4202
```

### TypeScript Errors

Check `tsconfig.json` has correct paths and Angular is imported correctly.

## 📚 Useful Commands

```bash
# Development
npm start                 # Start dev server
npm run build             # Production build
npm test                  # Run tests
npm run test:ui           # Tests with UI

# Angular CLI
ng generate component name    # New component
ng generate service name      # New service
ng build --configuration production
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

**Happy coding! 🎉**

For questions, check the main [README.md](README.md) or open an issue on GitHub.
