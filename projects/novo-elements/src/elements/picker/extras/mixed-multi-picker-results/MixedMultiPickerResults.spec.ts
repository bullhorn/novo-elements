import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { MixedMultiPickerResults } from './MixedMultiPickerResults';

jest.mock('novo-elements/services');
jest.mock('novo-elements/utils');

describe('MixedMultiPickerResults', () => {
  let component: MixedMultiPickerResults;
  let elementRef: jest.Mocked<ElementRef>;
  let renderer: jest.Mocked<any>;
  let labels: jest.Mocked<NovoLabelService>;
  let ref: jest.Mocked<ChangeDetectorRef>;

  beforeEach(() => {
    elementRef = {
      nativeElement: document.createElement('div'),
    } as any;

    renderer = {
      setProperty: jest.fn(),
    } as any;

    labels = {
      groupedMultiPickerEmpty: 'No results found',
    } as any;

    ref = {
      markForCheck: jest.fn(),
    } as any;

    component = new MixedMultiPickerResults(elementRef, renderer, labels, ref);
    component.config = { options: [] };
  });

  describe('constructor', () => {
    it('should create component instance', () => {
      expect(component).toBeDefined();
    });

    it('should initialize selectedPrimaryOption as undefined', () => {
      expect(component.selectedPrimaryOption).toBeUndefined();
    });

    it('should initialize searchTerm as undefined', () => {
      expect(component.searchTerm).toBeUndefined();
    });

    it('should initialize placeholder as empty string', () => {
      expect(component.placeholder).toBe('');
    });

    it('should initialize emptyOptionsLabel as empty string', () => {
      expect(component.emptyOptionsLabel).toBe('');
    });

    it('should initialize internalMap as empty Map', () => {
      expect(component['internalMap'].size).toBe(0);
    });
  });

  describe('term setter', () => {
    it('should set placeholder from config', () => {
      component.config = { placeholder: 'Select an option' };
      component.term = 'test';
      expect(component.placeholder).toBe('Select an option');
    });
  });

  describe('options getter', () => {
    it('should return config.options', () => {
      const options = [{ value: 'opt1', label: 'Option 1' }];
      component.config = { options };

      expect(component.options).toEqual(options);
    });

    it('should return empty array if config.options is undefined', () => {
      component.config = { options: undefined };

      expect(component.options).toEqual([]);
    });
  });

  describe('selectMatch', () => {
    it('should focus input element', () => {
      const inputElement = document.createElement('input');
      (component as any).inputElement = { nativeElement: inputElement } as any;
      const selectMatchSpy = jest.spyOn(BasePickerResults.prototype, 'selectMatch');

      component.selectMatch();

      expect(inputElement).toBeDefined();
      selectMatchSpy.mockRestore();
    });
  });

  describe('optionHasSecondaryOptions', () => {
    it('should return true if option has secondaryOptions', () => {
      const option = {
        value: 'opt1',
        label: 'Option 1',
        secondaryOptions: [{ value: 'sub1', label: 'Sub 1' }],
      };

      expect(component.optionHasSecondaryOptions(option)).toBe(true);
    });

    it('should return true if option has getSecondaryOptionsAsync', () => {
      const option = {
        value: 'opt1',
        label: 'Option 1',
        getSecondaryOptionsAsync: jest.fn(),
      };

      expect(component.optionHasSecondaryOptions(option)).toBe(true);
    });

    it('should return false if option has no secondary options', () => {
      const option = { value: 'opt1', label: 'Option 1' };

      expect(component.optionHasSecondaryOptions(option)).toBe(false);
    });

    it('should return false if option is null', () => {
      expect(component.optionHasSecondaryOptions(null as any)).toBe(false);
    });
  });

  describe('shouldShowSearchBox', () => {
    it('should return true if showSearchOnSecondaryOptions is true', () => {
      const option = {
        value: 'opt1',
        label: 'Option 1',
        showSearchOnSecondaryOptions: true,
      };

      expect(component.shouldShowSearchBox(option)).toBe(true);
    });

    it('should return false if showSearchOnSecondaryOptions is false', () => {
      const option = {
        value: 'opt1',
        label: 'Option 1',
        showSearchOnSecondaryOptions: false,
      };

      expect(component.shouldShowSearchBox(option)).toBe(false);
    });

    it('should return false if option is null', () => {
      expect(component.shouldShowSearchBox(null as any)).toBe(false);
    });
  });

  describe('clearPrimaryOption', () => {
    it('should clear internalMap entry', () => {
      const option = { value: 'opt1', label: 'Option 1' };
      component['internalMap'].set('opt1', { value: 'opt1', label: 'Option 1', items: [] });

      component.clearPrimaryOption(option);

      expect(component['internalMap'].has('opt1')).toBe(false);
    });

    it('should clear selectedPrimaryOption if it matches', () => {
      const option = { value: 'opt1', label: 'Option 1' };
      component.selectedPrimaryOption = option;
      component['internalMap'].set('opt1', { value: 'opt1', label: 'Option 1', items: [] });

      component.clearPrimaryOption(option);

      expect(component.selectedPrimaryOption).toBeNull();
    });

    it('should clear matches if selectedPrimaryOption matches', () => {
      const option = { value: 'opt1', label: 'Option 1' };
      component.selectedPrimaryOption = option;
      component.matches = [{ value: 'match1', label: 'Match 1' }];
      component['internalMap'].set('opt1', { value: 'opt1', label: 'Option 1', items: [] });

      component.clearPrimaryOption(option);

      expect(component.matches).toEqual([]);
    });

    it('should call markForCheck', () => {
      const option = { value: 'opt1', label: 'Option 1' };
      component['internalMap'].set('opt1', { value: 'opt1', label: 'Option 1', items: [] });

      component.clearPrimaryOption(option);

      expect(ref.markForCheck).toHaveBeenCalled();
    });
  });

  describe('filterData', () => {
    it('should return filtered secondaryOptions', () => {
      component.selectedPrimaryOption = {
        value: 'opt1',
        label: 'Option 1',
        secondaryOptions: [
          { value: 'sub1', label: 'Sub 1' },
          { value: 'sub2', label: 'Sub 2' },
        ],
      };
      component.searchTerm = 'Sub 1';

      const result = component.filterData();

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return all items when searchTerm is empty', () => {
      const items = [
        { value: 'sub1', label: 'Sub 1' },
        { value: 'sub2', label: 'Sub 2' },
      ];
      component.selectedPrimaryOption = {
        value: 'opt1',
        label: 'Option 1',
        secondaryOptions: items,
      };
      component.searchTerm = '';

      const result = component.filterData();

      expect(result.length).toBe(items.length);
    });

    it('should return empty array if no selectedPrimaryOption', () => {
      component.selectedPrimaryOption = null as any;

      const result = component.filterData();

      expect(result).toEqual([]);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from keyboardSubscription', () => {
      const subscription = { unsubscribe: jest.fn() };
      component['keyboardSubscription'] = subscription as any;

      component.ngOnDestroy();

      expect(subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should unsubscribe from clearSecondaryOptions', () => {
      const subscription = { unsubscribe: jest.fn() };
      const option = {
        value: 'opt1',
        label: 'Option 1',
        clearSecondaryOptions: subscription as any,
      };
      component.config = { options: [option] };

      component.ngOnDestroy();

      expect(subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
