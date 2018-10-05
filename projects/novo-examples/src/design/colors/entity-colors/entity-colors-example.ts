// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';

/**
 * @title Entity Colors
 */
@Component({
  selector: 'entity-colors-example',
  templateUrl: './entity-colors-example.html',
  styleUrls: ['./entity-colors-example.scss'],
})
export class EntityColorsExample {
  entityColors: Array<any> = [
    {
      name: 'lead',
      variables: ['lead'],
      hex: 'AA6699',
    },
    {
      name: 'contact',
      variables: ['contact'],
      hex: 'FFAA44',
    },
    {
      name: 'company',
      variables: ['company'],
      hex: '3399DD',
    },
    {
      name: 'candidate',
      variables: ['candidate'],
      hex: '44BB77',
    },
    {
      name: 'opportunity',
      variables: ['opportunity'],
      hex: '662255',
    },
    {
      name: 'job',
      variables: ['job'],
      hex: 'BB5566',
    },
    {
      name: 'submission',
      variables: ['submission'],
      hex: 'A9ADBB',
    },
    {
      name: 'placement',
      variables: ['placement'],
      hex: '0B344F',
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
