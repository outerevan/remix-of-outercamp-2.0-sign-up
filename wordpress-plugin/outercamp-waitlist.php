<?php
/**
 * Plugin Name: Outercamp 2.0 Waitlist
 * Description: Embeddable waitlist signup form for Outercamp 2.0 with Supabase backend.
 * Version: 1.0.0
 * Author: Outercamp
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) exit;

// ── Settings page ──────────────────────────────────────────
add_action('admin_menu', function () {
    add_options_page(
        'Outercamp Waitlist',
        'Outercamp Waitlist',
        'manage_options',
        'outercamp-waitlist',
        'outercamp_waitlist_settings_page'
    );
});

add_action('admin_init', function () {
    register_setting('outercamp_waitlist', 'outercamp_supabase_url');
    register_setting('outercamp_waitlist', 'outercamp_supabase_key');
});

function outercamp_waitlist_settings_page() {
    ?>
    <div class="wrap">
        <h1>Outercamp 2.0 Waitlist Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('outercamp_waitlist'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Supabase Project URL</th>
                    <td>
                        <input type="url" name="outercamp_supabase_url"
                               value="<?php echo esc_attr(get_option('outercamp_supabase_url')); ?>"
                               class="regular-text" placeholder="https://your-project.supabase.co" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">Supabase Anon Key</th>
                    <td>
                        <input type="text" name="outercamp_supabase_key"
                               value="<?php echo esc_attr(get_option('outercamp_supabase_key')); ?>"
                               class="regular-text" placeholder="eyJ..." />
                        <p class="description">The public anon key (safe for client-side use).</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>

        <h2>Usage</h2>
        <p>Add this shortcode to any page or post:</p>
        <code>[outercamp_waitlist]</code>
        <p style="margin-top:8px;">Optional: <code>[outercamp_waitlist variant="light"]</code> for light backgrounds.</p>
    </div>
    <?php
}

// ── Shortcode ──────────────────────────────────────────────
add_shortcode('outercamp_waitlist', function ($atts) {
    $atts = shortcode_atts(['variant' => 'dark'], $atts, 'outercamp_waitlist');

    $url = esc_attr(get_option('outercamp_supabase_url', ''));
    $key = esc_attr(get_option('outercamp_supabase_key', ''));
    $variant = esc_attr($atts['variant']);

    // Enqueue assets only when shortcode is used
    wp_enqueue_script(
        'outercamp-waitlist-js',
        plugins_url('assets/outercamp-waitlist.js', __FILE__),
        [],
        '1.0.0',
        true
    );
    wp_enqueue_style(
        'outercamp-waitlist-css',
        plugins_url('assets/outercamp-waitlist.css', __FILE__),
        [],
        '1.0.0'
    );

    return sprintf(
        '<div data-outercamp-waitlist data-supabase-url="%s" data-supabase-key="%s" data-variant="%s"></div>',
        $url,
        $key,
        $variant
    );
});
