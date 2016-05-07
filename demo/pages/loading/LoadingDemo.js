import { Component } from '@angular/core';
import { NOVO_LOADING_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import LoadingCircleDemoTpl from './templates/LoadingCircleDemo.html';
import LoadingLineDemoTpl from './templates/LoadingLineDemo.html';

const template = `
<div class="container">
    <h1>Loading Animations <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/loading">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Themes</h2>

    <h5>Line</h5>
    <p>The Dot Line animation is indeterminate.</p>
    <div class="example loading-circle-demo">${LoadingLineDemoTpl}</div>
    <code-snippet [code]="LoadingLineDemoTpl"></code-snippet>

    <h5>Circle</h5>
    <p>
        The Dot Circle animation is used when the animation can be triggered by data retrieval.
        It has three stages, <code>open</code>, <code>cycle</code>, and <code>close</code> that can be triggered by it's controller.
        Click the loading animation to cycle through the different cycles.
    </p>
    <div class="example loading-circle-demo">${LoadingCircleDemoTpl}</div>
    <code-snippet [code]="LoadingCircleDemoTpl"></code-snippet>
</div>
`;

const CIRCLE_STAGES = ['open', 'cycle', 'close'];

@Component({
    selector: 'loading-demo',
    directives: [
        NOVO_LOADING_ELEMENTS,
        CodeSnippet
    ],
    template: template
})
export class LoadingDemo {
    constructor() {
        this.stages = 'open';
        this.LoadingCircleDemoTpl = LoadingCircleDemoTpl;
        this.LoadingLineDemoTpl = LoadingLineDemoTpl;
    }

    ngAfterContentInit() {
        this.stages = 'cycle';
    }

    changeStage() {
        let idx = CIRCLE_STAGES.indexOf(this.stages);
        this.stages = (idx === CIRCLE_STAGES.length - 1) ? CIRCLE_STAGES[0] : CIRCLE_STAGES[idx + 1];
    }
}
