// NG
import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
// App
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { Helpers } from '../../utils/Helpers';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoFormGroup } from './NovoFormGroup';

@Component({
  selector: 'novo-form',
  template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header *ngIf="!hideHeader">
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-content></ng-content>
      </form>
    </div>
  `,
  providers: [NovoTemplateService],
})
export class NovoFormElement implements AfterContentInit, OnInit {
  @Input()
  form: NovoFormGroup;
  @Input()
  layout: string;
  @Input()
  hideHeader: boolean = false;

  @ContentChildren(NovoTemplate)
  customTemplates: QueryList<NovoTemplate>;

  public showingAllFields: boolean = false;
  public showingRequiredFields: boolean = true;

  constructor(private templates: NovoTemplateService) {}

  get value() {
    return this.form.getRawValue();
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnInit() {
    this.form.layout = this.layout;
  }

  ngAfterContentInit() {
    if (this.customTemplates && this.customTemplates.length) {
      this.customTemplates.forEach((template: any) => {
        this.templates.addCustom(template.name, template.template);
      });
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
      if (hideRequiredWithValue && !Helpers.isBlank(this.form.getRawValue()[key])) {
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
      const control: any = this.form.controls[key];
      if (control.required && Helpers.isBlank(this.form.getRawValue()[control.key])) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }
}
