/** @odoo-module **/

import { _t } from '@web/core/l10n/translation';
import { patch } from '@web/core/utils/patch';
import { useBus } from '@web/core/utils/hooks';
import { Dropdown } from '@web/core/dropdown/dropdown';
import { CommandPalette } from '@web/core/commands/command_palette';
import { VIEW_IMAP } from '../../webclient/action_utils';

patch(CommandPalette.prototype, {

    setup() {
        super.setup();
        this.view_imap = VIEW_IMAP;

        useBus(this.env.bus, 'COMMAND_PALETTE:REFRESH', ({ detail: text }) => {
            this.debounceSearch(text);
        });
    }
});

CommandPalette.components = {
    ...CommandPalette.components,
    Dropdown: Dropdown,
}
