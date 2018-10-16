import { Component } from '@angular/core';
import { NovoModalService, NovoModalRef } from 'novo-elements';

@Component({
  selector: 'modal-warning-demo',
  template: `
  <novo-notification type="warning">
    <h1>This action will delete 25 records.</h1>
    <h2>Are you sure you wish to continue?</h2>
    <button theme="standard" (click)="close()">Cancel</button>
    <button theme="primary" color="negative" icon="delete" (click)="close()">Delete</button>
  </novo-notification>
`,
})
export class ModalWarningDemo {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * @title Warning Modal Example
 */
@Component({
  selector: 'warning-modal-example',
  templateUrl: 'warning-modal-example.html',
  styleUrls: ['warning-modal-example.css'],
})
export class WarningModalExample {
  constructor(private modalService: NovoModalService) {}
  showModal() {
    this.modalService.open(ModalWarningDemo);
  }
}
