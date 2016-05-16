import { Provider, ComponentResolver, Injectable, ReflectiveInjector } from '@angular/core';

import { ModalRef, ModalParams, NovoModalContainer } from './Modal';

@Injectable()
export class ModalService {
    constructor(componentResolver:ComponentResolver) {
        this.componentResolver = componentResolver;
    }

    set parentViewContainer(view) {
        this._parentViewContainer = view;
    }

    open(component, scope) {
        if (!this._parentViewContainer) {
            // TODO alert
        }

        const modal = new ModalRef();
        modal.component = component;

        modal.open();

        this.componentResolver.resolveComponent(NovoModalContainer)
            .then(componentFactory => {
                const ctxInjector = this._parentViewContainer.injector;
                let injector = ReflectiveInjector.resolve([
                    { provide: ModalRef, useValue: modal },
                    { provide: ModalParams, useValue: scope }
                ]);
                let componentInjector = ReflectiveInjector.fromResolvedProviders(injector, ctxInjector);
                modal.containerRef = this._parentViewContainer.createComponent(componentFactory, 0, componentInjector);
            });
        return modal;
    }
}

export const MODAL_PROVIDERS = [
    new Provider(ModalService, { useClass: ModalService })
];
