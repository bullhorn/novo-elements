// NG2
import { Component } from '@angular/core';
// APP
let HeaderDemoTpl = require('./templates/HeaderDemo.html');
let SubTitleDemoTpl = require('./templates/SubTitle.html');
// Vendor
import { NovoToastService } from './../../../../index';

const template = `
<div class="container">
    <h1>Headers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/header">(source)</a></small></h1>
    <p>Headers are used in Mainframe Record pages and some modals. </p>

    <h2>Types</h2>

    <h5>Record Header</h5>
    <p>Record headers have details about the entity record and tabbed navigation.</p>
    <div class="example header-demo">${HeaderDemoTpl}</div>
    <code-snippet [code]="HeaderDemoTpl"></code-snippet>

    <h2>Options</h2>

    <h5>SubTitle</h5>
    <div class="example header-demo">${SubTitleDemoTpl}</div>
    <code-snippet [code]="SubTitleDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'header-demo',
    template: template
})
export class HeaderDemoComponent {
    private HeaderDemoTpl: string = HeaderDemoTpl;
    private SubTitleDemoTpl: string = SubTitleDemoTpl;
    private entity: string;
    private options: any;

    constructor(private toaster: NovoToastService) {
        this.toaster = toaster;
        this.entity = 'company';
        this.options = {
            'title': 'Title',
            'message': 'Some Message...',
            'theme': 'ocean',
            'icon': 'clipboard',
            'position': 'growlTopRight'
        };
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
        this.toaster.alert(this.options);
    }
}
