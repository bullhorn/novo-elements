import { BaseRenderer } from './BaseRenderer';

fdescribe('Element: BaseRenderer', () => {
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
