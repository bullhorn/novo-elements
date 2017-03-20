// NG2
import {FormGroup} from '@angular/forms';
// Vendor
import { Observable } from 'rxjs';
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
    TimeControl
} from '../../elements/form/FormControls';
import { FormUtils } from './FormUtils';
import { NovoFormControl } from '../../elements/form/NovoFormControl';


describe('Utils: FormUtils', () => {
    let formUtils;
    beforeEach(() => {
        formUtils = new FormUtils;
    });
    describe('Method: toFormGroup(controls)', () => {
        it('should create a FormGroup from a collection of controls.', () => {
            expect(formUtils.toFormGroup).toBeDefined();
            let mockControls: Array<any> = [
                { key: 'Test' }
            ];
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
            let mockControls: Array<any> = [
                { key: 'Test' }
            ];
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
        xit('should throw an error when a type doesn\'t exist for the field.', () => {
            expect(formUtils.determineInputType).toBeDefined();
            expect(() => { formUtils.determineInputType({}); }).toThrowError('This field type is unsupported.');
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
                    fields: [{
                        name: 'address1',
                        defaultValue: '100 Summer St'
                    },
                    {
                        name: 'address2',
                        defaultValue: 'apt 25'
                    },
                    {
                        name: 'city',
                        defaultValue: 'Boston'
                    },
                    {
                        name: 'state',
                        defaultValue: 'MA'
                    },
                    {
                        name: 'zip',
                        defaultValue: '2222'
                    },
                    {
                        name: 'countryID',
                        defaultValue: 2260
                    }]
                });
                expect(result.value).toEqual({
                    address1: '100 Summer St',
                    address2: 'apt 25',
                    city: 'Boston',
                    state: 'MA',
                    zip: '2222',
                    countryID: 2260
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
    });

    describe('Method: getControlOptions(field, http, config)', () => {
        it('should return an array of options for booleans', () => {
            expect(formUtils.getControlOptions).toBeDefined();
            formUtils.getControlOptions({ dataType: 'Boolean' });
        });
        it('should return an object with a function that returns a promise when there\'s an optionsUrl', () => {
            expect(formUtils.getControlOptions).toBeDefined();
            let result = formUtils.getControlOptions({ optionsUrl: 'TEST' });
            expect(result.field).toBe('value');
            expect(result.format).toBe('$label');
            expect(result.options('') instanceof Promise).toBe(true);
            result.options('').then((returnValue) => {
                expect(returnValue.length).toBe(0);
            });
        });
        it('should return an object with a function that returns a promise when there\'s an optionsUrl that calls an API', () => {
            expect(formUtils.getControlOptions).toBeDefined();
            let mockHttp = {
                get: () => { return Observable.from([]); }
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
});
