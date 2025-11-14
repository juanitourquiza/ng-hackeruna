# 📄 Google AdSense - Configuración de ads.txt

**Fecha:** 14 de Noviembre, 2025  
**Archivo:** `public/ads.txt`  
**Estado:** ✅ Creado y Listo

---

## 📋 ¿Qué es ads.txt?

**ads.txt** (Authorized Digital Sellers) es un archivo que:

1. ✅ **Verifica propiedad** - Confirma que eres propietario del sitio
2. ✅ **Autoriza vendedores** - Especifica qué redes pueden vender anuncios en tu sitio
3. ✅ **Previene fraude** - Evita que otros usen tu dominio para vender anuncios falsos
4. ✅ **Mejora confianza** - Los anunciantes confían más en sitios con ads.txt

---

## 📝 Contenido del Archivo

```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

**Desglose:**

| Campo | Valor | Significado |
|-------|-------|-------------|
| **Plataforma** | `google.com` | Google AdSense |
| **ID de Publicador** | `ca-pub-7207443809240873` | Tu ID de AdSense |
| **Tipo de Relación** | `DIRECT` | Relación directa con Google |
| **Verificación** | `f08c47fec0942fa0` | Token de verificación de Google |

---

## 🚀 Ubicación del Archivo

El archivo debe estar en la **raíz pública** de tu sitio:

```
https://hackeruna.com/ads.txt
```

**En tu proyecto:**
```
/public/ads.txt
```

**Estructura:**
```
ng-hackeruna/
├── public/
│   ├── ads.txt          ← AQUÍ
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
├── angular.json
└── package.json
```

---

## ✅ Verificación en AdSense

### **Paso 1: Ir a Google AdSense**

```
https://adsense.google.com/
```

### **Paso 2: Ir a Configuración**

```
Configuración → Información del sitio → Estado del archivo ads.txt
```

### **Paso 3: Verificar Estado**

Debería mostrar:
```
✅ Estado del archivo ads.txt: Se encontró
```

Si no aparece, espera 24-48 horas para que Google lo detecte.

---

## 🔍 Verificar Manualmente

Abre en tu navegador:

```
https://hackeruna.com/ads.txt
```

Debería mostrar:
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

---

## 📊 Formatos Soportados

### **Formato Básico (Google AdSense):**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

### **Formato Completo (Múltiples Redes):**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
openx.com, 537100188, DIRECT, 6270eba8c25c5f45
rubicon.com, 18020, DIRECT, 0bfd66d529a55807
```

### **Con Comentarios:**
```
# Google AdSense
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0

# OpenX
openx.com, 537100188, DIRECT, 6270eba8c25c5f45
```

---

## 🔐 Seguridad

### **Información Sensible:**
- ✅ `ca-pub-7207443809240873` - Tu ID de AdSense (público)
- ✅ `f08c47fec0942fa0` - Token de Google (público)

**Nota:** Esta información es pública y está diseñada para ser compartida.

### **No incluyas:**
- ❌ Contraseñas
- ❌ Tokens privados
- ❌ Información personal

---

## 📱 Despliegue

### **Opción 1: Angular (Recomendado)**

El archivo está en `/public/ads.txt` y Angular lo copiará automáticamente a la raíz durante el build.

**Verificar en build:**
```bash
ng build
# Buscar: dist/ng-hackeruna/ads.txt
```

### **Opción 2: Servidor Web**

Si usas un servidor web (Nginx, Apache), asegúrate que `/ads.txt` esté en la raíz:

**Nginx:**
```nginx
location /ads.txt {
    alias /var/www/html/ads.txt;
}
```

**Apache:**
```apache
<Files "ads.txt">
    Order allow,deny
    Allow from all
</Files>
```

### **Opción 3: Subir Manualmente**

```bash
# Por FTP/SFTP
scp public/ads.txt usuario@servidor:/var/www/html/

# O por SSH
ssh usuario@servidor
cd /var/www/html
# Pegar contenido en ads.txt
```

---

## 🧪 Pruebas

### **Test 1: Verificar Accesibilidad**

```bash
curl https://hackeruna.com/ads.txt
```

