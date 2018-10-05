import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

/**
 * @title Static Toast Usage
 */
@Component({
  selector: 'toast-usage-example',
  templateUrl: 'toast-usage-example.html',
  styleUrls: ['toast-usage-example.css'],
})
export class ToastUsageExample {
  public themes: Array<string> = ['default', 'success', 'info', 'warning', 'danger'];
  public icons: Array<string> = ['add', 'check', 'clock', 'lock', 'caution'];
  public toast: any = {
    theme: 'danger',
    icon: 'caution',
  };

  changeToast() {
    this.toast = {
      theme: this.themes[(this.themes.indexOf(this.toast.theme) + 1) % this.themes.length],
      icon: this.icons[(this.icons.indexOf(this.toast.icon) + 1) % this.icons.length],
    };
  }
}
