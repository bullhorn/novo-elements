import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { Component } from 'angular2/core';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from '../../testing/TestContext';
import { Tooltip } from './Tooltip';

@Component({
    selector: 'test-cmp',
    directives: [Tooltip],
    template: '<span [tooltip]="tooltipText" [tooltipPosition]="position" [tooltipAlways]="always" [tooltipRounded]="rounded" [tooltipNoAnimate]="noAnimate" [tooltipBounce]="bounce" [tooltipType]="type">Tooltip Test</span>'
})
class TestCmp {
    constructor() {
        this.tooltipText = 'Test';
        this.position = null;
        this.type = null;
        this.always = null;
        this.rounded = null;
        this.noAnimate = null;
        this.bounce = null;
    }
}

describe('Element: Tooltip', () => {
    let ctx;
    let cmpElement;
    let cmpInstance;
    let instance;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                instance = ctx.fixture.componentInstance;
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Tooltip));
                cmpElement = cmpDebugElement.nativeElement;
                cmpInstance = cmpDebugElement.componentInstance;
            });
    });

    it('should have the instance and cmpElement defined', () => {
        expect(instance).toBeDefined();
        expect(cmpElement).toBeDefined();
    });

    it('should populate with the correct text and update', () => {
        expect(instance.tooltipText).toEqual('Test');
        expect(cmpInstance.tooltip).toEqual('Test');
        expect(DOM.getAttribute(cmpElement, 'data-hint')).toEqual('Test');

        instance.tooltipText = 'Test Updated';
        ctx.fixture.detectChanges();

        expect(instance.tooltipText).toEqual('Test Updated');
        expect(cmpInstance.tooltip).toEqual('Test Updated');
        expect(DOM.getAttribute(cmpElement, 'data-hint')).toEqual('Test Updated');
    });

    it('should default to the top position', () => {
        expect(instance.position).toEqual(null);
        expect(cmpInstance.position).toEqual('top');
        expect(DOM.hasClass(cmpElement, 'hint--top')).toBe(true);
    });

    it('should not have any other classes/properties by default', () => {
        expect(DOM.hasClass(cmpElement, 'hint--always')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--warning')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--error')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--info')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--success')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--rounded')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--no-animate')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--bounce')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--right')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--left')).toBe(false);
        expect(DOM.hasClass(cmpElement, 'hint--bottom')).toBe(false);
    });

    it('should populate with the correct position and update', () => {
        // Go to right
        instance.position = 'right';
        ctx.fixture.detectChanges();

        expect(instance.position).toEqual('right');
        expect(cmpInstance.position).toEqual('right');
        expect(DOM.hasClass(cmpElement, 'hint--right')).toBe(true);

        // The top class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--top')).toBe(false);

        // Go to left
        instance.position = 'left';
        ctx.fixture.detectChanges();

        expect(instance.position).toEqual('left');
        expect(cmpInstance.position).toEqual('left');
        expect(DOM.hasClass(cmpElement, 'hint--left')).toBe(true);

        // The right class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--right')).toBe(false);

        // Go to bottom
        instance.position = 'bottom';
        ctx.fixture.detectChanges();

        expect(instance.position).toEqual('bottom');
        expect(cmpInstance.position).toEqual('bottom');
        expect(DOM.hasClass(cmpElement, 'hint--bottom')).toBe(true);

        // The left class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--left')).toBe(false);
    });

    it('should populate with the correct type and update', () => {
        // Error type
        instance.type = 'error';
        ctx.fixture.detectChanges();

        expect(instance.type).toEqual('error');
        expect(cmpInstance.type).toEqual('error');
        expect(DOM.hasClass(cmpElement, 'hint--error')).toBe(true);

        // Info type
        instance.type = 'info';
        ctx.fixture.detectChanges();

        expect(instance.type).toEqual('info');
        expect(cmpInstance.type).toEqual('info');
        expect(DOM.hasClass(cmpElement, 'hint--info')).toBe(true);

        // The error class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--error')).toBe(false);

        // Warning type
        instance.type = 'warning';
        ctx.fixture.detectChanges();

        expect(instance.type).toEqual('warning');
        expect(cmpInstance.type).toEqual('warning');
        expect(DOM.hasClass(cmpElement, 'hint--warning')).toBe(true);

        // The info class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--info')).toBe(false);

        // Success type
        instance.type = 'success';
        ctx.fixture.detectChanges();

        expect(instance.type).toEqual('success');
        expect(cmpInstance.type).toEqual('success');
        expect(DOM.hasClass(cmpElement, 'hint--success')).toBe(true);

        // The info class should also be removed
        expect(DOM.hasClass(cmpElement, 'hint--warning')).toBe(false);
    });

    it('should apply the always class', () => {
        instance.always = true;
        ctx.fixture.detectChanges();
        expect(DOM.hasClass(cmpElement, 'hint--always')).toBe(true);
    });

    it('should apply the rounded class', () => {
        instance.rounded = true;
        ctx.fixture.detectChanges();
        expect(DOM.hasClass(cmpElement, 'hint--rounded')).toBe(true);
    });

    it('should apply the no-animate class', () => {
        instance.noAnimate = true;
        ctx.fixture.detectChanges();
        expect(DOM.hasClass(cmpElement, 'hint--no-animate')).toBe(true);
    });

    it('should apply the bounce class', () => {
        instance.bounce = true;
        ctx.fixture.detectChanges();
        expect(DOM.hasClass(cmpElement, 'hint--bounce')).toBe(true);
    });

    describe('Function: isPosition', () => {
        it('should be defined', () => {
            expect(cmpInstance.isPosition).toBeDefined();
        });

        it('should return if the positions are equal', () => {
            expect(cmpInstance.isPosition('top')).toBe(true);
            expect(cmpInstance.isPosition('bottom')).toBe(false);
        });
    });

    describe('Function: isType', () => {
        it('should be defined', () => {
            expect(cmpInstance.isType).toBeDefined();
        });

        it('should return if the positions are equal', () => {
            // Initially the type is null
            expect(cmpInstance.isType('top')).toBe(false);

            instance.type = 'error';
            ctx.fixture.detectChanges();

            expect(cmpInstance.isType('error')).toBe(true);
        });
    });
});
