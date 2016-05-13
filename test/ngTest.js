import test from 'ava';

import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from './../src/testing/TestContext';
import { Button } from './../src/elements/button/Button';

@Component({
    selector: 'test-cmp',
    directives: [Button],
    template: '<button theme="primary">Test Primary</button>'
})
class TestCmp {
}

let ctx;
let instance;
let element;

test.before(t => {
    createTestContext(_ctx => ctx = _ctx);
});

test.before(t => {
    ctx.init(TestCmp)
        .finally(done)
        .subscribe(() => {
            const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Button));
            element = cmpDebugElement.nativeElement;
            instance = cmpDebugElement.componentInstance;
        });
});

test('instance should be defined', t => {
    t.truthy(instance);
});

test('element should be defined', t => {
    t.truthy(element);
});