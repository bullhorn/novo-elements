import { Component } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#8CC152',
    secondary: '#37BC9B',
  },
};

/**
 * @title Big Calendar Example
 */
@Component({
  selector: 'big-calendar-example',
  templateUrl: 'big-calendar-example.html',
  styleUrls: ['big-calendar-example.css'],
})
export class BigCalendarExample {
  public views: Array<any> = [
    {
      label: 'Month',
      value: 'month',
    },
    {
      label: 'Week',
      value: 'week',
    },
    {
      label: 'Day',
      value: 'day',
    },
  ];
  view: string = 'month';

  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      title: 'Interview',
      description: 'with @bvkimball',
      color: colors.green,
      start: new Date(),
      response: CalendarEventResponse.Rejected,
      type: 'Interview',
    },
    {
      title: 'Client Visit',
      description: 'with @asibilia',
      color: colors.red,
      start: new Date(Date.now() + 60000 * 30),
      response: CalendarEventResponse.Accepted,
      type: 'Visit',
    },
    {
      title: 'Interview',
      description: 'with @johndoe',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Phone Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 180),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 150),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 120),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Phone Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 180),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 150),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 120),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Phone Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 180),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 150),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 90),
      end: new Date(Date.now() + 60000 * 120),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Phone Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 75),
      end: new Date(Date.now() + 60000 * 120),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Phone Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 75),
      end: new Date(Date.now() + 60000 * 150),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 270),
      end: new Date(Date.now() + 60000 * 300),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 270),
      end: new Date(Date.now() + 60000 * 360),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: colors.green,
      start: new Date(Date.now() + 60000 * 270),
      end: new Date(Date.now() + 60000 * 2880000),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
  ];

  getNewEvent(date, color, type): CalendarEvent {
    let evt: CalendarEvent = {
      title: 'Meeting',
      description: 'with @jgodi',
      color: color,
      start: date,
      response: type,
      type: 'Meeting',
    };
    return evt;
  }

  dayClicked(date) {
    let evt: CalendarEvent = this.getNewEvent(date, colors.blue, CalendarEventResponse.Maybe);
    this.events.push(evt);
    this.events = [...this.events];
  }

  addShift(event) {
    let evt: CalendarEvent = this.getNewEvent(event.day.date, colors.blue, CalendarEventResponse.Maybe);
    this.events.push(evt);
    this.events = [...this.events];
  }

  removeShift(event) {
    this.events.splice(event.day.events.indexOf(event.event), 1);
  }

  toggleAvailable(event) {
    let evt: CalendarEvent;
    if (!event.day.events.length) {
      evt = this.getNewEvent(event.day.date, colors.green, CalendarEventResponse.Accepted);
      this.events.push(evt);
      this.events = [...this.events];
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
