// APP
import { QuickNoteControl } from './QuickNoteControl';

describe('Control: QuickNoteControl', () => {
  let control;

  beforeEach(() => {
    control = new QuickNoteControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('quick-note');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new QuickNoteControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
