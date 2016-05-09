import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import template from './Home.html';

@Component({
    selector: 'home',
    directives: [ROUTER_DIRECTIVES],
    template: template
})
export class Home {
}
