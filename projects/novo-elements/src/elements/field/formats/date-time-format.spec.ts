import { Component, DebugElement, ElementRef, inject, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NovoDateTimeFormatDirective } from './date-time-format';
import { NovoLabelService, DateFormatService } from 'novo-elements/services';
import { DateLike } from 'novo-elements/utils';
import { ControlValueAccessor, FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

jest.mock('angular-imask', () => {
    return {
        IMaskDirective: class implements ControlValueAccessor {
            renderer = inject(Renderer2);
            element = inject(ElementRef);
            writeValue(val) {
                this.renderer.setProperty(this.element.nativeElement, 'value', val || '');
            }
            registerOnChange(fn: any): void {}
            registerOnTouched(fn: any): void {}
        }
    };
});

@Component({
    selector: 'test-datetime-format',
    template: `<input [formControl]="testControl" dateTimeFormat="iso8601">`,
})
class DateFormatTestComponent {
    testControl = new FormControl<DateLike>(new Date());
}

describe('NovoDateTimeFormatDirective', () => {
    let fixture: ComponentFixture<DateFormatTestComponent>;
    let dbgDirective: DebugElement;
    let directive: NovoDateTimeFormatDirective;
    let input: HTMLInputElement;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NovoDateTimeFormatDirective, DateFormatTestComponent],
            imports: [ FormsModule, ReactiveFormsModule ],
            providers: [ NovoLabelService, DateFormatService ]
        }).compileComponents();
        fixture = TestBed.createComponent(DateFormatTestComponent);
        
    }));

    beforeEach(() => {
        fixture.detectChanges();
        dbgDirective = fixture.debugElement.query(By.directive(NovoDateTimeFormatDirective));
        directive = dbgDirective.injector.get(NovoDateTimeFormatDirective);
        input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should format date/time', () => {
        fixture.componentInstance.testControl.setValue('January 4, 2022 11:30:00');
        fixture.detectChanges();
        expect(input.value).toEqual('01/04/2022, 11:30 AM');
    });

    it('should safely handle receiving a blank value', () => {
        fixture.componentInstance.testControl.setValue('');
        fixture.detectChanges();
        expect(input.value).toEqual('');
    });
});
