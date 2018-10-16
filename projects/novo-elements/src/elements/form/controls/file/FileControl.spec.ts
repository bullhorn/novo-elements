// APP
import { FileControl } from './FileControl';

describe('Control: FileControl', () => {
  let control;

  beforeEach(() => {
    control = new FileControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('file');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
