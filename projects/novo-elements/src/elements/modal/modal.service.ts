// NG2
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { NovoModalContainerComponent } from './modal-container.component';
// APP
import { NovoModalParams, NovoModalRef } from './modal-ref';

interface ModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: ModalConfig = {
  hasBackdrop: true,
  backdropClass: 'modal-overlay-backdrop',
  panelClass: 'modal-overlay-panel',
};

@Injectable({ providedIn: 'root' })
export class NovoModalService {
  _parentViewContainer: ViewContainerRef;

  set parentViewContainer(view: ViewContainerRef) {
    console.warn('parentViewContainer is deprecated');
    this._parentViewContainer = view;
  }

  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T extends Record<string, any>>(component, params: Partial<T> = {}) {
    // Override default configuration
    const modalConfig = DEFAULT_CONFIG;

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(modalConfig);

    // Instantiate remote control
    const modalRef = new NovoModalRef<typeof params>(component, params, overlayRef);

    const overlayComponent = this.attachModalContainer(NovoModalContainerComponent, overlayRef, modalConfig, modalRef);

    // Pass the instance of the overlay component to the remote control
    modalRef.componentInstance = overlayComponent;

    overlayRef.backdropClick().subscribe(() => modalRef.close());

    return modalRef;
  }

  private createOverlay(config: ModalConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(component, overlayRef: OverlayRef, config: ModalConfig, modalRef: NovoModalRef) {
    const injector = this.createInjector(config, modalRef);
    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: ModalConfig, modalRef: NovoModalRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(NovoModalRef, modalRef);
    // Support backwards compatability
    injectionTokens.set(NovoModalParams, modalRef.params);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: ModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
    });

    return overlayConfig;
  }
}
