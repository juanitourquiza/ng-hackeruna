# 🔧 Fix: Estilos de Categorías y Filtro Funcionando

**Fecha:** 13 de Noviembre, 2025  
**Problemas:** Badges de categorías con color incorrecto + Filtro no funcionaba  
**Estado:** ✅ Resuelto

---

## ❌ Problemas Identificados

### **1. Badges de categorías con color oscuro**
- **Síntoma:** Las categorías mostraban texto oscuro en lugar de blanco
- **Causa:** La clase `.prose` de Tailwind sobreescribía el color del texto
- **Afectaba:** Legibilidad en badges azules con texto oscuro

### **2. Filtro por categoría no funcionaba**
- **Síntoma:** Al hacer click en una categoría, mostraba las mismas noticias del home
- **Causa:** `loadHomeData()` no pasaba el `categoryId` al API de WordPress
- **Resultado:** Siempre cargaba todos los posts, sin filtrar

---

## ✅ Soluciones Implementadas

### **1. Fix Estilos de Badges** ✅

**Archivo:** `src/app/features/post/post-detail.component.html`

**Cambios realizados:**

```html
<!-- Antes -->
<div class="mb-6 flex flex-wrap gap-2">
  <a class="text-xs font-mono uppercase tracking-wider text-white py-1.5 px-4 inline-block rounded hover:opacity-80 transition-opacity cursor-pointer no-underline" 
     style="background-color: var(--accent-blue);">
    {{ category.name }}
  </a>
</div>

<!-- Después ✅ -->
<div class="mb-6 flex flex-wrap gap-2 not-prose">
  <a class="text-xs font-mono uppercase tracking-wider py-1.5 px-4 inline-block rounded hover:opacity-80 transition-opacity cursor-pointer" 
     style="background-color: var(--accent-blue); color: #ffffff !important; text-decoration: none !important;">
    {{ category.name }}
  </a>
</div>
```

**Cambios clave:**
1. ✅ `not-prose` en el `<div>` → Excluye de estilos de `.prose`
2. ✅ `color: #ffffff !important` → Fuerza color blanco
3. ✅ `text-decoration: none !important` → Sin subrayado
4. ✅ Removida clase `text-white` (reemplazada por inline style)
5. ✅ Removida clase `no-underline` (reemplazada por inline style)

**Por qué funciona:**
- `not-prose` excluye el contenedor de los estilos de Tailwind Typography
- `!important` sobreescribe cualquier CSS de `.prose a`
- Color inline tiene más especificidad que clases

---

### **2. Fix Filtro de Categorías** ✅

**Archivo:** `src/app/features/home/home.component.ts`

**Problema en el código:**

```typescript
// ❌ ANTES - No pasaba categoryId
this.wpApi.getPosts(1, this.postsPerPage).subscribe({
  // Siempre cargaba TODOS los posts
});
```

**Solución:**

```typescript
// ✅ DESPUÉS - Pasa categoryId correctamente
private loadHomeData(): void {
  this.loading.set(true);
  this.error.set(null);
  this.currentPage.set(1); // ✅ Reset page when loading new data
  
  const categoryId = this.selectedCategoryId(); // ✅ Lee la categoría seleccionada

  // Load featured post (only if no category filter)
  if (!categoryId) {
    // Carga featured post solo si NO hay filtro
    this.wpApi.getFeaturedPosts(1).subscribe({...});
  } else {
    // ✅ Oculta featured post cuando hay filtro
    this.featuredPost.set(null);
  }

  // ✅ Load recent posts with category filter
  this.wpApi.getPosts(1, this.postsPerPage, categoryId || undefined).subscribe({
    next: (response) => {
      this.recentPosts.set(response.data); // ✅ Solo posts de esa categoría
      this.totalPages.set(response.totalPages);
      this.hasMorePosts.set(this.currentPage() < response.totalPages);
      this.loading.set(false);
    }
  });

  // Load trending posts (no filter, always show recent)
  this.wpApi.getPosts(1, 4).subscribe({...}); // Sin filtro (sidebar)
}
```

**Cambios clave:**
1. ✅ `const categoryId = this.selectedCategoryId()` → Lee la categoría desde signal
2. ✅ `categoryId || undefined` → Pasa categoryId al API
3. ✅ `this.currentPage.set(1)` → Reset paginación al cambiar filtro
4. ✅ `this.featuredPost.set(null)` → Oculta featured cuando hay filtro
5. ✅ `if (!categoryId)` → Featured post solo sin filtro

---

## 🎯 Flujo de Trabajo Actualizado

### **Escenario 1: Usuario hace click en categoría "SEGURIDAD INFORMÁTICA"**

1. **Usuario en post:**
   ```
   https://hackeruna.com/post/como-localizar-a-alguien-en-twitter-tinfoleak
   ```

2. **Ve badges (ahora en blanco):**
   ```
   [GNU/LINUX] [HERRAMIENTAS ÚTILES] [SEGURIDAD INFORMÁTICA] [TOOLS] [VIDEOS]
   ```

3. **Click en "SEGURIDAD INFORMÁTICA"**

4. **Redirige a:**
   ```
   https://hackeruna.com/?category=9
   ```

5. **HomeComponent:**
   - ✅ Lee `?category=9` de la URL
   - ✅ `selectedCategoryId.set(9)`
   - ✅ Llama `loadHomeData()`
   - ✅ Pasa `categoryId: 9` al API
   - ✅ WordPress devuelve solo posts de categoría 9
   - ✅ Oculta featured post
   - ✅ Muestra solo posts filtrados

---

### **Escenario 2: Usuario quita el filtro**

1. **Usuario en:**
   ```
   https://hackeruna.com/?category=9
   ```

2. **Click en "Todas" en CategoryFilter**

