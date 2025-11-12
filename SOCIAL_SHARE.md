# 📱 Sistema de Compartir en Redes Sociales

**Fecha de Implementación:** 12 de Noviembre, 2025

---

## 🎯 Resumen

Sistema completo de compartir artículos en redes sociales con:
- ✅ Botones de compartir (Facebook, Twitter, LinkedIn, WhatsApp)
- ✅ Copiar enlace al portapapeles
- ✅ Open Graph meta tags (miniaturas en redes sociales)
- ✅ Twitter Cards
- ✅ SEO mejorado

---

## 📊 Componentes Implementados

### 1. **SocialShareComponent**
Componente reutilizable para compartir en redes sociales.

**Ubicación:** `src/app/shared/components/social-share/social-share.component.ts`

**Características:**
- 5 botones: Facebook, Twitter, LinkedIn, WhatsApp, Copiar
- Ventanas popup optimizadas
- Feedback visual al copiar enlace
- Responsive (móvil y desktop)
- Dark mode compatible

**Uso:**
```html
<app-social-share
  [url]="'https://hackeruna.com/post/mi-articulo'"
  [title]="'Título del artículo'"
  [description]="'Descripción corta del artículo'"
></app-social-share>
```

---

### 2. **MetaTagsService**
Servicio para gestionar meta tags dinámicos (SEO y redes sociales).

**Ubicación:** `src/app/core/services/meta-tags.service.ts`

**Características:**
- Open Graph tags (Facebook)
- Twitter Cards
- Meta tags SEO
- Actualización dinámica por página

**Métodos:**
```typescript
// Actualizar meta tags de un artículo
updateMetaTags(config: MetaTagsConfig)

// Meta tags del home
updateHomeMetaTags()

// Limpiar meta tags específicos
clearMetaTags()
```

---

## 🎨 Diseño de los Botones

### Desktop:
```
┌─────────────────────────────────────────┐
│  Compartir artículo                     │
│                                          │
│  [📘 Facebook] [🐦 Twitter]             │
│  [💼 LinkedIn] [📱 WhatsApp] [📋 Copiar]│
└─────────────────────────────────────────┘
```

### Mobile (Stack vertical):
```
┌─────────────────────┐
│  Compartir artículo │
│                     │
│  [📘 Facebook]      │
│  [🐦 Twitter]       │
│  [💼 LinkedIn]      │
│  [📱 WhatsApp]      │
│  [📋 Copiar]        │
└─────────────────────┘
```

---

## 🔗 Funcionalidades de Compartir

### 1. **Facebook**
```javascript
shareOnFacebook()
```
- Abre Facebook Sharer
- URL: `https://www.facebook.com/sharer/sharer.php?u={URL}`
- Popup: 600x600px
- Facebook obtiene meta tags automáticamente

### 2. **Twitter / X**
```javascript
shareOnTwitter()
```
- Abre Twitter Intent
- URL: `https://twitter.com/intent/tweet?url={URL}&text={TITLE}`
- Popup: 600x600px
- Incluye título y descripción en el tweet

### 3. **LinkedIn**
```javascript
shareOnLinkedIn()
```
- Abre LinkedIn Share
- URL: `https://www.linkedin.com/sharing/share-offsite/?url={URL}`
- Popup: 600x600px
- LinkedIn obtiene meta tags automáticamente

### 4. **WhatsApp**
```javascript
shareOnWhatsApp()
```
- Abre WhatsApp con mensaje pre-llenado
- URL: `https://wa.me/?text={TITLE}%0A%0A{DESCRIPTION}%0A%0A{URL}`
- Formato: **Título** + Descripción + URL
- Funciona en móvil y desktop

### 5. **Copiar Enlace**
```javascript
copyLink()
```
- Copia URL al portapapeles
- API moderna: `navigator.clipboard.writeText()`
- Fallback: `document.execCommand('copy')`
- Feedback visual: "¡Copiado!" (2 segundos)

---

## 📸 Open Graph Meta Tags

