// NG2
import { ChangeDetectorRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormBuilder, FormArray } from '@angular/forms';
// App
// App
import { NovoControlGroup } from './ControlGroup';
import { NovoFormModule } from './Form.module';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from '../../services/options/OptionsService';

describe('Elements: NovoControlGroup', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoFormModule],
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
      spyOn(component, 'checkCanEdit').and.returnValue(true);
      spyOn(component, 'checkCanRemove').and.returnValue(true);
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
      spyOn(component, 'resetAddRemove');
      spyOn(component.ref, 'markForCheck');
      spyOn(component.onRemove, 'emit');
      component.currentIndex = 3;
      component.disabledArray = [{ edit: true, remove: false }, { edit: false, remove: false }, { edit: true, remove: true }];
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
      spyOn(component.form.controls.one, 'removeAt').and.callFake(() => {
        component.form.controls.one.controls = [{ key: 'name' }, { key: 'name2' }];
      });
    });
    it('should remove control row', () => {
      component.removeControl(1);
      expect(component.form.controls.one.controls.length).toEqual(2);
    });
    it('should update disabledArray', () => {
      component.removeControl(1);
      expect(component.disabledArray).toEqual([{ edit: true, remove: false }, { edit: true, remove: true }]);
    });
    it('should update currentIndex', () => {
      component.removeControl(1);
      expect(component.currentIndex).toEqual(2);
    });
  });
});
