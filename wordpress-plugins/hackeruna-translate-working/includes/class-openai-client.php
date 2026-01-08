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
            $system_prompt = "You are a professional translator specializing in technical content. Translate the following blog post content to {$target_lang_name}.

IMPORTANT RULES:
1. Preserve ALL HTML formatting exactly as-is (tags, attributes, classes)
2. Keep code blocks unchanged - do NOT translate code
3. Keep technical terms, library names, and API references in their original form
4. Maintain the same tone and style
5. Preserve any emojis
6. Return ONLY the translated content, no explanations";
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
