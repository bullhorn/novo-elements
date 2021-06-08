import { Component } from '@angular/core';
import * as Icons from '@bullhorn/bullhorn-icons';
import { NovoToastService } from 'novo-elements';

/**
 * @title Iconset
 */
@Component({
  selector: 'iconset-example',
  templateUrl: './iconset-example.html',
  styleUrls: ['./iconset-example.scss'],
})
export class IconsetExample {
  icons = Object.values(Icons);
  options: any;

  constructor(private toaster: NovoToastService) {}

  copyLink(icon) {
    // Create dom element to copy from
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = `${icon}`;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    // Copy text
    document.execCommand('copy');
    // Delete element
    body.removeChild(copyFrom);

    // Set toast options
    this.options = {
      title: `${icon}`,
      message: 'Copied to your clipboard',
      theme: 'ocean',
      icon: 'clipboard',
      position: 'growlTopRight',
    };

    // Fire toast
    this.toaster.alert(this.options);
  }
}
