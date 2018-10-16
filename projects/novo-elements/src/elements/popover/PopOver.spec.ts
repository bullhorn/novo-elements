// NG2
import { TestBed, async } from '@angular/core/testing';
import { Component, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
// App
import { PopOverDirective } from './PopOver';

@Component({
  selector: 'test-component',
  template: `
        <div popover=""></div>
    `,
})
class TestComponent {}

describe('Elements: PopOverDirective', () => {
  describe('Directive: ', () => {
    let fixture;
    let directive;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PopOverDirective, TestComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent);
      directive = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
      expect(directive).toBeTruthy();
    });

    describe('Class: ', () => {
      let mockComponentFactoryResolver: ComponentFactoryResolver = {
        resolveComponentFactory<T>(c: { new (...args: any[]): T }): ComponentFactory<T> {
          // This was a monster to mock...
          if (c) {
            return null;
          }
          return null;
        },
      };

      let component = new PopOverDirective(directive, mockComponentFactoryResolver);
      describe('Method: ngOnChanges()', () => {
        it('should be defined.', () => {
          expect(component.ngOnChanges).toBeDefined();
          // component.ngOnChanges();
        });
      });

      describe('Method: toggle()', () => {
        it('should be defined.', () => {
          expect(component.toggle).toBeDefined();
          // component.toggle();
        });
      });

      describe('Method: show()', () => {
        it('should be defined.', () => {
          expect(component.show).toBeDefined();
          // component.show();
        });
      });

      describe('Method: hide()', () => {
        it('should be defined.', () => {
          expect(component.hide).toBeDefined();
          component.hide();
        });
      });

      describe('Method: getElement()', () => {
        it('should be defined.', () => {
          expect(component.getElement).toBeDefined();
        });
      });
    });
  });
});
