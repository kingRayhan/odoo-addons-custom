/** @odoo-module */

import { patch } from '@web/core/utils/patch';
import { useService } from '@web/core/utils/hooks';
import { ListController } from '@web/views/list/list_controller';
import { FormViewDialog } from '@web/views/view_dialogs/form_view_dialog';

import { clearClientSelection, encodeRecordUrl } from '../../webclient/action_utils';


patch(ListController.prototype, {
    setup() {
        super.setup();
        this.ui = useService('ui');
    },

    async openRecord(record) {
        if (!this.ui.ctrlKey && !this.ui.shiftKey) {
            await super.openRecord(record); return;
        }

        const hasModal = this.ui.activeElement.classList?.contains('modal');
        const currentController = this.actionService.currentController;
        const hasForm = currentController.views?.find((view) => view.type === 'form');

        if (this.archInfo.openAction || !hasForm || hasModal) {
            await super.openRecord(record); return;
        }
        if (this.ui.shiftKey) {
            clearClientSelection(); // Clear all selections; case when Shift is held
            this.dialogService.add(FormViewDialog, {
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

    async expandFoldGroups() {
        const groupToLoad = [];
        this.model.root.groups.forEach(group => {
            const isFolded = !group.config.isFolded;
            group.model._updateConfig(
                group.config,
                { isFolded: isFolded },
                { reload: false }
            );
            if (!isFolded && group.hasData && group.records.length == 0) {
                groupToLoad.push(group);
            }
        });
        groupToLoad.forEach(group => {
            group.list.load();
        });
    },
});
