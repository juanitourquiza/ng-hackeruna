# 📊 Sistema de Contador de Lecturas/Vistas

**Fecha:** 12 de Noviembre, 2025  
**Estado:** Análisis de Opciones

---

## 🔍 Situación Actual

**❌ WordPress REST API NO incluye contador de vistas por defecto.**

La API estándar de WordPress (`/wp-json/wp/v2/posts`) retorna:
- ✅ Título, contenido, fecha, autor
- ✅ Categorías, tags, featured image
- ✅ Comentarios (si están habilitados)
- ❌ **NO incluye: vistas, lecturas, popularidad**

---

## 💡 Opciones Disponibles

### **Opción 1: Plugin de WordPress** ⭐ (Recomendado)
Instalar un plugin en WordPress que agregue el contador.

#### Plugins Populares:

**1. Post Views Counter**
- Free y Open Source
- Expone datos en REST API
- Dashboard con estadísticas
- Compatible con caché

**2. WP-PostViews**
- Plugin clásico (2M+ instalaciones)
- Muy confiable
- Requiere configuración adicional para REST API

**3. Simple Post Views Counter**
- Ligero y rápido
- Sin dependencias

---

### **Opción 2: Google Analytics API**
Obtener datos de Google Analytics.

**Pros:**
- ✅ Datos muy precisos
- ✅ Sin carga en servidor
- ✅ Analytics completo

**Contras:**
- ❌ Requiere API key
- ❌ Más complejo de implementar
- ❌ Latencia en datos (24-48h delay)
- ❌ Necesita backend proxy

---

### **Opción 3: Sistema Propio con Custom Fields**
Crear endpoint custom en WordPress.

**Pros:**
- ✅ Control total
- ✅ Sin plugins externos
- ✅ Personalizable

**Contras:**
- ❌ Requiere desarrollo backend
- ❌ Mantenimiento
- ❌ Problemas con caché

---

### **Opción 4: Sistema Propio con Base de Datos Externa**
Usar Firebase, Supabase o base de datos propia.

**Pros:**
- ✅ Independiente de WordPress
- ✅ Escalable
- ✅ Tiempo real

**Contras:**
- ❌ Infraestructura adicional
- ❌ Costo
- ❌ Complejidad

---

## ⭐ Solución Recomendada: Post Views Counter Plugin

### **Por qué esta opción:**
1. ✅ Fácil de implementar (sin cambios backend)
2. ✅ Expone datos en REST API automáticamente
3. ✅ Free y open source
4. ✅ Probado y confiable
5. ✅ Compatible con caché

---

## 🚀 Implementación con Post Views Counter

### **Paso 1: Instalar Plugin en WordPress**

```bash
# Opción A: Desde WordPress Admin
1. Ir a: Plugins → Add New
2. Buscar: "Post Views Counter"
3. Install → Activate

# Opción B: Vía WP-CLI
wp plugin install post-views-counter --activate
```

---

### **Paso 2: Configurar Plugin**

```php
// En WordPress Admin:
Settings → Post Views Counter

Configuraciones recomendadas:
✅ Enable post views counting
✅ Count mode: PHP (o JavaScript para usuarios únicos)
✅ Reset counts: Never
✅ Time between counts: 24 hours (evitar duplicados)
✅ Who to count: Guests and logged-in users
✅ Display in: Posts (habilitar)
✅ REST API: Enable (IMPORTANTE!)
```

---

### **Paso 3: Verificar Endpoint API**

Después de instalar, verificar que la API retorna los datos:

```bash
# Test en consola
curl "https://backend.hackeruna.com/wp-json/wp/v2/posts?_embed=true"

# Debe retornar algo como:
{
  "id": 123,
  "title": {...},
  "views": 450,          // ← Nuevo campo
  "post_views": 450,     // ← O este campo
  ...
}
```

**Nota:** El nombre del campo puede variar según el plugin:
- Post Views Counter: `post_views` o `views`
- WP-PostViews: `views` o `post_views_count`

---

### **Paso 4: Actualizar Modelo en Angular**

```typescript
// src/app/core/models/wordpress.models.ts

export interface WpPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  // ... otros campos existentes ...
  
  // ✅ Agregar campos de vistas
  views?: number;           // Post Views Counter
  post_views?: number;      // Alternativo
  
  _embedded?: {
    author?: WpAuthor[];
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: WpTerm[][];
  };
}
```

---

### **Paso 5: Crear Getter en PostDetailComponent**

