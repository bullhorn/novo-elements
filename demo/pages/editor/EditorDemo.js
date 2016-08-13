import { Component } from '@angular/core';
import { NOVO_EDITOR_ELEMENTS } from './../../../src/novo-elements';
import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import BasicDemoTpl from './templates/BasicEditorDemo.html';

const template = `
<div class="container">
    <h1>CK Editor <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/editor">(source)</a></small></h1>
    <p>Basic HTML editor using CK Editor.</p>

    <h5>Basic</h5>
    <div class="example editor-demo">${BasicDemoTpl}</div>
    <code-snippet [code]="BasicDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'editor-demo',
    template: template,
    directives: [NOVO_EDITOR_ELEMENTS, CodeSnippet]
})
export class EditorDemo {
    constructor() {
        this.BasicDemoTpl = BasicDemoTpl;
        this.editorValue = '<p>I AM A PRE-RENDERED VALUE</p><h1>TEST</h1>';
    }
}
