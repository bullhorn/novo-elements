import { vi } from 'vitest';
import { ComponentUtils } from './ComponentUtils';

describe('Utils: ComponentUtils', () => {
  let service: ComponentUtils;

  beforeAll(() => {
    service = new ComponentUtils();
  });

  it('function append() should call location.createComponent', () => {
    const location = { createComponent: vi.fn() };
    service.append(ComponentUtils, location as any);
    expect(location.createComponent).toHaveBeenCalled();
  });
});
