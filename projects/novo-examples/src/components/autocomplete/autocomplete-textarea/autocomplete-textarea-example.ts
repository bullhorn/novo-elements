import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoFieldControl } from 'novo-elements';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Autocomplete TextArea
 */
@Component({
    selector: 'autocomplete-textarea-example',
    templateUrl: 'autocomplete-textarea-example.html',
    styleUrls: ['autocomplete-textarea-example.css'],
    standalone: false
})
export class AutocompleteTextareaExample implements OnInit {
  myControl = new UntypedFormControl();
  myOtherControl = new UntypedFormControl();

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  public triggerFn() {
    return (control: NovoFieldControl<any>) => {
      console.info('control', control.lastKeyValue === '$');
      return control.lastKeyValue === '$';
    };
  }

  private _filter(value: string): string[] {
    return this.options;
  }
}
