// NG2
import { Component } from '@angular/core';
//Vendor
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from './../../../../index';
// APP
let SimpleValueDemoTpl = require('./templates/SimpleValueDemo.html');
let CategoryValueDemoTpl = require('./templates/CategoryValueDemo.html');
let IconRightValueDemoTpl = require('./templates/IconRightValueDemo.html');
let CorporateUserValueDemoTpl = require('./templates/CorporateUserValueDemo.html');
let AddressValueDemoTpl = require('./templates/AddressValueDemo.html');
let FormatterValueDemoTpl = require('./templates/FormatterValueDemo.html');
let AssociatedValueDemoTpl = require('./templates/AssociatedValueDemo.html');
let DateTimeValueDemoTpl = require('./templates/DateTimeValueDemo.html');
let EmailValueDemoTpl = require('./templates/EmailValueDemo.html');
let ExternalLinkValueDemoTpl = require('./templates/ExternalLinkValueDemo.html');
let PhoneValueDemoTpl = require('./templates/PhoneValueDemo.html');
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
    <h5>Phone Value</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${PhoneValueDemoTpl}</div>
    <code-snippet [code]="PhoneValueDemoTpl"></code-snippet>
    <h5>Email Value</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${EmailValueDemoTpl}</div>
    <code-snippet [code]="EmailValueDemoTpl"></code-snippet>
    <h5>External Links</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${ExternalLinkValueDemoTpl}</div>
    <code-snippet [code]="ExternalLinkValueDemoTpl"></code-snippet>
    <h5>DateTime</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${DateTimeValueDemoTpl}</div>
    <code-snippet [code]="DateTimeValueDemoTpl"></code-snippet>
    <h5>Address</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${AddressValueDemoTpl}</div>
    <code-snippet [code]="AddressValueDemoTpl"></code-snippet>
    <h5>Associated Entities</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${AssociatedValueDemoTpl}</div>
    <code-snippet [code]="AssociatedValueDemoTpl"></code-snippet>
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
    private PhoneValueDemoTpl:string = PhoneValueDemoTpl;
    private EmailValueDemoTpl:string = EmailValueDemoTpl;
    private ExternalLinkValueDemoTpl:string = ExternalLinkValueDemoTpl;
    private DateTimeValueDemoTpl:string = DateTimeValueDemoTpl;
    private AddressValueDemoTpl:string = AddressValueDemoTpl;
    private AssociatedValueDemoTpl:string = AssociatedValueDemoTpl;
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
    phoneValueData = '2222222222';
    phoneValueMeta = {
        name: 'phone1',
        type: NOVO_VALUE_TYPE.PHONE,
        label: 'Mobile Phone #'
    };
    phoneValueTheme = NOVO_VALUE_THEME.MOBILE;
    emailValueData = 'amrutha@example.com';
    emailValueMeta = {
        name: 'email',
        label: 'Email Address'
    };
    emailValueTheme = NOVO_VALUE_THEME.MOBILE;
    externalLinkData = 'www.bullhorn.com';
    externalLinkMeta = {
        name: 'companyUrl',
        label: 'Company URL'
    };
    dateTimeValueData = (new Date()).getTime();
    dateTimeValueMeta = {
        dataSpecialization: 'DATETIME',
        label: 'Date'
    }
    addressValueData = {
        address1: '100 Summer Street',
        city: 'Boston',
        state: 'MA',
        zip: '02143',
        country: {
            name: 'United States'
        }
    };
    addressValueMeta = {
        dataType: 'Address',
        type: 'Address',
        label: 'Address',
        name: 'address'
    };
    associatedValueData = {
        id: 1,
        firstName: 'Alice',
        lastName: 'Wonderland'
    };
    associatedValueMeta = {
        type: 'TO_ONE',
        name: 'owner',
        label: 'Owner',
        associatedEntity: {
            entity: 'CorporateUser'
        }
    };
    increment() {
        this.toggleCount++;
    }
}
