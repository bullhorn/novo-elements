// NG2
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// App
import { Security } from './../../services/security/Security';

@Directive({
  selector: '[bhUnless]',
})
export class Unless {
  permissions: string = '';
  isDisplayed: boolean = false;

  constructor(public templateRef: TemplateRef<any>, public viewContainer: ViewContainerRef, public security: Security) {
    this.security.subscribe(this.check.bind(this));
  }

  @Input()
  set bhUnless(value: string) {
    this.permissions = value || '';
    this.check();
  }

  check(): void {
    let display: boolean = false;
    if (~this.permissions.indexOf('||')) {
      const ps: any = this.permissions.split('||');
      for (const p of ps) {
        if (this.security.has(p.trim())) {
          display = true;
        }
      }
    } else {
      display = this.permissions.split('&&').every((p) => this.security.has(p.trim()));
    }

    if (display) {
      if (!this.isDisplayed) {
        this.isDisplayed = true;
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.isDisplayed = false;
      this.viewContainer.clear();
    }
  }
}
