import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import * as faker from 'faker';

export class User {
  public updated: Date = new Date();
  public summary: string = faker.lorem.sentence();
  constructor(public name: string) { }
}

@Component({
  selector: 'demo-autocomplete-advanced',
  templateUrl: './advanced.html',
})
export class DemoAutocompleteAdvancedComponent implements OnInit {
  public myControl: FormControl = new FormControl();

  public options: User[] = [
    new User(faker.name.findName()),
    new User(faker.name.findName()),
    new User(faker.name.findName()),
  ];

  public filteredOptions: Observable<User[]>;

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .startWith(undefined)
      .map((user: User) => user && typeof user === 'object' ? user.name : user)
      .map((name: string) => name ? this.filter(name) : this.options.slice());
  }

  public filter(name: string): User[] {
    return this.options.filter((option: User) => {
      return option.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
    });
  }

  public displayFn(item: User): string | User {
    return item ? item.name : item;
  }

}
