// NG2
import { Component } from '@angular/core';
// APP
import LoadingCircleDemoTpl = require('./templates/LoadingCircleDemo.html');
import LoadingLineDemoTpl = require('./templates/LoadingLineDemo.html');

const template = `
<div class="container">
    <h1>Loading Animations <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/loading">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Themes</h2>

    <h5>Line</h5>
    <p>The Dot Line animation is indeterminate.</p>
    <div class="example loading-line-demo">${LoadingLineDemoTpl}</div>
    <code-snippet [code]="LoadingLineDemoTpl"></code-snippet>

    <h5>Spinner</h5>
    <p>
        The Dot Spinner animation is used as an alternate to the loading line animation.
    </p>
    <div class="example loading-spinner-demo">${LoadingCircleDemoTpl}</div>
    <code-snippet [code]="LoadingCircleDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'loading-demo',
    template: template
})
export class LoadingDemoComponent {
    constructor() {
        this.LoadingCircleDemoTpl = LoadingCircleDemoTpl;
        this.LoadingLineDemoTpl = LoadingLineDemoTpl;
    }
}
