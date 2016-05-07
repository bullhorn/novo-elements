import { beforeEach, expect, describe, it } from '@angular/core/testing';

import { createTestContext } from '../../testing/TestContext';
import { NovoToast } from './Toast';

describe('Element: NovoToast', () => {
    let ctx;
    let cmpElement;
    let cmpInstance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(NovoToast)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement;
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(cmpElement).toBeDefined();
        expect(cmpInstance).toBeDefined();
    });
});
