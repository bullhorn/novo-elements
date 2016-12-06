// NG2
import { Component, OnInit } from '@angular/core';
// APP
let ModalAddDemoTpl = require('./templates/ModalAddDemo.html');
let ModalEditDemoTpl = require('./templates/ModalEditDemo.html');
let ModalErrorDemoTpl = require('./templates/ModalErrorDemo.html');
let ModalCustomDemoTpl = require('./templates/ModalCustomDemo.html');
let ModalSuccessDemoTpl = require('./templates/ModalSuccessDemo.html');
let ModalWarningDemoTpl = require('./templates/ModalWarningDemo.html');
// Vendor
import { NovoModalRef, NovoModalService, TextBoxControl, FormUtils } from './../../../../index';

const template = `
<div class="container">
    <h1>Modals <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/modal">(source)</a></small></h1>
    <p>Modals are pop-up dialogues designed to grab attention and inform the user of something critical, force a decision, or extend a workflow. There are two categories of modals: notification and workflow. Regardless of type, a modal should have a maximum of two main buttons.</p>

    <h2>Notification Modals</h2>

    <h5>Success</h5>
    <p>This modal uses only a primary action button. It is a confirmation that an action has been completed when the result is not immediately apparent. A workflow modal often transitions into a success modal.</p>
    <div class="example modal-demo"><button theme="secondary" (click)="showSuccess()">Show Me :)</button></div>
    <code-snippet [code]="ModalSuccessDemoTpl"></code-snippet>

    <h5>Warning</h5>
    <p>Warning modals ask for additional confirmation to complete an action because the action is either irreversible or there is an exception. The first line should always clarify the action or eventual result.</p>
      <div class="example modal-demo"><button theme="secondary" (click)="showWarning()">Show Me :)</button></div>
    <code-snippet [code]="ModalWarningDemoTpl"></code-snippet>

    <h5>Error</h5>
    <p>Error modals indicate that an attempted action has failed. The first line should apologize and state the what happened. The second line should quickly attempt to explain to the user why this has happened, and instruct the user on the best course of action.</p>
    <div class="example modal-demo"><button theme="secondary" (click)="showError()">Show Me :)</button></div>
    <code-snippet [code]="ModalErrorDemoTpl"></code-snippet>

    <h5>Custom</h5>
    <p>In the case where "Success", "Warning", and "Error" notfications aren't enough, use the custom notification. Custom notifcations allow any of the Bullhorn Icons to be used in the notification.</p>
    <div class="example modal-demo"><button theme="secondary" (click)="showCustom()">Show Me :)</button></div>
    <code-snippet [code]="ModalCustomDemoTpl"></code-snippet>

    <h2>Workflow Modals</h2>

    <h5>Add</h5>
    <p>Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.</p>
    <div class="example modal-demo"><button theme="secondary" (click)="showAdd()">Show Me :)</button></div>
    <code-snippet [code]="ModalAddDemoTpl"></code-snippet>

    <h5>Edit & Send</h5>
    <p>Edit, Send, and non-Add workflow modals possess a plain header to remind the user of the action they are taking. They generally have a neutralizing button, and a primary button.</p>
    <div class="example modal-demo"><button data-automation-id="modal-trigger" theme="secondary" (click)="showEdit()">Show Me :)</button></div>
    <code-snippet [code]="ModalEditDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'modal-success-demo',
    template: ModalSuccessDemoTpl
})
export class ModalSuccessDemo {
    constructor(private modalRef:NovoModalRef) {
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-warning-demo',
    template: ModalWarningDemoTpl
})
export class ModalWarningDemo {
    constructor(private modalRef:NovoModalRef) {
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-error-demo',
    template: ModalErrorDemoTpl
})
export class ModalErrorDemo {
    constructor(private modalRef:NovoModalRef) {
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-custom-demo',
    template: ModalCustomDemoTpl
})
export class ModalCustomDemo {
    constructor(private modalRef:NovoModalRef) {
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-add-demo',
    template: ModalAddDemoTpl
})
export class ModalAddDemo implements OnInit {
    private textControl:any;
    private emailControl:any;
    private numberControl:any;
    private textForm:any;

    constructor(private modalRef:NovoModalRef, private formUtils:FormUtils) {
    }

    ngOnInit() {
        this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box' });
        this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
        this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
        this.textForm = this.formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl]);
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-edit-demo',
    template: ModalEditDemoTpl
})
export class ModalEditDemo implements OnInit {
    private textControl:any;
    private emailControl:any;
    private numberControl:any;
    private textForm:any;

    constructor(private modalRef:NovoModalRef, private formUtils:FormUtils) {
        this.formUtils = formUtils;
        this.modalRef = modalRef;
    }

    ngOnInit() {
        this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box' });
        this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
        this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
        this.textForm = this.formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl]);
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'modal-demo',
    template: template
})
export class ModalDemoComponent {
    private ModalAddDemoTpl:string = ModalAddDemoTpl;
    private ModalEditDemoTpl:string = ModalEditDemoTpl;
    private ModalErrorDemoTpl:string = ModalErrorDemoTpl;
    private ModalCustomDemoTpl:string = ModalCustomDemoTpl;
    private ModalSuccessDemoTpl:string = ModalSuccessDemoTpl;
    private ModalWarningDemoTpl:string = ModalWarningDemoTpl;

    constructor(private modalService:NovoModalService) {
        this.modalService = modalService;
    }

    showSuccess() {
        this.modalService.open(ModalSuccessDemo);
    }

    showWarning() {
        this.modalService.open(ModalWarningDemo);
    }

    showError() {
        this.modalService.open(ModalErrorDemo);
    }

    showCustom() {
        this.modalService.open(ModalCustomDemo);
    }

    showAdd() {
        this.modalService.open(ModalAddDemo);
    }

    showEdit() {
        this.modalService.open(ModalEditDemo);
    }
}
