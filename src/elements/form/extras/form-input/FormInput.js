import { Component, ViewContainerRef, ComponentResolver, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import {
    AddressInput,
    CheckBox,
    CheckList,
    ChipsInput,
    DateInput,
    DateTimeInput,
    EntityInput,
    EntityChipsInput,
    HiddenInput,
    NumberInput,
    PickerInput,
    RadioInput,
    SelectInput,
    TextArea,
    TextInput,
    TimeInput,
    CurrencyInput,
    PercentInput,
    FloatInput
} from '../FormExtras';

@Component({
    selector: 'form-input',
    inputs: [
        'name',
        'type',
        'placeholder',
        'inline',
        'multiple',
        'required',
        'options',
        'value',
        'label',
        'currencyFormat'
    ],
    outputs: [
        'broadcast',
        'valueChange'
    ],
    directives: [COMMON_DIRECTIVES],
    template: '<ref #container></ref>'
})
export class FormInput {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(componentResolver:ComponentResolver, el:ElementRef) {
        this.componentResolver = componentResolver;
        this.element = el;
        this.broadcast = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.componentRef = null;
    }

    // This hook allows 2-way data-binding on child elements
    ngOnChanges() {
        if (this.componentRef) {
            if (this.componentRef.instance.hasOwnProperty('options')) {
                this.componentRef.instance.options = this.options;
            }
        }
    }

    ngOnInit() {
        const FieldTypes = {
            text: TextInput,
            textarea: TextArea,
            radio: RadioInput,
            checkbox: CheckBox,
            checklist: CheckList,
            date: DateInput,
            hidden: HiddenInput,
            number: NumberInput,
            time: TimeInput,
            datetime: DateTimeInput,
            select: SelectInput,
            address: AddressInput,
            picker: PickerInput,
            chips: ChipsInput,
            entity: EntityInput,
            entitychips: EntityChipsInput,
            percentage: PercentInput,
            money: CurrencyInput,
            float: FloatInput
        };

        if (this.type === 'checkbox' && this.options) {
            this.type = 'checklist';
        } else if (this.type === 'picker' && this.multiple) {
            this.type = 'chips';
        } else if (this.type === 'entity' && this.multiple) {
            this.type = 'entitychips';
        }

        const component = FieldTypes[this.type];
        if (component) {
            this.componentResolver.resolveComponent(component)
                .then(componentFactory => {
                    this.componentRef = this.container.createComponent(componentFactory);
                    this.componentRef.instance.name = this.name;
                    this.componentRef.instance.required = this.required;
                    this.componentRef.instance.placeholder = this.placeholder || '';
                    this.componentRef.instance.value = this.value;
                    this.componentRef.instance.label = this.label;
                    this.componentRef.instance.update = this.valueChange;
                    if (this.options) {
                        this.componentRef.instance.options = this.options;
                    }
                    if (this.inline) {
                        this.componentRef.instance.inline = this.inline;
                    }
                    if (this.broadcast) {
                        this.componentRef.instance.broadcast = this.broadcast;
                    }
                    if (this.currencyFormat) {
                        this.componentRef.instance.currencyFormat = this.currencyFormat;
                    }
                });
        } else {
            console.error(`Unable to find a field of type: ${this.type}!`); // eslint-disable-line
        }
    }
}
