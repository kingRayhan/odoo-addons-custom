/** @odoo-module **/

import { _t } from '@web/core/l10n/translation';
import { cookie } from '@web/core/browser/cookie';
import { browser } from '@web/core/browser/browser';
import { session } from '@web/session';
import { useService } from '@web/core/utils/hooks';
import { Dialog } from '@web/core/dialog/dialog';
import { Component, useState } from '@odoo/owl';

export class AppearanceConfig extends Component {
    setup() {
        this.ui = useService('ui');
        this.title = _t('Appearance');
        const presets = session.udoo_presets || [];
        this.udoo_presets = [
            {
                code: '',
                title: _t('Default'),
                subtitle: _t('Seriousness and freshness, creating a refined, modern space'),
                creator: 'Udoo',
                scheme: {
                    '#05869c': _t('Primary'),
                    '#28979b': _t('Action'),
                    '#3a98ce': _t('Badge'),
                    '#0f172a': _t('Gray 900'),
                    '#1e293b': _t('Gray 800'),
                    '#334155': _t('Gray 700'),
                    '#475569': _t('Gray 600'),
                    '#64748b': _t('Gray 500'),
                    '#94a3b8': _t('Gray 400'),
                    '#cbd5e1': _t('Gray 300'),
                    '#e2e8f0': _t('Gray 200'),
                    '#f1f5f9': _t('Gray 100'),
                }
            },
            ...presets,
        ];

        this.o_color_shade = cookie.get('color_shade');
        this.o_color_scheme = this.ui.color_scheme || 'light';
        this.state = useState({
            color_shade: this.o_color_shade,
            color_scheme: this.o_color_scheme,
        });
    }

    confirm() {
        if (this.state.color_shade !== this.o_color_shade) {
            cookie.set('color_shade', this.state.color_shade)
        }

        this.ui.block();
        browser.location.reload();
    }
}

AppearanceConfig.template = 'uweb.AppearanceConfig';
AppearanceConfig.props = {
};
AppearanceConfig.components = {
    Dialog,
};