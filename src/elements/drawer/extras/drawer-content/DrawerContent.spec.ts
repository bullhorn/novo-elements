// NG2
import { Component, ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDrawerContentElement } from './DrawerContent';
import { NovoDrawerElement } from '../../Drawer';

@Component({
    selector: 'test-component',
    template: `<div drawerContent=""></div>`
})
class TestComponent {}

describe('Elements: NovoDrawerContentElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerContentElement,
                TestComponent
            ],
            providers: [
                { provide: NovoDrawerElement, useClass: NovoDrawerElement },
                { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
