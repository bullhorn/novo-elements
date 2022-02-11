// APP
import {
  DataTableBigDecimalRendererPipe,
  DateTableDateRendererPipe,
  DateTableDateTimeRendererPipe,
  DateTableTimeRendererPipe,
} from './data-table.pipes';

class MockNovoLabelService {
  formatDateShort(val) {}
  formatDate(val) {}
  formatTime(val) {}
  formatBigDecimal(value, overrideOptions) {}
}

describe('Pipe: DateTableDateTimeRendererPipe', () => {
  let labels;
  let dateTimePipe;
  let datePipe;
  let timePipe;
  let dataTableBigDecimalRendererPipe;

  beforeEach(() => {
    labels = new MockNovoLabelService();
    dateTimePipe = new DateTableDateTimeRendererPipe(labels);
    datePipe = new DateTableDateRendererPipe(labels);
    timePipe = new DateTableTimeRendererPipe(labels);
    dataTableBigDecimalRendererPipe = new DataTableBigDecimalRendererPipe(labels);
  });

  describe('When rendering strings', () => {
    it('DateTimePipe should make a call to the novo-label service if the value is not null', () => {
      // Arrange
      spyOn(dateTimePipe.labels, 'formatDateShort');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      dateTimePipe.transform(testVal, testColumn);
      // Assert
      expect(dateTimePipe.labels.formatDateShort).toHaveBeenCalled();
    });

    it('DateTimePipe should Not make a call to the novo-label service if a format is provided', () => {
      // Arrange
      spyOn(dateTimePipe.labels, 'formatDateShort');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
        format: 'anything',
      };
      // Act
      dateTimePipe.transform(testVal, testColumn);
      // Assert
      expect(dateTimePipe.labels.formatDateShort).not.toHaveBeenCalled();
    });

    it('DateTimePipe should return an empty string if the value is null', () => {
      // Arrange
      spyOn(dateTimePipe.labels, 'formatDateShort');
      const testVal = null;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      const testString = dateTimePipe.transform(testVal, testColumn);
      // Assert
      expect(testString).toEqual('');
    });

    it('DatePipe should make a call to the novo-label service if the value is not null', () => {
      // Arrange
      spyOn(datePipe.labels, 'formatDate');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      datePipe.transform(testVal, testColumn);
      // Assert
      expect(datePipe.labels.formatDate).toHaveBeenCalled();
    });

    it('DatePipe should Not make a call to the novo-label service if a format is provided', () => {
      // Arrange
      spyOn(datePipe.labels, 'formatDate');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
        format: 'anything',
      };
      // Act
      datePipe.transform(testVal, testColumn);
      // Assert
      expect(datePipe.labels.formatDate).not.toHaveBeenCalled();
    });

    it('DatePipe should return an empty string if the value is null', () => {
      // Arrange
      spyOn(datePipe.labels, 'formatDate');
      const testVal = null;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      const testString = datePipe.transform(testVal, testColumn);
      // Assert
      expect(testString).toEqual('');
    });

    it('TimePipe should make a call to the novo-label service if the value is not null', () => {
      // Arrange
      spyOn(timePipe.labels, 'formatTime');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      timePipe.transform(testVal, testColumn);
      // Assert
      expect(timePipe.labels.formatTime).toHaveBeenCalled();
    });

    it('TimePipe should Not make a call to the novo-label service if a format is provided', () => {
      // Arrange
      spyOn(timePipe.labels, 'formatTime');
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
        format: 'anything',
      };
      // Act
      timePipe.transform(testVal, testColumn);
      // Assert
      expect(timePipe.labels.formatTime).not.toHaveBeenCalled();
    });

    it('DataTableBigDecimalRendererPipe should pass on the column configuration to formatBigDecimal', () => {
      // Arrange
      spyOn(dataTableBigDecimalRendererPipe.labels, 'formatBigDecimal');
      const testVal = '12.52';
      const testColumn = {
        label: 'Total',
        id: 'total-id',
        type: 'bigdecimal',
        configuration: { useAccountingFormat: false, useGrouping: false, maximumFractionDigits: 6 },
      };
      // Act
      dataTableBigDecimalRendererPipe.transform(testVal, testColumn);
      // Assert
      expect(dataTableBigDecimalRendererPipe.labels.formatBigDecimal).toHaveBeenCalledWith(parseFloat(testVal), testColumn.configuration);
    });

    it('TimePipe should return an empty string if the value is null', () => {
      // Arrange
      spyOn(timePipe.labels, 'formatTime');
      const testVal = null;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      const testString = timePipe.transform(testVal, testColumn);
      // Assert
      expect(testString).toEqual('');
    });
  });
});
