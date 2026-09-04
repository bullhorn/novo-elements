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
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoTemplate, NovoTheme } from 'novo-elements/elements/common';
// App
import { Helpers } from 'novo-elements/utils';
import { NovoFieldset } from './FormInterfaces';
import { NovoFormGroup } from './NovoFormGroup';

@Component({
    selector: 'novo-fieldset-header',
    template: `
    @if (cardSection) {
      @if (icon) {
        <novo-icon>{{ cardIcon }}</novo-icon>
      }
      <span>{{ title }}</span>
    } @else {
      <novo-title smaller>
        <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
        >{{ title }}
      </novo-title>
    }
    <ng-content />
  `,
    styleUrls: ['./fieldset-header.scss'],
    host: {
        class: 'novo-fieldset-header',
    },
    standalone: false,
})
export class NovoFieldsetHeaderElement {
  @Input()
  title: string;
  @Input()
  icon: string = 'section';
  @Input()
  cardSection = false;

  get cardIcon(): string {
    const stripped = this.icon?.replace('bhi-', '') || '';
    return stripped === 'section' ? 'edit-circle' : stripped;
  }
}

@Component({
    selector: 'novo-fieldset',
    template: `
    <div class="novo-fieldset-container" [class.card-section]="cardSection">
      @if (title) {
        <novo-fieldset-header
          [icon]="icon"
          [title]="title"
          [cardSection]="cardSection"
          [class.embedded]="isEmbedded"
          [class.inline-embedded]="isInlineEmbedded"
          [class.hidden]="hidden"
        ></novo-fieldset-header>
      }
      <ng-container *ngFor="let control of controls; let controlIndex = index">
        <div *ngIf="control.__type !== 'GroupedControl'" class="novo-form-row" [class.disabled]="control.disabled" [class.hidden]="control.hidden">
          <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
        </div>
      </ng-container>
    </div>
  `,
    standalone: false,
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
  @Input()
  cardSection = false;
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
        <novo-fieldset
          *ngFor="let fieldset of visibleFieldsets; let i = index"
          [index]="i"
          [autoFocus]="autoFocusFirstField"
          [icon]="fieldset.icon"
          [controls]="fieldset.controls"
          [title]="fieldset.title"
          [form]="form"
          [isEmbedded]="fieldset.isEmbedded"
          [isInlineEmbedded]="fieldset.isInlineEmbedded"
          [hidden]="fieldset.hidden"
          [cardSection]="effectiveCardSections()"
        ></novo-fieldset>
      </form>
    </div>
  `,
    styleUrls: ['./Form.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NovoTemplateService],
    standalone: false,
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
  readonly hasCardSections = input<boolean | undefined>(undefined);
  @ContentChildren(NovoTemplate)
  customTemplates: QueryList<NovoTemplate>;
  private fieldsAlreadyHidden: string[];

  allFieldsRequired = false;
  allFieldsNotRequired = false;
  showingAllFields = false;
  showingRequiredFields = true;
  numControls = 0;

  private readonly theme = inject(NovoTheme);

  readonly effectiveCardSections = computed(() => {
    const override = this.hasCardSections();
    if (override !== undefined) {
      return override;
    }
    if (!this.theme.isBh2026()) {
      return false;
    }
    return !this.element.nativeElement.closest('novo-modal-container, slide-out');
  });

  get visibleFieldsets(): NovoFieldset[] {
    if (!this.effectiveCardSections()) {
      return this.form?.fieldsets?.filter((fieldset) => fieldset.controls.length) ?? [];
    }
    return this.form?.fieldsets?.filter((fieldset) => fieldset.controls.length && this.hasVisibleControls(fieldset)) ?? [];
  }

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

  public hasVisibleControls(fieldset: NovoFieldset): boolean {
    return fieldset.controls.some((control) => {
      const formControl = this.form.controls[control.key];
      return formControl && !formControl.hidden;
    });
  }

  public showAllFields(): void {
    this.form.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        const formControl = this.form.controls[control.key];
        if (!this.fieldsAlreadyHidden?.includes(control.key)) {
          formControl.hidden = false;
          control.hidden = false;
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
        const formControl = this.form.controls[control.key];

        if (formControl.hidden) {
          this.fieldsAlreadyHidden.push(control.key);
        }

        if (!control.required) {
          formControl.hidden = true;
          control.hidden = true;
        }

        if (
          hideRequiredWithValue &&
          !Helpers.isBlank(this.form.getRawValue()[control.key]) &&
          (!control.isEmpty || (control.isEmpty && control.isEmpty(formControl)))
        ) {
          formControl.hidden = true;
          control.hidden = true;
        }

        if (formControl.errors) {
          formControl.hidden = false;
          control.hidden = false;
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
