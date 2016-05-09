import { Component } from '@angular/core';

@Component({
    inputs: ['code'],
    selector: 'code-snippet',
    template: '<pre><code [innerHtml]="highlight"></code></pre>'
})
export class CodeSnippet {
    ngOnInit() {
        this.highlight = hljs.highlightAuto(this.code).value;
    }
}
