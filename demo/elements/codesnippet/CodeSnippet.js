// NG2
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    inputs: ['code'],
    selector: 'code-snippet',
    template: '<pre><code [innerHtml]="highlight"></code></pre>'
})
export class CodeSnippet {
    constructor(sanitizer:DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    ngOnInit() {
        this.highlight = this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(this.code).value);
    }
}
