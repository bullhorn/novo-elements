// NG2
import { Component, ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDrawerElement } from '../../Drawer';
import { NovoDrawerToggleElement } from './DrawerToggle';

@Component({
    selector: 'test-component',
    template: `<div drawerToggle=""></div>`
})
class TestComponent {}

describe('Elements: NovoDrawerToggleElement', () => {
    let fixture;
    let directive;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                NovoDrawerToggleElement,
                // NovoDrawerContentElement,
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

    it('should initialize.', () => {
        expect(directive).toBeDefined();
    });

    describe('Class: ', () => {
        let mockElement: ElementRef = new ElementRef(document.createElement('div'));
        let mockDrawer: NovoDrawerElement = new NovoDrawerElement(mockElement);
        let component: NovoDrawerToggleElement = new NovoDrawerToggleElement(mockDrawer);

        describe('Method: ngOnInit()', () => {
            it('should initialize properly', () => {
                expect(component.ngOnInit).toBeDefined();
                expect(component.disabled).toBeFalsy();
            });
        });

        describe('Method: toggleDrawer(event)', () => {
            it('should toggle drawer', () => {
                expect(component.toggleDrawer).toBeDefined();
                spyOn(component.drawer, 'toggle').and.callFake(() => {});
                component.toggleDrawer(new KeyboardEvent('2'));
                expect(component.drawer.toggle).toHaveBeenCalled();
            });
        });

        describe('Getter: isOpen()', () => {
            it('should toggle isOpen value', () => {
                let test = component.isOpen;
                expect(test).toBeFalsy();
            });
        });
    });
});
