// NG2
import { Component } from '@angular/core';
// APP
let ButtonTabDemoTpl = require('./templates/ButtonTabDemo.html');
let ColorDemoTpl = require('./templates/ColorDemo.html');
let RouterDemoTpl = require('./templates/RouterDemo.html');
let VerticalDemoTpl = require('./templates/VerticalDemo.html');
let WhiteDemoTpl = require('./templates/WhiteDemo.html');
let CondensedDemoTpl = require('./templates/CondensedDemo.html');

const template = `
<div class="container">
    <h1>Tabs <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tabs">(source)</a></small></h1>
    <p>Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs in Bullhorn have two different themes; A 'color' theme for tabbed navigation on a colored background, and a 'white' theme for tabs on a white background.</p>

    <h2>Themes</h2>

    <h5>Color</h5>
    <p>Colored background tab navigation gets the theme <code>theme="color"</code></p>
    <div class="example color-tab-demo">${ColorDemoTpl}</div>
    <code-snippet [code]="ColorDemoTpl"></code-snippet>

    <h5>White</h5>
    <p>White background tab navigation gets the theme <code>theme="white"</code></p>
    <div class="example transparent-tab-demo">${WhiteDemoTpl}</div>
    <code-snippet [code]="WhiteDemoTpl"></code-snippet>

    <h2>Styles</h2>

    <p>Condensed tabs to help utilize more space with <code>condensed="true"</code></p>
    <div class="example transparent-tab-demo">${CondensedDemoTpl}</div>
    <code-snippet [code]="CondensedDemoTpl"></code-snippet>

    <h2>Types</h2>

    <h5>Vertical</h5>
    <p>Vertical tabs get a direction attribute <code>direction="vertical"</code></p>
    <div class="example vertical-tab-demo">${VerticalDemoTpl}</div>
    <code-snippet [code]="VerticalDemoTpl"></code-snippet>

    <h5>Button Tab Bars</h5>
    <p>Tabbed Button Bars get a similar style treatment to the <code>"header"</code> theme button.</p>
    <div class="example example button-tab-demo">${ButtonTabDemoTpl}</div>
    <code-snippet [code]="ButtonTabDemoTpl"></code-snippet>

    <h2>As Application Routing Mechanism</h2>
    <p>Follows the same color/white theme as above, but doesn't use the "novo-tabs" tag and you have to add the classes and html accordingly. The header will now control and route your application and put the content in the "router-outlet" and look/feel like our tabs component.</p>
    <div class="example transparent-tab-demo">${RouterDemoTpl}</div>
    <code-snippet [code]="RouterDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'tabs-demo',
    template: template
})
export class TabsDemoComponent {
    private ColorDemoTpl: string = ColorDemoTpl;
    private WhiteDemoTpl: string = WhiteDemoTpl;
    private VerticalDemoTpl: string = VerticalDemoTpl;
    private ButtonTabDemoTpl: string = ButtonTabDemoTpl;
    private RouterDemoTpl: string = RouterDemoTpl;
    private CondensedDemoTpl: string = CondensedDemoTpl;

    tabSelected() {
        console.log('TAB SELECTED'); // tslint:disable-line
    }

    tabDeselected() {
        console.log('TAB DESELECTED'); // tslint:disable-line
    }
}
