# 📦 Sistema de Versionado - Hackeruna

**Versión Actual:** 1.0.1

---

## 🎯 Versionado Semántico (SemVer)

Utilizamos el estándar de **Versionado Semántico 2.0.0**:

```
MAJOR.MINOR.PATCH
  1  .  0  .  0
```

### Reglas:

1. **MAJOR (1.x.x)** - Cambios incompatibles con versiones anteriores
   - Rediseño completo
   - Cambios de arquitectura
   - Breaking changes en APIs

2. **MINOR (x.1.x)** - Nuevas funcionalidades compatibles
   - Nuevas features
   - Nuevas páginas
   - Nuevos componentes

3. **PATCH (x.x.1)** - Correcciones de bugs
   - Bug fixes
   - Pequeñas mejoras de UI
   - Optimizaciones de rendimiento

---

## 📍 Ubicación de la Versión

La versión se muestra en el **footer** del sitio:

```
© 2025 Hackeruna.com. Todos los derechos reservados. [v1.0.0]
```

### Ubicación en el código:

**Footer Component:**
```typescript
// src/app/layout/footer/footer.component.ts
import { version } from '../../../../package.json';

export class FooterComponent {
  version = version; // Se importa desde package.json
}
```

**Template:**
```html
<!-- src/app/layout/footer/footer.component.html -->
<span class="text-xs px-2 py-1 rounded">
  v{{ version }}
</span>
```

---

## 🔄 Cómo Actualizar la Versión

### Opción 1: Manual (Recomendado)

Editar `package.json`:

```json
{
  "name": "hackeruna-frontend",
  "version": "1.0.1",  // ← Cambiar aquí
  ...
}
```

### Opción 2: Con npm version

```bash
# Incrementar PATCH (1.0.0 → 1.0.1)
npm version patch

# Incrementar MINOR (1.0.0 → 1.1.0)
npm version minor

# Incrementar MAJOR (1.0.0 → 2.0.0)
npm version major
```

**Ventajas:**
- ✅ Actualiza automáticamente `package.json`
- ✅ Crea un commit de git automáticamente
- ✅ Crea un tag de git

---

## 📝 Workflow de Versiones

### 1. Desarrollo Local
```bash
# Trabajar en feature
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git commit -m "feat: agregar nueva funcionalidad"
```

### 2. Antes del Deploy
```bash
# Decidir tipo de cambio
# - Bug fix? → patch
# - Nueva feature? → minor
# - Breaking change? → major

# Incrementar versión
npm version minor -m "chore: bump version to %s"
# Esto crea:
# - Commit con mensaje "chore: bump version to 1.1.0"
# - Tag "v1.1.0"
```

### 3. Deploy
```bash
# Push con tags
git push origin main --tags

# Build y deploy
npm run build:prod
# ... deploy ...
```

### 4. Verificar
```bash
# Abrir sitio y verificar footer
# Debe mostrar: v1.1.0
```

---

## 📊 Historial de Versiones

### v1.0.1 (12 Nov 2025) - Features & Analytics
**Features:**
- ✅ **Página /about** - "Sobre Mí" con información completa del autor
  - Experiencia y especialización (Web Dev, Blockchain, ZK-Proofs, IA)
  - Stack tecnológico (21+ tecnologías)
  - Links a redes sociales y portafolio personal
  - Sección "Sobre Hackeruna"
- ✅ **Google Analytics 4** - Tracking completo
  - Servicio GoogleAnalyticsService con métodos type-safe
  - Tracking automático de páginas (SPA-aware)
  - Eventos personalizados (shares, contacto, errores)
  - Documentación completa en GOOGLE_ANALYTICS_SETUP.md
- ✅ **Contador de Vistas** - Preparación para WordPress plugin
  - Modelo extendido con campos de vistas
  - Getters y formateo en componentes
  - UI preparada en PostDetail y PostCard
  - Documentación en POST_VIEWS_COUNTER.md
- ✅ **Social Sharing** - Botones de compartir en posts
  - Facebook, Twitter, LinkedIn, WhatsApp
  - Copy link functionality
  - Meta tags Open Graph y Twitter Cards
  - MetaTagsService para SEO dinámico
  - Tracking de shares en GA4

**Improvements:**
- Menú actualizado: "Autor" → "Sobre Mí" (link interno)
- Stack tecnológico expandido: PHP, Laravel, Symfony, Vue.js, Bootstrap, AI, Windsurf
- CSP actualizado para Google Analytics
- Script de limpieza de caché en build
- Documentación completa para AdSense (ADSENSE_READINESS.md)

