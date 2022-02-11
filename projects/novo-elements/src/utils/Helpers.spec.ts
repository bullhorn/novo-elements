// APP
import { binarySearch, Helpers } from './Helpers';

describe('Utils: Helpers', () => {
  xdescribe('Method: swallowEvent(event)', () => {
    it('should be defined.', () => {
      const event = new Event('open');
      expect(Helpers.swallowEvent(event));
    });
  });

  xdescribe('Method: interpolate(str, props)', () => {
    it('should interpolate using the right properties', () => {
      const format: string = '$name';
      const data: { name: string } = {
        name: 'Stuff',
      };
      const expected: string = 'Stuff';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });

    it('should interpolate correctly when format requires 2 properties', () => {
      const format: string = '$firstName $lastName';
      const data: { firstName: string; lastName: string } = {
        firstName: 'James',
        lastName: 'Bond',
      };
      const expected: string = 'James Bond';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });

    it('should interpolate correctly when format has non-replacable characters', () => {
      const format: string = '$id: $title';
      const data: { id: number; title: string } = {
        id: 213,
        title: 'Bond',
      };
      const expected: string = '213: Bond';
      expect(Helpers.interpolate(format, data)).toEqual(expected);
    });

    it('should interpolate correctly when properties are undefined', () => {
      const format: string = '$id: $title';
      const data: { id: number } = {
        id: 123,
      };
      const expected: string = '123: ';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });
  });

  describe('Method: getNextElementSibling(element)', () => {
    it('should return nextElementSibling if present.', () => {
      const parent = document.createElement('div');
      const origin = document.createElement('h1');
      const sibling = document.createElement('h2');
      parent.appendChild(origin);
      parent.appendChild(sibling);
      expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
    });
    it('should skip over non-element sibling nodes.', () => {
      const parent = document.createElement('div');
      const origin = document.createElement('h1');
      const textNode = document.createTextNode('Some Text');
      const sibling = document.createElement('h2');
      parent.appendChild(origin);
      parent.appendChild(textNode);
      parent.appendChild(sibling);
      expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
    });
    it('should return null if sibling is not present.', () => {
      const parent = document.createElement('div');
      const origin = document.createElement('h1');
      parent.appendChild(origin);
      expect(Helpers.getNextElementSibling(origin)).toEqual(null);
    });
  });
  describe('Method: binarySearch', () => {
    const compareFunction = (a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else if (a.id === b.id) {
        return 0;
      }
    };
    it('should return the matching element for an array of size 1', () => {
      const element = { id: 5 };
      const item = binarySearch({ id: 5 }, [element], compareFunction);
      expect(item).toBe(element);
    });
    it('should return the matching element for an array of size 2', () => {
      const element = { id: 5 };

      let item = binarySearch({ id: 5 }, [element, { id: 6 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 4 }, element], compareFunction);
      expect(item).toBe(element);
    });
    it('should return the matching element for an array of size 3', () => {
      const element = { id: 5 };

      let item = binarySearch({ id: 5 }, [element, { id: 6 }, { id: 7 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 4 }, element, { id: 6 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 3 }, { id: 4 }, element], compareFunction);
      expect(item).toBe(element);
    });
    it('should return the matching element for an array of size 4', () => {
      const element = { id: 5 };

      let item = binarySearch({ id: 5 }, [element, { id: 6 }, { id: 7 }, { id: 8 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 4 }, element, { id: 6 }, { id: 7 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 3 }, { id: 4 }, element, { id: 6 }], compareFunction);
      expect(item).toBe(element);

      item = binarySearch({ id: 5 }, [{ id: 2 }, { id: 3 }, { id: 4 }, element], compareFunction);
      expect(item).toBe(element);
    });
    it('should return undefined if item not found', () => {
      let item = binarySearch({ id: 5 }, [{ id: 6 }], compareFunction);
      expect(item).toBe(undefined);

      item = binarySearch({ id: 5 }, [{ id: 4 }, { id: 6 }], compareFunction);
      expect(item).toBe(undefined);
    });
    it('should throw an error if items are not comparable', () => {
      expect(() => binarySearch({ id: 5 }, [5], compareFunction)).toThrow();
    });
  });

  describe('Method: isNumber(val)', () => {
    it('should return true', () => {
      const numbers: any[] = [0, 1, 10.75, '25', '8.75', '5.', '.5', '0.10', '0'];
      numbers.forEach((num) => {
        expect(Helpers.isNumber(num)).toEqual(true);
      });
    });
    it('should return false', () => {
      const notNumbers: any[] = [NaN, undefined, null, '', [], {}, 'test', '.', '1f'];
      notNumbers.forEach((notNumber) => {
        expect(Helpers.isNumber(notNumber)).toBeFalsy();
      });
    });
    it('should return true for negative numbers', () => {
      const numbers: any[] = ['-10', '-2145'];
      numbers.forEach((num) => {
        expect(Helpers.isNumber(num, true)).toBeTruthy();
      });
    });
  });
});
