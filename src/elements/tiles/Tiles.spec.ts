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

    describe('Method: ngOnInit()', () => {
        it('should reformat array options to an object', () => {
            expect(component.ngOnInit).toBeDefined();
            component.options = [1, 2, 3, 4, 5];
            component.ngOnInit();
            expect(component._options).toBeDefined();
            expect(component._options[0].value).toBe(component.options[0]);
            expect(component._options[0].label).toBe(component.options[0]);
        });

        xit('should add checked status to options', () => {
            component.ngOnInit();
            expect('checked' in component._options[0]).toBeTruthy();
        });
    });

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
