// NG2
import { waitForAsync, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ComponentUtils } from 'novo-elements/services';
import { PickerResults } from './extras/picker-results/PickerResults';
// App
import { NovoPickerElement } from './Picker';
import { NovoPickerModule } from './Picker.module';

describe('Elements: NovoPickerElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
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
    });
  });

  describe('Method: showResults()', () => {
    it('should be defined.', () => {
      expect(component.showResults).toBeDefined();
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
    it('sets the value to null when the picker input is cleared out', () => {
      component._value = '123';
      spyOn(component, 'onModelChange');
      component.checkTerm('');
      expect(component._value).toEqual(null);
      expect(component.onModelChange).toHaveBeenCalled();
    });
    it('does not register a change if there is no value set', () => {
      component._value = null;
      spyOn(component, 'onModelChange');
      spyOn(component.ref, 'markForCheck');
      component.checkTerm('');
      expect(component.onModelChange).not.toHaveBeenCalled();
      expect(component.ref.markForCheck).toHaveBeenCalled();
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
    it('should use title for a complex object if present.', () => {
      component.writeValue({ title: 'TITLE' });
      expect(component.term).toEqual('TITLE');
    });
    it('should use getLabels for a number if present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC_LABEL' });
          }),
      };
      component.writeValue(123);
      tick();
      expect(component.term).toEqual('DYNAMIC_LABEL');
    }));
    it('should use getLabels for a number array if present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC_LABEL' });
          }),
      };
      component.writeValue([123, 456, 789]);
      tick();
      expect(component.term).toEqual('DYNAMIC_LABEL');
    }));
    it('should use getLabels for a complex object if present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC_LABEL' });
          }),
      };
      component.writeValue({ id: 123 });
      tick();
      expect(component.term).toEqual('DYNAMIC_LABEL');
    }));
    it('should use getLabels for a complex object if present - default value.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({});
          }),
      };
      component.writeValue({ id: 123 });
      tick();
      expect(component.term).toEqual('');
    }));
    it('should use getLabels for a complex object if present - missing value.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve(null);
          }),
      };
      component.writeValue({ id: 123 });
      tick();
      expect(component.term).toEqual({ id: 123 });
    }));
    it('should use getLabels for a complex object if present - missing value.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve(null);
          }),
      };
      component.writeValue({ id: 123 });
      tick();
      expect(component.term).toEqual({ id: 123 });
    }));
    it('should call getLabels for array values that parse to integers if getLabels is present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC LABEL' });
          }),
      };
      component.writeValue(['123']);
      tick();
      expect(component.term).toEqual('DYNAMIC LABEL');
    }));
    it('should call getLabels for multiple array values that parse to integers if getLabels is present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC LABEL' });
          }),
      };
      component.writeValue(['123', '345', '678']);
      tick();
      expect(component.term).toEqual('DYNAMIC LABEL');
    }));
    it('should call getLabels for string value if useGetLabels flag is present.', fakeAsync(() => {
      component.config = {
        useGetLabels: true,
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC LABEL' });
          }),
      };
      component.writeValue('New Value');
      tick();
      expect(component.term).toEqual('DYNAMIC LABEL');
    }));
    it('should not call getLabels for string value if useGetLabels is not present.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve({ label: 'DYNAMIC LABEL' });
          }),
      };
      component.writeValue('New Value');
      tick();
      expect(component.term).toEqual('New Value');
    }));
    it('should handle getLabels that returns an array by using the first array element.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve([{ label: 'DYNAMIC LABEL' }]);
          }),
      };
      component.writeValue(123);
      tick();
      expect(component.term).toEqual('DYNAMIC LABEL');
    }));
    it('should handle getLabels that returns an array by using the first array element - empty string case.', fakeAsync(() => {
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve([{ notALabel: 'NOT_A_LABEL' }]);
          }),
      };
      component.writeValue(123);
      tick();
      expect(component.term).toEqual('');
    }));
    it('should markForCheck once when not calling getLabels()', () => {
      jest.spyOn(component.ref, 'markForCheck').mockImplementation(() => {});
      component.writeValue('123');
      expect(component.ref.markForCheck).toHaveBeenCalledTimes(1);
    });
    it('should markForCheck when getLabels() completes', fakeAsync(() => {
      jest.spyOn(component.ref, 'markForCheck').mockImplementation(() => {});
      component.config = {
        getLabels: () =>
          new Promise((resolve) => {
            resolve([{ label: 'DYNAMIC_LABEL' }]);
          }),
      };
      component.writeValue(123);
      tick();
      expect(component.ref.markForCheck).toHaveBeenCalledTimes(2);
    }));
  });

  describe('clearValue', () => {
    beforeEach(() => {
      component._value = 'initialValue';
      component.term = 'initialTerm';
      component.popup = {
        instance: {
          customTextValue: 'popupValue',
        },
      };
      component.select = {
        emit: jest.fn()
      } as unknown;
      component.changed = {
        emit: jest.fn()
      } as unknown;
      spyOn(component, 'onModelChange');
      spyOn(component, 'hideResults');
    });

    it('should clear the value, emit the new value, and optionally clear the term', () => {
      component.clearValue(true);

      expect(component._value).toBeNull();
      expect(component.select.emit).toHaveBeenCalledWith(null);
      expect(component.changed.emit).toHaveBeenCalledWith({ value: null, rawValue: { label: '', value: null } });
      expect(component.onModelChange).toHaveBeenCalledWith(null);
      expect(component.term).toBe('');
      expect(component.popup.instance.customTextValue).toBeNull();
      expect(component.hideResults).toHaveBeenCalled();
    });
    it('should clear the value and emit the new value without clearing the term', () => {
      component.clearValue(false);

      expect(component._value).toBeNull();
      expect(component.select.emit).toHaveBeenCalledWith(null);
      expect(component.changed.emit).toHaveBeenCalledWith({ value: null, rawValue: { label: '', value: null } });
      expect(component.onModelChange).toHaveBeenCalledWith(null);
      expect(component.term).toBe('initialTerm');
      expect(component.popup.instance.customTextValue).toBe('popupValue');
      expect(component.hideResults).not.toHaveBeenCalled();
    });
    it('should not try to clear out customTextValue if popup and popup.instance are undefined', () => {
      component.popup = undefined;
      component.clearValue(true);

      expect(component.popup).toBeUndefined();

      component.popup = {
        instance: undefined,
      };
      component.clearValue(true);

      expect(component.popup.instance).toBeUndefined();
    });
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
