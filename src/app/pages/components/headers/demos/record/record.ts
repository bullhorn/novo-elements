import { Component } from '@angular/core';

import { COLORS } from '../consts';

@Component({
  selector: 'demo-header-record',
  templateUrl: './record.html',
})
export class DemoHeaderRecordComponent {
  public colors: string[] = COLORS;
  public entity: string = 'company';
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
  public dateTimeValueData: any = new Date().getTime();
  public dateTimeValueMeta: any = {
    dataSpecialization: 'DATETIME',
    label: 'Date',
  };
}
