// App
import { Security } from './Security';

describe('Services: Security', () => {
  let service: Security = new Security();

  describe('Method: grant()', () => {
    it('should be defined.', () => {
      expect(service.grant).toBeDefined();
      service.grant({ test: [] });
      service.grant([]);
    });
    it('should handle array of values', () => {
      let permissions = ['A', 'B', 'C'];
      service.clear();
      service.grant(permissions);
      expect(service.credentials).toEqual(permissions);
    });
    it('should handle an object with arrays of values', () => {
      let permissions = {
        one: ['A', 'B', 'C'],
        two: ['D'],
      };
      service.clear();
      service.grant(permissions);
      expect(service.credentials).toEqual(['one.A', 'one.B', 'one.C', 'two.D']);
    });
  });
  describe('Method: has()', () => {
    it('should be defined.', () => {
      expect(service.has).toBeDefined();
      service.has({});
    });
    it('should check if value exists', () => {
      service.credentials = ['value'];
      expect(service.has('value')).toEqual(true);
    });
  });
  describe('Method: revoke()', () => {
    it('should be defined.', () => {
      expect(service.revoke).toBeDefined();
      service.revoke({});
    });
    it('should revoke value if it exists', () => {
      service.credentials = ['value'];
      service.revoke('value');
      expect(service.has('value')).toEqual(false);
    });
  });
  describe('Method: clear()', () => {
    it('should clear all values', () => {
      service.credentials = ['a', 'b'];
      service.clear();
      expect(service.credentials.length).toEqual(0);
    });
  });
  describe('Method: subscribe()', () => {
    it('should be defined.', () => {
      expect(service.subscribe).toBeDefined();
      service.subscribe({});
    });
  });
  describe('Method: checkRoutes()', () => {
    it('should be defined.', () => {
      expect(service.checkRoutes).toBeDefined();
      service.checkRoutes([], { entityType: '' });
    });
  });
});
