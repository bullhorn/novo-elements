// NG2
import { TestBed } from '@angular/core/testing';
import { setupTestSuite } from 'novo-elements/utils';
// APP
import { NovoAvatarElement } from './Avatar';

describe('Elements: NovoAvatarElement', () => {
  let fixture;
  let component;

  setupTestSuite();

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAvatarElement],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoAvatarElement);
    component = fixture.componentInstance;
  });

  it('should be compiled', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      jest.spyOn(component.sanitizer, 'bypassSecurityTrustUrl').mockImplementation(() => {});
    });

    it('should set the source to a logo image if that property is available.', () => {
      expect(component.ngOnInit).toBeDefined();
      component.source = {
        logo: 'LOGO_URL',
      };
      component.ngOnInit();
      expect(component.sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(component.source.logo);
    });
    it('should generate an image tag with the initials of the user.', () => {
      expect(component.ngOnInit).toBeDefined();
      component.source = {
        firstName: 'f',
        lastName: 'l',
      };
      component.ngOnInit();
      expect(component.sanitizer.bypassSecurityTrustUrl).toHaveBeenCalled();
      // expect(component.sanitizer.bypassSecurityTrustUrl.calls.mostRecent().args[0]).toContain('data:image/svg+xml;base64');
    });
  });
});
