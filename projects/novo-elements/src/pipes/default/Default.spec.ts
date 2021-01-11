// APP
import { DefaultPipe } from './Default';

describe('Pipe: Default', () => {
  let pipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  describe('When rendering', () => {
    it('should use default when null', () => {
      const val = pipe.transform(null, 'default');
      expect(val).toBe('default');
    });
    it('should use default when undefined', () => {
      const val = pipe.transform(undefined, 'default');
      expect(val).toBe('default');
    });
    it('should not use default when has value', () => {
      const val = pipe.transform('value', 'default');
      expect(val).toBe('value');
    });
  });
});
