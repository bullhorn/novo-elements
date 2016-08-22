// NG2
import { ComponentResolver, Injectable, ReflectiveInjector } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams, NovoModalContainerElement } from './Modal';

@Injectable()
export class NovoModalService {
    // TODO - use ComponentFactoryResolver instead - jgodi
    constructor(componentResolver:ComponentResolver) {
        this.componentResolver = componentResolver;
    }

    set parentViewContainer(view) {
        this._parentViewContainer = view;
    }

    open(component, scope) {
        if (!this._parentViewContainer) {
            console.error('No parent view container specified for the ModalService. Set it inside your main application. \nthis.modalService.parentViewContainer = view (ViewContainerRef)'); // eslint-disable-line
            return null;
        }

        const modal = new NovoModalRef();
        modal.component = component;
        modal.open();

        this.componentResolver.resolveComponent(NovoModalContainerElement)
            .then(componentFactory => {
                const ctxInjector = this._parentViewContainer.injector;
                let injector = ReflectiveInjector.resolve([
                    { provide: NovoModalRef, useValue: modal },
                    { provide: NovoModalParams, useValue: scope }
                ]);
                let componentInjector = ReflectiveInjector.fromResolvedProviders(injector, ctxInjector);
                modal.containerRef = this._parentViewContainer.createComponent(componentFactory, 0, componentInjector);
            });
        return modal;
    }
}
