// NG
import { Component, OnInit } from '@angular/core';
// Vendor
import { NovoModalParams, NovoModalRef } from '../modal-ref';
import { NovoLabelService } from 'novo-elements/services';

@Component({
    selector: 'novo-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    standalone: false,
})
export class NovoConfirmModal implements OnInit {
    headerText: string;
    subheaderText: string;
    descriptionText1: string;
    descriptionText2: string;
    buttonColor: string;
    confirmButtonText: string;
    cancelButtonText: string;
    buttonIcon: string;
    showCancel: boolean;
    hideClose: boolean;
    truncateSubheader: boolean;
    customIcon: string;

    constructor(private params: NovoModalParams, private novoModalRef: NovoModalRef, public labels: NovoLabelService) {}

    ngOnInit(): void {
        this.headerText = this.params['headerText'];
        this.subheaderText = this.params['subheaderText'];
        this.descriptionText1 = this.params['descriptionText1'];
        this.descriptionText2 = this.params['descriptionText2'];
        this.buttonColor = this.params['buttonColor'] || 'action';
        this.confirmButtonText = this.params['confirmButtonText'] || this.labels.yes;
        this.buttonIcon = this.params['buttonIcon'];
        this.cancelButtonText = this.params['cancelButtonText'] || this.labels.cancel;
        this.hideClose = this.params['hideClose'] || false;
        this.showCancel = this.params['showCancel'] ?? true;
        this.truncateSubheader = this.params['truncateSubheader'] ?? true;
        this.customIcon = this.params['customIcon'] ?? null;
    }

    yes(): void {
        this.novoModalRef.close(true);
    }

    cancel(): void {
        this.novoModalRef.close();
    }
}
