import { Component } from '@angular/core';
import { NOVO_TIME_PICKER_ELEMENTS, NOVO_DATE_PICKER_ELEMENTS } from './../../../src/novo-elements';
import moment from 'moment/moment';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import CalendarDemoTpl from './templates/CalendarDemo.html';
import TimeDemoTpl from './templates/TimeDemo.html';

const template = `
<div class="container">
    <h1>Date and Time Pickers</h1>
    <p>Calendar and Time pickers give users a more unique visual experience than standard input fields.</p>

    <h2>Calendar Picker</h2>
    <p>Calendar pickers are used to pick dates and can be used inline in a form or as a standalone modal.</p>

    <h5>Full Calendar Picker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/date-picker">(source)</a></small></h5>
    <div class="example demo">${CalendarDemoTpl}</div>
    <code-snippet [code]="CalendarDemoTpl"></code-snippet>

    <h2>Time Picker</h2>
    <p>Time pickers come in 12 hour or 24 hour style.</p>

    <h5>Standalone Time Picker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/time-picker">(source)</a></small></h5>
    <div class="example demo">${TimeDemoTpl}</div>
    <code-snippet [code]="TimeDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'calendar-demo',
    template: template,
    directives: [NOVO_TIME_PICKER_ELEMENTS, NOVO_DATE_PICKER_ELEMENTS, CodeSnippet]
})
export class CalendarDemo {
    constructor() {
        this.CalendarDemoTpl = CalendarDemoTpl;
        this.TimeDemoTpl = TimeDemoTpl;

        this.time = new Date();
        this.dateOne = new Date();
        this.dateTwo = new Date();
        this.start = moment().subtract(1, 'months');
        this.end = moment().add(1, 'months');
    }
}
