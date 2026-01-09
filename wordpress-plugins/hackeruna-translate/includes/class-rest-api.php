<?php

/**
 * REST API endpoints for translations
 */

if (!defined('ABSPATH')) {
    exit;
}

class Hackeruna_Translate_REST_API
{

    private $namespace = 'hackeruna/v1';

    /**
     * Register REST API routes
     */
    public function register_routes()
    {
        // Get translated post
        register_rest_route($this->namespace, '/post/(?P<id>\d+)/translate/(?P<lang>[a-z]{2})', [
            'methods' => 'GET',
            'callback' => [$this, 'get_translated_post'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'description' => 'Post ID'
                ],
                'lang' => [
                    'required' => true,
                    'type' => 'string',
                    'enum' => ['en', 'es', 'pt', 'fr', 'de'],
                    'description' => 'Target language code'
                ]
            ]
        ]);

        // Get translated post by slug
        register_rest_route($this->namespace, '/post/slug/(?P<slug>[a-z0-9-]+)/translate/(?P<lang>[a-z]{2})', [
            'methods' => 'GET',
            'callback' => [$this, 'get_translated_post_by_slug'],
            'permission_callback' => '__return_true',
            'args' => [
                'slug' => [
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Post slug'
                ],
                'lang' => [
                    'required' => true,
                    'type' => 'string',
                    'enum' => ['en', 'es', 'pt', 'fr', 'de'],
                    'description' => 'Target language code'
                ]
            ]
        ]);

        // Invalidate translation cache (admin only)
        register_rest_route($this->namespace, '/post/(?P<id>\d+)/translate/(?P<lang>[a-z]{2})/invalidate', [
            'methods' => 'DELETE',
            'callback' => [$this, 'invalidate_translation'],
            'permission_callback' => function () {
                return current_user_can('edit_posts');
            },
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer'
                ],
                'lang' => [
                    'required' => true,
                    'type' => 'string'
                ]
            ]
        ]);

        // Get translation status
        register_rest_route($this->namespace, '/post/(?P<id>\d+)/translations', [
            'methods' => 'GET',
            'callback' => [$this, 'get_translation_status'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer'
                ]
            ]
        ]);
    }

    /**
     * Get translated post by ID
     */
    public function get_translated_post($request)
    {
        $post_id = $request->get_param('id');
        $lang = $request->get_param('lang');

        $translator = new Hackeruna_Translator();
        $result = $translator->translate_post($post_id, $lang);

        if (is_wp_error($result)) {
            return $this->create_cors_response([
                'error' => true,
                'message' => $result->get_error_message(),
                'code' => $result->get_error_code()
            ], 400);
        }

        return $this->create_cors_response($result, 200);
    }

    /**
     * Get translated post by slug
     */
    public function get_translated_post_by_slug($request)
    {
        $slug = $request->get_param('slug');
        $lang = $request->get_param('lang');

        // Find post by slug
        $posts = get_posts([
            'name' => $slug,
            'post_type' => 'post',
            'post_status' => 'publish',
            'numberposts' => 1
        ]);

        if (empty($posts)) {
            // Try finding by translated slug in cache
            global $wpdb;
            $table_name = $wpdb->prefix . 'post_translations';
            $cached = $wpdb->get_row($wpdb->prepare(
                "SELECT post_id FROM $table_name WHERE slug = %s AND language = %s",
                $slug,
                $lang
            ));

            if ($cached) {
                $post_id = $cached->post_id;
            } else {
                return $this->create_cors_response([
                    'error' => true,
                    'message' => 'Post not found',
                    'code' => 'not_found'
                ], 404);
            }
        } else {
            $post_id = $posts[0]->ID;
        }

        $translator = new Hackeruna_Translator();
        $result = $translator->translate_post($post_id, $lang);

        if (is_wp_error($result)) {
            return $this->create_cors_response([
                'error' => true,
                'message' => $result->get_error_message(),
                'code' => $result->get_error_code()
            ], 400);
        }

        return $this->create_cors_response($result, 200);
    }

    /**
     * Create REST response with CORS headers
     */
    private function create_cors_response($data, $status = 200)
    {
        $response = new WP_REST_Response($data, $status);
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        // Disable caching to prevent CDN/browser from caching old responses without CORS
        $response->header('Cache-Control', 'no-cache, no-store, must-revalidate');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', '0');
        return $response;
    }

    /**
     * Invalidate translation cache
     */
    public function invalidate_translation($request)
    {
        $post_id = $request->get_param('id');
        $lang = $request->get_param('lang');

        $translator = new Hackeruna_Translator();
        $result = $translator->invalidate_cache($post_id, $lang);

        return new WP_REST_Response([
            'success' => true,
            'message' => 'Translation cache invalidated'
        ]);
    }

    /**
     * Get translation status for a post
     */
    public function get_translation_status($request)
    {
        $post_id = $request->get_param('id');

        $translations = Hackeruna_Translate_Database::get_all_translations($post_id);

        $status = [
            'post_id' => $post_id,
            'available_languages' => ['es'], // Spanish is always available (original)
            'translations' => []
        ];

        foreach ($translations as $translation) {
            $status['available_languages'][] = $translation->language;
            $status['translations'][$translation->language] = [
                'translated_at' => $translation->translated_at,
                'model_used' => $translation->model_used,
                'cached' => true
            ];
        }

        return new WP_REST_Response($status);
    }
}
