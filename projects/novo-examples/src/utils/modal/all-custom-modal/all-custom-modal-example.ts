import { NovoModalRef, NovoModalService } from 'novo-elements';
import { Component, ViewContainerRef } from '@angular/core';

export interface ModalConfig {
  notificationType?: string;
  header?: string;
  message?: string;
  buttonCancel?: { label: string; theme?: string; icon?: string };
  buttonOK?: { label: string; theme?: string; icon?: string };
}

@Component({
  selector: 'control-prompt-custom-modal',
  template: `
    <novo-notification [type]="params?.notificationType">
      <h1>{{ params?.header }}</h1>
      <h2 *ngIf="params?.message"><label [innerHTML]="params?.message"></label></h2>
      <button *ngIf="params?.buttonCancel" [theme]="params?.buttonCancel.theme" [icon]="params?.buttonCancel.icon" (click)="close(false)">
        {{ params?.buttonCancel.label }}
      </button>
      <button *ngIf="params?.buttonOK" [theme]="params?.buttonOK.theme" [icon]="params?.buttonOK.icon" (click)="close(true)" autofocus>
        {{ params?.buttonOK.label }}
      </button>
    </novo-notification>
  `,
})
export class AllCustomModal {
  constructor(private modalRef: NovoModalRef, public params: ModalConfig) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * @title Custom Modal Example
 */
@Component({
  selector: 'all-custom-modal-example',
  templateUrl: 'all-custom-modal-example.html',
  styleUrls: ['all-custom-modal-example.css'],
})
export class AllCustomModalExample {
  constructor(private viewRef: ViewContainerRef, private modalService: NovoModalService) {
    this.modalService.parentViewContainer = this.viewRef;
  }
  showModal() {
    const modalConfig: ModalConfig = {
      notificationType: 'warning',
      header: 'Header',
      message: 'message',
      buttonCancel: { label: 'Cancel', theme: 'standard', icon: 'refresh-o' },
      buttonOK: { label: 'OK', theme: 'primary', icon: 'check' },
    };
    this.modalService.open(AllCustomModal, modalConfig);
  }
}
