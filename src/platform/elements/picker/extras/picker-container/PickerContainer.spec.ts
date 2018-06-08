// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoPickerContainer } from './PickerContainer';

describe('Elements: NovoPickerContainer', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoPickerContainer
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoPickerContainer);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('Method: ngDoCheck()', () => {
        it('should be defined.', () => {
            expect(component.ngDoCheck).toBeDefined();
            component.ngDoCheck();
        });
    });

    describe('Method: show()', () => {
        it('should be defined.', () => {
            expect(component.show).toBeDefined();
            component.show();
        });
    });

    describe('Method: hide()', () => {
        it('should be defined.', () => {
            expect(component.hide).toBeDefined();
            component.hide();
        });
    });

    describe('Method: updatePosition()', () => {
        it('should be defined.', () => {
            expect(component.updatePosition).toBeDefined();
            // component.updatePosition();
        });
    });

    describe('Method: onKeyDown()', () => {
        it('should be defined.', () => {
            expect(component.onKeyDown).toBeDefined();
            component.onKeyDown();
        });
    });
});
