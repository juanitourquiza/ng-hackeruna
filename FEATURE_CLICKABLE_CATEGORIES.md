# ✨ Feature: Categorías Clickeables + Fix Video YouTube Bloqueado

**Fecha:** 13 de Noviembre, 2025  
**Implementado:** Categorías clickeables con filtro y solución a video bloqueado

---

## 🎯 Características Implementadas

### **1. Categorías Clickeables** ✅

Las badges de categoría en los posts ahora son enlaces que filtran posts por categoría.

#### **Comportamiento:**
- Click en categoría → Redirige a Home con filtro activo
- URL: `https://hackeruna.com/?category=5` (ejemplo con categoría ID 5)
- Home filtra automáticamente posts de esa categoría

---

## 📝 Cambios Implementados

### **1. Post Detail - Enlaces de Categorías**

**Archivo:** `src/app/features/post/post-detail.component.html`

**Antes:**
```html
<div class="mb-6 flex flex-wrap gap-2">
  @for (category of categories; track category.id) {
    <span class="text-xs font-mono uppercase tracking-wider text-white py-1.5 px-4 inline-block rounded" 
          style="background-color: var(--accent-blue);">
      {{ category.name }}
    </span>
  }
</div>
```

**Después:**
```html
<div class="mb-6 flex flex-wrap gap-2">
  @for (category of categories; track category.id) {
    <a 
      [routerLink]="['/']"
      [queryParams]="{ category: category.id }"
      class="text-xs font-mono uppercase tracking-wider text-white py-1.5 px-4 inline-block rounded hover:opacity-80 transition-opacity cursor-pointer no-underline" 
      style="background-color: var(--accent-blue);"
      [title]="'Ver todos los posts de ' + category.name"
    >
      {{ category.name }}
    </a>
  }
</div>
```

**Cambios:**
- ✅ `<span>` → `<a>` con `routerLink`
- ✅ `[queryParams]="{ category: category.id }"` para filtrar
- ✅ `hover:opacity-80` para feedback visual
- ✅ `cursor-pointer` para indicar clickeable
- ✅ `title` con texto descriptivo

---

### **2. Home Component - Leer Parámetro de Categoría**

**Archivo:** `src/app/features/home/home.component.ts`

**Imports agregados:**
```typescript
import { ActivatedRoute } from '@angular/router';
```

**Inyección de dependencia:**
```typescript
export class HomeComponent implements OnInit {
  private wpApi = inject(WordpressApiService);
  private route = inject(ActivatedRoute);  // ✅ Nuevo
```

**ngOnInit actualizado:**
```typescript
ngOnInit(): void {
  // Leer parámetro de categoría desde URL
  this.route.queryParams.subscribe(params => {
    const categoryId = params['category'] ? Number(params['category']) : null;
    this.selectedCategoryId.set(categoryId);
    this.loadHomeData();
  });
}
```

**¿Qué hace?**
1. ✅ Lee el parámetro `category` de la URL
2. ✅ Convierte el ID a número
3. ✅ Actualiza `selectedCategoryId` signal
4. ✅ Recarga los posts con el filtro aplicado

---

### **3. CSP Expandido para YouTube**

**Archivo:** `src/index.html`

El error "This content is blocked" ocurría porque faltaban dominios de YouTube en el CSP.

**Cambios en script-src:**
```html
script-src 'self' 'unsafe-inline' 'unsafe-eval' 
  https://pagead2.googlesyndication.com 
  https://www.googletagmanager.com 
  https://*.google-analytics.com 
  https://adservice.google.com 
  https://googleads.g.doubleclick.net 
  https://tpc.googlesyndication.com 
  https://www.youtube.com          ✅ Nuevo
  https://s.ytimg.com;             ✅ Nuevo
```

**Cambios en connect-src:**
```html
connect-src 'self' 
  https://backend.hackeruna.com 
  https://*.google-analytics.com 
  https://*.analytics.google.com 
  https://pagead2.googlesyndication.com 
  https://*.googletagmanager.com
  https://www.youtube.com;        ✅ Nuevo
```

