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
     * Save translation to cache
     */
    public static function save_translation($data)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'post_translations';

        return $wpdb->insert($table_name, [
            'post_id' => $data['post_id'],
            'language' => $data['language'],
            'title' => $data['title'],
            'content' => $data['content'],
            'excerpt' => $data['excerpt'] ?? '',
            'slug' => $data['slug'] ?? '',
            'model_used' => $data['model_used'] ?? 'gpt-4o-mini',
            'tokens_used' => $data['tokens_used'] ?? 0,
            'cost_usd' => $data['cost_usd'] ?? 0,
            'translated_at' => current_time('mysql')
        ]);
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
