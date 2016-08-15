// NG2
import { Component } from '@angular/core';
// APP
import BasicQuickNoteDemoTpl from './templates/BasicQuickNote.html';
import CustomQuickNoteDemoTpl from './templates/CustomQuickNote.html';
import CustomQuickNoteResultsDemoTpl from './templates/CustomQuickNoteResults.html';
// Vendor
import { QuickNoteResults } from './../../../../src/novo-elements';

@Component({
    selector: 'custom-quick-note-results',
    host: {
        'class': 'active quick-note-results'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)">
                **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>
            </li>
        </ul>
        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>
    `
})
export class CustomQuickNoteResults extends QuickNoteResults {
}

const template = `
<div class="container">
    <h1>Quick Note <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/quick-note">(source)</a></small></h1>
    <p>Tag Autocomplete</p>

    <br/>

    <h5>Basic Examples</h5>
    <div class="example quick-note-demo">${BasicQuickNoteDemoTpl}</div>
    <code-snippet [code]="BasicQuickNoteDemoTpl"></code-snippet>
    
    <h5>Custom Triggers</h5>
    <div class="example quick-note-demo">${CustomQuickNoteDemoTpl}</div>
    <code-snippet [code]="CustomQuickNoteDemoTpl"></code-snippet>
    
    <h5>Custom Results Template</h5>
    <div class="example quick-note-demo">${CustomQuickNoteResultsDemoTpl}</div>
    <code-snippet [code]="CustomQuickNoteResultsDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'quick-note-demo',
    template: template
})
export class QuickNoteDemoComponent {
    constructor() {
        this.BasicQuickNoteDemoTpl = BasicQuickNoteDemoTpl;
        this.CustomQuickNoteDemoTpl = CustomQuickNoteDemoTpl;
        this.CustomQuickNoteResultsDemoTpl = CustomQuickNoteResultsDemoTpl;

        this.placeholder = 'Enter your note text here. Reference people and distrubution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';

        let customData = {
            tags: [{ id: 1, name: 'OH YA!', test: 'TWO' }, { id: 2, name: 'TAGGING!', test: 'ONE' }],
            references: [{ id: 1, title: 'Awesome Reference' }, { id: 2, title: 'Angular2' }]
        };

        this.config = {
            triggers: {
                tags: '@',
                references: '#',
                boos: '^'
            },
            options: {
                tags: ['First', 'Second'],
                references: ['Third', 'Forth'],
                boos: ['Test']
            },
            renderer: {
                tags: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`;
                },
                references: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`;
                },
                boos: (symbol, item) => {
                    return `<strong>${symbol}${item.label}</strong>`;
                }
            }
        };
        this.custom = {
            triggers: {
                whos: '@',
                whats: '#'
            },
            options: {
                whos: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(customData.tags);
                        }, 300);
                    });
                },
                whats: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(customData.references);
                        }, 300);
                    });
                }
            },
            format: {
                whos: '$name $test',
                whats: '$title'
            },
            renderer: {
                whos: (symbol, item) => {
                    return `<a class="WHOS">${symbol}${item.label}</a>`;
                },
                whats: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`;
                }
            }
        };
        this.custom2 = {
            resultsTemplate: CustomQuickNoteResults,
            triggers: {
                names: '@',
                tags: '#'
            },
            options: {
                names: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(customData.tags);
                        }, 300);
                    });
                },
                tags: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(customData.references);
                        }, 300);
                    });
                }
            },
            format: {
                names: '$name',
                tags: '$title'
            },
            renderer: {
                names: (symbol, item) => {
                    return `<a class="names">${symbol}${item.label}</a>`;
                },
                tags: (symbol, item) => {
                    return `<a class="tags">${symbol}${item.label}</a>`;
                }
            }
        };
    }
}
