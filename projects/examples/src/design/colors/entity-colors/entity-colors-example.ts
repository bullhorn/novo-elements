// NG2
import { Component, ElementRef } from '@angular/core';
// Vendor
import { NovoToastService, ToastOptions } from 'novo-elements';

/**
 * @title Entity Colors
 */
@Component({
  selector: 'entity-colors-example',
  templateUrl: './entity-colors-example.html',
  styleUrls: ['./entity-colors-example.scss'],
})
export class EntityColorsExample {
  entityKeys = [
    'person',
    'company',
    'candidate',
    'lead',
    'contact',
    'clientcontact',
    'opportunity',
    'job',
    'joborder',
    'submission',
    'sendout',
    'placement',
    'note',
    'task',
    'distribution-list',
    'credential',
    'user',
    'corporate-user',
    'contract',
    'job-code',
    'earn-code',
    'billable-charge',
    'payable-charge',
    'invoice-statement',
  ].sort();

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
    const options: ToastOptions = {
      title: variable,
      message: 'Copied to your clipboard',
      theme: color,
      icon: 'clipboard',
      position: 'growlTopRight',
    };

    // Fire toast
    this.toaster.alert(options);
  }
  getHex(color) {
    return getComputedStyle(this.el.nativeElement).getPropertyValue(`--color-${color}`);
  }
}
