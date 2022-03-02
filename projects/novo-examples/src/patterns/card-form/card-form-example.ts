import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Recipient {
  id: number;
  name: string;
  email: string;
}

/**
 * @title Card Form Example
 */
@Component({
  selector: 'card-form-example',
  templateUrl: 'card-form-example.html',
  styleUrls: ['card-form-example.css'],
})
export class CardFormExample {
  recipientCtrl = new FormControl();
  filteredPeople: Observable<Recipient[]>;
  recipients: Recipient[] = [];
  allPeople: Recipient[] = [
    {
      id: 1,
      name: 'Brian Kimball',
      email: 'bvkimball@bullhorn.com',
    },
    {
      id: 2,
      name: 'Josh Godi',
      email: 'jgodi@bullhorn.com',
    },
    {
      id: 3,
      name: 'Alec Sibilia',
      email: 'asibilia@bullhorn.com',
    },
    {
      id: 4,
      name: 'Jon Braun',
      email: 'jb@bullhorn.com',
    },
  ];

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredPeople = this.recipientCtrl.valueChanges.pipe(
      startWith(null),
      map((person: Recipient | null) => (person ? this._filter(person) : this.allPeople.slice())),
    );
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.recipients.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.recipientCtrl.setValue(null);
  }

  remove(person: Recipient): void {
    const index = this.recipients.indexOf(person);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  selected(event: NovoOptionSelectedEvent): void {
    console.log(event.option);
    this.recipients.push(event.option.value);
    this.searchInput.nativeElement.value = '';
    this.recipientCtrl.setValue(null);
  }

  private _filter(value: Recipient): Recipient[] {
    const filterValue = value.name.toLowerCase();

    return this.allPeople.filter((person) => person.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
