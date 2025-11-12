# 🚀 Mejoras de Velocidad Críticas - Hackeruna

**Estado Actual:** Performance 53/100 (Mobile)  
**Objetivo:** Performance 80+/100 (Mobile)

---

## ✅ Optimizaciones Implementadas

### 1. **Resource Hints** ⚡
```html
<link rel="preconnect" href="https://backend.hackeruna.com" crossorigin>
<link rel="dns-prefetch" href="https://backend.hackeruna.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
```
**Impacto:** Reduce latencia de DNS y establece conexiones antes de tiempo (-200ms)

### 2. **Font Loading Optimization** 🔤
```html
<link href="fonts.css" rel="stylesheet" media="print" onload="this.media='all'">
```
**Impacto:** Carga fuentes de forma no bloqueante (-500ms en First Contentful Paint)

---

## 🔥 Optimizaciones Críticas Pendientes

### 3. **Lazy Loading de Imágenes** 📷

**Problema:** Las imágenes se cargan todas al inicio

**Solución:** Agregar `loading="lazy"` a todas las imágenes

**Actualizar en:**
- `post-card.component.html`
- `post-detail.component.html`
- `portfolio.component.html`
- `trending-sidebar.component.html`

**Ejemplo:**
```html
<!-- ANTES -->
<img [src]="featuredImage" [alt]="post.title">

<!-- DESPUÉS -->
<img [src]="featuredImage" [alt]="post.title" loading="lazy">
```

**Impacto:** -30% tiempo de carga inicial, -40% datos descargados

---

### 4. **NgOptimizedImage (Angular 20)** 🖼️

**Problema:** Imágenes sin optimización automática

**Solución:** Usar `NgOptimizedImage` directive

**Pasos:**

1. **Importar en components:**
```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [CommonModule, NgOptimizedImage]
})
```

2. **Actualizar templates:**
```html
<!-- ANTES -->
<img [src]="post.image" [alt]="post.title">

<!-- DESPUÉS -->
<img 
  [ngSrc]="post.image" 
  [alt]="post.title"
  width="800"
  height="450"
  priority  // Solo para imagen destacada
  loading="lazy"  // Para el resto
>
```

**Impacto:** +15-20 puntos en PageSpeed

---

### 5. **Responsive Images con srcset** 📱

**Problema:** Móviles descargan imágenes de desktop

**Solución:**
```html
<img 
  [ngSrc]="post.image"
  [alt]="post.title"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
  width="800"
  height="450"
>
```

**Impacto:** -50% tamaño de imágenes en móvil

---

### 6. **Comprimir Imágenes** 🗜️

**Problema:** Imágenes pesadas sin comprimir

