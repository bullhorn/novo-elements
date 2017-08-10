// APP
import { RadioLargeIconControl } from './RadioLargeIconControl';

describe('Control: RadioLargeIconControl', () => {
    let control;

    beforeEach(() => {
        control = new RadioLargeIconControl({});
    });

    it('should have the right control type', () => {
        expect(control.controlType).toEqual('radio-large-icon');
    });

    it('should set the options', () => {
        expect(control.options.length).toBe(0);
    });

    it('should set the options if passed', () => {
        control = new RadioLargeIconControl({ options: ['ONE'] });
        expect(control.options.length).toBe(1);
    });
});
