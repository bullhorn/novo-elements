import { SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateDirective } from './translate.directive';

class MockDomSanitizer extends DomSanitizer {
  sanitize(context: SecurityContext, value: any): string {
    return value;
  }

  bypassSecurityTrustHtml(value: string): string {
    return value;
  }

  bypassSecurityTrustStyle(value: string): string {
    return value;
  }

  bypassSecurityTrustScript(value: string): string {
    return value;
  }

  bypassSecurityTrustUrl(value: string): string {
    return value;
  }

  bypassSecurityTrustResourceUrl(value: string): string {
    return value;
  }
}

describe('Directive: Translate', () => {
  let directive;

  beforeEach(() => {
    directive = new TranslateDirective(new MockDomSanitizer());
  });

  it('should initialize', () => {
    expect(directive).toBeDefined();
  });

  xdescribe('Function: ngOnInit()', () => {
    it('should be defined.', () => {
      expect(directive.ngOnInit).toBeDefined();
      directive.translateService = {
        translate: () => {},
        onLocaleChange: {
          subscribe: () => {},
        },
      };
      spyOn(directive.translateService.onLocaleChange, 'subscribe').and.callThrough();
      directive.ngOnInit();
      expect(directive.translateService.onLocaleChange.subscribe).toHaveBeenCalled();
    });
  });

  xdescribe('Function: ngOnDestroy()', () => {
    it('should unsubscribe from localeChange events.', () => {
      expect(directive.ngOnDestroy).toBeDefined();
      directive.translateService = {
        translate: () => {},
        onLocaleChange: {
          unsubscribe: () => {},
        },
      };
      spyOn(directive.translateService.onLocaleChange, 'unsubscribe').and.callThrough();
      directive.ngOnDestroy();
      expect(directive.translateService.onLocaleChange.unsubscribe).toHaveBeenCalled();
    });
  });

  xdescribe('Function: renderContent(key, interpolation)', () => {
    it('should set the inner HTML of an element to a translated string.', () => {
      expect(directive.renderContent).toBeDefined();
      directive.translateService = {
        translate: () => {
          return 'Hello world';
        },
      };
      directive.renderContent();
      expect(directive.translatedValue).toBe('Hello world');
    });
  });
});
