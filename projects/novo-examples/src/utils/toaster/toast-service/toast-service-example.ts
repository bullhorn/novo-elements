import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

/**
 * @title Toaster Service Usage
 */
@Component({
  selector: 'toast-service-example',
  templateUrl: 'toast-service-example.html',
  styleUrls: ['toast-service-example.css'],
})
export class ToastServiceExample {
  public options: any = {
    title: 'Title',
    message: 'Some Message...',
  };

  constructor(private toaster: NovoToastService) {}

  toastToggled(arg) {
    if (arg === 'top') {
      this.options = {
        title: 'Top',
        message: 'This positioning is fixedTop',
        icon: 'coffee',
        theme: 'success',
        position: 'fixedTop',
      };
    } else if (arg === 'bottom') {
      this.options = {
        title: 'Bottom',
        message: 'This positioning is fixedBottom',
        icon: 'check',
        theme: 'warning-outline',
        position: 'fixedBottom',
        hideDelay: 1000000,
      };
    } else if (arg === 'growlTopRight') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopRight',
        icon: 'times',
        theme: 'danger',
        position: 'growlTopRight',
        hideDelay: 100000000,
      };
    } else if (arg === 'growlTopLeft') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopLeft',
        icon: 'coffee',
        theme: 'ocean',
        position: 'growlTopLeft',
        hideDelay: 100000000,
      };
    } else if (arg === 'growlBottomRight') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopRight',
        icon: 'times',
        theme: 'danger',
        position: 'growlBottomRight',
      };
    } else if (arg === 'growlBottomLeft') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopLeft',
        icon: 'coffee',
        theme: 'ocean',
        position: 'growlBottomLeft',
      };
    }
    this.toaster.alert(this.options);
  }
}
