import { Component } from '@angular/core';
import * as faker from 'faker';

class Person {
  public name: string = faker.name.findName();
}

@Component({
  selector: 'demo-select-standard',
  templateUrl: './standard.html',
})
export class DemoSelectStandardComponent {
  public value: string;

  public people: any[] = [
    new Person(),
    new Person(),
    new Person(),
  ];

}
