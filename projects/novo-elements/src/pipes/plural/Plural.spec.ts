// APP
import { PluralPipe } from './Plural';

describe('Pipe: Plural', () => {
  let pipe;

  beforeEach(() => {
    pipe = new PluralPipe();
  });

  describe('When rendering strings', () => {
    it('should transform Contact', () => {
      const val = pipe.transform('Contact');
      expect(val).toBe('Contacts');
    });
    it('should transform Company', () => {
      const val = pipe.transform('Company');
      expect(val).toBe('Companies');
    });
    it('should transform Opportunity', () => {
      const val = pipe.transform('Opportunity');
      expect(val).toBe('Opportunities');
    });
    it('should transform Child', () => {
      const val = pipe.transform('Child');
      expect(val).toBe('Children');
    });
  });
});
