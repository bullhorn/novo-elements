// APP
import { CodeEditorControl } from './CodeEditorControl';

describe('Control: CodeEditorControl', () => {
  let control;

  beforeEach(() => {
    control = new CodeEditorControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('code-editor');
  });
});
