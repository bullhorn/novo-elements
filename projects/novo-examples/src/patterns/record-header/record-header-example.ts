import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

const HEADER_THEMES = ['company', 'job', 'candidate', 'contact', 'opportunity', 'lead', 'light', 'white'];
const HEADER_ICONS = ['company', 'job', 'candidate', 'person', 'opportunity', 'lead', 'bolt', 'shield'];

/**
 * @title Basic Header Example
 */
@Component({
  selector: 'record-header-example',
  templateUrl: 'record-header-example.html',
  styleUrls: ['record-header-example.css'],
})
export class RecordHeaderExample {
  public theme: string = 'company';
  public icon: string = 'company';
  public record: any;
  public values: any[];
  public tabs: string[];
  private options: any = {
    title: 'Title',
    message: 'Some Message...',
    theme: 'ocean',
    icon: 'clipboard',
    position: 'growlTopRight',
  };
  private themeIndex: number = 0;

  constructor(private toaster: NovoToastService) {
    this.refresh();
  }

  refresh() {
    this.values = undefined;
    this.tabs = undefined;
    this.record = undefined;

    setTimeout(() => {
      this.values = [{ label: 'Status', data: 'Open' }, { label: 'Phone', data: '555-555-5555' }, { label: 'Address', data: 'Boston, MA' }];
      this.tabs = ['Overview', 'Edit', 'Activity'];
      this.record = {
        id: 101,
        name: 'Acme Corporation, LLC',
      };
    }, 5000);
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
