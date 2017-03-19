import { DrawerService } from './DrawerService';

describe('Elements: DrawerService', () => {
    let component = new DrawerService;

    it('should be defined.', () => {
        expect(component).toBeDefined();
    });

    describe('Method: open()', () => {
        it('should be defined.', () => {
            expect(component.open).toBeDefined();
            component.open(false);
        });
    });

    describe('Method: close()', () => {
        it('should be defined.', () => {
            expect(component.close).toBeDefined();
            component.close(false);
        });
    });

    describe('Method: closeDrawer()', () => {
        it('should be defined.', () => {
            expect(component.closeDrawer).toBeDefined();
            component.closeDrawer(false);
        });
    });
});
