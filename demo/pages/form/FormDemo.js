import { Component } from '@angular/core';
import { NOVO_FORM_ELEMENTS, NOVO_BUTTON_ELEMENTS, NOVO_PICKER_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import AutocompleteFieldDemoTpl from './templates/AutocompleteFieldDemo.html';
import AutocompleteFieldCustomDemoTpl from './templates/AutocompleteFieldCustomDemo.html';
import CalendarPickerDemoTpl from './templates/CalendarPickerDemo.html';
import CheckboxDemoTpl from './templates/CheckboxDemo.html';
import DynamicFormDemoTpl from './templates/DynamicFormDemo.html';
import MultiselectDemoTpl from './templates/MultiselectDemo.html';
import RadioButtonDemoTpl from './templates/RadioButtonsDemo.html';
import SelectFieldDemoTpl from './templates/SelectFieldDemo.html';
import TextInputDemoTpl from './templates/TextInputDemo.html';
import QuickNoteInputDemoTpl from './templates/QuickNoteInputDemo.html';

const template = `
<div class="container">
    <h1>Forms <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/form">(source)</a></small></h1>
    <p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'</p>

    <h2>Static Form</h2>
    <p>Static forms <code>&lt;novo-form /&gt;</code> are composed of a title <code>&lt;form-title /&gt;</code>, and fields <code>&lt;form-field /&gt;</code>. Fields can include a label <code>&lt;form-label /&gt;</code> and input <code>&lt;form-input /&gt;</code>.Form inputs take name, type, and options attributes <code>&lt;form-input name="gender" type="radio" options="[male, female]" /&gt;</code>. Static forms are used to manually build custom forms when you don't have access to a form's meta data.</p>
    <p>If you're building a static form, you may need to utilize one of many form fields. The following form fields are supported by BH-Elements.</p>

    <h5>Text Input</h5>
    <p>This is the basic text input field.</p>
    <div class="example form-demo text-input">${TextInputDemoTpl}</div>
    <code-snippet [code]="TextInputDemoTpl"></code-snippet>

    <h5>Radio Buttons</h5>
    <p>Radio buttons allow users to select a single item from a list.</p>
    <div class="example form-demo">${RadioButtonDemoTpl}</div>
    <code-snippet [code]="RadioButtonDemoTpl"></code-snippet>

    <h5>Checkboxes</h5>
    <p>Checkboxes allow users to select multiple items from a list.</p>
    <div class="example form-demo">${CheckboxDemoTpl}</div>
    <code-snippet [code]="CheckboxDemoTpl"></code-snippet>

    <h5>Calendar Picker</h5>
    <p>Calendar pickers inside a form are alwasy inline and allow users to pick date, time, or both.</p>
    <div class="example form-demo">${CalendarPickerDemoTpl}</div>
    <code-snippet [code]="CalendarPickerDemoTpl"></code-snippet>

    <h5>Dropdown</h5>
    <p>Dropdown select fields allow the user to select from a list of items.</p>
    <div class="example form-demo">${SelectFieldDemoTpl}</div>
    <code-snippet [code]="SelectFieldDemoTpl"></code-snippet>

    <h5>Autocomplete Picker Field</h5>
    <p>Pickers allow a user to search for and select records in the system. When initially opened it will show the last five viewed records.</p>
    <div class="example form-demo">${AutocompleteFieldDemoTpl}</div>
    <code-snippet [code]="AutocompleteFieldDemoTpl"></code-snippet>

    <h5>Autocomplete Custom Picker Field</h5>
    <p>CUSTOM!</p>
    <div class="example form-demo">${AutocompleteFieldCustomDemoTpl}</div>
    <code-snippet [code]="AutocompleteFieldCustomDemoTpl"></code-snippet>

    <h5>Multi-Select</h5>
    <p>This allows the user to select multiple items from a list, or returned via search.</p>
    <div class="example form-demo">${MultiselectDemoTpl}</div>
    <code-snippet [code]="MultiselectDemoTpl"></code-snippet>

    <h5>Note</h5>
    <p>This allows the user to add a note with references/tags.</p>
    <div class="example form-demo">${QuickNoteInputDemoTpl}</div>
    <code-snippet [code]="QuickNoteInputDemoTpl"></code-snippet>

    <h5>Required Fields</h5>
    <p>Required fields must be filled before the page can advance. Required fields are indicated with a red dot between the label and the field. If a user attempts to advance without filling out a field, all non-required fields will be removed and required fields will be highlighted in red.</p>

    <h2>Dynamic Form</h2>
    <p>Dynamic forms are composed of one element, <code>&lt;novo-form [meta]="dynamicData"/&gt;</code> and allow you to pass in dynamic data as a <code>[meta]</code> attribute.</p>
    <div class="example form-demo dynamic">${DynamicFormDemoTpl}</div>
    <code-snippet [code]="DynamicFormDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'form-demo',
    template: template,
    directives: [NOVO_FORM_ELEMENTS, NOVO_PICKER_ELEMENTS, NOVO_BUTTON_ELEMENTS, CodeSnippet]
})
export class FormDemo {
    constructor() {
        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
            'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
            'West Virginia', 'Wisconsin', 'Wyoming'];
        let contactOptions = [
            {
                searchEntity: 'ClientContact',
                id: 101,
                name: 'James Smith',
                phone: '617-555-1234',
                email: 'jsmith@acme.com',
                status: 'Active',
                clientCorporation: {
                    id: 210,
                    name: 'Acme, Inc'
                },
                address: {
                    city: 'Boston',
                    state: 'MA'
                }
            }, {
                searchEntity: 'ClientContact',
                id: 102,
                name: 'John Smith',
                phone: '617-555-1234',
                email: 'jsmith@bigcompany.com',
                status: 'Active',
                clientCorporation: {
                    id: 220,
                    name: 'Big Company'
                },
                address: {
                    city: 'Boston',
                    state: 'MA'
                }
            }, {
                searchEntity: 'ClientContact',
                id: 103,
                name: 'Jane Smith',
                phone: '617-555-1234',
                email: 'jsmith@quickstaff.com',
                status: 'Active',
                clientCorporation: {
                    id: 230,
                    name: 'QuickStaff LLC'
                },
                address: {
                    city: 'Boston',
                    state: 'MA'
                }
            }, {
                searchEntity: 'ClientContact',
                id: 104,
                name: 'James Anderson',
                phone: '617-555-1234',
                email: 'janderson@acme.com',
                status: 'Active',
                clientCorporation: {
                    id: 210,
                    name: 'Acme, Inc'
                },
                address: {
                    city: 'Boston',
                    state: 'MA'
                }
            }
        ];

        this.TextInputDemoTpl = TextInputDemoTpl;
        this.CalendarPickerDemoTpl = CalendarPickerDemoTpl;
        this.AutocompleteFieldDemoTpl = AutocompleteFieldDemoTpl;
        this.CheckboxDemoTpl = CheckboxDemoTpl;
        this.DynamicFormDemoTpl = DynamicFormDemoTpl;
        this.RadioButtonDemoTpl = RadioButtonDemoTpl;
        this.MultiselectDemoTpl = MultiselectDemoTpl;
        this.SelectFieldDemoTpl = SelectFieldDemoTpl;
        this.AutocompleteFieldCustomDemoTpl = AutocompleteFieldCustomDemoTpl;
        this.QuickNoteInputDemoTpl = QuickNoteInputDemoTpl;

        this.yesNo = ['Yes', 'No'];
        this.shifts = ['Morning', 'Day', 'Night', 'Overnight'];
        this.stateObjOptions = ['Alabama', 'Alaska', 'Arizona', 'Arkansas'];

        this.autocompleteFlatArrayOptions = {
            options: states
        };

        this.deferredAutocompleteData = {
            options: this.updateDataInPicker(),
            nullTemplate: PickerCustomNullResults,
            errorTemplate: PickerCustomErrorTemplate,
            loaderTemplate: PickerCustomLoadTemplate,
            recentTemplate: PickerCustomNoRecentsTemplate
        };

        this.autocompleteObjects = {
            options: this.stateObjOptions
        };

        this.autocompleteContacts = {
            options: contactOptions,
            field: 'name'
        };
        this.dynamicData = {
            lastName: 'Sullivan'
        };
        this.dynamic = {
            entity: 'Opportunity',
            entityMetaUrl: 'http://develop-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/Opportunity?fields=*',
            label: 'Opportunity',
            fields: [
                {
                    name: 'firstName',
                    type: 'text',
                    label: 'First Name',
                    required: true
                },
                {
                    name: 'lastName',
                    type: 'text',
                    label: 'Last Name'
                },
                {
                    name: 'number',
                    type: 'number',
                    label: 'Number',
                    required: true
                },
                {
                    name: 'float',
                    type: 'float',
                    label: 'Float',
                    required: true
                },
                {
                    name: 'currency',
                    type: 'money',
                    label: 'Cost',
                    currencyFormat: 'USD'
                },
                {
                    name: 'percent',
                    type: 'percentage',
                    label: 'Percentage',
                    required: true
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Date',
                    required: true
                },
                {
                    name: 'time',
                    type: 'time',
                    label: 'Time',
                    required: true
                },
                {
                    name: 'status',
                    type: 'select',
                    dataType: 'String',
                    maxLength: 200,
                    confidential: false,
                    label: 'Status',
                    options: [
                        {
                            value: 'Open',
                            label: 'Open'
                        },
                        {
                            value: 'Qualifying',
                            label: 'Qualifying'
                        },
                        {
                            value: 'Negotiating',
                            label: 'Negotiating'
                        },
                        {
                            value: 'TRIGGER',
                            label: 'TRIGGER'
                        }
                    ]
                },
                {
                    name: 'nextAction',
                    type: 'tiles',
                    dataType: 'String',
                    label: 'Next Action',
                    required: true,
                    options: [
                        {
                            value: 'none',
                            label: 'None'
                        },
                        {
                            value: 'task',
                            label: 'Task'
                        },
                        {
                            value: 'appointment',
                            label: 'Appointment'
                        }
                    ]
                },
                {
                    name: 'state',
                    type: 'picker',
                    dataType: 'String',
                    maxLength: 200,
                    confidential: false,
                    label: 'State',
                    required: true,
                    // TODO: Align picker with META by passing META obj into picker
                    // options: [ /* flat array of states */ ]
                    options: this.autocompleteFlatArrayOptions
                }, {
                    name: 'startDate',
                    type: 'datetime',
                    dataType: 'Timestamp',
                    label: 'Start Date',
                    required: true
                }, {
                    name: 'quota',
                    type: 'number',
                    dataType: 'Integer',
                    label: 'Quota',
                    required: true
                }, {
                    name: 'secret',
                    type: 'hidden',
                    dataType: 'String',
                    label: 'Top Secret',
                    required: true,
                    defaultValue: 'The secret code is: 08322'
                }, {
                    name: 'categories',
                    type: 'picker',
                    confidential: false,
                    optional: false,
                    label: 'Categories',
                    required: false,
                    readOnly: true,
                    multiValue: true,
                    inputType: 'SELECT',
                    options: [
                        {
                            value: 'Open',
                            label: 'Open'
                        },
                        {
                            value: 'Qualifying',
                            label: 'Qualifying'
                        },
                        {
                            value: 'Negotiating',
                            label: 'Negotiating'
                        },
                        {
                            value: 'TRIGGER',
                            label: 'TRIGGER'
                        }
                    ]
                }, {
                    name: 'owner',
                    type: 'entity',
                    confidential: false,
                    optional: false,
                    label: 'Owner',
                    required: false,
                    readOnly: true,
                    multiValue: false,
                    inputType: 'SELECT',
                    // TODO: Align picker with META by passing META obj into picker
                    optionsType: 'CorporateUser',
                    optionsUrl: '/options/CorporateUser',
                    hideFromSearch: false,
                    associatedEntity: {
                        entity: 'CorporateUser',
                        label: 'Corporate User'
                    }
                }, {
                    name: 'address',
                    type: 'address',
                    dataType: 'Address',
                    dataSpecialization: 'SYSTEM',
                    confidential: false,
                    optional: true,
                    label: 'Address',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: true,
                    fields: [
                        {
                            name: 'address1',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 40,
                            confidential: false,
                            optional: true,
                            label: 'Addressxxx',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            hideFromSearch: false
                        },
                        {
                            name: 'address2',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 40,
                            confidential: false,
                            optional: true,
                            label: 'Address 2',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            hideFromSearch: false
                        },
                        {
                            name: 'city',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 40,
                            confidential: false,
                            optional: true,
                            label: 'City',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            hideFromSearch: false
                        },
                        {
                            name: 'state',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 30,
                            confidential: false,
                            optional: true,
                            label: 'State',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            inputType: 'SELECT',
                            optionsType: 'StateText',
                            optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/StateText',
                            hideFromSearch: false
                        },
                        {
                            name: 'zip',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 15,
                            confidential: false,
                            optional: true,
                            label: 'Zip',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            hideFromSearch: false
                        },
                        {
                            name: 'countryID',
                            type: 'SCALAR',
                            dataType: 'Integer',
                            confidential: false,
                            optional: false,
                            label: 'Country',
                            required: false,
                            readOnly: false,
                            multiValue: false,
                            inputType: 'SELECT',
                            optionsType: 'Country',
                            optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/Country',
                            defaultValue: 2260,
                            hideFromSearch: false
                        },
                        {
                            name: 'countryCode',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 0,
                            optional: true
                        },
                        {
                            name: 'countryName',
                            type: 'SCALAR',
                            dataType: 'String',
                            maxLength: 0,
                            optional: true
                        }
                    ]
                },
                {
                    name: 'checkbox',
                    type: 'checkbox',
                    label: 'Checkbox'
                },
                {
                    name: 'checklist',
                    type: 'checklist',
                    label: 'CheckList',
                    options: this.shifts,
                    required: true
                },
                {
                    name: 'address',
                    type: 'address',
                    label: 'Address',
                    required: true
                }
            ]
        };
        this.status = {
            isopen: false
        };
        this.disabled = false;

        this.statusOptions = [
            {
                value: 'Open',
                label: 'Open'
            }, {
                value: 'Qualifying',
                label: 'Qualifying'
            }, {
                value: 'Negotiating',
                label: 'Negotiating'
            }, {
                value: 'TRIGGER',
                label: 'TRIGGER'
            }
        ];

        this.quickNoteReferences = {};
        this.quickNoteOptions = {
            triggers: {
                tags: '@',
                references: '#'
            },
            options: {
                tags: ['Test', 'Test'],
                references: ['Test', 'Test']
            }
        };
    }

    updateSearch() {
        this.deferredAutocompleteData.options = this.updateDataInPicker();
    }

    updateDataInPicker() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.stateObjOptions);
            }, 1500);
        });
    }

    save(form, data) {
        form.hideCompletedFields();
        console.log('FormDemo (data):', data); // eslint-disable-line
    }
}

@Component({
    selector: 'picker-custom-null-results',
    template: '<p class="picker-null">No results match your search (custom).</p>'
})
export class PickerCustomNullResults {
}

@Component({
    selector: 'picker-custom-error',
    template: '<p class="picker-error">There was an error (custom).</p>'
})
export class PickerCustomErrorTemplate {
}

@Component({
    selector: 'picker-custom-loader',
    template: '<p class="picker-loading">Loading... (custom)</p>'
})
export class PickerCustomLoadTemplate {
}

@Component({
    selector: 'picker-custom-null-recents',
    template: '<p class="picker-null-recents">No recent results (custom)</p>'
})
export class PickerCustomNoRecentsTemplate {
}
