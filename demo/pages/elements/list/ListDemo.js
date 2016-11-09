// NG2
import { Component } from '@angular/core';
// APP
import ListDemoTpl from './templates/ListDemo.html';
import ThemedListDemoTpl from './templates/ThemedListDemo.html';

const template = `
<div class="container">
    <h1>List / Item <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/list">(source)</a></small></h1>
    <p>Lists are used to display rows of information like entities or entity data
    and appear on cards, our mobile app, and several other places across the Bullhorn platform.</p>

    <h2>Basic Usage</h2>

    <h5>Standard List</h5>
    <p>This is an example of a standard list.</p>
    <div class="example standard-list-demo">${ListDemoTpl}</div>
    <code-snippet [code]="ListDemoTpl"></code-snippet>

    <h5>Themed List</h5>
    <p>This is an example of a themed list.</p>
    <div class="example themed-list-demo">${ThemedListDemoTpl}</div>
    <code-snippet [code]="ThemedListDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'list-demo',
    template: template
})
export class ListDemoComponent {
    constructor() {
        this.ListDemoTpl = ListDemoTpl;
        this.ThemedListDemoTpl = ThemedListDemoTpl;

        let ONE_HOUR = 60 * 60 * 1000;
        /* ms */
        let TWO_HOURS = ONE_HOUR * 2;
        let THREE_HOURS = ONE_HOUR * 3;
        let currentDate = new Date();

        let oneHourAgo = currentDate.getTime() - ONE_HOUR;
        let twoHoursAgo = currentDate.getTime() - TWO_HOURS;
        let threeHoursAgo = currentDate.getTime() - THREE_HOURS;

        /* "mockResponse[]" should represent a REST response with improperly formatted data.
         /  The "buildItems()" function is taking this data object and massaging it
         /  to build the list items appropriately via a new data object "pulseItems[]".
         /  In page1.html you can see how the new object builds a list of items.
         /  - @asibilia
         */

        let mockResponse = [{
            type: 'opportunity',
            dateCreated: oneHourAgo,
            sentiment: {
                rating: 'negative',
                type: 'engagement',
                comment: 'No emails in last 10 days'
            },
            user: {
                firstName: 'Steph',
                lastName: 'Curry',
                company: 'Wells Fargo',
                location: 'Golden State, CA'
            }
        }, {
            type: 'opportunity',
            dateCreated: twoHoursAgo,
            sentiment: {
                rating: 'negative',
                type: 'probability',
                comment: 'Now has low probability to close'
            },
            user: {
                firstName: 'Lebron',
                lastName: 'James',
                company: 'Amazon',
                location: 'Cleveland, OH'
            }
        }, {
            type: 'company',
            dateCreated: threeHoursAgo,
            sentiment: {
                rating: 'positive',
                type: 'connection',
                comment: 'New connection'
            },
            user: {
                firstName: 'Derrick',
                lastName: 'Rose',
                company: 'Walmart',
                location: 'Chicago, IL'
            }
        }];

        this.pulseItems = [];

        this.buildItems(mockResponse);
    }

    buildItems(resp) {
        for (let obj of resp) {
            let item = {};

            /*
             ||| This is the item structure to be pushed to pulseItems[] and used
             ||| to build the list & items.
             |
             |   item = {
             |       "name": '',
             |       "type": '',
             |       "icon": {
             |           "name": '',
             |           "sentiment": ''
             |       },
             |       "comment": '',
             |       "timeAgo": ''
             |    }
             |
             */

            item.name = obj.user.company;
            item.type = obj.type;
            item.icon = {};

            if (obj.sentiment.type === 'connection') {
                item.icon.name = 'bhi-add-o';
            }

            if (obj.sentiment.type === 'engagement') {
                item.icon.name = (obj.sentiment.rating === 'positive') ? 'bhi-trending-up' : 'bhi-trending-down';
            }

            item.icon.sentiment = obj.sentiment.rating;
            item.comment = obj.sentiment.comment;
            item.timeAgo = obj.dateCreated;

            this.pulseItems.push(item);
        }
    }
}
