<?php
/**
 * Plugin Name: Hackeruna On This Day
 * Plugin URI: https://hackeruna.com
 * Description: Endpoints REST para el sidebar de Hackeruna: "Un día como hoy" (posts de años anteriores publicados en la misma fecha) y posts aleatorios del archivo con soporte de exclusión para evitar duplicados.
 * Version: 1.0.0
 * Author: Hackeruna
 * Author URI: https://hackeruna.com
 * License: GPL-2.0-or-later
 * Text Domain: hackeruna-onthisday
 *
 * Instalación:
 * 1. Copiar la carpeta `hackeruna-onthisday` en wp-content/plugins/
 * 2. Activar el plugin en WordPress → Plugins
 * 3. Verificar: https://backend.hackeruna.com/wp-json/hackeruna/v1/onthisday
 */

if (!defined('ABSPATH')) {
    exit;
}

class Hackeruna_On_This_Day
{
    /**
     * Namespace compartido por los plugins de Hackeruna.
     */
    const REST_NAMESPACE = 'hackeruna/v1';

    /**
     * Días que se mantiene en caché la selección del día.
     */
    const CACHE_TTL_FALLBACK = 3600;

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Registra los endpoints públicos del sidebar.
     */
    public function register_routes(): void
    {
        register_rest_route(self::REST_NAMESPACE, '/onthisday', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_on_this_day'],
            'permission_callback' => '__return_true',
            'args'                => [
                'limit'   => [
                    'required'          => false,
                    'type'              => 'integer',
                    'default'           => 1,
                    'minimum'           => 1,
                    'maximum'           => 5,
                    'sanitize_callback' => 'absint',
                    'description'       => 'Cantidad de posts a devolver (1-5).',
                ],
                'exclude' => [
                    'required'          => false,
                    'type'              => 'string',
                    'default'           => '',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description'       => 'IDs separados por coma que no deben aparecer.',
                ],
            ],
        ]);

