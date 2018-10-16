// APP
import { EditorControl } from './EditorControl';

describe('Control: EditorControl', () => {
  let control;

  beforeEach(() => {
    control = new EditorControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('editor');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
