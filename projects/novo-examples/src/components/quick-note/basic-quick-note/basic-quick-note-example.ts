import { Component } from '@angular/core';

/**
 * @title Basic Quick Note Example
 */
@Component({
  selector: 'basic-quick-note-example',
  templateUrl: 'basic-quick-note-example.html',
  styleUrls: ['basic-quick-note-example.css'],
})
export class BasicQuickNoteExample {
  public note: any;
  public placeholder: string =
    'Enter your note text here. Reference people and distribution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';
  public basic: any = {
    triggers: {
      tags: '@',
      references: '#',
      boos: '^',
    },
    options: {
      tags: ['First', 'Second', 'Space Between'],
      references: ['Third', 'Fourth'],
      boos: ['Test'],
    },
    renderer: {
      tags: (symbol, item) => {
        return `<a href="https://www.google.com/search?q=bullhorn&oq=bullhorn">${symbol}${item.label}</a>`;
      },
      references: (symbol, item) => {
        return `<a href="https://www.google.com/search?q=bullhorn&oq=bullhorn">${symbol}${item.label}</a>`;
      },
      boos: (symbol, item) => {
        return `<strong>${symbol}${item.label}</strong>`;
      },
    },
  };
}
