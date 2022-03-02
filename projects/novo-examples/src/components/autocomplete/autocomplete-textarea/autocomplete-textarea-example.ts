import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
})
export class AutocompleteTextareaExample implements OnInit {
  myControl = new FormControl();
  myOtherControl = new FormControl();

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
      console.log('control', control.lastKeyValue === '$');
      return control.lastKeyValue === '$';
    };
  }

  private _filter(value: string): string[] {
    return this.options;
    // const filterValue = value.toLowerCase();
    // return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
