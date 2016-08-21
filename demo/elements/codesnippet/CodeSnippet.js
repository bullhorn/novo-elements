// NG2
import { Component } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

@Component({
    inputs: ['code'],
    selector: 'code-snippet',
    template: '<pre><code [innerHtml]="highlight"></code></pre>'
})
export class CodeSnippet {
    constructor(sanitizer:DomSanitizationService) {
        this.sanitizer = sanitizer;
    }

    ngOnInit() {
        this.highlight = this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(this.code).value);
    }
}
