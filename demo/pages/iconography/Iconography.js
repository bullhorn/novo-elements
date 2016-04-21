import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

const template = require('./Iconography.html');

@Component({
    selector: 'iconography',
    directives: [ROUTER_DIRECTIVES],
    template: template
})
export class Iconography {
}
