// NG2
import { Component } from '@angular/core';
// APP
let BasicRadioTpl = require('./templates/BasicRadio.html');
let VerticalRadioTpl = require('./templates/VerticalRadio.html');
let ButtonRadioTpl = require('./templates/ButtonRadio.html');
let IconRadioTpl = require('./templates/IconRadio.html');

const template = `
<div class="container">
    <h1>Radio <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/radio">(source)</a></small></h1>
    <p>A radio group</p>

    <h5>Basic</h5>
    <div class="example radio-demo">${BasicRadioTpl}</div>
    <code-snippet [code]="BasicRadioTpl"></code-snippet>

    <h5>Vertical</h5>
    <div class="example radio-demo">${VerticalRadioTpl}</div>
    <code-snippet [code]="VerticalRadioTpl"></code-snippet>

    <h5>Button Radio</h5>
    <div class="example radio-demo">${ButtonRadioTpl}</div>
    <code-snippet [code]="ButtonRadioTpl"></code-snippet>


    <h5>Icon Radio</h5>
    <div class="example radio-demo">${IconRadioTpl}</div>
    <code-snippet [code]="IconRadioTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'radio-demo',
  template: template,
})
export class RadioDemoComponent {
  BasicRadioTpl: string = BasicRadioTpl;
  VerticalRadioTpl: string = VerticalRadioTpl;
  ButtonRadioTpl: string = ButtonRadioTpl;
  IconRadioTpl: string = IconRadioTpl;

  onChangeVertical(change) {
    console.log('Vertical Radio Change:', change); // tslint:disable-line
  }

  onChangeBasic(change) {
    console.log('Basic Radio Change:', change); // tslint:disable-line
  }

  onChangeButton(change) {
    console.log('Button Radio Change:', change); // tslint:disable-line
  }

  onChangeIcon(change) {
    console.log('Button Icon Radio Change:', change); // tslint:disable-line
  }
}
