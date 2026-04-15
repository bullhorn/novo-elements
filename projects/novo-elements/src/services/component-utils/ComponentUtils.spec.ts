// APP
import { waitForAsync } from '@angular/core/testing';
import { ComponentUtils } from './ComponentUtils';

describe('Utils: ComponentUtils', () => {
  let service: ComponentUtils;

  beforeAll(waitForAsync(() => {
    const resolve = { resolveComponentFactory: ({}) => {} };
    service = new ComponentUtils();
  }));

  it('function append() should call location.createComponent', () => {
    const location = { createComponent: jest.fn() };
    service.append(ComponentUtils, location as any);
    expect(location.createComponent).toHaveBeenCalled();
  });
});
