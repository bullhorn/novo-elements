import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

const HEADER_THEMES = ['company', 'job', 'candidate', 'contact', 'opportunity', 'lead', 'light', 'white'];
const HEADER_ICONS = ['company', 'job', 'candidate', 'person', 'opportunity', 'lead', 'bolt', 'shield'];

/**
 * @title Basic Header Example
 */
@Component({
  selector: 'basic-header-example',
  templateUrl: 'basic-header-example.html',
  styleUrls: ['basic-header-example.css'],
})
export class BasicHeaderExample {
  public theme: string = 'company';
  public icon: string = 'company';
  private options: any;
  private themeIndex: number = 0;

  constructor(private toaster: NovoToastService) {
    this.toaster = toaster;
    this.options = {
      title: 'Title',
      message: 'Some Message...',
      theme: 'ocean',
      icon: 'clipboard',
      position: 'growlTopRight',
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
      position: 'growlTopRight',
    };

    // Fire toast
    this.toaster.alert(this.options);
  }
}
