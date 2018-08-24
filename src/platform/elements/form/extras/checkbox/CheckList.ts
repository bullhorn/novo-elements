// NG2
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const CHECKLIST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoCheckListElement),
  multi: true,
};

@Component({
  selector: 'novo-check-list',
  providers: [CHECKLIST_VALUE_ACCESSOR],
  template: `
        <div class="check-box-group" *ngFor="let option of _options; let i = index" [ngClass]="{checked: option.checked}" >
            <input [name]="name" type="checkbox" [ngModel]="option.checked" [attr.id]="name+i" [value]="option.checked" (change)="select($event, option)" [disabled]="disabled">
            <label [attr.for]="name+i" (click)="select($event, option)">
              <i [ngClass]="{'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
              <span>{{option.label}}</span>
            </label>
        </div>
    `,
})
export class NovoCheckListElement implements ControlValueAccessor, OnInit {
  @Input()
  name: string;
  @Input()
  options: Array<any>;
  @Input()
  disabled: boolean;
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();

  _options: Array<any>;
  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  ngOnInit() {
    this.setModel();
    this.setupOptions();
  }

  select(event, item) {
    Helpers.swallowEvent(event);
    if (!this.disabled) {
      item.checked = !item.checked;
      this.model = this._options.filter((checkBox) => checkBox.checked).map((x) => x.value);
      this.onModelChange(this.model.length > 0 ? this.model : '');
      this.onSelect.emit({ selected: this.model });
    }
  }

  setupOptions() {
    this.options = this.options || [];
    this._options = [];
    if (this.options.length && !this.options[0].value) {
      this.options.forEach((option) => {
        let formattedOption = {
          value: option,
          label: option,
          checked: this.model && this.model.length && this.model.indexOf(option.value) !== -1,
        };
        this._options.push(formattedOption);
      });
    } else {
      this.options.forEach((option) => {
        let formattedOption = option;
        formattedOption.checked = this.model && this.model.length && this.model.indexOf(option.value) !== -1;
        this._options.push(formattedOption);
      });
    }
  }

  setModel(): void {
    let checkedOptions = this.options.filter((checkBox) => checkBox.checked).map((x) => x.value);
    this.writeValue(checkedOptions);
  }

  writeValue(model: any): void {
    this.model = model || [];
    if (model) {
      this.setupOptions();
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
