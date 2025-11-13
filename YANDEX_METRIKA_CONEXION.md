# 🔗 Conexión con Yandex Metrika - Guía Completa

**Fecha:** 13 de Noviembre, 2025  
**ID Yandex:** 105301804  
**Sitio:** https://hackeruna.com

---

## ✅ Verificación de Instalación

### **Método 1: URLs de Debug de Yandex**

Yandex proporciona dos URLs especiales para verificar que el script está correctamente instalado:

#### **Opción A: Debug Mode**
```
https://hackeruna.com/?_ym_debug=2
```

**Qué hace:**
- Activa modo debug de Yandex
- Muestra información de seguimiento en consola
- Verifica que el script se cargue correctamente

**Pasos:**
1. Abre: `https://hackeruna.com/?_ym_debug=2`
2. Abre consola (F12)
3. Busca mensajes de Yandex
4. Deberías ver logs como:
   ```
   [Yandex.Metrika] Counter initialized
   [Yandex.Metrika] Sending pageview
   ```

---

#### **Opción B: Status Check**
```
https://hackeruna.com/?_ym_status-check=105301804&_ym_lang=en
```

**Qué hace:**
- Verifica el estado de la instalación
- Muestra información del contador
- Confirma que Yandex puede acceder a tu sitio

**Pasos:**
1. Abre: `https://hackeruna.com/?_ym_status-check=105301804&_ym_lang=en`
2. Deberías ver una página con información como:
   ```
   Counter ID: 105301804
   Status: OK
   Installation: Verified
   ```

---

### **Método 2: Verificación en Consola (F12)**

Abre la consola de tu navegador y ejecuta:

```javascript
// Verificar que Yandex está cargado
console.log(window.ym);

// Debería mostrar: ƒ ym(a,b,c){...}
```

**Si ves la función `ym`, significa que Yandex está correctamente instalado.** ✅

---

### **Método 3: Verificación en Network Tab**

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca requests a `mc.yandex.ru`

**Deberías ver:**
```
mc.yandex.ru/metrika/tag.js?id=105301804  [Status: 200]
mc.yandex.ru/watch/105301804               [Status: 204]
```

Si ves estos requests, el script está funcionando correctamente. ✅

---

## 🔗 Conectar con la Aplicación de Yandex

### **Paso 1: Crear Cuenta en Yandex**

```
https://metrica.yandex.com/
```

**Opciones:**
- Crear cuenta nueva con email
- O usar cuenta de Yandex existente

---

### **Paso 2: Agregar Sitio**

1. Ve a: https://metrica.yandex.com/
2. Click en: **"Agregar sitio"** o **"Add website"**
3. Ingresa: `https://hackeruna.com`
4. Click: **"Crear"** o **"Create"**

---

### **Paso 3: Verificar Propiedad del Sitio**

Yandex te pedirá verificar que eres propietario del sitio. Tienes 3 opciones:

#### **Opción A: Meta Tag (Recomendado)**

Yandex te dará un meta tag como:
```html
<meta name="yandex-verification" content="1234567890abcdef" />
```

**Agregar a `src/index.html` (línea 10, después de `<base href="/">`):**

```html
<meta name="yandex-verification" content="1234567890abcdef" />
```

Luego click en **"Verificar"** en Yandex.

---

#### **Opción B: Archivo HTML**

Descargar archivo `yandex_1234567890abcdef.html` y subirlo a la raíz de tu servidor.

```bash
# En tu servidor
/var/www/html/yandex_1234567890abcdef.html
```

---

#### **Opción C: DNS Record**

Agregar un registro TXT en tu DNS:

```
_yandex-verification.hackeruna.com TXT "1234567890abcdef"
```

---

### **Paso 4: Confirmar Instalación del Script**

Después de verificar la propiedad, Yandex te pedirá confirmar que el script está instalado.

**Ya está instalado en tu sitio:**
```html
<!-- src/index.html líneas 93-105 -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){...})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105301804', 'ym');
  ym(105301804, 'init', {ssr:true, webvisor:true, clickmap:true, ...});
</script>
```

Click en **"Verificar instalación"** en Yandex.

---

### **Paso 5: Esperar Confirmación**

Yandex puede tardar:
- ⏱️ **5-15 minutos** - Para verificación rápida
- ⏱️ **24-48 horas** - Para verificación completa

Una vez verificado, verás: ✅ **Status: Verificado**

---

## 📊 Acceder al Dashboard

Una vez conectado, puedes acceder a:

### **URL Principal:**
```
https://metrica.yandex.com/dashboard/
```

### **Reportes Disponibles:**

1. **Dashboard Principal**
   ```
   https://metrica.yandex.com/dashboard/
   ```
   - Visitantes
   - Sesiones
   - Páginas vistas
   - Duración promedio

2. **Mapa de Calor**
   ```
   https://metrica.yandex.com/stat/heatmap/
   ```
   - Visualización de clics
   - Zonas calientes
   - Elementos más clickeados

3. **Grabación de Sesiones**
   ```
   https://metrica.yandex.com/stat/webvisor/
   ```
   - Videos de sesiones
   - Comportamiento del usuario
   - Interacciones

4. **Clickmap**
   ```
   https://metrica.yandex.com/stat/clickmap/
   ```
   - Mapa de clics en tiempo real
   - Elementos interactivos
   - Análisis de engagement

5. **Fuentes de Tráfico**
   ```
   https://metrica.yandex.com/stat/sources/
   ```
   - Google, Bing, Social Media
   - Tráfico directo
   - Referrers

6. **Conversiones**
   ```
   https://metrica.yandex.com/stat/goals/
   ```
   - Objetivos completados
   - Funnels
   - Análisis de conversión

