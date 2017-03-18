// NG2
import { Component, ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTableKeepFilterFocus } from './KeepFilterFocus';

@Component({
    selector: 'test-component',
    template: `<input name="test" keepFilterFocused="false" />`
})
class TestComponent {}

xdescribe('Elements: NovoTableKeepFilterFocus', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        let mockElementRef = new ElementRef(document.createElement('input'));
        TestBed.configureTestingModule({
            declarations: [
                NovoTableKeepFilterFocus,
                TestComponent
            ],
            providers: [
                { provide: ElementRef, useClass: mockElementRef }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize with defaults', () => {
        expect(component).toBeDefined();
    });
});
