// APP
import {DateTableDateTimeRendererPipe} from './data-table.pipes';

class MockNovoLabelService {
  formatDateShort(val) {}
}

describe('Pipe: DateTableDateTimeRendererPipe', () => {
  let labels;
  let pipe;

  beforeEach(() => {
    labels = new MockNovoLabelService();
    pipe = new DateTableDateTimeRendererPipe(labels);
  });

  describe('When rendering strings', () => {
    it('should make a call to the novo-label service if the value is not null', () => {
      // Arrange
      spyOn(pipe.labels, 'formatDateShort')
      const testVal = 1234567890;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      pipe.transform(testVal, testColumn);
      // Assert
      expect(pipe.labels.formatDateShort).toHaveBeenCalled();
    });
    it('should return an empty string if the value is null', () => {
      // Arrange
      spyOn(pipe.labels, 'formatDateShort')
      const testVal = null;
      const testColumn = {
        label: 'Test',
        id: 'test',
        type: 'datetime',
      };
      // Act
      const testString = pipe.transform(testVal, testColumn);
      // Assert
      expect(testString).toEqual('');
    });
  });
});
