// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
// APP
import { PopOverContent } from './PopOverContent';

describe('Elements: PopOverContent', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PopOverContent],
    }).compileComponents();
    fixture = TestBed.createComponent(PopOverContent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngAfterViewInit()', () => {
    it('should be defined.', () => {
      expect(component.ngAfterViewInit).toBeDefined();
      component.ngAfterViewInit();
    });
  });

  describe('Method: ngAfterViewInit()', () => {
    it('should be defined.', () => {
      expect(component.ngAfterViewInit).toBeDefined();
      component.ngAfterViewInit();
    });
  });

  describe('Method: toggle()', () => {
    it('should be defined.', () => {
      expect(component.toggle).toBeDefined();
    });
  });

  describe('Method: show()', () => {
    it('should be defined.', () => {
      expect(component.show).toBeDefined();
      component.show();
    });
  });

  describe('Method: hide()', () => {
    it('should be defined.', () => {
      expect(component.hide).toBeDefined();
    });
  });

  describe('Method: hideFromPopover()', () => {
    it('should be defined.', () => {
      expect(component.hideFromPopover).toBeDefined();
      component.hideFromPopover();
    });
  });

  describe('Method: positionElements()', () => {
    it('should be defined.', () => {
      expect(component.positionElements).toBeDefined();
    });
  });

  describe('Method: position()', () => {
    it('should be defined.', () => {
      expect(component.position).toBeDefined();
    });
  });

  describe('Method: offset()', () => {
    it('should be defined.', () => {
      expect(component.offset).toBeDefined();
    });
  });

  describe('Method: getStyle()', () => {
    it('should be defined.', () => {
      expect(component.getStyle).toBeDefined();
    });
  });

  describe('Method: isStaticPositioned()', () => {
    it('should be defined.', () => {
      expect(component.isStaticPositioned).toBeDefined();
    });
  });

  describe('Method: parentOffsetEl()', () => {
    it('should be defined.', () => {
      expect(component.parentOffsetEl).toBeDefined();
    });
  });
});
