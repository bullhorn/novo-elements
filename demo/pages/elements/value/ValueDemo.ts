// NG2
import { Component } from '@angular/core';
//Vendor
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from './../../../../index';
// APP
let SimpleValueDemoTpl = require('./templates/SimpleValueDemo.html');
let CategoryValueDemoTpl = require('./templates/CategoryValueDemo.html');
let IconRightValueDemoTpl = require('./templates/IconRightValueDemo.html');
let CorporateUserValueDemoTpl = require('./templates/CorporateUserValueDemo.html');
let FormatterValueDemoTpl = require('./templates/FormatterValueDemo.html');
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
    <h5>Icon Right</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${IconRightValueDemoTpl}</div>
    <code-snippet [code]="IconRightValueDemoTpl"></code-snippet>
    <h5>CorporateUser</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${CorporateUserValueDemoTpl}</div>
    <code-snippet [code]="CorporateUserValueDemoTpl"></code-snippet>
    <h5>Custom Formatter</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${FormatterValueDemoTpl}</div>
    <code-snippet [code]="FormatterValueDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'value-demo',
    template: template
})
export class ValueDemoComponent {
    private SimpleValueDemoTpl:string = SimpleValueDemoTpl;
    private CategoryValueDemoTpl:string = CategoryValueDemoTpl;
    private IconRightValueDemoTpl:string = IconRightValueDemoTpl;
    private CorporateUserValueDemoTpl:string = CorporateUserValueDemoTpl;
    private FormatterValueDemoTpl:string = FormatterValueDemoTpl;
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
    iconRightData = 'Approved';
    iconRightMeta = {
        type: 'SCALAR',
        options: [{
            value: 'Approved',
            label: 'Approved'
        }],
        name: 'status',
        label: 'Status',
        icon: 'next',
        onIconClick: (data, meta) => {
            window.alert('hey there');
        }
    };
    corporateUserData = {
        id: 123,
        firstName: 'Jack',
        lastName: 'White'
    };
    corporateUserMeta = {
        type: 'TO_ONE',
        name: 'user',
        label: 'Internal User',
        associatedEntity: {
            entity: 'CorporateUser'
        }
    };
    formatterData = {
        id: 123
    };
    formatterMeta = {
        name: 'Placement',
        label: 'Placement',
        associatedEntity: {
            entity: 'Placement'
        },
        formatter: (value, args) => {
            return `${args.label} #${value && value.id || ''}`
        }
    };
    increment() {
        this.toggleCount++;
    }
}
