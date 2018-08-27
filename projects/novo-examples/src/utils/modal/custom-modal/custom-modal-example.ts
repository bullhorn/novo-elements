import { Component } from '@angular/core';
import { NovoModalService, NovoModalRef } from 'novo-elements';

@Component({
  selector: 'modal-custom-demo',
  template: `
  <novo-notification type="custom" icon="trending-up">
    <h1>I have a trending icon!</h1>
    <h2>This notification type allows for any Bullhorn Icon</h2>
    <button theme="primary" icon="check" (click)="close()">Sweet.</button>
  </novo-notification>
`,
})
export class ModalCustomDemo {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * @title Custom Modal Example
 */
@Component({
  selector: 'custom-modal-example',
  templateUrl: 'custom-modal-example.html',
  styleUrls: ['custom-modal-example.css'],
})
export class CustomModalExample {
  constructor(private modalService: NovoModalService) {}
  showModal() {
    this.modalService.open(ModalCustomDemo);
  }
}
