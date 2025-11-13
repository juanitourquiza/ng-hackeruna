# 📊 Google Analytics 4 (GA4) - Configuración Completa

**Fecha de Implementación:** 12 de Noviembre, 2025  
**ID de Medición:** G-RXGCTBC67S  
**Estado:** ✅ Implementado y Funcionando

---

## 🎯 Resumen

Google Analytics 4 configurado con integración completa en Angular:
- ✅ Tracking automático de páginas (SPA-aware)
- ✅ Tracking de eventos personalizados
- ✅ Tracking de compartir en redes sociales
- ✅ Tracking de formulario de contacto
- ✅ Servicio TypeScript type-safe

---

## 📦 Componentes Implementados

### **1. Script Base (index.html)**
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RXGCTBC67S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RXGCTBC67S', {
    send_page_view: false  // Manejado por Angular Router
  });
</script>
```

**Ubicación:** `src/index.html`

---

### **2. Servicio de Analytics**

**Archivo:** `src/app/core/services/google-analytics.service.ts`

**Características:**
- ✅ Integración con Angular Router
- ✅ Tracking automático de navegación (SPA)
- ✅ Métodos para eventos personalizados
- ✅ Type-safe con TypeScript
- ✅ Verificación de disponibilidad de gtag

**Métodos Disponibles:**

```typescript
// Inicializar (llamar en AppComponent)
analytics.init()

// Pageview manual (automático con init)
analytics.pageView('/post/mi-articulo')

// Evento genérico
analytics.event('click_button', { button_name: 'subscribe' })

// Compartir en redes sociales
analytics.trackShare('Facebook', 'article', 'post-id')

// Búsquedas
analytics.trackSearch('angular tutorial')

// Click en posts
analytics.trackPostClick(123, 'Tutorial Angular')

// Tiempo en página
analytics.trackTimeOnPage('/post/tutorial', 120)

// Scroll depth
analytics.trackScrollDepth(75)

// Formulario de contacto
analytics.trackContactFormSubmit(true)

// Errores
analytics.trackError('API Error', 'PostComponent')
```

---

### **3. Integración en AppComponent**

```typescript
@Component({...})
export class AppComponent implements OnInit {
  private analytics = inject(GoogleAnalyticsService);

  ngOnInit(): void {
    this.analytics.init(); // ← Inicializa tracking automático
  }
}
```

**Ubicación:** `src/app/app.component.ts`

---

### **4. Eventos Implementados**

#### **Compartir en Redes Sociales**
```typescript
// SocialShareComponent
shareOnFacebook() {
  // ... abrir popup ...
  this.analytics.trackShare('Facebook', 'article', this.url);
}
```

**Eventos rastreados:**
- Facebook share
- Twitter share
- LinkedIn share
- WhatsApp share

---

#### **Formulario de Contacto**
```typescript
// ContactComponent
this.http.post(...).subscribe({
  next: (response) => {
    this.analytics.trackContactFormSubmit(true);  // ← Success
  },
  error: (err) => {
    this.analytics.trackContactFormSubmit(false); // ← Error
    this.analytics.trackError(err.message, 'ContactComponent');
  }
});
```

**Eventos rastreados:**
- form_submit (success)
- form_submit (failure)
- exception (errores)

---

## 📈 Eventos Rastreados Automáticamente

### **1. Page Views**
```
Evento: page_view
Parameters:
  - page_path: /post/mi-articulo
  - page_title: Título del Artículo
```

**Cuándo se dispara:**
- Cada cambio de ruta en Angular
- Navegación inicial
- Botón atrás/adelante del navegador

---

### **2. Compartir en Redes Sociales**
```
Evento: share
Parameters:
  - method: Facebook | Twitter | LinkedIn | WhatsApp
  - content_type: article
  - item_id: URL del artículo
```

**Cuándo se dispara:**
- Click en botón de Facebook
- Click en botón de Twitter
- Click en botón de LinkedIn
- Click en botón de WhatsApp

---

### **3. Formulario de Contacto**
```
Evento: form_submit
Parameters:
  - form_name: contact
  - success: true | false
