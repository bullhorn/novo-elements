// NG2
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeExampleConfig, CODE_EXAMPLES } from './code-example.tokens';
import { HighlightJS } from './highlight.service';

@Component({
  selector: 'code-snippet',
  template: `
    <novo-nav theme="white" [outlet]="snippets">
      <novo-tab><span>HTML</span></novo-tab>
      <novo-tab><span>TS</span></novo-tab>
      <novo-tab><span>CSS</span></novo-tab>
    </novo-nav>
    <novo-nav-outlet #snippets>
      <novo-nav-content>
        <pre><code [innerHtml]="highlightHTML"></code></pre>
      </novo-nav-content>
      <novo-nav-content>
        <pre><code [innerHtml]="highlightTS"></code></pre>
      </novo-nav-content>
      <novo-nav-content>
        <pre><code [innerHtml]="highlightCSS"></code></pre>
      </novo-nav-content>
    </novo-nav-outlet>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent implements OnInit {
  @Input()
  example;
  highlightHTML: SafeHtml;
  highlightTS: SafeHtml;
  highlightCSS: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private hljs: HighlightJS,
    private cdr: ChangeDetectorRef,
    @Inject(CODE_EXAMPLES) private examples: CodeExampleConfig,
  ) {}

  ngOnInit() {
    this.hljs.isReady.subscribe(() => {
      const code = decodeURIComponent(this.examples[this.example].tsSource);
      const markup = decodeURIComponent(this.examples[this.example].htmlSource);
      const style = decodeURIComponent(this.examples[this.example].cssSource);
      this.highlightTS = this.sanitizer.bypassSecurityTrustHtml(this.hljs.highlightAuto(code, ['typescript']).value.trim());
      this.highlightHTML = this.sanitizer.bypassSecurityTrustHtml(this.hljs.highlightAuto(markup, ['html']).value.trim());
      this.highlightCSS = this.sanitizer.bypassSecurityTrustHtml(this.hljs.highlightAuto(style, ['css']).value.trim());
      this.cdr.markForCheck();
    });
  }
}
