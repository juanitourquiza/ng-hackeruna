# 📊 Mixpanel Analytics - Configuración

**Fecha:** 14 de Noviembre, 2025  
**Archivo:** `src/index.html`  
**Token:** `569d103248457398b9adec970066d8c3`  
**Estado:** ✅ Instalado

---

## 📋 ¿Qué es Mixpanel?

**Mixpanel** es una plataforma de análisis de eventos que permite:

1. ✅ **Tracking de Eventos** - Registrar acciones de usuarios
2. ✅ **Análisis de Sesiones** - Grabar y reproducir sesiones
3. ✅ **Funnels** - Analizar flujos de conversión
4. ✅ **Cohortes** - Agrupar usuarios por comportamiento
5. ✅ **Retention** - Medir retención de usuarios
6. ✅ **Autocapture** - Capturar eventos automáticamente

---

## 🔧 Instalación Completada

### **Script Agregado:**

**Ubicación:** `src/index.html` (Líneas 107-117)

```html
<!-- Mixpanel Analytics -->
<script type="text/javascript">
  (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){...}
  
  mixpanel.init('569d103248457398b9adec970066d8c3', {
    autocapture: true,
    record_sessions_percent: 100,
  })
</script>
```

### **Configuración:**

| Opción | Valor | Propósito |
|--------|-------|----------|
| **Token** | `569d103248457398b9adec970066d8c3` | ID único de tu proyecto |
| **autocapture** | `true` | Capturar eventos automáticamente |
| **record_sessions_percent** | `100` | Grabar 100% de sesiones |

---

## 🔐 CSP Actualizado

### **script-src (Línea 50):**
```
https://cdn.mxpnl.com
```

### **connect-src (Línea 53):**
```
https://api.mixpanel.com
https://api-eu.mixpanel.com
https://cdn.mxpnl.com
```

### **DNS Prefetch (Líneas 70-71):**
```html
<link rel="dns-prefetch" href="https://cdn.mxpnl.com">
<link rel="dns-prefetch" href="https://api.mixpanel.com">
```

---

## 🎯 Características Habilitadas

### **Autocapture (Automático):**
- ✅ Clicks en botones
- ✅ Cambios en inputs
- ✅ Envíos de formularios
- ✅ Cambios de página
- ✅ Scroll

### **Session Recording (100%):**
- ✅ Grabación de sesiones de usuarios
- ✅ Reproducción de interacciones
- ✅ Heatmaps de clicks
- ✅ Análisis de comportamiento

---

## 📊 Eventos Capturados Automáticamente

### **Eventos de Página:**
```javascript
// Automático
mixpanel.track('$page_view')
mixpanel.track('$mp_web_page_view')
```

### **Eventos de Interacción:**
```javascript
// Automático
mixpanel.track('$click')
mixpanel.track('$form_submit')
mixpanel.track('$text_change')
```

### **Eventos de Sesión:**
```javascript
// Automático
mixpanel.track('$session_start')
mixpanel.track('$session_end')
```

---

## 🚀 Uso en Angular

### **Importar Mixpanel en Componente:**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Mixpanel ya está inicializado globalmente
    // Acceder a través de window.mixpanel
    const mixpanel = (window as any).mixpanel;
    
    // Identificar usuario
    mixpanel.identify('user-id-123');
    
    // Establecer propiedades del usuario
    mixpanel.people.set({
      'email': 'user@example.com',
      'name': 'John Doe',
      'plan': 'premium'
    });
    
    // Rastrear evento personalizado
    mixpanel.track('User Signup', {
      'plan': 'premium',
      'source': 'organic'
    });
  }
}
```

### **Rastrear Eventos Personalizados:**

```typescript
// En cualquier componente
const mixpanel = (window as any).mixpanel;

// Evento simple
mixpanel.track('Button Clicked');

// Evento con propiedades
mixpanel.track('Product Viewed', {
  'product_id': '123',
  'product_name': 'Laptop',
  'price': 999.99,
  'category': 'Electronics'
});

// Evento con múltiples propiedades
mixpanel.track('Purchase', {
  'order_id': 'ORD-123',
  'amount': 99.99,
  'items': 3,
  'currency': 'USD'
});
```

### **Identificar Usuarios:**

```typescript
// Identificar usuario único
mixpanel.identify('user-123');

