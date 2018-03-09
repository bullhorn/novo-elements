// NG2
import { Component, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventResponse, NovoLabelService } from './../../../../platform/index';
// APP
let DateDemoTpl = require('./templates/DateDemo.html');
let TimeDemoTpl = require('./templates/TimeDemo.html');
let RangeDemoTpl = require('./templates/RangeDemo.html');
let DateTimeDemoTpl = require('./templates/DateTimeDemo.html');
let DateTimeInputDemoTpl = require('./templates/DateTimeInputDemo.html');
let WeekStartDemoTpl = require('./templates/WeekStartDemo.html');

export class ExtendedLabelService extends NovoLabelService {
    dateFormat = 'dd/mm/yyyy';
    dateFormatPlaceholder = 'DD/MM/YYYY';
}

const template = `
<div class="container">
    <h1>Date and Time Pickers</h1>
    <p>These allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p>

    <h2>Date Picker  <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/date-picker">(source)</a></small></h2>
    <p>The calendar picker is used to select a date. It appears in all date picker fields.</p>

    <h5>Full Date Picker</h5>
    <div class="example demo">${DateDemoTpl}</div>
    <code-snippet [code]="DateDemoTpl"></code-snippet>

    <h2>Time Picker  <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/time-picker">(source)</a></small></h2>
    <p>Time pickers come in 12 hour or 24 hour style.</p>

    <h5>Standalone Time Picker</h5>
    <div class="example demo">${TimeDemoTpl}</div>
    <code-snippet [code]="TimeDemoTpl"></code-snippet>

    <h5>Range Picker</h5>
    <div class="example demo">${RangeDemoTpl}</div>
    <code-snippet [code]="RangeDemoTpl"></code-snippet>

    <h5>Date Time Picker</h5>
    <div class="example demo">${DateTimeDemoTpl}</div>
    <code-snippet [code]="DateTimeDemoTpl"></code-snippet>

    <h5>Date Time Input Picker</h5>
    <div class="example demo">${DateTimeInputDemoTpl}</div>
    <code-snippet [code]="DateTimeInputDemoTpl"></code-snippet>

    <h5>Customizing Week Start</h5>
    <div class="example demo">${WeekStartDemoTpl}</div>
    <code-snippet [code]="WeekStartDemoTpl"></code-snippet>

    <h5>Different Locale</h5>
    <div class="example demo">
    <date-locale-demo></date-locale-demo>
    </div>
    <code-snippet [code]="DateDemoTpl"></code-snippet>
</div>
`;
@Component({
    providers: [
        {provide: LOCALE_ID, useValue: 'en-GB'},
        {provide: NovoLabelService, useClass: ExtendedLabelService},
    ],
    selector: 'date-locale-demo',
    template: DateDemoTpl
})
export class DateLocaleDemoComponent {
  dateOne: Date = new Date();
  dateTwo: Date = new Date();
}

@Component({
    selector: 'date-picker-demo',
    template: template
})
export class DatePickerDemoComponent {
    DateDemoTpl: string = DateDemoTpl;
    TimeDemoTpl: string = TimeDemoTpl;
    RangeDemoTpl: string = RangeDemoTpl;
    DateTimeDemoTpl: string = DateTimeDemoTpl;
    DateTimeInputDemoTpl: string = DateTimeInputDemoTpl;
    WeekStartDemoTpl: string = WeekStartDemoTpl;

    time: Date = new Date();
    dateOne: Date = new Date();
    dateTwo: Date = new Date();
    weekStartDate: Date = new Date();
    dateTime: Date = new Date('12/04/1987');
    dateTimeInput: Date = new Date('08/01/1983 12:57 PM');
    dateTimeInput2: Date = new Date('08/02/1984 12:57 PM');
    dateTimeInput3: Date = new Date('08/03/1985 12:57 PM');
    start: any = new Date().setMonth(new Date().getMonth() - 1);
    end: any = new Date().setMonth(new Date().getMonth() + 1);
    value: any = {
        startDate: null,
        endDate: null
    };
    value2: any = {
        startDate: null,
        endDate: null
    };
    weekStart: number = 0;

    setWeekStart(num: number): void {
        this.weekStart = num;
    }
}