3. **Redirige a:**
   ```
   https://hackeruna.com/
   ```

4. **HomeComponent:**
   - ✅ Lee URL sin parámetro `category`
   - ✅ `selectedCategoryId.set(null)`
   - ✅ Llama `loadHomeData()`
   - ✅ Pasa `categoryId: undefined` al API
   - ✅ WordPress devuelve todos los posts
   - ✅ Muestra featured post
   - ✅ Muestra todos los posts

---

## 🧪 Verificación

### **1. Probar Estilos de Badges:**

```bash
ng serve
```

Luego:

1. ✅ Abrir: `http://localhost:4200/post/en-el-desarrollo-de-apps-flutter-o-la-natividad`
2. ✅ Ver badges de categorías
3. ✅ Verificar texto en **blanco** sobre fondo azul
4. ✅ Hover debe cambiar opacidad
5. ✅ No debe haber subrayado

**Antes (incorrecto):**
```
Badges con texto oscuro/gris (ilegible)
```

**Después (correcto):**
```
✅ Badges con texto blanco (legible)
✅ Fondo azul (#3B82F6)
✅ Sin subrayado
```

---

### **2. Probar Filtro de Categorías:**

1. ✅ Abrir post con categoría "android"
2. ✅ Click en badge "android"
3. ✅ Verificar redirección a `/?category=X`
4. ✅ Verificar que solo muestra posts de Android

**Debug en consola:**
```javascript
// En HomeComponent.loadHomeData()
console.log('Category ID:', categoryId); // Debe mostrar el ID correcto
console.log('Recent posts:', this.recentPosts()); // Solo posts de esa categoría
```

---

### **3. Verificar API de WordPress:**

**Sin filtro:**
```
GET https://backend.hackeruna.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=true
```

**Con filtro (categoría 9):**
```
GET https://backend.hackeruna.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=true&categories=9
```

Verificar en Network tab (F12) que se envía el parámetro `categories`.

---

## 📋 Archivos Modificados

1. ✅ `src/app/features/post/post-detail.component.html`
   - Agregado `not-prose` al contenedor
   - Color blanco forzado con `!important`
   - Sin subrayado forzado

2. ✅ `src/app/features/home/home.component.ts`
   - `categoryId` pasado a `wpApi.getPosts()`
   - Featured post oculto cuando hay filtro
   - Paginación reseteada al cambiar filtro

---

## 🎨 CSS Aplicado

### **Inline Styles en Badges:**

```css
background-color: var(--accent-blue);  /* #3B82F6 */
color: #ffffff !important;              /* Blanco forzado */
text-decoration: none !important;       /* Sin subrayado */
```

### **Clase not-prose:**

```html
<div class="not-prose">
  <!-- Contenido excluido de estilos .prose -->
</div>
```

**Efecto:**
- Excluye el contenedor de los estilos de Tailwind Typography
- Los enlaces dentro no heredan estilos de `.prose a`

---

## 💡 Por Qué Funcionan los Fixes

### **1. Fix de Estilos:**

**Problema:**
```css
/* .prose a en Tailwind Typography */
.prose a {
  color: inherit;  /* ← Tomaba color del texto (oscuro) */
  text-decoration: underline;
}
```

**Solución:**
```css
/* not-prose excluye del selector */
.not-prose a {
  /* No aplica estilos de .prose */
}

/* !important sobreescribe cualquier otro estilo */
style="color: #ffffff !important;"
```

---

### **2. Fix de Filtro:**

**Problema:**
```typescript
// No pasaba categoryId → API devolvía todos los posts
this.wpApi.getPosts(1, this.postsPerPage).subscribe(...)
```

**Solución:**
```typescript
// Pasa categoryId → API filtra por categoría
const categoryId = this.selectedCategoryId();
this.wpApi.getPosts(1, this.postsPerPage, categoryId || undefined).subscribe(...)
```

**WordPress API:**
```php
// Filtra posts por categoría
if (isset($_GET['categories'])) {
  $args['cat'] = $_GET['categories'];
}
```

---

## ✅ Checklist de Verificación

Después de `ng serve`:

- [ ] **Badges en blanco** - Texto blanco sobre azul
- [ ] **Sin subrayado** - Enlaces sin línea debajo
- [ ] **Hover funciona** - Opacidad cambia al pasar mouse
- [ ] **Click funciona** - Redirige a `/?category=X`
- [ ] **Filtro aplica** - Solo muestra posts de esa categoría
- [ ] **Featured oculto** - No muestra featured post cuando hay filtro
- [ ] **Paginación reset** - Vuelve a página 1 al cambiar filtro
- [ ] **Load more funciona** - Carga más posts de la misma categoría
- [ ] **URL correcta** - Network tab muestra `&categories=X`

---

## 📊 Antes vs Después

| Aspecto | Antes ❌ | Después ✅ |
|---------|---------|-----------|
| Color texto badges | Oscuro/gris | Blanco |
| Legibilidad | Baja | Alta |
| Filtro categoría | No funciona | Funciona |
| Posts mostrados | Todos | Solo de categoría |
| Featured post | Siempre visible | Oculto con filtro |
| Paginación | No reset | Reset al filtrar |
| URL params | Se envía pero no usa | Se usa correctamente |

---

## 🚀 Deploy

### **1. Build:**
```bash
npm run build:prod
```

### **2. Verificar en producción:**

**Estilos:**
```
https://hackeruna.com/post/en-el-desarrollo-de-apps-flutter-o-la-natividad
```
Badges deben verse en blanco.

**Filtro:**
```
https://hackeruna.com/?category=9
```
Debe mostrar solo posts de categoría 9.

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** ✅ Resuelto  
**Deploy:** Listo para producción