        register_rest_route(self::REST_NAMESPACE, '/random', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_random_posts'],
            'permission_callback' => '__return_true',
            'args'                => [
                'limit'   => [
                    'required'          => false,
                    'type'              => 'integer',
                    'default'           => 2,
                    'minimum'           => 1,
                    'maximum'           => 5,
                    'sanitize_callback' => 'absint',
                    'description'       => 'Cantidad de posts aleatorios a devolver (1-5).',
                ],
                'exclude' => [
                    'required'          => false,
                    'type'              => 'string',
                    'default'           => '',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description'       => 'IDs separados por coma que no deben aparecer.',
                ],
                'scope'   => [
                    'required'          => false,
                    'type'              => 'string',
                    'default'           => 'all',
                    'enum'              => ['all', 'archive'],
                    'sanitize_callback' => 'sanitize_text_field',
                    'description'       => '"all" = todo el blog, "archive" = solo años anteriores.',
                ],
            ],
        ]);
    }

    /**
     * GET /hackeruna/v1/onthisday
     *
     * Devuelve posts publicados en el mismo día/mes de años anteriores.
     * Si no existen coincidencias, cae al archivo histórico aleatorio.
     */
    public function get_on_this_day(WP_REST_Request $request): WP_REST_Response
    {
        $limit   = (int) $request->get_param('limit');
        $exclude = $this->parse_exclude($request->get_param('exclude'));

        $selection = $this->get_daily_selection();
        $ids       = array_values(array_diff($selection['ids'], $exclude));
        $ids       = array_slice($ids, 0, $limit);

        $posts = $this->format_posts($ids, $selection['mode']);

        return rest_ensure_response($posts);
    }

    /**
     * GET /hackeruna/v1/random
     *
     * Devuelve posts aleatorios, opcionalmente solo del archivo histórico,
     * excluyendo los IDs indicados para no repetir contenido en el sidebar.
     */
    public function get_random_posts(WP_REST_Request $request): WP_REST_Response
    {
        $limit   = (int) $request->get_param('limit');
        $exclude = $this->parse_exclude($request->get_param('exclude'));
        $scope   = (string) $request->get_param('scope');

        $args = [
            'post_type'           => 'post',
            'post_status'         => 'publish',
            'posts_per_page'      => $limit,
            'orderby'             => 'rand',
            'post__not_in'        => $exclude,
            'fields'              => 'ids',
            'no_found_rows'       => true,
            'ignore_sticky_posts' => true,
        ];

        if ($scope === 'archive') {
            $args['date_query'] = [$this->archive_date_query()];
        }

        $query = new WP_Query($args);
        $posts = $this->format_posts(array_map('absint', $query->posts), 'random');

        return rest_ensure_response($posts);
    }

    /**
     * Selección del día cacheada: misma respuesta durante todo el día
     * (salvo el filtro `exclude`, que se aplica en cada request).
     *
     * @return array{mode: string, ids: int[]}
     */
    private function get_daily_selection(): array
    {
        $cache_key = 'hackeruna_onthisday_' . wp_date('Ymd');
        $cached    = get_transient($cache_key);

        if (is_array($cached) && isset($cached['ids'], $cached['mode'])) {
            return $cached;
        }

        $ids  = $this->query_ids_of_the_day();
        $mode = 'on_this_day';

        if (empty($ids)) {
            $ids  = $this->query_archive_ids();
            $mode = 'archive';
        }

        $selection = [
            'mode' => $mode,
            'ids'  => $ids,
        ];

        set_transient($cache_key, $selection, $this->seconds_until_midnight());

        return $selection;
    }

    /**
     * IDs publicados un día como hoy en años anteriores.
     *
     * @return int[]
     */
    private function query_ids_of_the_day(): array
    {
        $query = new WP_Query([
            'post_type'           => 'post',
            'post_status'         => 'publish',
            'posts_per_page'      => 20,
            'orderby'             => 'rand',
            'monthnum'            => (int) wp_date('n'),
            'day'                 => (int) wp_date('j'),
            'date_query'          => [$this->archive_date_query()],
            'fields'              => 'ids',
            'no_found_rows'       => true,
            'ignore_sticky_posts' => true,
            'suppress_filters'    => false,
        ]);

        return array_map('absint', $query->posts);
    }

    /**
     * IDs aleatorios del archivo histórico (años anteriores).
     *
     * @return int[]
     */
    private function query_archive_ids(): array
    {
        $query = new WP_Query([
            'post_type'           => 'post',
            'post_status'         => 'publish',
            'posts_per_page'      => 20,
            'orderby'             => 'rand',
            'date_query'          => [$this->archive_date_query()],
            'fields'              => 'ids',
            'no_found_rows'       => true,
            'ignore_sticky_posts' => true,
        ]);

        return array_map('absint', $query->posts);
    }

    /**
     * Restringe las consultas a fechas anteriores al 1 de enero del año actual.
     */
    private function archive_date_query(): array
    {
        return [
            'before' => [
                'year'  => (int) wp_date('Y'),
                'month' => 1,
                'day'   => 1,
            ],
            'inclusive' => false,
        ];
    }

    /**
     * Convierte una lista de IDs en la respuesta pública del sidebar.
     *
     * @param int[]  $ids
     * @param string $mode
     * @return array<int, array<string, mixed>>
     */
    private function format_posts(array $ids, string $mode): array
    {
        $current_year = (int) wp_date('Y');
        $posts        = [];

        foreach ($ids as $id) {
            $post = get_post($id);

            if (!$post || $post->post_status !== 'publish') {
                continue;
            }

            $post_year = (int) mysql2date('Y', $post->post_date);

            $posts[] = [
                'id'        => (int) $post->ID,
                'slug'      => $post->post_name,
                'title'     => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
                'date'      => mysql2date('c', $post->post_date),
                'years_ago' => max(0, $current_year - $post_year),
                'match'     => $mode,
            ];
        }

        return $posts;
    }

    /**
     * @param mixed $value
     * @return int[]
     */
    private function parse_exclude($value): array
    {
        if (is_array($value)) {
            $raw = $value;
        } else {
            $raw = explode(',', (string) $value);
        }

        $ids = array_map('absint', array_filter($raw, static function ($item) {
            return $item !== '' && $item !== null;
        }));

        return array_values(array_unique(array_filter($ids)));
    }

    /**
     * Segundos hasta la próxima medianoche (hora del sitio).
     */
    private function seconds_until_midnight(): int
    {
        if (function_exists('current_datetime')) {
            $now      = current_datetime();
            $midnight = $now->setTime(0, 0)->modify('+1 day');
            $seconds  = $midnight->getTimestamp() - $now->getTimestamp();
        } else {
            $seconds = self::CACHE_TTL_FALLBACK;
        }

        return max(60, (int) $seconds);
    }
}

new Hackeruna_On_This_Day();
