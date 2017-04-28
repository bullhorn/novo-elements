// NG2
import { Component } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from './../../../../index';
// APP
let BigCalendarDemoTpl = require('./templates/BigCalendarDemo.html');
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

    <h5>Big Calendar Picker</h5>
    <div class="example demo">${BigCalendarDemoTpl}</div>
    <code-snippet [code]="BigCalendarDemoTpl"></code-snippet>

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

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#8CC152',
    secondary: '#37BC9B'
  }
};

@Component({
    selector: 'calendar-demo',
    template: template
})
export class CalendarDemoComponent {
    BigCalendarDemoTpl: string = BigCalendarDemoTpl;
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

    viewDate: Date = new Date();
    events: CalendarEvent[] = [{
        title: 'Has custom class',
        color: colors.red,
        start: new Date(),
        response: CalendarEventResponse.Rejected
    }];

    getNewEvent(date, color, type):CalendarEvent {
        let evt:CalendarEvent = {
            title: 'Has custom class',
            color: color,
            start: date,
            response: type
        };
        return evt;
    }

    dayClicked(event) {
        let evt:CalendarEvent = this.getNewEvent( event.day.date, colors.blue, CalendarEventResponse.Maybe );
        this.events.push(evt);
    }

    addShift(event) {
        let evt:CalendarEvent = this.getNewEvent( event.day.date, colors.blue, CalendarEventResponse.Maybe);
        this.events.push(evt);
    }

    removeShift(event) {
        this.events.splice(event.day.events.indexOf(event.event), 1);
    }

    toggleAvailable(event) {
        let evt:CalendarEvent;
        if (!event.day.events.length) {
            evt = this.getNewEvent( event.day.date, colors.green, CalendarEventResponse.Accepted);
            this.events.push(evt);
        } else {
            evt = event.day.events[0];
            switch (evt.response) {
                case CalendarEventResponse.Accepted:
                    evt.response = CalendarEventResponse.Rejected;
                    break;
                case CalendarEventResponse.Rejected:
                    event.day.events = [];
                    break;
                default:
                    break;
            }
        }
    }
}
