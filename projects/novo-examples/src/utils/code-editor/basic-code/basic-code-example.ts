import { Component } from '@angular/core';

/**
 * @title Basic Code Editor Example
 */
@Component({
    selector: 'basic-code-example',
    templateUrl: 'basic-code-example.html',
    styleUrls: ['basic-code-example.css'],
    standalone: false
})
export class BasicCodeExample {

  value = `function myFunction() {
  console.log('Hello world!');
}`;
}
