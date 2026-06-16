import { ActivateDirective } from './activate.directive';
import { vi } from 'vitest';

describe('Directive: ActivateDirective', () => {
    let directive: ActivateDirective;

    beforeEach(() => {
        directive = new ActivateDirective();
    });

    describe('click event', () => {
        it('should emit novoActivate on click', () => {
            vi.spyOn(directive.novoActivate, 'emit');
            directive.onClick();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith();
        });
    });

    describe('keyboard events', () => {
        it('should emit novoActivate and prevent default on space key', () => {
            const event = new KeyboardEvent('keydown', { code: 'Space' });
            vi.spyOn(event, 'preventDefault');
            vi.spyOn(directive.novoActivate, 'emit');

            directive.onKeyActivate(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith(event);
        });

        it('should emit novoActivate and prevent default on enter key', () => {
            const event = new KeyboardEvent('keydown', { code: 'Enter' });
            vi.spyOn(event, 'preventDefault');
            vi.spyOn(directive.novoActivate, 'emit');

            directive.onKeyActivate(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith(event);
        });
    });
});