```

**Cuándo se dispara:**
- Envío exitoso del formulario
- Error al enviar el formulario

---

### **4. Errores**
```
Evento: exception
Parameters:
  - description: Mensaje de error
  - fatal: false
  - location: Componente donde ocurrió
```

**Cuándo se dispara:**
- Errores en llamadas HTTP
- Errores de reCAPTCHA
- Cualquier error capturado

---

## 🔧 Content Security Policy (CSP)

Actualizado para permitir Google Analytics:

```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://www.googletagmanager.com 
    https://www.google-analytics.com;
  connect-src 'self' 
    https://www.google-analytics.com 
    https://analytics.google.com;
">
```

---

## 🧪 Testing y Verificación

### **1. Testing Local**

```bash
# 1. Iniciar servidor
npm start

# 2. Abrir navegador
http://localhost:4200

# 3. Abrir DevTools → Console
# 4. Navegar por el sitio
# 5. Ver logs en consola (eventos enviados a GA)
```

---

### **2. Google Analytics Real-Time**

```
1. Ir a Google Analytics
   https://analytics.google.com/

2. Property: Hackeruna (G-RXGCTBC67S)

3. Reports → Realtime

4. Verificar:
   ✅ Usuarios activos en vivo
   ✅ Páginas vistas en tiempo real
   ✅ Eventos disparados
```

---

### **3. Google Tag Assistant**

```
1. Instalar extensión: Tag Assistant Legacy
   https://chrome.google.com/webstore

2. Abrir tu sitio: http://localhost:4200

3. Click en extensión

4. Verificar:
   ✅ Google Analytics tag detectado
   ✅ Medición ID: G-RXGCTBC67S
   ✅ Requests sin errores
```

---

### **4. DebugView en GA4**

```
1. Activar modo debug:
   - Instalar "Google Analytics Debugger" extension
   - O agregar ?debug=true a la URL

2. Ir a GA4 → Admin → DebugView

3. Ver eventos en tiempo real con detalles completos
```

---

## 📊 Métricas Disponibles en GA4

### **Tráfico y Usuarios**

```
✅ Usuarios activos
✅ Nuevos usuarios
✅ Sesiones
✅ Engagement rate
✅ Promedio de duración de sesión
✅ Páginas por sesión
✅ Bounce rate
```

---

### **Comportamiento**

```
✅ Páginas más vistas
✅ Rutas de navegación
✅ Páginas de entrada
✅ Páginas de salida
✅ Velocidad del sitio
```

---

### **Eventos Personalizados**

```
✅ share (redes sociales)
  - Por método (FB, Twitter, etc)
  - Por artículo compartido

✅ form_submit (formulario contacto)
  - Tasa de éxito
  - Tasa de error

✅ exception (errores)
  - Por tipo de error
  - Por componente

✅ search (búsquedas)
  - Términos más buscados
  - Resultados sin matches
```

---

### **Conversiones**

Eventos configurados como conversiones en GA4:

```
✅ form_submit (success)
✅ share (cualquier red social)
```

**Configurar conversiones:**
```
1. GA4 → Admin → Events
2. Marcar evento como "Conversion"
3. Guardar
```

---

### **Demografía y Tecnología**

```
✅ País/Ciudad
✅ Idioma
✅ Dispositivo (móvil/desktop)
✅ Sistema operativo
✅ Navegador
✅ Resolución de pantalla
```

---

## 🎯 Objetivos y Conversiones

### **Conversiones Recomendadas:**

```
1. form_submit (success)
   - Objetivo: Leads/Contactos
   - Valor: $0 (o valor asignado)

2. share (cualquier red)
   - Objetivo: Engagement
   - Valor: $0

3. time_on_page > 60s
   - Objetivo: Contenido de calidad
   - Valor: $0

4. scroll (depth >= 75%)
   - Objetivo: Lectura completa
   - Valor: $0
