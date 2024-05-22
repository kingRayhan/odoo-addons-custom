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

## Change base layout

```
custom-addons/web/views/webclient_templates.xml
 <link type="image/x-icon" rel="shortcut icon" t-att-href="x_icon or 'https://assets-global.website-files.com/64bda61fe4373e7e73cd9137/64d2a5910c63d14fe69fab1d_nordexl_icon.png'"/>
```