```typescript
// src/app/features/post/post-detail.component.ts

export class PostDetailComponent implements OnInit {
  // ... código existente ...
  
  get postViews(): number {
    const post = this.post();
    if (!post) return 0;
    
    // Intentar diferentes nombres de campo
    return post.views || 
           post.post_views || 
           0;
  }
  
  formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }
}
```

---

### **Paso 6: Mostrar en Template**

```html
<!-- src/app/features/post/post-detail.component.html -->

<!-- Opción A: En meta information (junto a autor y fecha) -->
<div class="flex items-center mb-10 text-sm not-prose" style="color: var(--text-tertiary);">
  <span class="material-symbols-outlined text-base mr-2">person</span>
  <span class="mr-4">Por {{ authorName }}</span>
  
  <span class="material-symbols-outlined text-base mr-2">calendar_today</span>
  <time [attr.datetime]="post()!.date" class="mr-4">{{ formatDate(post()!.date) }}</time>
  
  <!-- ✅ Contador de vistas -->
  <span class="material-symbols-outlined text-base mr-2">visibility</span>
  <span>{{ formatViews(postViews) }} vistas</span>
</div>

<!-- Opción B: Badge destacado -->
<div class="flex items-center gap-2 mb-4">
  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm" 
        style="background-color: var(--bg-secondary); color: var(--text-secondary);">
    <span class="material-symbols-outlined text-base">trending_up</span>
    <span>{{ formatViews(postViews) }} lecturas</span>
  </span>
</div>
```

---

### **Paso 7: Mostrar en PostCard (Lista de Posts)**

```typescript
// src/app/shared/components/post-card/post-card.component.ts

@Component({
  selector: 'app-post-card',
  // ...
})
export class PostCardComponent {
  @Input() post!: WpPost;
  @Input() featured: boolean = false;
  
  get views(): number {
    return this.post.views || this.post.post_views || 0;
  }
  
  formatViews(views: number): string {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }
}
```

```html
<!-- src/app/shared/components/post-card/post-card.component.html -->

<!-- Agregar en footer del card -->
<div class="flex items-center justify-between text-xs" style="color: var(--text-tertiary);">
  <span>{{ formatDate(post.date) }}</span>
  
  <!-- ✅ Views counter -->
  @if (views > 0) {
    <span class="flex items-center gap-1">
      <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
      {{ formatViews(views) }}
    </span>
  }
</div>
```

---

## 🎨 Diseños de UI

### **Diseño 1: Minimalista**
```
Juan Urquiza  •  12 Nov 2025  •  👁 450 vistas
```

### **Diseño 2: Con iconos Material**
```
[👤] Juan Urquiza    [📅] 12 Nov 2025    [👁] 450 vistas
```

### **Diseño 3: Badge destacado**
```
┌─────────────────────────┐
│ 🔥 POPULAR              │
│ 1.2K lecturas           │
└─────────────────────────┘
```

### **Diseño 4: En card de post**
```
┌────────────────────────────────┐
│  [Imagen del post]             │
│                                │
│  Título del Post               │
│  Descripción corta...          │
│                                │
│  12 Nov 2025    👁 450 vistas  │
└────────────────────────────────┘
```

---

## 📊 Tracking de Vistas

### **Cómo funciona Post Views Counter:**

1. **Usuario visita post** → GET /post/mi-articulo
2. **Angular carga post** → GET /wp-json/wp/v2/posts?slug=mi-articulo
3. **Plugin detecta visita** → Incrementa contador en WordPress
4. **Próxima carga** → API retorna views actualizado

### **Opciones de conteo:**

**PHP Mode:**
- Cuenta todas las visitas
- Rápido y confiable
- No distingue usuarios

**JavaScript Mode:**
- Puede filtrar bots
- Cuenta usuarios únicos
- Usa cookies

**AJAX Mode:**
- No afecta caché
- Asíncrono
- Más preciso

---

## 🔥 Mostrar Posts Populares

### **Ordenar por más vistas:**

```typescript
// src/app/features/home/home.component.ts

// Agregar método para posts populares
loadPopularPosts(): void {
  // Asumiendo que el plugin expone orderby=views
  const params = new HttpParams()
    .set('orderby', 'views')      // ← Ordenar por vistas
    .set('order', 'desc')          // ← Descendente
    .set('per_page', '5')
    .set('_embed', 'true');
  
  this.http.get<WpPost[]>(`${apiUrl}/posts`, { params })
    .subscribe(posts => {
      this.popularPosts.set(posts);
    });
}
```

