/** @odoo-module **/

import { _t } from '@web/core/l10n/translation';
import { registry } from '@web/core/registry';
import { patch } from '@web/core/utils/patch';
import { makeContext } from '@web/core/context';

import { clearClientSelection } from '../action_utils';


patch(registry.category('services').get('action'), {
    start(env, { ui, rpc }) {
        const base = super.start(env);
        const doActionButtonDef = base.doActionButton;

        async function doActionButton(params) {
            if ((!ui.ctrlKey && !ui.shiftKey) || params.type != 'object' || !params.resId) {
                await doActionButtonDef(params); return;
            }

            /* Shadow logic from `doActionButton` */
            const context = makeContext([params.context, params.buttonContext]);
            // call a Python Object method, which may return an action to execute
            let args = [[params.resId]];
            if (params.args) {
                let additionalArgs;
                try {
                    // warning: quotes and double quotes problem due to json and xml clash
                    // maybe we should force escaping in xml or do a better parse of the args array
                    additionalArgs = JSON.parse(params.args.replace(/'/g, '"'));
                } catch {
                    browser.console.error('Could not JSON.parse arguments', params.args);
                }
                args = args.concat(additionalArgs);
            }
            const callProm = await rpc('/web/dataset/call_button', {
                args,
                kwargs: { context },
                method: params.name,
                model: params.resModel,
            });

            /* Execute call prom */
            if (callProm.type != 'ir.actions.act_window' || !callProm.res_id) {
                await doActionButtonDef(params); return;
            }
            clearClientSelection(); // Clear all selections; case when Shift is held
            await base.doAction({
                type: 'ir.actions.act_url',
                url: `#id=${callProm.res_id}&active_id=${params.resId}&model=${callProm.res_model}&view_type=form`,
            });
        };

        base.doActionButton = doActionButton;

        return base;
    }
});