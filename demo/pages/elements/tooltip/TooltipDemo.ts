// NG2
import { Component } from '@angular/core';
// APP
let TooltipOptionsDemoTpl = require('./templates/TooltipOptionsDemo.html');
let TooltipPlacementDemoTpl = require('./templates/TooltipPlacementDemo.html');
let TooltipAlignDemoTpl = require('./templates/TooltipAlignDemo.html');
let TooltipTypesDemoTpl = require('./templates/TooltipTypesDemo.html');
let TooltipSizesDemoTpl = require('./templates/TooltipSizesDemo.html');
let TooltipToggleDemoTpl = require('./templates/TooltipToggleDemo.html');

const template = `
<div class="container">
    <h1>Tooltips <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tooltip">(source)</a></small></h1>
    <p>We use the <a href="http://kushagragour.in/lab/hint/">hint.css</a> module for our tooltip implementation, wrapping it inside a directive.</p>

    <h2>Helper</h2>
    <p>Helper tooltips contain basic text that provides some additional information about an element.</p>

    <h5>Placement</h5>
    <div class="example tooltip-demo">${TooltipPlacementDemoTpl}</div>
    <code-snippet [code]="TooltipPlacementDemoTpl"></code-snippet>

    <h5>Alignment</h5>
    <div class="example tooltip-demo">${TooltipAlignDemoTpl}</div>
    <code-snippet [code]="TooltipAlignDemoTpl"></code-snippet>

    <h5>Types</h5>
    <div class="example tooltip-demo">${TooltipTypesDemoTpl}</div>
    <code-snippet [code]="TooltipTypesDemoTpl"></code-snippet>

    <h5>Sizes</h5>
    <div class="example tooltip-demo">${TooltipSizesDemoTpl}</div>
    <code-snippet [code]="TooltipSizesDemoTpl"></code-snippet>

    <h5>Options</h5>
    <div class="example tooltip-demo">${TooltipOptionsDemoTpl}</div>
    <code-snippet [code]="TooltipOptionsDemoTpl"></code-snippet>

    <h5>Toggle Trigger</h5>
    <div class="example tooltip-demo">${TooltipToggleDemoTpl}</div>
    <code-snippet [code]="TooltipToggleDemoTpl"></code-snippet>
</div>
`;
@Component({
    selector: 'tooltip-demo',
    template: template
})
export class TooltipDemoComponent {
    private tooltipActive: boolean;
    private TooltipOptionsDemoTpl: string = TooltipOptionsDemoTpl;
    private TooltipTypesDemoTpl: string = TooltipTypesDemoTpl;
    private TooltipSizesDemoTpl: string = TooltipSizesDemoTpl;
    private TooltipPlacementDemoTpl: string = TooltipPlacementDemoTpl;
    private TooltipAlignDemoTpl: string = TooltipAlignDemoTpl;
    private TooltipToggleDemoTpl: string = TooltipToggleDemoTpl;
    mediumTooltip: string = `Lorem Ipsum\n\n is simply dummy text of the printing and typesetting industry.`;
    largeTooltip: string = `Lorem Ipsum\n\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    toggleTooltip() {
        this.tooltipActive = !this.tooltipActive;
    }
}
