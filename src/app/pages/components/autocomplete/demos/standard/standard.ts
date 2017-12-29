import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-autocomplete-standard',
  templateUrl: './standard.html',
})
export class DemoAutocompleteStandardComponent {
  public myControl: FormControl = new FormControl();

  public options: string[] = [
    'One',
    'Two',
    'Three',
  ];
}
