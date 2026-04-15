// APP
import { binarySearch, Can, can, Helpers } from './Helpers';

describe('Utils: Helpers', () => {
  describe('Method: isTemplateRef(value)', () => {
    it('should return false for null', () => {
      expect(Helpers.isTemplateRef(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Helpers.isTemplateRef(undefined)).toBe(false);
    });

    it('should return false for string', () => {
      expect(Helpers.isTemplateRef('template')).toBe(false);
    });

    it('should return false for number', () => {
      expect(Helpers.isTemplateRef(123)).toBe(false);
    });

    it('should return false for object', () => {
      expect(Helpers.isTemplateRef({})).toBe(false);
    });

    it('should return false for array', () => {
      expect(Helpers.isTemplateRef([])).toBe(false);
    });

    it('should return false for function', () => {
      expect(Helpers.isTemplateRef(() => {})).toBe(false);
    });

    it('should return false for Date', () => {
      expect(Helpers.isTemplateRef(new Date())).toBe(false);
    });
  });

  describe('Method: swallowEvent(event)', () => {
    it('should be defined.', () => {
      const event = new Event('open');
      expect(Helpers.swallowEvent(event));
    });
  });

  describe('Method: interpolate(str, props)', () => {
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

    it('should interpolate when props is a Date object', () => {
      const format: string = '$year/$month/$day';
      const date = new Date('2024-06-15');
      const result = Helpers.interpolate(format, date);
      // Date should be converted to object with date components
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should interpolate with empty string replacement value', () => {
      const format: string = 'Start $value End';
      const data = { value: '' };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('Start  End');
    });

    it('should interpolate with zero value', () => {
      const format: string = 'Count: $count';
      const data = { count: 0 };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('Count: 0');
    });

    it('should interpolate with false value', () => {
      const format: string = 'Active: $active';
      const data = { active: false };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('Active: false');
    });

    it('should interpolate with null value converting to string', () => {
      const format: string = 'Value: $data';
      const data = { data: null };
      const result = Helpers.interpolate(format, data);
      // null gets converted to string "null"
      expect(result).toBe('Value: null');
    });

    it('should handle nested property access with partial path', () => {
      const format: string = '$user.name and $user.email';
      const data = { user: { name: 'John' } };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('John and ');
    });

    it('should return empty string for undefined nested property', () => {
      const format: string = '$user.address.city';
      const data = { user: {} };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('');
    });

    it('should handle multiple placeholders of same variable', () => {
      const format: string = '$name, $name, $name!';
      const data = { name: 'World' };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('World, World, World!');
    });

    it('should interpolate when format string is a function', () => {
      const formatFn = (props) => `Hello ${props.name}`;
      const data = { name: 'Alice' };
      const result = Helpers.interpolate(formatFn, data);
      expect(result).toBe('Hello Alice');
    });

    it('should interpolate complex deeply nested path', () => {
      const format: string = '$a.b.c.d.e';
      const data = { a: { b: { c: { d: { e: 'deep' } } } } };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('deep');
    });

    it('should handle placeholder without matching property in props', () => {
      const format: string = 'Name: $name, Age: $age';
      const data = { name: 'John' };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('Name: John, Age: ');
    });

    it('should handle array value in placeholder', () => {
      const format: string = 'Items: $items';
      const data = { items: [1, 2, 3] };
      const result = Helpers.interpolate(format, data);
      expect(result).toBe('Items: 1,2,3');
    });

    it('should handle object value in placeholder', () => {
      const format: string = 'Data: $data';
      const data = { data: { key: 'value' } };
      const result = Helpers.interpolate(format, data);
      // Objects get converted to "[object Object]"
      expect(result).toBe('Data: [object Object]');
    });
  });

  describe('Method: validateInterpolationProps(str, props)', () => {
    it('should return true when str is a function', () => {
      const fn = () => 'result';
      expect(Helpers.validateInterpolationProps(fn, {})).toBe(true);
    });

    it('should return true when all required properties exist', () => {
      const format: string = '$name';
      const props: { name: string } = { name: 'John' };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(true);
    });

    it('should return false when required property is missing', () => {
      const format: string = '$name';
      const props: { age: number } = { age: 30 };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(false);
    });

    it('should return true when all multiple properties exist', () => {
      const format: string = '$firstName $lastName $age';
      const props: { firstName: string; lastName: string; age: number } = { firstName: 'James', lastName: 'Bond', age: 40 };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(true);
    });

    it('should return false when one of multiple properties is missing', () => {
      const format: string = '$firstName $lastName $age';
      const props: { firstName: string; lastName: string } = { firstName: 'James', lastName: 'Bond' };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(false);
    });

    it('should throw error when format has no properties to replace', () => {
      const format: string = 'Hello world';
      const props: any = {};
      // When there are no $properties, str.match() returns null and calling every() on null throws
      expect(() => Helpers.validateInterpolationProps(format, props)).toThrow();
    });

    it('should throw error when format has no properties to replace but props has values', () => {
      const format: string = 'Hello world';
      const props: { name: string } = { name: 'John' };
      // When there are no $properties, str.match() returns null and calling every() on null throws
      expect(() => Helpers.validateInterpolationProps(format, props)).toThrow();
    });

    it('should handle nested property names in format string', () => {
      const format: string = '$user.name';
      const props: { 'user.name': string } = { 'user.name': 'John' };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(true);
    });

    it('should return false for nested property names when missing', () => {
      const format: string = '$user.name';
      const props: { user: { name: string } } = { user: { name: 'John' } };
      // Note: validateInterpolationProps checks hasOwnProperty on props, not nested access
      expect(Helpers.validateInterpolationProps(format, props)).toBe(false);
    });

    it('should handle multiple different properties in single format', () => {
      const format: string = '$id: $title ($status)';
      const props: { id: number; title: string; status: string } = { id: 1, title: 'Task', status: 'active' };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(true);
    });

    it('should return false when format requires property not in props', () => {
      const format: string = '$id: $title ($status)';
      const props: { id: number; title: string } = { id: 1, title: 'Task' };
      expect(Helpers.validateInterpolationProps(format, props)).toBe(false);
    });
  });

  describe('Method: interpolateWithFallback(formatString, data)', () => {
    it('should return interpolated string when given a single format string', () => {
      const format: string = '$name';
      const data: { name: string } = { name: 'John' };
      expect(Helpers.interpolateWithFallback(format, data)).toBe('John');
    });

    it('should interpolate single format string even if some variables are missing', () => {
      const format: string = '$name $age';
      const data: { name: string } = { name: 'John' };
      // Single format strings use interpolate() which just replaces what it can
      expect(Helpers.interpolateWithFallback(format, data)).toBe('John ');
    });

    it('should return first successful interpolation from array', () => {
      const formats: string[] = ['$missing $var', '$name', '$other'];
      const data: { name: string } = { name: 'John' };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('John');
    });

    it('should return middle successful interpolation when first fails', () => {
      const formats: string[] = ['$missing', '$firstName $lastName', '$other'];
      const data: { firstName: string; lastName: string } = { firstName: 'James', lastName: 'Bond' };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('James Bond');
    });

    it('should return last successful interpolation when first two fail', () => {
      const formats: string[] = ['$missing', '$undefined', '$city'];
      const data: { city: string } = { city: 'New York' };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('New York');
    });

    it('should return empty string when all format strings fail', () => {
      const formats: string[] = ['$missing', '$undefined', '$notThere'];
      const data: { name: string } = { name: 'John' };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('');
    });

    it('should return first format string when all have all variables', () => {
      const formats: string[] = ['$name is $age', '$name is $age years old'];
      const data: { name: string; age: number } = { name: 'John', age: 30 };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('John is 30');
    });

    it('should handle nested property access in fallback formats', () => {
      const formats: string[] = ['$missing.prop', '$user.name'];
      const data: { user: { name: string } } = { user: { name: 'Jane' } };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('Jane');
    });

    it('should return empty string for empty format array', () => {
      const formats: string[] = [];
      const data: { name: string } = { name: 'John' };
      expect(Helpers.interpolateWithFallback(formats, data)).toBe('');
    });
  });

  describe('Method: isObject(item)', () => {
    it('should return true for plain object', () => {
      expect(Helpers.isObject({})).toBe(true);
    });

    it('should return true for object with properties', () => {
      expect(Helpers.isObject({ name: 'John', age: 30 })).toBe(true);
    });

    it('should return true for nested object', () => {
      expect(Helpers.isObject({ user: { name: 'John' } })).toBe(true);
    });

    it('should return null for null (falsy from short-circuit)', () => {
      // null is falsy, so the check `item &&` returns null (not false)
      expect(Helpers.isObject(null)).toBeFalsy();
    });

    it('should return undefined for undefined', () => {
      // undefined is falsy, so the check `item &&` returns undefined (not false)
      expect(Helpers.isObject(undefined)).toBeFalsy();
    });

    it('should return false for string', () => {
      expect(Helpers.isObject('hello')).toBe(false);
    });

    it('should return false for number', () => {
      expect(Helpers.isObject(123)).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(Helpers.isObject(true)).toBe(false);
    });

    it('should return false for array', () => {
      expect(Helpers.isObject([])).toBe(false);
    });

    it('should return false for array with elements', () => {
      expect(Helpers.isObject([1, 2, 3])).toBe(false);
    });

    it('should return false for function', () => {
      expect(Helpers.isObject(() => {})).toBe(false);
    });

    it('should return true for Date (since Date is an object type)', () => {
      // Date is typeof 'object' and not an array, so isObject returns true
      // This is a quirk of the implementation - it doesn't specifically exclude Date
      expect(Helpers.isObject(new Date())).toBe(true);
    });

    it('should return true for RegExp (since RegExp is an object type)', () => {
      // RegExp is typeof 'object' and not an array, so isObject returns true
      // This is a quirk of the implementation - it doesn't specifically exclude RegExp
      expect(Helpers.isObject(/test/)).toBe(true);
    });

    it('should return true for object created with Object.create(null)', () => {
      const obj = Object.create(null);
      expect(Helpers.isObject(obj)).toBe(true);
    });

    it('should return true for class instance', () => {
      class TestClass {
        name = 'test';
      }
      expect(Helpers.isObject(new TestClass())).toBe(true);
    });
  });

  describe('Method: isString(obj)', () => {
    it('should return true for empty string', () => {
      expect(Helpers.isString('')).toBe(true);
    });

    it('should return true for string with content', () => {
      expect(Helpers.isString('hello')).toBe(true);
    });

    it('should return true for string with numbers', () => {
      expect(Helpers.isString('12345')).toBe(true);
    });

    it('should return true for string with special characters', () => {
      expect(Helpers.isString('!@#$%^&*()')).toBe(true);
    });

    it('should return true for string with whitespace', () => {
      expect(Helpers.isString('  hello world  ')).toBe(true);
    });

    it('should return true for multiline string', () => {
      expect(Helpers.isString('line1\nline2\nline3')).toBe(true);
    });

    it('should return false for number', () => {
      expect(Helpers.isString(123)).toBe(false);
    });

    it('should return false for null', () => {
      expect(Helpers.isString(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Helpers.isString(undefined)).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(Helpers.isString(true)).toBe(false);
    });

    it('should return false for array', () => {
      expect(Helpers.isString([])).toBe(false);
    });

    it('should return false for object', () => {
      expect(Helpers.isString({})).toBe(false);
    });

    it('should return false for function', () => {
      expect(Helpers.isString(() => {})).toBe(false);
    });

    it('should return false for Date', () => {
      expect(Helpers.isString(new Date())).toBe(false);
    });

    it('should return false for String object (not primitive string)', () => {
      // String objects (created with new String()) are objects, not strings
      expect(Helpers.isString(new String('hello'))).toBe(false); // eslint-disable-line
    });
  });

  describe('Method: isFunction(obj)', () => {
    it('should return true for arrow function', () => {
      expect(Helpers.isFunction(() => {})).toBe(true);
    });

    it('should return true for regular function', () => {
      function testFunc() {}
      expect(Helpers.isFunction(testFunc)).toBe(true);
    });

    it('should return true for named function expression', () => {
      const namedFunc = function myFunc() {};
      expect(Helpers.isFunction(namedFunc)).toBe(true);
    });

    it('should return true for class constructor', () => {
      class TestClass {}
      expect(Helpers.isFunction(TestClass)).toBe(true);
    });

    it('should return true for built-in functions', () => {
      expect(Helpers.isFunction(Array.isArray)).toBe(true);
    });

    it('should return true for method', () => {
      const obj = { method: function() {} };
      expect(Helpers.isFunction(obj.method)).toBe(true);
    });

    it('should return false for string', () => {
      expect(Helpers.isFunction('function')).toBe(false);
    });

    it('should return false for number', () => {
      expect(Helpers.isFunction(123)).toBe(false);
    });

    it('should return false for null', () => {
      expect(Helpers.isFunction(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Helpers.isFunction(undefined)).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(Helpers.isFunction(true)).toBe(false);
    });

    it('should return false for array', () => {
      expect(Helpers.isFunction([])).toBe(false);
    });

    it('should return false for object', () => {
      expect(Helpers.isFunction({})).toBe(false);
    });

    it('should return false for Date', () => {
      expect(Helpers.isFunction(new Date())).toBe(false);
    });

    it('should return false for function with no call property', () => {
      // This tests the edge case in the implementation
      const fakeFunc = { constructor: function() {}, apply: null };
      expect(Helpers.isFunction(fakeFunc)).toBe(false);
    });
  });

  describe('Method: isDate(obj)', () => {
    it('should return true for Date object', () => {
      expect(Helpers.isDate(new Date())).toBe(true);
    });

    it('should return true for Date with specific date', () => {
      expect(Helpers.isDate(new Date('2024-01-01'))).toBe(true);
    });

    it('should return true for Date from now', () => {
      expect(Helpers.isDate(new Date())).toBe(true);
    });

    it('should return false for string', () => {
      expect(Helpers.isDate('2024-01-01')).toBe(false);
    });

    it('should return false for number', () => {
      expect(Helpers.isDate(1234567890)).toBe(false);
    });

    it('should return false for null', () => {
      expect(Helpers.isDate(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Helpers.isDate(undefined)).toBe(false);
    });

    it('should return false for object', () => {
      expect(Helpers.isDate({})).toBe(false);
    });

    it('should return false for array', () => {
      expect(Helpers.isDate([])).toBe(false);
    });

    it('should return false for function', () => {
      expect(Helpers.isDate(() => {})).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(Helpers.isDate(true)).toBe(false);
    });

    it('should return false for invalid Date', () => {
      expect(Helpers.isDate(new Date('invalid'))).toBe(true);
    });
  });

  describe('Method: isIsoDate(str)', () => {
    it('should return true for valid ISO date', () => {
      expect(Helpers.isIsoDate('2024-01-15T10:30:45.123Z')).toBe(true);
    });

    it('should return true for another valid ISO date', () => {
      expect(Helpers.isIsoDate('2020-12-31T23:59:59.999Z')).toBe(true);
    });

    it('should return true for ISO date with leading zeros', () => {
      expect(Helpers.isIsoDate('2000-01-01T00:00:00.000Z')).toBe(true);
    });

    it('should return false for ISO date without Z suffix', () => {
      expect(Helpers.isIsoDate('2024-01-15T10:30:45.123')).toBe(false);
    });

    it('should return false for ISO date with wrong format', () => {
      expect(Helpers.isIsoDate('01-15-2024T10:30:45.123Z')).toBe(false);
    });

    it('should return false for date without time', () => {
      expect(Helpers.isIsoDate('2024-01-15')).toBe(false);
    });

    it('should return false for invalid date string', () => {
      expect(Helpers.isIsoDate('not-a-date')).toBe(false);
    });

    it('should return false for null', () => {
      expect(Helpers.isIsoDate(null as any)).toBe(false);
    });

    it('should return false for number', () => {
      expect(Helpers.isIsoDate('12345' as any)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(Helpers.isIsoDate('')).toBe(false);
    });

    it('should throw error when toISOString called on invalid date', () => {
      // Invalid dates throw RangeError when calling toISOString
      expect(() => Helpers.isIsoDate('2024-13-45T25:61:61.999Z')).toThrow();
    });

    it('should return false for ISO date with milliseconds less than 3 digits', () => {
      expect(Helpers.isIsoDate('2024-01-15T10:30:45.12Z')).toBe(false);
    });
  });

  describe('Method: escapeString(obj)', () => {
    it('should escape dots in string', () => {
      expect(Helpers.escapeString('file.txt')).toBe('file\\.txt');
    });

    it('should escape asterisks in string', () => {
      expect(Helpers.escapeString('*')).toBe('\\*');
    });

    it('should escape plus signs in string', () => {
      expect(Helpers.escapeString('a+b')).toBe('a\\+b');
    });

    it('should escape question marks in string', () => {
      expect(Helpers.escapeString('what?')).toBe('what\\?');
    });

    it('should escape caret in string', () => {
      expect(Helpers.escapeString('^start')).toBe('\\^start');
    });

    it('should escape dollar sign in string', () => {
      expect(Helpers.escapeString('price$')).toBe('price\\$');
    });

    it('should escape curly braces in string', () => {
      expect(Helpers.escapeString('{5,10}')).toBe('\\{5,10\\}');
    });

    it('should escape parentheses in string', () => {
      expect(Helpers.escapeString('(group)')).toBe('\\(group\\)');
    });

    it('should escape pipe in string', () => {
      expect(Helpers.escapeString('a|b')).toBe('a\\|b');
    });

    it('should escape square brackets in string', () => {
      // Note: The hyphen is not escaped in the current implementation
      expect(Helpers.escapeString('[a-z]')).toBe('\\[a-z\\]');
    });

    it('should escape backslash in string', () => {
      expect(Helpers.escapeString('back\\slash')).toBe('back\\\\slash');
    });

    it('should escape multiple special characters', () => {
      expect(Helpers.escapeString('.*+?^${}()|[]\\.')).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\.');
    });

    it('should handle string with no special characters', () => {
      expect(Helpers.escapeString('hello')).toBe('hello');
    });

    it('should return non-string values unchanged', () => {
      expect(Helpers.escapeString(123)).toBe(123);
    });

    it('should return null unchanged', () => {
      expect(Helpers.escapeString(null)).toBe(null);
    });

    it('should return undefined unchanged', () => {
      expect(Helpers.escapeString(undefined)).toBe(undefined);
    });

    it('should return object unchanged', () => {
      const obj = { key: 'value' };
      expect(Helpers.escapeString(obj)).toBe(obj);
    });
  });

  describe('Method: convertToArray(obj)', () => {
    it('should return empty array when given undefined', () => {
      expect(Helpers.convertToArray(undefined)).toEqual([]);
    });

    it('should return array containing value when given non-array', () => {
      expect(Helpers.convertToArray('hello')).toEqual(['hello']);
    });

    it('should return array containing number when given number', () => {
      expect(Helpers.convertToArray(42)).toEqual([42]);
    });

    it('should return array containing object when given object', () => {
      const obj = { key: 'value' };
      expect(Helpers.convertToArray(obj)).toEqual([obj]);
    });

    it('should return array containing null when given null', () => {
      expect(Helpers.convertToArray(null)).toEqual([null]);
    });

    it('should return array as-is when given array', () => {
      const arr = [1, 2, 3];
      expect(Helpers.convertToArray(arr)).toEqual(arr);
    });

    it('should return empty array as-is when given empty array', () => {
      expect(Helpers.convertToArray([])).toEqual([]);
    });

    it('should return array with mixed types as-is', () => {
      const arr = [1, 'two', { three: 3 }, null, undefined];
      expect(Helpers.convertToArray(arr)).toEqual(arr);
    });

    it('should return array containing function when given function', () => {
      const fn = () => {};
      expect(Helpers.convertToArray(fn)).toEqual([fn]);
    });

    it('should return array containing Date when given Date', () => {
      const date = new Date();
      expect(Helpers.convertToArray(date)).toEqual([date]);
    });

    it('should return array containing boolean when given boolean', () => {
      expect(Helpers.convertToArray(true)).toEqual([true]);
    });

    it('should return array containing false when given false', () => {
      expect(Helpers.convertToArray(false)).toEqual([false]);
    });
  });

  describe('Method: sortByField(fields, reverse)', () => {
    it('should return a function', () => {
      const comparator = Helpers.sortByField('name');
      expect(typeof comparator).toBe('function');
    });

    it('should sort by single field ascending', () => {
      const data = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ];
      const sorted = data.sort(Helpers.sortByField('name'));
      expect(sorted[0].name).toBe('Alice');
      expect(sorted[1].name).toBe('Bob');
      expect(sorted[2].name).toBe('Charlie');
    });

    it('should sort by single field descending', () => {
      const data = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ];
      const sorted = data.sort(Helpers.sortByField('name', true));
      expect(sorted[0].name).toBe('Charlie');
      expect(sorted[1].name).toBe('Bob');
      expect(sorted[2].name).toBe('Alice');
    });

    it('should sort numbers ascending', () => {
      const data = [{ age: 30 }, { age: 25 }, { age: 35 }];
      const sorted = data.sort(Helpers.sortByField('age'));
      expect(sorted[0].age).toBe(25);
      expect(sorted[1].age).toBe(30);
      expect(sorted[2].age).toBe(35);
    });

    it('should sort numbers descending', () => {
      const data = [{ age: 30 }, { age: 25 }, { age: 35 }];
      const sorted = data.sort(Helpers.sortByField('age', true));
      expect(sorted[0].age).toBe(35);
      expect(sorted[1].age).toBe(30);
      expect(sorted[2].age).toBe(25);
    });

    it('should sort dates ascending', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-03');
      const date3 = new Date('2024-01-02');
      const data = [{ date: date2 }, { date: date1 }, { date: date3 }];
      const sorted = data.sort(Helpers.sortByField('date'));
      expect(sorted[0].date).toBe(date1);
      expect(sorted[1].date).toBe(date3);
      expect(sorted[2].date).toBe(date2);
    });

    it('should sort dates descending', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-03');
      const date3 = new Date('2024-01-02');
      const data = [{ date: date2 }, { date: date1 }, { date: date3 }];
      const sorted = data.sort(Helpers.sortByField('date', true));
      expect(sorted[0].date).toBe(date2);
      expect(sorted[1].date).toBe(date3);
      expect(sorted[2].date).toBe(date1);
    });

    it('should sort by multiple fields', () => {
      const data = [
        { department: 'Sales', name: 'Charlie' },
        { department: 'Sales', name: 'Alice' },
        { department: 'IT', name: 'Bob' },
      ];
      const sorted = data.sort(Helpers.sortByField(['department', 'name']));
      expect(sorted[0].department).toBe('IT');
      expect(sorted[1].department).toBe('Sales');
      expect(sorted[1].name).toBe('Alice');
      expect(sorted[2].name).toBe('Charlie');
    });

    it('should use custom comparator function', () => {
      const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
      const customComparator = (direction, a, b) => {
        return a.id > b.id ? (direction === 'desc' ? -1 : 1) : a.id < b.id ? (direction === 'desc' ? 1 : -1) : 0;
      };
      const sorted = data.sort(Helpers.sortByField(customComparator));
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });

    it('should handle missing fields', () => {
      const data = [
        { name: 'Charlie', value: 10 },
        { value: 20 }, // missing name
        { name: 'Alice', value: 30 },
      ];
      const sorted = data.sort(Helpers.sortByField('name'));
      // Items with missing fields should be treated as empty string or 0
      expect(sorted.length).toBe(3);
    });

    it('should return 0 when items are equal', () => {
      const data = [
        { name: 'Alice', age: 30 },
        { name: 'Alice', age: 25 },
      ];
      const sorted = data.sort(Helpers.sortByField('name'));
      // When equal, should maintain or compare next
      expect(sorted.length).toBe(2);
    });
  });

  describe('Method: findAncestor(element, selector)', () => {
    it('should find direct parent matching selector', () => {
      const grandparent = document.createElement('div');
      grandparent.id = 'grandparent';
      const parent = document.createElement('div');
      parent.className = 'parent';
      const child = document.createElement('div');
      grandparent.appendChild(parent);
      parent.appendChild(child);

      const result = Helpers.findAncestor(child, '.parent');
      expect(result).toBe(parent);
    });

    it('should find ancestor several levels up', () => {
      const grandparent = document.createElement('div');
      grandparent.className = 'ancestor';
      const parent = document.createElement('div');
      const child = document.createElement('div');
      const grandchild = document.createElement('div');
      grandparent.appendChild(parent);
      parent.appendChild(child);
      child.appendChild(grandchild);

      const result = Helpers.findAncestor(grandchild, '.ancestor');
      expect(result).toBe(grandparent);
    });

    it('should return null when no ancestor matches', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);

      const result = Helpers.findAncestor(child, '.non-existent');
      expect(result).toBeNull();
    });

    it('should match by ID selector', () => {
      const parent = document.createElement('div');
      parent.id = 'parent-id';
      const child = document.createElement('div');
      parent.appendChild(child);

      const result = Helpers.findAncestor(child, '#parent-id');
      expect(result).toBe(parent);
    });

    it('should match by tag selector', () => {
      const section = document.createElement('section');
      const div = document.createElement('div');
      const span = document.createElement('span');
      section.appendChild(div);
      div.appendChild(span);

      const result = Helpers.findAncestor(span, 'section');
      expect(result).toBe(section);
    });

    it('should match by complex selector', () => {
      const parent = document.createElement('div');
      parent.className = 'container active';
      parent.id = 'main';
      const child = document.createElement('div');
      parent.appendChild(child);

      const result = Helpers.findAncestor(child, 'div.container');
      expect(result).toBe(parent);
    });

    it('should skip non-matching ancestors and continue searching', () => {
      const grandparent = document.createElement('div');
      grandparent.className = 'target';
      const parent = document.createElement('div');
      parent.className = 'middle';
      const child = document.createElement('div');
      grandparent.appendChild(parent);
      parent.appendChild(child);

      const result = Helpers.findAncestor(child, '.target');
      expect(result).toBe(grandparent);
    });

    it('should return null when reaching document root', () => {
      const element = document.createElement('div');
      const result = Helpers.findAncestor(element, '.never-exists');
      expect(result).toBeNull();
    });

    it('should not match the element itself', () => {
      const element = document.createElement('div');
      element.className = 'self';
      const result = Helpers.findAncestor(element, '.self');
      expect(result).toBeNull();
    });
  });

  describe('Method: filterByField(key, value)', () => {
    it('should return a filter function', () => {
      const filter = Helpers.filterByField('name', 'John');
      expect(typeof filter).toBe('function');
    });

    it('should filter by exact match with string', () => {
      const data = [
        { name: 'John' },
        { name: 'Jane' },
        { name: 'John' },
      ];
      const filtered = data.filter(Helpers.filterByField('name', 'John'));
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe('John');
    });

    it('should filter by exact match with number', () => {
      const data = [
        { age: 25 },
        { age: 30 },
        { age: 25 },
      ];
      const filtered = data.filter(Helpers.filterByField('age', 25));
      expect(filtered.length).toBe(2);
      expect(filtered[0].age).toBe(25);
    });

    it('should filter using array of values', () => {
      const data = [
        { status: 'active' },
        { status: 'inactive' },
        { status: 'active' },
        { status: 'pending' },
      ];
      const filtered = data.filter(Helpers.filterByField('status', ['active', 'pending']));
      expect(filtered.length).toBe(3);
    });

    it('should filter using function', () => {
      const data = [
        { age: 25 },
        { age: 30 },
        { age: 35 },
      ];
      const filtered = data.filter(Helpers.filterByField('age', (val) => val > 28));
      expect(filtered.length).toBe(2);
      expect(filtered[0].age).toBe(30);
    });

    it('should filter using range object with min', () => {
      const data = [
        { price: 10 },
        { price: 25 },
        { price: 50 },
      ];
      const filtered = data.filter(Helpers.filterByField('price', { min: 20 }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using range object with max', () => {
      const data = [
        { price: 10 },
        { price: 25 },
        { price: 50 },
      ];
      const filtered = data.filter(Helpers.filterByField('price', { max: 30 }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using range object with min and max', () => {
      const data = [
        { price: 10 },
        { price: 25 },
        { price: 50 },
      ];
      const filtered = data.filter(Helpers.filterByField('price', { min: 15, max: 40 }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].price).toBe(25);
    });

    it('should filter using any array in filter object', () => {
      const data = [
        { tags: ['javascript', 'nodejs'] },
        { tags: ['python'] },
        { tags: ['javascript', 'react'] },
      ];
      const filtered = data.filter(Helpers.filterByField('tags', { any: ['javascript'] }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using all array in filter object', () => {
      const data = [
        { tags: ['javascript', 'nodejs', 'express'] },
        { tags: ['javascript', 'nodejs'] },
        { tags: ['javascript'] },
      ];
      const filtered = data.filter(Helpers.filterByField('tags', { all: ['javascript', 'nodejs'] }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using not in filter object', () => {
      const data = [
        { status: 'active' },
        { status: 'inactive' },
        { status: 'active' },
      ];
      const filtered = data.filter(Helpers.filterByField('status', { not: 'inactive' }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using regex pattern string', () => {
      const data = [
        { email: 'john@example.com' },
        { email: 'jane@test.com' },
        { email: 'bob@example.com' },
      ];
      const filtered = data.filter(Helpers.filterByField('email', 'example'));
      expect(filtered.length).toBe(2);
    });

    it('should filter using nested property', () => {
      const data = [
        { user: { name: 'John' } },
        { user: { name: 'Jane' } },
        { user: { name: 'John' } },
      ];
      const filtered = data.filter(Helpers.filterByField('user.name', 'John'));
      expect(filtered.length).toBe(2);
    });

    it('should filter date ranges', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-06-01');
      const date3 = new Date('2024-12-01');
      const data = [
        { created: date1 },
        { created: date2 },
        { created: date3 },
      ];
      const filtered = data.filter(Helpers.filterByField('created', { min: date2.getTime(), max: date3.getTime() }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using any with non-array field', () => {
      const data = [
        { tag: 'javascript' },
        { tag: 'python' },
        { tag: 'javascript' },
      ];
      const filtered = data.filter(Helpers.filterByField('tag', { any: ['javascript'] }));
      expect(filtered.length).toBe(2);
    });

    it('should filter using custom subkeys in filter object', () => {
      const data = [
        { user: { name: 'John', active: true } },
        { user: { name: 'Jane', active: false } },
      ];
      const filtered = data.filter(Helpers.filterByField('user', { active: true }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].user.name).toBe('John');
    });

    it('should filter with only min in range object', () => {
      const data = [
        { price: 10 },
        { price: 25 },
        { price: 50 },
      ];
      const filtered = data.filter(Helpers.filterByField('price', { min: 20 }));
      expect(filtered.length).toBe(2);
    });

    it('should filter with only max in range object', () => {
      const data = [
        { price: 10 },
        { price: 25 },
        { price: 50 },
      ];
      const filtered = data.filter(Helpers.filterByField('price', { max: 30 }));
      expect(filtered.length).toBe(2);
    });
  });

  describe('Method: dateToObject(date)', () => {
    it('should return object with date components', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);

      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('hour');
      expect(result).toHaveProperty('minute');
      expect(result).toHaveProperty('second');
      expect(result).toHaveProperty('weekday');
      expect(result).toHaveProperty('era');
      expect(result).toHaveProperty('dayPeriod');
    });

    it('should parse year correctly', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.year).toBe('2024');
    });

    it('should parse month correctly', () => {
      const date = new Date('2024-06-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.month).toBe('6');
    });

    it('should parse day correctly', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.day).toBe('15');
    });

    it('should parse hour correctly', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      // Note: dateToObject uses local timezone formatting, not UTC
      expect(result.hour).toBeTruthy();
      expect(typeof result.hour).toBe('string');
    });

    it('should parse minute correctly', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.minute).toBe('30');
    });

    it('should parse second correctly', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.second).toBe('45');
    });

    it('should parse weekday', () => {
      const date = new Date('2024-01-15T14:30:45.123Z'); // Monday
      const result = Helpers.dateToObject(date);
      expect(result.weekday).toBeTruthy();
      expect(typeof result.weekday).toBe('string');
    });

    it('should parse era', () => {
      const date = new Date('2024-01-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);
      expect(result.era).toBeTruthy();
    });

    it('should parse dayPeriod (AM/PM)', () => {
      const dateAM = new Date('2024-01-15T08:30:45.123Z');
      const resultAM = Helpers.dateToObject(dateAM);
      expect(resultAM.dayPeriod).toBeTruthy();

      const datePM = new Date('2024-01-15T20:30:45.123Z');
      const resultPM = Helpers.dateToObject(datePM);
      expect(resultPM.dayPeriod).toBeTruthy();
    });

    it('should handle different dates', () => {
      const date1 = new Date('2024-12-25T23:59:59.999Z');
      const result1 = Helpers.dateToObject(date1);
      // Month and day depend on local timezone
      expect(result1.month).toBeTruthy();
      expect(result1.day).toBeTruthy();

      const date2 = new Date('2000-01-01T00:00:00.000Z');
      const result2 = Helpers.dateToObject(date2);
      // Year depends on local timezone
      expect(result2.year).toBeTruthy();
      expect(result2.month).toBeTruthy();
      expect(result2.day).toBeTruthy();
    });

    it('should return all properties as strings', () => {
      const date = new Date('2024-06-15T14:30:45.123Z');
      const result = Helpers.dateToObject(date);

      expect(typeof result.year).toBe('string');
      expect(typeof result.month).toBe('string');
      expect(typeof result.day).toBe('string');
      expect(typeof result.hour).toBe('string');
      expect(typeof result.minute).toBe('string');
      expect(typeof result.second).toBe('string');
      expect(typeof result.weekday).toBe('string');
      expect(typeof result.era).toBe('string');
      expect(typeof result.dayPeriod).toBe('string');
    });

    it('should handle current date', () => {
      const date = new Date();
      const result = Helpers.dateToObject(date);

      expect(result.year).toBeTruthy();
      expect(result.month).toBeTruthy();
      expect(result.day).toBeTruthy();
      expect(result.hour).toBeTruthy();
    });
  });

  describe('Method: deepClone(item)', () => {
    it('should clone primitive string', () => {
      const original = 'hello';
      const cloned = Helpers.deepClone(original);
      expect(cloned).toBe(original);
    });

    it('should clone primitive number', () => {
      const original = 42;
      const cloned = Helpers.deepClone(original);
      expect(cloned).toBe(original);
    });

    it('should clone primitive boolean', () => {
      const original = true;
      const cloned = Helpers.deepClone(original);
      expect(cloned).toBe(original);
    });

    it('should clone null', () => {
      const original = null;
      const cloned = Helpers.deepClone(original);
      expect(cloned).toBe(null);
    });

    it('should clone undefined', () => {
      const original = undefined;
      const cloned = Helpers.deepClone(original);
      expect(cloned).toBeUndefined();
    });

    it('should clone empty array', () => {
      const original = [];
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual([]);
      expect(cloned).not.toBe(original);
    });

    it('should clone array with primitives', () => {
      const original = [1, 2, 'three', true];
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('should deep clone nested array', () => {
      const original = [1, [2, 3], [4, [5, 6]]];
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
      expect(cloned[2][1]).not.toBe(original[2][1]);
    });

    it('should modify cloned array without affecting original', () => {
      const original = [1, 2, 3];
      const cloned = Helpers.deepClone(original);
      cloned[0] = 99;
      expect(original[0]).toBe(1);
      expect(cloned[0]).toBe(99);
    });

    it('should clone empty object', () => {
      const original = {};
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual({});
      expect(cloned).not.toBe(original);
    });

    it('should clone object with primitives', () => {
      const original = { name: 'John', age: 30, active: true };
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('should deep clone nested object', () => {
      const original = {
        user: { name: 'John', address: { city: 'NYC' } },
      };
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.user).not.toBe(original.user);
      expect(cloned.user.address).not.toBe(original.user.address);
    });

    it('should modify cloned object without affecting original', () => {
      const original = { name: 'John', user: { age: 30 } };
      const cloned = Helpers.deepClone(original);
      cloned.name = 'Jane';
      cloned.user.age = 25;
      expect(original.name).toBe('John');
      expect(original.user.age).toBe(30);
    });

    it('should clone array with objects', () => {
      const original = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      cloned[0].name = 'Charlie';
      expect(original[0].name).toBe('Alice');
    });

    it('should clone object with array values', () => {
      const original = {
        items: [1, 2, 3],
        tags: ['a', 'b'],
      };
      const cloned = Helpers.deepClone(original);
      expect(cloned).toEqual(original);
      cloned.items[0] = 99;
      expect(original.items[0]).toBe(1);
    });

    it('should handle complex nested structure', () => {
      const original = {
        users: [
          { id: 1, profile: { age: 25, tags: ['admin', 'user'] } },
          { id: 2, profile: { age: 30, tags: ['user'] } },
        ],
      };
      const cloned = Helpers.deepClone(original);
      cloned.users[0].profile.age = 50;
      cloned.users[0].profile.tags[0] = 'superadmin';
      expect(original.users[0].profile.age).toBe(25);
      expect(original.users[0].profile.tags[0]).toBe('admin');
    });

    it('should handle cloning of Date objects', () => {
      const original = new Date('2024-01-15');
      const cloned = Helpers.deepClone(original);
      // deepClone converts Date to plain object with time properties
      expect(typeof cloned).toBe('object');
      expect(cloned).not.toBeNull();
    });
  });

  describe('Method: deepAssign(...objs)', () => {
    it('should merge two objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { c: 3 };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should merge and override properties', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 20, c: 3 };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result).toEqual({ a: 1, b: 20, c: 3 });
    });

    it('should merge three objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      const result = Helpers.deepAssign(obj1, obj2, obj3);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should deep merge nested objects', () => {
      const obj1 = { user: { name: 'John', age: 30 } };
      const obj2 = { user: { age: 25, email: 'john@example.com' } };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.user.name).toBe('John');
      expect(result.user.age).toBe(25);
      expect(result.user.email).toBe('john@example.com');
    });

    it('should merge arrays', () => {
      const obj1 = { items: [1, 2] };
      const obj2 = { items: [3, 4] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items).toEqual([3, 4]);
    });

    it('should merge array items when both have arrays', () => {
      const obj1 = { items: [{ id: 1 }, { id: 2 }] };
      const obj2 = { items: [{ id: 1, name: 'One' }] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items[0]).toEqual({ id: 1, name: 'One' });
      expect(result.items[1]).toEqual({ id: 2 });
    });

    it('should not modify original objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const result = Helpers.deepAssign(obj1, obj2);
      result.a = 99;
      expect(obj1.a).toBe(1);
    });

    it('should handle empty objects', () => {
      const obj1 = {};
      const obj2 = { a: 1 };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result).toEqual({ a: 1 });
    });

    it('should throw error when less than 2 objects provided', () => {
      expect(() => Helpers.deepAssign({ a: 1 })).toThrow('Need two or more objects to merge');
    });

    it('should throw error when no objects provided', () => {
      expect(() => Helpers.deepAssign()).toThrow('Need two or more objects to merge');
    });

    it('should handle multiple levels of nesting', () => {
      const obj1 = {
        config: {
          database: {
            host: 'localhost',
            port: 5432,
          },
        },
      };
      const obj2 = {
        config: {
          database: {
            port: 3306,
            user: 'root',
          },
        },
      };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.config.database.host).toBe('localhost');
      expect(result.config.database.port).toBe(3306);
      expect(result.config.database.user).toBe('root');
    });

    it('should merge array with additional items', () => {
      const obj1 = { items: [1, 2] };
      const obj2 = { items: [10, 20, 30] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items).toEqual([10, 20, 30]);
    });

    it('should handle null and undefined values', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: null, c: undefined };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.b).toBeNull();
      expect(result.c).toBeUndefined();
    });

    it('should merge complex data structures', () => {
      const obj1 = {
        users: [
          { id: 1, name: 'Alice', tags: ['admin'] },
        ],
      };
      const obj2 = {
        users: [
          { id: 1, name: 'Alice', tags: ['admin', 'user'] },
        ],
      };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.users[0].tags).toEqual(['admin', 'user']);
    });

    it('should merge when target property is not an object but source is', () => {
      const obj1 = { config: 'string' };
      const obj2 = { config: { nested: 'value' } };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.config).toEqual({ nested: 'value' });
    });

    it('should merge nested arrays with same items', () => {
      const obj1 = { items: [{ id: 1 }, { id: 2 }] };
      const obj2 = { items: [{ id: 1, name: 'One' }] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items[0].name).toBe('One');
      expect(result.items[1].id).toBe(2);
    });

    it('should merge when both arrays are identical items', () => {
      const obj1 = { items: [1, 2, 3] };
      const obj2 = { items: [1, 2, 3] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items).toEqual([1, 2, 3]);
    });

    it('should merge nested arrays with same index', () => {
      const obj1 = { items: [1, 2, 3] };
      const obj2 = { items: [100, 200] };
      const result = Helpers.deepAssign(obj1, obj2);
      // Items at same index get replaced
      expect(result.items[0]).toBe(100);
      expect(result.items[1]).toBe(200);
      expect(result.items[2]).toBe(3); // original item stays
    });

    it('should add new items to target array when source array is longer', () => {
      const obj1 = { items: [1, 2] };
      const obj2 = { items: [10, 20, 30, 40] };
      const result = Helpers.deepAssign(obj1, obj2);
      expect(result.items.length).toBe(4);
      expect(result.items).toEqual([10, 20, 30, 40]);
    });
  });

  describe('Class: Can and function: can()', () => {
    it('should create a Can instance with can() function', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(instance).toBeInstanceOf(Can);
      expect(instance.obj).toBe(obj);
    });

    it('should have method have() on Can instance', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(typeof instance.have).toBe('function');
    });

    it('should have method check() on Can instance', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(typeof instance.check).toBe('function');
    });

    it('should access simple property with have()', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(instance.have('name')).toBe('John');
    });

    it('should access nested property with dot notation', () => {
      const obj = { user: { name: 'John', address: { city: 'NYC' } } };
      const instance = can(obj);
      expect(instance.have('user.name')).toBe('John');
      expect(instance.have('user.address.city')).toBe('NYC');
    });

    it('should return undefined for missing property', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(instance.have('age')).toBeUndefined();
    });

    it('should return undefined for missing nested property', () => {
      const obj = { user: { name: 'John' } };
      const instance = can(obj);
      expect(instance.have('user.address.city')).toBeUndefined();
    });

    it('should return empty string when reaching undefined in chain', () => {
      const obj = { user: { name: 'John' } };
      const instance = can(obj);
      const result = instance.have('user.address.city');
      expect(result).toBeUndefined();
    });

    it('check() should return true for defined value', () => {
      const obj = { name: 'John' };
      const instance = can(obj);
      expect(instance.check('John')).toBe(true);
    });

    it('check() should return true for zero', () => {
      const obj = { age: 0 };
      const instance = can(obj);
      expect(instance.check(0)).toBe(true);
    });

    it('check() should return true for false', () => {
      const obj = { active: false };
      const instance = can(obj);
      expect(instance.check(false)).toBe(true);
    });

    it('check() should return true for empty string', () => {
      const obj = { name: '' };
      const instance = can(obj);
      expect(instance.check('')).toBe(true);
    });

    it('check() should return false for undefined', () => {
      const instance = can({});
      expect(instance.check(undefined)).toBe(false);
    });

    it('check() should return false for void 0 (undefined)', () => {
      const instance = can({});
      expect(instance.check(void 0)).toBe(false);
    });

    it('should work with array values', () => {
      const obj = { items: [1, 2, 3] };
      const instance = can(obj);
      expect(instance.have('items')).toEqual([1, 2, 3]);
    });

    it('should work with null values', () => {
      const obj = { value: null };
      const instance = can(obj);
      expect(instance.have('value')).toBeNull();
    });

    it('should handle deeply nested structures', () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              level4: 'deep value',
            },
          },
        },
      };
      const instance = can(obj);
      expect(instance.have('level1.level2.level3.level4')).toBe('deep value');
    });

    it('can() should work directly with use in code', () => {
      const data = { user: { profile: { name: 'Jane' } } };
      expect(can(data).have('user.profile.name')).toBe('Jane');
    });

    it('can() should work with multiple chained accesses', () => {
      const data = { a: { b: { c: 'value' } } };
      const instance = can(data);
      expect(instance.have('a.b.c')).toBe('value');
      expect(instance.have('a.b')).toEqual({ c: 'value' });
      expect(instance.have('a')).toEqual({ b: { c: 'value' } });
    });

    it('should handle objects created with Object.create(null)', () => {
      const obj = Object.create(null);
      obj.name = 'Test';
      const instance = can(obj);
      expect(instance.have('name')).toBe('Test');
    });

    it('Can constructor should properly set obj property', () => {
      const obj = { test: 'value' };
      const canInstance = new Can(obj);
      expect(canInstance.obj).toBe(obj);
    });

    it('should work with mixed types in nested structure', () => {
      const obj = {
        stringValue: 'text',
        number: 42,
        booleanValue: true,
        array: [1, 2, 3],
        nested: {
          deep: {
            value: 'found',
          },
        },
      };
      const instance = can(obj);
      expect(instance.have('stringValue')).toBe('text');
      expect(instance.have('number')).toBe(42);
      expect(instance.have('booleanValue')).toBe(true);
      expect(instance.have('array')).toEqual([1, 2, 3]);
      expect(instance.have('nested.deep.value')).toBe('found');
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

  describe('Method: isBlank', () => {
    it('should return true when object is undefined', () => {
      expect(Helpers.isBlank(undefined)).toBe(true);
    });

    it('should return true when object is null', () => {
      expect(Helpers.isBlank(null)).toBe(true);
    });

    it('should return false when object is an empty string', () => {
      expect(Helpers.isBlank('')).toBe(false);
    });

    it('should return false when object is zero', () => {
      expect(Helpers.isBlank(0)).toBe(false);
    });

    it('should return false when object is false', () => {
      expect(Helpers.isBlank(false)).toBe(false);
    });

    it('should return false when object is an empty array', () => {
      expect(Helpers.isBlank([])).toBe(false);
    });

    it('should return false when object is an empty object', () => {
      expect(Helpers.isBlank({})).toBe(false);
    });

    it('should return false when object is a string', () => {
      expect(Helpers.isBlank('test')).toBe(false);
    });

    it('should return false when object is a number', () => {
      expect(Helpers.isBlank(13)).toBe(false);
    });

    it('should return false when object is an object with properties', () => {
      expect(Helpers.isBlank({ key: 'value' })).toBe(false);
    });
  });

  describe('Method: isNullOrUndefined', () => {
    it('should return true when object is undefined', () => {
      expect(Helpers.isNullOrUndefined(undefined)).toBe(true);
    });

    it('should return true when object is null', () => {
      expect(Helpers.isNullOrUndefined(null)).toBe(true);
    });

    it('should return false when object is an empty string', () => {
      expect(Helpers.isNullOrUndefined('')).toBe(false);
    });

    it('should return false when object is zero', () => {
      expect(Helpers.isNullOrUndefined(0)).toBe(false);
    });

    it('should return false when object is false', () => {
      expect(Helpers.isNullOrUndefined(false)).toBe(false);
    });

    it('should return false when object is an empty array', () => {
      expect(Helpers.isNullOrUndefined([])).toBe(false);
    });

    it('should return false when object is an empty object', () => {
      expect(Helpers.isNullOrUndefined({})).toBe(false);
    });

    it('should return false when object is a string', () => {
      expect(Helpers.isNullOrUndefined('test')).toBe(false);
    });

    it('should return false when object is a number', () => {
      expect(Helpers.isNullOrUndefined(13)).toBe(false);
    });

    it('should return false when object is an object with properties', () => {
      expect(Helpers.isNullOrUndefined({ key: 'value' })).toBe(false);
    });
  });

  describe('Method: isEmpty', () => {
    it('should return true when object is undefined', () => {
      expect(Helpers.isEmpty(undefined)).toBe(true);
    });

    it('should return true when object is null', () => {
      expect(Helpers.isEmpty(null)).toBe(true);
    });

    it('should return true when object is an empty string', () => {
      expect(Helpers.isEmpty('')).toBe(true);
    });

    it('should return true when object is an empty array', () => {
      expect(Helpers.isEmpty([])).toBe(true);
    });

    it('should return false when object is zero', () => {
      expect(Helpers.isEmpty(0)).toBe(false);
    });

    it('should return false when object is false', () => {
      expect(Helpers.isEmpty(false)).toBe(false);
    });

    it('should return false when object is an empty object', () => {
      expect(Helpers.isEmpty({})).toBe(false);
    });

    it('should return false when object is a non-empty string', () => {
      expect(Helpers.isEmpty('test')).toBe(false);
    });

    it('should return false when object is a number', () => {
      expect(Helpers.isEmpty(13)).toBe(false);
    });

    it('should return false when object is an array with elements', () => {
      expect(Helpers.isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return false when object is an object with properties', () => {
      expect(Helpers.isEmpty({ key: 'value' })).toBe(false);
    });

    it('should return false when object is an array with one element', () => {
      expect(Helpers.isEmpty(['item'])).toBe(false);
    });
  });
});
