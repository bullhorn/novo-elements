// NG2
import { Component } from '@angular/core';
//Vendor
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from './../../../../platform/index';
// APP
let SimpleValueDemoTpl = require('./templates/SimpleValueDemo.html');
let CategoryValueDemoTpl = require('./templates/CategoryValueDemo.html');
let IconRightValueDemoTpl = require('./templates/IconRightValueDemo.html');
let CorporateUserValueDemoTpl = require('./templates/CorporateUserValueDemo.html');
let AddressValueDemoTpl = require('./templates/AddressValueDemo.html');
let FormatterValueDemoTpl = require('./templates/FormatterValueDemo.html');
let AssociatedValueDemoTpl = require('./templates/AssociatedValueDemo.html');
let DateTimeValueDemoTpl = require('./templates/DateTimeValueDemo.html');
let ExternalLinkValueDemoTpl = require('./templates/ExternalLinkValueDemo.html');
let EntityListDemoTpl = require('./templates/EntityListDemo.html');
const template = `
<div class="container">
    <h1>Value/Details/Summary <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/value">(source)</a></small></h1>
    <p>Used to render data based on its field type provided in meta.
    It has two themes, DEFAULT - horizontal view and MOBILE - vertical view</p>
    <h2>Mobile Theme</h2>
    <h5>Value/Details/Summary</h5>
    <p>Render SCALAR fields </p>
    <div class="example value-demo">${SimpleValueDemoTpl}</div>
    <code-snippet [code]="SimpleValueDemoTpl"></code-snippet>
    <h5>Category Value</h5>
    <p>Render TO_ONE fields </p>
    <div class="example value-demo">${CategoryValueDemoTpl}</div>
    <code-snippet [code]="CategoryValueDemoTpl"></code-snippet>
    <h5>Icon Right</h5>
    <p>Render fields with one or multiple icons on the right with an onclick event
    that calls a function on the meta object</p>
    <div class="example value-demo">${IconRightValueDemoTpl}</div>
    <code-snippet [code]="IconRightValueDemoTpl"></code-snippet>
    <h5>CorporateUser</h5>
    <p>Render TO_ONE fields with CorporateUser as an Associated Entity</p>
    <div class="example value-demo">${CorporateUserValueDemoTpl}</div>
    <code-snippet [code]="CorporateUserValueDemoTpl"></code-snippet>
    <h5>Custom Formatter</h5>
    <p>Render Entity TO_ONE fields as links</p>
    <div class="example value-demo">${FormatterValueDemoTpl}</div>
    <code-snippet [code]="FormatterValueDemoTpl"></code-snippet>
    <h5>External Links</h5>
    <p>Render external links</p>
    <div class="example value-demo">${ExternalLinkValueDemoTpl}</div>
    <code-snippet [code]="ExternalLinkValueDemoTpl"></code-snippet>
    <h5>DateTime</h5>
    <p>Render DateTime and Timestamp fields in the localized Date format</p>
    <div class="example value-demo">${DateTimeValueDemoTpl}</div>
    <code-snippet [code]="DateTimeValueDemoTpl"></code-snippet>
    <h5>Address</h5>
    <p>Render Address fields</p>
    <div class="example value-demo">${AddressValueDemoTpl}</div>
    <code-snippet [code]="AddressValueDemoTpl"></code-snippet>
    <h5>Associated Entities</h5>
    <p>Render associated fields</p>
    <div class="example value-demo">${AssociatedValueDemoTpl}</div>
    <code-snippet [code]="AssociatedValueDemoTpl"></code-snippet>
    <h5>Entity Lists</h5>
    <p>Render entity lists</p>
    <div class="example value-demo">${EntityListDemoTpl}</div>
    <code-snippet [code]="EntityListDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'value-demo',
    template: template
})
export class ValueDemoComponent {
    private SimpleValueDemoTpl: string = SimpleValueDemoTpl;
    private CategoryValueDemoTpl: string = CategoryValueDemoTpl;
    private IconRightValueDemoTpl: string = IconRightValueDemoTpl;
    private CorporateUserValueDemoTpl: string = CorporateUserValueDemoTpl;
    private FormatterValueDemoTpl: string = FormatterValueDemoTpl;
    private ExternalLinkValueDemoTpl: string = ExternalLinkValueDemoTpl;
    private DateTimeValueDemoTpl: string = DateTimeValueDemoTpl;
    private AddressValueDemoTpl: string = AddressValueDemoTpl;
    private AssociatedValueDemoTpl: string = AssociatedValueDemoTpl;
    private EntityListDemoTpl: string = EntityListDemoTpl;
    private toggleCount: number = 0;
    private checked: boolean = true;
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
        icons: [{
            iconCls: 'next',
            onIconClick: (data, meta) => {
                window.alert('hey there');
            }
            }, {
            iconCls: 'close',
            onIconClick: '',
        }]
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
    entityListData = {
        data: [{
            id: 1,
            firstName: 'George',
            lastName: 'Washington',
            personSubtype: 'Candidate',
            openLink: (data) => {},
        }, {
            id: 2,
            firstName: 'John',
            lastName: 'Adams',
            personSubtype: 'ClientContact',
            openLink: (data) => {},
        }, {
            id: 3,
            firstName: 'Abraham',
            lastName: 'Lincoln',
            personSubtype: 'Lead',
            openLink: (data) => {},
        }],
    };
    entityListMeta = {
        type: 'TO_MANY',
        name: 'guests',
        label: 'Attendees',
        associatedEntity: {
            entity: 'CorporateUser'
        }
    };
    increment() {
        this.toggleCount++;
    }
}
