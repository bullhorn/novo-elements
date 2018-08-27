// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';

/**
 * @title Primary Colors
 */
@Component({
  selector: 'primary-colors-example',
  templateUrl: './primary-colors-example.html',
  styleUrls: ['./primary-colors-example.scss'],
})
export class PrimaryColorsExample {
  primaryColors: Array<any> = [
    {
      name: 'navigation',
      variables: ['navigation'],
      hex: '2F383F',
    },
    {
      name: 'action',
      variables: ['positive'],
      hex: '4A89DC',
    },
    {
      name: 'text',
      variables: ['dark', 'base-font-color'],
      hex: '474747',
    },
    {
      name: 'background',
      variables: ['off-white', 'background'],
      hex: 'F4F4F4',
    },
    {
      name: 'neutral',
      variables: ['neutral'],
      hex: '4F5361',
    },
  ];
  options: any;

  constructor(private toaster: NovoToastService) {}

  copyLink(color) {
    // Create dom element to copy from
    let copyFrom = document.createElement('textarea');
    copyFrom.textContent = `#${color.hex}`;
    let body = document.getElementsByTagName('body')[0];
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
      theme: color.name,
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
