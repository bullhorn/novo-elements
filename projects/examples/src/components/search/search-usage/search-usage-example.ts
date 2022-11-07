import { Component } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @title Search Box Usage
 */
@Component({
  selector: 'search-usage-example',
  templateUrl: 'search-usage-example.html',
  styleUrls: ['search-usage-example.css'],
})
export class SearchUsageExample {
  public test: string = 'TEST';
  public geo: string = '';
  public entity: string = '';
  public searchResults: Subject<any[]> = new Subject();
  public searchData: any[] = [
    {
      data: {
        title: 'Central Bank',
        name: 'Central Bank',
        email: 'new-bank-inquiries@centralbank.com',
        phone: '(651) 555-1234',
        address: { city: 'Washington', state: 'DC' },
        searchEntity: 'ClientCorporation',
        type: 'company',
      },
    },
    {
      data: {
        title: 'Federal Bank',
        name: 'Federal Bank',
        email: 'info@federalbank.com',
        phone: '(545) 555-1212',
        address: { city: 'Arlington', state: 'VA' },
        searchEntity: 'ClientCorporation',
        type: 'company',
      },
    },
    {
      data: {
        title: 'Aaron Burr',
        firstName: 'Aaron',
        lastName: 'Burr',
        name: 'Aaron Burr',
        companyName: 'Central Bank',
        email: 'aburr@centralbank.com',
        phone: '(333) 555-3434',
        address: { city: 'Washington', state: 'DC' },
        status: 'Hold',
        searchEntity: 'ClientContact',
        type: 'person',
      },
    },
    {
      data: {
        title: 'Alexander Hamilton',
        firstName: 'Alexander',
        lastName: 'Hamilton',
        name: 'Alexander Hamilton',
        companyName: 'Federal Bank',
        email: 'ahamilton@federalbank.com',
        phone: '(333) 555-2222',
        address: { city: 'Arlington', state: 'VA' },
        status: 'Active',
        searchEntity: 'ClientContact',
        type: 'person',
      },
    },
    {
      data: {
        title: 'Ben Franklin',
        firstName: 'Ben',
        lastName: 'Franklin',
        name: 'Ben Franklin',
        email: 'bfranklin@gmail.com',
        phone: '(654) 525-2222',
        address: { city: 'Boston', state: 'MA' },
        status: 'Interviewing',
        searchEntity: 'Candidate',
        type: 'candidate',
      },
    },
    {
      data: {
        title: 'Thomas Jefferson',
        firstName: 'Thomas',
        lastName: 'Jefferson',
        name: 'Thomas Jefferson',
        email: 'tjefferson@usa.com',
        phone: '(123) 542-1234',
        address: { city: 'Arlington', state: 'VA' },
        status: 'New Lead',
        searchEntity: 'Candidate',
        type: 'candidate',
      },
    },
  ];

  public search(term: string): void {
    this.searchResults.next(this.searchData.map((x) => x.data));
  }
  public onSelectMatch(item) {
    this.test = item.name;
  }
  public onSelectEntity(item) {
    this.entity = item.data.name;
  }
}
