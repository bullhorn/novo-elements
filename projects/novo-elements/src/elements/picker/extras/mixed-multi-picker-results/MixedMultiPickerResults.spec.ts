// NG
import { ElementRef } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
// Vendor
import { BehaviorSubject } from 'rxjs';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { MixedMultiPickerResults } from './MixedMultiPickerResults';

xdescribe('Elements: MixedMultiPickerResults', () => {
  let fixture;
  let component;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MixedMultiPickerResults],
        providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
      }).compileComponents();
      fixture = TestBed.createComponent(MixedMultiPickerResults);
      component = fixture.debugElement.componentInstance;
    }),
  );

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Method: set term(value)', () => {
    it('should set placeholder from config', () => {
      component.config = { placeholder: 'ABC' };
      component.term = 'test';
      expect(component.placeholder).toEqual('ABC');
    });
    it('should focus on inputElement', (done) => {
      component.config = {};
      spyOn(component.inputElement.nativeElement, 'focus');
      component.term = 'test';
      setTimeout(() => {
        expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('Method: get options()', () => {
    it('should return empty array if there are no options set', () => {
      component.config = {};
      expect(component.options).toEqual([]);
    });
    it('should return options from config', () => {
      component.config = { options: [{ val: '1' }] };
      expect(component.options).toEqual([{ val: '1' }]);
    });
  });

  describe('Method: ngOnDestroy()', () => {
    it('should unsubscribe the keyboardSubscription', () => {
      component.keyboardSubscription = { unsubscribe: () => {} };
      component.config = { options: [] };
      spyOn(component.keyboardSubscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.keyboardSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Method: selectPrimaryOption(primaryOption, event?)', () => {
    let keyboardSubscription: { unsubscribe: () => void };
    beforeEach(() => {
      keyboardSubscription = { unsubscribe: () => {} };
      spyOn(keyboardSubscription, 'unsubscribe').and.callThrough();
      const elem: HTMLElement = document.createElement('list');
      const elemRef: ElementRef = new ElementRef(elem);
      component.listElement = { element: elemRef };
      const inputElem: HTMLInputElement = document.createElement('input');
      const inputElemRef: ElementRef = new ElementRef(inputElem);
      component.inputElement = inputElemRef;
    });
    it('should unsubscribe the keyboardSubscription', () => {
      component.keyboardSubscription = keyboardSubscription;
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(keyboardSubscription.unsubscribe).toHaveBeenCalled();
    });
    it('should not unsubscribe the keyboardSubscription if it is not defined', () => {
      component.keyboardSubscription = undefined;
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(keyboardSubscription.unsubscribe).not.toHaveBeenCalled();
    });
    it('should scroll to the top', () => {
      spyOn(component.renderer, 'setProperty').and.stub();
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(component.renderer.setProperty).toHaveBeenCalled();
    });
    it('should focus on the input element', () => {
      spyOn(component.inputElement.nativeElement, 'focus').and.stub();
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
    });
    it('should set selectedPrimaryOption', () => {
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(component.selectedPrimaryOption).toEqual({ value: '1', label: 'ABC' });
    });
    it('should create keyboardSubscription if there are secondary options', () => {
      component.selectPrimaryOption({ value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] });
      expect(component.keyboardSubscription).toBeDefined();
    });
    it('should call getNewMatches()', () => {
      spyOn(component, 'getNewMatches').and.stub();
      component.selectPrimaryOption({ value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] });
      expect(component.getNewMatches).toHaveBeenCalledWith({
        value: '2',
        label: 'DEF',
        secondaryOptions: [{ value: '2.1', label: '2-1' }],
      });
    });
    it('should set the searchTerm when there is a keyboard input', (done) => {
      component.selectPrimaryOption({ value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] });
      component.inputElement.nativeElement.value = 'abc';
      const event = new KeyboardEvent('keyup');
      component.inputElement.nativeElement.dispatchEvent(event);
      setTimeout(() => {
        expect(component.searchTerm).toEqual('abc');
        done();
      }, 400);
    });
    it('should call selectActive and selectMatch if there are not secondary options', () => {
      spyOn(component, 'selectActive').and.stub();
      spyOn(component, 'selectMatch').and.stub();
      component.selectPrimaryOption({ value: '1', label: 'ABC' });
      expect(component.selectActive).toHaveBeenCalledWith({ value: '1', label: 'ABC' });
      expect(component.selectMatch).toHaveBeenCalled();
    });
  });

  describe('Method: selectMatch(event)', () => {
    beforeEach(() => {
      const inputElem: HTMLInputElement = document.createElement('input');
      const inputElemRef: ElementRef = new ElementRef(inputElem);
      component.inputElement = inputElemRef;
    });
    it('should focus on the input element', () => {
      spyOn(component.inputElement.nativeElement, 'focus').and.stub();
      component.selectMatch();
      expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
    });
    it('should call super', () => {
      spyOn(BasePickerResults.prototype, 'selectMatch').and.stub();
      component.selectMatch();
      expect(BasePickerResults.prototype.selectMatch).toHaveBeenCalled();
    });
  });

  describe('Method: clearSearchTerm(event)', () => {
    let mouseEvent: MouseEvent;
    beforeEach(() => {
      mouseEvent = new MouseEvent('');
      component.selectedPrimaryOption = { value: '1', label: 'ABC' };
      spyOn(component, 'selectPrimaryOption').and.stub();
    });
    it('should clear out the search term', () => {
      component.searchTerm = 'ABC';
      component.clearSearchTerm(mouseEvent);
      expect(component.searchTerm).toEqual('');
    });
  });

  describe('Method: optionHasSecondaryOptions(primaryOption)', () => {
    it('should return false if primaryOption is undefined', () => {
      expect(component.optionHasSecondaryOptions(undefined)).toBe(false);
    });
    it('should return false if primaryOption has no secondaryOptions or getSecondaryOptionsAsync function', () => {
      expect(component.optionHasSecondaryOptions({ value: '1', label: 'ABC' })).toBe(false);
    });
    it('should return true if primaryOption has secondaryOptions', () => {
      expect(component.optionHasSecondaryOptions({ value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] })).toBe(
        true,
      );
    });
    it('should return true if primaryOption has a getSecondaryOptionsAsync function', () => {
      expect(component.optionHasSecondaryOptions({ value: '3', label: 'GHI', getSecondaryOptionsAsync: () => {} })).toBe(true);
    });
  });

  describe('Method: shouldShowSearchBox(primaryOption)', () => {
    it('should return false if primaryOption is undefined', () => {
      expect(component.shouldShowSearchBox(undefined)).toBe(false);
    });
    it('should return false if primaryOption.showSearchOnSecondaryOptions is not defined', () => {
      expect(component.shouldShowSearchBox({ value: '4', label: 'JKL', getSecondaryOptionsAsync: () => {} })).toBe(false);
    });
    it('should return false if primaryOption.showSearchOnSecondaryOptions is false', () => {
      expect(
        component.shouldShowSearchBox({
          value: '4',
          label: 'JKL',
          getSecondaryOptionsAsync: () => {},
          showSearchOnSecondaryOptions: false,
        }),
      ).toBe(false);
    });
    it('should return true if primaryOption.showSearchOnSecondaryOptions is true', () => {
      expect(
        component.shouldShowSearchBox({ value: '4', label: 'JKL', getSecondaryOptionsAsync: () => {}, showSearchOnSecondaryOptions: true }),
      ).toBe(true);
    });
  });

  describe('Method: clearPrimaryOption(primaryOption: IMixedMultiPickerOption)', () => {
    beforeEach(() => {
      component.selectedPrimaryOption = { value: '3', label: 'GHI', getSecondaryOptionsAsync: () => {} };
      component.internalMap.set('3', { value: '3', label: 'GHI', items: [{ value: '3.1', label: '3-1' }] });
    });
    it('should clearPrimaryOption if primaryOption exists in internal map', () => {
      component.clearPrimaryOption({ value: '3', label: 'GHI' });
      expect(component.internalMap.get(3)).toBe(undefined);
    });
    it('shouldn"t error if primaryOption doesn"t exists in internal map', () => {
      component.clearPrimaryOption({ value: '4', label: 'GHI' });
      expect(component.internalMap.get(3)).toBe(component.internalMap.get(3));
    });
    it('should reset selectedPrimaryOption if primaryOption being cleared is selected', () => {
      component.clearPrimaryOption({ value: '3', label: 'GHI' });
      expect(component.selectedPrimaryOption).toBe(null);
    });
    it('shouldn"t reset selectedPrimaryOption if primaryOption being cleared is not selected', () => {
      component.internalMap.set('4', { value: '4', label: 'JKL', items: [{ value: '4.1', label: '4-1' }] });
      component.clearPrimaryOption({ value: '4', label: 'JKL' });
      expect(component.selectedPrimaryOption.value).toEqual('3');
    });
  });

  describe('Method: filterData())', () => {
    it('should return an empty array if there is no selectedPrimaryOption', () => {
      expect(component.filterData()).toEqual([]);
    });
    it('should filter using the secondaryOptions if the selectedPrimaryOption has secondaryOptions', () => {
      component.selectedPrimaryOption = { value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] };
      expect(component.filterData()).toEqual([{ value: '2.1', label: '2-1' }]);
    });
    it("should filter using the internal map if the selectedPrimaryOption doesn't have static secondaryOptions", () => {
      component.selectedPrimaryOption = { value: '3', label: 'GHI', getSecondaryOptionsAsync: () => {} };
      component.internalMap.set('3', { value: '3', label: 'GHI', items: [{ value: '3.1', label: '3-1' }] });
      expect(component.filterData()).toEqual([{ value: '3.1', label: '3-1' }]);
    });
  });

  describe('Method: filter(array))', () => {
    it('should return an empty array when searchTerm is undefined if given an empty array', () => {
      expect(component.filter([])).toEqual([]);
    });
    it('should return the same array when searchTerm is undefined if given a populated array', () => {
      const secondaryOptions = [
        { value: '1', label: 'ABC' },
        { value: '2', label: 'DEF' },
      ];
      expect(component.filter(secondaryOptions)).toEqual(secondaryOptions);
    });
    it('should return a filtered array when searchTerm is defined', () => {
      component.searchTerm = 'A';
      component.selectedPrimaryOption = {};
      const secondaryOptions = [
        { value: '1', label: 'ABC' },
        { value: '2', label: 'DEF' },
      ];
      expect(component.filter(secondaryOptions)).toEqual([{ value: '1', label: 'ABC' }]);
    });
  });

  describe('Method: getNewMatches(array))', () => {
    it('should set matches to secondaryOptions if a primaryOption has secondaryOptions', () => {
      component.getNewMatches({ value: '2', label: 'DEF', secondaryOptions: [{ value: '2.1', label: '2-1' }] });
      expect(component.matches).toEqual([{ value: '2.1', label: '2-1' }]);
    });
    it('should throw an error if a primaryOption has neither secondaryOptions nor a getSecondaryOptionsAsync function', () => {
      const primaryOption = { value: '1', label: 'ABC' };
      expect(function () {
        component.getNewMatches(primaryOption);
      }).toThrow(new Error('An option needs to have either an array of secondaryOptions or a function getSecondaryOptionsAsync'));
    });
    it('should call the getSecondaryOptionsAsync function if a primaryOption has a getSecondaryOptionsAsync function', () => {
      const primaryOption = { value: '3', label: 'GHI', getSecondaryOptionsAsync: () => Promise.resolve() };
      spyOn(primaryOption, 'getSecondaryOptionsAsync').and.callThrough();
      component.getNewMatches(primaryOption);
      expect(primaryOption.getSecondaryOptionsAsync).toHaveBeenCalled();
    });
    it('should set loading if a primaryOption has a getSecondaryOptionsAsync function', () => {
      const primaryOption = {
        value: '3',
        label: 'GHI',
        getSecondaryOptionsAsync: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { value: 's-1', label: 'ABC - Async Secondary Option 1' },
                { value: 's-2', label: 'DEF - Async Secondary Option 2' },
              ]);
            }, 100);
          }),
      };
      component.getNewMatches(primaryOption);
      expect(component.isLoading).toBe(true);
    });
    it('should set matches via a provided getSecondaryOptionsAsync function', (done) => {
      const primaryOption = {
        value: '3',
        label: 'GHI',
        getSecondaryOptionsAsync: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { value: 's-1', label: 'ABC - Async Secondary Option 1' },
                { value: 's-2', label: 'DEF - Async Secondary Option 2' },
              ]);
            }, 100);
          }),
      };
      component.getNewMatches(primaryOption);
      setTimeout(() => {
        expect(component.matches).toEqual([
          { value: 's-1', label: 'ABC - Async Secondary Option 1' },
          { value: 's-2', label: 'DEF - Async Secondary Option 2' },
        ]);
        done();
      }, 150);
    });
    it('should load matches into the internal map if it needed to call a provided getSecondaryOptionsAsync function', (done) => {
      const primaryOption = {
        value: '3',
        label: 'GHI',
        getSecondaryOptionsAsync: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { value: 's-1', label: 'ABC - Async Secondary Option 1' },
                { value: 's-2', label: 'DEF - Async Secondary Option 2' },
              ]);
            }, 100);
          }),
      };
      component.getNewMatches(primaryOption);
      setTimeout(() => {
        expect(component.internalMap.get('3')).toEqual({
          value: '3',
          label: 'GHI',
          items: [
            { value: 's-1', label: 'ABC - Async Secondary Option 1' },
            { value: 's-2', label: 'DEF - Async Secondary Option 2' },
          ],
        });
        done();
      }, 150);
    });
    it('should retrieve options from the internal map if it is populated', () => {
      component.internalMap.set('3', {
        value: '3',
        label: 'GHI',
        items: [
          { value: 's-1', label: 'ABC - Async Secondary Option 1' },
          { value: 's-2', label: 'DEF - Async Secondary Option 2' },
        ],
      });
      const primaryOption = { value: '3', label: 'GHI', getSecondaryOptionsAsync: () => Promise.resolve() };
      spyOn(primaryOption, 'getSecondaryOptionsAsync').and.callThrough();
      component.getNewMatches(primaryOption);
      expect(component.matches).toEqual([
        { value: 's-1', label: 'ABC - Async Secondary Option 1' },
        { value: 's-2', label: 'DEF - Async Secondary Option 2' },
      ]);
    });
    it('should NOT call getSecondaryOptions if the internal map is populated for the value', () => {
      component.internalMap.set('3', {
        value: '3',
        label: 'GHI',
        items: [
          { value: 's-1', label: 'ABC - Async Secondary Option 1' },
          { value: 's-2', label: 'DEF - Async Secondary Option 2' },
        ],
      });
      const primaryOption = { value: '3', label: 'GHI', getSecondaryOptionsAsync: () => Promise.resolve() };
      spyOn(primaryOption, 'getSecondaryOptionsAsync').and.callThrough();
      component.getNewMatches(primaryOption);
      expect(primaryOption.getSecondaryOptionsAsync).not.toHaveBeenCalled();
    });
    it('should subscribe clearSecondaryOptions if defined on primaryOption', () => {
      const primaryOption = {
        value: '3',
        label: 'GHI',
        getSecondaryOptionsAsync: () => Promise.resolve(),
        clearSecondaryOptions: new BehaviorSubject<Boolean>(true),
      };
      spyOn(primaryOption.clearSecondaryOptions, 'subscribe').and.callThrough();
      component.getNewMatches(primaryOption);
      expect(primaryOption.clearSecondaryOptions.subscribe).toHaveBeenCalled();
    });
  });
});
