import { Component } from '@angular/core';
import { NovoModalService, NovoModalRef } from 'novo-elements';

@Component({
  selector: 'modal-error-demo',
  template: `
  <novo-notification type="error">
    <h1>Sorry, something went wrong.</h1>
    <h2>You did not have 1.21 gigawatts of power.</h2>
    <button theme="primary" icon="refresh-o" (click)="close()">Refresh this page</button>
  </novo-notification>
`,
})
export class ModalErrorDemo {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * @title Error Modal Example
 */
@Component({
  selector: 'error-modal-example',
  templateUrl: 'error-modal-example.html',
  styleUrls: ['error-modal-example.css'],
})
export class ErrorModalExample {
  constructor(private modalService: NovoModalService) {}
  showModal() {
    this.modalService.open(ModalErrorDemo);
  }
}
