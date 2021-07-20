// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from '../../services/options/OptionsService';
import { FormUtils } from './../../utils/form-utils/FormUtils';
// App
import { NovoControlGroup } from './ControlGroup';
import { NovoFormModule } from './Form.module';

xdescribe('Elements: NovoControlGroup', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoFormModule, OverlayModule],
      providers: [FormUtils, FormBuilder, ChangeDetectorRef, NovoLabelService, OptionsService],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoControlGroup);
    component = fixture.debugElement.componentInstance;
    // Mock @Input
    component.form = {
      value: 'TEST',
      valid: false,
      getRawValue: () => {
        return 'TEST';
      },
    };
    component.add = true;
    component.edit = true;
    component.remove = true;
    component.canRemove = () => true;
    component.canEdit = () => true;
    component.onAdd = () => {};
    component.controls = [
      {
        key: 'test1',
        controlType: 'textbox',
        type: 'number',
        subtype: 'percentage',
      },
    ];
    component.initialValue = [
      {
        test1: '34',
      },
    ];
    component.key = 'test';
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngAfterContentInit();
    expect(component.key).toBe('test');
  });

  describe('Function: public resetAddRemove(): void', () => {
    beforeEach(() => {
      jest.spyOn(component, 'checkCanEdit').mockReturnValue(true);
      jest.spyOn(component, 'checkCanRemove').mockReturnValue(true);
    });
    it('should not error if disabledArray is empty', () => {
      component.resetAddRemove();
      expect(component.disabledArray.length).toEqual(0);
    });
    it('should execute when disabledArray is not empty', () => {
      component.disabledArray = [
        {
          edit: false,
          remove: false,
        },
      ];
      component.resetAddRemove();
      expect(component.disabledArray[0].edit).toEqual(true);
      expect(component.disabledArray[0].remove).toEqual(true);
    });
  });
  describe('Function: public removeControl(index: number, emitEvent: boolean = true): void', () => {
    beforeEach(() => {
      jest.spyOn(component, 'resetAddRemove');
      jest.spyOn(component.ref, 'markForCheck');
      jest.spyOn(component.onRemove, 'emit');
      component.currentIndex = 3;
      component.disabledArray = [
        { edit: true, remove: false },
        { edit: false, remove: false },
        { edit: true, remove: true },
      ];
      component.form = {
        controls: {
          one: {
            controls: [{ key: 'name' }, { key: 'name2' }, { key: 'name3' }],
            at: () => {
              return { value: 1 };
            },
            removeAt: () => {},
          },
        },
      };
      component.key = 'one';
      jest.spyOn(component.form.controls.one, 'removeAt').mockImplementation(() => {
        component.form.controls.one.controls = [{ key: 'name' }, { key: 'name2' }];
      });
    });
    it('should remove control row', () => {
      component.removeControl(1);
      expect(component.form.controls.one.controls.length).toEqual(2);
    });
    it('should update disabledArray', () => {
      component.removeControl(1);
      expect(component.disabledArray).toEqual([
        { edit: true, remove: true },
        { edit: true, remove: true },
      ]);
    });
    it('should update currentIndex', () => {
      component.removeControl(1);
      expect(component.currentIndex).toEqual(2);
    });
  });
});
