// NG2
import { Injectable, QueryList } from '@angular/core';
// App
import { NovoTemplate } from '../../elements/common/novo-template/novo-template.directive';

@Injectable()
export class NovoTemplateService {
  templates: any = {};
  constructor() { }

  getAll(): any {
    return this.templates;
  }

  addAll(templates: any): void {
    this.templates = templates;
  }

  add(key: string, template: any): void {
    this.templates[key] = template;
  }
}
