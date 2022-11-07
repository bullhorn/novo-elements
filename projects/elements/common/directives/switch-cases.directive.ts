import { NgSwitch } from '@angular/common';
import { Directive, DoCheck, Host, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[novoSwitchCases]',
})
export class SwitchCasesDirective implements OnInit, DoCheck {
  private ngSwitch: any;
  private _created = false;

  @Input()
  novoSwitchCases: any[];

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<Object>, @Host() ngSwitch: NgSwitch) {
    this.ngSwitch = ngSwitch;
  }

  ngOnInit() {
    (this.novoSwitchCases || []).forEach(() => this.ngSwitch._addCase());
  }

  ngDoCheck() {
    let enforce = false;
    (this.novoSwitchCases || []).forEach((value) => (enforce = this.ngSwitch._matchCase(value) || enforce));
    this.enforceState(enforce);
  }

  enforceState(created: boolean) {
    if (created && !this._created) {
      this._created = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!created && this._created) {
      this._created = false;
      this.viewContainer.clear();
    }
  }
}
