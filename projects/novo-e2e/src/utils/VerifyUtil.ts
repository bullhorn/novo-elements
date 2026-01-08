import { getAllElements, getElement, getElementCount } from './GetElementUtil';
import { retry } from './RetryUtil';
import { getAllElementsText, hasClass, isPresent } from './ElementPropertiesUtil';
import {
    Classes,
    controlInput,
    ControlType,
    pickerChips,
    pickerChipValue,
    selectInput,
    textAreaControl,
} from './SelectorUtil';
import {
    AllowedKey,
    FieldNamesToFormValues,
    FormValues,
    getControlType,
} from '../e2e/common/table.common.page';
import { asyncForEach } from './AutomationHelpers';
import { isObject } from 'imask/core/utils';

export async function verifyPresent(el: string, friendlyElementName: string = '', totalWaitTime: number = 8000, interval = 1000): Promise<void> {
    await expect($(el)).toBePresent({
        message: `Expected at least one ${friendlyElementName}, but there were none for selector: ${el}`,
        interval: interval,
        wait: totalWaitTime,
    });
}

export async function verifyAbsent(el: string, friendlyElementName: string = null, maxRetries: number = 3): Promise<void> {
    const elementName = friendlyElementName || el;
    await retry(async () => {
        const actual = await getElementCount(el);
        if (actual > 0) {
            throw new Error(`Expected no elements for ${elementName}, but found: '${actual}' for selector: '${el}'`);
        }
    }, null, maxRetries);
}

export async function verifyNotActive(el: string, friendlyElementName: string = null, index: number = 0): Promise<void> {
    await verifyClassAbsent(el, Classes.active, friendlyElementName, index);
}

export async function verifyClassPresent(selector: string, expectedClass: string, friendlyElementName: string = null, index: number = 0, totalWaitTime: number = 8000): Promise<void> {
    const elementName = friendlyElementName || 'element';
    await expect(await getElement(selector, index)).toHaveElementClass(expectedClass, {
        message: `${elementName} is missing the expected class: ${expectedClass}.`,
        interval: 1000,
        wait: totalWaitTime,
    });
}

export async function verifyClassAbsent(el: string, unexpectedClass: string, friendlyElementName: string = null, index: number = 0): Promise<void> {
    const elementName = friendlyElementName || 'element';
    await retry(async () => {
        if (await hasClass(el, unexpectedClass, index)) {
            throw new Error(`${elementName} has the unexpected class: ${unexpectedClass}.`);
        }
    });
}

export async function verifyAllElementsTextIncludes(el: string, expected: string, friendlyElementName: string = null): Promise<void> {
    const elementName = friendlyElementName || 'element';
    const actual: string[] = await getAllElementsText(el);

    const actualLowerCaseString: string = actual.map(text => text?.toLowerCase() ?? text).join('');
    if (!actualLowerCaseString.includes(expected.toLowerCase())) {
        throw new Error(`Expected text for all ${elementName} elements to include: '${expected}', but found: '${actual}' for all elements with selector: '${el}'`);
    }
}

export async function verifyText(el: string, expected: string | number | RegExp, friendlyElementName: string = null, index: number = 0, totalWaitTime: number = 3000): Promise<void> {
    const elementName = friendlyElementName || 'element';

    switch (typeof expected) {
        case 'string':
            expected = expected.trim();
            break;
        case 'number':
            expected = expected.toString();
            break;
        default:
            break;
    }
    await expect(await getElement(el, index)).toHaveText(expected, {
        ignoreCase: true,
        message: `${elementName} is missing the expected text: ${expected}.`,
        interval: 1000,
        wait: totalWaitTime,
    });
}

export async function verifyElementCountEquals(el: string, expected: number, friendlyElementName: string = null, totalWaitTime: number = 3000): Promise<void> {
    const elements = await getAllElements(el);
    expect(elements).toBeElementsArrayOfSize(expected, {
        message: `Expected count for ${friendlyElementName} to be: '${expected}', but found: '${elements.length}' for element with selector: '${el}'`,
        interval: 1000,
        wait: totalWaitTime,
    });
}

