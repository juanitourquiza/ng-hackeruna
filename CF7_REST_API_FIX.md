# Solución: Contact Form 7 REST API 403 Forbidden

## Problema
```json
{
  "code": "wpcf7_forbidden",
  "message": "You are not allowed to access contact forms.",
  "data": { "status": 403 }
}
```

## Causa
Contact Form 7 requiere que el usuario esté autenticado para acceder a la API REST por defecto.

## Solución (IMPORTANTE)

Agrega este código a tu archivo `functions.php` de WordPress. Este código es más efectivo:

```php
<?php
// Permitir acceso anónimo a Contact Form 7 REST API
add_filter( 'wpcf7_rest_api_enabled', '__return_true' );

// Permitir acceso sin autenticación al endpoint feedback
add_filter( 'rest_authentication_errors', function( $result ) {
    // Permitir acceso anónimo a Contact Form 7
    if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/wp-json/contact-form-7/' ) !== false ) {
        return true;
    }
    
    return $result;
} );

// Registrar el endpoint con permisos públicos
add_action( 'rest_api_init', function() {
    add_filter( 'rest_endpoints', function( $endpoints ) {
        foreach ( $endpoints as $route => $handlers ) {
            if ( strpos( $route, 'contact-form-7' ) !== false ) {
                if ( is_array( $handlers ) ) {
                    foreach ( $handlers as &$handler ) {
                        if ( is_array( $handler ) && isset( $handler['permission_callback'] ) ) {
                            $handler['permission_callback'] = '__return_true';
                        }
                    }
                }
            }
        }
        return $endpoints;
    } );
} );
?>
```

## Ubicación del archivo
- **Tema personalizado:** `/wp-content/themes/tu-tema/functions.php`
- **Plugin personalizado:** Crear un plugin en `/wp-content/plugins/`

## Pasos

1. Accede a tu WordPress via FTP o File Manager
2. Navega a `/wp-content/themes/tu-tema/` (o crea un plugin)
3. Abre `functions.php`
4. Agrega el código anterior al final del archivo
5. Guarda los cambios

## Verificación

Después de agregar el código, prueba la URL:
```
POST https://hackeruna.com/wp-json/contact-form-7/v1/contact-forms/bc468f0/feedback
```

Con los datos:
```
your-name=Juan
your-email=j@hackeruna.com
your-subject=Asunto
your-message=Mensaje
```

## Respuesta esperada
```json
{
  "into": "#",
  "status": "mail_sent",
  "message": "Thank you for your message. It has been sent."
}
```

## Alternativa: Usar un endpoint personalizado

Si prefieres no modificar WordPress, puedes crear un endpoint personalizado en PHP:

```php
<?php
// En tu archivo send-email.php o functions.php
add_action( 'rest_api_init', function() {
    register_rest_route( 'hackeruna/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'hackeruna_send_contact_form',
        'permission_callback' => '__return_true'
    ) );
} );

function hackeruna_send_contact_form( $request ) {
    $params = $request->get_json_params();
    
    $name = sanitize_text_field( $params['name'] );
    $email = sanitize_email( $params['email'] );
    $subject = sanitize_text_field( $params['subject'] );
    $message = sanitize_textarea_field( $params['message'] );
    
    $to = 'j@hackeruna.com';
    $headers = array( 'Content-Type: text/html; charset=UTF-8' );
    
    $result = wp_mail( $to, $subject, $message, $headers );
    
    if ( $result ) {
        return new WP_REST_Response( array(
            'status' => 'mail_sent',
            'message' => 'Mensaje enviado correctamente'
        ), 200 );
    } else {
        return new WP_REST_Response( array(
            'status' => 'mail_failed',
            'message' => 'Error al enviar el mensaje'
        ), 500 );
    }
}
?>
```

Luego actualiza el endpoint en Angular:
```typescript
private CF7_ENDPOINT = 'https://hackeruna.com/wp-json/hackeruna/v1/contact';
```
