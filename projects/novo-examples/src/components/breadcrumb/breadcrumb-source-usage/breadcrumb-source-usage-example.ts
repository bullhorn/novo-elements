import { Component } from '@angular/core';

/**
 * @title Breadcrumb Dynamic Usage Example
 */
@Component({
    selector: 'breadcrumb-source-usage-example',
    templateUrl: 'breadcrumb-source-usage-example.html',
    styleUrls: ['breadcrumb-source-usage-example.css'],
    standalone: false,
})
export class BreadcrumbSourceUsageExample {
  source = [
    { title: 'Home', showMenu: false, link: '#/components', automationId: 'breadcrumb-dynamic-home' },
    {
      title: 'Components',
      link: '#/components/breadcrumb',
      showMenu: true,
      noNavigation: true,
      isSearch: true,
      automationId: 'breadcrumb-dynamic-components',
      menuList: [
        { name: 'Colors', link: '#/design/colors', target: '_blank' },
        { name: 'Composition', link: '#/design/componsition', linkType: 'routerLink' },
        { name: 'Typography', link: '#/design/typography', linkType: 'routerLink' },
      ],
    },
  ];
}
