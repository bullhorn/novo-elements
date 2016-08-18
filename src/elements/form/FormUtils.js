// NG2
import { FormGroup, FormControl } from '@angular/forms';
// APP
import {
    AddressControl,
    CheckListControl,
    CheckboxControl,
    DateControl,
    DateTimeControl,
    EditorControl,
    NativeSelectControl,
    PickerControl,
    QuickNoteControl,
    RadioControl,
    SelectControl,
    TextAreaControl,
    TextBoxControl,
    TilesControl,
    TimeControl
} from './FormControls';
import { EntityPickerResults } from './../picker/extras/entity-picker-results/EntityPickerResults';

export class NovoFormUtils {
    static toFormGroup(controls) {
        let group:any = {};
        controls.forEach(control => {
            group[control.key] = control.validators.length > 0 ? new FormControl(control.value || '', control.validators) : new FormControl(control.value || '');
        });
        return new FormGroup(group);
    }

    static toControls() {
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
        return [
            new QuickNoteControl({
                key: 'quick-note',
                label: 'Quick Note',
                config: {
                    triggers: {
                        tags: '@',
                        references: '#'
                    },
                    options: {
                        tags: ['Test', 'Test'],
                        references: ['Test', 'Test']
                    }
                }
            }),

            new CheckboxControl({
                key: 'checkbox',
                label: 'Checkbox'
            }),

            new CheckListControl({
                key: 'checklist',
                label: 'Check List',
                options: ['One', 'Two', 'Three']
            }),

            new TimeControl({
                key: 'time',
                label: 'Time'
            }),

            new DateControl({
                key: 'date',
                label: 'Date'
            }),

            new DateTimeControl({
                key: 'datetime',
                label: 'DateTime'
            }),

            new RadioControl({
                key: 'radio',
                label: 'Basic Radio',
                options: [
                    { key: 'yes', value: 'Yes' },
                    { key: 'no', value: 'No' }
                ]
            }),

            new NativeSelectControl({
                key: 'native-select',
                label: 'Basic Select',
                placeholder: 'Select One',
                // hidden: true,
                options: [
                    { key: 'solid', value: 'Solid' },
                    { key: 'great', value: 'Great' },
                    { key: 'good', value: 'Good' },
                    { key: 'unproven', value: 'Unproven' }
                ],
                order: 3
            }),

            new TextBoxControl({
                key: 'firstName',
                label: 'Basic Text',
                required: true,
                order: 1
            }),

            new TextBoxControl({
                key: 'emailAddress',
                label: 'Basic Email',
                type: 'email',
                placeholder: 'PLACEHOLDER',
                // hidden: true,
                order: 2
            }),

            new TextBoxControl({
                key: 'number',
                label: 'Basic Number',
                type: 'number',
                placeholder: 'PLACEHOLDER',
                // hidden: true,
                order: 2
            }),

            new TextBoxControl({
                key: 'float',
                label: 'Basic Float',
                type: 'float',
                placeholder: 'PLACEHOLDER',
                // hidden: true,
                order: 2
            }),

            new TextBoxControl({
                key: 'currency',
                label: 'Basic Currency',
                type: 'currency',
                placeholder: 'PLACEHOLDER',
                currencyFormat: 'USD',
                // hidden: true,
                order: 2
            }),

            new TextBoxControl({
                key: 'percentage',
                label: 'Basic Percentage',
                type: 'percentage',
                placeholder: 'PLACEHOLDER',
                // hidden: true,
                order: 2
            }),

            new TextAreaControl({
                key: 'text-area',
                label: 'Text Area',
                placeholder: 'TYPE IN ME',
                order: 2
            }),

            new EditorControl({
                key: 'editor',
                label: 'Editor',
                order: 20
            }),

            new TilesControl({
                key: 'tiles',
                label: 'Tiles',
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
            }),

            new AddressControl({
                key: 'address',
                label: 'Address',
                order: 20,
                required: true
            })
        ];
    }
}
