// APP
import { ComponentUtils } from './ComponentUtils';

describe('Utils: ComponentUtils', () => {
  let service;

  beforeEach(() => {
    service = new ComponentUtils(null);
  });

  it('should be defined.', () => {
    expect(service).toBeDefined();
  });
});