```

---

## 📈 Informes Personalizados

### **1. Posts Más Populares**

```
Dimensiones:
- page_path (filtrar: /post/*)

Métricas:
- Views
- Average engagement time
- Bounce rate

Orden: Views (descendente)
```

---

### **2. Redes Sociales Performance**

```
Evento: share

Dimensiones:
- method (Facebook, Twitter, etc)
- item_id (URL del post)

Métricas:
- Event count

Análisis:
- ¿Qué red genera más shares?
- ¿Qué posts se comparten más?
```

---

### **3. Formulario de Contacto**

```
Evento: form_submit

Dimensiones:
- success (true/false)

Métricas:
- Event count

KPI:
- Tasa de éxito = (success=true / total) * 100
```

---

## 🔮 Eventos Adicionales (Opcional)

### **Scroll Tracking**

```typescript
// Agregar en PostDetailComponent
@HostListener('window:scroll')
onScroll() {
  const scrolled = (window.scrollY / document.body.scrollHeight) * 100;
  
  if (scrolled > 25 && !this.tracked25) {
    this.analytics.trackScrollDepth(25);
    this.tracked25 = true;
  }
  // ... 50%, 75%, 90%
}
```

---

### **Time on Page**

```typescript
// Agregar en PostDetailComponent
private startTime = Date.now();

ngOnDestroy() {
  const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
  this.analytics.trackTimeOnPage(this.router.url, timeSpent);
}
```

---

### **Click en Post Card**

```typescript
// Agregar en PostCardComponent
@Output() postClick = new EventEmitter<void>();

onClick() {
  this.analytics.trackPostClick(this.post.id, this.post.title.rendered);
  this.postClick.emit();
}
```

---

### **Newsletter Signup**

```typescript
onNewsletterSubmit() {
  this.analytics.event('newsletter_signup', {
    location: 'footer',
    email_hash: this.hashEmail(email)
  });
}
```

---

## 🎨 Dashboards Recomendados

### **Dashboard Principal**

```
Widgets:
1. Usuarios en Tiempo Real
2. Páginas Vistas (últimos 7 días)
3. Top 5 Posts
4. Tasa de Conversión (Contacto)
5. Shares por Red Social
6. Tráfico por País
7. Dispositivos (Mobile vs Desktop)
8. Bounce Rate Promedio
```

---

### **Dashboard de Contenido**

```
Widgets:
1. Posts Más Vistos
2. Tiempo Promedio en Página
3. Scroll Depth Promedio
4. Páginas de Salida
5. Búsquedas Populares
6. Shares por Post
```

---

### **Dashboard de Marketing**

```
Widgets:
1. Fuentes de Tráfico
2. Campañas Activas
3. Tasa de Conversión
4. ROI (si tienes AdSense)
5. Engagement Rate
6. Usuarios Recurrentes vs Nuevos
```

---

## 🔒 Privacidad y GDPR

### **Configuración de Privacidad:**

```javascript
gtag('config', 'G-RXGCTBC67S', {
  anonymize_ip: true,           // Anonimizar IPs
  allow_google_signals: false,  // Desactivar señales de Google
  allow_ad_personalization_signals: false
});
```

---

### **Cookie Banner**

```html
<!-- Agregar en index.html o como componente -->
<div class="cookie-banner">
  <p>Usamos cookies para mejorar tu experiencia.</p>
  <button (click)="acceptCookies()">Aceptar</button>
  <button (click)="rejectCookies()">Rechazar</button>
</div>
```

```typescript
acceptCookies() {
  gtag('consent', 'update', {
    analytics_storage: 'granted'
  });
}

rejectCookies() {
  gtag('consent', 'update', {
    analytics_storage: 'denied'
  });
}
```

---

### **Actualizar Privacy Policy**

Agregar a `/privacy`:

```markdown
## Google Analytics

Usamos Google Analytics para entender cómo los visitantes 
usan nuestro sitio. GA recopila información como:

- Páginas vistas
- Tiempo en el sitio
- Ubicación geográfica (ciudad/país)
- Tipo de dispositivo

No vendemos ni compartimos esta información con terceros.

Puedes optar por no ser rastreado instalando:
https://tools.google.com/dlpage/gaoptout
```

---

## 📱 Google Analytics App (Mobile)

### **Configurar alertas:**

```
1. Descargar Google Analytics App
   iOS: https://apps.apple.com/app/google-analytics/id881599038
   Android: https://play.google.com/store/apps/details?id=com.google.android.apps.giant

2. Iniciar sesión

3. Seleccionar propiedad: Hackeruna

4. Configurar alertas:
   - Pico de tráfico (>100 usuarios)
   - Caída de tráfico (<10 usuarios)
   - Error rate alto

5. Recibir notificaciones push
```

---

## 🚀 Checklist de Implementación

### **Completado:**

- [x] Script de GA4 en `index.html`
- [x] CSP actualizado para permitir GA
- [x] Servicio `GoogleAnalyticsService` creado
- [x] Inicialización en `AppComponent`
- [x] Tracking de pageviews automático
- [x] Tracking de shares en redes sociales
- [x] Tracking de formulario de contacto
- [x] Tracking de errores

### **Próximos Pasos (Opcional):**

- [ ] Configurar conversiones en GA4
- [ ] Crear dashboards personalizados
- [ ] Agregar scroll depth tracking
- [ ] Agregar time on page tracking
- [ ] Configurar alertas en GA App
- [ ] Cookie consent banner
- [ ] Newsletter signup tracking
- [ ] Implementar Enhanced Ecommerce (si vendes algo)
- [ ] A/B testing con Google Optimize

---

## 🔗 Links Útiles

**Google Analytics:**
- [Dashboard GA4](https://analytics.google.com/)
- [Property: Hackeruna (G-RXGCTBC67S)](https://analytics.google.com/analytics/web/#/p[YOUR_PROPERTY_ID])

**Documentación:**
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs/reference)
- [GA4 Events](https://developers.google.com/analytics/devguides/collection/ga4/events)

**Tools:**
- [Tag Assistant](https://tagassistant.google.com/)
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [GA Opt-out](https://tools.google.com/dlpage/gaoptout)

---

## 🐛 Troubleshooting

### **Problema: No aparecen datos en GA4**

```
Verificar:
1. ✅ ID correcto: G-RXGCTBC67S
2. ✅ Script cargado en index.html
3. ✅ analytics.init() llamado en AppComponent
4. ✅ CSP permite googletagmanager.com
5. ✅ Esperar 24-48h para datos completos (Realtime es instantáneo)
```

---

### **Problema: Eventos no se rastrean**

```
Debug:
1. Abrir DevTools → Console
2. window.gtag
   - Debe ser: function
   - NO debe ser: undefined

3. window.dataLayer
   - Debe contener eventos

4. Verificar llamadas:
   Network → Filter: google-analytics.com
   - Debe haber requests POST
```

---

### **Problema: CSP bloquea GA**

```
Error en console:
"Refused to load script from 'googletagmanager.com'"

Solución:
Actualizar CSP en index.html para incluir:
- script-src: https://www.googletagmanager.com
- connect-src: https://www.google-analytics.com
```

---

## 📊 Métricas de Éxito

### **KPIs a Monitorear:**

```
Tráfico:
✅ Usuarios/mes: Meta 1,000+ (para AdSense)
✅ Páginas/sesión: Meta 2.5+
✅ Bounce rate: Meta <60%
✅ Duración sesión: Meta 2+ minutos

Engagement:
✅ Shares/post: Meta 5+
✅ Scroll depth: Meta >50%
✅ Time on page: Meta >90s

Conversiones:
✅ Tasa éxito contacto: Meta >80%
✅ Newsletter signup: Meta 2%+
```

---

**Implementado por:** Juan Urquiza  
**Fecha:** 12 de Noviembre, 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Completado y Funcionando

**Próxima Revisión:** Después de 7 días (analizar primeros datos)
