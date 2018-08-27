import { Component } from '@angular/core';
import { NovoModalService, NovoModalRef } from 'novo-elements';

@Component({
  selector: 'modal-success-demo',
  template: `
  <novo-notification type="success">
    <h1>Woooo!</h1>
    <h2>You did something awesome!</h2>
    <button theme="primary" icon="check" (click)="close()">I'm awesome</button>
  </novo-notification>
`,
})
export class ModalSuccessDemo {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * @title Success Modal Example
 */
@Component({
  selector: 'success-modal-example',
  templateUrl: 'success-modal-example.html',
  styleUrls: ['success-modal-example.css'],
})
export class SuccessModalExample {
  constructor(private modalService: NovoModalService) {}
  showModal() {
    this.modalService.open(ModalSuccessDemo);
  }
}
