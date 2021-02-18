import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoToastService } from '../toast/ToastService';
import { NovoModalService } from '../modal/ModalService';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { OptionsService } from '../../services/options/OptionsService';
import { ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';

describe('FieldInteractionApi', () => {
  let service: FieldInteractionApi;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    it('returns a new options call that calls optionsPromise', async (done) => {
      const args = {
        optionsPromise: async (str: string) => [],
      };
      const spy = spyOn(args, 'optionsPromise').and.returnValue(Promise.resolve([]));

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      await result.options('asdf');

      const [firstArg, secondArg] = spy.calls.mostRecent().args;
      expect(firstArg).toEqual('asdf');
      done();
    });
    it('calls optionsPromise if optionsUrl is also present', async (done) => {
      const args = {
        optionsPromise: async (str: string) => [],
        optionsUrl: 'fake/url',
      };
      const spy = spyOn(args, 'optionsPromise').and.returnValue(Promise.resolve([]));
      const query = 'Novo Elem';
      const page = 9;

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      await result.options(query, page);

      expect(spy).toBeCalledWith(query, jasmine.any(Object), page);
      done();
    });
    it('uses the optionsURLBuilder if included and not optionsUrl', async (done) => {
      const args: ModifyPickerConfigArgs = {
        optionsUrlBuilder: (query) => `asdf${query}`,
        optionsUrl: 'fake/url',
      };

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      spyOn(result, 'options').and.callThrough();
      const spy = spyOn((service as any).http, 'get').and.returnValue(of([]));
      await result.options('asdf');
      const [firstArg] = spy.calls.mostRecent().args;
      expect(firstArg).toEqual('asdfasdf');
      done();
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
    it('uses the mapper if present', async (done) => {
      const args: ModifyPickerConfigArgs = {
        optionsUrl: 'fake/url',
      };
      const mapper = ({ name }) => name;
      spyOn((service as any).http, 'get').and.returnValue(of([{ name: 'Dr. Strangelove' }]));
      const result = service.getOptionsConfig(args, mapper);
      const results = await (result.options as OptionsFunction)('asdf');
      expect(results).toEqual(['Dr. Strangelove']);
      done();
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

  describe('Function: getValue', () => {
    beforeEach(() => {
      service.form = {
        controls: { myControl: { value: 1 } },
        parent: {
          controls: { parentControl: { value: 2 } },
        }
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
        }
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
});
