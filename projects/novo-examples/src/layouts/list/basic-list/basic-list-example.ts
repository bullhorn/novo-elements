import { Component } from '@angular/core';

/**
 * @title Basic List Layout
 */
@Component({
  selector: 'basic-list-example',
  templateUrl: 'basic-list-example.html',
  styleUrls: ['basic-list-example.css'],
})
export class BasicListExample {
  public pulseItems: any;

  constructor() {
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

    let mockResponse = [
      {
        type: 'opportunity',
        dateCreated: oneHourAgo,
        sentiment: {
          rating: 'negative',
          type: 'engagement',
          comment: 'No emails in last 10 days',
        },
        user: {
          firstName: 'Steph',
          lastName: 'Curry',
          company: 'Wells Fargo',
          location: 'Golden State, CA',
        },
      },
      {
        type: 'opportunity',
        dateCreated: twoHoursAgo,
        sentiment: {
          rating: 'negative',
          type: 'probability',
          comment: 'Now has low probability to close',
        },
        user: {
          firstName: 'Lebron',
          lastName: 'James',
          company: 'Amazon',
          location: 'Cleveland, OH',
        },
      },
      {
        type: 'company',
        dateCreated: threeHoursAgo,
        sentiment: {
          rating: 'positive',
          type: 'connection',
          comment: 'New connection',
        },
        user: {
          firstName: 'Derrick',
          lastName: 'Rose',
          company: 'Walmart',
          location: 'Chicago, IL',
        },
      },
    ];

    this.pulseItems = [];

    this.buildItems(mockResponse);
  }

  buildItems(resp) {
    for (let obj of resp) {
      let item: any = {};

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
        item.icon.name = obj.sentiment.rating === 'positive' ? 'bhi-trending-up' : 'bhi-trending-down';
      }

      item.icon.sentiment = obj.sentiment.rating;
      item.comment = obj.sentiment.comment;
      item.timeAgo = obj.dateCreated;

      this.pulseItems.push(item);
    }
  }
}
