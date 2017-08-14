// NG2
import { Component } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams } from '../modal/Modal';

@Component({
    selector: 'control-confirm-modal',
    template: `
        <novo-notification type="warning">
            <h1>Are you sure you want to change this field?</h1>
            <h2><label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}</h2>
            <button theme="standard" (click)="close(false)">Cancel</button>
            <button theme="primary" icon="check" (click)="close(true)" autofocus>Change</button>
        </novo-notification>
    `
})
export class ControlConfirmModal {
    constructor(private modalRef: NovoModalRef, public params: NovoModalParams) {
    }

    public close(result: boolean): void {
        this.modalRef.close(result);
    }
}
