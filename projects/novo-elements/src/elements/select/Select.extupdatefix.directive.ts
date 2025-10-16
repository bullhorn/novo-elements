import { Directive, OnInit, inject } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { NovoSelectElement } from './Select';

/**
 * Fixes a <novo-select> element so that if its value is updated externally, the checkboxes in the dropdown selector
 * update accordingly. Because this is a functionality change to a core control, this fix is provided as a directive
 * to only be used if needed.
 */
@Directive({
    selector: 'novo-select[extupdatefix]',
    standalone: false
})
export class NovoSelectExtUpdateFix implements OnInit {
  control = inject(NgControl);
  selectElement = inject(NovoSelectElement);

  ngOnInit() {
    if (this.control?.control && 'registerOnChange' in this.control.control) {
      (this.control.control as FormControl).registerOnChange((rawValue, viewToModelUpdate) => {
        if (this.selectElement.multiple === Array.isArray(rawValue)) {
          this.afterExternalUpdate(rawValue);
        }
      });
    }
  }

  afterExternalUpdate(rawValue: any) {
    this.selectElement['_setSelectionByValue'](rawValue);
  }
}
