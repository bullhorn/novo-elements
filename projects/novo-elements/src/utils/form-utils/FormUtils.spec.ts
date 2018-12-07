// NG2
import { FormGroup } from '@angular/forms';
import { TestBed, async, inject } from '@angular/core/testing';
// Vendor
import { from } from 'rxjs';
// APP
import {
  AddressControl,
  CheckListControl,
  CheckboxControl,
  DateControl,
  DateTimeControl,
  EditorControl,
  FileControl,
  PickerControl,
  RadioControl,
  SelectControl,
  TextAreaControl,
  TextBoxControl,
  TilesControl,
  TimeControl,
} from '../../elements/form/FormControls';
import { FormUtils } from './FormUtils';
import { NovoFormControl } from '../../elements/form/NovoFormControl';
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from '../../services/options/OptionsService';
import { FormField } from '../../elements/form/FormInterfaces';

/**
 * Creates a mock address
 */
function createAddress(address1, city, state, zip, countryName) {
  if (!countryName) {
    return {
      countryName: 'US',
    };
  }
  return {
    address1: address1,
    city: city,
    state: state,
    zip: zip,
    countryName: countryName,
  };
}

describe('Utils: FormUtils', () => {
  let formUtils;

  beforeEach(async(() => {
    let optionsService = {
      getOptionEntity: () => {
        return '';
      },
      getLabels: () => {
        return new Promise((resolve) => {
          resolve({});
        });
      },
      getOptionsConfig: () => {
        return {};
      },
    };
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FormUtils,
          useFactory: (labelService, optionsService) => {
            return new FormUtils(labelService, optionsService);
          },
          deps: [NovoLabelService, OptionsService],
        },
        NovoLabelService,
        OptionsService,
      ],
    });
  }));

  beforeEach(inject([FormUtils], (_service) => {
    formUtils = _service;
  }));
  describe('Method: toFormGroup(controls)', () => {
    it('should create a FormGroup from a collection of controls.', () => {
      expect(formUtils.toFormGroup).toBeDefined();
      let mockControls: Array<any> = [{ key: 'Test' }];
      let result = formUtils.toFormGroup(mockControls);
      expect(result instanceof FormGroup).toBe(true);
      expect(result.controls.Test).toBeDefined();
      expect(result.controls.Test instanceof NovoFormControl).toBe(true);
    });
  });

  describe('Method: addControls(formGroup, controls)', () => {
    it('should add controls to a form group.', () => {
      expect(formUtils.addControls).toBeDefined();
      let formGroup: FormGroup = formUtils.toFormGroup([{ key: 'Test' }]);
      formUtils.addControls(formGroup, [{ key: 'Test2' }]);
      // Can't use `.Test2` because the formGroup isn't returned
      expect(formGroup.controls['Test2']).toBeDefined();
      expect(formGroup.controls['Test2'] instanceof NovoFormControl).toBe(true);
    });
  });

  describe('Method: toFormGroupFromFieldset(fieldsets)', () => {
    it('should create FormGroups from a collection of FieldSets that contain controls.', () => {
      expect(formUtils.toFormGroup).toBeDefined();
      let mockControls: Array<any> = [{ key: 'Test' }];
      let fieldSet = formUtils.toFormGroupFromFieldset([{ title: 'Test', controls: mockControls }]);
      expect(fieldSet.controls.Test).toBeDefined();
      expect(fieldSet.controls.Test instanceof NovoFormControl).toBe(true);
    });
  });

  describe('Method: determineInputType(field)', () => {
    it('should return the type of dates correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'DATETIME' })).toBe('datetime');
    });
    it('should return the type of times correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'TIME' })).toBe('time');
    });
    it('should return the type of money correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'MONEY' })).toBe('currency');
    });
    it('should return the type of percents correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'PERCENTAGE' })).toBe('percentage');
    });
    it('should return the type of HTML correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'HTML' })).toBe('editor');
    });
    it('should return the type of year correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataSpecialization: 'YEAR' })).toBe('year');
    });
    it('should return the type of editor minimal correctly', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'HTML-MINIMAL' })).toEqual('editor-minimal');
    });
    it('should return the type of timestamps correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataType: 'Timestamp' })).toBe('date');
    });
    it('should return the type of booleans correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataType: 'Boolean' })).toBe('tiles');
    });
    it('should return the type of textarea correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'TEXTAREA' })).toBe('textarea');
    });
    it('should return the type of checklists correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'CHECKBOX', options: 1, multiValue: true })).toBe('checklist');
      expect(formUtils.determineInputType({ inputType: 'RADIO', options: 1, multiValue: true })).toBe('checklist');
    });
    it('should return the type of radio correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'RADIO', options: 1, multiValue: false })).toBe('radio');
      expect(formUtils.determineInputType({ inputType: 'CHECKBOX', options: 1, multiValue: false })).toBe('radio');
    });
    it('should return the type of chips correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'SELECT', options: [], multiValue: true })).toBe('chips');
    });
    it('should return the type of select correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'SELECT', options: 1, multiValue: false })).toBe('select');
    });
    it('should return the type of doubles/decimals correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataType: 'Double' })).toBe('float');
      expect(formUtils.determineInputType({ dataType: 'BigDecimal' })).toBe('float');
    });
    it('should return the type of tiles select correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ inputType: 'TILES', options: 1, multiValue: false })).toBe('tiles');
    });
    it('should return the type of address correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ type: 'COMPOSITE' })).toBe('address');
    });
    it('should return the type of number correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ dataType: 'Integer' })).toBe('number');
    });
    it('should return the type of file correctly.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(formUtils.determineInputType({ type: 'file' })).toBe('file');
    });
    describe('TO_MANY field types', () => {
      const toManyField: FormField = {
        type: 'TO_MANY',
        multiValue: null,
        dataType: 'fake',
        options: 'fake',
        inputType: 'fake',
        dataSpecialization: 'fake',
      };

      describe('without associated entity', () => {
        it('when allow multiple is disabled should return picker', () => {
          expect(formUtils.determineInputType({ ...toManyField, multiValue: false })).toBe('picker');
        });
        it('when allow multiple is enabled should return chips', () => {
          expect(formUtils.determineInputType({ ...toManyField, multiValue: true })).toBe('chips');
        });
      });
      describe('with associated entity', () => {
        beforeEach(() => {
          jest.spyOn(formUtils, 'hasAssociatedEntity').mockImplementation(() => true);
        });
        it('when allow multiple is disabled should return entitypicker', () => {
          const field: FormField = { ...toManyField, multiValue: false };
          expect(formUtils.determineInputType(field)).toBe('entitypicker');
        });
        it('when allow multiple is enabled should return entitychips', () => {
          const field: FormField = { ...toManyField, multiValue: true };
          expect(formUtils.determineInputType(field)).toBe('entitychips');
        });
      });
    });
    xit('should throw an error when a type does not exist for the field.', () => {
      expect(formUtils.determineInputType).toBeDefined();
      expect(() => {
        formUtils.determineInputType({});
      }).toThrowError('This field type is unsupported.');
    });
  });

  describe('Method: getControlForField(field, http, config)', () => {
    xit('should return the right component for entitychips', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'entitychips' });
      expect(result instanceof PickerControl).toBe(true);
    });
    xit('should return the right component for entitypicker', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'entitypicker' });
      expect(result instanceof PickerControl).toBe(true);
    });
    it('should return the right component for picker', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'picker' });
      expect(result instanceof PickerControl).toBe(true);
    });
    it('should return the right component for datetime', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'datetime' });
      expect(result instanceof DateTimeControl).toBe(true);
    });
    it('should return the right component for date', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'date' });
      expect(result instanceof DateControl).toBe(true);
    });
    it('should return the right component for time', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'time' });
      expect(result instanceof TimeControl).toBe(true);
    });
    it('should return the right component for currency', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'currency' });
      expect(result instanceof TextBoxControl).toBe(true);
    });
    it('should return the right component for text', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'text' });
      expect(result instanceof TextBoxControl).toBe(true);
    });
    it('should return the right component for textarea', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'textarea' });
      expect(result instanceof TextAreaControl).toBe(true);
    });
    it('should return the right component for editor', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'editor' });
      expect(result instanceof EditorControl).toBe(true);
    });
    it('should return the right component for tiles', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'tiles' });
      expect(result instanceof TilesControl).toBe(true);
    });
    it('should return the right component for checkbox', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'checkbox' });
      expect(result instanceof CheckboxControl).toBe(true);
    });
    it('should return the right component for checklist', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'checklist' });
      expect(result instanceof CheckListControl).toBe(true);
    });
    it('should return the right component for radio', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'radio' });
      expect(result instanceof RadioControl).toBe(true);
    });
    it('should return the right component for select', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'select' });
      expect(result instanceof SelectControl).toBe(true);
    });
    it('should return the right component for editor minimal', () => {
      let result = formUtils.getControlForField({ type: 'editor-minimal' });
      expect(result instanceof EditorControl).toBeTruthy();
    });
    describe('with type: address', () => {
      it('should return the right component for address', () => {
        expect(formUtils.getControlForField).toBeDefined();
        let result = formUtils.getControlForField({ type: 'address' });
        expect(result instanceof AddressControl).toBe(true);
      });
      it('should set the right defaults for address sub-fields', () => {
        expect(formUtils.getControlForField).toBeDefined();
        let result = formUtils.getControlForField({
          type: 'address',
          fields: [
            {
              name: 'address1',
              defaultValue: '100 Summer St',
            },
            {
              name: 'address2',
              defaultValue: 'apt 25',
            },
            {
              name: 'city',
              defaultValue: 'Boston',
            },
            {
              name: 'state',
              defaultValue: 'MA',
            },
            {
              name: 'zip',
              defaultValue: '2222',
            },
            {
              name: 'countryID',
              defaultValue: 2260,
            },
          ],
        });
        expect(result.value).toEqual({
          address1: '100 Summer St',
          address2: 'apt 25',
          city: 'Boston',
          state: 'MA',
          zip: '2222',
          countryID: 2260,
        });
      });
    });
    it('should return the right component for file', () => {
      expect(formUtils.getControlForField).toBeDefined();
      let result = formUtils.getControlForField({ type: 'file' });
      expect(result instanceof FileControl).toBe(true);
    });
  });

  describe('Method: toControls(meta, currencyFormat, http, config)', () => {
    it('should be defined', () => {
      expect(formUtils.toControls).toBeDefined();
      formUtils.toControls({ dataSpecialization: 'DATETIME' });
    });
  });

  describe('Method: toFieldSets(meta, currencyFormat, http, config, overrides)', () => {
    it('should be defined', () => {
      expect(formUtils.toFieldSets).toBeDefined();
      formUtils.toFieldSets();
    });

    it('should return an array of fieldsets with a title, icon and controls', () => {
      let meta = {
        entity: 'ENTITY_NAME',
        label: 'ENTITY_LABEL',
        fields: [
          {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
            sortOrder: 10,
            maxLength: 10,
            description: 'First Name, Yo!',
          },
        ],
        sectionHeaders: [
          {
            label: 'Header',
            name: 'header',
            sortOrder: 0,
            enabled: true,
            icon: 'bhi-certification',
          },
        ],
      };
      let fieldset = formUtils.toFieldSets(meta, 'USD', {}, {}, {});
      expect(fieldset[0].title).toBe('Header');
      expect(fieldset[0].icon).toBe('bhi-certification');
      expect(fieldset[0].controls.length).toBe(1);
    });
  });

  describe('Method: getControlOptions(field, http, config)', () => {
    it('should return an array of options for booleans', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      formUtils.getControlOptions({ dataType: 'Boolean' });
    });
    it('should return an object with a function that returns a promise when there is an optionsUrl', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      let result = formUtils.getControlOptions({ optionsUrl: 'TEST' });
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
      expect(result.options('') instanceof Promise).toBe(true);
      result.options('').then((returnValue) => {
        expect(returnValue.length).toBe(0);
      });
    });
    it('should return an object with a function that returns a promise when there is an optionsUrl that calls an API', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      let mockHttp = {
        get: () => {
          return from([]);
        },
      };
      let result = formUtils.getControlOptions({ optionsUrl: 'TEST' }, mockHttp, { token: '1' });
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
      expect(result.options('') instanceof Promise).toBe(true);
      result.options('query').then((returnValue) => {
        expect(returnValue.length).toBe(0);
      });
    });
    it('should return an object with an array, label, and format for chips', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      let result = formUtils.getControlOptions({ type: 'chips', options: [1] });
      expect(result.options.length).toBe(1);
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
    });
    it('should return an array when options is an array', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      let result = formUtils.getControlOptions({ dataSpecialization: 'DATETIME' });
    });
  });

  describe('Method: setInitialValues(controls, values, keepClean)', () => {
    it('should be defined', () => {
      expect(formUtils.setInitialValues).toBeDefined();
      formUtils.setInitialValues([]);
    });
  });

  describe('Method: setInitialValuesFieldsets(fieldsets, values, keepClean)', () => {
    it('should be defined', () => {
      expect(formUtils.setInitialValuesFieldsets).toBeDefined();
      formUtils.setInitialValuesFieldsets([]);
    });
  });

  describe('Method: forceShowAllControls(controls)', () => {
    it('should be defined', () => {
      expect(formUtils.forceShowAllControls).toBeDefined();
      formUtils.forceShowAllControls([{ hidden: true }]);
    });
  });

  describe('Method: forceShowAllControlsInFieldsets(fieldsets)', () => {
    it('should be defined', () => {
      expect(formUtils.forceShowAllControlsInFieldsets).toBeDefined();
      formUtils.forceShowAllControlsInFieldsets([]);
    });
  });

  describe('Method: forceValidation(form)', () => {
    it('should be defined', () => {
      expect(formUtils.forceValidation).toBeDefined();
      formUtils.forceValidation({ controls: [] });
    });
  });

  describe('Method: isAddressEmpty(control: any): boolean', () => {
    let control: any;
    beforeEach(() => {
      control = {
        dirty: true,
        config: {
          address1: {
            label: 'address1',
            required: true,
            maxlength: 5,
          },
          countryID: {
            label: 'country',
            required: true,
            updated: true,
          },
          state: {
            required: false,
            pickerConfig: {
              defaultOptions: ['MA'],
            },
          },
        },
      };
    });
    it('should be defined', () => {
      expect(formUtils.isAddressEmpty).toBeDefined();
    });
    it('should return false if no value', () => {
      expect(formUtils.isAddressEmpty(control)).toBe(true);
    });
    it('should return true if valid', () => {
      control.value = createAddress('TEST', 'TEST', 'TEST', '12345', 'TEST');
      expect(formUtils.isAddressEmpty(control)).toBe(true);
    });
    it('should return invalid if no address1', () => {
      control.value = createAddress('', 'TEST', 'TEST', '12345', 'TEST');
      expect(formUtils.isAddressEmpty(control)).toEqual(false);
    });
    it('should return invalid if no countryName', () => {
      control.value = createAddress('TEST', 'TEST', 'TEST', '12345', null);
      expect(formUtils.isAddressEmpty(control)).toEqual(false);
    });
    it('should return null if no state', () => {
      control.value = createAddress('TEST', 'TEST', '', '12345', 'null');
      expect(formUtils.isAddressEmpty(control)).toEqual(true);
    });
    it('should return true if state is empty and there are no state options available', () => {
      control.value = createAddress('TESTLENGTH', 'TEST', '', '12345', 'null');
      control.config.state.pickerConfig = {
        defaultOptions: [],
      };
      expect(formUtils.isAddressEmpty(control)).toEqual(true);
    });
  });
});