**Herramientas:**
- [TinyPNG](https://tinypng.com/) - Compresión automática
- [Squoosh](https://squoosh.app/) - WebP conversion
- [ImageOptim](https://imageoptim.com/) - Batch compression

**Objetivo:**
- JPEG: 80% calidad máximo
- PNG: Convertir a WebP
- SVG: Minificar

**Comando:**
```bash
# Instalar imagemin
npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg

# Comprimir imágenes
imagemin src/assets/*.{jpg,png} --out-dir=src/assets/optimized --plugin=webp
```

---

### 7. **Critical CSS** 🎨

**Problema:** CSS bloqueante

**Solución:** Inline critical CSS en `index.html`

```html
<head>
  <style>
    /* Critical CSS - Above the fold */
    body { margin: 0; font-family: Inter, sans-serif; }
    .header { height: 64px; background: #fff; }
    /* ... más estilos críticos */
  </style>
</head>
```

**Herramienta:** [Critical](https://github.com/addyosmani/critical)

```bash
npm install --save-dev critical
```

**Impacto:** -300ms First Contentful Paint

---

### 8. **Reducir JavaScript Inicial** 📦

**Configurar Lazy Loading de Rutas:**

```typescript
// app.routes.ts
export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
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
  },
  { 
    path: 'post/:slug', 
    loadComponent: () => import('./features/post/post-detail.component')
      .then(m => m.PostDetailComponent)
  }
];
```

**Impacto:** -40% JavaScript inicial

---

### 9. **Optimizar angular.json** ⚙️

```json
{
  "projects": {
    "hackeruna-frontend": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

---

### 10. **Configurar Service Worker (PWA)** 🔌

```bash
ng add @angular/pwa
```

**Beneficios:**
- Cache de assets
- Offline support
- Faster repeat visits

**Configurar en `ngsw-config.json`:**
```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(svg|cur|jpg|jpeg|png|apng|webp|avif|gif|otf|ttf|woff|woff2)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-wordpress",
      "urls": [
        "https://backend.hackeruna.com/**"
      ],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1h",
        "timeout": "10s",
        "strategy": "freshness"
      }
    }
  ]
}
```

---

## 📊 Mejoras Esperadas por Optimización

| Optimización | Impacto en Score | Tiempo Ahorrado |
|--------------|------------------|-----------------|
| Resource Hints | +3 | -200ms |
| Font Loading | +5 | -500ms |
| Lazy Images | +8 | -1.2s |
| NgOptimizedImage | +10 | -800ms |
| Responsive Images | +7 | -1.5s |
| Critical CSS | +5 | -300ms |
| Code Splitting | +8 | -1s |
| Service Worker | +5 | -2s (repeat) |

**Total Esperado:** +51 puntos → **Score 104** 🎯

---

## 🛠️ Plan de Implementación (Orden de Prioridad)

### Fase 1: Quick Wins (30 min) ✅
- [x] Resource Hints
- [x] Font Loading Optimization
- [ ] Lazy Loading attribute en imágenes

### Fase 2: Optimización de Imágenes (2 horas)
- [ ] Comprimir todas las imágenes
- [ ] Convertir a WebP
- [ ] Implementar NgOptimizedImage
- [ ] Agregar responsive images

### Fase 3: Code Splitting (1 hora)
- [ ] Lazy loading de rutas
- [ ] Optimizar angular.json

### Fase 4: PWA (1 hora)
- [ ] Instalar @angular/pwa
- [ ] Configurar Service Worker
- [ ] Configurar cache strategies

### Fase 5: Critical CSS (30 min)
- [ ] Extraer critical CSS
- [ ] Inline en index.html

---

## 🎯 Comandos Rápidos

```bash
# Build optimizado
npm run build -- --configuration=production

# Analizar bundle size
npm install -g webpack-bundle-analyzer
ng build --stats-json
webpack-bundle-analyzer dist/hackeruna-frontend/browser/stats.json

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Comprimir imágenes
find src/assets -name "*.jpg" -exec mogrify -quality 80 {} \;
find src/assets -name "*.png" -exec pngquant --quality=80-90 --ext .png --force {} \;
```

---

## 📈 Métricas Objetivo

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Performance | 53 | 85+ |
| FCP | 2.5s | <1.8s |
| LCP | 4.2s | <2.5s |
| TBT | 600ms | <200ms |
| CLS | 0.1 | <0.1 |
| Speed Index | 3.8s | <3.0s |

---

## ✅ Checklist Final

- [ ] Todas las imágenes con `loading="lazy"`
- [ ] Imágenes comprimidas y en WebP
- [ ] NgOptimizedImage implementado
- [ ] Rutas con lazy loading
- [ ] Service Worker configurado
- [ ] Critical CSS inline
- [ ] Build de producción optimizado
- [ ] Verificar en PageSpeed Insights
- [ ] Verificar en Lighthouse
- [ ] Verificar en GTmetrix

---

**Última Actualización:** 11 de Noviembre, 2025  
**Prioridad:** 🔥 Alta  
**Tiempo Estimado:** 4-5 horas
