import { Component } from 'angular2/core';
import {
    NOVO_CARD_ELEMENTS,
    NOVO_CARD_EXTRA_ELEMENTS,
    NOVO_BUTTON_ELEMENTS
} from './../../../src/novo-elements';

// TODO - add forms/toasts back in!!

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import AttributeCardDemoTpl from './templates/AttributeCardDemo.html';
import FullConfigCardDemoTpl from './templates/FullConfigCardDemo.html';
import ExtrasTimelineDemoTpl from './templates/ExtrasTimelineDemo.html';
import ExtrasBestTimeDemoTpl from './templates/ExtrasBestTimeDemo.html';
import ExtrasChartDonutDemoTpl from './templates/ExtrasChartDemoDemo.html';

const template = `
<div class="container">
    <h1>Cards <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/card">(source)</a></small></h1>
    <p>Components and elements for cards to make sure the loading/empty/layout views are all consistent.</p>

    <h5>Examples</h5>
    <p>Basic Card (using attributes)</p>
    <div class="example">
        ${AttributeCardDemoTpl}
        <div class="actions">
            <button theme="secondary" (click)="toggleLoading()">Toggle Loading</button>
            <button theme="secondary" (click)="toggleMessage()">Toggle Message</button>
            <form-field>
                <form-input name="refreshable" label="Refreshable?" type="checkbox" [(value)]="refresh"></form-input>
            </form-field>
           <form-field>
                <form-input name="closable" label="Closable?" type="checkbox" [(value)]="close"></form-input>
            </form-field>
           <form-field>
                <form-input name="movable" label="Movable?" type="checkbox" [(value)]="move"></form-input>
            </form-field>
            <form-field>
                 <form-input name="padding" label="Has Padding?" type="checkbox" [(value)]="padding"></form-input>
             </form-field>
        </div>
    </div>
    <code-snippet [code]="AttributeCardDemoTpl"></code-snippet>

    <p>Basic Card (using config object)</p>
    <div class="example">
        ${FullConfigCardDemoTpl}
        <div class="actions">
            <button theme="secondary" (click)="toggleLoadingConfig()">Toggle Loading</button>
            <button theme="secondary" (click)="toggleMessageConfig()">Toggle Message</button>
            <form-field>
                <form-input name="refreshable" label="Refreshable?" type="checkbox" [(value)]="fullConfig.refresh"></form-input>
            </form-field>
           <form-field>
                <form-input name="closable" label="Closable?" type="checkbox" [(value)]="fullConfig.close"></form-input>
            </form-field>
           <form-field>
                <form-input name="movable" label="Movable?" type="checkbox" [(value)]="fullConfig.move"></form-input>
            </form-field>
        </div>
    </div>
    <code-snippet [code]="FullConfigCardDemoTpl"></code-snippet>

    <h5>Card Extras - components/elements for cards</h5>
    <p>Timeline</p>
    <div class="example">
        ${ExtrasTimelineDemoTpl}
        <div class="actions">
            <form-field>
                <form-label>Start</form-label>
                <form-input name="start" type="text" placeholder="Start" [(value)]="start"></form-input>
            </form-field>
            <form-field>
                <form-label>End</form-label>
                <form-input name="end" type="text" placeholder="End" [(value)]="end"></form-input>
            </form-field>
            <form-field>
                <form-label>Created</form-label>
                <form-input name="created" type="text" placeholder="Created" [(value)]="created"></form-input>
            </form-field>
        </div>
    </div>
    <code-snippet [code]="ExtrasTimelineDemoTpl"></code-snippet>

    <p>Best Time to *INSERT*</p>
    <div class="example">
        ${ExtrasBestTimeDemoTpl}
        <div class="actions">
            <form-field>
                <form-label>Label</form-label>
                <form-input name="label" type="text" placeholder="Label" [(value)]="bestLabel"></form-input>
            </form-field>
            <form-field>
                <form-label>Time</form-label>
                <form-input name="time" type="text" placeholder="Time" [(value)]="bestTime"></form-input>
            </form-field>
            <form-field>
                <form-label>Day</form-label>
                <form-input name="day" type="text" placeholder="Day" [(value)]="bestDay"></form-input>
            </form-field>
        </div>
    </div>
    <code-snippet [code]="ExtrasBestTimeDemoTpl"></code-snippet>

    <p>Donut Chart</p>
    <div class="example">
        ${ExtrasChartDonutDemoTpl}
        <div class="actions">
            <form-field>
                <form-label>Value</form-label>
                <form-input name="value" type="text" placeholder="Value" [(value)]="donutValue"></form-input>
            </form-field>
            <form-field>
                <form-label>Color</form-label>
                <form-input name="color" type="text" placeholder="Color" [(value)]="donutColor"></form-input>
            </form-field>
            <form-field>
                <form-label>Label</form-label>
                <form-input name="label" type="text" placeholder="Label" [(value)]="donutLabel"></form-input>
            </form-field>
        </div>
    </div>
    <code-snippet [code]="ExtrasChartDonutDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'card-demo',
    directives: [
        CodeSnippet,
        NOVO_BUTTON_ELEMENTS,
        NOVO_CARD_ELEMENTS,
        NOVO_CARD_EXTRA_ELEMENTS
    ],
    template: template
})
export class CardDemo {
    constructor() {
        // Templates
        this.AttributeCardDemoTpl = AttributeCardDemoTpl;
        this.FullConfigCardDemoTpl = FullConfigCardDemoTpl;
        this.ExtrasTimelineDemoTpl = ExtrasTimelineDemoTpl;
        this.ExtrasBestTimeDemoTpl = ExtrasBestTimeDemoTpl;
        this.ExtrasChartDonutDemoTpl = ExtrasChartDonutDemoTpl;

        // Config for demos
        this.refresh = true;
        this.close = true;
        this.move = true;
        this.padding = true;

        this.fullConfig = {
            refresh: false,
            icon: 'email',
            messageIcon: 'email',
            close: false,
            move: true,
            onClose: this.onClose.bind(this),
            onRefresh: this.onRefresh.bind(this),
            title: 'Test',
            loading: false,
            padding: true
        };

        this.start = 2000;
        this.end = 2005;
        this.created = 1995;

        this.bestLabel = 'BEST TIME TO CONTACT';
        this.bestTime = '1-PM';
        this.bestDay = 'Friday';

        this.donutValue = 0.5;
        this.donutColor = '#662255';
        this.donutLabel = 'Probability of Win %';
    }

    onClose() {
        console.log('CLOSED'); // eslint-disable-line
        // this.toaster.alert(BhToast, {
        //     theme: 'info',
        //     title: 'Cards',
        //     message: 'Close Clicked!'
        // });
    }

    onRefresh() {
        console.log('REFRESHED'); // eslint-disable-line
        // this.toaster.alert(BhToast, {
        //     theme: 'success',
        //     title: 'Cards',
        //     message: 'Refresh Clicked!'
        // });
    }

    toggleLoading() {
        this.loading = !this.loading;
    }

    toggleMessage() {
        if (!this.message) {
            this.message = 'NO DATA!';
            this.messageIcon = 'email';
        } else {
            this.message = undefined;
        }
    }

    toggleLoadingConfig() {
        this.fullConfig.loading = !this.fullConfig.loading;
    }

    toggleMessageConfig() {
        if (!this.fullConfig.message) {
            this.fullConfig.message = 'NO DATA!';
        } else {
            this.fullConfig.message = undefined;
        }
    }
}
