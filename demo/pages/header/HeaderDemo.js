import { Component } from '@angular/core';
import { NOVO_BUTTON_ELEMENTS, NOVO_HEADER_ELEMENTS, NOVO_TAB_ELEMENTS, ToastService, NovoToast } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import HeaderDemoTpl from './templates/HeaderDemo.html';

const template = `
<div class="container">
    <h1>Headers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/header">(source)</a></small></h1>
    <p>Headers are used in Mainframe Record pages and some modals. </p>

    <h2>Types</h2>

    <h5>Record Header</h5>
    <p>Record headers have details about the entity record and tabbed navigation.</p>
    <div class="example header-demo">${HeaderDemoTpl}</div>
    <code-snippet [code]="HeaderDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'header-demo',
    template: template,
    directives: [NOVO_BUTTON_ELEMENTS, NOVO_HEADER_ELEMENTS, NOVO_TAB_ELEMENTS, CodeSnippet]
})
export class HeaderDemo {
    constructor(toaster:ToastService) {
        this.HeaderDemoTpl = HeaderDemoTpl;
        this.entity = 'company';

        this.options = {
            'title': 'Title',
            'message': 'Some Message...',
            'theme': 'ocean',
            'icon': 'clipboard',
            'position': 'growlTopRight'
        };

        this.toaster = toaster;
    }

    catchEv(type, ev) {
        // Set toast options
        this.options = {
            title: `${type}`,
            message: `${ev} fired...`,
            theme: 'ocean',
            icon: `${type}`,
            position: 'growlTopRight'
        };

        // Fire toast
        this.toaster.alert(NovoToast, this.options);
    }
}
