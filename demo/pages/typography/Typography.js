import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

const template = require('./Typography.html');

@Component({
    selector: 'typography',
    directives: [ROUTER_DIRECTIVES],
    template: template
})
export class Typography {
}
