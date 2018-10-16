// APP
import { Helpers } from './Helpers';

describe('Utils: Helpers', () => {
  xdescribe('Method: swallowEvent(event)', () => {
    it('should be defined.', () => {
      let event = new Event('open');
      expect(Helpers.swallowEvent(event));
    });
  });

  xdescribe('Method: interpolate(str, props)', () => {
    it('should interpolate using the right properties', () => {
      let format: string = '$name';
      let data: { name: string } = {
        name: 'Stuff',
      };
      let expected: string = 'Stuff';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });

    it('should interpolate correctly when format requires 2 properties', () => {
      let format: string = '$firstName $lastName';
      let data: { firstName: string; lastName: string } = {
        firstName: 'James',
        lastName: 'Bond',
      };
      let expected: string = 'James Bond';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });

    it('should interpolate correctly when format has non-replacable characters', () => {
      let format: string = '$id: $title';
      let data: { id: number; title: string } = {
        id: 213,
        title: 'Bond',
      };
      let expected: string = '213: Bond';
      expect(Helpers.interpolate(format, data)).toEqual(expected);
    });

    it('should interpolate correctly when properties are undefined', () => {
      let format: string = '$id: $title';
      let data: { id: number } = {
        id: 123,
      };
      let expected: string = '123: ';
      expect(Helpers.interpolate(format, data)).toBe(expected);
    });
  });

  describe('Method: getNextElementSibling(element)', () => {
    it('should return nextElementSibling if present.', () => {
      let parent = document.createElement('div');
      let origin = document.createElement('h1');
      let sibling = document.createElement('h2');
      parent.appendChild(origin);
      parent.appendChild(sibling);
      expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
    });
    it('should skip over non-element sibling nodes.', () => {
      let parent = document.createElement('div');
      let origin = document.createElement('h1');
      let textNode = document.createTextNode('Some Text');
      let sibling = document.createElement('h2');
      parent.appendChild(origin);
      parent.appendChild(textNode);
      parent.appendChild(sibling);
      expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
    });
    it('should return null if sibling is not present.', () => {
      let parent = document.createElement('div');
      let origin = document.createElement('h1');
      parent.appendChild(origin);
      expect(Helpers.getNextElementSibling(origin)).toEqual(null);
    });
  });
});
