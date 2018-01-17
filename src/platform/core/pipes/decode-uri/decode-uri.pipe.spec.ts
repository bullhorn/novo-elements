import { DecodeURIPipe } from './decode-uri.pipe';

describe('Pipe: DecodeURIPipe', () => {
  let pipe: DecodeURIPipe;

  beforeEach(() => {
    pipe = new DecodeURIPipe();
  });

  describe('When rendering strings', () => {
    it('should transform a URL encoded value into a decoded value.', () => {
      let encodedString: string = encodeURIComponent(
        'Hello! This, is. a# string',
      );
      const val: string = pipe.transform(encodedString);
      expect(val).toBe('Hello! This, is. a# string');
    });
  });
});
