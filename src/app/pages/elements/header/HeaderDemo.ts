// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from './../../../../platform/index';
// APP
let HeaderDemoTpl = require('./templates/HeaderDemo.html');
let HeaderCondensedTpl = require('./templates/HeaderCondensed.html');
let SubTitleDemoTpl = require('./templates/SubTitle.html');
let HeaderWithSearchDemoTpl = require('./templates/HeaderWithSearchDemo.html');

const template = `
<div class="container">
    <h1>Headers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/header">(source)</a></small></h1>
    <p>Headers are used in Mainframe Record pages and some modals. </p>

    <h2>Types</h2>

    <h5>Record Header</h5>
    <p>Record headers have details about the entity record and tabbed navigation.</p>
    <div class="example header-demo">${HeaderDemoTpl}</div>
    <code-snippet [code]="HeaderDemoTpl"></code-snippet>

    <h5>Condensed</h5>
    <div class="example header-demo">${HeaderCondensedTpl}</div>
    <code-snippet [code]="HeaderCondensedTpl"></code-snippet>

    <h2>Options</h2>

    <h5>SubTitle</h5>
    <div class="example header-demo">${SubTitleDemoTpl}</div>
    <code-snippet [code]="SubTitleDemoTpl"></code-snippet>

    <h5>With Search</h5>
    <div class="example header-demo">${HeaderWithSearchDemoTpl}</div>
    <code-snippet [code]="HeaderWithSearchDemoTpl"></code-snippet>
</div>
`;

const HEADER_THEMES = ['company', 'job', 'candidate', 'contact', 'opportunity', 'lead', 'light', 'white'];
const HEADER_ICONS = ['company', 'job', 'candidate', 'person', 'opportunity', 'lead', 'bolt', 'shield'];

@Component({
  selector: 'header-demo',
  template: template
})
export class HeaderDemoComponent {
  private HeaderDemoTpl: string = HeaderDemoTpl;
  private SubTitleDemoTpl: string = SubTitleDemoTpl;
  private HeaderWithSearchDemoTpl: string = HeaderWithSearchDemoTpl;
  private HeaderCondensedTpl: string = HeaderCondensedTpl;
  private theme: string = 'company';
  private icon: string = 'company';
  private options: any;
  public isChecked: boolean;
  private themeIndex: number = 0;

  constructor(private toaster: NovoToastService) {
    this.toaster = toaster;
    this.options = {
      'title': 'Title',
      'message': 'Some Message...',
      'theme': 'ocean',
      'icon': 'clipboard',
      'position': 'growlTopRight'
    };
  }

  changeTheme() {
    this.themeIndex = this.themeIndex === HEADER_THEMES.length - 1 ? 0 : this.themeIndex + 1;
    this.theme = HEADER_THEMES[this.themeIndex];
    this.icon = HEADER_ICONS[this.themeIndex];
  }

  catchEv(type, ev) {
    // Set toast options
    this.options = {
      title: `${type}`,
      message: `${ev} fired...`,
      theme: 'ocean',
      icon: `${type}`,
      position: 'growlTopRight'
    };

    // Fire toast
    this.toaster.alert(this.options);
  }
}
