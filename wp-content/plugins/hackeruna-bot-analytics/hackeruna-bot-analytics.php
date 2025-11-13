<?php
/**
 * Plugin Name: Hackeruna Bot Analytics
 * Plugin URI: https://hackeruna.com
 * Description: Detecta y registra visitas de bots de IA (ChatGPT, Perplexity, Claude) y otros crawlers
 * Version: 1.0.0
 * Author: Juan Urquiza
 * Author URI: https://hackeruna.com/about
 * License: GPL v2 or later
 * Text Domain: hackeruna-bot-analytics
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Constantes del plugin
define('HBA_VERSION', '1.0.0');
define('HBA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('HBA_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Crear tabla en la base de datos al activar el plugin
 */
register_activation_hook(__FILE__, 'hba_install');
function hba_install() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bot_visits';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        visit_date datetime NOT NULL,
        bot_name varchar(100) DEFAULT NULL,
        url text NOT NULL,
        ip_address varchar(45) DEFAULT NULL,
        user_agent text NOT NULL,
        referer text DEFAULT NULL,
        PRIMARY KEY (id),
        KEY visit_date (visit_date),
        KEY bot_name (bot_name)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    
    // Agregar versión en opciones
    add_option('hba_db_version', HBA_VERSION);
}

/**
 * Registrar visita de bot
 */
add_action('init', 'hba_log_visit', 1);
function hba_log_visit() {
    // Obtener User Agent
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    
    // Detectar si es un bot
    $bot_name = hba_detect_bot($user_agent);
    
    // Solo registrar si es un bot conocido
    if ($bot_name) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'bot_visits';
        
        $wpdb->insert(
            $table_name,
            [
                'visit_date' => current_time('mysql'),
                'bot_name' => $bot_name,
                'url' => isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '',
                'ip_address' => hba_get_client_ip(),
                'user_agent' => $user_agent,
                'referer' => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : ''
            ],
            [
                '%s', // visit_date
                '%s', // bot_name
                '%s', // url
                '%s', // ip_address
                '%s', // user_agent
                '%s'  // referer
            ]
        );
    }
}

/**
 * Detectar tipo de bot por User Agent
 */
function hba_detect_bot($user_agent) {
    if (empty($user_agent)) {
        return null;
    }
    
    // Lista de bots conocidos
    $bots = [
        'ChatGPT' => ['ChatGPT', 'GPTBot', 'OpenAI'],
        'Claude' => ['Claude', 'Anthropic', 'claude-web'],
        'Perplexity' => ['PerplexityBot'],
        'Google' => ['Googlebot', 'Google-InspectionTool', 'GoogleOther'],
        'Bing' => ['bingbot', 'BingPreview', 'msnbot'],
        'Facebook' => ['facebookexternalhit', 'facebookcatalog'],
        'Twitter' => ['Twitterbot'],
        'LinkedIn' => ['LinkedInBot'],
        'Slack' => ['Slackbot'],
        'Telegram' => ['TelegramBot'],
        'Discord' => ['Discordbot'],
        'WhatsApp' => ['WhatsApp'],
        'Apple' => ['Applebot'],
        'Yandex' => ['YandexBot'],
        'Baidu' => ['Baiduspider'],
        'DuckDuckGo' => ['DuckDuckBot'],
        'Brave' => ['brave-search-bot'],
        'Screaming Frog' => ['Screaming Frog'],
        'Semrush' => ['SemrushBot'],
        'Ahrefs' => ['AhrefsBot'],
        'Majestic' => ['MJ12bot']
    ];
    
    foreach ($bots as $bot_name => $patterns) {
        foreach ($patterns as $pattern) {
            if (stripos($user_agent, $pattern) !== false) {
                return $bot_name;
            }
        }
    }
    
    return null;
}

/**
 * Obtener IP real del cliente (considerando proxies)
 */
function hba_get_client_ip() {
    $ip_keys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];
    
    foreach ($ip_keys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                
                if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                    return $ip;
                }
            }
        }
    }
    
    return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
}

/**
 * Agregar menú en WordPress Admin
 */
add_action('admin_menu', 'hba_admin_menu');
function hba_admin_menu() {
    add_menu_page(
        'Bot Analytics',
        'Bot Analytics',
        'manage_options',
        'hackeruna-bot-analytics',
        'hba_admin_page',
        'dashicons-chart-line',
        25
    );
}

/**
 * Página de administración del plugin
 */
