import { Component, ContentChildren, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
// App
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
@Component({
  selector: 'novo-control-templates',
  template: `
        <ng-template novoTemplate="textbox" type="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container novo-control-input-with-label" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition">
            <!--<input [formControlName]="control?.key" [id]="control?.key" [type]="control?.type" [placeholder]="control?.placeholder" [maxlength]="control?.maxlength" autocomplete>-->
            <input *ngIf="control?.type !== 'number'" [class.maxlength-error]="errors?.maxlength" [formControlName]="control.key" [id]="control.key" [type]="controls?.type" [placeholder]="control?.placeholder" (input)="methods.emitChange($event)" [maxlength]="control?.maxlength" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" autocomplete>
            <input *ngIf="control?.type === 'number' && control?.subType !== 'percentage'" [class.maxlength-error]="errors?.maxlength" [formControlName]="control.key" [id]="control.key" [type]="controls?.type" [placeholder]="control?.placeholder" (keydown)="methods.restrictKeys($event)" (input)="methods.emitChange($event)" [maxlength]="control?.maxlength" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" step="any" (mousewheel)="numberInput.blur()" #numberInput>
            <input *ngIf="control?.type === 'number' && control?.subType === 'percentage'" [type]="control?.type" [placeholder]="control?.placeholder" (keydown)="methods.restrictKeys($event)" [value]="percentValue" (input)="methods.handlePercentChange($event)" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" step="any" (mousewheel)="percentInput.blur()" #percentInput>
            <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
            <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
          </div>
        </ng-template>
        <ng-template novoTemplate="test" type="test">
          <h4><i class="bhi-search-question"></i>Test</h4>
        </ng-template>
    `,
})
export class NovoControlTemplates implements AfterViewInit {
  @ViewChildren(NovoTemplate) defaultTemplates: QueryList<NovoTemplate>;
  constructor(private templates: NovoTemplateService) {
    console.log('Constructor for NovoControlTemplates')
  }

  ngAfterViewInit(): void {
    if (this.defaultTemplates && this.defaultTemplates.length) {
      this.defaultTemplates.forEach((template: any) => {
        this.templates.add(template.type, template.template);
        console.log('this.defaultTemplates', this.defaultTemplates);
      });
      // this.templates.addAll(this.defaultTemplates);
    }
  }
}
