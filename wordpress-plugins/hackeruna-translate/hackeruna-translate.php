<?php
/**
 * Plugin Name: Hackeruna Translate
 * Plugin URI: https://github.com/juanitourquiza/ng-hackeruna
 * Description: AI-powered translation for blog posts using OpenAI GPT-4o-mini with caching
 * Version: 1.0.0
 * Author: Juan Urquiza
 * Author URI: https://hackeruna.com
 * License: MIT
 * Text Domain: hackeruna-translate
 */

if (!defined('ABSPATH')) {
    exit;
}

define('HACKERUNA_TRANSLATE_VERSION', '1.0.0');
define('HACKERUNA_TRANSLATE_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Include required files
require_once HACKERUNA_TRANSLATE_PLUGIN_DIR . 'includes/class-database.php';
require_once HACKERUNA_TRANSLATE_PLUGIN_DIR . 'includes/class-openai-client.php';
require_once HACKERUNA_TRANSLATE_PLUGIN_DIR . 'includes/class-translator.php';
require_once HACKERUNA_TRANSLATE_PLUGIN_DIR . 'includes/class-rest-api.php';

/**
 * Activation hook - create database table
 */
function hackeruna_translate_activate() {
    Hackeruna_Translate_Database::create_table();
}
register_activation_hook(__FILE__, 'hackeruna_translate_activate');

/**
 * Initialize the plugin
 */
function hackeruna_translate_init() {
    // Register REST API endpoints
    $rest_api = new Hackeruna_Translate_REST_API();
    $rest_api->register_routes();
}
add_action('rest_api_init', 'hackeruna_translate_init');

/**
 * Add admin menu
 */
function hackeruna_translate_admin_menu() {
    add_options_page(
        'Hackeruna Translate',
        'Hackeruna Translate',
        'manage_options',
        'hackeruna-translate',
        'hackeruna_translate_admin_page'
    );
}
add_action('admin_menu', 'hackeruna_translate_admin_menu');

/**
 * Admin page callback
 */
function hackeruna_translate_admin_page() {
    // Check permissions
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Save settings
    if (isset($_POST['hackeruna_translate_save']) && check_admin_referer('hackeruna_translate_settings')) {
        update_option('hackeruna_openai_api_key', sanitize_text_field($_POST['openai_api_key']));
        update_option('hackeruna_openai_model', sanitize_text_field($_POST['openai_model']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $api_key = get_option('hackeruna_openai_api_key', '');
    $model = get_option('hackeruna_openai_model', 'gpt-4o-mini');
    
    // Get translation stats
    global $wpdb;
    $table_name = $wpdb->prefix . 'post_translations';
    $stats = $wpdb->get_row("SELECT COUNT(*) as total, SUM(tokens_used) as tokens, SUM(cost_usd) as cost FROM $table_name");
    
    ?>
    <div class="wrap">
        <h1>Hackeruna Translate</h1>
        
        <div class="card" style="max-width: 600px; padding: 20px; margin-bottom: 20px;">
            <h2>📊 Translation Statistics</h2>
            <p><strong>Total Translations:</strong> <?php echo $stats->total ?? 0; ?></p>
            <p><strong>Tokens Used:</strong> <?php echo number_format($stats->tokens ?? 0); ?></p>
            <p><strong>Estimated Cost:</strong> $<?php echo number_format($stats->cost ?? 0, 4); ?></p>
        </div>
        
        <form method="post" action="">
            <?php wp_nonce_field('hackeruna_translate_settings'); ?>
            
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="openai_api_key">OpenAI API Key</label>
                    </th>
                    <td>
                        <input type="password" 
                               name="openai_api_key" 
                               id="openai_api_key" 
                               value="<?php echo esc_attr($api_key); ?>" 
                               class="regular-text"
                        />
                        <p class="description">Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Dashboard</a></p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="openai_model">Model</label>
                    </th>
                    <td>
                        <select name="openai_model" id="openai_model">
                            <option value="gpt-4o-mini" <?php selected($model, 'gpt-4o-mini'); ?>>GPT-4o-mini (Recommended - $0.15/1M input)</option>
                            <option value="gpt-4o" <?php selected($model, 'gpt-4o'); ?>>GPT-4o (Premium - $2.50/1M input)</option>
                            <option value="gpt-3.5-turbo" <?php selected($model, 'gpt-3.5-turbo'); ?>>GPT-3.5-turbo (Legacy - $0.50/1M input)</option>
                        </select>
                    </td>
                </tr>
            </table>
            
            <p class="submit">
                <input type="submit" name="hackeruna_translate_save" class="button-primary" value="Save Settings" />
            </p>
        </form>
        
        <hr />
        
        <h2>📖 API Usage</h2>
        <p>Use the following endpoint to get translated posts:</p>
        <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0;">
            GET /wp-json/hackeruna/v1/post/{post_id}/translate/{lang}
        </code>
        
        <h3>Example:</h3>
        <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0;">
            GET /wp-json/hackeruna/v1/post/123/translate/en
        </code>
        
        <h3>Response:</h3>
        <pre style="background: #f0f0f0; padding: 10px;">
{
    "id": 123,
    "title": "Translated Title",
    "content": "Translated content...",
    "excerpt": "Translated excerpt...",
    "slug": "translated-slug",
    "cached": true,
    "translated_at": "2025-01-07 12:00:00",
    "model_used": "gpt-4o-mini"
}
        </pre>
    </div>
    <?php
}