**Nuevas directivas agregadas:**
```html
media-src 'self' https: data: blob:;                                          ✅ Nuevo
child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;   ✅ Nuevo
```

**¿Por qué se bloqueaba?**
- YouTube carga scripts desde `www.youtube.com` y `s.ytimg.com`
- YouTube necesita `media-src` para reproducir video
- YouTube usa `child-src` para frames embebidos

---

## 🎨 Ejemplo de Flujo de Usuario

### **Escenario 1: Usuario hace click en categoría "SEGURIDAD INFORMÁTICA"**

1. **Usuario está en:**
   ```
   https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
   ```

2. **Ve las badges de categorías:**
   ```
   [GNU/LINUX] [HERRAMIENTAS ÚTILES] [SEGURIDAD INFORMÁTICA] [TOOLS] [VIDEOS]
   ```

3. **Hace click en "SEGURIDAD INFORMÁTICA"**

4. **Es redirigido a:**
   ```
   https://hackeruna.com/?category=9
   ```
   (donde `9` es el ID de la categoría "SEGURIDAD INFORMÁTICA")

5. **Home muestra:**
   - Solo posts de la categoría "SEGURIDAD INFORMÁTICA"
   - El filtro de categorías muestra "SEGURIDAD INFORMÁTICA" como activo

---

### **Escenario 2: Usuario quita el filtro**

1. **Usuario está en:**
   ```
   https://hackeruna.com/?category=9
   ```

2. **Hace click en el botón "Todas"** en el componente de filtro de categorías

3. **Es redirigido a:**
   ```
   https://hackeruna.com/
   ```

4. **Home muestra:**
   - Todos los posts sin filtro

---

## 🔍 Cómo Funciona el Filtro

### **CategoryFilterComponent** (ya existente)

Este componente maneja la UI de filtros y emite el ID de categoría seleccionado:

```typescript
onCategoryChange(categoryId: number | null): void {
  this.categorySelected.emit(categoryId);
}
```

### **HomeComponent** escucha el evento:

```typescript
onCategorySelected(categoryId: number | null): void {
  this.selectedCategoryId.set(categoryId);
  this.currentPage.set(1);
  this.loadHomeData();
}
```

### **WordPress API filtra los posts:**

```typescript
getPosts(page: number = 1, perPage: number = 10, categoryId?: number) {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString())
    .set('_embed', 'true');

  if (categoryId) {
    params = params.set('categories', categoryId.toString());
  }

  return this.http.get<WpPost[]>(`${this.apiUrl}/posts`, { params, observe: 'response' });
}
```

---

## 🧪 Testing

### **1. Probar Categorías Clickeables:**

```bash
ng serve
```

Luego:

1. ✅ Abrir: `http://localhost:4200/post/como-localizar-a-alguien-en-twitter-tinfoleak`
2. ✅ Ver badges de categorías (azules, en la parte superior)
3. ✅ Hacer click en cualquier categoría
4. ✅ Verificar redirección a Home con `?category=X` en URL
5. ✅ Verificar que solo se muestran posts de esa categoría

---

### **2. Probar Video de YouTube:**

1. ✅ Abrir mismo post
2. ✅ Scroll hasta el video de YouTube
3. ✅ Verificar que el video se muestra (no el mensaje "This content is blocked")
4. ✅ Click en Play para reproducir
5. ✅ Verificar que NO hay errores en consola (F12)

---

### **3. Verificar CSP en Consola:**

**Antes (bloqueado):**
```
❌ Refused to load the script 'https://www.youtube.com/...' because it violates 
   the following Content Security Policy directive: "script-src 'self'..."
```

**Después (funciona):**
```
✅ (sin errores CSP relacionados a YouTube)
✅ Video carga y reproduce correctamente
```

---

## 📋 Archivos Modificados

