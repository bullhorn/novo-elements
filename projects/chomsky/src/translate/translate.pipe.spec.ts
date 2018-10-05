import { TranslatePipe } from './translate.pipe';

describe('Pipe: TranslatePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new TranslatePipe();
  });

  describe('Function: equals(objectOne, objectTwo)', () => {
    it('should test for basic equality.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(1, 1)).toBeTruthy();
      expect(pipe.equals(1, 2)).toBeFalsy();
      expect(pipe.equals('One', 'One')).toBeTruthy();
      expect(pipe.equals('One', 'Two')).toBeFalsy();
    });
    it('should return false if either object is null.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(1, null)).toBeFalsy();
      expect(pipe.equals(null, 1)).toBeFalsy();
    });
    it('should return false if they are unequal and not objects.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(1, 2)).toBeFalsy();
    });
    it('should return false if the first argument is an array and the other is an object.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals([], {})).toBeFalsy();
    });
    it('should return false if both are arrays but they aren\'t the same length.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(['one'], ['one', 'two'])).toBeFalsy();
    });
    it('should return false if both are arrays and they have the same length but they aren\'t the same.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(['one', 2], ['one', 'two'])).toBeFalsy();
    });
    it('should return true if both are arrays and they have the same length and values.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(['one', 'two'], ['one', 'two'])).toBeTruthy();
    });
    it('should return false if the first argument is an object and the other is an array.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals({}, [])).toBeFalsy();
    });
    it('should return false if the first object\'s keys don\'t match the second object.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals({ key: 'val' }, { key: 'val2' })).toBeFalsy();
    });
    it('should return false if the second object\'s keys don\'t match the first object.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals({ key: 'val' }, { key: 'val', keyTwo: 'valTwo' })).toBeFalsy();
    });
    it('should return true if the objects keys and values match.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals({ key: 'val', keyTwo: 'valTwo' }, { key: 'val', keyTwo: 'valTwo' })).toBeTruthy();
    });
  });

  describe('Function: ngOnDestroy()', () => {
    it('should call unsubscribe.', () => {
      spyOn(pipe, 'unsubscribe').and.callFake(() => {});
      expect(pipe.ngOnDestroy).toBeDefined();
      pipe.ngOnDestroy();
      expect(pipe.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Function: transform(phraseKey, dynamicVariables)', () => {
    it('should return if it\'s called without arguments.', () => {
      expect(pipe.transform).toBeDefined();
      expect(pipe.transform()).toBeNull();
    });
    it('should return it\'s current value if the key and dynamic variables haven\'t changed.', () => {
      expect(pipe.transform).toBeDefined();
      pipe.lastKey = 'key';
      pipe.lastParams = { name: 'Jane' };
      pipe.value = 'Hello, Jane.';
      expect(pipe.transform(pipe.lastKey, pipe.lastParams)).toBe(pipe.value);
    });
  });

  describe('Function: unsubscribe()', () => {
    it('should unsubscribe to onLangChange and undefine it when it\'s defined.', () => {
      expect(pipe.unsubscribe).toBeDefined();
      pipe.onLangChange = {
        unsubscribe: () => {},
      };
      spyOn(pipe.onLangChange, 'unsubscribe').and.callThrough();
      pipe.unsubscribe();
      expect(pipe.onLangChange).toBeUndefined();
    });
  });
});
