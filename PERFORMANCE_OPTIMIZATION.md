# 🚀 Performance Optimization Guide - Angular 20

## 📊 Current Metrics
- **Mobile Performance:** 43/100
- **Desktop Performance:** 62/100
- **LCP (Largest Contentful Paint):** 1.7s ❌ (Target: <2.5s ✅)
- **CLS (Cumulative Layout Shift):** 1.214 ❌ (Target: <0.1 ✅)
- **Speed Index:** 2.6s

## 🎯 Main Issues to Fix

1. **Image Delivery** - Savings of 947 KiB 🔴
2. **Layout Shift Culprits** 🔴
3. **LCP Breakdown** 🟡
4. **LCP Request Discovery** 🔴
5. **Network Dependency Tree** 🔴

---

## ✅ Optimization Strategies (Priority Order)

### 1. **Use @defer for Below-the-Fold Content** ⭐⭐⭐

Angular 20 introduced `@defer` for lazy loading. Use it for:
- Related posts section
- Portfolio projects (initially show 3, defer rest)
- Comments section
- Social media widgets

**Example:**
```typescript
// home.component.html
@defer (on viewport) {
  <app-related-posts [postId]="postId"></app-related-posts>
} @placeholder {
  <div class="h-64 bg-gray-200 animate-pulse"></div>
}
```

### 2. **Image Optimization** ⭐⭐⭐ (Save 947 KiB!)

**Problem:** Images are not optimized
**Solution:** Use Angular's `NgOptimizedImage`

```typescript
// post-card.component.ts
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: `
    <img 
      ngSrc="{{image}}" 
      width="400" 
      height="250"
      priority
      alt="Post image"
    />
  `
})
```

**Also:**
- Convert images to WebP format
- Use responsive images with `srcset`
- Add image lazy loading: `loading="lazy"`
- Compress images (use TinyPNG, ImageOptim)

### 3. **Fix Cumulative Layout Shift (CLS: 1.214)** ⭐⭐⭐

**Problem:** Elements shift after loading

**Solutions:**
```html
<!-- Reserve space for images -->
<div class="aspect-video bg-gray-200">
  <img ngSrc="..." width="400" height="250" />
</div>

<!-- Reserve space for dynamic content -->
<div class="min-h-[100px]">
  @if (content) {
    {{ content }}
  } @else {
    <div class="h-24 bg-gray-200 animate-pulse"></div>
  }
</div>

<!-- Use size containers -->
<div class="w-full h-[400px]">
  <app-carousel></app-carousel>
</div>
```

### 4. **Code Splitting & Lazy Loading Routes** ⭐⭐

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { preload: true }
  },
  {
    path: 'post/:slug',
    loadComponent: () => import('./features/post/post-detail.component')
      .then(m => m.PostDetailComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component')
      .then(m => m.PortfolioComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component')
      .then(m => m.ContactComponent)
  }
];
```

### 5. **Preload Strategy** ⭐⭐

```typescript
// app.config.ts
import { withPreloading, PreloadAllModules } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    withPreloading(PreloadAllModules)
  ]
};
```

### 6. **OnPush Change Detection** ⭐⭐

```typescript
// post-card.component.ts
@Component({
  selector: 'app-post-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class PostCardComponent {
  // Only checks when @Input changes
}
```

### 7. **Defer Heavy Components** ⭐⭐

```typescript
// home.component.html
<!-- Load immediately -->
<app-hero></app-hero>
<app-featured-posts></app-featured-posts>

<!-- Defer non-critical content -->
@defer (on viewport; prefetch on idle) {
  <app-portfolio-preview></app-portfolio-preview>
} @placeholder {
  <div class="h-96 bg-gray-200 animate-pulse"></div>
}

@defer (on interaction) {
  <app-newsletter-signup></app-newsletter-signup>
} @placeholder {
  <div class="h-32 bg-gray-200 animate-pulse"></div>
}
```

### 8. **Optimize Fonts** ⭐

```html
<!-- In index.html -->
<!-- Preload critical fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style">

<!-- Use font-display: swap to prevent FOIT -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### 9. **Enable Gzip/Brotli Compression** ⭐

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### 10. **Bundle Analysis** ⭐

```bash
# Analyze bundle size
ng build --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/hackeruna-frontend/browser/stats.json
```

---

## 📋 Implementation Checklist

### Phase 1: Quick Wins (1-2 hours)
- [ ] Add `@defer` to related posts
- [ ] Add `@defer` to portfolio section
- [ ] Use `NgOptimizedImage` for all images
- [ ] Add `loading="lazy"` to images
- [ ] Fix CLS with aspect-ratio containers
- [ ] Enable gzip in `.htaccess`

### Phase 2: Medium Effort (2-4 hours)
- [ ] Lazy load routes (post, portfolio, contact)
- [ ] Implement OnPush change detection
- [ ] Optimize fonts with preload
- [ ] Compress images to WebP
- [ ] Add responsive images with srcset

### Phase 3: Advanced (4+ hours)
- [ ] Implement service worker for caching
- [ ] Add image CDN (Cloudinary, Imgix)
- [ ] Implement critical CSS inlining
- [ ] Add resource hints (dns-prefetch, preconnect)
- [ ] Implement virtual scrolling for lists

---

## 🎯 Expected Results After Optimization

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Performance (Mobile) | 43 | 70+ | 90+ |
| Performance (Desktop) | 62 | 80+ | 90+ |
| LCP | 1.7s | <1.5s | <2.5s ✅ |
| CLS | 1.214 | <0.1 | <0.1 ✅ |
| Speed Index | 2.6s | <2.0s | <2.5s ✅ |
| Image Size | 947 KiB | <200 KiB | - |

---

## 🔧 Quick Start: Implement @defer

### Step 1: Update home.component.html

```html
<!-- Keep critical content -->
<app-hero></app-hero>
<app-featured-posts [limit]="3"></app-featured-posts>

<!-- Defer related posts -->
@defer (on viewport; prefetch on idle) {
  <app-related-posts [postId]="postId"></app-related-posts>
} @placeholder {
  <div class="space-y-4">
    <div class="h-32 bg-gray-200 animate-pulse rounded"></div>
    <div class="h-32 bg-gray-200 animate-pulse rounded"></div>
  </div>
}
```

### Step 2: Update portfolio.component.html

```html
<!-- Show first 6 projects -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  @for (project of projects() | slice:0:6; track project.id) {
    <app-project-card [project]="project"></app-project-card>
  }
</div>

<!-- Defer remaining projects -->
@defer (on interaction; prefetch on idle) {
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    @for (project of projects() | slice:6; track project.id) {
      <app-project-card [project]="project"></app-project-card>
    }
  </div>
} @placeholder {
  <div class="text-center py-8">
    <p class="text-gray-500">Cargar más proyectos...</p>
  </div>
}
```

### Step 3: Use NgOptimizedImage

```typescript
// post-card.component.ts
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    <img 
      ngSrc="{{ post.image }}" 
      width="400" 
      height="250"
      alt="{{ post.title }}"
      loading="lazy"
    />
  `
})
export class PostCardComponent {
  @Input({ required: true }) post!: WpPost;
}
```

---

## 📚 Resources

- [Angular Performance Guide](https://angular.io/guide/performance-best-practices)
- [@defer Documentation](https://angular.io/guide/defer)
- [NgOptimizedImage](https://angular.io/api/common/NgOptimizedImage)
- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Last Updated:** Nov 11, 2025  
**Author:** Juan Urquiza - Hackeruna
