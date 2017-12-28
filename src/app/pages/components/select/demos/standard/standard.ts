import { Component } from '@angular/core';
import * as faker from 'faker';

class Person {
  public name: string = faker.name.findName();
}

class Company {
  public name: string = faker.company.companyName();
  public employees: Person[] = [
    new Person(),
    new Person(),
    new Person(),
  ];
}

@Component({
  selector: 'demo-select-standard',
  templateUrl: './standard.html',
})
export class DemoSelectStandardComponent {
  public placeholder: string = 'Select...';
  public options: string[] = ['Alpha', 'Bravo', 'Charlie'];
  public withNumbers: any[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Zero', value: 0 },
    { label: 'Four', value: 4, readOnly: true },
  ];
  public withNumbersValue: number = 4;
  // tslint:disable-next-line:max-line-length
  public states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  public value: string = 'Bravo';
  public other: string = 'Bravo';
  public state: any = 'Missouri';

  public companies: any[] = [
    new Company(),
    new Company(),
    new Company(),
  ];

  public headerConfig: any = {
    label: 'Add New Item',
    placeholder: 'Enter item here',
    onSave: this.create.bind(this),
  };

  public create(opt: any): void {
    this.options = [...this.options, opt];
  }

}
