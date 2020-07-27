// NG2
import { Avatar } from './Avatar';

xdescribe('Avatar', () => {
  let comp: any;

  beforeEach(() => {
    addProviders([Avatar]);
  });

  beforeEach(inject([Avatar], (_comp) => {
    comp = _comp;
  }));

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(comp.sanitizer, 'bypassSecurityTrustUrl').and.callFake(() => {});
    });
    it('should set the source to a profile image if that property is available.', () => {
      expect(comp.ngOnInit).toBeDefined();
      comp.source = {
        profileImage: 'PROFILE_URL',
      };
      comp.ngOnInit();
      expect(comp.sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(comp.source.profileImage);
    });
    it('should set the source to a logo image if that property is available.', () => {
      expect(comp.ngOnInit).toBeDefined();
      comp.source = {
        logo: 'LOGO_URL',
      };
      comp.ngOnInit();
      expect(comp.sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(comp.source.logo);
    });
    it('should generate an image tag with the initials of the user.', () => {
      expect(comp.ngOnInit).toBeDefined();
      comp.source = {
        firstName: 'f',
        lastName: 'l',
      };
      comp.ngOnInit();
      expect(comp.sanitizer.bypassSecurityTrustUrl).toHaveBeenCalled();
      expect(comp.sanitizer.bypassSecurityTrustUrl.calls.mostRecent().args[0]).toContain('data:image/svg+xml;base64');
    });
  });

  describe('setPrefixedValue(elm, prop, value)', () => {
    it('should set browser prefixes on DOM elements for CSS properties.', () => {
      expect(comp.setPrefixedValue).toBeDefined();
      const elem: any = document.createElement('div');
      expect(comp.setPrefixedValue(elem, 'color', 'red')).toBeUndefined();
      expect(elem.style.color).toBe('red');
    });
  });
});
