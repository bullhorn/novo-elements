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
    });
    describe('Method: has()', () => {
        it('should be defined.', () => {
            expect(service.has).toBeDefined();
            service.has({});
        });
    });
    describe('Method: revoke()', () => {
        it('should be defined.', () => {
            expect(service.revoke).toBeDefined();
            service.revoke({});
        });
    });
    describe('Method: clear()', () => {
        it('should be defined.', () => {
            expect(service.clear).toBeDefined();
            service.clear();
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
