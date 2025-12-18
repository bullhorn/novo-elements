import { Component } from '@angular/core';
import { PickerResults } from 'novo-elements';

@Component({
  selector: 'custom-picker-results',
  host: {
    class: 'active picker-results',
  },
  template: `
    @if (isLoading && !matches.length) {
      <novo-loading theme="line"></novo-loading>
    }
    @if (matches.length > 0) {
      <novo-list direction="vertical">
        @for (match of matches; track match) {
          <novo-list-item
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)">
            <item-content> **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b> </item-content>
          </novo-list-item>
        }
      </novo-list>
    }
    @if (hasError) {
      <p class="picker-error">Oops! An error occured.</p>
    }
    @if (!isLoading && !matches.length && !hasError) {
      <p class="picker-null">No results to display...</p>
    }
  `,
  standalone: false
})
export class CustomPickerResults extends PickerResults {}

/**
 * @title Custom Picker Results Example
 */
@Component({
  selector: 'custom-picker-results-example',
  templateUrl: 'custom-picker-results-example.html',
  styleUrls: ['custom-picker-results-example.css'],
  standalone: false
})
export class CustomPickerResultsExample {
  public placeholder: string = 'Select...';
  public custom: any;
  public value: string;

  constructor() {
    const collaborators = [
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
    console.info('EVENT', event);
  }
}
