// NG2
import { TestBed, async, inject } from '@angular/core/testing';
// Vendor
// APP
import { OptionsService } from './OptionsService';

describe('Element: OptionsService', () => {
  let fixture: any;
  let component: any;
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
      let http = {
        get: (test) => {
          return { subscribe: (x, y) => {} };
        },
      };
      let field = {
        optionsUrl: 'test',
      };
      expect(service.getOptionsConfig(http, field, {}, {}).format).toEqual('$label');
    });
  });
});