// Establecer propiedades del usuario
mixpanel.people.set({
  'email': 'user@example.com',
  'name': 'John Doe',
  'signup_date': new Date(),
  'plan': 'premium',
  'lifetime_value': 500
});

// Incrementar propiedad
mixpanel.people.increment('visits', 1);

// Agregar a lista
mixpanel.people.append('tags', 'vip');
```

---

## 📈 Dashboard Mixpanel

### **Acceso:**

```
https://mixpanel.com/
```

### **Vistas Disponibles:**

1. **Overview**
   - Usuarios activos
   - Eventos por día
   - Tendencias

2. **Events**
   - Todos los eventos
   - Frecuencia
   - Propiedades

3. **Funnels**
   - Flujos de conversión
   - Tasa de conversión
   - Puntos de abandono

4. **Retention**
   - Retención de usuarios
   - Cohortes
   - Churn rate

5. **Segmentation**
   - Análisis por segmento
   - Comparativas
   - Tendencias

6. **Session Replay**
   - Grabación de sesiones
   - Reproducción
   - Heatmaps

---

## 🧪 Verificación

### **Paso 1: Recargar Navegador**

```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### **Paso 2: Abrir Consola (F12)**

```javascript
// Verificar que Mixpanel está cargado
console.log(window.mixpanel);
// Debería mostrar: Object { init: ƒ, track: ƒ, ... }

// Rastrear evento de prueba
window.mixpanel.track('Test Event');
```

### **Paso 3: Verificar en Network Tab**

```
F12 → Network
Buscar: api.mixpanel.com
Debería mostrar: [200 OK]
```

### **Paso 4: Verificar en Mixpanel Dashboard**

```
https://mixpanel.com/
Ir a: Events
Buscar: "Test Event"
Debería aparecer en los últimos eventos
```

---

## 🔍 Dominios Permitidos

| Dominio | Propósito |
|---------|-----------|
| `cdn.mxpnl.com` | CDN de Mixpanel (script) |
| `api.mixpanel.com` | API de Mixpanel (USA) |
| `api-eu.mixpanel.com` | API de Mixpanel (Europa) |

---

## 📋 Cambios Realizados

| Archivo | Línea | Cambio |
|---------|-------|--------|
| `src/index.html` | 50 | Agregar `https://cdn.mxpnl.com` en `script-src` |
| `src/index.html` | 53 | Agregar Mixpanel APIs en `connect-src` |
| `src/index.html` | 70-71 | Agregar DNS prefetch para Mixpanel |
| `src/index.html` | 107-117 | Agregar script de Mixpanel |

---

## ✅ Checklist

```
✅ Script de Mixpanel agregado
✅ Token configurado: 569d103248457398b9adec970066d8c3
✅ Autocapture habilitado
✅ Session recording habilitado (100%)
✅ CSP actualizado
✅ DNS prefetch configurado
✅ Script en el head
✅ Accesible en navegador
```

---

## 🚀 Próximos Pasos

### **Inmediato:**
1. Recargar navegador (Cmd+Shift+R)
2. Verificar en consola (F12)
3. Rastrear evento de prueba

### **Corto Plazo:**
1. Acceder a Mixpanel dashboard
2. Verificar eventos
3. Configurar funnels

### **Largo Plazo:**
1. Rastrear eventos personalizados
2. Identificar usuarios
3. Analizar comportamiento
4. Optimizar conversiones

---

## 📚 Recursos

| Recurso | URL |
|---------|-----|
| Mixpanel | https://mixpanel.com/ |
| Documentación | https://developer.mixpanel.com/ |
| API Reference | https://developer.mixpanel.com/reference/api |
| Best Practices | https://developer.mixpanel.com/docs/best-practices |

---

## 🎯 Resumen

**Mixpanel está completamente instalado y configurado:**

- ✅ Script cargado en el head
- ✅ Autocapture de eventos habilitado
- ✅ Session recording habilitado
- ✅ CSP permitiendo Mixpanel
- ✅ DNS prefetch configurado
- ✅ Listo para rastrear eventos

**Puedes empezar a rastrear eventos inmediatamente.** 🚀

---

**Status:** ✅ Instalado y Configurado  
**Última Actualización:** 14 de Noviembre, 2025  
**Token:** 569d103248457398b9adec970066d8c3
