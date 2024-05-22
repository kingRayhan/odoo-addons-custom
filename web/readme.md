## Change root title

## custom-addons/web/static/src/webclient/webclient.js

```js
//www.odoo.com/forum/help-1/changing-the-page-title-odoo-123731

this.title.setParts({ zopenerp: "Odoo" }); // zopenerp is easy to grep
useBus(this.env.bus, "ROUTE_CHANGE", this.loadRouterState);
useBus(this.env.bus, "ACTION_MANAGER:UI-UPDATED", ({ detail: mode }) => {
  if (mode !== "new") {
    this.state.fullscreen = mode === "fullscreen";
  }
});
```
