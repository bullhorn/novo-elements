// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';
// App
import { entityColors as colors } from '../colors';

/**
 * @title Entity Colors
 */
@Component({
  selector: 'entity-colors-example',
  templateUrl: './entity-colors-example.html',
  styleUrls: ['./entity-colors-example.scss'],
})
export class EntityColorsExample {
  entityColors = colors;
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
