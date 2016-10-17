// NG2
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'multi-code-snippet',
    template: `
        <br/>
        <div *ngFor="let section of _sections">
            <label>{{ section }}</label>
            <pre><code [innerHtml]="getHighlight(_map[section])"></code></pre>
        </div>
    `
})
export class MultiCodeSnippet {
    _sections:string[] = [];
    _map:any = {};

    @Input()
    set code(code) {
        this._sections = Object.keys(code);
        this._map = Object.assign({}, code);
    }

    constructor(sanitizer:DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    getHighlight(code) {
        return this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(code).value);
    }
}
