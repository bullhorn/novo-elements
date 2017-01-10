// NG2
import { Component } from '@angular/core';
// APP
let PopOverPlacementDemoTpl = require('./templates/PopOverPlacementDemo.html');
let PopOverHorizontalAlignmentDemo = require('./templates/PopOverHorizontalAlignmentDemo.html');
let PopOverVerticalAlignmentDemo = require('./templates/PopOverVerticalAlignmentDemo.html');
let PopOverBehaviorDemoTpl = require('./templates/PopOverBehaviorDemo.html');
let PopOverWithDynamicHtmlDemoTpl = require('./templates/PopOverWithDynamicHtmlDemo.html');
let PopOverAutomaticPlacementDemoTpl = require('./templates/PopOverAutomaticPlacementDemo.html');

const template = `
<div class="container">
    <h1>PopOvers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/popover">(source)</a></small></h1>
    <p>PopOvers are tooltips with dynamic html content. This component is used when you need help text that requires the user to perform an action before closing.</p>

    <h5>Placement</h5>
    <div class="example popover-demo">${PopOverPlacementDemoTpl}</div>
    <code-snippet [code]="PopOverPlacementDemoTpl"></code-snippet>

    <h5>Horizontal Alignment</h5>
    <div class="example popover-demo">${PopOverHorizontalAlignmentDemo}</div>
    <code-snippet [code]="PopOverHorizontalAlignmentDemo"></code-snippet>

    <h5>Vertical Alignment</h5>
    <div class="example popover-demo">${PopOverVerticalAlignmentDemo}</div>
    <code-snippet [code]="PopOverVerticalAlignmentDemo"></code-snippet>

    <h5>Behavior</h5>
    <div class="example popover-demo">${PopOverBehaviorDemoTpl}</div>
    <code-snippet [code]="PopOverBehaviorDemoTpl"></code-snippet>

    <h5>Dynamic HTML in PopOver</h5>
    <div class="example popover-demo">${PopOverWithDynamicHtmlDemoTpl}</div>
    <code-snippet [code]="PopOverWithDynamicHtmlDemoTpl"></code-snippet>

    <h5>Automatic Placement of PopOver</h5>
    <div class="example popover-demo">${PopOverAutomaticPlacementDemoTpl}</div>
    <code-snippet [code]="PopOverAutomaticPlacementDemoTpl"></code-snippet>
</div>
`;
@Component({
    selector: 'popover-demo',
    template: template
})
export class PopOverDemoComponent {
    private PopOverPlacementDemoTpl:string = PopOverPlacementDemoTpl;
    private PopOverHorizontalAlignmentDemo:string = PopOverHorizontalAlignmentDemo;
    private PopOverVerticalAlignmentDemo:string = PopOverVerticalAlignmentDemo;
    private PopOverBehaviorDemoTpl:string = PopOverBehaviorDemoTpl;
    private PopOverWithDynamicHtmlDemoTpl:string = PopOverWithDynamicHtmlDemoTpl;
    private PopOverAutomaticPlacementDemoTpl:string = PopOverAutomaticPlacementDemoTpl;
}
