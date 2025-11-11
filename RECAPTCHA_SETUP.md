# Configuración de reCAPTCHA v3 para Hackeruna

## 🔒 Seguridad - Credenciales Sensibles

Este proyecto es **opensource**. Las credenciales de reCAPTCHA NO deben ser commiteadas al repositorio.

### Archivos que NO deben ser commiteados:
- `.env` (archivo de configuración local)
- `wp-config.php` (si contiene credenciales)

### Archivos que SÍ están en .gitignore:
- `.env`
- `.env.local`

## 📋 Pasos de Configuración

### 1. Obtener Credenciales de reCAPTCHA v3

1. Ve a https://www.google.com/recaptcha/admin
2. Haz clic en "+" para crear un nuevo sitio
3. Completa el formulario:
   - **Nombre del sitio:** Hackeruna
   - **Tipo de reCAPTCHA:** reCAPTCHA v3
   - **Dominios:** 
     - `localhost` (desarrollo)
     - `hackeruna.com` (producción)
4. Acepta los términos y haz clic en "Crear"
5. Copia las claves:
   - **Site Key:** `6LfO4gYUAAAAAPZhUTm6ko6SrP7hSXh9LGDaqp1v`
   - **Secret Key:** `6LfO4gYUAAAADvXE7Gd5LqfLyrOe8huyO6J3`

### 2. Configurar en Angular (Frontend)

La **Site Key** ya está en `/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  wordpressApiUrl: 'https://hackeruna.com/wp-json/wp/v2',
  recaptchaV3SiteKey: '6LfO4gYUAAAAAPZhUTm6ko6SrP7hSXh9LGDaqp1v'
};
```

**Nota:** La Site Key es pública y puede estar en el código.

### 3. Configurar en WordPress (Backend)

La **Secret Key** debe estar en variables de entorno, NO en el código.

#### Opción A: Usando wp-config.php (Recomendado)

Agrega esto a tu `wp-config.php`:

```php
// reCAPTCHA v3 Secret Key
putenv( 'RECAPTCHA_SECRET_KEY=6LfO4gYUAAAADvXE7Gd5LqfLyrOe8huyO6J3' );
```

#### Opción B: Usando archivo .env (Si usas plugin como WP Dotenv)

Crea un archivo `.env` en la raíz de WordPress:

```
RECAPTCHA_SECRET_KEY=6LfO4gYUAAAADvXE7Gd5LqfLyrOe8huyO6J3
```

Luego en `wp-config.php`:

```php
if ( file_exists( dirname( __FILE__ ) . '/.env' ) ) {
    $dotenv = new Dotenv\Dotenv( dirname( __FILE__ ) );
    $dotenv->load();
}
```

#### Opción C: Usando variables de entorno del servidor

En tu servidor (Apache, Nginx, etc.), configura:

```bash
export RECAPTCHA_SECRET_KEY=6LfO4gYUAAAADvXE7Gd5LqfLyrOe8huyO6J3
```

## 🔐 Seguridad en Producción

### Para el repositorio público:

1. **NO commits las credenciales:**
   ```bash
   git add .env.example
   git add RECAPTCHA_SETUP.md
   # NO: git add .env
   # NO: git add wp-config.php (si contiene credenciales)
   ```

2. **Usa `.gitignore`:**
   ```
   .env
   .env.local
   wp-config.php
   ```

3. **Documenta en `.env.example`:**
   ```
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

### Para el servidor de producción:

1. Configura las variables de entorno directamente en el servidor
2. NO uses archivos `.env` en producción
3. Usa las variables de entorno del sistema operativo

## ✅ Validaciones Implementadas

### Frontend (Angular):
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Validación de longitud mínima
- ✅ reCAPTCHA v3 automático (sin interacción del usuario)

### Backend (WordPress):
- ✅ Validación de campos requeridos
- ✅ Validación de email
- ✅ Validación de longitud mínima (nombre: 2 caracteres, mensaje: 10 caracteres)
- ✅ Verificación de reCAPTCHA v3 (score > 0.5)
- ✅ Sanitización de datos

## 🧪 Pruebas

### Desarrollo (sin reCAPTCHA):
Si `RECAPTCHA_SECRET_KEY` no está configurada, el formulario funcionará sin validación de reCAPTCHA (solo para desarrollo).

### Producción (con reCAPTCHA):
Asegúrate de que `RECAPTCHA_SECRET_KEY` esté configurada en el servidor.

## 📞 Soporte

Para más información sobre reCAPTCHA v3:
- https://developers.google.com/recaptcha/docs/v3
- https://developers.google.com/recaptcha/docs/verify

## 🚀 Resumen de Archivos

| Archivo | Contiene | Debe commitear |
|---------|----------|----------------|
| `.env.example` | Template de variables | ✅ Sí |
| `.env` | Variables locales | ❌ No |
| `src/environments/environment.ts` | Site Key (pública) | ✅ Sí |
| `wp-config.php` | Secret Key (privada) | ❌ No |
| `RECAPTCHA_SETUP.md` | Esta documentación | ✅ Sí |
