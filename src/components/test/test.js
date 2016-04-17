import { Component } from 'angular2/core';
import _ from 'underscore';

@Component({
    selector: 'test-cmp',
    template: 'TEST -- {{test}} -- HI'
})
export class Test {
    constructor() {
        this.test = _.isString('test');
    }
}
