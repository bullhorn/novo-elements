// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, DebugElement, ElementRef, ErrorHandler, EventEmitter, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IMaskModule } from 'angular-imask';
import { NovoElementsModule } from 'novo-elements';
import { DateFormatService, NovoLabelService, NovoTemplateService, OptionsService } from 'novo-elements/services';
import { Key } from 'novo-elements/utils';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlTemplates } from './ControlTemplates';
import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoFormGroup } from './NovoFormGroup';
import { AddressControl, BaseControl, CheckListControl, CheckboxControl, CustomControl, DateControl, PickerControl, TextBoxControl } from './controls';
import { FormUtils } from './utils/FormUtils';

jest.mock('angular-imask');

@Component({
  selector: 'novo-auto-size-test-component',
  template: ` <textarea autosize></textarea> `,
  styles: [
    `
      textarea {
        width: 100px;
        height: 20px;
        min-height: 20px;
        padding: 0;
        margin: 0;
        border: 0;
        line-height: 20px;
      }
    `,
  ],
})
class NovoAutoSizeTestComponent {}

describe('Elements: NovoAutoSize', () => {
  describe('Directive:', () => {
    let fixture;
    let component;
    let textarea: HTMLTextAreaElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [OverlayModule],
        declarations: [NovoAutoSize, NovoAutoSizeTestComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoAutoSizeTestComponent);
      component = fixture.debugElement.componentInstance;
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    }));

    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should grow when content is added', () => {
      const initialHeight = textarea.clientHeight;
      textarea.value = 'textarea \n should \n grow'; // Three lines of text
      textarea.dispatchEvent(new Event('input'));
      expect(textarea.clientHeight).toBe(initialHeight * 3);
    });

    it('should shrink when content is removed', () => {
      textarea.value = 'textarea \n should \n shrink'; // Three lines of text
      textarea.dispatchEvent(new Event('input'));
      const initialHeight = textarea.clientHeight;
      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));
      expect(textarea.clientHeight).toBe(initialHeight / 3);
    });
  });
});

describe('Test Localization', () => {
  const mockElement: ElementRef = new ElementRef(document.createElement('div'));

  it('should set decimal separator based on locale correctly', () => {
    const component = new NovoControlElement(mockElement, null, null, null as any, null, null as any, 'fr-FR');
    expect(component.locale).toBe('fr-FR');
    expect(component.decimalSeparator).toBe(',');
  });
});

