// NG2
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'code-snippet',
    template: '<pre><code [innerHtml]="highlight"></code></pre>'
})
export class CodeSnippet {
    highlight: SafeHtml;
    @Input() code;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.highlight = this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(this.code).value);
    }
}
