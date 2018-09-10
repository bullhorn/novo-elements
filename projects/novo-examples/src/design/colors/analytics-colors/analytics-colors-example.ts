// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';

/**
 * @title Analytics Colors
 */
@Component({
  selector: 'analytics-colors-example',
  templateUrl: './analytics-colors-example.html',
  styleUrls: ['./analytics-colors-example.scss'],
})
export class AnalyticsColorsExample {
  public analyticsColors: Array<any> = [
    {
      name: 'grapefruit',
      variables: ['grapefruit'],
      hex: 'DA4453',
    },
    {
      name: 'bittersweet',
      variables: ['bittersweet'],
      hex: 'EB6845',
    },
    {
      name: 'sunflower',
      variables: ['sunflower'],
      hex: 'F6B042',
    },
    {
      name: 'grass',
      variables: ['grass'],
      hex: '8CC152',
    },
    {
      name: 'mint',
      variables: ['mint'],
      hex: '37BC9B',
    },
    {
      name: 'aqua',
      variables: ['aqua'],
      hex: '3BAFDA',
    },
    {
      name: 'ocean',
      variables: ['ocean'],
      hex: '4A89DC',
    },
    {
      name: 'carnation',
      variables: ['carnation'],
      hex: 'D770AD',
    },
    {
      name: 'lavender',
      variables: ['lavender'],
      hex: '967ADC',
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
