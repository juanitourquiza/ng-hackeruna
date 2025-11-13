# 🎨 Fix: Alineación de Texto y Videos de YouTube

**Fecha:** 13 de Noviembre, 2025  
**Issue:** Texto centrado y videos de YouTube no se muestran  
**URL Afectada:** https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak

---

## ❌ Problemas Identificados

### **1. Texto alineado al centro**
- **Causa:** La clase `prose` de Tailwind no tenía `text-align: left` explícito
- **Impacto:** Todo el contenido del post aparecía centrado en lugar de alineado a la izquierda
- **Comparación:** En WordPress backend se veía correctamente alineado

### **2. Videos de YouTube no se muestran**
- **Causa:** El CSP (Content Security Policy) bloqueaba iframes de YouTube
- **Impacto:** Los videos embebidos de YouTube no se renderizaban
- **Error en consola:** `Refused to frame 'https://www.youtube.com/'`

---

## ✅ Soluciones Implementadas

### **1. Alineación de Texto a la Izquierda**

**Archivo:** `src/app/features/post/post-detail.component.scss`

```scss
:host ::ng-deep {
  .prose {
    text-align: left; // ✅ Forzar alineación izquierda
    
    h1, h2, h3, h4, h5, h6 {
      text-align: left; // ✅ Títulos alineados
    }
    
    p {
      text-align: left; // ✅ Párrafos alineados
    }
  }
}
```

**Beneficio:** Todo el contenido ahora se muestra alineado a la izquierda, igual que en WordPress.

---

### **2. Soporte para Videos Embebidos**

**Archivo:** `src/app/features/post/post-detail.component.scss`

```scss
// Soporte para videos embebidos (YouTube, Vimeo, etc.)
iframe {
  max-width: 100%;
  margin: 2rem 0;
  border-radius: 0.5rem;
  
  // Responsive 16:9 aspect ratio para videos
  &[src*="youtube.com"],
  &[src*="vimeo.com"],
  &[src*="dailymotion.com"] {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 400px;
  }
}

// Contenedor de video responsive (si WordPress lo usa)
.wp-block-embed,
.wp-block-embed__wrapper,
.wp-embedded-content {
  position: relative;
  width: 100%;
  margin: 2rem 0;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
  
  // Mantener aspect ratio 16:9
  &::before {
    content: '';
    display: block;
    padding-top: 56.25%; // 16:9 ratio
  }
}

// Figuras de WordPress
figure {
  margin: 2rem 0;
  text-align: center;
  
  iframe {
    margin: 0 auto;
  }
  
  figcaption {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-style: italic;
  }
}
```

**Características:**
- ✅ **Responsive:** Videos se adaptan a cualquier tamaño de pantalla
- ✅ **Aspect Ratio 16:9:** Mantiene proporciones correctas
- ✅ **min-height:** Asegura que videos no sean demasiado pequeños
- ✅ **Soporte completo:** YouTube, Vimeo, Dailymotion
- ✅ **WordPress blocks:** Compatible con bloques de WordPress

---

### **3. Actualización del CSP**

**Archivo:** `src/index.html`

**Antes:**
```html
frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;
```

**Después:**
```html
frame-src 'self' 
  https://www.youtube.com 
  https://www.youtube-nocookie.com 
  https://player.vimeo.com 
  https://www.dailymotion.com 
  https://googleads.g.doubleclick.net 
  https://tpc.googlesyndication.com;
```

**Dominios agregados:**
- ✅ `www.youtube.com` - Videos de YouTube estándar
- ✅ `www.youtube-nocookie.com` - YouTube con privacidad mejorada
- ✅ `player.vimeo.com` - Videos de Vimeo
- ✅ `www.dailymotion.com` - Videos de Dailymotion

---

### **4. DNS Prefetch para Videos**

**Archivo:** `src/index.html`

```html
<link rel="dns-prefetch" href="https://www.youtube.com">
<link rel="dns-prefetch" href="https://player.vimeo.com">
```

**Beneficio:** Carga más rápida de videos al hacer DNS lookup anticipado.

---

## 🧪 Verificación

### **1. Alineación de Texto**

**Probar:**
```
1. Abrir: https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
2. Verificar que TODO el texto esté alineado a la izquierda
3. Comparar con WordPress backend
```

