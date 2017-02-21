// NG2
import { Component } from '@angular/core';
// APP
let CalendarDemoTpl = require('./templates/CalendarDemo.html');
let TimeDemoTpl = require('./templates/TimeDemo.html');
let RangeDemoTpl = require('./templates/RangeDemo.html');
let DateTimeDemoTpl = require('./templates/DateTimeDemo.html');

const template = `
<div class="container">
    <h1>Date and Time Pickers</h1>
    <p>These allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p>

    <h2>Calendar Picker  <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/date-picker">(source)</a></small></h2>
    <p>The calendar picker is used to select a date. It appears in all date picker fields.</p>

    <h5>Full Calendar Picker</h5>
    <div class="example demo">${CalendarDemoTpl}</div>
    <code-snippet [code]="CalendarDemoTpl"></code-snippet>

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
</div>
`;

@Component({
    selector: 'calendar-demo',
    template: template
})
export class CalendarDemoComponent {
    CalendarDemoTpl: string = CalendarDemoTpl;
    TimeDemoTpl: string = TimeDemoTpl;
    RangeDemoTpl: string = RangeDemoTpl;
    DateTimeDemoTpl: string = DateTimeDemoTpl;

    time: Date = new Date();
    dateOne: Date = new Date();
    dateTwo: Date = new Date();
    dateTime: Date = new Date();
    start: any = new Date().setMonth(new Date().getMonth() - 1);
    end: any = new Date().setMonth(new Date().getMonth() + 1);
    value: any = {
        startDate: null,
        endDate: null
    };
}
