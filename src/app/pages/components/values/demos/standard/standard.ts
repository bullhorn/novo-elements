import { Component } from '@angular/core';

@Component({
  selector: 'demo-value-standard',
  templateUrl: './standard.html',
})
export class DemoValueStandardComponent {
  public toggleCount: number = 0;
  public checked: boolean = true;
  public simpleData: number = 1234567890;
  public simpleMeta: any = {
    type: 'SCALAR',
    name: 'phone1',
    label: 'PH #',
  };
  public categoryData: any = {
    value: 'stuff',
    label: 'Stuff Category',
  };
  public categoryMeta: any = {
    type: 'TO_ONE',
    name: 'category',
    label: 'Category',
    associatedEntity: {
      entity: 'Category',
    },
  };
  public iconRightData: any = 'Approved';
  public iconRightMeta: any = {
    type: 'SCALAR',
    options: [
      {
        value: 'Approved',
        label: 'Approved',
      },
    ],
    name: 'status',
    label: 'Status',
    actions: [
      {
        icon: 'next',
        onClick: (event: Event, data: string, meta: any) => {
          window.alert('hey there');
        },
      },
    ],
  };
  public corporateUserData: any = {
    id: 123,
    firstName: 'Jack',
    lastName: 'White',
  };
  public corporateUserMeta: any = {
    type: 'TO_ONE',
    name: 'user',
    label: 'Internal User',
    associatedEntity: {
      entity: 'CorporateUser',
    },
  };
  public formatterData: any = {
    id: 123,
  };
  public formatterMeta: any = {
    name: 'Placement',
    label: 'Placement',
    associatedEntity: {
      entity: 'Placement',
    },
    formatter: (value: any, args: any) => {
      return `${args.label} #${(value && value.id) || ''}`;
    },
    onClick: (event: Event, data: any) =>
      alert(`Opening Placement Id: ${data.id}`),
  };
  public phoneValueData: any = '2222222222';
  public phoneValueMeta: any = {
    name: 'phone1',
    label: 'Mobile Phone #',
    links: [
      {
        icon: 'phone',
        href: (data: string) => `tel:${data}`,
      },
      {
        icon: 'sms',
        href: (data: string) => `sms:${data}`,
      },
    ],
  };
  public emailValueData: any = 'amrutha@example.com';
  public emailValueMeta: any = {
    name: 'email',
    label: 'Email Address',
    links: [
      {
        icon: 'email',
        href: (data: string) => `mailto:${data}`,
      },
    ],
  };
  public externalLinkData: any = 'www.bullhorn.com';
  public externalLinkMeta: any = {
    name: 'companyUrl',
    label: 'Company URL',
    onClick: (event: Event, data: string) => window.open(data),
  };
  public dateTimeValueData: any = new Date().getTime();
  public dateTimeValueMeta: any = {
    dataSpecialization: 'DATETIME',
    label: 'Date',
  };
  public addressValueData: any = {
    address1: '100 Summer Street',
    city: 'Boston',
    state: 'MA',
    zip: '02143',
    country: {
      name: 'United States',
    },
  };
  public addressValueMeta: any = {
    dataType: 'Address',
    type: 'Address',
    label: 'Address',
    name: 'address',
    links: [
      {
        icon: 'location',
        href: (data: any) => `map:${data.city},+${data.state}`,
      },
    ],
  };
  public associatedValueData: any = {
    id: 1,
    firstName: 'Alice',
    lastName: 'Wonderland',
  };
  public associatedValueMeta: any = {
    type: 'TO_ONE',
    name: 'owner',
    label: 'Owner',
    associatedEntity: {
      entity: 'CorporateUser',
    },
  };

  public increment(): void {
    this.toggleCount++;
  }
}
