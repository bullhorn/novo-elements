// NG2
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// APP
import { NovoButtonComponent } from './button.component';
import { NovoButtonModule } from './button.module';

describe('Component: NovoButtonComponent', () => {
  let fixture: ComponentFixture<NovoButtonComponent>;
  let component: NovoButtonComponent;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NovoButtonModule],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoButtonComponent);
      component = fixture.debugElement.componentInstance;
    }),
  );

  describe('Method: ngOnChanges()', () => {
    it('should setup the iconClass if icon is passed', () => {
      component.icon = 'test';
      component.ngOnChanges();
      expect(component.iconClass).toBe('bhi-test');
    });
    it('should NOT set the iconClass if icon is NOT present', () => {
      component.ngOnChanges();
      expect(component.iconClass).toBe('');
    });
    it('should set flex based on theme', () => {
      component.theme = 'primary';
      component.ngOnChanges();
      expect(component.flex).toBe('flex-wrapper');
      component.theme = undefined;
      component.ngOnChanges();
      expect(component.flex).toBe('');
    });
    it('should force icon to right if theme is primary', () => {
      component.theme = 'primary';
      component.side = 'left';
      component.ngOnChanges();
      expect(component.leftSide).toBeFalsy();
      expect(component.rightSide).toBeTruthy();
    });
    it('should set icon to left as long as theme is NOT primary', () => {
      component.theme = 'secondary';
      component.side = 'left';
      component.ngOnChanges();
      expect(component.leftSide).toBeTruthy();
      expect(component.rightSide).toBeFalsy();
    });
    it('should default to check icon if theme is primary and no icon is provided', () => {
      component.theme = 'primary';
      component.ngOnChanges();
      expect(component.icon).toEqual('check');
    });
    it('should remove the icon if theme is standard and an icon is provided', () => {
      component.theme = 'standard';
      component.icon = 'test';
      component.ngOnChanges();
      expect(component.icon).toEqual(undefined);
    });
    describe('Button Class List', () => {
      it('should set with theme', () => {
        component.theme = 'secondary';
        component.ngOnChanges();
        expect(component.buttonClasses).toEqual('secondary');
      });
      it('should set with icon', () => {
        component.theme = 'secondary';
        component.icon = 'yep';
        component.ngOnChanges();
        expect(component.buttonClasses).toEqual('secondary has-icon');
      });
      it('should set with loading', () => {
        component.theme = 'secondary';
        component.loading = true;
        component.ngOnChanges();
        expect(component.buttonClasses).toEqual('secondary loading');
      });
      it('should set with color', () => {
        component.theme = 'secondary';
        component.color = 'red';
        component.ngOnChanges();
        expect(component.buttonClasses).toEqual('secondary red');
      });
    });
  });
});
