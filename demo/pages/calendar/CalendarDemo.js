import { Component } from 'angular2/core';
import { NOVO_TIME_PICKER_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import CalendarDemoTpl from './templates/CalendarDemo.html';
import SideBySideDemoTpl from './templates/SideBySideDemo.html';
import TimeDemoTpl from './templates/TimeDemo.html';

const template = `
<div class="container">
    <h1>Date and Time Pickers <small><a target="_blank" href="https://bhsource.bullhorn.com/NOVO/bh-elements/blob/master/src/elements/calendar">(source)</a></small></h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>

    <h2>Calendar Picker</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>

    <h5>Full Calendar Picker</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>

    <h5>Full Calendar Picker</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>
    <div class="example calendar-demo">${CalendarDemoTpl}</div>
    <code-snippet [code]="CalendarDemoTpl"></code-snippet>

    <h2>Time Picker</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>

    <h5>Standalone Time Picker</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>
    <div class="example time-demo">${TimeDemoTpl}</div>
    <code-snippet [code]="TimeDemoTpl"></code-snippet>

    <h5>Side-By-Side</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non massa et augue molestie lacinia. Ut purus sem, bibendum at blandit vitae, bibendum sed turpis. Fusce eros libero, fringilla non dapibus in, cursus elementum ipsum.</p>
    <div class="example side-by-side-demo">${SideBySideDemoTpl}</div>
    <code-snippet [code]="SideBySideDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'calendar-demo',
    template: template,
    directives: [NOVO_TIME_PICKER_ELEMENTS, CodeSnippet]
})
export class CalendarDemo {
    constructor() {
        this.CalendarDemoTpl = CalendarDemoTpl;
        this.SideBySideDemoTpl = SideBySideDemoTpl;
        this.TimeDemoTpl = TimeDemoTpl;

        this.time = null;
    }
}
