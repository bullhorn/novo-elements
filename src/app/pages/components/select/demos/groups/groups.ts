import { Component } from '@angular/core';
import * as faker from 'faker';

class Person {
  public name: string = faker.name.findName();
}

class Company {
  public name: string = faker.company.companyName();
  public employees: Person[] = [new Person(), new Person(), new Person()];
}

@Component({
  selector: 'demo-select-groups',
  templateUrl: './groups.html',
})
export class DemoSelectGroupsComponent {
  public companies: any[] = [new Company(), new Company(), new Company()];
}
