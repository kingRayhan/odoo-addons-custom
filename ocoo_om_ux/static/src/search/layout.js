/** @odoo-module **/

import { _t } from '@web/core/l10n/translation';
import { patch } from '@web/core/utils/patch';
import { useHotkey } from '@web/core/hotkeys/hotkey_hook';
import { useState, useExternalListener } from '@odoo/owl';
import { Layout } from '@web/search/layout';

const ASIDE_CSS_KEY = '--Chatter-min-width';


patch(Layout.prototype, {
    setup() {
        super.setup();

        this.ustate = useState({
            sashMarkPoint: 0,
        });

        useHotkey('control+shift+arrowright', () => {
            this.onSassAsideFold(), {
                bypassEditableProtection: true,
                global: true,
            }
        });

        useExternalListener(window, 'mousemove', this.onSassAsideChange);
        useExternalListener(window, 'mouseup', this.onSassAsideEnd);
    },

    onSassAsideFold() {
        setTimeout(() => {
            document.body.classList.toggle('noaside');
        }, 120);
    },

    onSassAsideStart(ev) {
        this.ustate.sashMarkPoint = ev.x;

        // To clear sizing column on form table
        $('.o_list_renderer.table-responsive').css('width', '');
        $('.o_list_renderer>.o_list_table').css('width', '');
    },

    onSassAsideEnd() {
        this.ustate.sashMarkPoint = 0;
    },

    onSassAsideChange(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        if (this.ustate.sashMarkPoint) {
            const min = ev.view.innerWidth * 0.52;
            const max = ev.view.innerWidth * 0.8;
            if (ev.x >= min && ev.x <= max) {
                const fv = ev.view.innerWidth - ev.x;
                document.documentElement.style.setProperty(ASIDE_CSS_KEY, `${fv}px`);
            }
        }
    },
});