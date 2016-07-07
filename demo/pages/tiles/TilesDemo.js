import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { NOVO_TILES_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import TilesDemoTpl from './templates/TilesDemo.html';

const template = `
<div class="container">
    <h1>Tiles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/tiles">(source)</a></small></h1>
    <p>
        This component is intended to behave akin to the radio button component.
    </p>
    <h4>Demo</h4>
    <div>${TilesDemoTpl}</div>
    <br>
    You have picked (from update): <strong>{{ currentColor || 'No selection' }}</strong>
    <br/>
    You have picked (from ngModel): <strong>{{ value || 'No selection' }}</strong>
    <h4>Code</h4>
    <code-snippet [code]="TilesDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'tiles-demo',
    template: template,
    directives: [
        NOVO_TILES_ELEMENTS,
        CodeSnippet,
        CORE_DIRECTIVES
    ]
})
export class TilesDemo {
    constructor() {
        this.TilesDemoTpl = TilesDemoTpl;
        this.value = 'green';
        this.demoTiles = [
            {
                label: 'Red',
                value: 'red'
            },
            {
                label: 'Green',
                value: 'green'
            },
            {
                label: 'Blue',
                value: 'blue'
            }
        ];
    }

    colorSelect(newColorValue) {
        this.currentColor = newColorValue;
    }
}