export async function verifyFormValues(values: FormValues, matchAsIncludes = false): Promise<void> {
    const formArray: FieldNamesToFormValues[] = Array.isArray(values) ? values : [values];
    return await asyncForEach(formArray, async (form, index) => {
        return await asyncForEach(Object.keys(form), async (fieldName) => {
            const expectedValue = form[fieldName];
            // Support one-level deep nesting of objects
            if (isObject(expectedValue)) {
                return await asyncForEach(Object.keys(expectedValue), async (nestedField) => {
                    const nestedFieldNameWithDot = `${fieldName}.${nestedField}`;
                    return await verifyFormValue(nestedFieldNameWithDot, expectedValue[nestedField], nestedFieldNameWithDot, index, matchAsIncludes);
                });
            }
            return await verifyFormValue(fieldName, expectedValue, fieldName, index, matchAsIncludes);
        });
    });
}

/**
 * DO NOT USE THIS METHOD DIRECTLY. Instead, use verifyFormValues() to verify data in the form using JSON.
 */
async function verifyFormValue(fieldName: string, expected: AllowedKey, friendlyElementName: string = null, index = 0, includes = false): Promise<void> {
    const controlType = await getControlType(fieldName);
    let textSelector = controlInput(fieldName, true);
    switch (controlType) {
        case ControlType.select:
            return verifyText(selectInput(fieldName), String(expected), friendlyElementName, index);
        case ControlType.textarea:
            textSelector = textAreaControl(fieldName);
            break;
        case ControlType.picker:
            if (await isPresent(pickerChips(fieldName))) {
                const expectedArray: AllowedKey[] = Array.isArray(expected) ? expected : [expected];
                return await asyncForEach(expectedArray, async (expectedChip, chipIndex) => {
                    return includes ?
                      verifyTextIncludes(pickerChipValue(fieldName), String(expectedChip), friendlyElementName, chipIndex) :
                      verifyText(pickerChipValue(fieldName), String(expectedChip), friendlyElementName, chipIndex);
                });
            }
            break;
        case ControlType.chipList:
            const chipListExpectedArray: AllowedKey[] = Array.isArray(expected) ? expected : [expected];
            return await asyncForEach(chipListExpectedArray, async (expectedChip, chipIndex) => {
                return includes ?
                  verifyTextIncludes(pickerChipValue(fieldName), String(expectedChip), friendlyElementName, chipIndex) :
                  verifyText(pickerChipValue(fieldName), String(expectedChip), friendlyElementName, chipIndex);
            });
        default:
            break;
    }
    // Default for all fields that provide their string value in their control input value attribute
    return includes ?
      await verifyInputValueIncludes(textSelector, String(expected), friendlyElementName, index) :
      await verifyInputValue(textSelector, expected, friendlyElementName, index);
}

export async function verifyTextIncludes(el: string, expected: string, friendlyElementName: string = null, index: number = 0, totalWaitTime: number = 8000): Promise<void> {
    const element = await getElement(el, index);
    const elementText = await element.getText();
    const elementName = friendlyElementName || 'element';

    if (elementText == null) {
        throw new Error(`Text for ${elementName} could not be found with selector: ${el}`);
    }

    await expect(element).toHaveText(expect.stringContaining(expected.toLowerCase()), {
        message: `Expected text for ${elementName} to include: '${expected}', but found: '${await element.getText()}' for element with selector: '${el}'`,
        interval: 1000,
        wait: totalWaitTime,
        ignoreCase: true,
    });
}

export async function verifyInputValue(selector: string,
                                       expected: AllowedKey | RegExp,
                                       friendlyElementName: string = null,
                                       index: number = 0,
                                       totalWaitTime: number = 8000): Promise<void> {
    const elementName = friendlyElementName || 'element';
    const element = await getElement(selector, index);
    let message: string;
    if (expected instanceof RegExp) {
        message = `Expected ${elementName} value to match pattern: ${expected.toString()} with selector: '${selector}'`;
    } else {
        expected = expected.toString();
        message = `Expected ${elementName} value to equal: '${expected}' with selector: '${selector}'`;
    }
    await expect(element).toHaveValue(expected, {
        message,
        interval: 1000,
        wait: totalWaitTime,
        ignoreCase: true,
    });
}

export async function verifyInputValueIncludes(selector: string,
                                               expected: AllowedKey,
                                               friendlyElementName: string = null,
                                               index: number = 0,
                                               totalWaitTime: number = 8000): Promise<void> {
    const elementName = friendlyElementName || 'element';
    await expect(await getElement(selector, index)).toHaveValue(expect.stringContaining(expected.toString()), {
        message: `Expected ${elementName} value to contain: '${expected}' with selector: '${selector}'`,
        interval: 1000,
        wait: totalWaitTime,
        ignoreCase: true,
    });
}
