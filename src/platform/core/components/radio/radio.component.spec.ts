// NG2
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// App
import { NovoRadioComponent, IRadio } from './radio.component';
import { NovoButtonModule } from '../../components/button/button.module';

describe('Elements: NovoRadioComponent', () => {
    let fixture: ComponentFixture<NovoRadioComponent>;
    let component: NovoRadioComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoRadioComponent,
            ],
            imports: [
                NovoButtonModule,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(NovoRadioComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('Method: writeValue()', () => {
        it('should change the value', () => {
            expect(component.writeValue).toBeDefined();
            component.writeValue(10);
            expect(component.model).toBe(10);
        });
    });
    describe('Method: select()', () => {
        it('should select current value if value is NOT checked', () => {
            expect(component.select).toBeDefined();
            let event: MouseEvent = new MouseEvent('click');
            let radio: IRadio = { checked: false };
            spyOn(component.change, 'emit');
            spyOn(component, 'onModelChange');
            component.select(event, radio);
            expect(radio.checked).toBeTruthy();
            expect(component.change.emit).toHaveBeenCalled();
            expect(component.onModelChange).toHaveBeenCalled();
        });
        it('should do nothing if current value is already checked', () => {
            expect(component.select).toBeDefined();
            let event: MouseEvent = new MouseEvent('click');
            let radio: IRadio = { checked: true };
            spyOn(component.change, 'emit');
            spyOn(component, 'onModelChange');
            component.select(event, radio);
            expect(radio.checked).toBeTruthy();
            expect(component.change.emit).not.toHaveBeenCalled();
            expect(component.onModelChange).not.toHaveBeenCalled();
        });
    });
    describe('Method: registerOnChange()', () => {
        it('should set onModelChange.', () => {
            expect(component.registerOnChange).toBeDefined();
            let testFn: Function = () => { return 'novo novo'; };
            component.registerOnChange(testFn);
            expect(component.onModelChange).toEqual(testFn);
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should set onModelChange.', () => {
            expect(component.registerOnTouched).toBeDefined();
            let testFn: Function = () => { return 'novo novo'; };
            component.registerOnTouched(testFn);
            expect(component.onModelTouched).toEqual(testFn);
        });
    });
});
