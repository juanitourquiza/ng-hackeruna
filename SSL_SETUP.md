# 🔒 Configuración SSL/HTTPS para Hackeruna

## Problema
El navegador muestra "Not Secure" porque el sitio no tiene certificado SSL configurado.

## ✅ Solución para Cloudways

### Paso 1: Instalar Certificado SSL en Cloudways

1. **Acceder al Panel de Cloudways**
   - Ve a https://platform.cloudways.com
   - Inicia sesión

2. **Seleccionar tu Aplicación**
   - Servers → Selecciona tu servidor
   - Applications → `wordpress-1212383-4299996`

3. **Instalar Let's Encrypt SSL (GRATIS)**
   - En el menú izquierdo, selecciona **"SSL Certificate"**
   - Introduce tu dominio: `hackeruna.com`
   - Marca la casilla **"Add www also"** si quieres incluir `www.hackeruna.com`
   - Click en **"Install Certificate"**
   - Espera 2-5 minutos

4. **Verificar Instalación**
   - Verás un mensaje: "SSL certificate installed successfully"
   - El certificado se renovará automáticamente cada 90 días

### Paso 2: Configurar el Dominio

Si aún no has apuntado tu dominio a Cloudways:

1. **En Cloudways:**
   - Ve a **Domain Management**
   - Agrega `hackeruna.com` como dominio principal

2. **En tu Proveedor de DNS (GoDaddy, Namecheap, etc.):**
   - Agrega un registro A:
     ```
     Type: A
     Host: @
     Value: [IP de tu servidor Cloudways]
     TTL: 3600
     ```
   
   - Agrega un registro CNAME para www:
     ```
     Type: CNAME
     Host: www
     Value: hackeruna.com
     TTL: 3600
     ```

3. **Espera la propagación DNS** (puede tomar 24-48 horas)

### Paso 3: Forzar HTTPS en WordPress

1. **Acceder al WordPress Admin**
   - Ve a `https://hackeruna.com/wp-admin`

2. **Actualizar URLs**
   - Settings → General
   - WordPress Address (URL): `https://hackeruna.com`
   - Site Address (URL): `https://hackeruna.com`
   - Click **Save Changes**

3. **Configurar wp-config.php** (Opcional pero recomendado)
   
   Agrega estas líneas en `wp-config.php`:
   ```php
   define('FORCE_SSL_ADMIN', true);
   if (strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false)
       $_SERVER['HTTPS']='on';
   ```

### Paso 4: Redirigir HTTP a HTTPS

Cloudways automáticamente redirige HTTP → HTTPS después de instalar el SSL.

Si no funciona, agrega en `.htaccess`:

```apache
# Forzar HTTPS
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## 🔧 Opción Alternativa: Cloudflare (SSL Gratis + CDN)

Si no quieres usar Cloudways SSL, usa Cloudflare:

1. **Crear cuenta en Cloudflare**
   - Ve a https://dash.cloudflare.com/sign-up

2. **Agregar tu sitio**
   - Click en "Add a Site"
   - Introduce `hackeruna.com`

3. **Cambiar Nameservers**
   - Cloudflare te dará 2 nameservers
   - Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.)
   - Cambia los nameservers por los de Cloudflare

4. **Configurar SSL en Cloudflare**
   - SSL/TLS → Overview
   - Selecciona **"Full (strict)"**
   - Espera 24 horas para activación completa

5. **Habilitar "Always Use HTTPS"**
   - SSL/TLS → Edge Certificates
   - Activa **"Always Use HTTPS"**

---

## ✅ Verificar que Funciona

1. **Visita tu sitio:**
   ```
   https://hackeruna.com
   ```

2. **Verifica el candado verde** en la barra de direcciones

3. **Prueba la redirección:**
   ```
   http://hackeruna.com (debe redirigir a https://)
   ```

4. **Verifica el certificado:**
   - Click en el candado → "Connection is secure"
   - Debe mostrar: "Valid certificate"

---

## 🚨 Problemas Comunes

### Error: "Mixed Content"

Si ves advertencias de contenido mixto después de habilitar SSL:

1. **Instalar Plugin Really Simple SSL**
   ```
   WordPress Admin → Plugins → Add New
   Buscar "Really Simple SSL"
   Instalar y Activar
   ```

2. **O actualizar manualmente URLs en la base de datos:**
   ```sql
   UPDATE wp_options 
   SET option_value = replace(option_value, 'http://hackeruna.com', 'https://hackeruna.com') 
   WHERE option_name = 'home' OR option_name = 'siteurl';
   
   UPDATE wp_posts 
   SET post_content = replace(post_content, 'http://hackeruna.com', 'https://hackeruna.com');
   
   UPDATE wp_postmeta 
   SET meta_value = replace(meta_value,'http://hackeruna.com','https://hackeruna.com');
   ```

### Error: "Too Many Redirects"

Si entras en un loop de redirección:

1. Elimina el código de `.htaccess`
2. Usa solo la configuración de Cloudways
3. O usa el plugin Really Simple SSL

---

## 📊 Resultado Esperado

Después de seguir estos pasos:

- ✅ **Candado verde** en el navegador
- ✅ **HTTPS** habilitado
- ✅ **Redirección automática** de HTTP a HTTPS
- ✅ **Certificado válido** de Let's Encrypt (renovación automática)
- ✅ **Mejor SEO** (Google prioriza sitios HTTPS)
- ✅ **Mayor confianza** de los usuarios

---

**Tiempo estimado:** 30 minutos - 2 horas (dependiendo de propagación DNS)

**Costo:** $0 (Let's Encrypt es gratuito)