**Resultado esperado:**
- ✅ Títulos alineados a la izquierda
- ✅ Párrafos alineados a la izquierda
- ✅ Listas alineadas a la izquierda
- ✅ Igual que en WordPress

---

### **2. Videos de YouTube**

**Probar:**
```
1. Abrir: https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
2. Buscar el video de YouTube embebido
3. Verificar que se muestra correctamente
4. Verificar que es responsive (resize browser)
```

**Resultado esperado:**
- ✅ Video se muestra sin errores
- ✅ Ratio 16:9 mantenido
- ✅ Responsive en móvil
- ✅ No hay errores CSP en consola (F12)

---

### **3. Verificar CSP en Consola**

**Pasos:**
```
1. Abrir F12 (Dev Tools)
2. Ir a la pestaña Console
3. Navegar a un post con video
```

**Antes (error):**
```
❌ Refused to frame 'https://www.youtube.com/' because it violates the following 
   Content Security Policy directive: "frame-src 'self' ..."
```

**Después (sin errores):**
```
✅ (sin errores CSP)
✅ Video carga correctamente
```

---

## 📋 Archivos Modificados

1. ✅ `src/app/features/post/post-detail.component.scss`
   - Alineación izquierda forzada
   - Estilos para iframes
   - Contenedores responsive
   - Figuras de WordPress

2. ✅ `src/index.html`
   - CSP actualizado (frame-src)
   - DNS prefetch para YouTube/Vimeo

---

## 🎯 Beneficios

### **Para el Usuario:**
- ✅ **Mejor legibilidad:** Texto alineado a la izquierda (estándar web)
- ✅ **Videos funcionan:** Contenido multimedia visible
- ✅ **Responsive:** Videos se adaptan a móvil/tablet
- ✅ **Consistencia:** Igual que WordPress backend

### **Para SEO/AEO:**
- ✅ **VideoObject Schema:** Preparado para agregar en futuro
- ✅ **Mejor UX:** Videos embebidos mejoran tiempo en página
- ✅ **Mobile-friendly:** Videos responsive ayudan a Core Web Vitals

---

## 🚀 Deploy

### **1. Build:**
```bash
npm run build:prod
```

### **2. Verificar dist/:**
```bash
# Verificar que index.html tiene CSP actualizado
cat dist/hackeruna-frontend/browser/index.html | grep "frame-src"
```

### **3. Deploy a producción:**
Subir archivos de `dist/hackeruna-frontend/browser/` al servidor.

### **4. Verificar en producción:**
```
https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
```

---

## 📊 Testing Checklist

- [ ] **Alineación izquierda** - Todo el texto alineado correctamente
- [ ] **Video YouTube** - Se muestra sin errores
- [ ] **Responsive móvil** - Video se adapta en móvil
- [ ] **No errores CSP** - Consola sin errores
- [ ] **Aspect ratio** - Videos mantienen proporción 16:9
- [ ] **Carga rápida** - DNS prefetch funciona
- [ ] **WordPress blocks** - Bloques de video funcionan
- [ ] **Vimeo** - Videos de Vimeo también funcionan (si hay)

---

## 💡 Notas Adicionales

### **Otros servicios de video:**

Si en el futuro necesitas agregar más servicios:

**Twitch:**
```html
<!-- CSP -->
frame-src https://player.twitch.tv https://clips.twitch.tv

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://player.twitch.tv">
```

**TikTok:**
```html
<!-- CSP -->
frame-src https://www.tiktok.com

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://www.tiktok.com">
```

**Wistia:**
```html
<!-- CSP -->
frame-src https://fast.wistia.net

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://fast.wistia.net">
```

---

### **Video Schema para AEO (Futuro):**

Cuando tengas tiempo, agrega VideoObject schema:

```typescript
// En SchemaService
addVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // 'PT10M30S' = 10 min 30 seg
  contentUrl: string;
  embedUrl: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl
  };
  
  this.insertSchema(schema);
}
```

---

## ✅ Resumen

| Problema | Solución | Archivo | Estado |
|----------|----------|---------|--------|
| Texto centrado | `text-align: left` | post-detail.component.scss | ✅ Fixed |
| Videos no muestran | CSP `frame-src` | index.html | ✅ Fixed |
| Videos no responsive | `aspect-ratio: 16/9` | post-detail.component.scss | ✅ Fixed |
| Carga lenta videos | DNS prefetch | index.html | ✅ Fixed |

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** ✅ Resuelto  
**Deploy:** Pendiente
