// NG2
import { async, inject, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
// Vendor
import { from } from 'rxjs';
// APP
import {
  AddressControl,
  CheckboxControl,
  CheckListControl,
  DateControl,
  DateTimeControl,
  EditorControl,
  FileControl,
  NovoControlConfig,
  PickerControl,
  RadioControl,
  SelectControl,
  SwitchControl,
  TextAreaControl,
  TextBoxControl,
  TilesControl,
  TimeControl,
} from '../../elements/form/FormControls';
import { FormField } from '../../elements/form/FormInterfaces';
import { NovoFormControl } from '../../elements/form/NovoFormControl';
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from '../../services/options/OptionsService';
import { FormUtils } from './FormUtils';

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
    address1,
    city,
    state,
    zip,
    countryName,
  };
}

describe('Utils: FormUtils', () => {
  let formUtils;

  beforeEach(async(() => {
    const optionsService = {
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
      const mockControls: Array<any> = [{ key: 'Test' }];
      const result = formUtils.toFormGroup(mockControls);
      expect(result instanceof FormGroup).toBe(true);
      expect(result.controls.Test).toBeDefined();
      expect(result.controls.Test instanceof NovoFormControl).toBe(true);
    });
  });

  describe('Method: addControls(formGroup, controls)', () => {
    it('should add controls to a form group.', () => {
      expect(formUtils.addControls).toBeDefined();
      const formGroup: FormGroup = formUtils.toFormGroup([{ key: 'Test' }]);
      formUtils.addControls(formGroup, [{ key: 'Test2' }]);
      // Can't use `.Test2` because the formGroup isn't returned
      expect(formGroup.controls.Test2).toBeDefined();
      expect(formGroup.controls.Test2 instanceof NovoFormControl).toBe(true);
    });
  });

  describe('Method: removeControls(formGroup, controls)', () => {
    it('should remove controls from a form group.', () => {
      expect(formUtils.removeControls).toBeDefined();
      const formGroup: FormGroup = formUtils.toFormGroup([{ key: 'Test' }, { key: 'Test2' }]);
      formUtils.removeControls(formGroup, [{ key: 'Test2' }]);
      // Can't use `.Test2` because the formGroup isn't returned
      expect(formGroup.controls.Test2).not.toBeDefined();
    });
  });

  describe('Method: toFormGroupFromFieldset(fieldsets)', () => {
    it('should create FormGroups from a collection of FieldSets that contain controls.', () => {
      expect(formUtils.toFormGroup).toBeDefined();
      const mockControls: Array<any> = [{ key: 'Test' }];
      const fieldSet = formUtils.toFormGroupFromFieldset([{ title: 'Test', controls: mockControls }]);
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
    it('should return the type of WorkflowOptionsLookup correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'WorkflowOptionsLookup' })).toBe('select');
    });
    it('should return the type of AllWorkflowOptionsLookup correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'AllWorkflowOptionsLookup' })).toBe('select');
    });
    it('should return the type of SpecializedOptionsLookup correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'SpecializedOptionsLookup' })).toBe('select');
    });
    it('should return the type of WorkflowOptions correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'WORKFLOW_OPTIONS' })).toBe('select');
    });
    it('should return the type of AllWorkflowOptions correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'ALL_WORKFLOW_OPTIONS' })).toBe('select');
    });
    it('should return the type of SpecializedOptions correctly.', () => {
      expect(formUtils.determineInputType({ dataSpecialization: 'SPECIALIZED_OPTIONS' })).toBe('select');
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
      const result = formUtils.getControlForField({ type: 'entitychips' });
      expect(result instanceof PickerControl).toBe(true);
    });
    xit('should return the right component for entitypicker', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'entitypicker' });
      expect(result instanceof PickerControl).toBe(true);
    });
    it('should return the right component for picker', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'picker' });
      expect(result instanceof PickerControl).toBe(true);
    });
    it('should return the right component for datetime', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'datetime' });
      expect(result instanceof DateTimeControl).toBe(true);
    });
    it('should return the right component for date', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'date' });
      expect(result instanceof DateControl).toBe(true);
    });
    it('should return the right component for time', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'time' });
      expect(result instanceof TimeControl).toBe(true);
    });
    it('should return the right component for currency', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'currency' });
      expect(result instanceof TextBoxControl).toBe(true);
    });
    it('should return the right component for text', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'text' });
      expect(result instanceof TextBoxControl).toBe(true);
    });
    it('should return the right component for textarea', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'textarea' });
      expect(result instanceof TextAreaControl).toBe(true);
    });
    it('should return the right component for editor', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'editor' });
      expect(result instanceof EditorControl).toBe(true);
    });
    it('should return the right component for tiles', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'tiles' });
      expect(result instanceof TilesControl).toBe(true);
    });
    it('should return the right component for checkbox', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'checkbox' });
      expect(result instanceof CheckboxControl).toBe(true);
    });
    it('should return the right component for switch', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'switch' });
      expect(result instanceof SwitchControl).toBe(true);
    });
    it('should return the right component for checklist', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'checklist' });
      expect(result instanceof CheckListControl).toBe(true);
    });
    it('should return the right component for radio', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'radio' });
      expect(result instanceof RadioControl).toBe(true);
    });
    it('should return the right component for select', () => {
      expect(formUtils.getControlForField).toBeDefined();
      const result = formUtils.getControlForField({ type: 'select' });
      expect(result instanceof SelectControl).toBe(true);
    });
    it('should return the right component for editor minimal', () => {
      const result = formUtils.getControlForField({ type: 'editor-minimal' });
      expect(result instanceof EditorControl).toBeTruthy();
    });
    it('should return the right component for WorkflowOptions and call getControlOptions with data', () => {
      const field: { type: string } = { type: 'select' };
      jest.spyOn(formUtils, 'getControlOptions');
      const result = formUtils.getControlForField(field, undefined, undefined, undefined, undefined, 'First');
      expect(formUtils.getControlOptions).toHaveBeenCalledWith(field, undefined, undefined, 'First');
      expect(result instanceof SelectControl).toBeTruthy();
    });
    describe('with type: address', () => {
      it('should return the right component for address', () => {
        expect(formUtils.getControlForField).toBeDefined();
        const result = formUtils.getControlForField({ type: 'address' });
        expect(result instanceof AddressControl).toBe(true);
      });
      it('should set the right defaults for address sub-fields', () => {
        expect(formUtils.getControlForField).toBeDefined();
        const result = formUtils.getControlForField({
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
      const result = formUtils.getControlForField({ type: 'file' });
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
      const meta = {
        entity: 'ENTITY_NAME',
        label: 'ENTITY_LABEL',
        fields: [
          {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
            sortOrder: 20,
            maxLength: 10,
            description: 'First Name, Yo!',
          },
          {
            name: 'inlineEmbeddedField',
            dataSpecialization: 'INLINE_EMBEDDED',
            sortOrder: 10,
            associatedEntity: {
              fields: [
                {
                  name: 'field1',
                  type: 'text',
                  label: 'Field 1',
                  sortOrder: 10,
                },
                {
                  name: 'field2',
                  type: 'text',
                  label: 'Field 2',
                  sortOrder: 30,
                },
              ],
            },
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
      const fieldset = formUtils.toFieldSets(meta, 'USD', {}, {}, {});
      expect(fieldset[0].title).toBe('Header');
      expect(fieldset[0].icon).toBe('bhi-certification');
      expect(fieldset[0].controls.length).toBe(3);
      expect(fieldset[0].controls[0].key).toEqual('inlineEmbeddedField.field1');
    });
    it('should call getControlForField with data', () => {
      const meta = {
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
      jest.spyOn(formUtils, 'getControlForField').mockReturnValue({});
      formUtils.toFieldSets(meta, 'USD', {}, {}, {}, { firstName: 'First' });
      expect(formUtils.getControlForField).toHaveBeenCalledWith(meta.fields[0], {}, {}, {}, undefined, 'First');
    });
  });

  describe('Method: getControlOptions(field, http, config)', () => {
    it('should return an array of options for booleans', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      formUtils.getControlOptions({ dataType: 'Boolean' });
    });
    it('should return an object with a function that returns a promise when there is an optionsUrl', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      const result = formUtils.getControlOptions({ optionsUrl: 'TEST' });
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
      expect(result.options('') instanceof Promise).toBe(true);
      result.options('').then((returnValue) => {
        expect(returnValue.length).toBe(0);
      });
    });
    it('should return an object with a function that returns a promise when there is an optionsUrl that calls an API', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      const mockHttp = {
        get: () => {
          return from([]);
        },
      };
      const result = formUtils.getControlOptions({ optionsUrl: 'TEST' }, mockHttp, { token: '1' });
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
      expect(result.options('') instanceof Promise).toBe(true);
      result.options('query').then((returnValue) => {
        expect(returnValue.length).toBe(0);
      });
    });
    it('should return an object with an array, label, and format for chips', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      const result = formUtils.getControlOptions({ type: 'chips', options: [1] });
      expect(result.options.length).toBe(1);
      expect(result.field).toBe('value');
      expect(result.format).toBe('$label');
    });
    it('should return an array when options is an array', () => {
      expect(formUtils.getControlOptions).toBeDefined();
      const result = formUtils.getControlOptions({ dataSpecialization: 'DATETIME' });
    });
    it('should return an array when there are WorkflowOptions and a value', () => {
      const field: { workflowOptions: Object } = {
        workflowOptions: {
          initial: [
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ],
          1: [{ value: 2, label: 'two' }],
          2: [{ value: 3, label: 'three' }],
          3: [],
        },
      };
      const result = formUtils.getControlOptions(field, undefined, undefined, { id: 2, label: 'two', shouldRunValidationsOnSave: true });
      expect(result).toEqual([
        { id: 2, shouldRunValidationsOnSave: true, value: 2, label: 'two' },
        { value: 3, label: 'three' },
      ]);
    });
    it('should add current option to array if current value is not there for WorkflowOptions', () => {
      const field: { workflowOptions: Object } = {
        workflowOptions: {
          initial: [
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ],
          1: [{ value: 2, label: 'two' }],
          2: [{ value: 3, label: 'three' }],
          3: [],
        },
      };
      const result = formUtils.getControlOptions(field, undefined, undefined, { id: 3, label: 'three' });
      expect(result).toEqual([{ id: 3, value: 3, label: 'three' }]);
    });
    it('should return initial options when value has no id', () => {
      const field: { workflowOptions: Object } = {
        workflowOptions: {
          initial: [
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ],
          1: [{ value: 2, label: 'two' }],
          2: [{ value: 3, label: 'three' }],
          3: [],
        },
      };
      const result = formUtils.getControlOptions(field, undefined, undefined, { label: '2' });
      expect(result).toEqual([
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
      ]);
    });
    it('should return initial options when value is null', () => {
      const field: { workflowOptions: Object } = {
        workflowOptions: {
          initial: [
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ],
          1: [{ value: 2, label: 'two' }],
          2: [{ value: 3, label: 'three' }],
          3: [],
        },
      };
      const result = formUtils.getControlOptions(field, undefined, undefined, null);
      expect(result).toEqual([
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
      ]);
    });
    it('should return empty array when workflow options are missing', () => {
      const field: { workflowOptions: Object } = {
        workflowOptions: {},
      };
      const result = formUtils.getControlOptions(field, undefined, undefined, null);
      expect(result).toEqual([]);
    });
    it('should return all options when there are SpecializedOptions', () => {
      const field: any = {
        dataType: 'SpecializedOptionsLookup',
        options: [
          { value: '1', label: 'one', readOnly: true },
          { value: '2', label: 'two', readOnly: false },
          { value: '3', label: 'three', readOnly: false },
        ],
      };
      const expected: Array<{ value: string; label: string; readOnly: boolean }> = [
        { value: '1', label: 'one', readOnly: true },
        { value: '2', label: 'two', readOnly: false },
        { value: '3', label: 'three', readOnly: false },
      ];
      const result = formUtils.getControlOptions(field, undefined, undefined, { id: '1', label: 'one' });
      expect(result).toEqual(expected);
    });
    it('should return all options when dataSpecialization is ALL_WORKFLOW_OPTIONS', () => {
      const field: any = {
        dataType: 'ALL_WORKFLOW_OPTIONS',
        options: [
          { value: '1', label: 'uno', readOnly: false },
          { value: '2', label: 'dos', readOnly: false },
          { value: '3', label: 'tres', readOnly: false },
        ],
      };
      const expected: Array<{ value: string; label: string; readOnly: boolean }> = [
        { value: '1', label: 'uno', readOnly: false },
        { value: '2', label: 'dos', readOnly: false },
        { value: '3', label: 'tres', readOnly: false },
      ];
      const result = formUtils.getControlOptions(field, undefined, undefined);
      expect(result).toEqual(expected);
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
  describe('Method: inferDateRange()', () => {
    it('should not set start and end dates', () => {
      const field = { dataType: 'Date' };
      const controlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBe(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(false);
      expect(controlConfig.hasOwnProperty('endDate')).toBe(false);
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(false);
    });
    it('should set start and end dates', () => {
      const field = { dataType: 'Date', allowedDateRange: { minDate: '2021-01-01', maxDate: '2021-12-31' } };
      const controlConfig: NovoControlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBeGreaterThan(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(true);
      expect(controlConfig.hasOwnProperty('endDate')).toBe(true);
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(true);
    });
    it('should set start date only when just minOffset is passed', () => {
      const field = { dataType: 'Date', allowedDateRange: { minOffset: 1 } };
      const controlConfig: NovoControlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBeGreaterThan(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(true);
      expect(controlConfig.startDate).toBeDefined;
      expect(controlConfig.hasOwnProperty('endDate')).toBe(true);
      expect(controlConfig.endDate).not.toBeDefined;
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(true);
      expect(controlConfig.disabledDateMessage).not.toBeDefined;
    });
    it('should set start date only when just minDate is passed', () => {
      const field = { dataType: 'Date', allowedDateRange: { minDate: '2021-01-01' } };
      const controlConfig: NovoControlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBeGreaterThan(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(true);
      expect(controlConfig.startDate).toBeDefined;
      expect(controlConfig.hasOwnProperty('endDate')).toBe(true);
      expect(controlConfig.endDate).not.toBeDefined;
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(true);
      expect(controlConfig.disabledDateMessage).not.toBeDefined;
    });
    it('should set end date only when just maxOffset is passed', () => {
      const field = { dataType: 'Date', allowedDateRange: { maxOffset: 1 } };
      const controlConfig: NovoControlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBeGreaterThan(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(true);
      expect(controlConfig.startDate).not.toBeDefined;
      expect(controlConfig.hasOwnProperty('endDate')).toBe(true);
      expect(controlConfig.endDate).toBeDefined;
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(true);
      expect(controlConfig.disabledDateMessage).not.toBeDefined;
    });
    it('should set end date only when just maxOffset is passed', () => {
      const field = { dataType: 'Date', allowedDateRange: { maxDate: '2021-01-01' } };
      const controlConfig: NovoControlConfig = {};
      formUtils.inferDateRange(controlConfig, field);
      expect(Object.keys(controlConfig).length).toBeGreaterThan(0);
      expect(controlConfig.hasOwnProperty('startDate')).toBe(true);
      expect(controlConfig.startDate).not.toBeDefined;
      expect(controlConfig.hasOwnProperty('endDate')).toBe(true);
      expect(controlConfig.endDate).toBeDefined;
      expect(controlConfig.hasOwnProperty('disabledDateMessage')).toBe(true);
      expect(controlConfig.disabledDateMessage).not.toBeDefined;
    });
  });
  describe('Method: inflateEmbeddedProperties()', () => {
    it('should inflate embedded properties', () => {
      const data = { property1: 'value1', 'property2.property1': 'value2' };
      const returnData = formUtils.inflateEmbeddedProperties(data);
      expect(JSON.stringify(returnData)).not.toContain('property2.property1');
      expect(returnData.property2.property1).toBeDefined();
    });
    it('should not do anything if there are not embedded values', () => {
      const data = { property1: 'value1', property2: 'value2' };
      const returnData = formUtils.inflateEmbeddedProperties(data);
      expect(returnData).toBe(data);
    });
    it('should handle null', () => {
      const returnData = formUtils.inflateEmbeddedProperties(null);
      expect(returnData).toBeNull();
    });
    it('should handle undefined', () => {
      const returnData = formUtils.inflateEmbeddedProperties();
      expect(returnData).toBeUndefined();
    });
    it('should handle empty object', () => {
      const returnData = formUtils.inflateEmbeddedProperties({});
      expect(returnData).toStrictEqual({});
    });
  });
  describe('Method: getEmbeddedFields(subheader)', () => {
    it('should be defined', () => {
      expect(formUtils.getEmbeddedFields).toBeDefined();
      const field = {
        name: 'embeddedField',
        associatedEntity: {
          fields: [],
        },
      };
      formUtils.getEmbeddedFields(field);
    });
    it('should add field name to associated entity fields name', () => {
      const field = {
        name: 'embeddedField',
        associatedEntity: {
          fields: [
            {
              name: 'field1',
            },
            {
              name: 'field2',
            },
          ],
        },
      };
      const embeddedfields = formUtils.getEmbeddedFields(field);
      expect(embeddedfields.every((f) => f.name.startsWith(`embeddedField.`))).toBeTruthy();
      expect(embeddedfields[0].name).toBe(`embeddedField.field1`);
      expect(embeddedfields[1].name).toBe(`embeddedField.field2`);
    });
    it('should not add field name to associated entity fields name if already there', () => {
      const field = {
        name: 'embeddedField',
        associatedEntity: {
          fields: [
            {
              name: 'embeddedField.field1',
            },
            {
              name: 'embeddedField.field2',
            },
          ],
        },
      };
      const embeddedfields = formUtils.getEmbeddedFields(field);
      expect(embeddedfields.every((f) => f.name.startsWith(`embeddedField.`))).toBeTruthy();
      expect(embeddedfields[0].name).toBe(`embeddedField.field1`);
      expect(embeddedfields[1].name).toBe(`embeddedField.field2`);
    });
  });
});
