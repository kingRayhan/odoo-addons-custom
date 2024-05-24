/** @odoo-module **/

import { loadLanguages, _lt, _t } from '@web/core/l10n/translation';
import { patch } from '@web/core/utils/patch';
import { browser } from '@web/core/browser/browser';
import { useHotkey } from '@web/core/hotkeys/hotkey_hook';
import { useService } from '@web/core/utils/hooks';
import { useCommand } from '@web/core/commands/command_hook';
import { registry } from '@web/core/registry';
import { WebClientEnterprise } from '@web_enterprise/webclient/webclient';
import { reactive, useState, onWillStart, onMounted, useExternalListener } from '@odoo/owl';

import { CommandPalette } from './trays/quick_search';
import { bookmarkPalette, actionBookmarkThis, openBookmarkPalette } from './bookmark';
import { BookmarkManager } from './trays/bookmark';

const trayMenu = registry.category('systray');

// Memorized store
const jsonStore = (obj, key) => {
    localStorage.setItem(key, JSON.stringify(obj));
};
const lstore = reactive({}, () => jsonStore(lstore, 'udoo'));
export function useUdooLocalStore(initialst = {}) {
    Object.assign(lstore, JSON.parse(localStorage.getItem('udoo')) || initialst);
    jsonStore(lstore, 'udoo');
    return useState(lstore);
}

// Global store (non-memorized)
export const ustore = reactive({ recents: [] });
export function useUdooStore() {
    return useState(ustore);
}


patch(WebClientEnterprise.prototype, {
    setup() {
        super.setup();
        this.ui = useService('ui');
        this.user = useService('user');
        this.hotkey = useService('hotkey');
        this.action = useService('action');
        this.uo = useUdooStore();
        this.ue = useUdooLocalStore({
            sidenav: !this.env.isSmall,
        });

        /* Bookmark manager command */
        useCommand(
            _lt('Bookmark current tab'),
            () => { actionBookmarkThis(this.env); },
            {
                category: 'smart_action',
                global: true,
                isAvailable: () => this.env.services.action.currentController,
            }
        );
        useCommand(
            _lt('Bookmark manager'),
            () => (bookmarkPalette),
            {
                category: 'smart_action',
                global: true,
            }
        );
        useHotkey('alt+k', () => openBookmarkPalette(this.env), {
            bypassEditableProtection: true,
            global: true,
        });

        /* Bookmark manager system tray */
        trayMenu.add('bookmark', { Component: BookmarkManager }, { sequence: 50 });

        /* Quick action system tray */
        trayMenu.add('quick_search', { Component: CommandPalette }, { sequence: 50 });

        /* Side nav state */
        useHotkey('control+shift+arrowleft', () => {
            this.onSassLsideFold(), {
                bypassEditableProtection: true,
                global: true,
            }
        });

        onWillStart(async () => {
            this.ui.bookmarks = this.parseBookmarks();
            const languages = await loadLanguages(this.orm);
            this.ui.languages = languages;
        });

        onMounted(() => {
            this._loadSidenavState();
            this._loadRecents();
        });

        useExternalListener(window, 'mouseup', this.onSassLsideEnd);
        useExternalListener(window, 'beforeunload', () => {
            /* Recents post process */
            const localRecent = browser.localStorage.getItem('rc');
            const lastRecent = JSON.parse(localRecent) || [];
            const mergeArray = lastRecent.concat(this.uo.recents);
            mergeArray.forEach(el => {
                el.act_uid = el.act_uid || objectHash.MD5(el);
            });
            const uniqueArray = [];
            for (let index = mergeArray.length - 1; index >= 0; index--) {
                const el = mergeArray[index];
                if (uniqueArray.findIndex(o => o.act_uid === el.act_uid) == -1) {
                    uniqueArray.push(el);
                }
            }
            this._saveRecents(uniqueArray.reverse());

            /* Bookmark post process */
            if (this.ui.bookmarks.length == 0) {
                return;
            }
            const bookmarks = [];
            for (let index = this.ui.bookmarks.length - 1; index >= 0; index--) {
                const el = this.ui.bookmarks[index];
                if (el.pinned || bookmarks.findIndex(o => o.act_uid === el.act_uid) === -1) {
                    bookmarks.push(el);
                }
            }
            this.user.setUserSettings('up_bookmarks', JSON.stringify(bookmarks.reverse()));
        });
    },

    _loadSidenavState() {
        if (this.ue.sidenav) {
            document.body.classList.remove('nolside');
        } else {
            document.body.classList.add('nolside');
        }
    },

    _loadDefaultApp() {
        const root = this.menuService.getMenu('root');
        for (const app of root.childrenTree) {
            if (app.xmlid === this.user.settings?.ps_start_xmlid) {
                return this.menuService.selectMenu(app);
            }
        }
        return super._loadDefaultApp();
    },

    _loadRecents() {
        const lastRecent = browser.localStorage.getItem('rc');
        if (lastRecent) {
            this.uo.recents = JSON.parse(lastRecent);
        }
    },

    _saveRecents(rc = false) {
        browser.localStorage.setItem('rc', JSON.stringify(rc || this.uo.recents));
    },

    toggleFootnav() {
        this.ue.footnav = !this.ue.footnav;
    },

    parseBookmarks() {
        return JSON.parse(this.user.settings?.up_bookmarks || '[]');
    },

    onSassLsideFold() {
        this.ue.sidenav = !this.ue.sidenav && !this.env.isSmall;
        this._loadSidenavState();
    },

    onSassLsideStartFold(ev) {
        if (ev.which === 1) {
            this.state.sashSidenavMarkPoint = ev.x;
        }
    },

    onSassLsideEnd() {
        this.state.sashSidenavMarkPoint = 0;
    },

    openOmSearch() {
        this.env.services.command.openMainPalette({
            searchValue: '/',
            bypassEditableProtection: true,
            global: true,
        });
    }
});
