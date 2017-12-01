// NG2
import { Component } from '@angular/core';
// APP
let SwitchDemoTpl = require('./templates/SwitchDemo.html');

const template = `
<div class="container">
    <h1>Switches & Toggles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Types</h2>

    <h5>Tiles</h5>
    <p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>

    <h5>Switches</h5>
    <p>Switches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
    <div class="example switch-demo">${SwitchDemoTpl}</div>
    <code-snippet [code]="SwitchDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'switch-demo',
    template: template
})
export class SwitchDemoComponent {
    private SwitchDemoTpl:string = SwitchDemoTpl;
    private toggleCount:number = 0;
    private checked:boolean = true;

    increment() {
        this.toggleCount++;
    }
}
