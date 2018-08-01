// NG2
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
// APP
let SearchDemoTpl = require('./templates/SearchDemo.html');

const template = `
<div class="container">
    <h1>Searches & Toggles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Types</h2>

    <h5>Tiles</h5>
    <p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>

    <h5>Searches</h5>
    <p>Searches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
    <div class="example switch-demo">${SearchDemoTpl}</div>
    <code-snippet [code]="SearchDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'search-demo',
  template: template,
})
export class SearchDemoComponent {
  private SearchDemoTpl: string = SearchDemoTpl;
  private toggleCount: number = 0;
  private checked: boolean = true;
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
