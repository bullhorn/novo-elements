// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { StaticDataTableService } from './static-data-table.service';
import * as dateFns from 'date-fns';

describe('StaticDataTableService', () => {
  let service;

  beforeEach(async(() => {
    let staticDataSet1 = [];
    for (let i = 0; i < 100; i++) {
      let day = dateFns.subDays(new Date(), i);
      let rando = Math.floor(Math.random() * 5);
      staticDataSet1.push({
        id: i,
        date: day,
        status: `Status ${rando}`,
      });
    }
    service = new StaticDataTableService([...staticDataSet1]);
  }));

  it('should initialize correctly.', () => {
    expect(service).toBeDefined();
  });

  describe('method: filterData', () => {
    it('should filter data when passed a value', () => {
      let results = service.filterData(service.currentData, { id: 'id', value: 5 });
      let resultsAreFiltered = results.every((x) => x.id.toString().includes('5'));
      expect(resultsAreFiltered).toBe(true);
    });
    it('should filter data when passed an array of values', () => {
      let results = service.filterData(service.currentData, { id: 'status', value: [1, 5] });
      let resultsAreFiltered = results.every((x) => x.status.includes(['1', '5']));
      expect(resultsAreFiltered).toBe(true);
    });
  });
});
