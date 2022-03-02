import { Component, OnInit } from '@angular/core';
import { FormUtils, NovoAsideRef, NovoAsideService, PickerControl, PickerResults, TextBoxControl } from 'novo-elements';

@Component({
  selector: 'aside-form-demo',
  template: `
    <header title="Add Contact" icon="person" theme="contact">
      <utils>
        <util-action icon="times" (click)="close()"></util-action>
      </utils>
    </header>
    <section padding="lg">
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
  `,
  host: {
    // tslint:disable-next-line: quotemark
    '[style.display]': "'block'",
    // tslint:disable-next-line: quotemark
    '[style.width.%]': "'100'",
  },
})
export class AsideFormDemo implements OnInit {
  public textControl: any;
  public emailControl: any;
  public numberControl: any;
  public pickerControl: any;
  public textForm: any;

  constructor(private ref: NovoAsideRef, private formUtils: FormUtils) {}

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
    this.ref.close();
  }
}

/**
 * @title Aside Form Example
 */
@Component({
  selector: 'aside-form-example',
  templateUrl: 'aside-form-example.html',
  styleUrls: ['aside-form-example.css'],
})
export class AsideFormExample {
  constructor(private aside: NovoAsideService) {}
  showAside() {
    this.aside.open(AsideFormDemo);
  }
}
