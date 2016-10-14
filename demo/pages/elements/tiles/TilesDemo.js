// NG2
import { Component } from '@angular/core';
// APP
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
    You have picked (output): <strong>{{ currentColor || 'No selection' }}</strong>
    <br/>
    You have picked (ngModel): <strong>{{ value || 'No selection' }}</strong>
    <h4>Code</h4>
    <code-snippet [code]="TilesDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'tiles-demo',
    template: template
})
export class TilesDemoComponent {
    shown:Boolean = false;
    constructor() {
        this.TilesDemoTpl = TilesDemoTpl;
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

    toggleShown() {
        this.shown = !this.shown;
    }
}
