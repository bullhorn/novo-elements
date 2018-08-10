// NG2
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoPickerElement } from './Picker';
import { NovoPickerModule } from './Picker.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { PickerResults } from './extras/picker-results/PickerResults';

describe('Elements: NovoPickerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentUtils, useClass: ComponentUtils }],
      imports: [FormsModule, NovoPickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoPickerElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    expect(component.closeOnSelect).toBe(true);
    expect(component.selected).toEqual([]);
    expect(component.appendToBody).toBe(false);
    expect(component.side).toBe('left');
    expect(component.autoSelectFirstOption).toBe(true);
  });

  describe('Method: ngOnInit()', () => {
    it('should set the PickerResults as the default resultsComponent.', () => {
      component.config = {};
      component.ngOnInit();
      expect(component.resultsComponent).toEqual(PickerResults);
    });
  });

  describe('Method: onKeyDown()', () => {
    it('should be defined.', () => {
      expect(component.onKeyDown).toBeDefined();
      component.onKeyDown();
    });
  });

  describe('Method: clearValue()', () => {
    it('should be defined.', () => {
      expect(component.clearValue).toBeDefined();
      component.clearValue();
    });
  });

  describe('Method: onFocus()', () => {
    it('should be defined.', () => {
      expect(component.onFocus).toBeDefined();
      // component.onFocus();
    });
  });

  describe('Method: showResults()', () => {
    it('should be defined.', () => {
      expect(component.showResults).toBeDefined();
      // component.showResults();
    });
  });

  describe('Method: hideResults()', () => {
    it('should be defined.', () => {
      expect(component.hideResults).toBeDefined();
      component.hideResults();
    });
  });

  describe('Method: checkTerm()', () => {
    it('should be defined.', () => {
      expect(component.checkTerm).toBeDefined();
      component.checkTerm();
    });
  });

  describe('Method: onTouched()', () => {
    it('should be defined.', () => {
      expect(component.onTouched).toBeDefined();
      component.onTouched();
    });
  });

  describe('Method: writeValue()', () => {
    beforeEach(() => {
      component.clearValueOnSelect = false;
      component.config = {};
    });
    it('should clear out the term if clearValueOnSelect is set.', () => {
      component.clearValueOnSelect = true;
      component.writeValue('New Value');
      expect(component.term).toEqual('');
      expect(component.value).toEqual('New Value');
    });
    it('should handle empty object.', () => {
      component.writeValue({});
      expect(component.term).toEqual({});
    });
    it('should handle null.', () => {
      component.writeValue(null);
      expect(component.term).toEqual('');
    });
    it('should handle string values.', () => {
      component.writeValue('String Value');
      expect(component.term).toEqual('String Value');
    });
    it('should handle string arrays of length 1.', () => {
      component.writeValue(['ONE']);
      expect(component.term).toEqual(['ONE']);
    });
    it('should handle string arrays of length > 1.', () => {
      component.writeValue(['ONE', 'TWO', 'THREE']);
      expect(component.term).toEqual(['ONE', 'TWO', 'THREE']);
    });
    it('should handle empty array.', () => {
      component.writeValue([]);
      expect(component.term).toEqual([]);
    });
    it('should handle number values.', () => {
      component.writeValue(123);
      expect(component.term).toEqual(123);
    });
    it('should handle number arrays of length 1.', () => {
      component.writeValue([1]);
      expect(component.term).toEqual([1]);
    });
    it('should handle number arrays of length > 1.', () => {
      component.writeValue([1, 2, 3]);
      expect(component.term).toEqual([1, 2, 3]);
    });
    it('should use label for a complex object if present.', () => {
      component.writeValue({ label: 'LABEL' });
      expect(component.term).toEqual('LABEL');
    });
    it('should use first and last name for a complex object if present.', () => {
      component.writeValue({ firstName: 'FIRST', lastName: 'LAST' });
      expect(component.term).toEqual('FIRST LAST');
    });
    it('should use name for a complex object if present.', () => {
      component.writeValue({ name: 'NAME' });
      expect(component.term).toEqual('NAME');
    });
    it(
      'should use getLabels for a number if present.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({ label: 'DYNAMIC_LABEL' });
            }),
        };
        component.writeValue(123);
        tick();
        expect(component.term).toEqual('DYNAMIC_LABEL');
      }),
    );
    it(
      'should use getLabels for a number array if present.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({ label: 'DYNAMIC_LABEL' });
            }),
        };
        component.writeValue([123, 456, 789]);
        tick();
        expect(component.term).toEqual('DYNAMIC_LABEL');
      }),
    );
    it(
      'should use getLabels for a complex object if present.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({ label: 'DYNAMIC_LABEL' });
            }),
        };
        component.writeValue({ id: 123 });
        tick();
        expect(component.term).toEqual('DYNAMIC_LABEL');
      }),
    );
    it(
      'should use getLabels for a complex object if present - default value.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({});
            }),
        };
        component.writeValue({ id: 123 });
        tick();
        expect(component.term).toEqual('');
      }),
    );
    it(
      'should use getLabels for a complex object if present - missing value.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve(null);
            }),
        };
        component.writeValue({ id: 123 });
        tick();
        expect(component.term).toEqual({ id: 123 });
      }),
    );
    it(
      'should use getLabels for a complex object if present - missing value.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve(null);
            }),
        };
        component.writeValue({ id: 123 });
        tick();
        expect(component.term).toEqual({ id: 123 });
      }),
    );
    it(
      'should call getLabels for array values that parse to integers if getLabels is present.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({ label: 'DYNAMIC LABEL' });
            }),
        };
        component.writeValue(['123']);
        tick();
        expect(component.term).toEqual('DYNAMIC LABEL');
      }),
    );
    it(
      'should call getLabels for multiple array values that parse to integers if getLabels is present.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve({ label: 'DYNAMIC LABEL' });
            }),
        };
        component.writeValue(['123', '345', '678']);
        tick();
        expect(component.term).toEqual('DYNAMIC LABEL');
      }),
    );
    it(
      'should handle getLabels that returns an array by using the first array element.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve([{ label: 'DYNAMIC LABEL' }]);
            }),
        };
        component.writeValue(123);
        tick();
        expect(component.term).toEqual('DYNAMIC LABEL');
      }),
    );
    it(
      'should handle getLabels that returns an array by using the first array element - empty string case.',
      fakeAsync(() => {
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve([{ notALabel: 'NOT_A_LABEL' }]);
            }),
        };
        component.writeValue(123);
        tick();
        expect(component.term).toEqual('');
      }),
    );
    it('should markForCheck once when not calling getLabels()', () => {
      spyOn(component.ref, 'markForCheck');
      component.writeValue('123');
      expect(component.ref.markForCheck).toHaveBeenCalledTimes(1);
    });
    it(
      'should markForCheck when getLabels() completes',
      fakeAsync(() => {
        spyOn(component.ref, 'markForCheck');
        component.config = {
          getLabels: () =>
            new Promise((resolve) => {
              resolve([{ label: 'DYNAMIC_LABEL' }]);
            }),
        };
        component.writeValue(123);
        tick();
        expect(component.ref.markForCheck).toHaveBeenCalledTimes(2);
      }),
    );
  });

  describe('Method: registerOnChange()', () => {
    it('should be defined.', () => {
      expect(component.registerOnChange).toBeDefined();
      component.registerOnChange();
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeDefined();
      component.registerOnTouched();
    });
  });
});
