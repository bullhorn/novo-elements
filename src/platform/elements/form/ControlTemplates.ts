import { Component, ContentChildren, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
// App
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
@Component({
  selector: 'novo-control-templates',
  template: `
        <!---Readonly--->
        <ng-template novoTemplate="read-only" let-form="form" let-control>
          <div>{{ form.value[control.key] }}</div>
        </ng-template>
        <!--Textbox--->
        <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container novo-control-input-with-label" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition"  [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline">
            <input *ngIf="control?.type !== 'number'" [class.maxlength-error]="errors?.maxlength" [formControlName]="control.key" [id]="control.key" [type]="control?.type" [placeholder]="control?.placeholder" (input)="methods.emitChange($event)" [maxlength]="control?.maxlength" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" autocomplete>
            <input *ngIf="control?.type === 'number' && control?.subType !== 'percentage'" [class.maxlength-error]="errors?.maxlength" [formControlName]="control.key" [id]="control.key" [type]="control?.type" [placeholder]="control?.placeholder" (keydown)="methods.restrictKeys($event)" (input)="methods.emitChange($event)" [maxlength]="control?.maxlength" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" step="any" (mousewheel)="numberInput.blur()" #numberInput>
            <input *ngIf="control?.type === 'number' && control?.subType === 'percentage'" [type]="control?.type" [placeholder]="control?.placeholder" (keydown)="methods.restrictKeys($event)" [value]="control?.percentValue" (input)="methods.handlePercentChange($event)" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" step="any" (mousewheel)="percentInput.blur()" #percentInput>
            <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
            <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
          </div>
        </ng-template>

        <!--Textarea--->
        <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <textarea [class.maxlength-error]="errors?.maxlength" [name]="control.key" [attr.id]="control.key" [placeholder]="control.placeholder" [formControlName]="control.key" autosize (input)="methods.handleTextAreaInput($event)" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" [maxlength]="control?.maxlength" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition"  [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline"></textarea>
          </div>
        </ng-template>

        <!--Editor-->
        <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-editor [name]="control.key" [formControlName]="control.key" [startupFocus]="control.startupFocus" [minimal]="control.minimal" [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)"></novo-editor>
          </div>
        </ng-template>

        <!--AceEditor-->
        <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-ace-editor [name]="control.key" [formControlName]="control.key" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)"></novo-ace-editor>
          </div>
        </ng-template>

        <!--HTML5 Select-->
        <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <select [id]="control.key" [formControlName]="control.key" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition"  [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline">
                <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
                <option *ngFor="let opt of control.options" [value]="opt.key">{{opt.value}}</option>
            </select>
          </div>
        </ng-template>

        <!--File-->
        <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-file-input [formControlName]="control.key" [id]="control.key" [name]="control.key" [placeholder]="control.placeholder" [value]="control.value" [multiple]="control.multiple" [layoutOptions]="control.layoutOptions" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition"  [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" (edit)="methods.handleEdit($event)" (save)="methods.handleSave($event)" (delete)="methods.handleDelete($event)" (upload)="methods.handleUpload($event)"></novo-file-input>
          </div>
        </ng-template>

        <!--Tiles-->
        <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-tiles [options]="control.options" [formControlName]="control.key" (onChange)="methods.modelChange($event)" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition"  [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" [controlDisabled]="control.disabled"></novo-tiles>
          </div>
        </ng-template>

        <!--Picker-->
        <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container">
            <novo-picker [config]="control.config" [formControlName]="control.key" [placeholder]="control.placeholder" [parentScrollSelector]="control.parentScrollSelector" *ngIf="!control.multiple" (select)="methods.modelChange($event);" (changed)="methods.modelChangeWithRaw($event)" (typing)="methods.handleTyping($event)" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline"></novo-picker>
            <chips [source]="control.config" [type]="control.config.type" [formControlName]="control.key" [placeholder]="control.placeholder" *ngIf="control.multiple" [closeOnSelect]="control.closeOnSelect" (changed)="methods.modelChangeWithRaw($event)" (typing)="methods.handleTyping($event)" (focus)="methods.handleFocus($event)" (blur)="methods.handleBlur($event)" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline"></chips>
          </div>
        </ng-template>

        <!--Novo Select-->
        <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-select [options]="control.options" [headerConfig]="control.headerConfig" [placeholder]="control.placeholder" [formControlName]="control.key" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" (onSelect)="methods.modelChange($event)"></novo-select>
          </div>
        </ng-template>

        <!--Radio-->
        <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container">
            <novo-radio [vertical]="vertical" [name]="control.key" [formControlName]="control.key" *ngFor="let option of control.options" [value]="option.value" [label]="option.label" [checked]="option.value === form.value[control.key]" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" [button]="!!option.icon" [icon]="option.icon" [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"></novo-radio>
          </div>
        </ng-template>

        <!--Time-->
        <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline">
          <novo-time-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [placeholder]="control.placeholder" [military]="control.military"></novo-time-picker-input>
          </div>
        </ng-template>

        <!--Date-->
        <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline">
            <novo-date-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [format]="control.dateFormat" [allowInvalidDate]="control.allowInvalidDate" [textMaskEnabled]="control.textMaskEnabled" [placeholder]="control.placeholder" (focusEvent)="methods.handleFocus($event)" (blurEvent)="methods.handleBlur($event)"></novo-date-picker-input>
          </div>
        </ng-template>


        <!--Date and Time-->
        <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form" class="novo-control-input-container" [tooltip]="control.tooltip" [tooltipPosition]="control.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline">
            <novo-date-time-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [placeholder]="control.placeholder" [military]="control.military" (focusEvent)="methods.handleFocus($event)" (blurEvent)="methods.handleBlur($event)"></novo-date-time-picker-input>
          </div>
        </ng-template>

        <!--Address-->
        <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-address [formControlName]="control.key" [config]="control?.config" (change)="methods.handleAddressChange($event)" (focus)="methods.handleFocus($event.event, $event.field)" (blur)="methods.handleBlur($event.event, $event.field)"  (validityChange)="methods.updateValidity()" (focusEvent)="handleFocus($event)" (blurEvent)="handleBlur($event)"></novo-address>
          </div>
        </ng-template>

        <!--Checkbox-->
        <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-checkbox [formControlName]="control?.key" [name]="control?.key" [label]="control?.checkboxLabel" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" [layoutOptions]="control?.layoutOptions"></novo-checkbox>
          </div>
        </ng-template>

        <!--Checklist-->
        <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-check-list [formControlName]="control.key" [name]="control.key" [options]="control?.options" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline" (onSelect)="methods.modelChange($event)"></novo-check-list>
          </div>
        </ng-template>

        <!--QuickNote-->
        <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
          <div [formGroup]="form">
            <novo-quick-note [formControlName]="control.key" [startupFocus]="control?.startupFocus" [placeholder]="control?.placeholder" [config]="control?.config" (change)="methods.modelChange($event)" [tooltip]="control?.tooltip" [tooltipPosition]="control?.tooltipPosition" [tooltipSize]="control?.tooltipSize" [tooltipPreline]="control?.tooltipPreline"></novo-quick-note>
          </div>
        </ng-template>
    `,
})
export class NovoControlTemplates implements AfterViewInit {
  @ViewChildren(NovoTemplate) defaultTemplates: QueryList<NovoTemplate>;
  constructor(private templates: NovoTemplateService) {}

  ngAfterViewInit(): void {
    if (this.defaultTemplates && this.defaultTemplates.length) {
      this.defaultTemplates.forEach((template: any) => {
        this.templates.addDefault(template.name, template.template);
      });
    }
  }
}
