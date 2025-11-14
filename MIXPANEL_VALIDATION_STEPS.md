# ✅ Mixpanel - Pasos de Validación Final

**Fecha:** 14 de Noviembre, 2025  
**Problema:** Mixpanel no detecta datos en "Verify Connection"  
**Estado:** 🔄 En proceso de validación

---

## 🚀 Pasos para Validar

### **Paso 1: Recargar en Incógnito**

```
Mac: Cmd + Shift + N
Windows: Ctrl + Shift + N
```

Luego ir a: `http://localhost:4200`

---

### **Paso 2: Esperar 1-2 Segundos**

El script envía un evento automáticamente después de 1 segundo:

```javascript
setTimeout(function() {
  mixpanel.track('Page View', {
    'page': window.location.pathname,
    'url': window.location.href,
    'referrer': document.referrer,
    'timestamp': new Date().toISOString()
  });
}, 1000);
```

---

### **Paso 3: Verificar en Consola (F12)**

```javascript
// Verificar que Mixpanel está cargado
console.log(window.mixpanel);
// Debería mostrar: Object { init: ƒ, track: ƒ, ... }

// Verificar ID único
console.log(window.mixpanel.get_distinct_id());
// Debería mostrar un ID único
```

---

### **Paso 4: Verificar Network Tab**

```
F12 → Network
Buscar: api-js.mixpanel.com
Debería mostrar:
  - [200 OK] POST /record/
  - Con datos del evento
```

---

### **Paso 5: Enviar Evento Manual (Opcional)**

Si aún no aparece, enviar un evento manual:

```javascript
// En consola (F12)
window.mixpanel.track('Test Event', {
  'test': true,
  'timestamp': new Date().toISOString()
});
```

---

### **Paso 6: Ir a Mixpanel Dashboard**

```
1. Ir a: https://mixpanel.com/
2. Login con tu cuenta
3. Ir a: Setup Guide → Verify Connection
4. Esperar 10-30 segundos
5. Refrescar la página
```

**Debería mostrar:**
- ✅ Events: 1+ (Page View)
- ✅ Users: 1+
- ✅ Replays: (si está habilitado)

---

## 🔍 Solución de Problemas

### **Problema: "Listening for Data" sin detectar**

**Soluciones:**

1. **Esperar más tiempo** (30-60 segundos)
2. **Refrescar Mixpanel dashboard**
3. **Verificar Network tab** para errores
4. **Enviar evento manual** en consola
5. **Verificar token** es correcto

---

### **Problema: Network muestra error**

**Soluciones:**

1. Verificar CSP en consola (F12)
2. Limpiar caché del navegador
3. Usar navegador incógnito
4. Verificar que no hay bloqueadores de ads

---

### **Problema: Evento no aparece en Dashboard**

**Soluciones:**

1. Esperar 1-2 minutos (puede tardar)
2. Refrescar página de Mixpanel
3. Verificar proyecto correcto
4. Verificar token en `index.html`

---

## 📊 Evento Que Se Envía

```javascript
{
  event: "Page View",
  properties: {
    page: "/",
    url: "http://localhost:4200/",
    referrer: "",
    timestamp: "2025-11-14T21:00:00.000Z"
  }
}
```

---

## ✅ Checklist de Validación

```
□ Navegador incógnito abierto
□ Ir a http://localhost:4200
□ Esperar 1-2 segundos
□ F12 → Console → Verificar window.mixpanel
□ F12 → Network → Verificar api-js.mixpanel.com [200 OK]
□ Ir a Mixpanel dashboard
□ Esperar 30 segundos
□ Refrescar Mixpanel dashboard
□ Verificar que aparecen eventos
□ ✅ Validación completa
```

---

## 🎯 Si Sigue Sin Funcionar

### **Plan B: Verificar Token**

1. Ir a Mixpanel: https://mixpanel.com/
2. Settings → Project Settings
3. Copiar "Project Token"
4. Verificar que coincide con `index.html`:
   ```javascript
   mixpanel.init('569d103248457398b9adec970066d8c3', {
   ```

---

### **Plan C: Revisar Configuración**

```javascript
// En consola (F12)
console.log(window.mixpanel.get_config());
// Verificar configuración actual
```

---

### **Plan D: Contactar Soporte**

Si nada funciona:
1. Ir a: https://mixpanel.com/help/
2. Contact support
3. Proporcionar:
   - Token: `569d103248457398b9adec970066d8c3`
   - URL: `http://localhost:4200`
   - Error: "No detecta eventos"

---

## 📚 Recursos

| Recurso | URL |
|---------|-----|
| Mixpanel Docs | https://developer.mixpanel.com/ |
| Troubleshooting | https://developer.mixpanel.com/docs/troubleshooting |
| Support | https://mixpanel.com/help/ |

---

## 🔗 Información de Tu Proyecto

| Dato | Valor |
|------|-------|
| **Token** | 569d103248457398b9adec970066d8c3 |
| **Sitio Dev** | http://localhost:4200 |
| **Sitio Prod** | https://hackeruna.com |
| **Evento Automático** | Page View (cada 1 segundo) |
| **Autocapture** | ✅ Habilitado |
| **Session Recording** | ✅ 100% |

---

## 🎯 Resumen

**Pasos principales:**

1. ✅ Abrir navegador incógnito
2. ✅ Ir a localhost:4200
3. ✅ Esperar 1-2 segundos
4. ✅ Verificar en F12 → Network
5. ✅ Ir a Mixpanel dashboard
6. ✅ Esperar 30 segundos
7. ✅ Refrescar dashboard
8. ✅ Ver eventos aparecer

**El evento se envía automáticamente, solo espera 30-60 segundos.** ⏱️

---

**Status:** 🔄 Esperando Validación  
**Última Actualización:** 14 de Noviembre, 2025  
**Próximo Paso:** Verificar en Mixpanel dashboard en 30 segundos
