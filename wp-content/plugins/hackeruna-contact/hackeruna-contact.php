<?php
/**
 * Plugin Name: Hackeruna Contact Form
 * Description: Endpoint personalizado para formulario de contacto
 * Version: 1.0
 * Author: Hackeruna
 */

// Registrar endpoint REST API personalizado
add_action( 'rest_api_init', function() {
    register_rest_route( 'hackeruna/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'hackeruna_send_contact_form',
        'permission_callback' => '__return_true'
    ) );
} );

/**
 * Callback para enviar el formulario de contacto
 */
function hackeruna_send_contact_form( $request ) {
    $params = $request->get_json_params();
    
    // Validar que existan los parámetros
    if ( ! isset( $params['name'], $params['email'], $params['subject'], $params['message'], $params['recaptchaToken'] ) ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'Faltan campos requeridos'
        ), 400 );
    }
    
    // Sanitizar datos
    $name = sanitize_text_field( $params['name'] );
    $email = sanitize_email( $params['email'] );
    $subject = sanitize_text_field( $params['subject'] );
    $message = sanitize_textarea_field( $params['message'] );
    $recaptcha_token = sanitize_text_field( $params['recaptchaToken'] );
    
    // Validar que los campos no estén vacíos
    if ( empty( $name ) || empty( $email ) || empty( $subject ) || empty( $message ) ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'Todos los campos son requeridos'
        ), 400 );
    }
    
    // Validar email
    if ( ! is_email( $email ) ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'El email no es válido'
        ), 400 );
    }
    
    // Validar longitud mínima del nombre
    if ( strlen( $name ) < 2 ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'El nombre debe tener al menos 2 caracteres'
        ), 400 );
    }
    
    // Validar longitud mínima del mensaje
    if ( strlen( $message ) < 10 ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'El mensaje debe tener al menos 10 caracteres'
        ), 400 );
    }
    
    // Verificar reCAPTCHA v3
    $recaptcha_secret = getenv( 'RECAPTCHA_SECRET_KEY' );
    if ( ! $recaptcha_secret ) {
        // Si no hay secret key configurada, registrar error pero continuar (para desarrollo)
        error_log( 'RECAPTCHA_SECRET_KEY no está configurada' );
    } else {
        $recaptcha_response = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', array(
            'body' => array(
                'secret' => $recaptcha_secret,
                'response' => $recaptcha_token
            )
        ) );
        
        if ( is_wp_error( $recaptcha_response ) ) {
            return new WP_REST_Response( array(
                'status' => 'error',
                'message' => 'Error al verificar reCAPTCHA'
            ), 500 );
        }
        
        $recaptcha_body = json_decode( wp_remote_retrieve_body( $recaptcha_response ) );
        
        // Validar que el score sea mayor a 0.5 (reCAPTCHA v3)
        if ( ! isset( $recaptcha_body->success ) || ! $recaptcha_body->success || $recaptcha_body->score < 0.5 ) {
            return new WP_REST_Response( array(
                'status' => 'error',
                'message' => 'Verificación de reCAPTCHA fallida. Por favor intenta nuevamente.'
            ), 403 );
        }
    }
    
    // Preparar email
    $to = 'j@hackeruna.com';
    $email_subject = 'Nuevo mensaje de contacto: ' . $subject;
    $headers = array( 'Content-Type: text/html; charset=UTF-8' );
    
    // Construir cuerpo del email
    $body = "
    <html>
        <body>
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Asunto:</strong> {$subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>{$message}</p>
        </body>
    </html>
    ";
    
    // Enviar email usando WP Mail SMTP
    // Verificar si WP Mail SMTP está activado
    if ( function_exists( 'wp_mail_smtp' ) ) {
        $result = wp_mail( $to, $email_subject, $body, $headers );
    } else {
        // Fallback a wp_mail si WP Mail SMTP no está disponible
        $result = wp_mail( $to, $email_subject, $body, $headers );
    }
    
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
