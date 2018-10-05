import { Component, OnInit } from '@angular/core';
import { NovoModalService, NovoModalRef, FormUtils, TextBoxControl, PickerControl, PickerResults } from 'novo-elements';

@Component({
  selector: 'modal-edit-form-demo',
  template: `
  <novo-modal>
    <header title="Add Contact" icon="person" theme="contact">
        <utils>
            <util-action icon="times" (click)="close()"></util-action>
        </utils>
    </header>
    <section>
        <novo-form [form]="textForm">
            <div class="novo-form-row">
                <novo-control [form]="textForm" [control]="textControl"></novo-control>
            </div>
            <div class="novo-form-row">
                <novo-control [form]="textForm" [control]="emailControl"></novo-control>
            </div>
            <div class="novo-form-row">
                <novo-control [form]="textForm" [control]="numberControl"></novo-control>
            </div>
            <div class="novo-form-row">
                <novo-control [form]="textForm" [control]="pickerControl"></novo-control>
            </div>
        </novo-form>
    </section>
    <button theme="standard" (click)="close()">Cancel</button>
    <button theme="primary" color="success" icon="check" (click)="close()">Save</button>
  </novo-modal>
`,
})
export class ModalAddFormDemo implements OnInit {
  public textControl: any;
  public emailControl: any;
  public numberControl: any;
  public pickerControl: any;
  public textForm: any;

  constructor(private modalRef: NovoModalRef, private formUtils: FormUtils) {}

  ngOnInit() {
    this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box' });
    this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
    this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
    this.pickerControl = new PickerControl({
      key: 'picker',
      multiple: false,
      label: 'Picker',
      required: true,
      config: {
        resultsTemplate: PickerResults,
        options: ['Apple', 'Banana', 'Grapes', 'Orange', 'Pear'],
      },
    });

    this.textForm = this.formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl, this.pickerControl]);
  }

  close() {
    this.modalRef.close();
  }
}

/**
 * @title Modal Add Form Example
 */
@Component({
  selector: 'modal-add-form-example',
  templateUrl: 'modal-add-form-example.html',
  styleUrls: ['modal-add-form-example.css'],
})
export class ModalAddFormExample {
  constructor(private modalService: NovoModalService) {}
  showModal() {
    this.modalService.open(ModalAddFormDemo);
  }
}
