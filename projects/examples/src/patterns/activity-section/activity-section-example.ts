import { Component } from '@angular/core';

/**
 * @title Activity Section
 */
@Component({
  selector: 'activity-section-example',
  templateUrl: 'activity-section-example.html',
  styleUrls: ['activity-section-example.css'],
})
export class ActivitySectionExample {
  public isDisabled: boolean = true;
  public details: any;

  constructor() {}
}

const TableData = [
  {
    name: 'Victoria Cantrell',
    position: 'Integer Corporation',
    office: 'Croatia',
    ext: { obj: '8262' },
    startDate: new Date('2017/08/19'),
    salary: 208178,
    percent: 0.5,
    status: 'New Lead',
    description:
      'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
    categories: ['Temporary', 'Developer'],
  },
  {
    name: 'Pearl Crosby',
    position: 'In PC',
    office: 'Cambodia',
    ext: { obj: '8262' },
    startDate: new Date('2017/10/08'),
    salary: 114367,
    percent: 0.5,
    status: 'New Lead',
    description:
      'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
    categories: ['Temporary', 'Developer'],
  },
  {
    name: 'Colette Foley',
    position: 'Lorem Inc.',
    office: 'Korea, North',
    ext: { obj: '8262' },
    startDate: new Date('2017/07/19'),
    salary: 721473,
    status: 'New Lead',
    percent: 1,
    description:
      'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
    categories: ['Temporary', 'Developer'],
  },
];
