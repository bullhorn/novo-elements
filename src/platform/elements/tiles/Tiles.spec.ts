// NG2
import { async, TestBed } from '@angular/core/testing';
// APP
import { NovoTilesElement } from './Tiles';

describe('Elements: NovoTilesElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTilesElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTilesElement);
    component = fixture.debugElement.componentInstance;
    component.options = [
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Green',
        value: 'green',
      },
      {
        label: 'Blue',
        value: 'blue',
      },
      {
        label: 'Disabled',
        value: 'disabled',
        disabled: true,
      },
    ];
    component.ngAfterContentInit();
  }));

  describe('Method: select(event, item)', () => {
    it('should set label 2 with checked equal to true', () => {
      let event: any = {
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      expect(component.options[1].checked).toBeFalsy();
      component.select(event, component.options[1]);
      expect(component.options[1].checked).toBeTruthy();
    });

    it('should only allow one tile to be checked true', () => {
      component.select(false, component.options[0]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      component.select(false, component.options[1]);
      expect(component.options[0].checked).toBeFalsy();
      expect(component.options[1].checked).toBeTruthy();
      expect(component.options[2].checked).toBeFalsy();
      component.select(false, component.options[2]);
      expect(component.options[0].checked).toBeFalsy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeTruthy();
    });

    it('should emit event but not allow disabled tiles to be checked', () => {
      spyOn(component.onDisabledOptionClick, 'emit');
      component.select(false, component.options[0]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      expect(component.options[3].checked).toBeFalsy();
      component.select(false, component.options[3]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      expect(component.options[3].checked).toBeFalsy();
      expect(component.onDisabledOptionClick.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit event when checked tiles are clicked', () => {
      spyOn(component.onSelectedOptionClick, 'emit');
      component.select(false, component.options[0]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      expect(component.options[3].checked).toBeFalsy();
      component.select(false, component.options[0]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      expect(component.options[3].checked).toBeFalsy();
      component.select(false, component.options[0]);
      expect(component.options[0].checked).toBeTruthy();
      expect(component.options[1].checked).toBeFalsy();
      expect(component.options[2].checked).toBeFalsy();
      expect(component.options[3].checked).toBeFalsy();
      expect(component.onSelectedOptionClick.emit).toHaveBeenCalledTimes(2);
    });
  });

  describe('Method: writeValue()', () => {
    it('should change the value', () => {
      component.writeValue(10);
      expect(component.model).toBe(10);
    });
  });

  describe('Method: registerOnChange()', () => {
    it('should be defined.', () => {
      expect(component.registerOnChange).toBeDefined();
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeDefined();
    });
  });
});
