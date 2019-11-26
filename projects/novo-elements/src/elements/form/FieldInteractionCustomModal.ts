import { Component } from '@angular/core';
import { NovoModalRef, NovoCustomModalParams } from '../modal/Modal';

@Component({
  selector: 'control-prompt-custom-modal',
  template: `
    <novo-notification [type]="modalConfig?.notificationType">
      <h1>{{ modalConfig?.header }}</h1>
      <h2 *ngIf="modalConfig?.message"><label [innerHTML]="modalConfig?.message"></label></h2>
      <button
        *ngIf="modalConfig?.buttonCancel"
        [theme]="modalConfig?.buttonCancel.theme"
        [icon]="modalConfig?.buttonCancel.icon"
        (click)="close(false)"
      >
        {{ modalConfig?.buttonCancel.label }}
      </button>
      <button
        *ngIf="modalConfig?.buttonOK"
        [theme]="modalConfig?.buttonOK.theme"
        [icon]="modalConfig?.buttonOK.icon"
        (click)="close(true)"
        autofocus
      >
        {{ modalConfig?.buttonOK.label }}
      </button>
    </novo-notification>
  `,
})
export class ControlCustomPromptModal {
  constructor(private modalRef: NovoModalRef, public modalConfig: NovoCustomModalParams) {}

  public close(result: boolean): void {
    this.modalRef.close(result);
  }
}
