import * as dateFns from 'date-fns';
import { NovoDataTableFilterUtils } from './data-table-filter-utils';

describe('NovoDataTableFilterUtils', () => {
  describe('Method: constructFilter()', () => {
    it('should return undefined if no filter provided', () => {
      const result = NovoDataTableFilterUtils.constructFilter(undefined, 'text');
      expect(result).toEqual(undefined);
    });

    it('should return filter if filter is provided', () => {
      const result = NovoDataTableFilterUtils.constructFilter(1, 'text');
      expect(result).toEqual(1);
    });

    it('should return filter value if filter is an object with a value prop', () => {
      const result = NovoDataTableFilterUtils.constructFilter({ value: 1 }, 'text');
      expect(result).toEqual(1);
    });

    it('should return an array of filters if multi-select', () => {
      const result = NovoDataTableFilterUtils.constructFilter([1, 2, 3], 'multi-select', true);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return an array of filter values if an array of objects', () => {
      const result = NovoDataTableFilterUtils.constructFilter([{ value: 1 }, { value: 2 }, { value: 3 }], 'multi-select', true);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should construct a date filter from start and end date', () => {
      const dateFilter = { startDate: { date: Date.now() }, endDate: { date: dateFns.addDays(Date.now(), 5) } };
      const result = NovoDataTableFilterUtils.constructFilter(dateFilter, 'date');
      expect(result).toBeDefined();
      expect(result.min).toEqual(dateFns.startOfDay(dateFilter.startDate.date));
      expect(result.max).toEqual(dateFns.addDays(dateFns.startOfDay(dateFilter.endDate.date), 1));
    });

    it('should construct a date filter from min and max', () => {
      const dateFilter = { min: 1, max: 7 };
      const result = NovoDataTableFilterUtils.constructFilter(dateFilter, 'date');
      expect(result).toBeDefined();
      expect(result.min).toEqual(dateFns.addDays(dateFns.startOfToday(), dateFilter.min));
      expect(result.max).toEqual(dateFns.addDays(dateFns.endOfToday(), dateFilter.max));
    });

    it('should default to today if no date params are specified', () => {
      const dateFilter = {};
      const result = NovoDataTableFilterUtils.constructFilter(dateFilter, 'date');
      expect(result).toBeDefined();
      expect(result.min).toEqual(dateFns.startOfToday());
      expect(result.max).toEqual(dateFns.endOfToday());
    });
  });
});
