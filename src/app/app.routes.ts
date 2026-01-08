import { Routes } from '@angular/router';

// Routes without language prefix (will be wrapped with :lang)
const contentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'post/:slug',
    loadComponent: () => import('./features/post/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: 'author/:slug',
    loadComponent: () => import('./features/author/author.component').then(m => m.AuthorComponent)
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/terms/terms.component').then(m => m.TermsComponent)
  }
];

export const routes: Routes = [
  // Redirect root to default language
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'es'
  },
  // Language-prefixed routes
  {
    path: ':lang',
    children: contentRoutes
  },
  // Fallback for old URLs without language prefix (redirect to Spanish)
  ...contentRoutes.map(route => ({
    ...route,
    path: route.path,
    redirectTo: route.path ? `es/${route.path}` : 'es'
  })).filter(r => r.path !== ''),
  // Catch-all redirect
  {
    path: '**',
    redirectTo: 'es'
  }
];
