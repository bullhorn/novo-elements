// import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { Component } from '@angular/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from './../../testing/TestContext';
import { Card } from './Card';

@Component({
    selector: 'test-cmp',
    directives: [Card],
    template: `
        <novo-card [title]="'All Attributes :)'"
                [loading]="loading"
                [message]="message"
                [refresh]="refresh"
                [close]="close"
                (onRefresh)="onRefresh()"
                (onClose)="onClose()">
            This is the ALL attribute card content!
            <footer>I AM THE FOOTER</footer>
        </novo-card>
    `
})
class TestCmp {
    constructor() {
        this.refresh = true;
        this.close = true;
    }

    onClose() {
        console.log('CLOSE'); // eslint-disable-line
    }

    onRefresh() {
        console.log('REFRESH'); // eslint-disable-line
    }
}

describe('Element: Card', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Card));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });
});
