import { Component } from '@angular/core';

const DATA = {
  tags: [{ id: 1, name: 'OH YA!', test: 'TWO' }, { id: 2, name: 'TAGGING!', test: 'ONE' }],
  references: [{ id: 1, title: 'Awesome Reference' }, { id: 2, title: 'Angular2' }],
};

/**
 * @title Custom Quick Note Example
 */
@Component({
  selector: 'custom-quick-note-example',
  templateUrl: 'custom-quick-note-example.html',
  styleUrls: ['custom-quick-note-example.css'],
})
export class CustomQuickNoteExample {
  public note: any;
  public placeholder: string =
    'Enter your note text here. Reference people and distribution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';
  public custom: any = {
    triggers: {
      whos: '@',
      whats: '#',
    },
    options: {
      whos: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(DATA.tags);
          }, 300);
        });
      },
      whats: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(DATA.references);
          }, 300);
        });
      },
    },
    format: {
      whos: '$name $test',
      whats: '$title',
    },
    renderer: {
      whos: (symbol, item) => {
        return `<a href="http://www.bullhorn.com" class="WHOS">${symbol}${item.label}</a>`;
      },
      whats: (symbol, item) => {
        return `<a href="http://www.bullhorn.com" class="tag">${symbol}${item.label}</a>`;
      },
    },
  };
}
