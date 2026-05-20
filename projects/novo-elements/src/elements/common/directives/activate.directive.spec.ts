import { ActivateDirective } from './activate.directive';

describe('Directive: ActivateDirective', () => {
    let directive: ActivateDirective;

    beforeEach(() => {
        directive = new ActivateDirective();
    });

    describe('click event', () => {
        it('should emit novoActivate on click', () => {
            spyOn(directive.novoActivate, 'emit');
            directive.onClick();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith();
        });
    });

    describe('keyboard events', () => {
        it('should emit novoActivate and prevent default on space key', () => {
            const event = new KeyboardEvent('keydown', { code: 'Space' });
            spyOn(event, 'preventDefault');
            spyOn(directive.novoActivate, 'emit');

            directive.onKeyActivate(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith();
        });

        it('should emit novoActivate and prevent default on enter key', () => {
            const event = new KeyboardEvent('keydown', { code: 'Enter' });
            spyOn(event, 'preventDefault');
            spyOn(directive.novoActivate, 'emit');

            directive.onKeyActivate(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(directive.novoActivate.emit).toHaveBeenCalledWith();
        });
    });
});
