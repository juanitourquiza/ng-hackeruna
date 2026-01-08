<?php

/**
 * Database class for post translations
 */

if (!defined('ABSPATH')) {
    exit;
}

class Hackeruna_Translate_Database
{

    /**
     * Create the translations table
     */
    public static function create_table()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . 'post_translations';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            post_id BIGINT(20) UNSIGNED NOT NULL,
            language VARCHAR(5) NOT NULL,
            title TEXT NOT NULL,
            content LONGTEXT NOT NULL,
            excerpt TEXT,
            slug VARCHAR(255),
            translated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            model_used VARCHAR(50) DEFAULT 'gpt-4o-mini',
            tokens_used INT DEFAULT 0,
            cost_usd DECIMAL(10,6) DEFAULT 0,
            PRIMARY KEY (id),
            UNIQUE KEY unique_translation (post_id, language),
            KEY idx_post_lang (post_id, language)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Get cached translation
     */
    public static function get_translation($post_id, $language)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE post_id = %d AND language = %s",
            $post_id,
            $language
        ));
    }

    /**
     * Save translation to cache (uses REPLACE for race condition handling)
     */
    public static function save_translation($data)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        // Use REPLACE INTO to handle race conditions (concurrent requests)
        // Suppress errors to prevent HTML from corrupting JSON response
        $wpdb->suppress_errors(true);

        $sql = $wpdb->prepare(
            "REPLACE INTO $table_name 
            (post_id, language, title, content, excerpt, slug, model_used, tokens_used, cost_usd, translated_at) 
            VALUES (%d, %s, %s, %s, %s, %s, %s, %d, %f, %s)",
            $data['post_id'],
            $data['language'],
            $data['title'],
            $data['content'],
            $data['excerpt'] ?? '',
            $data['slug'] ?? '',
            $data['model_used'] ?? 'gpt-4o-mini',
            $data['tokens_used'] ?? 0,
            $data['cost_usd'] ?? 0,
            current_time('mysql')
        );

        $result = $wpdb->query($sql);
        $wpdb->suppress_errors(false);

        return $result;
    }

    /**
     * Update existing translation
     */
    public static function update_translation($post_id, $language, $data)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        return $wpdb->update(
            $table_name,
            [
                'title' => $data['title'],
                'content' => $data['content'],
                'excerpt' => $data['excerpt'] ?? '',
                'slug' => $data['slug'] ?? '',
                'model_used' => $data['model_used'] ?? 'gpt-4o-mini',
                'tokens_used' => $data['tokens_used'] ?? 0,
                'cost_usd' => $data['cost_usd'] ?? 0,
                'translated_at' => current_time('mysql')
            ],
            ['post_id' => $post_id, 'language' => $language]
        );
    }

    /**
     * Delete translation
     */
    public static function delete_translation($post_id, $language = null)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        if ($language) {
            return $wpdb->delete($table_name, [
                'post_id' => $post_id,
                'language' => $language
            ]);
        } else {
            return $wpdb->delete($table_name, ['post_id' => $post_id]);
        }
    }

    /**
     * Get all translations for a post
     */
    public static function get_all_translations($post_id)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE post_id = %d",
            $post_id
        ));
    }
}
