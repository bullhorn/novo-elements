import { Component, ViewContainerRef, ComponentResolver, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { isBlank } from '@angular/core/src/facade/lang';

import { FormField, FormFieldMeta, FormLabel, FormInput } from './extras/FormExtras';

@Component({
    selector: 'novo-form',
    inputs: [
        'name',
        'meta',
        'data'
    ],
    outputs: ['changed'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <div class="novo-form-container">
            <header>
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <form autocomplete="false">
                <ref #form></ref>
                <ng-content></ng-content>
            </form>
        </div>
    `
})
export class Form {
    @ViewChild('form', { read: ViewContainerRef }) form:ViewContainerRef;

    constructor(componentResolver:ComponentResolver, el:ElementRef) {
        this.componentResolver = componentResolver;
        this.element = el;
        this.data = {};
        this.fields = [];
        this.changed = new EventEmitter();
    }

    hideCompletedFields() {
        for (let field of this.fields) {
            let name = field.data.name;
            let required = field.data.required;
            let data = this.data[name];

            if ((data && required) || !required) {
                field.hidden = true;
            }
        }
    }

    showAllFields() {
        for (let field of this.fields) {
            field.hidden = false;
        }
    }

    ngOnInit() {
        if (this.meta) {
            this.meta.fields.forEach(field => {
                let initialValue = (this.data && !isBlank(this.data[field.name])) ? this.data[field.name] : (field.defaultValue || null);

                if (!isBlank(initialValue)) {
                    this.data[field.name] = initialValue;
                }

                this.componentResolver.resolveComponent(FormFieldMeta)
                    .then(componentFactory => {
                        let componentRef = this.form.createComponent(componentFactory);

                        this.fields.push(componentRef.instance);
                        componentRef.instance.data = field;
                        componentRef.instance.value = initialValue;
                        componentRef.instance.valueChange.subscribe((event) => {
                            field.dirty = true;
                            if (event.value === undefined) {
                                delete this.data[event.name];
                            } else {
                                this.data[event.name] = event.value;
                            }
                            this.changed.emit(this.data);
                        });
                    });
            });
        }
    }
}

export const NOVO_FORM_ELEMENTS = [Form, FormField, FormLabel, FormInput];
