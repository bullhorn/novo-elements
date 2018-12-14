import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
// App
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';

@Component({
  selector: 'novo-control-templates',
  template: `
     <!---Readonly---
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.value[control.key] }}</div>
    </ng-template>
         <!--Textbo
    <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
      >
        <input
          *ngIf="control?.type !== 'number' && control?.textMaskEnabled"
          [textMask]="control.maskOptions"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type !== 'number' && !control?.textMaskEnabled"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType !== 'percentage'"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="numberInput.blur()"
          #numberInput
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType === 'percentage'"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          [value]="control?.percentValue"
          (input)="methods.handlePercentChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="percentInput.blur()"
          #percentInput
        />
        <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
        <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
      </div>
    </ng-template>

    late>


    <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        class="textarea-container"
        [formGroup]="form"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
      >
        <textarea
          [class.maxlength-error]="errors?.maxlength"
          [name]="control.key"
          [attr.id]="control.key"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          autosize
          (input)="methods.handleTextAreaInput($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [maxlength]="control?.maxlength"
        ></textarea>
      </div>
    </ng-template>

    ng-template>
    <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-editor
          [name]="control.key"
          [formControlName]="control.key"
          [startupFocus]="control.startupFocus"
          [minimal]="control.minimal"
          [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-editor>
      </div>
    </ng-template>

         </ng-templa
    <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>

    v>
        </ng-te
    <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <select
          [id]="control.key"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
        >
          <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
          <option *ngFor="let opt of control.options" [value]="opt.key">{{ opt.value }}</option>
        </select>
      </div>
    </ng-template>

          </div
    <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-file-input
          [formControlName]="control.key"
          [id]="control.key"
          [name]="control.key"
          [placeholder]="control.placeholder"
          [value]="control.value"
          [multiple]="control.multiple"
          [layoutOptions]="control.layoutOptions"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          (edit)="methods.handleEdit($event)"
          (save)="methods.handleSave($event)"
          (delete)="methods.handleDelete($event)"
          (upload)="methods.handleUpload($event)"
        ></novo-file-input>
      </div>
    </ng-template>

    >

    <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-tiles
          [options]="control.options"
          [formControlName]="control.key"
          (onChange)="methods.modelChange($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [controlDisabled]="control.disabled"
        ></novo-tiles>
      </div>
    </ng-template>

    o-tiles>

    <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-picker
          [config]="control.config"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [parentScrollSelector]="control.parentScrollSelector"
          *ngIf="!control.multiple"
          (select)="methods.modelChange($event)"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
        ></novo-picker>
        <novo-chips
          [source]="control.config"
          [type]="control.config.type"
          [maxlength]="control.maxlength"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          *ngIf="control.multiple && !control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          *ngIf="control.multiple && control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
        ></novo-row-chips>
      </div>
    </ng-template>

    </novo-row-chips>
    <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    ($event)"></
    <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-radio
          [name]="control.key"
          [formControlName]="control.key"
          *ngFor="let option of control.options"
          [value]="option.value"
          [label]="option.label"
          [checked]="option.value === form.value[control.key]"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [button]="!!option.icon"
          [icon]="option.icon"
          [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"
        ></novo-radio>
      </div>
    </ng-template>

    | option?.v
    <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
      >
        <novo-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [military]="control.military"
        ></novo-time-picker-input>
      </div>
    </ng-template>

    ol.military
    <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
      >
        <novo-date-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [format]="control.dateFormat"
          [allowInvalidDate]="control.allowInvalidDate"
          [textMaskEnabled]="control.textMaskEnabled"
          [placeholder]="control.placeholder"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
        ></novo-date-picker-input>
      </div>
    </ng-template>

    andleBlur($event)"><
    <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
      >
        <novo-date-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [placeholder]="control.placeholder"
          [military]="control.military"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
        ></novo-date-time-picker-input>
      </div>
    </ng-template>

    ds.handleBlur(
    <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-address
          [formControlName]="control.key"
          [config]="control?.config"
          [readOnly]="control?.readOnly"
          (change)="methods.handleAddressChange($event)"
          (focus)="methods.handleFocus($event.event, $event.field)"
          (blur)="methods.handleBlur($event.event, $event.field)"
          (validityChange)="methods.updateValidity()"
        ></novo-address>
      </div>
    </ng-template>

     (validityChang
    <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-checkbox
          [formControlName]="control?.key"
          [name]="control?.key"
          [label]="control?.checkboxLabel"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
      </div>
    </ng-template>

    Position" [layou
    <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-check-list
          [formControlName]="control.key"
          [name]="control.key"
          [options]="control?.options"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          (onSelect)="methods.modelChange($event)"
        ></novo-check-list>
      </div>
    </ng-template>

    pAutoPosition" (
    <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-quick-note
          [formControlName]="control.key"
          [startupFocus]="control?.startupFocus"
          [placeholder]="control?.placeholder"
          [config]="control?.config"
          (change)="methods.modelChange($event)"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [tooltipPreline]="control?.tooltipPreline"
        ></novo-quick-note>
      </div>
    </ng-template>
  `,
})
export class NovoControlTemplates implements AfterViewInit {
  @ViewChildren(NovoTemplate)
  defaultTemplates: QueryList<NovoTemplate>;
  constructor(private templates: NovoTemplateService) {}

  ngAfterViewInit(): void {
    if (this.defaultTemplates && this.defaultTemplates.length) {
      this.defaultTemplates.forEach((template: any) => {
        this.templates.addDefault(template.name, template.template);
      });
    }
  }
}
