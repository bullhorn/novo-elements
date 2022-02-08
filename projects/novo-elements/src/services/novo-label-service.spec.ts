// APP
import { NovoLabelService } from './novo-label-service';

describe('Service: NovoLabelService', () => {
  let service;

  beforeEach(() => {
    service = new NovoLabelService();
    expect(service.filters).toBeDefined();
    expect(service.clear).toBeDefined();
    expect(service.emptyTableMessage).toBeDefined();
    expect(service.noMatchingRecordsMessage).toBeDefined();
    expect(service.erroredTableMessage).toBeDefined();
    expect(service.pickerError).toBeDefined();
    expect(service.pickerTextFieldEmpty).toBeDefined();
    expect(service.pickerEmpty).toBeDefined();
    expect(service.quickNoteError).toBeDefined();
    expect(service.quickNoteEmpty).toBeDefined();
    expect(service.required).toBeDefined();
    expect(service.numberTooLarge).toBeDefined();
    expect(service.save).toBeDefined();
    expect(service.cancel).toBeDefined();
    expect(service.next).toBeDefined();
    expect(service.itemsPerPage).toBeDefined();
    expect(service.select).toBeDefined();
    expect(service.selected).toBeDefined();
    expect(service.selectAllOnPage).toBeDefined();
    expect(service.deselectAll).toBeDefined();
    expect(service.refresh).toBeDefined();
    expect(service.close).toBeDefined();
    expect(service.move).toBeDefined();
    expect(service.startDate).toBeDefined();
    expect(service.endDate).toBeDefined();
    expect(service.more).toBeDefined();
    expect(service.clearAll).toBeDefined();
    expect(service.today).toBeDefined();
    expect(service.now).toBeDefined();
    expect(service.isRequired).toBeDefined();
    expect(service.notValidYear).toBeDefined();
    expect(service.isTooLarge).toBeDefined();
    expect(service.invalidAddress).toBeDefined();
    expect(service.invalidEmail).toBeDefined();
    expect(service.minLength).toBeDefined();
    expect(service.past1Day).toBeDefined();
    expect(service.past7Days).toBeDefined();
    expect(service.past30Days).toBeDefined();
    expect(service.past90Days).toBeDefined();
    expect(service.past1Year).toBeDefined();
    expect(service.next1Day).toBeDefined();
    expect(service.next7Days).toBeDefined();
    expect(service.next30Days).toBeDefined();
    expect(service.next90Days).toBeDefined();
    expect(service.next1Year).toBeDefined();
    expect(service.customDateRange).toBeDefined();
    expect(service.backToPresetFilters).toBeDefined();
    expect(service.okGotIt).toBeDefined();
    expect(service.address).toBeDefined();
    expect(service.apt).toBeDefined();
    expect(service.city).toBeDefined();
    expect(service.state).toBeDefined();
    expect(service.zipCode).toBeDefined();
    expect(service.country).toBeDefined();
    expect(service.or).toBeDefined();
    expect(service.clickToBrowse).toBeDefined();
    expect(service.chooseAFile).toBeDefined();
    expect(service.no).toBeDefined();
    expect(service.yes).toBeDefined();
    expect(service.search).toBeDefined();
    expect(service.noItems).toBeDefined();
    expect(service.localDatePlaceholder).toBeDefined();
  });

  it('should initialize with all its label values.', () => {
    expect(service).toBeDefined();
  });

  describe('Method: selectedRecords()', () => {
    it('should be defined.', () => {
      expect(service.selectedRecords).toBeDefined();
    });
  });

  describe('Method: totalRecords()', () => {
    it('should be defined.', () => {
      expect(service.totalRecords).toBeDefined();
    });
  });

  describe('Method: formatDateWithFormat()', () => {
    it('should be defined.', () => {
      expect(service.formatDateWithFormat).toBeDefined();
    });
  });

  describe('Method: getWeekdays()', () => {
    it('should be defined.', () => {
      expect(service.getWeekdays).toBeDefined();
    });
  });

  describe('Method: getMonths()', () => {
    it('should be defined.', () => {
      expect(service.getMonths).toBeDefined();
    });
  });

  describe('Method: getProperty()', () => {
    it('should be defined.', () => {
      expect(service.getProperty).toBeDefined();
    });
  });

  describe('Method: formatBigDecimal', () => {
    it('should handle null value', () => {
      const value = service.formatBigDecimal(null);
      expect(value).toEqual('0.00');
    });

    it('should handle undefined value', () => {
      const value = service.formatBigDecimal(undefined);
      expect(value).toEqual('0.00');
    });

    it('should format positive value as decimal, whole number', () => {
      const value = service.formatBigDecimal(2);
      expect(value).toEqual('2.00');
    });

    it('should format positive value as decimal, one decimal place', () => {
      const value = service.formatBigDecimal(2.1);
      expect(value).toEqual('2.10');
    });

    it('should format positive value as decimal, two decimal places', () => {
      const value = service.formatBigDecimal(2.14);
      expect(value).toEqual('2.14');
    });

    it('should format positive value as decimal, two decimal places do not round', () => {
      const value = service.formatBigDecimal(2.147);
      expect(value).toEqual('2.14');
    });

    it('should format negative value as decimal in parens without negative sign', () => {
      const value = service.formatBigDecimal(-2);
      expect(value).toEqual('(2.00)');
    });

    it('should allow override of negative values to non-accounting format', () => {
      const value = service.formatBigDecimal(-2, { useAccountingFormat: false });
      expect(value).toEqual('-2.00');
    });

    it('should format positive value as decimal, one decimal', () => {
      const value = service.formatBigDecimal(2.3);
      expect(value).toEqual('2.30');
    });

    it('should format positive value as decimal, four decimal should truncate', () => {
      const value = service.formatBigDecimal(2.3444);
      expect(value).toEqual('2.34');
    });

    it('should format positive value as decimal, large number whole number', () => {
      const value = service.formatBigDecimal(23444);
      expect(value).toEqual('23,444.00');
    });

    it('should allow removal of comma separator', () => {
      const value = service.formatBigDecimal(23444, { useGrouping: false });
      expect(value).toEqual('23444.00');
    });

    it('should format positive value as decimal, large number with four decimal should truncate', () => {
      const value = service.formatBigDecimal(23444.1273);
      expect(value).toEqual('23,444.12');
    });

    it('should allow overloaded precision', () => {
      const value = service.formatBigDecimal(123.123456789, { maximumFractionDigits: 6 });
      expect(value).toEqual('123.123456');
    });

    it('should allow overloaded precision while enforcing minimum default', () => {
      const value = service.formatBigDecimal(123, { maximumFractionDigits: 6 });
      expect(value).toEqual('123.00');
    });

    it('should format large negative numbers with commas', () => {
      const value = service.formatBigDecimal(-1234.5678);
      expect(value).toEqual('(1,234.56)');
    });

    it('should allow for multiple override values', () => {
      const value = service.formatBigDecimal(-1234.123456789, { useGrouping: false, maximumFractionDigits: 6, useAccountingFormat: false });
      expect(value).toEqual('-1234.123456');
    });

    it('should allow for negative', () => {
      const value = service.formatBigDecimal(2.14);
      expect(value).toEqual('2.14');
    });
  });

  describe('Method: localizedDatePlaceholder()', () => {
    it('returns the localDatePlaceholder', () => {
      service.localDatePlaceholder = 'dd.MM.YYYY';
      expect(service.localizedDatePlaceholder()).toEqual('dd.MM.YYYY');
    });
  });
});
