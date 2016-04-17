import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { bootstrap } from 'angular2/platform/browser';

import { Test } from '../src/novo-elements';

import '../src/novo-elements.scss';

@Component({
    selector: 'app',
    template: `
    DEMO :) -- <test-cmp></test-cmp>
    `,
    directives: [
        CORE_DIRECTIVES,
        Test
    ]
})
export class Demo {
}

bootstrap(Demo);
