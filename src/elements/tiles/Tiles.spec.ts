// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { NovoTilesElement } from './Tiles';

describe('Elements: NovoTilesElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoTilesElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTilesElement);
        component = fixture.debugElement.componentInstance;
    }));

    xdescribe('Method: select(event, item)', () => {
        it('should be defined.', () => {
            expect(component.select).toBeDefined();
        });

        it('should set label 2 with checked equal to true', () => {
            component.options[1].checked = false;
            component.select(false, component.options[1]);
            expect(component.options[1].checked).toBeTruthy();
        });

        it('should only allow one tile to be checked true', () => {
            component.ngOnInit();
            component.select(false, component.options[0]);
            expect(component.options[0].checked).toBeTruthy();
            expect(component.options[1].checked).toBeFalsy();
            expect(component.options[2].checked).toBeFalsy();
            component.select(false, component.options[1]);
            expect(component.options[0].checked).toBeFalsy();
            expect(component.options[1].checked).toBeTruthy();
            expect(component.options[2].checked).toBeFalsy();
            component.select(false, component.options[2]);
            expect(component.options[0].checked).toBeFalsy();
            expect(component.options[1].checked).toBeFalsy();
            expect(component.options[2].checked).toBeTruthy();
        });
    });

    xdescribe('Method: writeValue()', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeDefined();
        });

        it('should change the value', () => {
            component.writeValue(10);
            expect(component.model).toBe(10);
        });
    });

    describe('Method: registerOnChange()', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeDefined();
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeDefined();
        });
    });
});
