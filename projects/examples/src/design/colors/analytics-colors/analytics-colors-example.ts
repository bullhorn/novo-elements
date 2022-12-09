// NG2
import { Component, ElementRef } from '@angular/core';
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
  public colors: string[] = [
    'skyblue',
    'ocean',
    'mint',
    'grass',
    'sunflower',
    'bittersweet',
    'grapefruit',
    'carnation',
    'lavender',
    'mountain',
  ];

  options: any;

  constructor(private el: ElementRef, private toaster: NovoToastService) {}

  copyLink(color, swatch?) {
    const variable = swatch ? `var(--palette-${color}-${swatch})` : `var(--palette-${color})`;
    // Create dom element to copy from
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = variable;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    // Copy text
    document.execCommand('copy');
    // Delete element
    body.removeChild(copyFrom);

    // Set toast options
    this.options = {
      title: variable,
      message: 'Copied to your clipboard',
      theme: color,
      icon: 'clipboard',
      position: 'growlTopRight',
    };

    // Fire toast
    this.toaster.alert(this.options);
  }
  getHex(color) {
    return getComputedStyle(this.el.nativeElement).getPropertyValue(`--color-${color}`);
  }
}
