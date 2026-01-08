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
function hackeruna_translate_activate()
{
    Hackeruna_Translate_Database::create_table();
}
register_activation_hook(__FILE__, 'hackeruna_translate_activate');

/**
 * Add CORS headers for translation API
 * This runs early to handle preflight OPTIONS requests
 */
function hackeruna_translate_cors_headers()
{
    // Only add headers for REST API requests to our endpoints
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/hackeruna/v1/') !== false) {
        // Allow requests from any origin (you can restrict this to specific domains)
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours

        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit();
        }
    }
}
add_action('init', 'hackeruna_translate_cors_headers', 1);

/**
 * Also add CORS headers via REST API filter
 */
function hackeruna_translate_rest_cors($response)
{
    if ($response instanceof WP_REST_Response) {
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
    return $response;
}
add_filter('rest_post_dispatch', 'hackeruna_translate_rest_cors');

/**
 * Initialize the plugin
 */
function hackeruna_translate_init()
{
    // Register REST API endpoints
    $rest_api = new Hackeruna_Translate_REST_API();
    $rest_api->register_routes();
}
add_action('rest_api_init', 'hackeruna_translate_init');

/**
 * Add admin menu
 */
function hackeruna_translate_admin_menu()
{
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
function hackeruna_translate_admin_page()
{
    // Check permissions
    if (!current_user_can('manage_options')) {
        return;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'post_translations';

    // Handle delete translation
    if (isset($_GET['delete_translation']) && isset($_GET['lang']) && check_admin_referer('delete_translation_' . $_GET['delete_translation'])) {
        $post_id = intval($_GET['delete_translation']);
        $lang = sanitize_text_field($_GET['lang']);
        $wpdb->delete($table_name, ['post_id' => $post_id, 'language' => $lang]);
        echo '<div class="notice notice-success"><p>Translation deleted successfully!</p></div>';
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
    $stats = $wpdb->get_row("SELECT COUNT(*) as total, SUM(tokens_used) as tokens, SUM(cost_usd) as cost FROM $table_name");

    // Get total published posts
    $total_posts = wp_count_posts()->publish;

    // Get translated post count (for English)
    $translated_en = $wpdb->get_var("SELECT COUNT(DISTINCT post_id) FROM $table_name WHERE language = 'en'");
    $pending_translation = $total_posts - $translated_en;

    // Get existing translations
    $translations = $wpdb->get_results("
        SELECT t.*, p.post_title as original_title 
        FROM $table_name t 
        LEFT JOIN {$wpdb->posts} p ON t.post_id = p.ID 
        ORDER BY t.translated_at DESC 
        LIMIT 50
    ");

?>
    <div class="wrap">
        <h1>🌐 Hackeruna Translate</h1>

        <!-- Stats Cards -->
        <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
            <div class="card" style="flex: 1; min-width: 200px; padding: 20px;">
                <h3 style="margin-top: 0;">📊 Statistics</h3>
                <p><strong>Total Translations:</strong> <?php echo $stats->total ?? 0; ?></p>
                <p><strong>Tokens Used:</strong> <?php echo number_format($stats->tokens ?? 0); ?></p>
                <p><strong>Estimated Cost:</strong> $<?php echo number_format($stats->cost ?? 0, 4); ?></p>
            </div>

            <div class="card" style="flex: 1; min-width: 200px; padding: 20px;">
                <h3 style="margin-top: 0;">📝 Translation Status (English)</h3>
                <p><strong>Total Posts:</strong> <?php echo $total_posts; ?></p>
                <p><strong>Translated:</strong> <span style="color: green;"><?php echo $translated_en; ?></span></p>
                <p><strong>Pending:</strong> <span style="color: <?php echo $pending_translation > 0 ? 'orange' : 'green'; ?>"><?php echo $pending_translation; ?></span></p>
                <?php if ($pending_translation > 0): ?>
                    <p style="font-size: 12px; color: #666;">Translations are generated on-demand when users visit the English version.</p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Settings Form -->
        <div class="card" style="max-width: 600px; padding: 20px; margin-bottom: 20px;">
            <h2>⚙️ API Settings</h2>
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
                                class="regular-text" />
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
        </div>

        <!-- Translations List -->
        <div class="card" style="padding: 20px; margin-bottom: 20px;">
            <h2>� Existing Translations</h2>
            <p class="description">Delete a translation to regenerate it on next visit. Translations are cached and won't cost tokens if they already exist.</p>

            <?php if (empty($translations)): ?>
                <p>No translations yet. Translations are generated when users visit posts in English.</p>
            <?php else: ?>
                <table class="wp-list-table widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="width: 40%;">Original Title</th>
                            <th style="width: 15%;">Language</th>
                            <th style="width: 15%;">Tokens</th>
                            <th style="width: 15%;">Cost</th>
                            <th style="width: 20%;">Date</th>
                            <th style="width: 10%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($translations as $translation): ?>
                            <tr>
                                <td>
                                    <a href="<?php echo get_permalink($translation->post_id); ?>" target="_blank">
                                        <?php echo esc_html($translation->original_title ?: 'Post #' . $translation->post_id); ?>
                                    </a>
                                </td>
                                <td>
                                    <span style="background: #e0e0e0; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
                                        <?php echo strtoupper(esc_html($translation->language)); ?>
                                    </span>
                                </td>
                                <td><?php echo number_format($translation->tokens_used); ?></td>
                                <td>$<?php echo number_format($translation->cost_usd, 4); ?></td>
                                <td><?php echo date('M j, Y H:i', strtotime($translation->translated_at)); ?></td>
                                <td>
                                    <a href="<?php echo wp_nonce_url(admin_url('options-general.php?page=hackeruna-translate&delete_translation=' . $translation->post_id . '&lang=' . $translation->language), 'delete_translation_' . $translation->post_id); ?>"
                                        class="button button-small"
                                        style="color: #dc3232;"
                                        onclick="return confirm('Delete this translation? It will be regenerated on next visit.');">
                                        🗑️ Delete
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <!-- API Usage -->
        <div class="card" style="padding: 20px;">
            <h2>📖 API Usage</h2>
            <p>Endpoint to get translated posts:</p>
            <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0;">
                GET /wp-json/hackeruna/v1/post/{post_id}/translate/{lang}
            </code>
            <code style="background: #f0f0f0; padding: 10px; display: block; margin: 10px 0;">
                GET /wp-json/hackeruna/v1/post/slug/{slug}/translate/{lang}
            </code>
        </div>
    </div>
<?php
}
