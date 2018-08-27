import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Value with Extenal Links Example
 */
@Component({
  selector: 'external-link-value-example',
  templateUrl: 'external-link-value-example.html',
  styleUrls: ['external-link-value-example.css'],
})
export class ExternalLinkValueExample {
  public theme = NOVO_VALUE_THEME.MOBILE;
  public data: any = 'www.bullhorn.com';
  public meta: any = {
    type: 'SCALAR',
    name: 'companyUrl',
    label: 'Company URL',
  };
}
