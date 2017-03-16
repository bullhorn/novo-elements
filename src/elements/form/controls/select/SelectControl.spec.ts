// APP
import { SelectControl } from './SelectControl';

describe('Control: SelectControl', () => {
    let control;

    beforeEach(() => {
        control = new SelectControl({});
    });

    it('should have the right control type', () => {
        expect(control.controlType).toEqual('select');
    });

    it('should set the options', () => {
        expect(control.options.length).toBe(0);
    });

    it('should set the placeholder', () => {
        expect(control.placeholder).toEqual('');
    });

    it('should set the options if passed', () => {
        control = new SelectControl({ options: ['ONE'] });
        expect(control.options.length).toBe(1);
    });

    it('should set the placeholder if passed', () => {
        control = new SelectControl({ placeholder: 'TEST' });
        expect(control.placeholder).toEqual('TEST');
    });
});
