import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
// import { NovoChipInputEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface ShiftData {
  id: number;
  startTime: string;
  endTime: string;
  numAssigned: number;
  openings: number;
}

/**
 * @title Autocomplete Stacked Chips
 */
@Component({
  selector: 'autocomplete-stacked-chips-example',
  templateUrl: 'autocomplete-stacked-chips-example.html',
  styleUrls: ['autocomplete-stacked-chips-example.css'],
})
export class AutocompleteStackedChipsExample {
  searchCtrl = new FormControl();
  filteredShifts: Observable<ShiftData[]>;
  shifts: ShiftData[] = ALL_SHIFTS.slice(0, 3);
  allShifts: ShiftData[] = ALL_SHIFTS;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredShifts = this.searchCtrl.valueChanges.pipe(
      startWith(null),
      map((shift: string | null) => (shift ? this._filter(shift) : this.allShifts.slice())),
    );
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our shift
    if ((value || '').trim()) {
      this.shifts.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.searchCtrl.setValue(null);
  }

  remove(shift: ShiftData): void {
    const index = this.shifts.indexOf(shift);

    if (index >= 0) {
      this.shifts.splice(index, 1);
    }
  }

  selected(event: NovoOptionSelectedEvent): void {
    this.shifts.push(event.option.value);
    this.searchInput.nativeElement.value = '';
    this.searchCtrl.setValue(null);
  }

  private _filter(value: string): ShiftData[] {
    const filterValue = value.toLowerCase();

    return this.allShifts.filter((shift) => shift.startTime.toLowerCase().indexOf(filterValue) === 0);
  }
}

const ALL_SHIFTS: ShiftData[] = [
  {
    id: 101,
    startTime: '2021-02-23T11:00-05:00',
    endTime: '2021-02-23T15:00-05:00',
    numAssigned: 2,
    openings: 5,
  },
  {
    id: 102,
    startTime: '2021-02-24T11:00-05:00',
    endTime: '2021-02-24T15:00-05:00',
    numAssigned: 1,
    openings: 2,
  },
  {
    id: 103,
    startTime: '2021-02-25T11:00-05:00',
    endTime: '2021-02-25T15:00-05:00',
    numAssigned: 0,
    openings: 1,
  },
  {
    id: 104,
    startTime: '2021-02-26T11:00-05:00',
    endTime: '2021-02-26T15:00-05:00',
    numAssigned: 3,
    openings: 3,
  },
  {
    id: 105,
    startTime: '2021-02-27T11:00-05:00',
    endTime: '2021-02-27T15:00-05:00',
    numAssigned: 2,
    openings: 4,
  },
  {
    id: 106,
    startTime: '2021-02-28T11:00-05:00',
    endTime: '2021-02-28T15:00-05:00',
    numAssigned: 22,
    openings: 50,
  },
];
