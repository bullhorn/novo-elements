import { inject, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestComponentBuilder } from '@angular/compiler/testing';

/**
 * Creates a test component
 */
export function testComponent(TestComponent, fn, html = null) {
    return async(inject([TestComponentBuilder], (tcb) => {
        if (html) {
            tcb = tcb.overrideTemplate(TestComponent, html); // eslint-disable-line
        }
        return tcb.createAsync(TestComponent).then(fn);
    }));
}

/**
 * Grabs the right info from the fixture
 */
export function grabComponent(fixture, Component) {
    const { componentInstance, nativeElement } = fixture;
    const component = fixture.debugElement.query(By.directive(Component));
    return {
        testComponentInstance: componentInstance,
        testComponentElement: nativeElement,
        instance: component.componentInstance,
        element: component.nativeElement
    };
}

/**
 * Dispatch a key event on a target
 */
export function dispatchKeyEvent(target, key) {
    let event;
    if (navigator.userAgent.search('Firefox') > -1) {
        event = new KeyboardEvent('keydown', { key });
    } else {
        event = document.createEvent('KeyboardEvent');
        event.initKeyboardEvent('keydown', true, true, window, key, 0, '', false, '');
    }
    target.dispatchEvent(event);
}

/**
 * Select element
 */
export function selectElements(element, selector) {
    return [].slice.call(element.querySelectorAll(selector));
}
