import { FormControl, FormGroup } from '@angular/forms';
import { NovoDefaultPickerConditionDef } from './picker-condition.definition';
import { Operator } from '../query-builder.types';

describe('PickerConditionDefinition', () => {
    let component: NovoDefaultPickerConditionDef;
    let formGroup: FormGroup;

    beforeEach(() => {
        const mockLabelService = {} as any;
        component = new NovoDefaultPickerConditionDef(mockLabelService);
        formGroup = new FormGroup({
            value: new FormControl([]),
            operator: new FormControl(Operator.includeAny),
        });
    });

    describe('Constructor & Properties', () => {
        it('should initialize with correct defaultOperator', () => {
            expect(component.defaultOperator).toBe(Operator.includeAny);
        });

        it('should define operator edit groups for multi-select operators', () => {
            const operatorEditGroups = (component as any).operatorEditGroups as Set<Operator>[];
            expect(operatorEditGroups).toBeDefined();
            expect(operatorEditGroups.length).toBeGreaterThan(0);

            // Check that the multi-select operators are in the same group
            const multiSelectGroup = operatorEditGroups.find((group: Set<Operator>) => group.has(Operator.includeAny));
            expect(multiSelectGroup).toBeDefined();
            expect(multiSelectGroup?.has(Operator.includeAll)).toBe(true);
            expect(multiSelectGroup?.has(Operator.excludeAny)).toBe(true);
        });
    });

    describe('onOperatorSelect', () => {
        it('should set value to empty array when switching to multi-select operator from isNull', () => {
            // Set initial state as if coming from isNull operator
            formGroup.controls.value.setValue(true);
            formGroup.controls.operator.setValue(Operator.isNull);
            (component as any)._previousOperatorValue = Operator.isNull;

            // Switch to includeAny operator
            formGroup.controls.operator.setValue(Operator.includeAny);
            component.onOperatorSelect(formGroup);

            // Value should be set to empty array
            expect(formGroup.controls.value.value).toEqual([]);
            expect(Array.isArray(formGroup.controls.value.value)).toBe(true);
        });

        it('should set value to empty array when switching to includeAll from isNull', () => {
            formGroup.controls.value.setValue(false);
            formGroup.controls.operator.setValue(Operator.isNull);
            (component as any)._previousOperatorValue = Operator.isNull;

            formGroup.controls.operator.setValue(Operator.includeAll);
            component.onOperatorSelect(formGroup);

            expect(formGroup.controls.value.value).toEqual([]);
            expect(Array.isArray(formGroup.controls.value.value)).toBe(true);
        });

        it('should set value to empty array when switching to excludeAny from isNull', () => {
            formGroup.controls.value.setValue(true);
            formGroup.controls.operator.setValue(Operator.isNull);
            (component as any)._previousOperatorValue = Operator.isNull;

            formGroup.controls.operator.setValue(Operator.excludeAny);
            component.onOperatorSelect(formGroup);

            expect(formGroup.controls.value.value).toEqual([]);
            expect(Array.isArray(formGroup.controls.value.value)).toBe(true);
        });

        it('should preserve array value when switching between multi-select operators', () => {
            const existingArray = ['option1', 'option2'];
            formGroup.controls.value.setValue(existingArray);
            formGroup.controls.operator.setValue(Operator.includeAny);
            (component as any)._previousOperatorValue = Operator.includeAny;

            formGroup.controls.operator.setValue(Operator.includeAll);
            component.onOperatorSelect(formGroup);

            // Value should be preserved (not cleared)
            expect(formGroup.controls.value.value).toEqual(existingArray);
        });

        it('should convert null to empty array when switching between multi-select operators', () => {
            formGroup.controls.value.setValue(null);
            formGroup.controls.operator.setValue(Operator.includeAny);
            (component as any)._previousOperatorValue = Operator.includeAny;

            // Simulate switching to another multi-select operator
            formGroup.controls.operator.setValue(Operator.includeAll);
            component.onOperatorSelect(formGroup);

            // The override should convert non-array values to empty array for multi-select operators
            expect(formGroup.controls.value.value).toEqual([]);
            expect(Array.isArray(formGroup.controls.value.value)).toBe(true);
        });
    });

    describe('customOptions', () => {
        it('should return empty array when select.value is not an array', () => {
            const mockSelect = { value: true } as any;
            const options = [{ value: 'opt1', label: 'Option 1' }];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([]);
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return empty array when select.value is a boolean false', () => {
            const mockSelect = { value: false } as any;
            const options = [{ value: 'opt1', label: 'Option 1' }];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([]);
        });

        it('should return empty array when select.value is null', () => {
            const mockSelect = { value: null } as any;
            const options = [{ value: 'opt1', label: 'Option 1' }];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([]);
        });

        it('should return empty array when select.value is undefined', () => {
            const mockSelect = { value: undefined } as any;
            const options = [{ value: 'opt1', label: 'Option 1' }];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([]);
        });

        it('should filter out predefined options and return custom options only', () => {
            const mockSelect = { value: ['custom1', 'opt1', 'custom2'] } as any;
            const options = [
                { value: 'opt1', label: 'Option 1' },
                { value: 'opt2', label: 'Option 2' },
            ];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([
                { value: 'custom1', label: 'custom1' },
                { value: 'custom2', label: 'custom2' },
            ]);
        });

        it('should return empty array when all values are predefined', () => {
            const mockSelect = { value: ['opt1', 'opt2'] } as any;
            const options = [
                { value: 'opt1', label: 'Option 1' },
                { value: 'opt2', label: 'Option 2' },
            ];

            const result = component.customOptions(options, mockSelect);

            expect(result).toEqual([]);
        });
    });

    describe('showAddOption', () => {
        it('should safely handle non-array select.value (boolean)', () => {
            const mockSelect = { value: true } as any;
            const meta = { allowCustomFilterValues: true, options: [] };

            // Should not throw and should return true since 'test' is not a predefined option
            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(true);
        });

        it('should safely handle null select.value', () => {
            const mockSelect = { value: null } as any;
            const meta = { allowCustomFilterValues: true, options: [] };

            // Should not throw and should return true since 'test' is not a predefined option
            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(true);
        });

        it('should return false when custom values are not allowed', () => {
            const mockSelect = { value: [] } as any;
            const meta = { allowCustomFilterValues: false, options: [] };

            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(false);
        });

        it('should return false when filter value is empty or whitespace', () => {
            const mockSelect = { value: [] } as any;
            const meta = { allowCustomFilterValues: true, options: [] };

            expect(component.showAddOption(meta, mockSelect, '')).toBe(false);
            expect(component.showAddOption(meta, mockSelect, '   ')).toBe(false);
        });

        it('should return false when value is already selected', () => {
            const mockSelect = { value: ['test', 'other'] } as any;
            const meta = { allowCustomFilterValues: true, options: [] };

            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(false);
        });

        it('should return false when value matches a predefined option', () => {
            const mockSelect = { value: [] } as any;
            const meta = {
                allowCustomFilterValues: true,
                options: [{ value: 'opt1', label: 'Test' }],
            };

            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(false);
        });

        it('should return true when value is new and allowed', () => {
            const mockSelect = { value: [] } as any;
            const meta = {
                allowCustomFilterValues: true,
                options: [{ value: 'opt1', label: 'Option 1' }],
            };

            const result = component.showAddOption(meta, mockSelect, 'newValue');

            expect(result).toBe(true);
        });

        it('should be case-insensitive when checking for matches', () => {
            const mockSelect = { value: ['TEST'] } as any;
            const meta = { allowCustomFilterValues: true, options: [] };

            const result = component.showAddOption(meta, mockSelect, 'test');

            expect(result).toBe(false);
        });
    });

    describe('hideOption', () => {
        it('should return falsy when no filter value provided', () => {
            const option = { value: 'opt1', label: 'Option 1' };

            const result = component.hideOption(option, '');

            expect(result).toBeFalsy();
        });

        it('should return falsy when filter value is null/undefined', () => {
            const option = { value: 'opt1', label: 'Option 1' };

            expect(component.hideOption(option, null as any)).toBeFalsy();
            expect(component.hideOption(option, undefined as any)).toBeFalsy();
        });

        it('should return true when filter value does not match value or label', () => {
            const option = { value: 'apple', label: 'Apple Fruit' };

            const result = component.hideOption(option, 'orange');

            expect(result).toBe(true);
        });

        it('should return false when filter value matches option value', () => {
            const option = { value: 'apple', label: 'Apple Fruit' };

            const result = component.hideOption(option, 'app');

            expect(result).toBe(false);
        });

        it('should return false when filter value matches option label (case-insensitive)', () => {
            const option = { value: 'apple', label: 'Apple Fruit' };

            const result = component.hideOption(option, 'FRUIT');

            expect(result).toBe(false);
        });

        it('should handle numeric values in option.value', () => {
            const option = { value: 123, label: 'Test Option' };

            const result = component.hideOption(option, '12');

            expect(result).toBe(false);
        });

        it('should perform partial matching on both value and label', () => {
            const option = { value: 'test-value', label: 'Test Label' };

            expect(component.hideOption(option, 'test')).toBe(false);
            expect(component.hideOption(option, 'value')).toBe(false);
            expect(component.hideOption(option, 'label')).toBe(false);
            expect(component.hideOption(option, 'nomatch')).toBe(true);
        });
    });

    describe('optionTracker', () => {
        it('should return unique identifier based on value and label', () => {
            const option = { value: 'opt1', label: 'Option 1' };

            const result = component.optionTracker(option);

            expect(result).toBe('opt1~~~Option 1');
        });

        it('should handle different option types', () => {
            const stringOption = { value: 'string', label: 'String Label' };
            const numericOption = { value: 123, label: 'Numeric Label' };

            expect(component.optionTracker(stringOption)).toBe('string~~~String Label');
            expect(component.optionTracker(numericOption)).toBe('123~~~Numeric Label');
        });

        it('should create different trackers for different options', () => {
            const option1 = { value: 'opt1', label: 'Option 1' };
            const option2 = { value: 'opt2', label: 'Option 2' };

            const tracker1 = component.optionTracker(option1);
            const tracker2 = component.optionTracker(option2);

            expect(tracker1).not.toBe(tracker2);
        });

        it('should create same tracker for identical options', () => {
            const option1 = { value: 'opt1', label: 'Option 1' };
            const option2 = { value: 'opt1', label: 'Option 1' };

            const tracker1 = component.optionTracker(option1);
            const tracker2 = component.optionTracker(option2);

            expect(tracker1).toBe(tracker2);
        });
    });

    describe('applyCustomItem', () => {
        it('should be defined as a method', () => {
            expect(typeof component.applyCustomItem).toBe('function');
        });

        it('should not throw when called', () => {
            expect(() => {
                component.applyCustomItem();
            }).not.toThrow();
        });

        it('should log warning when called', () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

            component.applyCustomItem();

            expect(warnSpy).toHaveBeenCalledWith('Custom item addition not implemented');
            warnSpy.mockRestore();
        });
    });
});
