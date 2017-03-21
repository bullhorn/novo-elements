// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoDateTimePickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDateTimePickerElement
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDateTimePickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component.ngOnInit).toBeTruthy();
            component.ngOnInit();
        });
    });

    describe('Method: ngOnChanges()', () => {
        it('should initialize correctly', () => {
            expect(component.ngOnChanges).toBeTruthy();
            component.ngOnChanges();
        });
    });

    describe('Method: isDisabled()', () => {
        it('should initialize correctly', () => {
            expect(component.isDisabled).toBeTruthy();
            component.isDisabled();
        });
    });

    describe('Method: updateTime()', () => {
        it('should be defined.', () => {
            expect(component.updateTime).toBeTruthy();
            component.updateTime();
        });
    });

    describe('Method: updateCal()', () => {
        it('should be defined.', () => {
            expect(component.updateCal).toBeTruthy();
            component.updateCal();
        });
    });

    describe('Method: setToday()', () => {
        it('should be defined.', () => {
            expect(component.setToday).toBeTruthy();
            component.setToday();
        });
    });

    describe('Method: setMonth()', () => {
        it('should be defined.', () => {
            expect(component.setMonth).toBeTruthy();
            component.setMonth();
        });
    });

    describe('Method: setYear()', () => {
        it('should be defined.', () => {
            expect(component.setYear).toBeTruthy();
            component.setYear();
        });
    });

    describe('Method: select()', () => {
        it('should be defined.', () => {
            expect(component.select).toBeTruthy();
            // component.select();
        });
    });

    describe('Method: open()', () => {
        it('should be defined.', () => {
            expect(component.open).toBeTruthy();
            component.open();
        });
    });

    describe('Method: previousMonth()', () => {
        it('should be defined.', () => {
            expect(component.previousMonth).toBeTruthy();
            // component.previousMonth();
        });
    });

    describe('Method: nextMonth()', () => {
        it('should be defined.', () => {
            expect(component.nextMonth).toBeTruthy();
            // component.nextMonth();
        });
    });

    describe('Method: updateHeading()', () => {
        it('should be defined.', () => {
            expect(component.updateHeading).toBeTruthy();
            component.updateHeading();
        });
    });

    describe('Method: removeTime()', () => {
        it('should be defined.', () => {
            expect(component.removeTime).toBeTruthy();
            component.removeTime();
        });
    });

    describe('Method: buildMonth()', () => {
        it('should be defined.', () => {
            expect(component.buildMonth).toBeTruthy();
            // component.buildMonth();
        });
    });

    describe('Method: buildWeek()', () => {
        it('should be defined.', () => {
            expect(component.buildWeek).toBeTruthy();
            // component.buildWeek();
        });
    });

    describe('Method: setHours()', () => {
        it('should be defined.', () => {
            expect(component.setHours).toBeTruthy();
            component.setHours();
        });
    });

    describe('Method: setMinutes()', () => {
        it('should be defined.', () => {
            expect(component.setMinutes).toBeTruthy();
            component.setMinutes();
        });
    });

    describe('Method: setPeriod()', () => {
        it('should be defined.', () => {
            expect(component.setPeriod).toBeTruthy();
            component.setPeriod();
        });
    });

    describe('Method: dispatchChange()', () => {
        it('should be defined.', () => {
            expect(component.dispatchChange).toBeTruthy();
            component.dispatchChange();
        });
    });

    describe('Method: clearTime()', () => {
        it('should be defined.', () => {
            expect(component.clearTime).toBeTruthy();
            component.clearTime();
        });
    });

    describe('Method: toggleTimePicker()', () => {
        it('should be defined.', () => {
            expect(component.toggleTimePicker).toBeTruthy();
            component.toggleTimePicker();
        });
    });

    describe('Method: writeValue()', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeTruthy();
            component.writeValue();
        });
    });

    describe('Method: registerOnChange()', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeTruthy();
            component.registerOnChange();
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeTruthy();
            component.registerOnTouched();
        });
    });

    describe('Method: checkBetween()', () => {
        it('should be defined.', () => {
            expect(component.checkBetween).toBeTruthy();
            component.checkBetween();
        });
    });
});
