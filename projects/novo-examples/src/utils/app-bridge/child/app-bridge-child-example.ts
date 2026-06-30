import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppBridge } from 'novo-elements';

/**
 * @title AppBridge Child Example
 */
@Component({
  selector: 'app-bridge-child-example',
  templateUrl: 'app-bridge-child-example.html',
  styleUrls: ['app-bridge-child-example.css'],
  standalone: false,
})
export class AppBridgeChildExample implements OnInit {
  private bridge: AppBridge;

  status = '—';
  parentEvent = '—';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bridge = new AppBridge('e2e-child');

    // Listen for events broadcast from the parent
    this.bridge.addEventListener('e2eParentEvent', (data: any) => {
      this.parentEvent = JSON.stringify(data);
      this.cdr.detectChanges();
    });

    // Auto-register with the parent frame on load
    this.register();
  }

  register(): void {
    this.bridge
      .register({ title: 'E2E Child', url: window.location.href })
      .then((windowName) => {
        this.status = `registered (windowName: ${windowName})`;
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.status = 'register failed (no parent)';
        this.cdr.detectChanges();
      });
  }

  open(): void {
    this.bridge
      .open({ type: 'record', entityType: 'Candidate', entityId: '1' })
      .then(() => this.setStatus('open: ok'))
      .catch(() => this.setStatus('open: failed'));
  }

  update(): void {
    this.bridge
      .update({ title: 'E2E Test Title', entityType: 'Candidate' })
      .then(() => this.setStatus('update: ok'))
      .catch(() => this.setStatus('update: failed'));
  }

  close(): void {
    this.bridge
      .close()
      .then(() => this.setStatus('close: ok'))
      .catch(() => this.setStatus('close: failed'));
  }

  refresh(): void {
    this.bridge
      .refresh()
      .then(() => this.setStatus('refresh: ok'))
      .catch(() => this.setStatus('refresh: failed'));
  }

  pin(): void {
    this.bridge
      .pin()
      .then(() => this.setStatus('pin: ok'))
      .catch(() => this.setStatus('pin: failed'));
  }

  fireEvent(): void {
    this.bridge
      .fireEvent('e2eChildEvent', { from: 'child', ts: Date.now() })
      .then(() => this.setStatus('fireEvent: ok'))
      .catch(() => this.setStatus('fireEvent: failed'));
  }

  private setStatus(msg: string): void {
    this.status = msg;
    this.cdr.detectChanges();
  }
}