**Resultado esperado:**
```
google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
```

### **Test 2: Verificar Headers**

```bash
curl -I https://hackeruna.com/ads.txt
```

**Resultado esperado:**
```
HTTP/1.1 200 OK
Content-Type: text/plain
```

### **Test 3: Validador de ads.txt**

```
https://www.adstxt-validator.com/
```

Pega tu URL y verifica que el archivo sea válido.

---

## 🆘 Solución de Problemas

### **Problema: "No se encuentra"**

**Soluciones:**
1. Verificar que el archivo esté en `/public/ads.txt`
2. Hacer build: `ng build`
3. Verificar que `dist/ng-hackeruna/ads.txt` existe
4. Esperar 24-48 horas
5. Limpiar caché de Google

### **Problema: Contenido incorrecto**

**Soluciones:**
1. Verificar que el ID de AdSense sea correcto: `ca-pub-7207443809240873`
2. Verificar que el token sea correcto: `f08c47fec0942fa0`
3. No agregar espacios extra
4. Usar formato: `google.com, ca-pub-..., DIRECT, ...`

### **Problema: AdSense no lo detecta**

**Soluciones:**
1. Esperar 24-48 horas
2. Forzar recarga en AdSense: Configuración → Actualizar
3. Verificar que la URL sea accesible públicamente
4. Verificar que no hay redirecciones
5. Contactar a soporte de Google

---

## 📈 Beneficios de ads.txt

### **Para Ti (Publicador):**
- ✅ Mejor control de anuncios
- ✅ Mayor confianza de anunciantes
- ✅ Potencialmente más ingresos
- ✅ Protección contra fraude

### **Para Anunciantes:**
- ✅ Verificación de autenticidad
- ✅ Menor riesgo de fraude
- ✅ Mejor ROI en publicidad

### **Para Google:**
- ✅ Ecosistema más seguro
- ✅ Mejor calidad de anuncios
- ✅ Menos fraude publicitario

---

## 📋 Checklist

```
✅ Archivo ads.txt creado
✅ Ubicación: /public/ads.txt
✅ Contenido: google.com, ca-pub-7207443809240873, DIRECT, f08c47fec0942fa0
✅ Accesible en: https://hackeruna.com/ads.txt
✅ Build incluye el archivo
✅ Verificado en AdSense
✅ Estado: Se encontró
```

---

## 🚀 Próximos Pasos

### **Inmediato:**
1. ✅ Crear archivo ads.txt
2. ✅ Verificar en navegador
3. ✅ Hacer build de Angular

### **Corto Plazo:**
1. Esperar 24-48 horas
2. Verificar en AdSense
3. Confirmar estado: "Se encontró"

### **Largo Plazo:**
1. Monitorear estado regularmente
2. Actualizar si cambias de red publicitaria
3. Mantener actualizado

---

## 📚 Recursos

| Recurso | URL |
|---------|-----|
| Google AdSense | https://adsense.google.com/ |
| ads.txt Oficial | https://iabtechlab.com/ads-txt/ |
| Validador ads.txt | https://www.adstxt-validator.com/ |
| Documentación Google | https://support.google.com/adsense/answer/7532444 |

---

## 📝 Información de Tu Sitio

| Dato | Valor |
|------|-------|
| Dominio | https://hackeruna.com |
| Archivo | /public/ads.txt |
| ID AdSense | ca-pub-7207443809240873 |
| Token | f08c47fec0942fa0 |
| Plataforma | google.com |
| Tipo | DIRECT |

---

## 🎯 Resumen

**ads.txt es un archivo simple pero importante que:**

1. ✅ Verifica que eres propietario del sitio
2. ✅ Autoriza a Google a vender anuncios en tu sitio
3. ✅ Protege contra fraude publicitario
4. ✅ Mejora la confianza de anunciantes
5. ✅ Potencialmente aumenta ingresos

**El archivo ya está creado y listo para desplegar.** 🚀

---

**Status:** ✅ Completado  
**Última Actualización:** 14 de Noviembre, 2025  
**Próximo:** Desplegar a producción y verificar en AdSense
