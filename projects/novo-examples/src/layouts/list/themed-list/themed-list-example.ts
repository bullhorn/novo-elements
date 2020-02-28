import { Component } from '@angular/core';

/**
 * @title Themed List Example
 */
@Component({
  selector: 'themed-list-example',
  templateUrl: 'themed-list-example.html',
  styleUrls: ['themed-list-example.css'],
})
export class ThemedListExample {
  public pulseItems: any;

  constructor() {
    const ONE_HOUR = 60 * 60 * 1000;
    /* ms */
    const TWO_HOURS = ONE_HOUR * 2;
    const THREE_HOURS = ONE_HOUR * 3;
    const currentDate = new Date();

    const oneHourAgo = currentDate.getTime() - ONE_HOUR;
    const twoHoursAgo = currentDate.getTime() - TWO_HOURS;
    const threeHoursAgo = currentDate.getTime() - THREE_HOURS;

    /* "mockResponse[]" should represent a REST response with improperly formatted data.
    /  The "buildItems()" function is taking this data object and massaging it
    /  to build the list items appropriately via a new data object "pulseItems[]".
    /  In page1.html you can see how the new object builds a list of items.
    /  - @asibilia
    */

    const mockResponse = [
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
    for (const obj of resp) {
      const item: any = {};

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
