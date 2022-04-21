// NG
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
// Vendor
import { of } from 'rxjs';
// App
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from '../../services/options/OptionsService';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoModalService } from '../modal/modal.service';
import { NovoToastService } from '../toast/ToastService';
import { FieldInteractionApi } from './FieldInteractionApi';
import { ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';

describe('FieldInteractionApi', () => {
  let service: FieldInteractionApi;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [
        {
          provide: FieldInteractionApi,
          useFactory: (toaster, modalService, formUtils, http, labels) => {
            return new FieldInteractionApi(toaster, modalService, formUtils, http, labels);
          },
          deps: [NovoToastService, NovoModalService, FormUtils, HttpClient, NovoLabelService],
        },
        ComponentUtils,
        OptionsService,
        FormUtils,
        HttpHandler,
        NovoToastService,
        NovoLabelService,
        NovoModalService,
        FormUtils,
        HttpClient,
      ],
    });
  }));

  let triggerEvent;
  let setProperty;

  beforeEach(inject([FieldInteractionApi], (_service) => {
    service = _service;
    service.form = { controls: { doughnuts: { restrictFieldInteractions: false } } };
    triggerEvent = spyOn(service as any, 'triggerEvent');
    setProperty = spyOn(service as any, 'setProperty');
  }));

  describe('Function: addPropertiesToPickerConfig', () => {
    it('adds properties to a picker config without deleting any', () => {
      service.form.controls.doughnuts.config = { oldProperty: 'old!' };

      service.addPropertiesToPickerConfig('doughnuts', { newProperty: 'new!' });

      expect(setProperty).toBeCalledWith('doughnuts', 'config', { newProperty: 'new!', oldProperty: 'old!' });
      expect(triggerEvent).toBeCalledWith({ controlKey: 'doughnuts', prop: 'pickerConfig', value: { newProperty: 'new!' } }, undefined);
    });
    it('overrides pre-existing properties', () => {
      service.form.controls.doughnuts.config = { oldProperty: 'old!' };

      service.addPropertiesToPickerConfig('doughnuts', { oldProperty: 'new!' });

      expect(setProperty).toBeCalledWith('doughnuts', 'config', { oldProperty: 'new!' });
      expect(triggerEvent).toBeCalledWith({ controlKey: 'doughnuts', prop: 'pickerConfig', value: { oldProperty: 'new!' } }, undefined);
    });
    it('does not allow picker modifications if restrictFieldInteractions is true for that control', () => {
      service.form = { controls: { doughnuts: { restrictFieldInteractions: true } } };

      service.addPropertiesToPickerConfig('doughnuts', { foo: 'bar' });

      expect(setProperty).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
    });
  });

  describe('Function: getOptions', () => {
    it('is defined', () => {
      expect(service.getOptionsConfig).toBeDefined();
    });
    it('returns a new options call that calls optionsPromise', async () => {
      const args = {
        optionsPromise: async (str: string) => [],
      };
      const spy = jest.spyOn(args, 'optionsPromise').mockResolvedValue([]);

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      await result.options('asdf');

      expect(spy).toHaveBeenLastCalledWith('asdf', expect.any(Object), undefined);
    });
    it('calls optionsPromise if optionsUrl is also present', async () => {
      const args = {
        optionsPromise: async (str: string) => [],
        optionsUrl: 'fake/url',
      };
      const spy = jest.spyOn(args, 'optionsPromise').mockResolvedValue([]);
      const query = 'Novo Elem';
      const page = 9;

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      await result.options(query, page);

      expect(spy).toHaveBeenCalledWith(query, expect.any(Object), page);
    });
    it('uses the optionsURLBuilder if included and not optionsUrl', async () => {
      const args: ModifyPickerConfigArgs = {
        optionsUrlBuilder: (query) => `asdf${query}`,
        optionsUrl: 'fake/url',
      };

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      jest.spyOn(result, 'options');
      const spy = jest.spyOn((service as any).http, 'get').mockReturnValue(of([]));
      await result.options('asdf');
      expect(spy).toHaveBeenLastCalledWith('asdfasdf');
    });
    it('passes down format if optionsUrl, optionsUrlBuilder, or optionsPromise is present', () => {
      const args: ModifyPickerConfigArgs = {
        optionsPromise: async (str: string) => [],
        format: '$title',
      };
      const result = service.getOptionsConfig(args) as { options: OptionsFunction; format: string };
      expect(result.format).toEqual('$title');
    });
    it('passes through options if no options function args are present', () => {
      const args: ModifyPickerConfigArgs = {
        options: ['asdf'],
      };
      const result = service.getOptionsConfig(args);
      expect(result.options).toEqual(['asdf']);
    });
    it('uses the mapper if present', async () => {
      const args: ModifyPickerConfigArgs = {
        optionsUrl: 'fake/url',
      };
      const mapper = ({ name }) => name;
      jest.spyOn((service as any).http, 'get').mockReturnValue(of([{ name: 'Dr. Strangelove' }]));
      const result = service.getOptionsConfig(args, mapper);
      const results = await (result.options as OptionsFunction)('asdf');
      expect(results).toEqual(['Dr. Strangelove']);
    });
  });

  describe('Function: hideFieldSetHeader', () => {
    beforeEach(() => {
      service.form = { fieldsets: [{ key: 'test' }, { key: 'test1' }] };
    });
    it('is defined', () => {
      expect(service.hideFieldSetHeader).toBeDefined();
    });
    it('should set hidden to true for fieldset matching key', () => {
      service.hideFieldSetHeader('test');
      expect(service.form.fieldsets[0].hidden).toBeDefined();
      expect(service.form.fieldsets[0].hidden).toBeTruthy();
    });
    it('should not set hidden to true for unmatched key', () => {
      service.hideFieldSetHeader('test');
      expect(service.form.fieldsets[1].hidden).toBeUndefined();
    });
  });

  describe('Function: showFieldSetHeader', () => {
    beforeEach(() => {
      service.form = { fieldsets: [{ key: 'test' }, { key: 'test1' }] };
    });
    it('is defined', () => {
      expect(service.showFieldSetHeader).toBeDefined();
    });
    it('should set hidden to true', () => {
      service.showFieldSetHeader('test');
      expect(service.form.fieldsets[0].hidden).toBeDefined();
      expect(service.form.fieldsets[0].hidden).toBeFalsy();
    });
    it('should not set hidden to true for unmatched key', () => {
      service.showFieldSetHeader('test');
      expect(service.form.fieldsets[1].hidden).toBeUndefined();
    });
  });

  describe('Function: getFieldSet', () => {
    beforeEach(() => {
      service.form = { fieldsets: [{ key: 'test' }] };
    });
    it('is defined', () => {
      expect(service.getFieldSet).toBeDefined();
    });
    it('should return null and log to console if no key', () => {
      spyOn(console, 'error');
      const returnValue = service.getFieldSet(null);
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should return null and log to console if no match for key', () => {
      spyOn(console, 'error');
      const returnValue = service.getFieldSet('test1');
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should return fieldset object when key exists', () => {
      const returnValue = service.getFieldSet('test');
      expect(returnValue).not.toBeNull();
      expect(returnValue).toStrictEqual({ key: 'test' });
    });
  });

  describe('Function: getFormGroupArray', () => {
    beforeEach(() => {
      service.form = {
        controls: { myControl: { value: 1 } },
        parent: {
          controls: {
            myFormGroupArray: {
              controls: [
                { controls: { group1Control: { value: 1 } } },
                { controls: { group2Control: { value: 2 } } },
                { controls: { group3Control: { value: 3 } } },
              ],
            },
          },
        },
      };
    });
    it('is defined', () => {
      expect(service.getFormGroupArray).toBeDefined();
    });
    it('should log to console if no key', () => {
      spyOn(console, 'error');
      const returnValue = service.getFormGroupArray(null);
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should log to console if no match for key', () => {
      spyOn(console, 'error');
      const returnValue = service.getFormGroupArray('bogus');
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should get the form group array when key exists', () => {
      spyOn(console, 'error');
      const formGroupArray = service.getFormGroupArray('myFormGroupArray', service.getParent());
      expect(formGroupArray.length).toBe(3);
      expect(service.getValue('group1Control', formGroupArray[0])).toBe(1);
      expect(service.getValue('group2Control', formGroupArray[1])).toBe(2);
      expect(service.getValue('group3Control', formGroupArray[2])).toBe(3);
      expect(console.error).not.toBeCalled();
    });
  });

  describe('Function: getValue', () => {
    beforeEach(() => {
      service.form = {
        controls: { myControl: { value: 1 } },
        parent: {
          controls: { parentControl: { value: 2 } },
        },
      };
    });
    it('is defined', () => {
      expect(service.getValue).toBeDefined();
    });
    it('should log to console if no key', () => {
      spyOn(console, 'error');
      const returnValue = service.getValue(null);
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should log to console if no match for key', () => {
      spyOn(console, 'error');
      const returnValue = service.getValue('myControl1');
      expect(returnValue).toBeNull();
      expect(console.error).toBeCalled();
    });
    it('should get value when key exists', () => {
      spyOn(console, 'error');
      const returnValue = service.getValue('myControl');
      expect(returnValue).toBe(1);
      expect(console.error).not.toBeCalled();
    });
    it('should get value on current form when provided as argument', () => {
      spyOn(console, 'error');
      const returnValue = service.getValue('myControl', service.form);
      expect(returnValue).toBe(1);
      expect(console.error).not.toBeCalled();
    });
    it('should get value on parent form when provided as argument', () => {
      spyOn(console, 'error');
      const returnValue = service.getValue('parentControl', service.getParent());
      expect(returnValue).toBe(2);
      expect(console.error).not.toBeCalled();
    });
  });

  describe('Function: setValue', () => {
    beforeEach(() => {
      service.form = {
        controls: {
          myControl: { setValue: () => {} },
          restrictedControl: { setValue: () => {}, restrictFieldInteractions: true },
        },
        parent: {
          controls: { parentControl: { setValue: () => {} } },
        },
      };
    });
    it('is defined', () => {
      expect(service.setValue).toBeDefined();
    });
    it('should log to console if no key', () => {
      spyOn(service.form.controls.myControl, 'setValue');
      spyOn(console, 'error');
      service.setValue(null, null);
      expect(service.form.controls.myControl.setValue).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).toBeCalled();
    });
    it('should log to console if no match for key', () => {
      spyOn(service.form.controls.myControl, 'setValue');
      spyOn(console, 'error');
      service.setValue('myControl1', null);
      expect(service.form.controls.myControl.setValue).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).toBeCalled();
    });
    it('should set value when key exists', () => {
      spyOn(service.form.controls.myControl, 'setValue');
      spyOn(console, 'error');
      service.setValue('myControl', 1);
      expect(service.form.controls.myControl.setValue).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'value', value: 1 }, undefined);
      expect(console.error).not.toBeCalled();
    });
    it('should set value on current form when provided as argument', () => {
      spyOn(service.form.controls.myControl, 'setValue');
      spyOn(console, 'error');
      service.setValue('myControl', 1, {}, service.form);
      expect(service.form.controls.myControl.setValue).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'value', value: 1 }, service.form);
      expect(console.error).not.toBeCalled();
    });
    it('should do nothing when field interactions are restricted', () => {
      spyOn(service.form.controls.restrictedControl, 'setValue');
      spyOn(console, 'error');
      service.setValue('restrictedControl', 1);
      expect(service.form.controls.restrictedControl.setValue).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).not.toBeCalled();
    });
    it('should set value on parent form when provided as argument', () => {
      spyOn(service.form.parent.controls.parentControl, 'setValue');
      spyOn(console, 'error');
      service.setValue('parentControl', 1, {}, service.getParent());
      expect(service.form.parent.controls.parentControl.setValue).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'parentControl', prop: 'value', value: 1 }, service.form.parent);
      expect(console.error).not.toBeCalled();
    });
  });

  describe('Function: getIndex', () => {
    beforeEach(() => {
      service.form = {
        associations: {},
        parent: {
          associations: {},
        },
      };
    });
    it('is defined', () => {
      expect(service.getIndex).toBeDefined();
    });
    it('should return the index when defined', () => {
      service.form.associations.index = 0;
      expect(service.getIndex()).toBe(0);
    });
    it('should return the index on another form when otherForm is provided', () => {
      service.form.associations.index = 0;
      service.form.parent.associations.index = 3;
      expect(service.getIndex(service.getParent())).toBe(3);
    });
    it('should return null when index is not defined', () => {
      expect(service.getIndex()).toBe(null);
    });
    it('should return null when associations is not defined', () => {
      service.form.associations = undefined;
      expect(service.getIndex()).toBe(null);
    });
  });

  describe('Function: displayTip / clearTip', () => {
    beforeEach(() => {
      service.form = {
        controls: {
          myControl: {},
          restrictedControl: { restrictFieldInteractions: true },
        },
        parent: {
          controls: { parentControl: {} },
        },
      };
    });
    it('is defined', () => {
      expect(service.displayTip).toBeDefined();
    });
    it('should log to console if no match for key', () => {
      spyOn(console, 'error');
      service.displayTip('outOfControl', 'this is a tip');
      expect(service.form.controls.myControl.tipWell).toBeUndefined();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).toBeCalled();
    });
    it('should set tipWell and clear on a control in the current form', () => {
      spyOn(console, 'error');
      expect(service.form.controls.myControl.tipWell).toBeUndefined();

      service.displayTip('myControl', 'this is a tip', 'caution', true, true);

      expect(service.form.controls.myControl.tipWell).toEqual({ tip: 'this is a tip', icon: 'caution', button: true, sanitize: true });
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'tipWell', value: 'this is a tip' }, undefined);
      expect(console.error).not.toBeCalled();

      service.clearTip('myControl');

      expect(service.form.controls.myControl.tipWell).toBeNull();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'tipWell', value: null }, undefined);
      expect(console.error).not.toBeCalled();
    });
    it('should set tipWell on current form when provided as argument', () => {
      spyOn(console, 'error');
      service.displayTip('myControl', 'this is a tip', 'caution', true, true, service.form);
      expect(service.form.controls.myControl.tipWell).toEqual({ tip: 'this is a tip', icon: 'caution', button: true, sanitize: true });
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'tipWell', value: 'this is a tip' }, service.form);
      expect(console.error).not.toBeCalled();
    });
    it('should do nothing when field interactions are restricted', () => {
      spyOn(console, 'error');
      service.displayTip('restrictedControl', 'this is a tip that will not be applied');
      expect(service.form.controls.myControl.tipWell).toBeUndefined();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).not.toBeCalled();
    });
    it('should set tipWell and clear on a separate form', () => {
      spyOn(console, 'error');
      expect(service.form.parent.controls.parentControl.tipWell).toBeUndefined();

      service.displayTip('parentControl', 'this is a tip', 'caution', true, true, service.form.parent);

      expect(service.form.parent.controls.parentControl.tipWell).toEqual({
        tip: 'this is a tip',
        icon: 'caution',
        button: true,
        sanitize: true,
      });
      expect(triggerEvent).toBeCalledWith({ controlKey: 'parentControl', prop: 'tipWell', value: 'this is a tip' }, service.form.parent);
      expect(console.error).not.toBeCalled();

      service.clearTip('parentControl', service.form.parent);

      expect(service.form.parent.controls.parentControl.tipWell).toBeNull();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'parentControl', prop: 'tipWell', value: null }, service.form.parent);
      expect(console.error).not.toBeCalled();
    });
  });

  describe('Function: markAsValid / markAsInvalid', () => {
    beforeEach(() => {
      service.form = {
        controls: {
          myControl: { markAsInvalid: () => {}, markAsValid: () => {} },
          restrictedControl: { restrictFieldInteractions: true, markAsInvalid: () => {}, markAsValid: () => {} },
        },
        parent: {
          controls: { parentControl: { markAsInvalid: () => {}, markAsValid: () => {} } },
        },
      };
    });
    it('is defined', () => {
      expect(service.markAsInvalid).toBeDefined();
    });
    it('should log to console if no key', () => {
      spyOn(service.form.controls.myControl, 'markAsInvalid');
      spyOn(console, 'error');
      service.markAsInvalid(null, null);
      expect(service.form.controls.myControl.markAsInvalid).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).toBeCalled();
    });
    it('should log to console if no match for key', () => {
      spyOn(service.form.controls.myControl, 'markAsInvalid');
      spyOn(console, 'error');
      service.markAsInvalid('myControl1', null);
      expect(service.form.controls.myControl.markAsInvalid).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).toBeCalled();
    });
    it('should set value when key exists', () => {
      spyOn(service.form.controls.myControl, 'markAsInvalid');
      spyOn(service.form.controls.myControl, 'markAsValid');
      spyOn(console, 'error');

      service.markAsInvalid('myControl', 'error message');
      expect(service.form.controls.myControl.markAsInvalid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'errors', value: 'error message' }, undefined);
      expect(console.error).not.toBeCalled();

      service.markAsValid('myControl');
      expect(service.form.controls.myControl.markAsValid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'errors', value: null }, undefined);
      expect(console.error).not.toBeCalled();
    });
    it('should set value on current form when provided as argument', () => {
      spyOn(service.form.controls.myControl, 'markAsInvalid');
      spyOn(service.form.controls.myControl, 'markAsValid');
      spyOn(console, 'error');

      service.markAsInvalid('myControl', 'error message', service.form);
      expect(service.form.controls.myControl.markAsInvalid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'errors', value: 'error message' }, service.form);
      expect(console.error).not.toBeCalled();

      service.markAsValid('myControl', service.form);
      expect(service.form.controls.myControl.markAsValid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'myControl', prop: 'errors', value: null }, service.form);
      expect(console.error).not.toBeCalled();
    });
    it('should do nothing when field interactions are restricted', () => {
      spyOn(service.form.controls.restrictedControl, 'markAsInvalid');
      spyOn(service.form.controls.restrictedControl, 'markAsValid');
      spyOn(console, 'error');

      service.markAsInvalid('restrictedControl', 'error message');
      expect(service.form.controls.restrictedControl.markAsInvalid).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).not.toBeCalled();

      service.markAsValid('restrictedControl');
      expect(service.form.controls.restrictedControl.markAsValid).not.toBeCalled();
      expect(triggerEvent).not.toBeCalled();
      expect(console.error).not.toBeCalled();
    });
    it('should set value on parent form when provided as argument', () => {
      spyOn(service.form.parent.controls.parentControl, 'markAsInvalid');
      spyOn(service.form.parent.controls.parentControl, 'markAsValid');
      spyOn(console, 'error');

      service.markAsInvalid('parentControl', 'error message', service.getParent());
      expect(service.form.parent.controls.parentControl.markAsInvalid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'parentControl', prop: 'errors', value: 'error message' }, service.form.parent);
      expect(console.error).not.toBeCalled();

      service.markAsValid('parentControl', service.getParent());
      expect(service.form.parent.controls.parentControl.markAsValid).toBeCalled();
      expect(triggerEvent).toBeCalledWith({ controlKey: 'parentControl', prop: 'errors', value: null }, service.form.parent);
      expect(console.error).not.toBeCalled();
    });
  });
});
