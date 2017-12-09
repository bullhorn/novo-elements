import { Component } from '@angular/core';

@Component({
  selector: 'demo-list-entity',
  templateUrl: './entity.html',
})
export class DemoListEntityComponent {
  public entities: any[] = [
    {
      _subtype: 'ClientCorporation',
      name: 'Central Bank',
      email: 'new-bank-inquiries@centralbank.com',
      phone: '(651) 555-1234',
      address: {
        city: 'Washington',
        state: 'DC',
      },
    },
    {
      _subtype: 'ClientCorporation',
      name: 'Federal Bank',
      email: 'info@federalbank.com',
      phone: '(545) 555-1212',
      address: {
        city: 'Arlington',
        state: 'VA',
      },
    },
    {
      _subtype: 'ClientContact',
      firstName: 'Aaron',
      lastName: 'Burr',
      name: 'Aaron Burr',
      email: 'aburr@centralbank.com',
      phone: '(333) 555-3434',
      status: 'Hold',
      clientCorporation: {
        name: 'Central Bank',
      },
      address: {
        city: 'Washington',
        state: 'DC',
      },
    },
    {
      _subtype: 'ClientContact',
      firstName: 'Alexander',
      lastName: 'Hamilton',
      name: 'Alexander Hamilton',
      email: 'ahamilton@federalbank.com',
      phone: '(333) 555-2222',
      status: 'Active',
      clientCorporation: {
        name: 'Federal Bank',
      },
      address: {
        city: 'Arlington',
        state: 'VA',
      },
    },
    {
      _subtype: 'Candidate',
      firstName: 'Ben',
      lastName: 'Franklin',
      name: 'Ben Franklin',
      email: 'bfranklin@gmail.com',
      phone: '(654) 525-2222',
      status: 'Interviewing',
      companyName: 'Acme, Inc.',
      address: {
        city: 'Boston',
        state: 'MA',
      },
    },
    {
      _subtype: 'Candidate',
      firstName: 'Thomas',
      lastName: 'Jefferson',
      name: 'Thomas Jefferson',
      email: 'tjefferson@usa.com',
      phone: '(123) 542-1234',
      status: 'New Lead',
      address: {
        city: 'Arlington',
        state: 'VA',
      },
    },
  ];
}
