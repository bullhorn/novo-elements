import { Component } from '@angular/core';

/**
 * @title Collapsable Column Usage Example
 */
@Component({
  selector: 'collapsable-column-usage-example',
  templateUrl: 'collapsable-column-usage-example.html',
  styleUrls: ['collapsable-column-usage-example.css'],
})
export class CollapsableColumnUsageExample {
  entity: string = 'JobOrder';
  columns: Array<any> = [{
    header: 'Web Responses',
    icon: 'sendout',
    data: [{
      candidate: {
        id: 5091979,
        firstName: 'Bruce',
        lastName: 'Banner',
        email: 'test@email1.com',
      },
      clientCorporation: {
        id: 158729,
        name: 'Forward to Staffing Alias'
      },
      clientContact: {
        id: 5575734,
        firstName: 'Clark',
        lastName: 'Kent'
      },
      dateAdded: 1621351181253,
      id: 41988,
      numTimesRead: 0,
      jobSubmission: {
        id: 178769
      },
      jobOrder: {
        id: 146435,
        title: 'Demolition Manager',
        employmentType: 'Contract-to-hire',
        owner: {
          id: 5467570,
          firstName: 'Jack',
          lastName: 'Novo'
        }
      },
      user: {
        id: 5467570,
        firstName: 'Jack',
        lastName: 'Novo'
      },
      userMessage: null
    }, {
      candidate: {
        id: 5091979,
        firstName: 'Barry',
        lastName: 'Allen',
        email: 'test@email2.com',
      },
      clientCorporation: {
        id: 158729,
        name: 'STAR Labs'
      },
      clientContact: {
        id: 5575734,
        firstName: 'Bruce',
        lastName: 'Wayne'
      },
      dateAdded: 1621351181253,
      id: 41988,
      numTimesRead: 0,
      jobSubmission: {
        id: 178769
      },
      jobOrder: {
        id: 146435,
        title: 'Track Coach',
        employmentType: 'Full-time',
        owner: {
          id: 5467570,
          firstName: 'Jack',
          lastName: 'Novo'
        }
      },
      user: {
        id: 5467570,
        firstName: 'Jack',
        lastName: 'Novo'
      },
      userMessage: null
    }]
  }, {
    header: 'Submissions',
    icon: 'star-o',
    data: [{
      candidate: {
        id: 5091979,
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'test@email1.com',
      },
      clientCorporation: {
        id: 158729,
        name: 'Forward to Staffing Alias'
      },
      clientContact: {
        id: 5575734,
        firstName: 'Lois',
        lastName: 'Lane'
      },
      dateAdded: 1621351181253,
      id: 41988,
      numTimesRead: 0,
      jobSubmission: {
        id: 178769
      },
      jobOrder: {
        id: 146435,
        title: 'Cargo Loader',
        employmentType: 'Contract-to-hire',
        owner: {
          id: 5467570,
          firstName: 'Jack',
          lastName: 'Novo'
        }
      },
      user: {
        id: 5467570,
        firstName: 'Jack',
        lastName: 'Novo'
      },
      userMessage: null
    }, {
      candidate: {
        id: 5091979,
        firstName: 'Wally',
        lastName: 'West',
        email: 'test@email2.com',
      },
      clientCorporation: {
        id: 158729,
        name: 'STAR Labs'
      },
      clientContact: {
        id: 5575734,
        firstName: 'Joe',
        lastName: 'West'
      },
      dateAdded: 1621351181253,
      id: 41988,
      numTimesRead: 0,
      jobSubmission: {
        id: 178769
      },
      jobOrder: {
        id: 146435,
        title: 'Racecar Driver',
        employmentType: 'Full-time',
        owner: {
          id: 5467570,
          firstName: 'Jack',
          lastName: 'Novo'
        }
      },
      user: {
        id: 5467570,
        firstName: 'Jack',
        lastName: 'Novo'
      },
      userMessage: null
    }]
  }];
}
