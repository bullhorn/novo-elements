import { Component } from '@angular/core';
import { QuickNoteResults } from 'novo-elements';

const DATA = {
  tags: [
    { id: 1, name: 'OH YA!', test: 'TWO' },
    { id: 2, name: 'TAGGING!', test: 'ONE' },
  ],
  references: [
    { id: 1, title: 'Awesome Reference' },
    { id: 2, title: 'Angular2' },
  ],
};

@Component({
  selector: 'custom-quick-note-results',
  host: {
    class: 'active quick-note-results',
  },
  template: `
    @if (isLoading && !matches.length) {
      <novo-loading theme="line"></novo-loading>
    }
    @if (matches.length > 0) {
      <novo-list>
        @for (match of matches; track match) {
          <novo-list-item
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            >
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
export class CustomQuickNoteResults extends QuickNoteResults {}

/**
 * @title Custom Quick Note Results Example
 */
@Component({
  selector: 'custom-quick-note-results-example',
  templateUrl: 'custom-quick-note-results-example.html',
  styleUrls: ['custom-quick-note-results-example.css'],
  standalone: false
})
export class CustomQuickNoteResultsExample {
  public note: any;
  public placeholder: string =
    'Enter your note text here. Reference people and distribution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';

  public customResults: any = {
    resultsTemplate: CustomQuickNoteResults,
    triggers: {
      names: '@',
      tags: '#',
    },
    options: {
      names: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(DATA.tags);
          }, 300);
        });
      },
      tags: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(DATA.references);
          }, 300);
        });
      },
    },
    format: {
      names: '$name',
      tags: '$title',
    },
    renderer: {
      names: (symbol, item) => {
        return `<a href="http://www.bullhorn.com" class="names">${symbol}${item.label}</a>`;
      },
      tags: (symbol, item) => {
        return `<a href="http://www.bullhorn.com" class="tags">${symbol}${item.label}</a>`;
      },
    },
  };
}
