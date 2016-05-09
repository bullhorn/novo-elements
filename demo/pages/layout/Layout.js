import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import template from './Layout.html';

@Component({
    selector: 'layout',
    directives: [ROUTER_DIRECTIVES],
    template: template
})
export class Layout {
}
