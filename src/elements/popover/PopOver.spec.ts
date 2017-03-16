// NG2
import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
// App
import { PopOverDirective } from './PopOver';

@Component({
    selector: 'test-component',
    template: `
        <div popover=""></div>
    `
})
class TestComponent {}

describe('Elements: PopOverDirective', () => {
    describe('Directive: ', () => {
        let fixture;
        let component;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    PopOverDirective,
                    TestComponent
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.debugElement.componentInstance;
        }));

        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });

        describe('Class: ', () => {
            it('should be defined.', () => {
                expect(fixture).toBeDefined();
            });
        });
    });
});
