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
});
