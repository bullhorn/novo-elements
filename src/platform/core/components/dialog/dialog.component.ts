import { Component } from '@angular/core';
import { NovoDialogRef } from './dialog-ref';

@Component({
  selector: 'novo-alert-dialog',
  template: `
    <novo-card class="example-card">
        <header theme="white" *ngIf="title">
            <h1>{{ title }}</h1>
        </header>
        <main>
            <p>{{ message }}</p>
        </main>
        <footer>
            <button theme="dialogue" (click)="close()">{{ closeButton }}</button>
        </footer>
    </novo-card>
  `,
})
export class NovoAlertDialogComponent {
  public title: string;
  public message: string;
  public closeButton: string = 'CLOSE';

  constructor(private _dialogRef: NovoDialogRef<NovoAlertDialogComponent>) {}

  public close(): void {
    this._dialogRef.close();
  }
}

@Component({
  selector: 'novo-confirm-dialog',
  template: `
    <novo-card class="example-card">
    <header theme="white" *ngIf="title">
        <h1>{{ title }}</h1>
    </header>
    <main>
        <p>{{ message }}</p>
    </main>
    <footer>
        <button theme="dialogue" (click)="cancel()">{{ cancelButton }}</button>
        <button theme="dialogue" (click)="accept()">{{ acceptButton }}</button>
    </footer>
    </novo-card>
    `,
})
export class NovoConfirmDialogComponent {
  public title: string;
  public message: string;
  public cancelButton: string = 'CANCEL';
  public acceptButton: string = 'ACCEPT';

  constructor(private _dialogRef: NovoDialogRef<NovoConfirmDialogComponent>) {}

  public cancel(): void {
    this._dialogRef.close(false);
  }

  public accept(): void {
    this._dialogRef.close(true);
  }
}

@Component({
  selector: 'novo-notification-dialog',
  template: `
    <novo-card>
        <main layout-align="center center">
            <novo-icon [color]="type">{{ icon }}</novo-icon>
            <h1>{{ title }}</h1>
            <p caption>{{ message }}</p>
        </main>
        <footer layout-align="end">
            <ng-container *ngFor="let button of buttons; let last = last;">
                <button *ngIf="!last" theme="dialogue" (click)="submit(button)">{{ button }}</button>
                <button *ngIf="last" theme="standard" [color]="type" [icon]="buttonIcon" (click)="submit(button)">{{ button }}</button>
            </ng-container>
        </footer>
    </novo-card>
    `,
})
export class NovoNotificationDialogComponent {
  public type: string;
  public title: string;
  public message: string;
  public buttons: string[] = ['OK'];

  public get icon(): string {
    switch (this.type) {
      case 'success':
        return 'check';
      case 'warning':
        return 'caution';
      case 'error':
        return 'caution';
      default:
        return 'info';
    }
  }
  public get buttonIcon(): string {
    switch (this.type) {
      case 'success':
        return 'check';
      case 'warning':
        return 'caution';
      case 'error':
        return 'caution';
      default:
        return 'info';
    }
  }

  constructor(private _dialogRef: NovoDialogRef<NovoConfirmDialogComponent>) {}

  public submit(value: string): void {
    this._dialogRef.close(value);
  }
}
