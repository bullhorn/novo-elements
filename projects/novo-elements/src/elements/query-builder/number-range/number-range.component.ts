import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'novo-number-range',
  template: `
    <form [formGroup]="rangeForm">
      <novo-flex justify='space-between' align='end'>
        <novo-field>
          <input formControlName="min" novoInput type='number' [placeholder]="labels.minimumPlaceholder"/>
          <novo-error [hidden]="rangeForm.get('min').invalid && rangeForm.get('min').touched">
            {{ labels.minimumIsRequired }}
          </novo-error>
        </novo-field>
        <novo-field>
          <input formControlName="max" novoInput type='number' [placeholder]="labels.maximumPlaceholder"/>
          <novo-error [hidden]="rangeForm.get('max').invalid && rangeForm.get('max').touched">
            {{ labels.maximumIsRequired }}
          </novo-error>
        </novo-field>
      </novo-flex>
      <novo-error *ngIf="rangeForm.hasError('minGreaterThanMax')">
        {{ labels.minGreaterThanMax }}
      </novo-error>
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberRangeComponent),
      multi: true
    }
  ]
})
export class NumberRangeComponent implements OnInit, OnDestroy, ControlValueAccessor {
  rangeForm: FormGroup;
  _onChange: (value: any) => void = () => {};
  _onTouched = () => {};
  private _destroyed = new Subject<void>();

  constructor(public labels: NovoLabelService, private fb: FormBuilder) { }

  ngOnInit() {
    this.rangeForm = this.fb.group({
      min: [0, [Validators.required]],
      max: [100, [Validators.required]],
    }, {
      validators: this.minLessThanMaxValidator
    });

    // Notify parent form when the value changes (and it's valid)
    this.rangeForm.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(value => {
      if (this.rangeForm.valid) {
        this._onChange(value);
      }
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  minLessThanMaxValidator(group: FormGroup): { [key: string]: boolean } | null {
    const min = group.get('min').value;
    const max = group.get('max').value;
    return min <= max ? null : { minGreaterThanMax: true };
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
