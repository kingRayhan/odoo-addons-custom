/** @odoo-module */

import { _t } from '@web/core/l10n/translation';
import { patch } from '@web/core/utils/patch';
import { useService } from '@web/core/utils/hooks';
import { KanbanController } from '@web/views/kanban/kanban_controller';
import { FormViewDialog } from '@web/views/view_dialogs/form_view_dialog';

import { clearClientSelection, encodeRecordUrl } from '../../webclient/action_utils';


patch(KanbanController.prototype, {
    setup() {
        super.setup();
        this.ui = useService('ui');
        this.dialog = useService('dialog');
    },

    async openRecord(record) {
        if (!this.ui.ctrlKey && !this.ui.shiftKey) {
            await super.openRecord(record); return;
        }

        const hasModal = this.ui.activeElement.classList?.contains('modal');
        const currentController = this.actionService.currentController;
        const hasForm = currentController.views?.find((view) => view.type === 'form');

        if (!hasForm || hasModal) {
            await super.openRecord(record); return;
        }
        if (this.ui.shiftKey) {
            clearClientSelection(); // Clear all selections; case when Shift is held
            this.dialog.add(FormViewDialog, {
                size: 'xl',
                title: record.data?.name || '',
                resModel: record.resModel,
                resId: record.resId,
                onRecordSaved: async () => {
                    await this.model.load();
                },
            });
        } else {
            const act = encodeRecordUrl(record, currentController.action);
            await this.actionService.doAction(act);
        }
    },
});