```html
<!-- Sidebar: Posts más leídos -->
<div class="popular-posts">
  <h3>📈 Más Leídos</h3>
  
  @for (post of popularPosts(); track post.id) {
    <div class="popular-post-item">
      <span class="rank">#{{ $index + 1 }}</span>
      <div>
        <a [routerLink]="['/post', post.slug]">{{ post.title.rendered }}</a>
        <small>👁 {{ formatViews(post.views || 0) }}</small>
      </div>
    </div>
  }
</div>
```

---

## 🎯 Alternativas sin Plugin

### **Opción: Custom Endpoint en WordPress**

Si no quieres usar plugin, puedes crear endpoint custom:

```php
// En functions.php de tu tema WordPress

// 1. Agregar campo custom a REST API
add_action('rest_api_init', function() {
  register_rest_field('post', 'views', [
    'get_callback' => function($post) {
      $views = get_post_meta($post['id'], 'post_views_count', true);
      return $views ? (int) $views : 0;
    },
    'update_callback' => null,
    'schema' => [
      'description' => 'Post views count',
      'type' => 'integer'
    ]
  ]);
});

// 2. Función para incrementar vistas
function increment_post_views($post_id) {
  $count_key = 'post_views_count';
  $count = get_post_meta($post_id, $count_key, true);
  
  if ($count == '') {
    $count = 0;
    delete_post_meta($post_id, $count_key);
    add_post_meta($post_id, $count_key, '0');
  } else {
    $count++;
    update_post_meta($post_id, $count_key, $count);
  }
}

// 3. Incrementar al ver el post
add_action('wp_head', function() {
  if (is_single()) {
    global $post;
    increment_post_views($post->ID);
  }
});

// 4. Permitir orderby=views
add_filter('rest_post_collection_params', function($params) {
  $params['orderby']['enum'][] = 'views';
  return $params;
});

add_filter('rest_post_query', function($args, $request) {
  if ($request['orderby'] === 'views') {
    $args['meta_key'] = 'post_views_count';
    $args['orderby'] = 'meta_value_num';
  }
  return $args;
}, 10, 2);
```

**Importante:** Este código debe ir en el backend de WordPress (hackeruna.com), no en Angular.

---

## 📈 Analytics Avanzado

### **Opcional: Integrar con Google Analytics**

Si ya tienes GA instalado, puedes mostrar datos reales:

```typescript
// Requiere backend proxy para GA API
getPostAnalytics(slug: string): Observable<number> {
  return this.http.get<{views: number}>(
    `${apiUrl}/analytics/post-views/${slug}`
  ).pipe(map(data => data.views));
}
```

---

## ✅ Recomendación Final

### **Pasos Inmediatos:**

1. ✅ **Instalar "Post Views Counter"** en WordPress backend
2. ✅ **Verificar** que expone datos en REST API
3. ✅ **Actualizar** modelo WpPost con campo `views`
4. ✅ **Mostrar** contador en post detail y post cards
5. ✅ **Opcional:** Agregar sección "Más Leídos"

### **Tiempo estimado:**
- Backend (WordPress): 10 minutos
- Frontend (Angular): 30 minutos
- **Total: ~40 minutos**

---

## 🧪 Testing

### **1. Verificar API retorna vistas:**
```bash
curl "https://backend.hackeruna.com/wp-json/wp/v2/posts?_embed=true" | jq '.[0].views'
```

### **2. Verificar incremento:**
```bash
# Visitar post varias veces
# Verificar que número incrementa
```

### **3. Test en local:**
```typescript
// Console del navegador
console.log(post.views);  // Debe mostrar número
```

---

## 📝 Notas Importantes

1. **Caché:** Si usas CDN/caché, las vistas pueden tardar en actualizar
2. **Bots:** Considera filtrar bots (Google, Facebook crawlers)
3. **Cookies:** Para usuarios únicos, usar cookies o localStorage
4. **Performance:** El plugin no afecta significativamente el rendimiento
5. **Privacy:** Considera GDPR si guardas IPs

---

## 🔗 Referencias

**Plugins:**
- [Post Views Counter](https://wordpress.org/plugins/post-views-counter/)
- [WP-PostViews](https://wordpress.org/plugins/wp-postviews/)

**Documentación:**
- [WordPress REST API Custom Fields](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
- [WordPress Post Meta](https://developer.wordpress.org/reference/functions/get_post_meta/)

---

**Estado:** 📋 Pendiente de implementación  
**Próximos pasos:** Instalar plugin en WordPress backend  
**Contacto backend:** Coordinar con administrador de hackeruna.com
