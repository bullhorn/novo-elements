import { TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Security } from './../../services/security/Security';
import { TestCmp } from './TestCmp';
import { Unless } from './Unless';

xdescribe('Element: Unless', () => {
  let fixture: ComponentFixture<TestCmp>;
  let component: Unless;
  let service: Unless;

  beforeEach(() => {
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
  });

  beforeEach(inject([Unless], (_service) => {
    service = _service;
  }));

  it('should initialize with all its defaults.', () => {
    expect(component).toBeDefined();
  });

  /*
  describe('Function: check()', () => {
    beforeEach(() => {
      service.viewContainer = {
        createEmbeddedView: () => { },
        clear: () => { },
      } as any;
      jest.spyOn(service.security, 'has').mockImplementation((arg) => {
        if (arg === 'A') {
          return true;
        }
        return false;
      });
      jest.spyOn(service.viewContainer, 'createEmbeddedView');
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
      (service.security as any).has.and.returnValue(true);
      service.check();
      expect(service.isDisplayed).toEqual(true);
    });
  });
  */
});
