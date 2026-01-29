import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'novo-number-range',
    template: `
    <form [formGroup]="rangeForm">
      <novo-flex justify='space-between' align='end' gap="1rem">
        <novo-field mr="sm">
          <input formControlName="min" novoInput type='number' [placeholder]="labels.minimumPlaceholder"/>
        </novo-field>
        <novo-field ml="sm">
          <input formControlName="max" novoInput type='number' [placeholder]="labels.maximumPlaceholder"/>
        </novo-field>
      </novo-flex>
      <novo-error *ngIf="rangeForm.hasError('minGreaterThanMax')" style="position: absolute">
        {{ labels.minGreaterThanMax }}
      </novo-error>
    </form>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberRangeComponent),
            multi: true,
        },
    ],
    standalone: false,
})
export class NumberRangeComponent implements OnInit, OnDestroy, ControlValueAccessor {
  rangeForm: FormGroup;
  _onChange: (value: any) => void = () => { };
  _onTouched = () => { };
  private _destroyed = new Subject<void>();

  constructor(public labels: NovoLabelService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rangeForm = this.formBuilder.group({ min: null, max: null }, { validators: this.minLessThanMaxValidator });

    // Notify parent form when the value changes (and it's valid)
    this.rangeForm.valueChanges.pipe(
      takeUntil(this._destroyed),
      filter(() => this.rangeForm.valid),
    ).subscribe(value => this._onChange(value));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  minLessThanMaxValidator(group: FormGroup): { [key: string]: boolean } | null {
    const min = group.get('min').value;
    const max = group.get('max').value;
    const hasError = !Helpers.isBlank(min) && !Helpers.isBlank(max) && min > max;
    const error = hasError ? { minGreaterThanMax: true } : null;
    group.get('min').setErrors(error); // sets error styling
    group.get('max').setErrors(error);
    return error;
  }

  writeValue(value: { min: number, max: number }): void {
    if (value) {
      this.rangeForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.rangeForm.disable() : this.rangeForm.enable();
  }
}
