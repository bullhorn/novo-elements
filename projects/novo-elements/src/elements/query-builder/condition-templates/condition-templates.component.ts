import { Component, Input } from '@angular/core';
import { AddressCriteriaConfig } from '../query-builder.types';

@Component({
    selector: 'novo-condition-templates',
    templateUrl: './condition-templates.component.html',
    standalone: false
})
export class NovoConditionTemplatesComponent {
  @Input() addressConfig: AddressCriteriaConfig;
}
