// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';

const KeyEvent = (code) => {
    let event: any = document.createEvent('Event');
    event.keyCode = code;
    return event;
};

xdescribe('Elements: NovoSelectElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NovoSelectModule
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoSelectElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('Method: ngOnInit()', () => {
        it('should reformat array options to an object', () => {
            expect(component.ngOnInit).toBeDefined();
            component.options = ['1', '2', '3'];
            component.ngOnInit();
            expect(component.filteredOptions).toBeDefined();
            expect(component.filteredOptions[0].value).toBe('1');
            expect(component.filteredOptions[0].label).toBe('1');
        });
    });

    describe('Method: select(option, i)', () => {
        it('should be defined.', () => {
            expect(component.select).toBeDefined();
        });

        xit('should select second option', () => {
            let i = 1;
            let option = component.options[i];
            component.select(option, i);
            expect(component.selected).toBe(option.value);
            expect(option.active).toBeTruthy();
        });
    });

    describe('Method: clear()', () => {
        it('should be defined.', () => {
            expect(component.clear).toBeDefined();
        });

        it('should clear selected', () => {
            component.selected = {
                label: 'test',
                value: 'test',
                active: true
            };
            component.clear();
            expect(component.selected.active).toBeFalsy();
            expect(component.selectedIndex).toBe(-1);
            expect(component.empty).toBeTruthy();
        });
    });

    describe('Method: onKeyDown(event)', () => {
        it('should be defined.', () => {
            expect(component.onKeyDown).toBeDefined();
        });

        it('should do nothing select is not open', () => {
            component.active = false;
            component.selectedIndex = 1;
            component.onKeyDown(KeyEvent(KeyCodes.UP));
            expect(component.selectedIndex).toBe(1);
        });

        it('should close select with ESC is pressed', () => {
            component.openPanel();
            spyOn(component, 'closePanel');
            component.onKeyDown(KeyEvent(KeyCodes.ESC));
            expect(component.closePanel).toHaveBeenCalled();
        });

        xit('should select a value and close when ENTER is pressed', () => {
            component.openPanel();
            component.selectedIndex = 1;
            spyOn(component, 'closePanel');
            spyOn(component, 'select');
            component.onKeyDown(KeyEvent(KeyCodes.ENTER));
            expect(component.closePanel).toHaveBeenCalled();
            expect(component.select).toHaveBeenCalledWith({
                label: 'two',
                value: '2'
            }, 1);
        });

        xit('should increment selected index when DOWN is pressed', () => {
            component.openPanel();
            component.selectedIndex = 1;
            spyOn(component, 'select');
            component.onKeyDown(KeyEvent(KeyCodes.DOWN));
            expect(component.selectedIndex).toBe(2);
        });

        xit('should decrement selected index when UP is pressed', () => {
            component.openPanel();
            component.selectedIndex = 2;
            spyOn(component, 'select');
            component.onKeyDown(KeyEvent(KeyCodes.UP));
            expect(component.selectedIndex).toBe(1);
        });

        it('should select a value when any letter key is pressed', () => {
            component.openPanel();
            component.selectedIndex = 1;
            component.options = [ { value: 1, label: 'One' }, { value: 2, label: 'two' }];
            component.filteredOptions = [ { value: 1, label: 'One' }, { value: 2, label: 'two' }];
            component.element = {
                nativeElement: {
                    querySelector: () => {}
                }
            };
            //spyOn(component, 'toggleActive');
            spyOn(component, 'select');
            let params = {
                '.novo-select-list': { querySelectorAll: () => { return [ { getAttribute: () => { return [ { getAttribute: () => {} }, { getAttribute: () => {} }]; } }]; } },
                '[data-automation-value^="C" i]': { getAttribute: () => {} }
            };
            //spyOn(component.element.nativeElement, 'querySelector').and.callFake(param => { return params[param]; });
            component.onKeyDown(KeyEvent(KeyCodes.T));
            //spyOn(Array, 'from').and.callFake(param => { return [ { getAttribute: () => {} }, { getAttribute: () => {} }]; });
            expect(component.select).toHaveBeenCalled();
        });
    });

    describe('Method: writeValue()', () => {
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
