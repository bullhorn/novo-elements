import { FormControl, FormGroup } from '@angular/forms';
import { NovoDefaultStringConditionDef } from './string-condition.definition';

describe('StringConditionDefinition', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
        formGroup = new FormGroup({
            value: new FormControl(null),
            operator: new FormControl('includeAny'),
        });
    })

    it('should combine arrays in the form control', () => {
        const mockEvent = {
            input: {
                value: 'string1'
            },
            value: 'string1'
        };
        NovoDefaultStringConditionDef.prototype.add(mockEvent, formGroup);
        expect(formGroup.controls.value.value).toEqual(['string1']);
        const arrayOne = formGroup.controls.value.value;
        mockEvent.value = 'string2';
        NovoDefaultStringConditionDef.prototype.add(mockEvent, formGroup);
        expect(formGroup.controls.value.value).toEqual(['string1', 'string2']);
        // verify this is a different array object for change detection
        expect(formGroup.controls.value.value).not.toBe(arrayOne);
    });

    it('should remove values accordingly', () => {
        const arrayOne = ['string1', 'string3', 'string5'];
        formGroup.controls.value.setValue(arrayOne);
        NovoDefaultStringConditionDef.prototype.remove('string3', formGroup);
        expect(formGroup.controls.value.value).toEqual(['string1', 'string5']);
        expect(formGroup.controls.value.value).not.toBe(arrayOne);
    });

    describe('AbstractConditionFieldDef', () => {
        it('should only reset value if the operator edit group has changed', () => {
            const mockObj = {
                _previousOperatorValue: 'includeAny',
                operatorEditGroups: [new Set(['includeAny', 'includeAll'])],
            };
            formGroup.controls.value.setValue('test');
            formGroup.controls.operator.setValue('includeAll');
            NovoDefaultStringConditionDef.prototype.onOperatorSelect.call(mockObj, formGroup);
            expect(formGroup.controls.value.value).toBe('test');

            formGroup.controls.operator.setValue('notEditGroup');
            NovoDefaultStringConditionDef.prototype.onOperatorSelect.call(mockObj, formGroup);
            expect(formGroup.controls.value.value).toBe(null);
        });
    });
});
