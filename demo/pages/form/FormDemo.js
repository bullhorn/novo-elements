import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NovoDynamicForm } from './../../../src/elements/form/DynamicForm';
import { EntityPickerResults } from './../../../src/elements/picker/extras/entity-picker-results/EntityPickerResults';

import { Router } from '@angular/router';

export class ControlBase {
    constructor(config = {}) {
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
        this.order = config.order === undefined ? 1 : config.order;
        this.controlType = config.controlType || '';
        this.placeholder = config.placeholder || '';
        this.config = config.config || null;
        this.multiple = !!config.multiple;
        this.headerConfig = config.headerConfig || null;
    }
}

export class TextboxControl extends ControlBase {
    controlType = 'textbox';

    constructor(config = {}) {
        super(config);
        this.type = config.type || '';
    }
}

export class DropdownControl extends ControlBase {
    controlType = 'dropdown';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}

export class SelectControl extends ControlBase {
    controlType = 'select';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || 'Select One';
    }
}

export class TilesControl extends ControlBase {
    controlType = 'tiles';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}

export class PickerControl extends ControlBase {
    controlType = 'picker';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}

@Component({
    selector: 'form-demo',
    template: `
        <h1>FORM!</h1>
        <div style="padding: 20px;">
                <p *ngIf="error">MISSING REQ FIELDS ERROR</p>
        <novo-dynamic-form [controls]="questions" [(form)]="form" #test></novo-dynamic-form>
        <button (click)="test.showAllFields()">Show All Fields</button>
        <button (click)="submit(test)">Submit</button>
        <br>
        <p>Value: {{form.value | json}}</p>
        <p>Valid: {{form.valid}}</p>
        <p>ONLY CHANGED VALUES: {{test.value | json}}</p>
</div>
    `,
    directives: [NovoDynamicForm]
})
export class FormDemo {
    constructor(router:Router) {
        this.questions = this.getQuestions();
        this.router = router;
    }

    ngOnInit() {
        this.form = this.toFormGroup(this.getQuestions());
        console.log(this.router.routerState.snapshot.queryParams["test"])
    }

    submit(form) {
        this.error = !this.form.valid;
        form.showOnlyRequired(true);
    }

    getQuestions() {
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

        let questions = [
            new DropdownControl({
                key: 'brave',
                label: 'Bravery Rating',
                // hidden: true,
                options: [
                    { key: 'solid', value: 'Solid' },
                    { key: 'great', value: 'Great' },
                    { key: 'good', value: 'Good' },
                    { key: 'unproven', value: 'Unproven' }
                ],
                order: 3
            }),

            new TextboxControl({
                key: 'firstName',
                label: 'First name',
                required: true,
                order: 1
            }),

            new TextboxControl({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                // hidden: true,
                order: 2
            }),

            new TilesControl({
                key: 'tiles',
                label: 'Test',
                required: true,
                options: [
                    { value: 'solid', label: 'Solid' },
                    { value: 'great', label: 'Great' },
                    { value: 'good', label: 'Good' },
                    { value: 'unproven', label: 'Unproven' }
                ],
                order: 4
            }),

            new PickerControl({
                key: 'picker',
                label: 'Picker',
                required: true,
                placeholder: 'PICK ONE',
                config: {
                    options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                        'West Virginia', 'Wisconsin', 'Wyoming']
                },
                order: 5
            }),

            new PickerControl({
                key: 'entity',
                label: 'Entity',
                required: true,
                placeholder: 'PICK ONE!!!',
                config: {
                    options: contactOptions,
                    field: 'name',
                    resultsTemplate: EntityPickerResults
                },
                order: 6
            }),

            new PickerControl({
                key: 'pickerMulti',
                label: 'Picker Multi',
                required: true,
                placeholder: 'PICK ONE',
                config: {
                    options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                        'West Virginia', 'Wisconsin', 'Wyoming']
                },
                multiple: true,
                order: 7
            }),

            new PickerControl({
                key: 'entityMulti',
                label: 'Entity Multi',
                required: true,
                placeholder: 'PICK ONE!!!',
                config: {
                    options: contactOptions,
                    field: 'name',
                    resultsTemplate: EntityPickerResults
                },
                multiple: true,
                order: 8
            }),

            new SelectControl({
                key: 'select',
                label: 'Select',
                required: true,
                options: [
                    { value: 'Open', label: 'Open' },
                    { value: 'Qualifying', label: 'Qualifying' },
                    { value: 'Negotiating', label: 'Negotiating' },
                    { value: 'TRIGGER', label: 'TRIGGER' }
                ],
                order: 9
            })
        ];
        return questions.sort((a, b) => a.order - b.order);
    }

    toFormGroup(controls) {
        let group:any = {};
        controls.forEach(control => {
            group[control.key] = control.required ? new FormControl(control.value || '', Validators.required) : new FormControl(control.value || '');
        });
        return new FormGroup(group);
    }
}
