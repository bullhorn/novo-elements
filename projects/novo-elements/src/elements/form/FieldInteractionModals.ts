// NG2
import { Component } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams } from '../modal/Modal';
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'control-confirm-modal',
  template: `
        <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
            <h1>{{ labels.confirmChangesModalMessage }}</h1>
            <h2 *ngIf="!params['message']"><label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}</h2>
            <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
            <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">{{ labels.cancel }}</button>
            <button theme="primary" icon="check" (click)="close(true)" autofocus [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']">{{ labels.save }}</button>
        </novo-notification>
    `,
})
export class ControlConfirmModal {
  constructor(private modalRef: NovoModalRef, public params: NovoModalParams, public labels: NovoLabelService) {}

  public close(result: boolean): void {
    this.modalRef.close(result);
  }
}

@Component({
  selector: 'control-prompt-modal',
  template: `
        <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
            <h1>{{ labels.promptModalMessage }}</h1>
            <p *ngFor="let change of params['changes']">{{ change }}</p>
            <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">{{ labels.cancel }}</button>
            <button theme="primary" icon="check" (click)="close(true)" autofocus [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']">{{ labels.yes }}</button>
        </novo-notification>
    `,
})
export class ControlPromptModal {
  constructor(private modalRef: NovoModalRef, public params: NovoModalParams, public labels: NovoLabelService) { }

  public close(result: boolean): void {
    this.modalRef.close(result);
  }
}

@Component({
  selector: 'control-prompt-custom-modal',
  template: `
        <novo-notification type="{{params['modalConfig'].notificationType}}" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
            <h1>{{ params['modalConfig'].header }}</h1>
            <h2 *ngIf="params['modalConfig'].message"><label [innerHTML]="params['modalConfig'].message"></label></h2>
            <button *ngIf="params['modalConfig'].buttonCancel.label" theme="{{params['modalConfig'].buttonCancel.theme}}" icon="{{params['modalConfig'].buttonCancel.icon}}" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">{{ params['modalConfig'].buttonCancel.label }}</button>
            <button *ngIf="params['modalConfig'].buttonOK.label" theme="{{params['modalConfig'].buttonOK.theme}}" icon="{{params['modalConfig'].buttonOK.icon}}" (click)="close(true)" autofocus [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']">{{ params['modalConfig'].buttonOK.label }}</button>
        </novo-notification>
    `,
})
export class ControlCustomPromptModal {
  constructor(private modalRef: NovoModalRef, public params: NovoModalParams, public labels: NovoLabelService) { }

  public close(result: boolean): void {
    this.modalRef.close(result);
  }
}
