// NG2
import { Component, Input, OnInit } from '@angular/core';
// APP
import { NovoFormGroup } from './FormInterfaces';
import { Helpers } from '../../utils/Helpers';

@Component({
    selector: 'novo-form',
    template: `
        <div class="novo-form-container">
            <header *ngIf="!hideHeader">
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <novo-tiles [options]="fieldOptions" (onChange)="fieldSelect($event)"></novo-tiles>
            <i class="bhi-publish" (click)="topFunction()" id="scrollTopButton"></i>
            <form class="novo-form" [formGroup]="form">
                <ng-content></ng-content>
            </form>

        </div>
    `
})
export class NovoFormElement implements OnInit {
    @Input() form: NovoFormGroup;
    @Input() layout: string;
    @Input() hideHeader: boolean = false;

    public showingAllFields: boolean = false;
    public showingRequiredFields: boolean = true;
    public fieldOptions: any = [{
        label: 'All Fields',
        value: 'all',
      }, {
        label: 'Required Fields',
        value: 'required'}, ];

    ngOnInit() {
        this.form.layout = this.layout;
    }

    get value() {
        return this.form.getRawValue();
    }

    get isValid() {
        return this.form.valid;
    }

    public topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    public fieldSelect(data) {
        if (data === 'required') {
           this.showOnlyRequired(true);
        } else {
            this.showAllFields();
        }
    }
    public showAllFields(): void {
        Object.keys(this.form.controls).forEach((key: string) => {
            this.form.controls[key].hidden = false;
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }

    public showOnlyRequired(hideRequiredWithValue): void {
        Object.keys(this.form.controls).forEach((key: string) => {
            // Hide any non-required fields
            if (!this.form.controls[key].required) {
                this.form.controls[key].hidden = true;
            }

            // Hide required fields that have been successfully filled out
            if (hideRequiredWithValue && !Helpers.isBlank(this.form.value[key])) {
                this.form.controls[key].hidden = true;
            }

            // Don't hide fields with errors
            if (this.form.controls[key].errors) {
                this.form.controls[key].hidden = false;
            }
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    }

    public forceValidation(): void {
        Object.keys(this.form.controls).forEach((key: string) => {
            let control: any = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
