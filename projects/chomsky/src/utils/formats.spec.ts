import { Formats} from './formats';

describe('Formats', () => {

  let formats;

  beforeEach(() => {
    formats = new Formats();
  });

  describe('Function: formatTime()', () => {
    it('should return time in a string format', () => {
      const date = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };

      const timeResult = formats.formatTime(date, options);
      const resultType = typeof timeResult;
      expect(resultType).toEqual('string');
    });
    it('should return time formatted to the locale', () => {
      const date = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };

      formats.setLocale('en-US');
      const timeResult: string = formats.formatTime(date, options);
      const result = timeResult.includes('AM') || timeResult.includes('PM');
      expect(result).toBe(true);
    });
  });
});
