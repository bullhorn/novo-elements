import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
// import { NovoChipInputEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Autocomplete With Chips
 */
@Component({
  selector: 'autocomplete-with-chips-example',
  templateUrl: 'autocomplete-with-chips-example.html',
  styleUrls: ['autocomplete-with-chips-example.css'],
})
export class AutocompleteWithChipsExample {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchCtrl = new FormControl();
  fieldCtrl = new FormControl(['Lemon']);
  filteredFruits: Observable<string[]>;
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredFruits = this.searchCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  add(event: any): void {}

  remove(fruit: string): void {}

  selected(event: NovoOptionSelectedEvent): void {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
