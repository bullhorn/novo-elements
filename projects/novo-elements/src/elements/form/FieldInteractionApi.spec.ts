import { async, TestBed, inject } from '@angular/core/testing';
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

  beforeEach(inject([FieldInteractionApi], (_service) => {
    service = _service;
  }));

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

      const result = service.getOptionsConfig(args) as { options: OptionsFunction };
      await result.options('asdf');

      expect(spy).toHaveBeenCalled();
      done();
    });
    it('uses the optionsURLBuilder if included and no optionsPromise', async (done) => {
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
        optionsUrl: 'fake/url'
      };
      const mapper = ({name}) => name;
      spyOn((service as any).http, 'get').and.returnValue(of([{name: 'Dr. Strangelove'}]));
      const result = service.getOptionsConfig(args, mapper);
      const results = await (result.options as OptionsFunction)('asdf');
      expect(results).toEqual(['Dr. Strangelove']);
      done();
    });
  });
});
