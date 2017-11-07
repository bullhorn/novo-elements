// NG2
import { Component } from '@angular/core';
//Vendor
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from './../../../../index';
// APP
let SimpleValueDemoTpl = require('./templates/SimpleValueDemo.html');
let CategoryValueDemoTpl = require('./templates/CategoryValueDemo.html');

const template = `
<div class="container">
    <h1>Value/Details/Summary <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/value">(source)</a></small></h1>
    <p>Update component descriptions</p>

    <h5>Value/Details/Summary</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${SimpleValueDemoTpl}</div>
    <code-snippet [code]="SimpleValueDemoTpl"></code-snippet>
    <h5>Category Value</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${CategoryValueDemoTpl}</div>
    <code-snippet [code]="CategoryValueDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'value-demo',
    template: template
})
export class ValueDemoComponent {
    private SimpleValueDemoTpl:string = SimpleValueDemoTpl;
    private CategoryValueDemoTpl:string = CategoryValueDemoTpl;
    private toggleCount:number = 0;
    private checked:boolean = true;
    simpleData = 1234567890;
    simpleMeta = {
        type: 'SCALAR',
        name: 'phone1',
        label: 'PH #'
    };
    simpleTheme = NOVO_VALUE_THEME.MOBILE;
    categoryData = {
        value: 'stuff',
        label: 'Stuff Category'
    };
    categoryMeta = {
        type: 'TO_ONE',
        name: 'category',
        label: 'Category',
        associatedEntity: {
            entity: 'Category'
        }
    };
    increment() {
        this.toggleCount++;
    }
}
