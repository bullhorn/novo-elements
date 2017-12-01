// NG2
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'code-snippet',
    template: '<pre><code [innerHtml]="highlight"></code></pre>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippet implements OnInit {
    @Input() code;

    highlight: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.highlight = this.sanitizer.bypassSecurityTrustHtml(hljs.highlightAuto(this.code).value.trim());
    }
}
