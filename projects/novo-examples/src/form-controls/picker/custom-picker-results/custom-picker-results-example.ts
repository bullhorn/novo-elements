import { Component } from '@angular/core';
import { PickerResults } from 'novo-elements';

@Component({
  selector: 'custom-picker-results',
  host: {
    class: 'active picker-results',
  },
  template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)">
        <item-content>
          **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>
        </item-content>
      </novo-list-item>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>
  `,
})
export class CustomPickerResults extends PickerResults {}

/**
 * @title Custom Picker Results Example
 */
@Component({
  selector: 'custom-picker-results-example',
  templateUrl: 'custom-picker-results-example.html',
  styleUrls: ['custom-picker-results-example.css'],
})
export class CustomPickerResultsExample {
  public placeholder: string = 'Select...';
  public custom: any;
  public value: string;

  constructor() {
    let collaborators = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
      },
      {
        id: 2,
        firstName: 'Josh',
        lastName: 'Godi',
      },
      {
        id: 3,
        firstName: 'Alec',
        lastName: 'Sibilia',
      },
      {
        id: 4,
        firstName: 'Kameron',
        lastName: 'Sween',
      },
    ];

    this.custom = {
      resultsTemplate: CustomPickerResults,
      format: '$firstName $lastName',
      options: collaborators,
    };

    this.value = null;
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
