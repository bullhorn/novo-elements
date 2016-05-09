import { Component } from '@angular/core';
import { PluralPipe } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import PluralizeDemoTpl from './templates/PluralizeDemo.html';

const template = `
<div class="container">
    <h1>Pipes</h1>
    <p>Utility and helpful pipes.</p>

    <h5>Pluralize <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/pipes/plural">(source)</a></small></h5>
    <p>Makes works plural or vice-versa</p>
    <div class="example pipes-demo">${PluralizeDemoTpl}</div>
    <code-snippet [code]="PluralizeDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'pipes-demo',
    directives: [
        CodeSnippet
    ],
    pipes: [
        PluralPipe
    ],
    template: template
})
export class PipesDemo {
    constructor() {
        this.PluralizeDemoTpl = PluralizeDemoTpl;
    }
}
