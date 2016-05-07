import * as Rx from 'rxjs/Rx';
import { inject } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

const tokens = [TestComponentBuilder];

export class TestContext {
    constructor(tcb) {
        this._tcb = tcb;
    }

    init(rootComponent) {
        const promise = this._tcb.createAsync(rootComponent)
            .then(fixture => {
                this._fixture = fixture;
                fixture.detectChanges();
            });
        return Rx.Observable.fromPromise(promise);
    }

    get fixture() {
        return this._fixture;
    }
}

/**
 * Creates a test context
 * @param onCreate - callback
 * @returns {*}
 */
export function createTestContext(onCreate) {
    return inject(tokens, (tcb, backend) => {
        const ctx = new TestContext(tcb, backend);
        onCreate(ctx);
    });
}
