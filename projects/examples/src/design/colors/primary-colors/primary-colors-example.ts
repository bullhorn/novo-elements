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
      hex: '202945',
    },
    {
      name: 'positive',
      variables: ['positive'],
      hex: '4A89DC',
    },
    {
      name: 'dark',
      variables: ['dark'],
      hex: '3D464D',
    },
    {
      name: 'background',
      variables: ['background'],
      hex: 'F4F4F4',
    },
    {
      name: 'background dark',
      variables: ['background-dark'],
      hex: 'E2E2E2',
    },
    {
      name: 'neutral',
      variables: ['neutral'],
      hex: '4F5361',
    },
    {
      name: 'success',
      variables: ['success'],
      hex: '8CC152',
    },
    {
      name: 'negative',
      variables: ['negative'],
      hex: 'DA4453',
    },
    {
      name: 'warning',
      variables: ['warning'],
      hex: 'F6B042',
    },
    {
      name: 'empty',
      variables: ['empty'],
      hex: 'CCCDCC',
    },
    {
      name: 'sand',
      variables: ['sand'],
      hex: 'F4F4F4',
    },
    {
      name: 'silver',
      variables: ['silver'],
      hex: 'E2E2E2',
    },
    {
      name: 'stone',
      variables: ['stone'],
      hex: 'BEBEBE',
    },
    {
      name: 'ash',
      variables: ['ash'],
      hex: 'A0A0A0',
    },
    {
      name: 'slate',
      variables: ['slate'],
      hex: '707070',
    },
    {
      name: 'charcoal',
      variables: ['charcoal'],
      hex: '282828',
    },
  ];
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