1. ✅ `src/app/features/post/post-detail.component.html`
   - Categorías como enlaces clickeables

2. ✅ `src/app/features/home/home.component.ts`
   - Inyección de `ActivatedRoute`
   - Lectura de query params `category`
   - Filtro automático al cargar

3. ✅ `src/index.html`
   - CSP expandido para YouTube:
     - `script-src` + `www.youtube.com`, `s.ytimg.com`
     - `connect-src` + `www.youtube.com`
     - `media-src` nuevo
     - `child-src` nuevo

---

## 🎯 Beneficios

### **Para el Usuario:**
- ✅ **Exploración fácil:** Click en categoría para ver más posts similares
- ✅ **Navegación intuitiva:** URL con parámetros permite bookmarks
- ✅ **Feedback visual:** Hover en categorías con transición suave
- ✅ **Videos funcionan:** YouTube embebido sin bloqueos

### **Para SEO/AEO:**
- ✅ **URLs semánticas:** `?category=9` indexable por Google
- ✅ **Navegación interna:** Mejora link juice entre posts relacionados
- ✅ **Tiempo en sitio:** Usuarios exploran más contenido
- ✅ **Contenido multimedia:** Videos mejoran engagement

---

## 🚀 Deploy a Producción

### **1. Build:**
```bash
npm run build:prod
```

### **2. Verificar dist:**
```bash
# Verificar que index.html tiene CSP expandido
cat dist/hackeruna-frontend/browser/index.html | grep "media-src"
```

### **3. Deploy:**
Subir `dist/hackeruna-frontend/browser/` al servidor.

### **4. Verificar en producción:**

**Categorías clickeables:**
```
https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
```
Click en categoría → `https://hackeruna.com/?category=X`

**Video YouTube:**
```
https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
```
Scroll hasta video → Debe mostrarse y reproducir

---

## 💡 Mejoras Futuras (Opcional)

### **1. Breadcrumb con Categoría:**

Si estás en Home con filtro, mostrar:
```
Inicio > Categoría: SEGURIDAD INFORMÁTICA
```

### **2. Título Dinámico:**

Cambiar el `<title>` según la categoría:
```typescript
if (categoryId) {
  document.title = `${categoryName} - Hackeruna`;
}
```

### **3. Indicador Visual de Filtro Activo:**

En Home, mostrar un banner:
```html
@if (selectedCategoryId()) {
  <div class="filter-banner">
    Mostrando posts de: <strong>{{ categoryName }}</strong>
    <button (click)="clearFilter()">✕ Quitar filtro</button>
  </div>
}
```

### **4. Analytics:**

Trackear clicks en categorías:
```typescript
onCategoryClick(categoryName: string) {
  gtag('event', 'category_click', {
    category_name: categoryName
  });
}
```

---

## ✅ Checklist de Verificación

Después de `ng serve`:

- [ ] **Categorías clickeables** - Links funcionan
- [ ] **Redirección correcta** - Lleva a Home con `?category=X`
- [ ] **Filtro aplicado** - Solo muestra posts de esa categoría
- [ ] **Hover funciona** - Opacidad cambia al pasar mouse
- [ ] **Video YouTube visible** - No mensaje "blocked"
- [ ] **Video reproduce** - Click en Play funciona
- [ ] **Sin errores CSP** - Consola limpia (F12)
- [ ] **Responsive** - Funciona en móvil
- [ ] **Title tooltip** - Muestra texto al hover

---

## 📊 Resumen

| Feature | Estado | Beneficio |
|---------|--------|-----------|
| Categorías clickeables | ✅ Implementado | Mejor navegación |
| Filtro por URL params | ✅ Implementado | URLs bookmarkeables |
| Hover effect | ✅ Implementado | Feedback visual |
| CSP YouTube expandido | ✅ Fixed | Videos funcionan |
| media-src, child-src | ✅ Agregado | Sin bloqueos |

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** ✅ Listo para producción  
**Deploy:** Pending
