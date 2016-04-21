import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

const template = require('./Layout.html');

@Component({
    selector: 'layout',
    directives: [ROUTER_DIRECTIVES],
    template: template
})
export class Layout {
}
