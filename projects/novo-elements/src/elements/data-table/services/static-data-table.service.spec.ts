// NG2
import { async } from '@angular/core/testing';
import * as dateFns from 'date-fns';
// APP
import { StaticDataTableService } from './static-data-table.service';

describe('StaticDataTableService', () => {
  let service;

  beforeEach(async(() => {
    const staticDataSet1 = [];
    for (let i = 0; i < 100; i++) {
      const day = dateFns.subDays(new Date(), i);
      const rando = Math.floor(Math.random() * 5);
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
      const results = service.filterData(service.currentData, { id: 'id', value: 5 });
      const resultsAreFiltered = results.every((x) => x.id.toString().includes('5'));
      expect(resultsAreFiltered).toBe(true);
    });
    it('should filter data when passed an array of values', () => {
      const results = service.filterData(service.currentData, { id: 'status', value: [1, 5] });
      const resultsAreFiltered = results.every((x) => x.status.includes(['1', '5']));
      expect(resultsAreFiltered).toBe(true);
    });
  });
});
