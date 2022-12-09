import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

/**
 * @title Palette Colors
 */
@Component({
  selector: 'palette-colors-example',
  templateUrl: './palette-colors-example.html',
  styleUrls: ['./palette-colors-example.scss'],
})
export class PaletteColorsExample {
  public colors: string[] = ['red', 'pink', 'orange', 'yellow', 'green', 'teal', 'aqua', 'blue', 'indigo', 'violet', 'gray'];
  public swatches = ['10', '15', '20', '30', '40', '50', '60', '70', '80', '90', '95', '98'].reverse();

  options: any;

  constructor(private toaster: NovoToastService) {}

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
}
