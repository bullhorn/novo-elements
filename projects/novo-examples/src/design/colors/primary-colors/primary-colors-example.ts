// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';
// App
import { primaryColors as colors } from '../colors';

/**
 * @title Primary Colors
 */
@Component({
    selector: 'primary-colors-example',
    templateUrl: './primary-colors-example.html',
    styleUrls: ['./primary-colors-example.scss'],
    standalone: false
})
export class PrimaryColorsExample {
  primaryColors = colors;
  options: any;

  constructor(private toaster: NovoToastService) {}

  copyLink(color) {
    // Create dom element to copy from
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = `#${color.hex}`;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    // Copy text
    document.execCommand('copy');
    // Delete element
    body.removeChild(copyFrom);

    // Set toast options
    this.options = {
      title: `#${color.hex}`,
      message: 'Copied to your clipboard',
      theme: color.variables[0],
      icon: 'clipboard',
      position: 'growlTopRight',
    };

    if (color.name === 'action') {
      this.options.theme = 'ocean';
    }

    // Fire toast
    this.toaster.alert(this.options);
  }
}
