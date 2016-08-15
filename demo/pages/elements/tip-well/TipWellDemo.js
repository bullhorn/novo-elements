// NG2
import { Component } from '@angular/core';
// App
import TipWellDemoTpl from './templates/TipWellDemo.html';
import TipWellNoButtonDemoTpl from './templates/TipWellNoButtonDemo.html';
import TipWellIconDemoTpl from './templates/TipWellIconDemo.html';

const template = `
<div class="container">
    <h1>TipWell <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/tip-well">(source)</a></small></h1>
    <p>
        This component is meant to be akin to Bootstrap's 'well'. It's a small container for help text.
    </p>
    <h4>Demo</h4>
    <div>${TipWellDemoTpl}</div>
    <br />
    <p>Did you hide the TipWell?</p>
    <button theme="primary" color="success" icon="refresh" (click)="clearLocalStorage()">Reset localStorage and Reload</button>
    <br />
    <h4>Code</h4>
    <code-snippet [code]="TipWellDemoTpl"></code-snippet>
    <h4>No Button Demo</h4>
    <div>${TipWellNoButtonDemoTpl}</div>
    <br />
    <h4>Code</h4>
    <code-snippet [code]="TipWellNoButtonDemoTpl"></code-snippet>
    <h4>Icon Demo</h4>
    <div>${TipWellIconDemoTpl}</div>
    <br />
    <p>Did you hide the TipWell?</p>
    <button theme="primary" color="success" icon="refresh" (click)="clearLocalStorage()">Reset localStorage and Reload</button>
    <br />
    <h4>Code</h4>
    <code-snippet [code]="TipWellIconDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'tip-well-demo',
    template: template
})
export class TipWellDemoComponent {
    constructor() {
        this.TipWellDemoTpl = TipWellDemoTpl;
        this.TipWellNoButtonDemoTpl = TipWellNoButtonDemoTpl;
        this.TipWellIconDemoTpl = TipWellIconDemoTpl;
        this.demoTip = 'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';
    }

    clearLocalStorage() {
        localStorage.removeItem('novo-tw_Demo');
        location.reload();
    }
}
