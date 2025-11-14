# 🔧 Fix: AdSense - "Sin autorizar" en ads.txt

**Fecha:** 14 de Noviembre, 2025  
**Problema:** ads.txt muestra "Sin autorizar"  
**Estado:** ⏳ Requiere Verificación Manual

---

## 🚨 Problema Identificado

Google AdSense muestra:
```
Estado del archivo ads.txt: Sin autorizar
```

**Causas Posibles:**
1. ❌ Sitio no verificado en AdSense
2. ❌ ads.txt no accesible públicamente
3. ❌ ID de AdSense incorrecto
4. ❌ Formato incorrecto en ads.txt
5. ❌ DNS/Servidor no actualizado

---

## ✅ Solución - Pasos a Seguir

### **Paso 1: Verificar que ads.txt es Accesible**

Abre en tu navegador:
```
https://hackeruna.com/ads.txt
```

**Debería mostrar:**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

**Si NO aparece:**
- Hacer build: `ng build`
- Desplegar a producción
- Esperar 5-10 minutos para que se propague

---

### **Paso 2: Verificar Propiedad del Sitio en AdSense**

1. Ir a: https://adsense.google.com/
2. Hacer login con tu cuenta Google
3. Ir a: **Configuración → Información del sitio**
4. Verificar que tu sitio está listado:
   ```
   https://hackeruna.com
   ```

**Si NO está listado:**
- Agregar sitio nuevo
- Seguir proceso de verificación

---

### **Paso 3: Verificar Propiedad del Dominio**

Google ofrece 3 métodos:

#### **Método 1: Meta Tag (Recomendado)**

1. En AdSense, copiar el meta tag:
   ```html
   <meta name="google-site-verification" content="..." />
   ```

2. Agregar a `src/index.html` en el `<head>`:
   ```html
   <head>
     <meta name="google-site-verification" content="tu-codigo-aqui" />
     ...
   </head>
   ```

3. Hacer build y desplegar:
   ```bash
   ng build
   # Desplegar a producción
   ```

4. En AdSense, hacer click en **"Verificar"**

#### **Método 2: Archivo HTML**

1. Descargar archivo de verificación
2. Subirlo a la raíz del sitio:
   ```
   https://hackeruna.com/google-verificacion-archivo.html
   ```
3. En AdSense, hacer click en **"Verificar"**

#### **Método 3: DNS**

1. Agregar registro TXT en tu DNS:
   ```
   Nombre: hackeruna.com
   Tipo: TXT
   Valor: google-site-verification=...
   ```
2. Esperar 24-48 horas
3. En AdSense, hacer click en **"Verificar"**

---

### **Paso 4: Confirmar Instalación del Script**

1. Ir a: https://hackeruna.com/
2. Abrir F12 → Console
3. Ejecutar:
   ```javascript
   // Buscar Google AdSense
   console.log(document.querySelector('script[src*="adsbygoogle"]'));
   // Debería mostrar: <script async src="https://pagead2.googlesyndication.com/...">
   ```

---

### **Paso 5: Esperar Verificación**

Una vez verificado:
1. Google tardará 24-48 horas en verificar ads.txt
2. El estado cambiará de "Sin autorizar" a "Se encontró"
3. Podrás empezar a mostrar anuncios

---

## 📋 Archivo ads.txt Actual

**Ubicación:** `/public/ads.txt`

**Contenido:**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

**Desglose:**
- **google.com** - Plataforma (Google)
- **ca-pub-7207443809240873** - Tu ID de AdSense
- **DIRECT** - Relación directa
- **f08c47fec0942fa0** - Token de Google

---

## 🔍 Verificación de Accesibilidad

### **Test 1: Curl**

```bash
curl https://hackeruna.com/ads.txt
```

**Resultado esperado:**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

### **Test 2: Headers HTTP**

```bash
curl -I https://hackeruna.com/ads.txt
```

**Resultado esperado:**
```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 65
```

### **Test 3: Navegador**

```
https://hackeruna.com/ads.txt
```

Debería mostrar el contenido sin errores.

---

## 🚨 Solución de Problemas

### **Problema: "No se encuentra"**

**Soluciones:**
1. Verificar que el archivo está en `/public/ads.txt`
2. Hacer build: `ng build`
3. Verificar que `dist/ng-hackeruna/ads.txt` existe
4. Desplegar a producción
5. Esperar 5-10 minutos

### **Problema: "Sin autorizar"**

**Soluciones:**
1. Verificar propiedad del sitio en AdSense
2. Agregar meta tag de verificación
3. Esperar 24-48 horas
4. Hacer click en "Verificar" en AdSense

### **Problema: ID de AdSense Incorrecto**

**Soluciones:**
1. Ir a AdSense → Configuración
2. Copiar ID correcto: `ca-pub-...`
3. Actualizar `ads.txt`
4. Hacer build y desplegar

---

## 📊 Checklist de Verificación

```
□ ads.txt creado en /public/ads.txt
□ Contenido correcto: google.com, ca-pub-..., DIRECT, ...
□ Archivo accesible en https://hackeruna.com/ads.txt
□ Build incluye el archivo: dist/ng-hackeruna/ads.txt
□ Sitio verificado en AdSense
□ Meta tag de verificación agregado (si aplica)
□ Script de AdSense en index.html
□ Esperado 24-48 horas para verificación
□ Estado cambió a "Se encontró"
```

---

## 🎯 Pasos Inmediatos

### **Hoy:**
1. ✅ Verificar que ads.txt es accesible
2. ✅ Verificar propiedad en AdSense
3. ✅ Agregar meta tag de verificación (si necesario)

### **Mañana:**
1. Esperar verificación de Google
2. Monitorear estado en AdSense
3. Confirmar que dice "Se encontró"

### **Próximos Días:**
1. Esperar 24-48 horas
2. Verificar estado en AdSense
3. Confirmar que ads.txt está autorizado

---

## 📚 Recursos

| Recurso | URL |
|---------|-----|
| Google AdSense | https://adsense.google.com/ |
| ads.txt Spec | https://iabtechlab.com/ads-txt/ |
| Verificación de Sitio | https://search.google.com/search-console |
| Soporte AdSense | https://support.google.com/adsense |

---

## 🔗 Información de Tu Sitio

| Dato | Valor |
|------|-------|
| **Dominio** | https://hackeruna.com |
| **Archivo** | /public/ads.txt |
| **ID AdSense** | ca-pub-7207443809240873 |
| **Token** | f08c47fec0942fa0 |
| **Estado Actual** | Sin autorizar |
| **Próximo Paso** | Verificar propiedad |

---

## 🎯 Resumen

**El archivo ads.txt está correctamente creado, pero necesita:**

1. ✅ Verificar propiedad del sitio en AdSense
2. ✅ Agregar meta tag de verificación (si es necesario)
3. ✅ Esperar 24-48 horas para que Google lo verifique
4. ✅ Confirmar que el estado cambia a "Se encontró"

**Una vez verificado, podrás mostrar anuncios de AdSense.** 🚀

---

**Status:** ⏳ Esperando Verificación de Google  
**Última Actualización:** 14 de Noviembre, 2025  
**Próximo Paso:** Verificar propiedad del sitio
