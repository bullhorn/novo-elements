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
    it('should not overwrite existing form associations', () => {
      // Setup the form like the above test
      component.initialValue = { myPercent: .1, myString: '10%' };
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });

      // Simulate a form interaction modifying the associations by adding custom properties
      component.form.controls.myControls.controls[0].associations = { customProperty: 'customValue' };

      // Simulate re-assignment of indexes
      component.addNewControl();

      // Ensure that the existing custom data is not overwritten by assignment of indexes
      expect(component.form.controls.myControls.controls[0].associations.index).toEqual(0);
      expect(component.form.controls.myControls.controls[1].associations.index).toEqual(1);
      expect(component.form.controls.myControls.controls[0].associations.customProperty).toEqual('customValue');
      expect(component.form.controls.myControls.controls[1].associations.customProperty).not.toBeDefined();
    });
    it('should handle null associations', () => {
      component.initialValue = { myPercent: .1, myString: '10%' };
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      component.form.controls.myControls.controls[0].associations = undefined;
      component.addNewControl();
      expect(component.form.controls.myControls.controls[0].associations.index).toEqual(0);
      expect(component.form.controls.myControls.controls[1].associations.index).toEqual(1);
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

  describe('destruction', () => {
    it('should remove all controls when destroying in order to properly unsubscribe to form interaction events', () => {
      component.initialValue = [{ myPercent: .1, myString: '10%' }, { myPercent: .2, myString: '20%' }, { myPercent: .3, myString: '30%' }];
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });
      expect(component.form.value.myControls).toEqual(component.initialValue);
      expect(component.currentIndex).toEqual(3);
      component.ngOnDestroy();
      expect(component.currentIndex).toEqual(0);
    });
  });

  describe('field interaction events', () => {
    it('should call markForCheck when there are field interaction events on a nested form', () => {
      spyOn(component.ref, 'markForCheck');
      component.initialValue = [{ myPercent: .1, myString: '10%' }, { myPercent: .2, myString: '20%' }, { myPercent: .3, myString: '30%' }];
      component.ngOnChanges({ initialValue: { previousValue: '', currentValue: component.initialValue } });

      // Simulate a field interaction event
      expect(component.ref.markForCheck).toHaveBeenCalledTimes(7); // All previous calls coming internally
      component.form.controls.myControls.controls[0].fieldInteractionEvents.emit({ prop: 'errors', value: 'my error message' });
      expect(component.ref.markForCheck).toHaveBeenCalledTimes(8); // One more coming externally from the form interaction
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
    });
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
