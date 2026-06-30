import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppBridge, AppBridgeHandler } from 'novo-elements';

/**
 * @title AppBridge Parent Example
 */
@Component({
  selector: 'app-bridge-parent-example',
  templateUrl: 'app-bridge-parent-example.html',
  styleUrls: ['app-bridge-parent-example.css'],
  standalone: false,
})
export class AppBridgeParentExample implements OnInit, OnDestroy {
  private bridge: AppBridge;

  childUrl: SafeResourceUrl;

  // One slot per action — null until that action has been received at least once
  received: Record<string, any> = {
    register: null,
    open: null,
    update: null,
    close: null,
    refresh: null,
    pin: null,
    customEvent: null,
  };

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Build child URL from current base (works with any deploy path or localhost)
    const base = window.location.href.split('#')[0];
    this.childUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${base}#/testing/app-bridge-child`);

    this.bridge = new AppBridge('e2e-parent');

    this.bridge.handle(AppBridgeHandler.REGISTER, (packet: any, callback: Function) => {
      this.received.register = packet.id ?? 'registered';
      this.cdr.detectChanges();
      callback('e2e-child-window');
    });

    this.bridge.handle(AppBridgeHandler.OPEN, (packet: any, callback: Function) => {
      this.received.open = `${packet.entityType}:${packet.entityId ?? ''}`;
      this.cdr.detectChanges();
      callback(true);
    });

    this.bridge.handle(AppBridgeHandler.UPDATE, (packet: any, callback: Function) => {
      this.received.update = packet.title ?? packet.entityType ?? JSON.stringify(packet);
      this.cdr.detectChanges();
      callback(true);
    });

    this.bridge.handle(AppBridgeHandler.CLOSE, (_packet: any, callback: Function) => {
      this.received.close = 'closed';
      this.cdr.detectChanges();
      callback(true);
    });

    this.bridge.handle(AppBridgeHandler.REFRESH, (_packet: any, callback: Function) => {
      this.received.refresh = 'refreshed';
      this.cdr.detectChanges();
      callback(true);
    });

    this.bridge.handle(AppBridgeHandler.PIN, (_packet: any, callback: Function) => {
      this.received.pin = 'pinned';
      this.cdr.detectChanges();
      callback(true);
    });

    this.bridge.handle(AppBridgeHandler.CALLBACK, (packet: any, callback: Function) => {
      this.received.customEvent = packet.key ?? JSON.stringify(packet);
      this.cdr.detectChanges();
      callback(true);
    });

    // Custom events from the child arrive via addEventListener
    this.bridge.addEventListener('e2eChildEvent', (data: any) => {
      this.received.customEvent = JSON.stringify(data);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    // AppBridge has no teardown API; postRobot listeners will be GC'd with the window
  }

  fireEventToChildren(): void {
    this.bridge.fireEventToChildren('e2eParentEvent', { from: 'parent' });
  }
}
