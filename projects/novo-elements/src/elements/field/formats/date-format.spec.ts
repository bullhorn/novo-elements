import { AfterViewInit, Component, DebugElement, Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NovoDateFormatDirective } from './date-format';
import { NovoLabelService, DateFormatService } from 'novo-elements/services';
import { DateLike } from 'novo-elements/utils';
import { ControlValueAccessor, FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

jest.mock('angular-imask', () => {
    return {
        IMaskDirective: class implements ControlValueAccessor, AfterViewInit {
            renderer = inject(Renderer2);
            element = inject(ElementRef);
            _initialValue: any;
            maskRefInitialized = false;
            ngAfterViewInit(): void {
                this.maskRefInitialized = true;
                if (this._initialValue) {
                    this.writeValue(this._initialValue);
                }
            }
            writeValue(val) {
                if (!this.maskRefInitialized) {
                    this._initialValue = val;
                } else {
                    this.renderer.setProperty(this.element.nativeElement, 'value', val || '');
                }
            }
            registerOnChange(fn: any): void {}
            registerOnTouched(fn: any): void {}
        }
    };
});

@Component({
    selector: 'test-date-format',
    template: `<input [formControl]="testControl" dateFormat="iso8601">`,
})
class DateFormatTestComponent {
    testControl = new FormControl<DateLike>(new Date());
}

describe('NovoDateFormatDirective', () => {
    let fixture: ComponentFixture<DateFormatTestComponent>;
    let dbgDirective: DebugElement;
    let directive: NovoDateFormatDirective;
    let labelService: NovoLabelService;
    let input: HTMLInputElement;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NovoDateFormatDirective, DateFormatTestComponent],
            imports: [ FormsModule, ReactiveFormsModule ],
            providers: [ NovoLabelService, DateFormatService ]
        }).compileComponents();
        fixture = TestBed.createComponent(DateFormatTestComponent);
        labelService = TestBed.inject(NovoLabelService);
        
    }));

    beforeEach(() => {
        fixture.detectChanges();
        dbgDirective = fixture.debugElement.query(By.directive(NovoDateFormatDirective));
        directive = dbgDirective.injector.get(NovoDateFormatDirective);
        input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should format date/time', () => {
        fixture.componentInstance.testControl.setValue('January 4, 2022 11:30:00');
        fixture.detectChanges();
        expect(input.value).toEqual('01/04/2022');
    });

    it('should safely handle receiving a blank value', () => {
        fixture.componentInstance.testControl.setValue('');
        fixture.detectChanges();
        expect(input.value).toEqual('');
    });

    it('should format an international value correctly', () => {
        labelService.dateFormat = 'dd/MM/YYYY';
        const dt = directive.imask.parse('19/06/2025');
        expect(dt.getDate()).toBe(19);
    });

    it('should correctly initialize if writeValue is called before ready', () => {
        labelService.dateFormat = 'dd/MM/YYYY';
        fixture = TestBed.createComponent(DateFormatTestComponent);
        directive = dbgDirective.injector.get(NovoDateFormatDirective);
        fixture.componentInstance.testControl.setValue('January 4, 2022 11:30:00');
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('04/01/2022');
    });

    describe('Function: formatYearMonthDay', () => {
        it('should format date in yyyy-mm-dd format', () => {
            const expected = '2025-10-22';
            const date = new Date('10/22/2025');
            const actual = directive.formatYearMonthDay(date);
            expect(actual).toEqual(expected);
        });
        it('should return null if called with an invalid date', () => {
            const date: any = 'not a date';
            let actual = directive.formatYearMonthDay(date);
            expect(actual).toBeNull();

            actual = directive.formatYearMonthDay(undefined as any);
            expect(actual).toBeNull();

            actual = directive.formatYearMonthDay(null as any);
            expect(actual).toBeNull();
        });
    });
});
