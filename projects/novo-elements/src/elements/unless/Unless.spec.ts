// NG2
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
// Vendor
// APP
import { Unless } from './Unless';
import { Security } from './../../services/security/Security';

@Component({
  selector: 'test-cmp',
  template: `
        <div bhUnless="false"></div>
    `,
})
class TestCmp {}

describe('Element: Unless', () => {
  let fixture: any;
  let component: any;
  let service: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCmp, Unless],
      providers: [
        { provide: TemplateRef, useClass: TemplateRef },
        { provide: ViewContainerRef, useClass: ViewContainerRef },
        { provide: Security, useClass: Security },
        {
          provide: Unless,
          useFactory: (templateRef, viewContainerRef, security) => {
            return new Unless(templateRef, viewContainerRef, security);
          },
          deps: [TemplateRef, ViewContainerRef, Security],
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestCmp);
    component = fixture.debugElement.componentInstance;
  }));

  beforeEach(inject([Unless], (_service) => {
    service = _service;
  }));

  it('should initialize with all its defaults.', () => {
    expect(component).toBeDefined();
  });
  describe('Function: check()', () => {
    beforeEach(() => {
      service.viewContainer = {
        createEmbeddedView: () => {},
        clear: () => {},
      };
      spyOn(service.security, 'has').and.callFake((arg) => {
        if (arg === 'A') {
          return true;
        }
        return false;
      });
      spyOn(service.viewContainer, 'createEmbeddedView');
    });
    it('should set isDisplayed to true if one of 2 permissions exist', () => {
      service.permissions = 'A||B';
      service.isDisplayed = false;
      service.check();
      expect(service.isDisplayed).toEqual(true);
    });
    it('should set isDisplayed to false if neither of 2 permissions exist', () => {
      service.permissions = 'A&&B';
      service.isDisplayed = false;
      service.check();
      expect(service.isDisplayed).toEqual(false);
    });
    it('should set isDisplayed to true if both permissions exist', () => {
      service.permissions = 'A&&B';
      service.isDisplayed = false;
      service.security.has.and.returnValue(true);
      service.check();
      expect(service.isDisplayed).toEqual(true);
    });
  });
});