@Component({
  template: ` <div></div> `,
})
class TestComponent {}
describe('NovoControlElement', () => {
  let component: NovoControlElement;
  let fixture: ComponentFixture<NovoControlElement>;
  beforeEach(() => {
    const elementRefStub = {
      nativeElement: { style: { height: {}, minHeight: {} }, scrollHeight: {} },
    };
    const changeDetectorRefStub = { markForCheck: () => ({}) };
    const novoLabelServiceStub = { invalidIntegerInput: {} };
    const dateFormatServiceStub = {};
    const fieldInteractionApiStub = { form: {}, currentKey: {} };
    const novoTemplateServiceStub = { getAll: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [NovoAutoSize, TestComponent, NovoControlElement],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NovoAutoSize,
        { provide: ElementRef, useValue: elementRefStub },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: NovoLabelService, useValue: novoLabelServiceStub },
        { provide: DateFormatService, useValue: dateFormatServiceStub },
        { provide: FieldInteractionApi, useValue: fieldInteractionApiStub },
        { provide: NovoTemplateService, useValue: novoTemplateServiceStub },
      ],
    });
    fixture = TestBed.createComponent(NovoControlElement);
    component = fixture.componentInstance;
  });

  it('should return false if the field has a MAX_LENGTH property but is not focused', () => {
    component.control = {
      key: 0,
    };
    component.form = {
      controls: [
        {
          maxLength: 1,
        },
      ],
    };
    const testBoolean = component.showCount;
    expect(testBoolean).toEqual(false);
  });

  it('should return true if the field has a MAX_LENGTH property and is focused', () => {
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          maxlength: 10,
          controlType: 'textbox',
        },
      },
    };
    (component as any).handleFocus(new FocusEvent('input'));
    const testBoolean = component.showCount;
    expect(testBoolean).toEqual(true);
  });

  it('should return false if the field does not have a MAX_LENGTH property and is focused', () => {
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          controlType: 'textbox',
        },
      },
    };
    (component as any).handleFocus(new FocusEvent('input'));
    const testBoolean = component.showCount;
    expect(testBoolean).toEqual(false);
  });

  it('should return false if the controlType of the field is not textbox, picker, or text-area', () => {
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          maxlength: 10,
          controlType: 'test',
        },
      },
    };
    (component as any).handleFocus(new FocusEvent('input'));
    const testBoolean = component.showCount;
    expect(testBoolean).toEqual(false);
  });

  describe('Function: handleEdit(value)', () => {   
    it('should emit edit event with passed in value', () => {
      spyOn(component.edit, 'emit');
      component.handleEdit('test');
      expect(component.edit.emit).toHaveBeenCalledWith('test');
    });
  });

  describe('Function: handleSave(value)', () => {   
    it('should emit save event with passed in value', () => {
      spyOn(component.save, 'emit');
      component.handleSave('test');
      expect(component.save.emit).toHaveBeenCalledWith('test');
    });
  });

  describe('Function: handleDelete(value)', () => {   
    it('should emit delete event with passed in value', () => {
      spyOn(component.delete, 'emit');
      component.handleDelete('test');
      expect(component.delete.emit).toHaveBeenCalledWith('test');
    });
  });

  describe('Function: handleUpload(value)', () => {   
    it('should emit upload event with passed in value', () => {
      spyOn(component.upload, 'emit');
      component.handleUpload('test');
      expect(component.upload.emit).toHaveBeenCalledWith('test');
    });
  });

  describe('Function: handleTyping(event)', () => {   
    it('should set focused and enteredText based on typing event', () => {
      component.handleTyping('entered text');
      expect(component.focused).toBeTruthy();
      expect((component as any)._enteredText).toEqual('entered text');
    });
    it('should set focused false if empty string entered', () => {
      component.handleTyping('');
      expect(component.focused).toBeFalsy();
      expect((component as any)._enteredText).toEqual('');
    });
    it('should set focused false if null or undefined passed in', () => {
      component.handleTyping(null);
      expect(component.focused).toBeFalsy();
      expect((component as any)._enteredText).toEqual(null);

      component.handleTyping(undefined);
      expect(component.focused).toBeFalsy();
      expect((component as any)._enteredText).toEqual(undefined);
    });
  });

  describe('Function: clearValue()', () => {   
    it('should set control value and formattedValue to null', () => {
      component.control = {
        key: 'newField',
      };
      component.form = {
        controls: {
          newField: {
            setValue: () => {},
          },
        },
      };
      spyOn(component.form.controls.newField, 'setValue');
      component.clearValue();
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(null);
      expect(component.formattedValue).toBeNull();
    });
  });
 
  describe('Function: handleTextAreaInput', () => {   
    it('should call emitChange and restrictKeys with passed in value', () => {
      spyOn(component, 'emitChange');
      spyOn(component, 'restrictKeys');
      const event: any = { text: 'test' };
      component.handleTextAreaInput(event);
      expect(component.emitChange).toHaveBeenCalledWith(event);
      expect(component.restrictKeys).toHaveBeenCalledWith(event);
    });
  });

  describe('Function: updateValidity', () => {
    beforeEach(() => {
      component.control = {
        key: 'newField',
      };
      component.form = {
        controls: {
          newField: {
            updateValueAndValidity: () => {},
          },
        },
      };
      spyOn(component.form.controls.newField, 'updateValueAndValidity');
    });

    it('should call control.updateValueAndValidity with an emitEvent variable - true', () => {
      component.updateValidity(true);
      expect(component.form.controls.newField.updateValueAndValidity).toHaveBeenCalledWith({ emitEvent: true });
    });
    it('should call control.updateValueAndValidity with an emitEvent variable - false', () => {
      component.updateValidity(false);
      expect(component.form.controls.newField.updateValueAndValidity).toHaveBeenCalledWith({ emitEvent: false });
    });
  });

  describe('Function: handleAddressChange', () => {
    beforeEach(() => {
      component.control = {
        config: {
          addressField: {
            maxlength: 3,
          },
        },
      };
    });
    it('should set itemCount, characterCountField and maxLength', () => {
      const addressData = {
        value: '12',
        field: 'addressField',
      };
      component.handleAddressChange(addressData);
      expect(component.itemCount).toEqual(2);
      expect((component as any).characterCountField).toEqual('addressField');
      expect(component.maxLength).toEqual(3);
      expect(component.showCount).toBeTruthy();
      expect((component as any).maxLengthMetErrorfields).toEqual([]);
    });
    it('should add field to maxLengthMetErrorfields if at maxLength', () => {
      const addressData = {
        value: '123',
        field: 'addressField',
      };
      component.handleAddressChange(addressData);
      expect((component as any).maxLengthMetErrorfields).toEqual(['addressField']);
    });
    it('should remove field from maxLengthMetErrorfields if below maxLength', () => {
      (component as any).maxLengthMetErrorfields = ['addressField', 'country'];
      const addressData = {
        value: '1',
        field: 'addressField',
      };
      component.handleAddressChange(addressData);
      expect((component as any).maxLengthMetErrorfields).toEqual(['country']);
    });
    it('should not update itemCount, characterCountField and maxLength if value is empty', () => {
      component.itemCount = 5;
      component.showCount = false;
      component.maxLength = 6;
      (component as any).characterCountField = 'state';
      const addressData = {
        value: null,
        field: 'addressField',
      };
      component.handleAddressChange(addressData);
      expect(component.itemCount).toEqual(5);
      expect((component as any).characterCountField).toEqual('state');
      expect(component.maxLength).toEqual(6);
      expect(component.showCount).toBeFalsy();
    });
  });

  describe('Function: handleTabForPickers', () => {
    beforeEach(() => {
      spyOn((component as any), 'toggleActive').and.callFake(() => {});
    });
    it('should call toggleActive with Escape key', () => {
      const event = {
        key: Key.Escape,
      };
      (component as any).active = true;
      component.handleTabForPickers(event);
      expect((component as any).toggleActive).toHaveBeenCalled();
    });
    it('should call toggleActive with Tab key', () => {
      const event = {
        key: Key.Tab,
      };
      (component as any).active = true;
      component.handleTabForPickers(event);
      expect((component as any).toggleActive).toHaveBeenCalled();
    });
    it('should not call toggleActive if not active', () => {
      const event = {
        key: Key.Tab,
      };
      (component as any).active = false;
      component.handleTabForPickers(event);
      expect((component as any).toggleActive).not.toHaveBeenCalled();
    });
    it('should not call toggleActive with a letter key', () => {
      const event = {
        key: 'T',
      };
      (component as any).active = true;
      component.handleTabForPickers(event);
      expect((component as any).toggleActive).not.toHaveBeenCalled();
    });
  });

  describe('Function: handlePercentChange()', () => {
    
    beforeEach(() => {
      component.control = {
        key: 'newField',
      };
      component.form = {
        controls: {
          newField: {
            setValue: () => {},
          },
        },
      };
      spyOn(component.form.controls.newField, 'setValue');
      spyOn(component.change, 'emit');
    });

    it('should emit change event and set control value with value made into a percent - target value', () => {
      const expected = 0.1;
      const event: any = {
        target: {
          value: 10,
        },
      };
      component.handlePercentChange(event);
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(expected);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
    });
    it('should emit change event and set control value with value made into a percent - data', () => {
      const expected = 0.5;
      const event: any = {
        target: {},
        data: 50,
      };
      component.handlePercentChange(event);
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(expected);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
    });
    it('should emit change event and set control value with null value', () => {
      const expected = null;
      const event: any = {
        target: {
          value: null,
        },
      };
      component.handlePercentChange(event);
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(expected);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
    });
    it('should emit change event and set control value with undefined value', () => {
      const expected = null;
      const event: any = {
        target: {},
        data: undefined,
      };
      component.handlePercentChange(event);
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(expected);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
    });
    it('should emit change event and set control value with NaN value', () => {
      const expected = 'notanumber';
      const event: any = {
        target: {
          value: 'notanumber',
        },
      };
      component.handlePercentChange(event);
      expect(component.form.controls.newField.setValue).toHaveBeenCalledWith(expected);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
    });
  });

  describe('Function: restrictKeys()', () => {
    const event: any = { 
      preventDefault: jasmine.any(Function),
    };

    beforeEach(() => {
      component.control = {
        key: 'newField',
      };
      component.form = {
        controls: {
          newField: {
            maxlength: 2,
          },
          numberField: {
            maxLength: 7,
            subType: 'number',
          },
          floatField: {
            maxLength: 7,
            subType: 'float',
          },
        },
      };
    });

    it('should call preventDefault if event value is greater than control max length', () => {
      event.target = {
        value: '123',
      };
      event.key = 2;
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should call preventDefault if the control is a number field and a non-number is entered', () => {
      event.key = 'T';
      component.control.key = 'numberField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should call preventDefault if the control is a float field and a non-number is entered (fr-FR)', () => {
      component.locale = 'fr-FR';
      event.key = 'T';
      component.control.key = 'floatField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should not call preventDefault if the control is a float field and a . is entered (fr-FR)', () => {
      component.locale = 'fr-FR';
      event.key = ',';
      component.control.key = 'floatField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should call preventDefault if the control is a float field and a non-number is entered (en-US)', () => {
      component.locale = 'en-US';
      event.key = 'T';
      component.control.key = 'floatField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should not call preventDefault if the control is a float field and a . is entered (en-US)', () => {
      component.locale = 'en-US';
      event.key = '.';
      component.control.key = 'floatField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should not call preventDefault if the control is a float field and a utility key is entered', () => {
      event.key = 'Delete';
      component.control.key = 'floatField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should not call preventDefault if the control is a number field and a utility key is entered', () => {
      event.key = 'Backspace';
      component.control.key = 'numberField';
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should not call preventDefault if event value is less than control max length', () => {
      event.target = {
        value: '1',
      };
      event.key = 2;
      spyOn(event, 'preventDefault');
      component.restrictKeys(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Function: validateIntegerInput()', () => {
    beforeEach(() => {
      component.control = {
        key: 'numberField',
      };
      component.form = {
        controls: {
          numberField: {
            subType: 'number',
            markAsInvalid: () => {},
            value: 'T',
            label: 'Number',
          },
        },
      };
      component.labels.invalidIntegerInput = 'Invalid Field';
      spyOn(component.form.controls.numberField, 'markAsInvalid');
    });
    it('should mark control as invalid if a non-number is entered', () => {
      const expected = 'Invalid Field NUMBER';
      component.validateIntegerInput();
      expect(component.form.controls.numberField.markAsInvalid).toHaveBeenCalledWith(expected);
    });
    it('should notmark control as invalid if a non-number is entered', () => {
      component.form.controls.numberField.value = 2;
      component.validateIntegerInput();
      expect(component.form.controls.numberField.markAsInvalid).not.toHaveBeenCalled();
    });
  });

  describe('Function: validateNumberOnBlur()', () => {
    const event: any = { focus: true };

    beforeEach(() => {
      spyOn(component, 'validateIntegerInput');
      component.form = {
        controls: {
          numberField: {
            subType: 'number',
          },
          textField: {
            subType: 'text',
          },
        },
      };
    });

    it('should call validateIntegerInput if the control is a number', () => {
      component.control = {
        key: 'numberField',
      };
      component.validateNumberOnBlur(event);
      expect(component.validateIntegerInput).toHaveBeenCalled();
    });
    it('should not call validateIntegerInput if the control is not a number', () => {
      component.control = {
        key: 'textField',
      };
      component.validateNumberOnBlur(event);
      expect(component.validateIntegerInput).not.toHaveBeenCalled();
    });
    it('should clear focusedField, set focused and showCount to false and emit a blur event', () => {
      spyOn((component as any)._blurEmitter, 'emit');
      component.control = {
        key: 'numberField',
      };
      component.validateNumberOnBlur(event);
      expect(component.focusedField).toEqual('');
      expect(component.focused).toBeFalsy();
      expect(component.showCount).toBeFalsy();
      expect((component as any)._blurEmitter.emit).toHaveBeenCalledWith(event);
    });
  });

  describe('Function: modelChange(value)', () => {   
    it('should emit change event with passed in value', () => {
      spyOn(component.change, 'emit');
      component.modelChange('test');
      expect(component.change.emit).toHaveBeenCalledWith('test');
    });
    it('should set focused to false and set entered text to empty string if empty value is entered', () => {
      component.modelChange(null);
      expect((component as any)._enteredText).toEqual('');
      expect(component.focused).toBeFalsy();
    });
  });

  describe('Function: modelChangeWithRaw()', () => {
    beforeEach(() => {
      spyOn(component, 'validateIntegerInput');
      component.form = {
        controls: {
          numberField: {
            subType: 'number',
          },
          pickerField: {
            controlType: 'picker',
            maxlength: 4,
          },
        },
      };
    });

    it('should set cotnrol rawValue and emit change event', () => {
      const event = {
        value: 1,
        rawValue: 1,
      };
      component.control = {
        key: 'numberField',
      };
      const expected = 1;
      spyOn(component.change, 'emit');
      component.modelChangeWithRaw(event);
      expect(component.change.emit).toHaveBeenCalledWith(expected);
      expect(component.form.controls.numberField.rawValue).toEqual(expected);
    });
    it('should set item count and maxLengthMet (false) based on entered length for pickers', () => {
      const event = {
        value: [{ id: 1 }, { id: 2 }],
        rawValue: [{ id: 1 }, { id: 2 }],
      };
      component.control = {
        key: 'pickerField',
      };
      component.modelChangeWithRaw(event);
      expect(component.itemCount).toEqual(2);
      expect(component.maxLengthMet).toBeFalsy();
    });
    it('should set item count and maxLengthMet (true) based on entered length for pickers', () => {
      const event = {
        value: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        rawValue: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      };
      component.control = {
        key: 'pickerField',
      };
      component.modelChangeWithRaw(event);
      expect(component.itemCount).toEqual(4);
      expect(component.maxLengthMet).toBeTruthy();
    });
    it('should set item count to 0 when evnet value is empty for pickers', () => {
      const event = {
        value: null,
        rawValue: null,
      };
      component.control = {
        key: 'pickerField',
      };
      component.modelChangeWithRaw(event);
      expect(component.itemCount).toEqual(0);
    });
    it('should set focused to false and set entered text to empty string if empty value is entered', () => {
      const event = {
        value: null,
        rawValue: null,
      };
      component.control = {
        key: 'numberField',
      };
      component.modelChangeWithRaw(event);
      expect((component as any)._enteredText).toEqual('');
      expect(component.focused).toBeFalsy();
    });
  });

  describe('Function: handleFocus()', () => {
    const event: any = {};
    beforeEach(() => {
      component.control = {
        key: 'pickerField',
      };
      component.form = {
        getRawValue: () => {
          return { addressField: { city: 'Chicago' } };
        },
        controls: {
          addressField: {
            controlType: 'address',
          },
          pickerField: {
            controlType: 'picker',
          },
        },
      };
      spyOn(component, 'handleAddressChange');
    });
    it('should set focused to true and set passed in field as focused field', () => {
      spyOn((component as any)._focusEmitter, 'emit');
      const field = 'pickerField';
      component.handleFocus(event, field);
      expect((component as any)._focused).toBeTruthy();
      expect(component.focusedField).toEqual(field);
      expect((component as any)._focusEmitter.emit).toHaveBeenCalledWith(event);
    });
    it('should set showCount true if it is a character count field', () => {
      component.showCount = false;
      const field = 'pickerField';
      (component as any).characterCountField = field;
      component.handleFocus(event, field);
      expect(component.showCount).toBeTruthy();
    });
    it('should call handleAddressChange for address fields if they have data', () => {
      component.control.key = 'addressField';
      const field = 'city';
      const expected = {
        field,
        value: 'Chicago',
      };
      component.handleFocus(event, field);
      expect(component.handleAddressChange).toHaveBeenCalledWith(expected);
    });
    it('should not call handleAddressChange for address fields if they have no data', () => {
      component.control.key = 'addressField';
      const field = 'state';
      component.handleFocus(event, field);
      expect(component.handleAddressChange).not.toHaveBeenCalled();
    });
    it('should not call handleAddressChange for non-address fields if they have data', () => {
      component.control.key = 'pickerField';
      const field = 'city';
      component.handleFocus(event, field);
      expect(component.handleAddressChange).not.toHaveBeenCalled();
    });
  });

  describe('Getter: requiresExtraSpacing', () => {
    beforeEach(() => {
      component.control = {
        key: 'pickerField',
      };
      component.form = {
        getRawValue: () => {
          return { pickerField: [1] };
        },
        controls: {
          pickerField: {
            controlType: 'picker',
            maxlength: 4,
            multiple: true,
          },
        },
      };
    });
    it('should return true if control is a picker, can have multiple and hasValue', () => {
      expect(component.requiresExtraSpacing).toBeTruthy();
    });
    it('should return false if cannot have multiple values', () => {
      component.form.controls.pickerField.multiple = false;
      expect(component.requiresExtraSpacing).toBeFalsy();
    });
    it('should return false if control is not a picker', () => {
      component.form.controls.pickerField.controlType = 'text';
      expect(component.requiresExtraSpacing).toBeFalsy();
    });
    it('should return false if hasValue is false', () => {
      component.form.getRawValue = () => { return {}; };
      expect(component.requiresExtraSpacing).toBeFalsy();
    });
  });

  describe('Getter: alwaysActive', () => {
    beforeEach(() => {
      component.form = {
        controls: {
          pickerField: {
            controlType: 'picker',
          },
          alwaysActiveField: {
            controlType: 'text',
            alwaysActive: true,
          },
          customField: {
            controlType: 'custom',
          },
          textFieldNotActive: {
            controlType: 'text',
            alwaysActive: false,
          },
        },
      };
    });
    it('should return true if control is a picker and has entered text', () => {
      component.control = {
        key: 'pickerField',
      };
      (component as any)._enteredText = 'text';
      expect(component.alwaysActive).toBeTruthy();
    });
    it('should return true if control has alwaysActive true', () => {
      component.control = {
        key: 'alwaysActiveField',
      };
      expect(component.alwaysActive).toBeTruthy();
    });
    it('should return true for custom controls', () => {
      component.control = {
        key: 'customField',
      };
      expect(component.alwaysActive).toBeTruthy();
    });
    it('should return false for non alwaysActive text fields', () => {
      component.control = {
        key: 'textFieldNotActive',
      };
      expect(component.alwaysActive).toBeFalsy();
    });
  });


  describe('Getters: removeTooltipArrow, tooltipPreline, tooltipSize, tooltipPosition', () => {
    beforeEach(() => {
      component.form = {
        controls: {
          hasValuesField: {
            controlType: 'picker',
            removeTooltipArrow: true,
            tooltipPreline: true,
            tooltipSize: '12',
            tooltipPosition: 'left',
          },
          emptyField: {
            controlType: 'picker',
            removeTooltipArrow: null,
            tooltipPreline: null,
            tooltipSize: null,
            tooltipPosition: null,

          },
        },
      };
    });
    it('should return value if values on control are not empty', () => {
      component.control = {
        key: 'hasValuesField',
      };
      expect(component.removeTooltipArrow).toBeTruthy();
      expect(component.tooltipPreline).toBeTruthy();
      expect(component.tooltipSize).toEqual('12');
      expect(component.tooltipPosition).toEqual('left');
    });
    it('should return defaults if values on control are empty', () => {
      component.control = {
        key: 'emptyField',
      };
      expect(component.removeTooltipArrow).toBeFalsy();
      expect(component.tooltipPreline).toBeFalsy();
      expect(component.tooltipSize).toEqual('');
      expect(component.tooltipPosition).toEqual('right');
    });
  });

  describe('Getter: maxlengthMetField', () => {
    it('should return the focused field if it is at max legnth already', () => {
      const field = 'textField';
      (component as any).maxLengthMetErrorfields = [field];
      component.focusedField = field;
      expect(component.maxlengthMetField).toEqual(field);
    });
    it('should return empty string if the focused field is not at max length', () => {
      (component as any).maxLengthMetErrorfields = ['numberField'];
      component.focusedField = 'textField';
      expect(component.maxlengthMetField).toEqual('');
    });
    it('should return empty string if not fields at max length', () => {
      (component as any).maxLengthMetErrorfields = [];
      component.focusedField = 'textField';
      expect(component.maxlengthMetField).toEqual('');
    });
  });

  describe('Getter: maxlengthErrorField', () => {
    beforeEach(() => {
      component.form = {
        controls: {
          hasErrorsField: {
            errors: {
              maxlengthFields: ['textField'],
            },
          },
          emptyField: {
            errors: {
              maxlengthFields: [],
            },
          },
        },
      };
    });
    it('should return the focused field if it is at max legnth already', () => {
      component.control = {
        key: 'hasErrorsField',
      };
      const field = 'textField';
      component.focusedField = field;
      expect(component.maxlengthErrorField).toEqual(field);
    });
    it('should return empty string if the focused field is not at max length', () => {
      component.control = {
        key: 'hasErrorsField',
      };
      component.focusedField = 'numberField';
      expect(component.maxlengthErrorField).toEqual('');
    });
    it('should return empty string if no fields at max length', () => {
      component.control = {
        key: 'emptyField',
      };
      component.focusedField = 'numberField';
      expect(component.maxlengthErrorField).toEqual('');
    });
  });

  describe('Getter: showFieldMessage', () => {
    beforeEach(() => {
      component.form = {
        controls: {
          hasErrorsField: {
            errors: {
              maxlengthFields: ['textField'],
            },
          },
          emptyField: {
            errors: null,
          },
        },
      };
    });
    it('should return true if there are no errors, max length is not met and the control has no description', () => {
      component.control = {
        key: 'emptyField',
        description: undefined,
      };
      component.maxLengthMet = false;
      expect(component.showFieldMessage).toBeTruthy();
    });
    it('should return false if there are errors', () => {
      component.control = {
        key: 'hasErrorsField',
        description: undefined,
      };
      component.maxLengthMet = false;
      expect(component.showFieldMessage).toBeFalsy();
    });
    it('should return false if max length is met', () => {
      component.control = {
        key: 'emptyField',
        description: undefined,
      };
      component.maxLengthMet = true;
      expect(component.showFieldMessage).toBeFalsy();
    });
    it('should return false the control has a description', () => {
      component.control = {
        key: 'emptyField',
        description: 'description',
      };
      component.maxLengthMet = false;
      expect(component.showFieldMessage).toBeFalsy();
    });
  });

});

// While this is a laborious thing to set up individually on tests, it could be worthwhile to find a way to automatically apply this to other fixtures
class ErrorNet extends ErrorHandler {

  handleError(error: any): void {
    super.handleError(error);
    fail(`Hit error handler: ${error.stack}`);
  }
}

@Component({
  selector: 'novo-control-templates-test',
  template: `
  <novo-control-templates></novo-control-templates>
  <div *ngIf="templatesReady">
    <novo-control (change)="change.emit($event)" (focus)="focus.emit($event)" (blur)="blur.emit($event)" [form]="form" [control]="control"></novo-control>
  </div>
  `,
  providers: [{
    provide: ErrorHandler,
    useClass: ErrorNet
  }]
})
class TestComponent2 implements OnInit {
  templatesReady = false;
  form: NovoFormGroup;

  change = new EventEmitter<any>();
  focus = new EventEmitter<FocusEvent>();
  blur = new EventEmitter<Event>();

  control: BaseControl;
  
  constructor(private formUtils: FormUtils, @Inject(ErrorHandler) private net: ErrorNet) { }

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([this.control]);
  }
}

describe('Novo Control with Templates', () => {
  let fixture: ComponentFixture<TestComponent2>;
  let testComponent: TestComponent2;
  let component: NovoControlElement;

  const fieldInteractionApiStub = { form: {}, currentKey: {} };

  beforeEach(async () => {
    try {
      await TestBed.configureTestingModule({
        imports: [OverlayModule, NovoElementsModule, IMaskModule],
        declarations: [TestComponent2, NovoControlElement, NovoControlTemplates, NovoTemplate],
        providers: [NovoTemplateService, FormUtils, NovoLabelService, OptionsService, DateFormatService,
          {
            provide: FieldInteractionApi,
            useValue: fieldInteractionApiStub
          },
          {
            provide: ErrorHandler,
            useClass: ErrorNet
          }
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent2);
      testComponent = fixture.debugElement.componentInstance;
    } catch(err) {
      debugger;
    }
  });

  function makeControl(control: BaseControl) {
    try {
      testComponent.control = control;
      fixture.detectChanges();
      testComponent.templatesReady = true;
      fixture.detectChanges();
      component = fixture.debugElement.query(By.directive(NovoControlElement)).componentInstance;
      // Temp fix for a Zone.js bug: ngAfterContentInit has already run, but it used an incorrect zone setup, and does not run registered timeouts on the next tick.
      // Calling ngAfterContentInit directly, from this zone context, causes it to run fine, but doesn't match browser execution flow.
      // In the case of this test, we won't have harm in running it twice, but we are in need of a fix that correctly runs these.
      component.ngAfterContentInit();
      tick();
      fixture.detectChanges();
    } catch(err) {
      console.error(err);
      fail('could not set up Control fixture');
    }
  }

  describe('Text template', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({ key: 'text', label: 'Text Box'}));
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));
  

    it('should finish readying templates', inject([NovoTemplateService], (templateService: NovoTemplateService) => {
      expect(Object.keys(templateService.getAll()).length).toBeGreaterThan(20);
      expect(component.loading).toBeFalsy();
    }));


    // TODO: What should the (change) event value be? On text values it appears to be the { KeyboardEvent }. On chips, it will be the value.
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toBe(changeEvent);
    });

    it('should receive focus event', () => {
      const focusEvt = { };
      let lastEvt: any;
      testComponent.focus.subscribe(e => lastEvt = e);
      inputDebug.triggerEventHandler('focus', focusEvt);
      expect(lastEvt).toBe(focusEvt);
    });

    it('should receive blur event', () => {
      const blurEvt = { };
      let lastEvt: any;
      testComponent.blur.subscribe(e => lastEvt = e);
      inputDebug.triggerEventHandler('blur', blurEvt);
      expect(lastEvt).toBe(blurEvt);
    });
  });

  describe('Text template - Maxlength', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({ key: 'text', label: 'Text Box', maxlength: 20 }));
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));

    it('should prevent changes beyond maxlength', () => {
      expect(inputDebug.query(By.css('.error-text'))).toBeFalsy();
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.nativeElement.value = 'this string is over 20 characters long';
      inputDebug.triggerEventHandler('focus', {});
      inputDebug.triggerEventHandler('input', changeEvent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.error-text'))).toBeTruthy();
    });
  });

  describe('Text template - Mask', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({
        key: 'text',
        label: 'Text Box',
        maskOptions: {
          mask: /1?2?3?4?5?/,
          keepCharPositions: true,
          guide: true
        },
        textMaskEnabled: true
      }));
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));
  

    it('should finish readying templates', inject([NovoTemplateService], (templateService: NovoTemplateService) => {
      expect(Object.keys(templateService.getAll()).length).toBeGreaterThan(20);
      expect(component.loading).toBeFalsy();
    }));


    it('should ignore native change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toBeFalsy();
    });

    it('should respond to imask "accept" event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent = '12345';
      inputDebug.triggerEventHandler('accept', changeEvent);
      expect(lastChange).toBe(changeEvent);
    });
  });

  describe('Picker (Multiple) Control', () => {
    let chipsDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new PickerControl({
        key: 'chips',
        label: 'Chips Picker',
        multiple: true,
        config: {
          options: ['a', 'b', 'c']
        }
      }));
      chipsDebug = fixture.debugElement.query(By.css('novo-chips'));
    }));

    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      // add 'b' to chips
      const changeEvent: any = { value: ['b'], rawValue: ['a'] };

      chipsDebug.triggerEventHandler('changed', changeEvent);
      expect(lastChange).toEqual(['b']);
    });
  });

  describe('DatePicker Control', () => {
    let datePickerDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new DateControl({
        key: 'datetime',
        label: 'Date picker',
      }));
      datePickerDebug = fixture.debugElement.query(By.css('novo-date-picker-input'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = new Date();
      datePickerDebug.triggerEventHandler('changeEvent', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  // address does not emit its change event. This might be a bug.
  xdescribe('Address Control', () => {
    let addressDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new AddressControl({
        key: 'address',
        label: 'Address entry',
      }));
      addressDebug = fixture.debugElement.query(By.css('novo-address'));
    }));
    
    it('should receive change event?', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = '123 Fake St';
      addressDebug.triggerEventHandler('change', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  // checkbox does not emit its change event. This might be a bug.
  xdescribe('Checkbox Control', () => {
    let checkboxDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CheckboxControl({
        key: 'checkbox',
        label: 'True/False',
      }));
      checkboxDebug = fixture.debugElement.query(By.css('novo-checkbox'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = true;
      checkboxDebug.triggerEventHandler('change', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  describe('Checklist Control', () => {
    let checklistDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CheckListControl({
        key: 'checkbox',
        label: 'To Do',
      }));
      checklistDebug = fixture.debugElement.query(By.css('novo-check-list'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = { selected: ['tom', 'dick', 'harry']};
      checklistDebug.triggerEventHandler('onSelect', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  describe('Native Input Control', () => {
    let nativeInputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CustomControl({
        key: 'native-input',
        template: 'native-input',
        type: 'native-input',
        maxlength: 20
      }));
      nativeInputDebug = fixture.debugElement.query(By.css('input'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = { type: 'input', target: nativeInputDebug.nativeElement };
      nativeInputDebug.nativeElement.value = 'changed';
      nativeInputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toEqual(changeEvent);
    });
  });
});