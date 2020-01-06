// NG2
import { TestBed, async, inject } from '@angular/core/testing';
// Vendor
// APP
import { OptionsService } from './OptionsService';

describe('Element: OptionsService', () => {
  let service: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OptionsService,
          useClass: OptionsService,
        },
      ],
    });
  }));

  beforeEach(inject([OptionsService], (_service) => {
    service = _service;
  }));

  it('should initialize with all its defaults.', () => {
    expect(service).toBeDefined();
  });
  describe('Function: getOptionsConfig()', () => {
    it('should return default config', () => {
      const http = {
        get: (test) => {
          return { subscribe: (x, y) => {} };
        },
      };
      const field = {
        optionsUrl: 'test',
      };
      expect(service.getOptionsConfig(http, field, {}, {}).format).toEqual('$label');
    });
  });
});
