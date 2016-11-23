// NG2
import { Component } from '@angular/core';
// APP
import AttributeCardDemoTpl from './templates/AttributeCardDemo.html';
import FullConfigCardDemoTpl from './templates/FullConfigCardDemo.html';
import ExtrasTimelineDemoTpl from './templates/ExtrasTimelineDemo.html';
import ExtrasBestTimeDemoTpl from './templates/ExtrasBestTimeDemo.html';
import ExtrasChartDonutDemoTpl from './templates/ExtrasChartDemoDemo.html';
// Vendor
import { NovoToastService } from './../../../../src/novo-elements';

// TODO - actions back in
const template = `
<div class="container">
    <h1>Cards <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/card">(source)</a></small></h1>
    <p>Components and elements for cards to make sure the loading/empty/layout views are all consistent.</p>

    <h5>Examples</h5>
    <p>Basic Card (using attributes)</p>
    <div class="example">
        ${AttributeCardDemoTpl}
        <div class="actions">
            <button theme="secondary" (click)="toggleLoading()">Toggle Loading</button>
            <button theme="secondary" (click)="toggleMessage()">Toggle Message</button>

        </div>
    </div>
    <code-snippet [code]="AttributeCardDemoTpl"></code-snippet>

    <p>Card (using config object and card-actions)</p>
    <div class="example">
        ${FullConfigCardDemoTpl}
        <div class="actions">
            <button theme="secondary" (click)="toggleLoadingConfig()">Toggle Loading</button>
            <button theme="secondary" (click)="toggleMessageConfig()">Toggle Message</button>

        </div>
    </div>
    <code-snippet [code]="FullConfigCardDemoTpl"></code-snippet>

    <h5>Card Extras - components/elements for cards</h5>
    <p>Timeline</p>
    <div class="example">
        ${ExtrasTimelineDemoTpl}
        <div class="actions">

        </div>
    </div>
    <code-snippet [code]="ExtrasTimelineDemoTpl"></code-snippet>

    <p>Best Time to *INSERT*</p>
    <div class="example">
        ${ExtrasBestTimeDemoTpl}
        <div class="actions">

        </div>
    </div>
    <code-snippet [code]="ExtrasBestTimeDemoTpl"></code-snippet>

    <p>Donut Chart</p>
    <div class="example">
        ${ExtrasChartDonutDemoTpl}
        <div class="actions">

        </div>
    </div>
    <code-snippet [code]="ExtrasChartDonutDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'card-demo',
    template: template
})
export class CardDemoComponent {
    constructor(toaster:NovoToastService) {
        this.toaster = toaster;

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
        this.toaster.alert({
            theme: 'info',
            title: 'Cards',
            message: 'Close Clicked!'
        });
    }

    onRefresh() {
        this.toaster.alert({
            theme: 'success',
            title: 'Cards',
            message: 'Refresh Clicked!'
        });
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

    singleAction() {
        window.alert('HELLO!');//eslint-disable-line
    }
}
