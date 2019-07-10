// NG2
import { Injectable, ViewContainerRef, StaticProvider, Type } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams, NovoModalContainerElement } from './Modal';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

@Injectable()
export class NovoModalService {
  _parentViewContainer: ViewContainerRef;

  constructor(private componentUtils: ComponentUtils) {}

  set parentViewContainer(view: ViewContainerRef) {
    this._parentViewContainer = view;
  }

  // open<T>(component: Type<T>, scope = {}) {
  open(component, scope = {}) {
    if (!this._parentViewContainer) {
      console.error(
        'No parent view container specified for the ModalService. Set it inside your main application. \nthis.modalService.parentViewContainer = view (ViewContainerRef)',
      );
      return null;
    }

    const modal = new NovoModalRef();
    modal.component = component;
    modal.open();

    const providers: StaticProvider[] = [{ provide: NovoModalRef, useValue: modal }, { provide: NovoModalParams, useValue: scope }];
    modal.containerRef = this.componentUtils.append(NovoModalContainerElement, this._parentViewContainer, providers);
    return modal;
  }
}