### ¿Qué son?
Open Graph son meta tags que controlan cómo se ve tu contenido cuando se comparte en redes sociales.

### Implementación:

```html
<!-- Facebook / Open Graph -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://hackeruna.com/post/mi-articulo">
<meta property="og:title" content="Título del Artículo | Hackeruna">
<meta property="og:description" content="Descripción corta...">
<meta property="og:image" content="https://hackeruna.com/imagen.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Hackeruna">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@hackeruna">
<meta name="twitter:title" content="Título del Artículo">
<meta name="twitter:description" content="Descripción corta...">
<meta name="twitter:image" content="https://hackeruna.com/imagen.jpg">

<!-- Article specific -->
<meta property="article:published_time" content="2025-11-12T10:00:00Z">
<meta property="article:modified_time" content="2025-11-12T15:00:00Z">
<meta property="article:author" content="Juan Urquiza">
<meta property="article:tag" content="Angular">
<meta property="article:tag" content="TypeScript">
```

---

## 🖼️ Requisitos de Imágenes

### Tamaños Recomendados:

**Open Graph (Facebook, LinkedIn):**
- Tamaño: 1200 x 630 px
- Ratio: 1.91:1
- Formato: JPG, PNG
- Peso: < 8 MB

**Twitter Cards:**
- Summary Large Image: 1200 x 628 px
- Summary: 280 x 150 px
- Ratio: 2:1
- Formato: JPG, PNG, WEBP, GIF
- Peso: < 5 MB

**WhatsApp:**
- Usa Open Graph
- Tamaño: 300 x 300 px mínimo
- Máximo: 300 KB

---

## 🔄 Flujo de Actualización de Meta Tags

```
1. Usuario navega a /post/:slug
   ↓
2. PostDetailComponent carga el post
   ↓
3. loadPost() obtiene datos de WordPress API
   ↓
4. updateMetaTags() actualiza dinámicamente:
   - og:title → Título del post
   - og:description → Excerpt del post
   - og:image → Featured image
   - og:url → URL completa del post
   - article:published_time → Fecha de publicación
   - article:tag → Categorías/Tags
   ↓
5. Meta tags actualizados en <head>
   ↓
6. Redes sociales obtienen meta tags al compartir
```

---

## 🧪 Testing

### 1. **Testing Local**
```bash
npm start
# Abrir http://localhost:4200
# Navegar a un post
# Click en botones de compartir
```

### 2. **Verificar Meta Tags**
```bash
# Inspeccionar elemento → <head>
# Buscar meta tags con property="og:*"
```

### 3. **Testing de Compartir**

#### Facebook Debugger:
https://developers.facebook.com/tools/debug/
```
1. Ingresar URL: https://hackeruna.com/post/mi-articulo
2. Click "Debug"
3. Ver preview con imagen
4. Click "Scrape Again" si hiciste cambios
```

#### Twitter Card Validator:
https://cards-dev.twitter.com/validator
```
1. Ingresar URL
2. Preview Card
3. Verificar imagen y texto
```

#### LinkedIn Post Inspector:
https://www.linkedin.com/post-inspector/
```
1. Ingresar URL
2. Inspect
3. Ver preview
```

#### WhatsApp:
```
1. Enviar URL a chat de prueba
2. Ver preview automático
```

---

## 📱 Comportamiento por Red Social

### Facebook:
- ✅ Abre popup
- ✅ Obtiene og:image automáticamente
- ✅ Muestra preview con miniatura
- ✅ Usuario puede editar texto
- ⏱️ Cache: 24 horas (usar Debugger para forzar)

### Twitter:
- ✅ Abre popup
- ✅ Obtiene twitter:image
- ✅ Large image card
- ✅ Pre-llena texto con título
- ⏱️ Cache: 7 días

### LinkedIn:
- ✅ Abre popup
- ✅ Obtiene og:image
- ✅ Muestra preview profesional
- ✅ Usuario puede agregar comentario
- ⏱️ Cache: Variable

