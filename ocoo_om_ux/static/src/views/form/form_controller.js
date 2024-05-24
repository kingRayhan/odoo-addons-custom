/* @odoo-module */

import { patch } from '@web/core/utils/patch';
import { FormController } from '@web/views/form/form_controller';

patch(FormController.prototype, {
    async beforeLeave() {
        if (!this.model.root.isNew) {
            if (!this.ui.block_recent) {
                this.env.bus.trigger('UDOO:FRC', {
                    route: this.router.current.hash,
                    displayName: this.model.action.currentController.displayName,
                });
            } else {
                this.ui.block_recent = false;
            }
        }
        return await super.beforeLeave();
    }
});