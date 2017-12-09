import { Component } from '@angular/core';
import { LOADING_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  public name: string = 'Loading';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/loading';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = LOADING_DEMOS;

}