**Bug Fixes:**
- Corregido warning de optional chaining en templates
- Limpieza de caché mejorada en proceso de build

**Documentation:**
- GOOGLE_ANALYTICS_SETUP.md - Guía completa de GA4
- ADSENSE_READINESS.md - Análisis para aprobación AdSense (90% probabilidad)
- POST_VIEWS_COUNTER.md - Implementación de contador de vistas
- SOCIAL_SHARE.md - Guía de compartir en redes sociales

---

### v1.0.0 (11 Nov 2025) - Release Inicial
**Features:**
- ✅ Migración a Angular 20
- ✅ Control flow directives (@if, @for)
- ✅ Lazy loading de imágenes
- ✅ Optimizaciones de performance
- ✅ Redirects 301 WordPress → Angular
- ✅ CSP para imágenes externas
- ✅ Múltiples categorías en posts
- ✅ Páginas legales (Privacy & Terms)
- ✅ Sistema de versionado

**Optimizations:**
- Resource hints (preconnect, dns-prefetch)
- Font loading async
- Angular.json optimizado
- Gzip y cache headers
- OnPush change detection
- TrackBy functions

---

## 🎨 Estilos del Badge de Versión

El badge de versión tiene:
- **Background:** `var(--bg-tertiary)`
- **Color:** `var(--text-tertiary)`
- **Font:** Roboto Mono (monospace)
- **Tamaño:** text-xs
- **Padding:** px-2 py-1
- **Bordes:** rounded

**Modo Claro:**
```
[v1.0.0]  ← Fondo gris claro, texto gris
```

**Modo Oscuro:**
```
[v1.0.0]  ← Fondo gris oscuro, texto gris claro
```

---

## 🔍 Ejemplos de Changelog

### Ejemplo 1: Bug Fix (Patch)
```markdown
## v1.0.1 (12 Nov 2025)
### Bug Fixes
- Fixed image loading issue in Safari
- Corrected category badge alignment on mobile
```

```bash
npm version patch -m "fix: image loading and mobile badges"
```

### Ejemplo 2: Nueva Feature (Minor)
```markdown
## v1.1.0 (15 Nov 2025)
### Features
- Added newsletter subscription
- Implemented search filters
- Added dark mode toggle in header
```

```bash
npm version minor -m "feat: newsletter, filters, and dark mode toggle"
```

### Ejemplo 3: Breaking Change (Major)
```markdown
## v2.0.0 (01 Dic 2025)
### Breaking Changes
- Complete redesign
- New API endpoints
- Removed deprecated components

### Migration Guide
- Update all imports from old components
- See MIGRATION.md for details
```

```bash
npm version major -m "BREAKING: complete redesign and new API"
```

---

## 🏷️ Git Tags

### Ver tags existentes:
```bash
git tag
```

### Crear tag manual:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Ver detalles de un tag:
```bash
git show v1.0.0
```

---

## 📦 Build con Versión

### El proceso de build automáticamente:

1. Lee `package.json`
2. Extrae el campo `version`
3. Lo incluye en el bundle compilado
4. Se muestra en el footer del sitio

### Verificar versión en build:

```bash
# Build
npm run build:prod

# Verificar en el bundle
grep -r "version" dist/hackeruna-frontend/browser/*.js
# Debe aparecer: "version":"1.0.0"
```

---

## 🚀 Automatización con GitHub Actions

### Crear `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build:prod
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

---

## 📋 Checklist de Release

- [ ] Actualizar CHANGELOG.md
- [ ] Incrementar versión en package.json
- [ ] Commit de cambios
- [ ] Crear tag de git
- [ ] Push con tags
- [ ] Build de producción
- [ ] Deploy a servidor
- [ ] Verificar versión en footer
- [ ] Crear release en GitHub (opcional)

---

## 🎯 Comandos Rápidos

```bash
# Ver versión actual
npm version

# Patch (1.0.0 → 1.0.1)
npm version patch && git push --tags

# Minor (1.0.0 → 1.1.0)
npm version minor && git push --tags

# Major (1.0.0 → 2.0.0)
npm version major && git push --tags

# Build con nueva versión
npm run build:prod
```

---

**Última Actualización:** 12 de Noviembre, 2025  
**Versión Actual:** 1.0.1  
**Próxima Versión:** 1.0.2 (Bug fixes) o 1.1.0 (Nuevas features)
