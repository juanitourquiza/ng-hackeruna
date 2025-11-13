# 🚀 Angular Universal (SSR) para JSON-LD en View Source

**Fecha:** 13 de Noviembre, 2025  
**Objetivo:** Hacer que JSON-LD aparezca en "View Source"

---

## ❓ ¿Qué es SSR (Server-Side Rendering)?

**SSR** renderiza Angular en el servidor **antes** de enviar HTML al cliente.

### **SPA (Actual):**
```
1. Servidor envía index.html básico
2. Cliente descarga JavaScript
3. Angular renderiza en navegador
4. SchemaService inserta JSON-LD
```
**View Source:** Solo ve index.html básico ❌

### **SSR (Con Angular Universal):**
```
1. Servidor ejecuta Angular
2. Servidor genera HTML completo (con JSON-LD)
3. Cliente recibe HTML pre-renderizado
4. Angular se "hidrata" en navegador
```
**View Source:** Ve HTML completo con JSON-LD ✅

---

## 🎯 ¿Cuándo necesitas SSR?

### **SÍ necesitas SSR si:**
- ❌ Bots antiguos que no ejecutan JavaScript
- ❌ Redes sociales (Facebook, Twitter) necesitan meta tags inmediatos
- ❌ Velocidad crítica (LCP, First Contentful Paint)
- ❌ Quieres que aparezca en "View Source"

### **NO necesitas SSR si:**
- ✅ Google/Bing/ChatGPT son tus principales preocupaciones (ejecutan JS)
- ✅ Meta tags ya funcionan con MetaTagsService
- ✅ Velocidad es aceptable (<3s LCP)
- ✅ Solo quieres AEO/SEO moderno

---

## 📦 Implementación de Angular Universal

### **1. Instalar Angular Universal:**

```bash
ng add @angular/ssr
```

Este comando:
- ✅ Instala `@angular/platform-server`
- ✅ Crea `server.ts`
- ✅ Actualiza `angular.json`
- ✅ Agrega scripts de build SSR

---

### **2. Modificar SchemaService para SSR:**

**Archivo:** `src/app/core/services/schema.service.ts`

```typescript
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addSchema(schema: any): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }
}
```

**Por qué:**
- `isPlatformBrowser()` evita errores en servidor
- `DOCUMENT` injection funciona en SSR

---

### **3. Build para SSR:**

```bash
# Build client + server
npm run build:ssr

# Resultado:
dist/
  hackeruna-frontend/
    browser/     # Cliente (SPA)
    server/      # Servidor (SSR)
```

---

### **4. Servidor Node.js:**

Angular Universal genera un servidor Express:

**Archivo:** `server.ts` (generado automáticamente)

```typescript
import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';

const app = express();
const PORT = process.env['PORT'] || 4000;

// Motor de renderizado Angular
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', join(__dirname, 'browser'));

// Servir archivos estáticos
app.get('*.*', express.static(join(__dirname, 'browser')));

// Todas las rutas van a Angular Universal
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
```

---

### **5. Deploy SSR:**

**Opción A: Node.js Server (VPS, DigitalOcean, AWS EC2)**

```bash
# Build SSR
npm run build:ssr

# Copiar dist/ al servidor
scp -r dist/ user@server:/var/www/hackeruna/

# En el servidor
cd /var/www/hackeruna
node dist/hackeruna-frontend/server/main.js
```

**Opción B: Vercel (Más fácil)**

```bash
# Vercel detecta Angular automáticamente
vercel deploy
```

**Opción C: Netlify (Con plugin)**

Requiere configuración adicional para SSR.

---

## 📊 Comparación: SPA vs SSR

| Aspecto | SPA (Actual) | SSR (Universal) |
|---------|--------------|-----------------|
| JSON-LD en View Source | ❌ No | ✅ Sí |
| Google puede indexar | ✅ Sí (ejecuta JS) | ✅ Sí (HTML directo) |
| Meta tags en View Source | ❌ No | ✅ Sí |
| Velocidad inicial (LCP) | 🟡 Media | ✅ Rápida |
| Complejidad deploy | ✅ Fácil (static) | 🟡 Media (Node.js) |
| Costo hosting | ✅ Bajo (Netlify free) | 🟡 Medio (VPS/Vercel) |
| Bots antiguos | ❌ No ven contenido | ✅ Ven todo |

---

## ✅ Alternativa Simple: Prerender

Si no quieres SSR completo, usa **prerender** (pre-generar HTML estático):

### **Angular Prerender:**

```bash
ng add @nguniversal/express-engine
ng run hackeruna-frontend:prerender
```

**Resultado:**
```
dist/browser/
  index.html
  post/
    como-localizar-a-alguien-en-twitter-tinfoleak/
      index.html  # ← HTML pre-renderizado con JSON-LD
```

**Ventajas:**
- ✅ JSON-LD aparece en View Source
- ✅ Deploy estático (sin Node.js)
- ✅ Funciona con Netlify/Vercel

**Desventajas:**
- 🟡 Solo para rutas conocidas
- 🟡 Build más lento

---

## 🎯 Mi Recomendación

### **Para Hackeruna:**

**NO implementar SSR ahora porque:**

1. ✅ **Google ejecuta JavaScript** → Ve el JSON-LD
2. ✅ **ChatGPT/Perplexity ejecutan JavaScript** → Ven el JSON-LD
3. ✅ **Meta tags funcionan** → Open Graph/Twitter cards OK
4. ✅ **Deploy simple** → Netlify/Vercel static hosting
5. ✅ **Sin costo extra** → No necesitas VPS

### **Verificar con herramientas:**

En lugar de "View Source", usa:

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```

2. **Schema Markup Validator**
   ```
   https://validator.schema.org/
   ```

3. **Inspect Element (F12)**
   ```javascript
   document.querySelectorAll('script[type="application/ld+json"]')
   ```

**Si estas herramientas detectan el JSON-LD, está funcionando correctamente.**

---

## 🚀 Cuándo Implementar SSR

**Implementar SSR solo si:**

1. ❌ Google Rich Results Test NO detecta el JSON-LD
2. ❌ Velocidad LCP > 3 segundos
3. ❌ Facebook/Twitter no muestran preview cards
4. ❌ Bots antiguos son importante para tu audiencia

**Por ahora:**
- ✅ Verifica con Google Rich Results Test
- ✅ Usa Inspect Element para confirmar JSON-LD
- ✅ Monitorea Google Search Console
- ✅ Si todo funciona, no necesitas SSR

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** Opcional (no necesario por ahora)  
**Prioridad:** Baja
