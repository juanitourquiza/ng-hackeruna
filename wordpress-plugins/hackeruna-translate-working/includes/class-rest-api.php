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



        // Increment post view count
        register_rest_route($this->namespace, '/view/(?P<id>\d+)', [
            'methods' => 'POST',
            'callback' => [$this, 'increment_post_view'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'description' => 'Post ID'
                ]
            ]
        ]);

        // Expose post view counts in the standard WordPress posts REST response
        register_rest_field('post', 'views', [
            'get_callback' => [$this, 'get_post_view_count_field'],
            'schema' => [
                'description' => 'Post view count',
                'type' => 'integer',
                'context' => ['view', 'edit']
            ]
        ]);

        register_rest_field('post', 'post_views', [
            'get_callback' => [$this, 'get_post_view_count_field'],
            'schema' => [
                'description' => 'Post view count',
                'type' => 'integer',
                'context' => ['view', 'edit']
            ]
        ]);

        register_rest_field('post', 'post_views_count', [
            'get_callback' => [$this, 'get_post_view_count_field'],
            'schema' => [
                'description' => 'Post view count',
                'type' => 'integer',
                'context' => ['view', 'edit']
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
            return new WP_REST_Response([
                'error' => true,
                'message' => $result->get_error_message(),
                'code' => $result->get_error_code()
            ], 400);
        }

        // Add CORS headers
        $response = new WP_REST_Response($result);
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
        $response->header('Cache-Control', 'public, max-age=3600');

        return $response;
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
                return new WP_REST_Response([
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
            return new WP_REST_Response([
                'error' => true,
                'message' => $result->get_error_message(),
                'code' => $result->get_error_code()
            ], 400);
        }

        $response = new WP_REST_Response($result);
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
        $response->header('Cache-Control', 'public, max-age=3600');

        return $response;
    }



    /**
     * Increment custom post view count used by the Angular frontend.
     */
    public function increment_post_view($request)
    {
        $post_id = absint($request->get_param('id'));
        $post = get_post($post_id);

        if (!$post || 'post' !== $post->post_type || 'publish' !== $post->post_status) {
            return $this->create_cors_response([
                'success' => false,
                'message' => 'Post not found',
                'code' => 'not_found'
            ], 404);
        }

        $views = $this->increment_post_view_count($post_id);

        return $this->create_cors_response([
            'success' => true,
            'post_id' => $post_id,
            'views' => $views,
            'post_views' => $views,
            'post_views_count' => $views
        ], 200);
    }

    /**
     * REST field callback for standard post responses.
     */
    public function get_post_view_count_field($object)
    {
        $post_id = isset($object['id']) ? absint($object['id']) : 0;
        return $this->get_post_view_count($post_id);
    }

    /**
     * Atomically increment all known post view counters.
     */
    private function increment_post_view_count($post_id)
    {
        global $wpdb;

        add_post_meta($post_id, 'post_views_count', 0, true);

        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->postmeta} SET meta_value = CAST(meta_value AS UNSIGNED) + 1 WHERE post_id = %d AND meta_key = %s",
            $post_id,
            'post_views_count'
        ));

        if ($this->post_views_table_exists()) {
            $table_name = $this->get_post_views_table_name();

            $wpdb->query($wpdb->prepare(
                "INSERT INTO {$table_name} (id, type, period, count) VALUES (%d, %d, %s, %d) ON DUPLICATE KEY UPDATE count = count + 1",
                $post_id,
                4,
                'total',
                1
            ));
        }

        return $this->get_post_view_count($post_id);
    }

    /**
     * Read the highest available view counter from known storage backends.
     */
    private function get_post_view_count($post_id)
    {
        if (!$post_id) {
            return 0;
        }

        $meta_views = absint(get_post_meta($post_id, 'post_views_count', true));
        $table_views = $this->get_post_views_table_count($post_id);

        return max(0, $meta_views, $table_views);
    }

    /**
     * Read historical totals from the dFactory Post Views Counter table, when present.
     */
    private function get_post_views_table_count($post_id)
    {
        global $wpdb;

        if (!$this->post_views_table_exists()) {
            return 0;
        }

        $table_name = $this->get_post_views_table_name();
        $views = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(count) FROM {$table_name} WHERE id = %d AND type = %d AND period = %s",
            $post_id,
            4,
            'total'
        ));

        return max(0, absint($views));
    }

    /**
     * Get the Post Views Counter table name for this WordPress install.
     */
    private function get_post_views_table_name()
    {
        global $wpdb;

        return $wpdb->prefix . 'post_views';
    }

    /**
     * Check whether the legacy/plugin post views table exists.
     */
    private function post_views_table_exists()
    {
        global $wpdb;

        static $exists = null;

        if (null !== $exists) {
            return $exists;
        }

        $table_name = $this->get_post_views_table_name();
        $found_table = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table_name));
        $exists = ($found_table === $table_name);

        return $exists;
    }

    /**
     * Create REST response with CORS headers.
     */
    private function create_cors_response($data, $status = 200)
    {
        $response = new WP_REST_Response($data, $status);
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
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
