// NG
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { Helpers } from './../../utils/Helpers';
import { NovoFieldset } from './FormInterfaces';
import { NovoFormGroup } from './NovoFormGroup';

@Component({
  selector: 'novo-fieldset-header',
  template: `
    <novo-title smaller>
      <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
      >{{ title }}
    </novo-title>
  `,
  host: {
    class: 'novo-fieldset-header',
  },
})
export class NovoFieldsetHeaderElement {
  @Input()
  title: string;
  @Input()
  icon: string = 'section';
}

@Component({
  selector: 'novo-fieldset',
  template: `
    <div class="novo-fieldset-container">
      <novo-fieldset-header
        [icon]="icon"
        [title]="title"
        *ngIf="title"
        [class.embedded]="isEmbedded"
        [class.inline-embedded]="isInlineEmbedded"
        [class.hidden]="hidden"
      ></novo-fieldset-header>
      <ng-container *ngFor="let control of controls; let controlIndex = index">
        <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="control.__type !== 'GroupedControl'">
          <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
        </div>
        <div *ngIf="control.__type === 'GroupedControl'">TODO - GroupedControl</div>
      </ng-container>
    </div>
  `,
})
export class NovoFieldsetElement {
  @Input()
  controls: Array<any> = [];
  @Input()
  form: any;
  @Input()
  title: string;
  @Input()
  icon: string;
  @Input()
  index: number;
  @Input()
  autoFocus: boolean;
  @Input()
  isEmbedded = false;
  @Input()
  isInlineEmbedded = false;
  @Input()
  hidden = false;
}

@Component({
  selector: 'novo-dynamic-form',
  template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header>
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-container *ngFor="let fieldset of form.fieldsets; let i = index">
          <novo-fieldset
            *ngIf="fieldset.controls.length"
            [index]="i"
            [autoFocus]="autoFocusFirstField"
            [icon]="fieldset.icon"
            [controls]="fieldset.controls"
            [title]="fieldset.title"
            [form]="form"
            [isEmbedded]="fieldset.isEmbedded"
            [isInlineEmbedded]="fieldset.isInlineEmbedded"
            [hidden]="fieldset.hidden"
          ></novo-fieldset>
        </ng-container>
      </form>
    </div>
  `,
  providers: [NovoTemplateService],
})
export class NovoDynamicFormElement implements OnChanges, OnInit, AfterContentInit {
  @Input()
  controls: Array<any> = [];
  @Input()
  fieldsets: Array<NovoFieldset> = [];
  @Input()
  form: NovoFormGroup;
  @Input()
  layout: string;
  @Input()
  hideNonRequiredFields: boolean = true;
  @Input()
  autoFocusFirstField: boolean = false;
  @ContentChildren(NovoTemplate)
  customTemplates: QueryList<NovoTemplate>;
  private fieldsAlreadyHidden: string[];

  allFieldsRequired = false;
  allFieldsNotRequired = false;
  showingAllFields = false;
  showingRequiredFields = true;
  numControls = 0;

  constructor(private element: ElementRef, private templates: NovoTemplateService) {}

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    this.form.layout = this.layout;

    if (!(this.fieldsets && this.fieldsets.length) && this.controls && this.controls.length) {
      this.fieldsets = [
        {
          controls: this.controls,
        },
      ];
      this.numControls = this.controls.length;
    } else if (this.fieldsets) {
      this.fieldsets.forEach((fieldset) => {
        this.numControls = this.numControls + fieldset.controls.length;
      });
    }

    const requiredFields: Array<any> = [];
    const nonRequiredFields: Array<any> = [];
    this.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        if (control.required) {
          requiredFields.push(control);
        } else {
          nonRequiredFields.push(control);
        }
      });
    });
    this.allFieldsRequired = requiredFields.length === this.numControls;
    this.allFieldsNotRequired = nonRequiredFields.length === this.numControls;
    if (this.allFieldsNotRequired && this.hideNonRequiredFields) {
      this.fieldsets.forEach((fieldset) => {
        fieldset.controls.forEach((control) => {
          this.form.controls[control.key].hidden = false;
        });
      });
    }
    this.form.fieldsets = [...this.fieldsets];
  }

  ngAfterContentInit() {
    if (this.customTemplates && this.customTemplates.length) {
      this.customTemplates.forEach((template: any) => {
        this.templates.addCustom(template.name, template.template);
      });
    }
  }

  public showAllFields(): void {
    this.form.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        const ctl = this.form.controls[control.key];
        if (!this.fieldsAlreadyHidden.includes(control.key)) {
          ctl.hidden = false;
        }
      });
    });
    this.showingAllFields = true;
    this.showingRequiredFields = false;
  }

  public showOnlyRequired(hideRequiredWithValue): void {
    this.fieldsAlreadyHidden = [];
    this.form.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        const ctl = this.form.controls[control.key];

        if (ctl.hidden) {
          this.fieldsAlreadyHidden.push(control.key);
        }

        // Hide any non-required fields
        if (!control.required) {
          ctl.hidden = true;
        }

        // Hide required fields that have been successfully filled out
        if (
          hideRequiredWithValue &&
          !Helpers.isBlank(this.form.getRawValue()[control.key]) &&
          (!control.isEmpty || (control.isEmpty && control.isEmpty(ctl)))
        ) {
          ctl.hidden = true;
        }

        // Don't hide fields with errors
        if (ctl.errors) {
          ctl.hidden = false;
        }
      });
    });
    this.showingAllFields = false;
    this.showingRequiredFields = true;
    this.forceValidation();
  }

  get values() {
    return this.form ? this.form.getRawValue() : null;
  }

  get isValid() {
    return this.form ? this.form.valid : false;
  }

  public updatedValues(): any {
    let ret = null;
    this.form.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        if (this.form.controls[control.key].dirty || control.dirty) {
          if (!ret) {
            ret = {};
          }
          ret[control.key] = this.form.getRawValue()[control.key];
        }
      });
    });
    return ret;
  }

  public forceValidation(): void {
    Object.keys(this.form.controls).forEach((key: string) => {
      const control: any = this.form.controls[key];
      if (control.required && Helpers.isBlank(this.form.getRawValue()[control.key])) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }
}
