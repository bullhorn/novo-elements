// NG2
import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
// App
import { NovoControlGroup } from './ControlGroup';
import { NovoFormModule } from './Form.module';
import { FormUtils } from '../../utils/form-utils/FormUtils';
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

    component.add = { label: 'Add new group' };
    component.edit = true;
    component.remove = true;
    component.form = component.formUtils.toFormGroup([{ key: 'myPercent' }, { key: 'myString' }]);
    component.controls = [{
      key: 'myPercent',
      controlType: 'textbox',
      type: 'number',
      subtype: 'percentage',
    }, {
      key: 'myString',
      controlType: 'textbox',
      type: 'string',
    }];
    component.key = 'myControls';
    component.canEdit = () => true;
    component.canRemove = () => true;
  }));

  describe('Initialization', () => {
    it('should create empty form without initial values', () => {
      component.initialValue = null;
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      expect(component.form.value.myControls).not.toBeDefined();
      expect(component.currentIndex).toEqual(0);
    });
    it('should add single control with initial values object', () => {
      component.initialValue = { myPercent: .1, myString: '10%' };
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      expect(component.form.value.myControls).toEqual([component.initialValue]);
      expect(component.form.controls.myControls.controls.length).toEqual(1);
      expect(component.currentIndex).toEqual(1);
      expect(component.form.controls.myControls.controls[0].controls.myString.value).toEqual('10%');
      expect(component.form.controls.myControls.controls[0].associations.index).toEqual(0);
    });
    it('should add multiple controls with initial values array', () => {
      component.initialValue = [{ myPercent: .1, myString: '10%' }, { myPercent: .2, myString: '20%' }, { myPercent: .3, myString: '30%' }];
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      expect(component.form.value.myControls).toEqual(component.initialValue);
      expect(component.form.controls.myControls.controls.length).toEqual(3);
      expect(component.currentIndex).toEqual(3);
      expect(component.form.controls.myControls.controls[0].controls.myString.value).toEqual('10%');
      expect(component.form.controls.myControls.controls[1].controls.myString.value).toEqual('20%');
      expect(component.form.controls.myControls.controls[2].controls.myString.value).toEqual('30%');
      expect(component.form.controls.myControls.controls[0].associations.index).toEqual(0);
      expect(component.form.controls.myControls.controls[1].associations.index).toEqual(1);
      expect(component.form.controls.myControls.controls[2].associations.index).toEqual(2);
    });
  });

  describe('Adding controls', () => {
    it('should add controls without initial values', () => {
      component.addNewControl();
      expect(component.form.controls.myControls.controls.length).toEqual(1);
      expect(component.currentIndex).toEqual(1);
      expect(component.form.controls.myControls.controls[0].controls.myPercent.value).toEqual('');
      expect(component.form.controls.myControls.controls[0].controls.myString.value).toEqual('');
    });
    it('should add controls with initial values', () => {
      component.addNewControl({ myPercent: .4, myString: '40%' });
      expect(component.form.controls.myControls.controls.length).toEqual(1);
      expect(component.currentIndex).toEqual(1);
      expect(component.form.controls.myControls.controls[0].controls.myPercent.value).toEqual(0.4);
      expect(component.form.controls.myControls.controls[0].controls.myString.value).toEqual('40%');
    });
  });

  describe('Removing controls', () => {
    beforeEach(() => {
      component.initialValue = [{ myPercent: .1, myString: '10%' }, { myPercent: .2, myString: '20%' }, { myPercent: .3, myString: '30%' }];
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      expect(component.form.controls.myControls.controls.length).toEqual(3);
    })
    it('should remove control row and update indexes', () => {
      component.removeControl(0);
      expect(component.form.controls.myControls.controls.length).toEqual(2);
      expect(component.currentIndex).toEqual(2);
      expect(component.form.controls.myControls.controls[0].controls.myString.value).toEqual('20%');
      expect(component.form.controls.myControls.controls[1].controls.myString.value).toEqual('30%');
      expect(component.form.controls.myControls.controls[0].associations.index).toEqual(0);
      expect(component.form.controls.myControls.controls[1].associations.index).toEqual(1);
    });
    it('should check canRemove() function after removal', () => {
      spyOn(component, 'canRemove').and.returnValue(true);
      component.removeControl(0);
      expect(component.canRemove).toHaveBeenCalledWith({ 'myPercent': 0.2, 'myString': '20%' }, 0);
      expect(component.canRemove).toHaveBeenCalledWith({ 'myPercent': 0.3, 'myString': '30%' }, 1);
    });
    it('should check canRemove() function when reset', () => {
      spyOn(component, 'canRemove').and.returnValue(false);
      component.resetAddRemove();
      expect(component.canRemove).toHaveBeenCalledWith({ 'myPercent': 0.1, 'myString': '10%' }, 0);
      expect(component.canRemove).toHaveBeenCalledWith({ 'myPercent': 0.2, 'myString': '20%' }, 1);
      expect(component.canRemove).toHaveBeenCalledWith({ 'myPercent': 0.3, 'myString': '30%' }, 2);
    });
  });
});
