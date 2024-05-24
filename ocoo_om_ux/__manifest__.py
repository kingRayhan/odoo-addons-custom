# -*- coding: utf-8 -*-
# Copyright 2024 Jupetern

{
    'name': 'Om Backend Enterprise Theme',
    'category': 'Themes/Backend',
    'summary': 'Refined Odoo UX with start menu, dual-tier sidebar navigation, bookmark manager, recent views, dark mode, global search, open in new tab, switch language, flexible chatter, sticky header, group fold unfold, fullscreen form view, report action icon, optimized multi-line, interactive sortable, stunning graph view, responsive mobile, sign up login design, history activities, language selection, flexible, fast, lightweight, modern, multipurpose, enterprise color theme, enterprise theme',
    'version': '1.3.7',
    'license': 'OPL-1',
    'author': 'Jupetern',
    'website': 'https://github.com/jupetern',
    'sequence': 77,
    'images': [
        'static/description/banner.png',
        'static/description/theme_screenshot.png',
    ],
    'depends': [
        'base_sparse_field',
        'auth_signup',
        'web_editor',
        'web_enterprise',
    ],
    'data': [
        'views/webclient_templates.xml',
    ],
    'assets': {
        'web._assets_primary_variables': {
            ('before', 'web_enterprise/static/src/scss/primary_variables.scss', 'ocoo_om_ux/static/src/scss/primary_variables.scss'),
            ('after', 'web_enterprise/static/src/scss/primary_variables.scss', 'ocoo_om_ux/static/src/**/*.variables.scss'),
        },
        'web._assets_secondary_variables': [
            ('before', 'web_enterprise/static/src/scss/secondary_variables.scss', 'ocoo_om_ux/static/src/scss/secondary_variables.scss'),
        ],
        'web._assets_bootstrap': [
            'ocoo_om_ux/static/src/scss/overridden_common.scss',
        ],
        'web._assets_backend_helpers': [
            ('before', 'web_enterprise/static/src/scss/bootstrap_overridden.scss', 'ocoo_om_ux/static/src/scss/bs_backend_overridden.scss'),
        ],
        'web.assets_backend': [
            ('after', 'web/static/src/scss/fontawesome_overridden.scss', 'ocoo_om_ux/static/src/scss/overridden_icons.scss'),
            ('before', 'web/static/src/webclient/**/*', 'ocoo_om_ux/static/src/views/**/*'),
            ('before', 'web/static/src/webclient/**/*', 'ocoo_om_ux/static/src/search/**/*'),
            'ocoo_om_ux/static/src/core/**/*',
            'ocoo_om_ux/static/src/webclient/**/*',
            ('remove', 'ocoo_om_ux/static/src/**/*.dark.scss'),  # Don't include dark theme
            ('after', 'ocoo_om_ux/static/src/webclient/**/*', 'ocoo_om_ux/static/src/scss/style_backend.scss'),
        ],
        'web.dark_mode_variables': [
            ('before', 'ocoo_om_ux/static/src/scss/primary_variables.scss', 'ocoo_om_ux/static/src/scss/primary_variables.dark.scss'),
            ('before', 'ocoo_om_ux/static/src/**/*.variables.scss', 'ocoo_om_ux/static/src/**/*.variables.dark.scss'),
            ('before', 'ocoo_om_ux/static/src/scss/secondary_variables.scss', 'ocoo_om_ux/static/src/scss/secondary_variables.dark.scss'),
        ],
        'web.assets_web_dark': [
            ('include', 'web.dark_mode_variables'),
            ('before', 'ocoo_om_ux/static/src/scss/bs_backend_overridden.scss', 'ocoo_om_ux/static/src/scss/bs_backend_overridden.dark.scss'),
            'ocoo_om_ux/static/src/**/*.dark.scss',
        ],
        'web.assets_frontend': [
            ('before', 'web/static/lib/bootstrap/scss/_variables.scss', 'ocoo_om_ux/static/src/scss/bs_frontend_variables.scss'),
            ('after', 'web/static/src/scss/fontawesome_overridden.scss', 'ocoo_om_ux/static/src/scss/overridden_icons.scss'),
        ],
        'web._assets_core': [
            'ocoo_om_ux/static/lib/object_hash.js',
            ('replace', 'web/static/src/core/colors/colors.js', 'ocoo_om_ux/static/src/core/colors.js'),
        ],
    },
    'price': 37,
    'currency': 'USD',
}
