import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

/**
 * @title Toaster Actions Usage
 */
@Component({
  selector: 'toast-actions-example',
  templateUrl: 'toast-actions-example.html',
  styleUrls: ['toast-actions-example.css'],
})
export class ToastActionsExample {
  public options: any = {
    title: 'Title',
    message: 'Some Message...',
    action: 'Click Me',
  };

  constructor(private toaster: NovoToastService) {}

  toastToggled(arg) {
    if (arg === 'top') {
      this.options = {
        title: 'Top',
        message: 'This positioning is fixedTop',
        action: 'Click Me',
        icon: 'coffee',
        theme: 'success',
        position: 'fixedTop',
      };
    } else if (arg === 'bottom') {
      this.options = {
        title: 'Bottom',
        message: 'This positioning is fixedBottom',
        action: 'Click Me',
        icon: 'check',
        theme: 'warning-outline',
        position: 'fixedBottom',
        hideDelay: 1000000,
      };
    } else if (arg === 'growlTopRight') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopRight',
        action: 'Click Me',
        icon: 'times',
        theme: 'danger',
        position: 'growlTopRight',
        hideDelay: 100000000,
      };
    } else if (arg === 'growlTopLeft') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopLeft',
        action: 'Click Me',
        icon: 'coffee',
        theme: 'ocean',
        position: 'growlTopLeft',
        hideDelay: 100000000,
      };
    } else if (arg === 'growlBottomRight') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopRight',
        action: 'Click Me',
        icon: 'times',
        theme: 'danger',
        position: 'growlBottomRight',
      };
    } else if (arg === 'growlBottomLeft') {
      this.options = {
        title: 'Growl',
        message: 'This positioning is growlTopLeft',
        action: 'Click Me',
        icon: 'coffee',
        theme: 'ocean',
        position: 'growlBottomLeft',
      };
    }
    this.toaster.alert(this.options).then((toast) => {
      toast.onAction(() => {
        alert('Clicked Me');
      });
    });
  }
}
