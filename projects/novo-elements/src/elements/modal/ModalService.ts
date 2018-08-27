// NG2
import { Injectable, ReflectiveInjector } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams, NovoModalContainerElement } from './Modal';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

@Injectable()
export class NovoModalService {
  _parentViewContainer: any = null;

  constructor(private componentUtils: ComponentUtils) {}

  set parentViewContainer(view) {
    this._parentViewContainer = view;
  }

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

    let bindings = ReflectiveInjector.resolve([{ provide: NovoModalRef, useValue: modal }, { provide: NovoModalParams, useValue: scope }]);
    modal.containerRef = this.componentUtils.appendNextToLocation(NovoModalContainerElement, this._parentViewContainer, bindings);
    return modal;
  }
}
