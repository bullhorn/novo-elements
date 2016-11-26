// NG2
import { Component } from '@angular/core';
// APP
let DrawerDemoTpl = require('./templates/DrawerDemo.html');

const template = `
<div class="container">
    <h1>Drawer <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/drawer">(source)</a></small></h1>
    <p>Drawer Blurb</p>

    <h2>Type</h2>

    <h5>Positions</h5>
    <p>Positions Blurb</p>
    <div class="example" style="padding: 20px;">${DrawerDemoTpl}</div>
    <code-snippet [code]="DrawerDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'drawer-demo',
    template: template
})
export class DrawerDemoComponent {
    private DrawerDemoTpl: string = DrawerDemoTpl;

    drawerToggled(event) {
        console.log('Drawer Toggled', event);
    }
}
