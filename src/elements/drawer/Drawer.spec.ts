// NG2
import { Component, ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDrawerElement } from './Drawer';

@Component({
    selector: 'test-component',
    template: `<div drawer=""></div>`
})
class TestComponent {}

describe('Elements: NovoDrawerElement', () => {
    let fixture;
    let directive;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                TestComponent
            ],
            providers: [
                { provide: NovoDrawerElement, useClass: NovoDrawerElement },
                { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        directive = fixture.debugElement.componentInstance;
    }));

    it('should be defined', () => {
        expect(directive).toBeDefined();
    });

    describe('Class: ', () => {
        let mockElement: ElementRef = new ElementRef(document.createElement('div'));
        let component: NovoDrawerElement = new NovoDrawerElement(mockElement);
        describe('Method: ngOnInit()', () => {
            it('should initialize properly', () => {
                expect(component.ngOnInit).toBeDefined();
                expect(component.onDrawerToggle).toBeDefined();
                component.ngOnInit();
                expect(component.autoClose).toBe('outsideClick');
                expect(component.position).toBe('left');
            });
        });

        describe('Method: toggle(open)', () => {
            it('should open or close the drawer', () => {
                //expect(component.toggle).toBeDefined();
                let test = component.toggle(false);
                expect(test).toBeTruthy();
                test = component.toggle();
                expect(test).toBeFalsy();
            });
        });

        describe('Method: focusToggleElement()', () => {
            it('should be defined.', () => {
                expect(component.focusToggleElement).toBeDefined();
            });
        });
    });
});