---

## 🧪 Pruebas de Verificación

### **Test 1: Verificar Script en Producción**

```bash
# Desde terminal
curl -I https://hackeruna.com/?_ym_debug=2

# Deberías ver:
# HTTP/1.1 200 OK
# Content-Type: text/html
```

---

### **Test 2: Generar Tráfico de Prueba**

```bash
# Visitar sitio con diferentes User Agents
curl -A "Mozilla/5.0" https://hackeruna.com/
curl -A "Mozilla/5.0" https://hackeruna.com/post/algun-post
curl -A "Mozilla/5.0" https://hackeruna.com/?category=1
```

---

### **Test 3: Verificar en Consola**

```javascript
// En consola del navegador (F12)

// 1. Verificar que ym está cargado
console.log(typeof window.ym);  // Debería ser: "function"

// 2. Enviar evento personalizado
ym(105301804, 'reachGoal', 'test_goal');
console.log('Evento enviado');

// 3. Ver información del contador
console.log(window.ym);
```

---

## 🔍 Verificación Paso a Paso

### **Checklist de Instalación:**

```
☐ 1. Script agregado en src/index.html (líneas 93-105)
☐ 2. CSP actualizado para permitir mc.yandex.ru
☐ 3. DNS prefetch configurado
☐ 4. Sitio desplegado en producción
☐ 5. URL accesible: https://hackeruna.com
☐ 6. Crear cuenta en https://metrica.yandex.com/
☐ 7. Agregar sitio en Yandex
☐ 8. Verificar propiedad (meta tag, archivo, o DNS)
☐ 9. Confirmar instalación del script
☐ 10. Esperar 5-48 horas para verificación
☐ 11. Ver datos en dashboard
```

---

## 📱 URLs de Prueba Rápida

### **Para Verificar Instalación:**

```
# Debug Mode
https://hackeruna.com/?_ym_debug=2

# Status Check
https://hackeruna.com/?_ym_status-check=105301804&_ym_lang=en

# Con parámetro de prueba
https://hackeruna.com/?_ym_debug=2&utm_source=test&utm_medium=test
```

### **Para Generar Datos:**

```
# Página principal
https://hackeruna.com/

# Post específico
https://hackeruna.com/post/en-el-desarrollo-de-apps-flutter-o-la-natividad

# Con filtro de categoría
https://hackeruna.com/?category=1

# Con UTM params
https://hackeruna.com/?utm_source=google&utm_medium=organic&utm_campaign=test
```

---

## 🎯 Configuración Recomendada en Yandex

Una vez conectado, configura:

### **1. Objetivos de Conversión**

```
Objetivo: Lectura de Post
Tipo: URL
Condición: /post/*
Valor: 1
```

### **2. Filtros**

```
Excluir: Tráfico interno
IP: 127.0.0.1
```

### **3. Notificaciones**

```
Email: tu-email@hackeruna.com
Alertas: Anomalías de tráfico
```

### **4. Integración con Google Analytics**

```
Enviar datos a: Google Analytics
Parámetro: ecommerce:"dataLayer"
```

---

## 🆘 Solución de Problemas

### **Problema: No aparecen datos en Yandex**

**Soluciones:**
1. Verificar que el script esté en `index.html`
2. Verificar que el ID sea correcto: `105301804`
3. Esperar 15-30 minutos
4. Limpiar caché: Ctrl+Shift+Delete
5. Usar URL de debug: `?_ym_debug=2`
6. Verificar en consola (F12) que `ym` esté definido

---

### **Problema: "Sitio no verificado"**

**Soluciones:**
1. Agregar meta tag de verificación en `index.html`
2. Esperar 24-48 horas
3. Usar opción de DNS si es posible
4. Contactar a soporte de Yandex

---

### **Problema: CSP bloquea script**

**Verificar en index.html:**
```html
script-src ... https://mc.yandex.ru;
connect-src ... https://mc.yandex.ru https://*.yandex.ru;
```

---

## 📚 Recursos Útiles

| Recurso | URL |
|---------|-----|
| Yandex Metrika | https://metrica.yandex.com/ |
| Documentación | https://yandex.com/support/metrica/ |
| Instalación | https://yandex.com/support/metrica/general/install.html |
| API | https://yandex.com/dev/metrica/ |
| Soporte | https://yandex.com/support/ |

---

## 🚀 Próximos Pasos

### **Inmediato:**
1. ✅ Verificar instalación con `?_ym_debug=2`
2. ✅ Crear cuenta en Yandex Metrika
3. ✅ Agregar sitio
4. ✅ Verificar propiedad

### **Corto Plazo:**
1. Esperar verificación (5-48 horas)
2. Generar tráfico de prueba
3. Ver datos en dashboard
4. Configurar objetivos

### **Largo Plazo:**
1. Analizar mapa de calor
2. Optimizar UX basado en datos
3. Configurar alertas
4. Integrar con Google Analytics

---

## 📝 Resumen

| Elemento | Estado | Ubicación |
|----------|--------|-----------|
| Script Yandex | ✅ Instalado | `src/index.html:93-105` |
| CSP | ✅ Configurado | `src/index.html:50,53` |
| DNS Prefetch | ✅ Agregado | `src/index.html:69` |
| ID Yandex | ✅ 105301804 | Verificar en Yandex |
| Verificación | ⏳ Pendiente | https://metrica.yandex.com/ |

---

**Última Actualización:** 13 de Noviembre, 2025  
**Estado:** ✅ Listo para Conexión  
**Próximo Paso:** Crear cuenta en Yandex Metrika
