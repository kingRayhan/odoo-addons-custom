/** @odoo-module **/

import { Component } from '@odoo/owl';
import { openBookmarkPalette, actionBookmarkThis } from '../bookmark';

export class BookmarkManager extends Component {
    openBookmarkPalette() {
        openBookmarkPalette(this.env);
    }

    actionBookmarkThis() {
        actionBookmarkThis(this.env);
    }
}

BookmarkManager.template = 'uweb.BookmarkManager';