### WhatsApp:
- ✅ Abre app o web
- ✅ Pre-llena mensaje con formato
- ✅ Obtiene og:image
- ✅ Funciona en móvil y desktop
- ⏱️ Sin cache (tiempo real)

---

## 🎨 Personalización

### Colores de Botones:
```scss
.facebook { background: #1877F2; }  // Azul Facebook
.twitter { background: #1DA1F2; }   // Azul Twitter
.linkedin { background: #0A66C2; }  // Azul LinkedIn
.whatsapp { background: #25D366; }  // Verde WhatsApp
.copy { background: #6B7280; }      // Gris
.copy.copied { background: #10B981; } // Verde success
```

### Iconos:
- SVG inline (optimizados)
- Tamaño: 20x20px
- Color: currentColor (hereda del botón)

---

## 🚀 Deploy

### Verificar antes de deploy:
```bash
# 1. Build de producción
npm run build:prod

# 2. Verificar que index.html tiene meta tags
cat dist/hackeruna-frontend/browser/index.html | grep "og:"

# 3. Verificar rutas absolutas
# URLs deben ser: https://hackeruna.com/...
# NO: http://localhost:4200/...
```

### Después del deploy:
```bash
# 1. Verificar URL en Facebook Debugger
# 2. Verificar URL en Twitter Card Validator
# 3. Test compartir en cada red social
# 4. Verificar que imagen se muestra correctamente
```

---

## 🐛 Troubleshooting

### Problema: Imagen no se muestra al compartir

**Causas:**
1. URL de imagen relativa (debe ser absoluta)
2. Imagen muy grande (> 8 MB)
3. Imagen no accesible públicamente
4. Cache de red social

**Soluciones:**
```typescript
// ❌ MAL - URL relativa
image: '/assets/imagen.jpg'

// ✅ BIEN - URL absoluta
image: 'https://hackeruna.com/assets/imagen.jpg'

// ✅ MEJOR - Featured image de WordPress
image: post._embedded['wp:featuredmedia'][0].source_url
```

### Problema: Compartir no abre popup

**Causas:**
1. Bloqueador de popups
2. Error en URL encoding

**Soluciones:**
```typescript
// Verificar que URLs están encoded
const url = encodeURIComponent(this.url);

// Verificar que ventana se abre correctamente
window.open(shareUrl, '_blank', 'width=600,height=600');
```

### Problema: Meta tags no se actualizan

**Causas:**
1. Cache del navegador
2. Service Worker antiguo
3. Meta tags no dinámicos

**Soluciones:**
```bash
# Limpiar cache
Ctrl + Shift + R (Hard reload)

# Verificar actualización
Inspeccionar → <head> → Buscar meta tags

# Force scrape en Facebook
Facebook Debugger → Scrape Again
```

---

## 📊 Estadísticas de Compartir

### Analytics:
Para rastrear shares, agregar UTM parameters:
```typescript
shareOnFacebook(): void {
  const url = `${this.url}?utm_source=facebook&utm_medium=social&utm_campaign=share`;
  // ...
}
```

### Google Analytics:
```typescript
// Track share event
gtag('event', 'share', {
  method: 'Facebook',
  content_type: 'article',
  item_id: 'post-123'
});
```

---

## 🔮 Mejoras Futuras

### Opcional:
- [ ] Contador de shares (API de cada red social)
- [ ] Pinterest share button
- [ ] Reddit share button
- [ ] Telegram share button
- [ ] Email share (mailto:)
- [ ] Print button
- [ ] Native Web Share API (móvil)
- [ ] Shortlinks (bit.ly integration)
- [ ] QR code para compartir
- [ ] Share analytics dashboard

---

## 📚 Referencias

**Open Graph:**
- [Open Graph Protocol](https://ogp.me/)
- [Facebook Sharing](https://developers.facebook.com/docs/sharing/webmasters)

**Twitter Cards:**
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

**Tools:**
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Icons:**
- [Simple Icons](https://simpleicons.org/)

---

**Implementado por:** Juan Urquiza (@juanitourquiza)  
**Fecha:** 12 de Noviembre, 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Completado y funcionando
