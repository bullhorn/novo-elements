import { Directive, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TranslateService } from './translate.service';

@Directive({
  selector: '[translate]',
})
export class TranslateDirective implements OnInit, OnDestroy {
  @Input()
  translate: string;
  @Input()
  dynamicValues: any;

  public translatedValue: SafeHtml;

  @HostBinding('innerHTML')
  get innerHTML() {
    return this.translatedValue;
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    TranslateService.onLocaleChange.subscribe(() => {
      this.translatedValue = this.renderContent(this.translate, this.dynamicValues);
    });
    this.translatedValue = this.renderContent(this.translate, this.dynamicValues);
  }

  ngOnDestroy() {
    TranslateService.onLocaleChange.unsubscribe();
  }

  renderContent(key, interpolation) {
    return this.sanitizer.bypassSecurityTrustHtml(TranslateService.translate(key, interpolation));
  }
}
