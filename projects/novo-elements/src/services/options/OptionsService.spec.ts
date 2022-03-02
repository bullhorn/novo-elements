// NG2
import { inject, TestBed } from '@angular/core/testing';
// Vendor
// APP
import { OptionsService } from './OptionsService';

describe('Element: OptionsService', () => {
  let service: OptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OptionsService,
          useClass: OptionsService,
        },
      ],
    });
  });

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
      } as any;
      const field = {
        optionsUrl: 'test',
      };
      expect(service.getOptionsConfig(http, field, {}).format).toEqual('$label');
    });
  });
});
