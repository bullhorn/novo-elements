// NG2
import { Component } from '@angular/core';
// APP
let DropdownDemoTpl = require('./templates/DropdownDemo.html');
let CustomClassTpl = require('./templates/CustomClassDemo.html');
let KeepOpenTpl = require('./templates/KeepOpenDemo.html');
let CrazyLargeTpl = require('./templates/CrazyLargeDemo.html');
let ScrollableContainerTpl = require('./templates/ScrollableContainerDemo.html');
let PositionTpl = require('./templates/PositionDemo.html');

@Component({
  selector: 'dropdown-demo',
  template: `
    <div class="container">
      <h1>Dropdown
        <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/dropdown">(source)</a></small>
      </h1>
      <p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>

      <h2>Types</h2>

      <h5>Dropdown Menu</h5>
      <p>This is a simple dropdown menu.</p>
      <div class="example dropdown-demo">${DropdownDemoTpl}</div>
      <code-snippet [code]="DropdownDemoTpl"></code-snippet>

      <h5>Custom Class</h5>
      <p>You can have custom classes on the dropdown container that opens up by using the "containerClass" property. Use scrollStrategy to close,
        block or reposition the dropdown when the parent scrolls. The default scrollStrategy is reposition.</p>
      <div class="example dropdown-demo">${CustomClassTpl}</div>
      <code-snippet [code]="CustomClassTpl"></code-snippet>

      <h5>Keep Open</h5>
      <p>You can set the "keepOpen" property on the "item" in order to keep it from closing the dropdown automatically.</p>
      <div class="example dropdown-demo">${KeepOpenTpl}</div>
      <code-snippet [code]="KeepOpenTpl"></code-snippet>

      <h5>Lots of data!</h5>
      <p>Crazy large dropdown to demonstrate how the smart positioning works.</p>
      <div class="example dropdown-demo">${CrazyLargeTpl}</div>
      <code-snippet [code]="CrazyLargeTpl"></code-snippet>

      <h5>Scrollable Container Class</h5>
      <p>This is an example of using a dropdown within a scrollable container. Simply place the directive cdkScrollable on the ancestor element that
        does the scrolling.</p>
      <div class="example dropdown-demo scrollable-container-demo">${ScrollableContainerTpl}</div>
      <code-snippet [code]="ScrollableContainerTpl"></code-snippet>

      <h5>Dropdown Position Options</h5>
      <p>This is an example of how dropdowns can be positioned. Use the [side] input to specify how the popup positions or re-positions itself on the
        page using a preferred location and one or more fallback locations:</p>
      <novo-list direction="horizontal">
        <novo-list-item *ngFor="let item of POSITION_OPTIONS">
          <item-header>
            <item-title>{{ item.name }}</item-title>
          </item-header>
          <item-content direction="vertical">
            <p>
              {{ item.description }}
            </p>
          </item-content>
        </novo-list-item>
      </novo-list>
      <div class="example dropdown-demo position-demo">${PositionTpl}</div>
      <code-snippet [code]="PositionTpl"></code-snippet>
    </div>
  `,
})
export class DropdownDemoComponent {
  public DropdownDemoTpl: string = DropdownDemoTpl;
  public KeepOpenTpl: string = KeepOpenTpl;
  public CustomClassTpl: string = CustomClassTpl;
  public CrazyLargeTpl: string = CrazyLargeTpl;
  public ScrollableContainerTpl: string = ScrollableContainerTpl;
  public PositionTpl: string = PositionTpl;

  public MOCK_WORDS: string[] = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
    'congue',
    'praesent',
    'sagittis',
    'laoreet',
    'auctor',
    'mauris',
    'non',
    'velit',
    'eros',
    'dictum',
    'proin',
    'accumsan',
    'sapien',
    'nec',
    'massa',
    'volutpat',
    'venenatis',
    'sed',
    'eu',
    'molestie',
    'lacus',
    'quisque',
    'porttitor',
    'ligula',
    'dui',
    'mollis',
    'tempus',
    'at',
    'magna',
    'vestibulum',
    'turpis',
    'ac',
    'diam',
    'tincidunt',
    'id',
    'condimentum',
    'enim',
    'sodales',
    'in',
    'hac',
    'habitasse',
    'platea',
    'dictumst',
    'aenean',
    'neque',
    'fusce',
    'augue',
    'leo',
    'eget',
    'semper',
    'mattis',
    'tortor',
    'scelerisque',
    'nulla',
    'interdum',
    'tellus',
    'malesuada',
    'rhoncus',
    'porta',
    'sem',
    'aliquet',
    'et',
    'nam',
    'suspendisse',
    'potenti',
    'vivamus',
    'luctus',
    'fringilla',
    'erat',
    'donec',
    'justo',
    'vehicula',
    'ultricies',
    'varius',
    'ante',
    'primis',
    'faucibus',
    'ultrices',
    'posuere',
    'cubilia',
    'curae',
    'etiam',
    'cursus',
    'aliquam',
    'quam',
    'dapibus',
    'nisl',
    'feugiat',
    'egestas',
    'class',
    'aptent',
    'taciti',
    'sociosqu',
    'ad',
    'litora',
    'torquent',
    'per',
    'conubia',
    'nostra',
    'inceptos',
    'himenaeos',
    'phasellus',
    'nibh',
    'pulvinar',
    'vitae',
    'urna',
    'iaculis',
    'lobortis',
    'nisi',
    'viverra',
    'arcu',
    'morbi',
    'pellentesque',
    'metus',
    'commodo',
    'ut',
    'facilisis',
    'felis',
    'tristique',
    'ullamcorper',
    'placerat',
    'aenean',
    'convallis',
    'sollicitudin',
    'integer',
    'rutrum',
    'duis',
    'est',
    'etiam',
    'bibendum',
    'donec',
    'pharetra',
    'vulputate',
    'maecenas',
    'mi',
    'fermentum',
    'consequat',
    'suscipit',
    'aliquam',
    'habitant',
    'senectus',
    'netus',
    'fames',
    'quisque',
    'euismod',
    'curabitur',
    'lectus',
    'elementum',
    'tempor',
    'risus',
    'cras',
  ];
  public POSITION_OPTIONS: { name: string; description: string }[] = [
    {
      name: 'default (left)',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right, center-left, center-right',
    },
    {
      name: 'right',
      description: 'Prefer bottom-right, with fallback positions (in order): top-right, bottom-left, top-left, center-left, center-right',
    },
    {
      name: 'above-below',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right (no center)',
    },
    {
      name: 'right-above-below',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right (no center)',
    },
    { name: 'center', description: 'Prefer center-left, with fallback positions above and below, but always covering the dropdown' },
    { name: 'bottom', description: 'Prefer bottom-left, with fallback position of bottom-right' },
    { name: 'bottom-left', description: 'Always popup to the bottom-left' },
    { name: 'bottom-right', description: 'Always popup to the bottom-right' },
    { name: 'top-left', description: 'Always popup to the top-left' },
    { name: 'top-right', description: 'Always popup to the top-right' },
  ];

  public clickMe(data: string): void {
    console.log('CLICKED!', data); // tslint:disable-line
  }
}
