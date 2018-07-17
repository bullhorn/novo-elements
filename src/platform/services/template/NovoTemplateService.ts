// NG2
import { Injectable, QueryList } from '@angular/core';
// App
import { NovoTemplate } from '../../elements/common/novo-template/novo-template.directive';
import { Helpers } from '../../utils/Helpers';

@Injectable()
export class NovoTemplateService {
  templates: any = {
    default: {},
    custom: {},
  };
  constructor() { }

  getAll(): any {
    let templates: any = {};
    const customTemplateTypes: string[] = Object.keys(this.templates.custom);
    const defaultTemplateTypes: string[] = Object.keys(this.templates.default);
    defaultTemplateTypes.forEach((type: string) => {
      templates[type] = this.templates.default[type];
    });
    customTemplateTypes.forEach((type: string) => {
      templates[type] = this.templates.custom[type];
    });
    return templates;
  }

  addDefault(key: string, template: any): void {
    this.templates.default[key] = template;
  }

  addCustom(key: string, template: any): void {
    this.templates.custom[key] = template;
  }
}
