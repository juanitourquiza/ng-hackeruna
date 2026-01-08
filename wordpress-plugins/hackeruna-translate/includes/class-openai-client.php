<?php

/**
 * OpenAI API Client
 */

if (!defined('ABSPATH')) {
    exit;
}

class Hackeruna_OpenAI_Client
{

    private $api_key;
    private $model;
    private $api_url = 'https://api.openai.com/v1/chat/completions';

    // Pricing per 1M tokens (as of Jan 2025)
    private $pricing = [
        'gpt-4o-mini' => ['input' => 0.15, 'output' => 0.60],
        'gpt-4o' => ['input' => 2.50, 'output' => 10.00],
        'gpt-3.5-turbo' => ['input' => 0.50, 'output' => 1.50]
    ];

    public function __construct()
    {
        $this->api_key = get_option('hackeruna_openai_api_key', '');
        $this->model = get_option('hackeruna_openai_model', 'gpt-4o-mini');
    }

    /**
     * Check if API is configured
     */
    public function is_configured()
    {
        return !empty($this->api_key);
    }

    /**
     * Translate text using OpenAI
     */
    public function translate($text, $target_language, $type = 'content')
    {
        if (!$this->is_configured()) {
            return new WP_Error('not_configured', 'OpenAI API key is not configured');
        }

        $language_names = [
            'en' => 'English',
            'es' => 'Spanish',
            'pt' => 'Portuguese',
            'fr' => 'French',
            'de' => 'German'
        ];

        $target_lang_name = $language_names[$target_language] ?? $target_language;

        // Different prompts for different content types
        if ($type === 'title') {
            $system_prompt = "You are a professional translator. Translate the following blog post title to {$target_lang_name}. Keep it concise and engaging. Return ONLY the translated title, nothing else.";
        } elseif ($type === 'excerpt') {
            $system_prompt = "You are a professional translator. Translate the following blog post excerpt to {$target_lang_name}. Keep it concise. Return ONLY the translated excerpt, nothing else.";
        } else {
            $system_prompt = "You are a professional translator specializing in technical content. Translate the following WordPress blog post HTML content to {$target_lang_name}.

CRITICAL HTML RULES:
1. This is HTML content - preserve ALL HTML tags exactly (<p>, <br>, <div>, <h1>-<h6>, <ul>, <li>, <a>, etc.)
2. If the original has <p> paragraph tags, keep them in the translation
3. If the original uses line breaks, preserve them as <br> or paragraph structure
4. Keep ALL HTML attributes (href, class, style, target, rel) unchanged
5. Keep code blocks (<pre>, <code>) completely unchanged - do NOT translate code
6. Keep technical terms, library names, function names, and API references unchanged
7. Maintain the same tone and style
8. Preserve any emojis
9. Return ONLY the translated HTML content, no markdown, no explanations

If the content appears to be plain text without HTML tags, wrap paragraphs in <p> tags.";
        }

        $response = wp_remote_post($this->api_url, [
            'timeout' => 120,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type' => 'application/json'
            ],
            'body' => json_encode([
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $system_prompt],
                    ['role' => 'user', 'content' => $text]
                ],
                'temperature' => 0.3,
                'max_tokens' => 4096
            ])
        ]);

        if (is_wp_error($response)) {
            return $response;
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);

        if (isset($body['error'])) {
            return new WP_Error('api_error', $body['error']['message']);
        }

        $translated_text = $body['choices'][0]['message']['content'] ?? '';
        $usage = $body['usage'] ?? [];

        // Post-process content: ensure proper HTML formatting
        if ($type === 'content') {
            // Remove any markdown code block wrappers that GPT might add
            $translated_text = preg_replace('/^```html?\s*/i', '', $translated_text);
            $translated_text = preg_replace('/\s*```$/i', '', $translated_text);

            // If content doesn't have HTML paragraph tags, use wpautop to add them
            if (strpos($translated_text, '<p>') === false && strpos($translated_text, '<p ') === false) {
                $translated_text = wpautop($translated_text);
            }
        }

        // Calculate cost
        $input_tokens = $usage['prompt_tokens'] ?? 0;
        $output_tokens = $usage['completion_tokens'] ?? 0;
        $total_tokens = $input_tokens + $output_tokens;

        $pricing = $this->pricing[$this->model] ?? $this->pricing['gpt-4o-mini'];
        $cost = ($input_tokens * $pricing['input'] / 1000000) + ($output_tokens * $pricing['output'] / 1000000);

        return [
            'text' => trim($translated_text),
            'tokens_used' => $total_tokens,
            'cost_usd' => $cost,
            'model' => $this->model
        ];
    }

    /**
     * Generate translated slug
     */
    public function generate_slug($title, $target_language)
    {
        $result = $this->translate($title, $target_language, 'title');

        if (is_wp_error($result)) {
            return sanitize_title($title);
        }

        return sanitize_title($result['text']);
    }
}
