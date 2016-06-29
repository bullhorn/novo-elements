import { Radio } from './Radio';

describe('Element: Radio', () => {
    let comp;

    beforeEachProviders(() => [
        Radio
    ]);

    beforeEach(inject([Radio], _comp => {
        comp = _comp;
    }));

    it('should initialize correctly', () => {
        expect(comp).toBeDefined();
    });

    describe('Method: select(event, radio)', () => {
        it('should modify the radio checked state', () => {
            spyOn(comp.change, 'emit');

            let radio = { checked: true };
            comp.value = 'test';
            comp.select(null, radio);
            expect(radio.checked).toBe(false);
            expect(comp.change.emit).toHaveBeenCalledWith('test');
        });
    });
});
