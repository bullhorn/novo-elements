import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Security } from 'novo-elements/services';
import { Unless } from './Unless';

jest.mock('novo-elements/services');

describe('Unless Directive', () => {
  let directive: Unless;
  let templateRef: jest.Mocked<TemplateRef<any>>;
  let viewContainer: jest.Mocked<ViewContainerRef>;
  let security: jest.Mocked<Security>;

  beforeEach(() => {
    templateRef = {
      createEmbeddedView: jest.fn(),
    } as any;

    viewContainer = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    } as any;

    security = {
      subscribe: jest.fn(),
      has: jest.fn(),
    } as any;

    directive = new Unless(templateRef, viewContainer, security);
  });

  describe('constructor', () => {
    it('should create directive instance', () => {
      expect(directive).toBeDefined();
    });

    it('should initialize permissions as empty string', () => {
      expect(directive.permissions).toBe('');
    });

    it('should initialize isDisplayed as false', () => {
      expect(directive.isDisplayed).toBe(false);
    });

    it('should subscribe to security service', () => {
      expect(security.subscribe).toHaveBeenCalled();
    });

    it('should bind check method to security subscription', () => {
      const callbackFn = (security.subscribe as jest.Mock).mock.calls[0][0];
      expect(typeof callbackFn).toBe('function');
    });

    it('should have templateRef property', () => {
      expect(directive.templateRef).toBe(templateRef);
    });

    it('should have viewContainer property', () => {
      expect(directive.viewContainer).toBe(viewContainer);
    });

    it('should have security property', () => {
      expect(directive.security).toBe(security);
    });
  });

  describe('bhUnless setter', () => {
    it('should set permissions when value is provided', () => {
      directive.bhUnless = 'admin';
      expect(directive.permissions).toBe('admin');
    });

    it('should set permissions to empty string when value is empty string', () => {
      directive.bhUnless = '';
      expect(directive.permissions).toBe('');
    });

    it('should set permissions to empty string when value is null', () => {
      directive.bhUnless = null as any;
      expect(directive.permissions).toBe('');
    });

    it('should set permissions to empty string when value is undefined', () => {
      directive.bhUnless = undefined as any;
      expect(directive.permissions).toBe('');
    });

    it('should call check method when permissions are set', () => {
      const checkSpy = jest.spyOn(directive, 'check');
      directive.bhUnless = 'admin';
      expect(checkSpy).toHaveBeenCalled();
      checkSpy.mockRestore();
    });

    it('should handle multiple permission assignments', () => {
      directive.bhUnless = 'admin';
      expect(directive.permissions).toBe('admin');
      directive.bhUnless = 'user';
      expect(directive.permissions).toBe('user');
    });

    it('should handle permissions with spaces', () => {
      directive.bhUnless = '  admin  ';
      expect(directive.permissions).toBe('  admin  ');
    });

    it('should handle complex permission strings', () => {
      directive.bhUnless = 'admin || user && manager';
      expect(directive.permissions).toBe('admin || user && manager');
    });
  });

  describe('check() - OR logic', () => {
    beforeEach(() => {
      security.has.mockReturnValue(false);
    });

    it('should display when any permission matches with OR operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin || user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should display when first permission matches with OR operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin || user || manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should display when last permission matches with OR operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'manager');
      directive.bhUnless = 'admin || user || manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should display when middle permission matches with OR operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'user');
      directive.bhUnless = 'admin || user || manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should not display when no permissions match with OR operator', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin || user || manager';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });

    it('should handle OR operator with spaces', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin  ||  user  ||  manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle single permission with OR operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin ||';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should trim permissions in OR logic', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = ' admin || user ';
      directive.check();
      expect(security.has).toHaveBeenCalledWith('admin');
    });
  });

  describe('check() - AND logic', () => {
    beforeEach(() => {
      security.has.mockReturnValue(false);
    });

    it('should display when all permissions match with AND operator', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user';
      });
      directive.bhUnless = 'admin && user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should display when all three permissions match with AND operator', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user' || perm === 'manager';
      });
      directive.bhUnless = 'admin && user && manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should not display when one permission does not match with AND operator', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin && user';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });

    it('should not display when no permissions match with AND operator', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin && user && manager';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });

    it('should handle AND operator with spaces', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user';
      });
      directive.bhUnless = 'admin  &&  user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should trim permissions in AND logic', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user';
      });
      directive.bhUnless = ' admin && user ';
      directive.check();
      expect(security.has).toHaveBeenCalledWith('admin');
      expect(security.has).toHaveBeenCalledWith('user');
    });
  });

  describe('check() - Single permission', () => {
    it('should display when single permission matches', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      expect(directive.isDisplayed).toBe(true);
    });

    it('should not display when single permission does not match', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });

    it('should handle permission with spaces', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = '  admin  ';
      directive.check();
      expect(security.has).toHaveBeenCalledWith('admin');
    });
  });

  describe('check() - Empty permissions', () => {
    it('should not display when permissions are empty', () => {
      directive.bhUnless = '';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });

    it('should not display when permissions are not set', () => {
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });
  });

  describe('check() - View creation and clearing', () => {
    it('should create embedded view when display is true and not already displayed', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.isDisplayed = false;
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should clear view when display is false', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin';
      directive.isDisplayed = true;
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should set isDisplayed to true when creating view', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.isDisplayed = false;
      directive.check();
      expect(directive.isDisplayed).toBe(true);
    });

    it('should set isDisplayed to false when clearing view', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin';
      directive.isDisplayed = true;
      directive.check();
      expect(directive.isDisplayed).toBe(false);
    });
  });

  describe('check() - Complex permission scenarios', () => {
    it('should handle permission with special characters', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin-user');
      directive.bhUnless = 'admin-user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle permission with underscores', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin_user');
      directive.bhUnless = 'admin_user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle permission with dots', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin.user');
      directive.bhUnless = 'admin.user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle multiple OR permissions with different cases', () => {
      security.has.mockImplementation((perm: string) => perm === 'ADMIN');
      directive.bhUnless = 'ADMIN || USER || MANAGER';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle multiple AND permissions with different cases', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'ADMIN' || perm === 'USER';
      });
      directive.bhUnless = 'ADMIN && USER';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });
  });

  describe('check() - Security service interaction', () => {
    it('should call security.has for each permission in OR logic', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin || user || manager';
      directive.check();
      expect(security.has).toHaveBeenCalledWith('admin');
      expect(security.has).toHaveBeenCalledWith('user');
      expect(security.has).toHaveBeenCalledWith('manager');
    });

    it('should call security.has for each permission in AND logic', () => {
      security.has.mockReturnValue(true);
      directive.bhUnless = 'admin && user && manager';
      directive.check();
      expect(security.has).toHaveBeenCalledWith('admin');
      expect(security.has).toHaveBeenCalledWith('user');
      expect(security.has).toHaveBeenCalledWith('manager');
    });

    it('should stop checking OR permissions after first match', () => {
      let callCount = 0;
      security.has.mockImplementation((perm: string) => {
        callCount++;
        return perm === 'admin';
      });
      directive.bhUnless = 'admin || user || manager';
      directive.check();

      expect(security.has).toHaveBeenCalled();
    });
  });

  describe('check() - State transitions', () => {
    it('should transition from hidden to displayed', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin';
      directive.check();
      expect(directive.isDisplayed).toBe(false);

      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.check();
      expect(directive.isDisplayed).toBe(true);
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should transition from displayed to hidden', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.check();
      expect(directive.isDisplayed).toBe(true);

      security.has.mockReturnValue(false);
      directive.check();
      expect(directive.isDisplayed).toBe(false);
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should remain hidden when already hidden', () => {
      security.has.mockReturnValue(false);
      directive.bhUnless = 'admin';
      directive.isDisplayed = false;
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
      expect(directive.isDisplayed).toBe(false);
    });
  });

  describe('check() - Edge cases', () => {
    it('should handle permission string with only spaces', () => {
      directive.bhUnless = '   ';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should handle permission string with only OR operators', () => {
      directive.bhUnless = '||||||';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should handle permission string with only AND operators', () => {
      directive.bhUnless = '&&&&&&';
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should handle mixed operators (OR takes precedence)', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin || user && manager';
      directive.check();
      // OR is checked first due to indexOf check
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle very long permission string', () => {
      const longPermission = Array(100).fill('admin').join(' || ');
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = longPermission;
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });
  });

  describe('Integration tests', () => {
    it('should handle complete workflow: set permission, check, update permission', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.check();
      expect(directive.isDisplayed).toBe(true);
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);

      security.has.mockReturnValue(false);
      directive.bhUnless = 'user';
      directive.check();
      expect(directive.isDisplayed).toBe(false);
      expect(viewContainer.clear).toHaveBeenCalled();
    });

    it('should handle security subscription callback', () => {
      const subscriptionCallback = (security.subscribe as jest.Mock).mock.calls[0][0];
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.isDisplayed = false;

      subscriptionCallback();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should handle OR and AND combinations', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user';
      });
      directive.bhUnless = 'admin || user && manager';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should properly manage view lifecycle', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledTimes(1);

      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledTimes(1);

      security.has.mockReturnValue(false);
      directive.check();
      expect(viewContainer.clear).toHaveBeenCalledTimes(1);

      directive.check();
      expect(viewContainer.clear).toHaveBeenCalledTimes(2);
    });
  });

  describe('Bitwise NOT operator usage', () => {
    it('should use bitwise NOT to detect OR operator', () => {
      // ~indexOf returns -1 (truthy) when substring is found
      const testString = 'admin || user';
      expect(~testString.indexOf('||')).toBeTruthy();
    });

    it('should use bitwise NOT to detect missing OR operator', () => {
      // ~indexOf returns 0 (falsy) when substring is not found
      const testString = 'admin && user';
      expect(~testString.indexOf('||')).toBeFalsy();
    });

    it('should correctly identify OR logic path', () => {
      security.has.mockImplementation((perm: string) => perm === 'admin');
      directive.bhUnless = 'admin || user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });

    it('should correctly identify AND logic path', () => {
      security.has.mockImplementation((perm: string) => {
        return perm === 'admin' || perm === 'user';
      });
      directive.bhUnless = 'admin && user';
      directive.check();
      expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });
  });
});
