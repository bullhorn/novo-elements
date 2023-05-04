import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
import { AsideComponent } from './aside.component';

interface AsideConfig extends OverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: AsideConfig = {
  hasBackdrop: true,
  backdropClass: 'aside-overlay-backdrop',
  panelClass: 'aside-overlay-panel',
};

@Injectable({ providedIn: 'root' })
export class NovoAsideService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<R = any>(component, params = {}, config = {}) {
    // Override default configuration
    const asideConfig = this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config });

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(asideConfig);

    // Instantiate remote control
    const asideRef = new NovoAsideRef<typeof params, R>(component, params, overlayRef);

    const overlayComponent = this.attachAsideContainer(AsideComponent, overlayRef, asideConfig, asideRef);

    // Pass the instance of the overlay component to the remote control
    asideRef.componentInstance = overlayComponent;

    overlayRef.backdropClick().subscribe(() => asideRef.close());

    return asideRef;
  }

  private createOverlay(config: AsideConfig) {
    return this.overlay.create(config);
  }

  private attachAsideContainer(component, overlayRef: OverlayRef, config: AsideConfig, asideRef: NovoAsideRef) {
    const injector = this.createInjector(config, asideRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: AsideConfig, asideRef: NovoAsideRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(NovoAsideRef, asideRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: AsideConfig): AsideConfig {
    // const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const scrollStrategy = config.hasBackdrop ? this.overlay.scrollStrategies.block() : this.overlay.scrollStrategies.noop();

    return {
      scrollStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
    };
  }
}
