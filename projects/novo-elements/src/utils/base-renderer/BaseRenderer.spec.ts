import { BaseRenderer } from './BaseRenderer';

describe('Element: BaseRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new BaseRenderer();
  });

  it('should have default values', () => {
    expect(renderer.data).toEqual({});
    expect(renderer.value).toEqual('');
    expect(renderer.meta).toEqual({});
  });
});
