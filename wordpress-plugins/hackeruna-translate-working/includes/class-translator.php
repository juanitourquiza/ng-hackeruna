<?php

/**
 * Translator class - orchestrates the translation process
 */

if (!defined('ABSPATH')) {
    exit;
}

class Hackeruna_Translator
{

    private $openai;

    public function __construct()
    {
        $this->openai = new Hackeruna_OpenAI_Client();
    }

    /**
     * Translate a post
     */
    public function translate_post($post_id, $target_language)
    {
        // Get original post
        $post = get_post($post_id);

        if (!$post || $post->post_status !== 'publish') {
            return new WP_Error('invalid_post', 'Post not found or not published');
        }

        // If target is Spanish (original), return the post as-is
        if ($target_language === 'es') {
            return $this->format_original_post($post);
        }

        // Check cache first
        $cached = Hackeruna_Translate_Database::get_translation($post_id, $target_language);

        if ($cached) {
            return $this->format_cached_translation($cached, $post);
        }

        // Check if OpenAI is configured
        if (!$this->openai->is_configured()) {
            return new WP_Error('not_configured', 'OpenAI API is not configured. Please add your API key in Settings > Hackeruna Translate.');
        }

        // Translate title
        $title_result = $this->openai->translate($post->post_title, $target_language, 'title');
        if (is_wp_error($title_result)) {
            return $title_result;
        }

        // Translate content
        $content_result = $this->openai->translate($post->post_content, $target_language, 'content');
        if (is_wp_error($content_result)) {
            return $content_result;
        }

        // Translate excerpt if exists
        $excerpt = '';
        $excerpt_result = null;
        if (!empty($post->post_excerpt)) {
            $excerpt_result = $this->openai->translate($post->post_excerpt, $target_language, 'excerpt');
            if (!is_wp_error($excerpt_result)) {
                $excerpt = $excerpt_result['text'];
            }
        }

        // Generate slug
        $slug = sanitize_title($title_result['text']);

        // Calculate total tokens and cost
        $total_tokens = $title_result['tokens_used'] + $content_result['tokens_used'];
        $total_cost = $title_result['cost_usd'] + $content_result['cost_usd'];

        if ($excerpt_result && !is_wp_error($excerpt_result)) {
            $total_tokens += $excerpt_result['tokens_used'];
            $total_cost += $excerpt_result['cost_usd'];
        }

        // Save to cache
        $translation_data = [
            'post_id' => $post_id,
            'language' => $target_language,
            'title' => $title_result['text'],
            'content' => $content_result['text'],
            'excerpt' => $excerpt,
            'slug' => $slug,
            'model_used' => $title_result['model'],
            'tokens_used' => $total_tokens,
            'cost_usd' => $total_cost
        ];

        Hackeruna_Translate_Database::save_translation($translation_data);

        // Return formatted response
        return [
            'id' => $post_id,
            'original_id' => $post_id,
            'language' => $target_language,
            'title' => $title_result['text'],
            'content' => $content_result['text'],
            'excerpt' => $excerpt,
            'slug' => $slug,
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'cached' => false,
            'translated_at' => current_time('mysql'),
            'model_used' => $title_result['model'],
            'tokens_used' => $total_tokens,
            'cost_usd' => round($total_cost, 6),
            '_embedded' => $this->get_embedded_data($post)
        ];
    }

    /**
     * Format original Spanish post
     */
    private function format_original_post($post)
    {
        return [
            'id' => $post->ID,
            'original_id' => $post->ID,
            'language' => 'es',
            'title' => $post->post_title,
            'content' => $post->post_content,
            'excerpt' => $post->post_excerpt,
            'slug' => $post->post_name,
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'cached' => true,
            'translated_at' => null,
            'model_used' => null,
            '_embedded' => $this->get_embedded_data($post)
        ];
    }

    /**
     * Format cached translation
     */
    private function format_cached_translation($cached, $post)
    {
        return [
            'id' => $cached->post_id,
            'original_id' => $cached->post_id,
            'language' => $cached->language,
            'title' => $cached->title,
            'content' => $cached->content,
            'excerpt' => $cached->excerpt,
            'slug' => $cached->slug,
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'cached' => true,
            'translated_at' => $cached->translated_at,
            'model_used' => $cached->model_used,
            '_embedded' => $this->get_embedded_data($post)
        ];
    }

    /**
     * Get embedded data (featured image, author, categories)
     */
    private function get_embedded_data($post)
    {
        $embedded = [];

        // Featured image
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        if ($thumbnail_id) {
            $image_url = wp_get_attachment_image_src($thumbnail_id, 'full');
            $embedded['wp:featuredmedia'] = [
                [
                    'id' => $thumbnail_id,
                    'source_url' => $image_url ? $image_url[0] : ''
                ]
            ];
        }

        // Author
        $author = get_userdata($post->post_author);
        if ($author) {
            $embedded['author'] = [
                [
                    'id' => $author->ID,
                    'name' => $author->display_name,
                    'slug' => $author->user_nicename
                ]
            ];
        }

        // Categories
        $categories = get_the_category($post->ID);
        if ($categories) {
            $embedded['wp:term'] = [
                array_map(function ($cat) {
                    return [
                        'id' => $cat->term_id,
                        'name' => $cat->name,
                        'slug' => $cat->slug
                    ];
                }, $categories)
            ];
        }

        return $embedded;
    }

    /**
     * Invalidate cache for a post
     */
    public function invalidate_cache($post_id, $language = null)
    {
        return Hackeruna_Translate_Database::delete_translation($post_id, $language);
    }
}
