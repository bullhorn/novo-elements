import { AceEditorControl } from './ace-editor-control';

describe('Control: AceEditorControl', () => {
  let control;

  beforeEach(() => {
    control = new AceEditorControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('ace-editor');
  });
});
