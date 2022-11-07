import { Component } from '@angular/core';

/**
 * @title Breadcrumb Dynamic Usage Example
 */
@Component({
  selector: 'breadcrumb-source-usage-example',
  templateUrl: 'breadcrumb-source-usage-example.html',
  styleUrls: ['breadcrumb-source-usage-example.css'],
})
export class BreadcrumbSourceUsageExample {
  source = [
    { title: 'Home', showMenu: false, link: '#/components' },
    {
      title: 'Components',
      link: '#/components/breadcrumb',
      showMenu: true,
      noNavigation: true,
      isSearch: true,
      menuList: [
        { name: 'Colors', link: '#/design/colors', target: '_blank' },
        { name: 'Composition', link: '#/design/componsition', linkType: 'routerLink' },
        { name: 'Typography', link: '#/design/typography', linkType: 'routerLink' },
      ],
    },
  ];
}
