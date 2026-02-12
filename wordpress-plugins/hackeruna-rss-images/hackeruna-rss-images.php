<?php

/**
 * Plugin Name: Hackeruna RSS Images
 * Description: Agrega imágenes destacadas al feed RSS y mejora los metadatos del feed.
 * Version: 1.0.0
 * Author: Juan Urquiza
 * Author URI: https://hackeruna.com
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Agregar imagen destacada al contenido del feed RSS
 */
function hackeruna_add_featured_image_to_feed($content)
{
    global $post;

    if (has_post_thumbnail($post->ID)) {
        $thumbnail_url = get_the_post_thumbnail_url($post->ID, 'large');
        $title = esc_attr(get_the_title($post->ID));

        $image_html = '<p><img src="' . esc_url($thumbnail_url) . '" alt="' . $title . '" style="display:block;margin:0 0 20px 0;max-width:100%;height:auto;border-radius:8px;" /></p>';

        $content = $image_html . $content;
    }

    return $content;
}
add_filter('the_content_feed', 'hackeruna_add_featured_image_to_feed');
add_filter('the_excerpt_rss', 'hackeruna_add_featured_image_to_feed');

/**
 * Agregar tag <media:content> con la imagen destacada para lectores RSS
 */
function hackeruna_add_media_thumbnail_to_feed()
{
    global $post;

    if (has_post_thumbnail($post->ID)) {
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        $thumbnail_url = get_the_post_thumbnail_url($post->ID, 'large');
        $metadata = wp_get_attachment_metadata($thumbnail_id);

        $mime_type = get_post_mime_type($thumbnail_id);
        $width = isset($metadata['width']) ? $metadata['width'] : '';
        $height = isset($metadata['height']) ? $metadata['height'] : '';

        // Get actual file size for enclosure
        $file_path = get_attached_file($thumbnail_id);
        $file_size = $file_path && file_exists($file_path) ? filesize($file_path) : 0;

        // media:content - standard RSS media tag
        echo '<media:content url="' . esc_url($thumbnail_url) . '" medium="image" type="' . esc_attr($mime_type) . '"';
        if ($width) echo ' width="' . esc_attr($width) . '"';
        if ($height) echo ' height="' . esc_attr($height) . '"';
        echo ' />' . "\n";

        // media:thumbnail - specifically used by Feedly for thumbnails
        echo '<media:thumbnail url="' . esc_url($thumbnail_url) . '"';
        if ($width) echo ' width="' . esc_attr($width) . '"';
        if ($height) echo ' height="' . esc_attr($height) . '"';
        echo ' />' . "\n";

        // enclosure with actual file size
        echo '<enclosure url="' . esc_url($thumbnail_url) . '" type="' . esc_attr($mime_type) . '" length="' . $file_size . '" />' . "\n";
    }
}
add_action('rss2_item', 'hackeruna_add_media_thumbnail_to_feed');

/**
 * Agregar namespace media: al feed RSS
 */
function hackeruna_add_media_namespace()
{
    echo 'xmlns:media="http://search.yahoo.com/mrss/"' . "\n";
}
add_action('rss2_ns', 'hackeruna_add_media_namespace');

/**
 * Personalizar título y descripción del feed
 */
function hackeruna_customize_feed_title($title)
{
    return 'Hackeruna - Blog de Tecnología';
}
add_filter('wp_title_rss', 'hackeruna_customize_feed_title');

function hackeruna_customize_feed_description($description)
{
    return 'Blog de tecnología, programación, desarrollo web, blockchain y tutoriales por Juan Urquiza.';
}
add_filter('bloginfo_rss', function ($value, $show) {
    if ($show === 'description') {
        return 'Blog de tecnología, programación, desarrollo web, blockchain y tutoriales por Juan Urquiza.';
    }
    return $value;
}, 10, 2);
