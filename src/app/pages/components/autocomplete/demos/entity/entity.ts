import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as faker from 'faker';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';

export class FakeCandidate {
  public _subtype: string = 'Candidate';

  public firstName: string = faker.name.firstName();
  public lastName: string = faker.name.firstName();
  public name: string;
  public email: string;
  public phone: string = faker.phone.phoneNumber();
  public status: string = faker.company.bsBuzz();
  public companyName: string = faker.company.companyName();
  public address: { city: string, state: string } = {
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
  };

  constructor() {
    this.name = faker.name.findName(this.firstName, this.lastName);
    this.email = faker.internet.email(this.firstName, this.lastName);
  }

}

@Component({
  selector: 'demo-autocomplete-entity',
  templateUrl: './entity.html',
})
export class DemoAutocompleteEntityComponent implements OnInit {
  public myControl: FormControl = new FormControl();

  public options: FakeCandidate[] = [
    new FakeCandidate(),
    new FakeCandidate(),
    new FakeCandidate(),
    new FakeCandidate(),
    new FakeCandidate(),
    new FakeCandidate(),
    new FakeCandidate(),
  ];

  public filteredOptions: Observable<FakeCandidate[]>;

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .startWith(undefined)
      .map((user: FakeCandidate) => user && typeof user === 'object' ? user.name : user)
      .map((name: string) => name ? this.filter(name) : this.options.slice());
  }

  public filter(name: string): FakeCandidate[] {
    return this.options.filter((option: FakeCandidate) => {
      return option.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
    });
  }

  public displayFn(item: FakeCandidate): string | FakeCandidate {
    return item ? item.name : item;
  }

}
