import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NOVO_QUICK_NOTE_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import BasicQuickNoteDemoTpl from './templates/BasicQuickNote.html';
import CustomQuickNoteDemoTpl from './templates/CustomQuickNote.html';

const template = `
<div class="container">
    <h1>Quick Note <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/quick-note">(source)</a></small></h1>
    <p>TODO</p>

    <br/>

    <h5>Basic Examples</h5>
    <p>TODO</p>
    <div class="example picker-demo">${BasicQuickNoteDemoTpl}</div>
    <code-snippet [code]="BasicQuickNoteDemoTpl"></code-snippet>
    
    <h5>Custom Examples</h5>
    <p>TODO</p>
    <div class="example picker-demo">${CustomQuickNoteDemoTpl}</div>
    <code-snippet [code]="CustomQuickNoteDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'quick-note-demo',
    template: template,
    directives: [NOVO_QUICK_NOTE_ELEMENTS, CORE_DIRECTIVES, CodeSnippet]
})
export class QuickNoteDemo {
    constructor() {
        this.BasicQuickNoteDemoTpl = BasicQuickNoteDemoTpl;
        this.CustomQuickNoteDemoTpl = CustomQuickNoteDemoTpl;

        this.note = '';
        this.references = {};

        this.note2 = 'I am an initial note!';
        this.references2 = {};

        let customData = {
            tags: [{ id: 1, name: 'Custom Tag 1' }, { id: 2, name: 'Custom Tag 2' }],
            references: [{ id: 1, title: 'Custom Reference 1' }, { id: 2, title: 'Custom Reference 2' }]
        };

        this.placeholder = 'Enter your note text here. Reference people and distrubution lists using @ (eg. @John Smith). Reference other records using # (e.g. #Project Manager)';
        this.config = {
            triggers: {
                tags: {
                    symbol: '@',
                    keyCode: 64
                },
                references: {
                    symbol: '#',
                    keyCode: 35
                }
            },
            options: {
                tags: ['Test', 'Test'],
                references: ['Test', 'Test']
            },
            renderers: {
                tags: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`
                }
            }
        };
        this.custom = {
            triggers: {
                whos: {
                    symbol: '4',
                    keyCode: 52
                },
                whats: {
                    symbol: '1',
                    keyCode: 49
                }
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
                whos: '$name',
                whats: '$title'
            }
        };
    }
}
