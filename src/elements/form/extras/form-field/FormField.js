import { Component, ViewContainerRef, ComponentResolver, ViewChild, EventEmitter, ElementRef } from '@angular/core';

import { FormLabelMeta, FormInput } from '../FormExtras';

@Component({
    selector: 'form-field',
    inputs: [
        'name',
        'data',
        'value'
    ],
    template: `
        <ng-content></ng-content>
    `,
    host: {
        '[attr.data-automation-id]': 'name'
    }
})
export class FormField {
    constructor(el:ElementRef) {
        this.element = el;
    }
}

@Component({
    selector: 'form-field',
    template: `
        <ref #field></ref>
    `,
    host: {
        '[attr.data-automation-id]': 'name',
        '[hidden]': 'data.type==="hidden" || hidden'
    }
})
export class FormFieldMeta {
    @ViewChild('field', { read: ViewContainerRef }) field:ViewContainerRef;

    constructor(componentResolver:ComponentResolver, el:ElementRef) {
        this.componentResolver = componentResolver;
        this.element = el;
        this.valueChange = new EventEmitter();
    }

    ngOnInit() {
        if (this.data) {
            this.name = this.data.name;
            this.componentResolver.resolveComponent(FormLabelMeta)
                .then(labelComponentFactory => {
                    let labelRef = this.field.createComponent(labelComponentFactory);
                    labelRef.instance.text = this.data.label;
                    this.componentResolver.resolveComponent(FormInput)
                        .then(inputComponentFactory => {
                            let inputRef = this.field.createComponent(inputComponentFactory);
                            inputRef.instance.name = this.data.name;
                            inputRef.instance.type = this.data.type;
                            inputRef.instance.required = this.data.required;
                            inputRef.instance.options = this.data.options;
                            inputRef.instance.multiple = this.data.multiValue;
                            inputRef.instance.placeholder = this.data.hint || this.data.label || '';
                            inputRef.instance.inline = true;
                            inputRef.instance.value = this.value;
                            inputRef.instance.valueChange.subscribe((newValue) => {
                                this.valueChange.emit({
                                    name: this.data.name,
                                    value: newValue
                                });
                            });

                            if (this.data.optionsUrl && !this.data.options) {
                                inputRef.instance.options = [];
                            }
                            if (this.data.currencyFormat) {
                                inputRef.instance.currencyFormat = this.data.currencyFormat;
                            }
                            if (this.data.references) {
                                inputRef.instance.referneces = this.data.references;
                            }
                        });
                });
        }
    }
}