function hba_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bot_visits';
    
    // Obtener estadísticas por bot
    $stats = $wpdb->get_results("
        SELECT 
            bot_name,
            COUNT(*) as visits,
            MAX(visit_date) as last_visit
        FROM $table_name
        GROUP BY bot_name
        ORDER BY visits DESC
    ");
    
    // Obtener visitas recientes
    $recent_visits = $wpdb->get_results("
        SELECT *
        FROM $table_name
        ORDER BY visit_date DESC
        LIMIT 100
    ");
    
    // Total de visitas
    $total_visits = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    
    // Visitas últimas 24 horas
    $visits_24h = $wpdb->get_var("
        SELECT COUNT(*) 
        FROM $table_name 
        WHERE visit_date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ");
    
    // Visitas últimos 7 días
    $visits_7d = $wpdb->get_var("
        SELECT COUNT(*) 
        FROM $table_name 
        WHERE visit_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ");
    
    // Visitas últimos 30 días
    $visits_30d = $wpdb->get_var("
        SELECT COUNT(*) 
        FROM $table_name 
        WHERE visit_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    ?>
    <div class="wrap">
        <h1>🤖 Bot Analytics</h1>
        <p>Monitoreo de visitas de bots de IA, crawlers y otros agentes automatizados.</p>
        
        <!-- Tarjetas de estadísticas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 500;">Total de Visitas</h3>
                <p style="font-size: 36px; margin: 0; color: #2271b1; font-weight: bold;">
                    <?php echo number_format($total_visits); ?>
                </p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 500;">Últimas 24 Horas</h3>
                <p style="font-size: 36px; margin: 0; color: #00a32a; font-weight: bold;">
                    <?php echo number_format($visits_24h); ?>
                </p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 500;">Últimos 7 Días</h3>
                <p style="font-size: 36px; margin: 0; color: #f0b849; font-weight: bold;">
                    <?php echo number_format($visits_7d); ?>
                </p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 500;">Últimos 30 Días</h3>
                <p style="font-size: 36px; margin: 0; color: #d63638; font-weight: bold;">
                    <?php echo number_format($visits_30d); ?>
                </p>
            </div>
        </div>
        
        <!-- Estadísticas por Bot -->
        <h2>📊 Estadísticas por Bot</h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th style="width: 30%">Bot</th>
                    <th style="width: 20%">Total de Visitas</th>
                    <th style="width: 50%">Última Visita</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($stats)): ?>
                <tr>
                    <td colspan="3" style="text-align: center; padding: 40px;">
                        <p style="margin: 0; color: #666;">
                            <span style="font-size: 48px;">🤖</span><br><br>
                            <strong>No hay visitas de bots registradas todavía.</strong><br>
                            Espera a que los bots de IA y crawlers descubran tu sitio.
                        </p>
                    </td>
                </tr>
                <?php else: ?>
                <?php foreach ($stats as $stat): ?>
                <tr>
                    <td>
                        <strong><?php echo esc_html($stat->bot_name); ?></strong>
                        <?php 
                        // Agregar emoji según el bot
                        $emoji = '';
                        switch($stat->bot_name) {
                            case 'ChatGPT': $emoji = '🤖'; break;
                            case 'Claude': $emoji = '🧠'; break;
                            case 'Perplexity': $emoji = '🔍'; break;
                            case 'Google': $emoji = '🔎'; break;
                            case 'Facebook': $emoji = '📘'; break;
                            case 'Twitter': $emoji = '🐦'; break;
                            default: $emoji = '🤖';
                        }
                        echo ' ' . $emoji;
                        ?>
                    </td>
                    <td>
                        <span style="font-size: 18px; font-weight: bold; color: #2271b1;">
                            <?php echo number_format($stat->visits); ?>
                        </span>
                    </td>
                    <td>
                        <?php echo esc_html($stat->last_visit); ?>
                        <span style="color: #666; font-size: 12px;">
                            (<?php echo human_time_diff(strtotime($stat->last_visit), current_time('timestamp')); ?> ago)
                        </span>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
        
        <!-- Visitas Recientes -->
        <h2 style="margin-top: 40px;">🕒 Visitas Recientes (últimas 100)</h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th style="width: 15%">Fecha</th>
                    <th style="width: 12%">Bot</th>
                    <th style="width: 35%">URL Visitada</th>
                    <th style="width: 12%">IP Address</th>
                    <th style="width: 26%">Referer</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($recent_visits)): ?>
                <tr>
                    <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                        No hay visitas recientes registradas.
                    </td>
                </tr>
                <?php else: ?>
                <?php foreach ($recent_visits as $visit): ?>
                <tr>
                    <td>
                        <strong><?php echo esc_html(date('Y-m-d', strtotime($visit->visit_date))); ?></strong><br>
                        <span style="color: #666; font-size: 12px;">
                            <?php echo esc_html(date('H:i:s', strtotime($visit->visit_date))); ?>
                        </span>
                    </td>
                    <td>
                        <strong><?php echo esc_html($visit->bot_name); ?></strong>
                    </td>
                    <td>
                        <code style="font-size: 11px; background: #f0f0f1; padding: 2px 6px; border-radius: 3px; display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <?php echo esc_html($visit->url); ?>
                        </code>
                    </td>
                    <td>
                        <code style="font-size: 11px;">
                            <?php echo esc_html($visit->ip_address); ?>
                        </code>
                    </td>
                    <td>
                        <?php if (!empty($visit->referer)): ?>
                        <code style="font-size: 10px; background: #f0f0f1; padding: 2px 6px; border-radius: 3px; display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <?php echo esc_html(substr($visit->referer, 0, 40)) . (strlen($visit->referer) > 40 ? '...' : ''); ?>
                        </code>
                        <?php else: ?>
                        <em style="color: #999;">-</em>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
        
        <!-- User Agents Detectados -->
        <div style="margin-top: 40px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3>ℹ️ User Agents Detectados</h3>
            <p style="color: #666; margin-bottom: 15px;">
                Este plugin detecta automáticamente los siguientes bots y crawlers:
            </p>
            <ul style="columns: 2; -webkit-columns: 2; -moz-columns: 2; list-style: none; padding: 0;">
                <li style="margin-bottom: 8px;">🤖 <strong>ChatGPT</strong> - GPTBot, OpenAI</li>
                <li style="margin-bottom: 8px;">🧠 <strong>Claude</strong> - Anthropic, claude-web</li>
                <li style="margin-bottom: 8px;">🔍 <strong>Perplexity</strong> - PerplexityBot</li>
                <li style="margin-bottom: 8px;">🔎 <strong>Google</strong> - Googlebot</li>
                <li style="margin-bottom: 8px;">🌐 <strong>Bing</strong> - bingbot</li>
                <li style="margin-bottom: 8px;">📘 <strong>Facebook</strong> - facebookexternalhit</li>
                <li style="margin-bottom: 8px;">🐦 <strong>Twitter</strong> - Twitterbot</li>
                <li style="margin-bottom: 8px;">💼 <strong>LinkedIn</strong> - LinkedInBot</li>
                <li style="margin-bottom: 8px;">🦆 <strong>DuckDuckGo</strong> - DuckDuckBot</li>
                <li style="margin-bottom: 8px;">🦁 <strong>Brave</strong> - brave-search-bot</li>
                <li style="margin-bottom: 8px;">🔗 <strong>Slack</strong> - Slackbot</li>
                <li style="margin-bottom: 8px;">📱 <strong>WhatsApp</strong> - WhatsApp</li>
                <li style="margin-bottom: 8px;">🔧 <strong>Semrush</strong> - SemrushBot</li>
                <li style="margin-bottom: 8px;">🔗 <strong>Ahrefs</strong> - AhrefsBot</li>
            </ul>
        </div>
        
        <!-- Footer con info del plugin -->
        <div style="margin-top: 30px; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 12px;">
                <strong>Hackeruna Bot Analytics v<?php echo HBA_VERSION; ?></strong> | 
                Desarrollado por <a href="https://hackeruna.com/about" target="_blank">Juan Urquiza</a> | 
                <a href="https://hackeruna.com" target="_blank">Hackeruna.com</a>
            </p>
        </div>
    </div>
    
    <style>
        .wrap h2 {
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 20px;
            font-weight: 600;
        }
        .wp-list-table th {
            font-weight: 600;
            background: #f8f9fa;
        }
        .wp-list-table td {
            vertical-align: middle;
        }
    </style>
    <?php
}

/**
 * Hook de desactivación
 */
register_deactivation_hook(__FILE__, 'hba_deactivate');
function hba_deactivate() {
    // Opcionalmente limpiar opciones o scheduled events
    // NO eliminamos la tabla para preservar los datos
}
