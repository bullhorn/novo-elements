import { Component } from '@angular/core';

/**
 * @title Accordion Example
 */
@Component({
    selector: 'accordion-example',
    templateUrl: 'accordion-example.html',
    styleUrls: ['accordion-example.css'],
    standalone: false,
})
export class AccordionExample {
  isFlat = false;
  isMulti = false;
}
