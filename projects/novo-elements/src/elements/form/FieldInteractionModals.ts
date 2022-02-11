// NG2
import { Component } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { NovoModalParams, NovoModalRef } from '../modal/modal-ref';

@Component({
  selector: 'control-confirm-modal',
  template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.confirmChangesModalMessage }}</h1>
      <h2 *ngIf="!params['message']">
        <label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}
      </h2>
      <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']"
      >
        {{ labels.save }}
      </novo-button>
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
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']"
      >
        {{ labels.yes }}
      </novo-button>
    </novo-notification>
  `,
})
export class ControlPromptModal {
  constructor(private modalRef: NovoModalRef, public params: NovoModalParams, public labels: NovoLabelService) {}

  public close(result: boolean): void {
    this.modalRef.close(result);
  }
}
