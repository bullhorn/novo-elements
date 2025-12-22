import { getAllElements, getElement, getElementCount } from './GetElementUtil';
import { retry } from "./RetryUtil";
import { hasClass } from "./ElementPropertiesUtil";
import { Classes } from "./SelectorUtil";

export async function verifyPresent(el: string, friendlyElementName: string = '', totalWaitTime: number = 8000, interval = 1000): Promise<void> {
    await expect($(el)).toBePresent({
        message: `Expected at least one ${friendlyElementName}, but there were none for selector: ${el}`,
        interval: interval,
        wait: totalWaitTime
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

export async function verifyClassAbsent(el: string, unexpectedClass: string, friendlyElementName: string = null, index: number = 0): Promise<void> {
    const elementName = friendlyElementName || 'element';
    await retry(async () => {
        if (await hasClass(el, unexpectedClass, index)) {
            throw new Error(`${elementName} has the unexpected class: ${unexpectedClass}.`);
        }
    });
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
        wait: totalWaitTime
    });
}

export async function verifyEquals(actual: string | number | boolean,
                                   expected: string | number | boolean,
                                   friendlyName?: string): Promise<void> {
    if (typeof actual === 'string' && typeof expected === 'string') {
        actual = actual.trim();
        expected = expected.trim();
    }

    let errorMessage = `Expected '${expected}' but got '${actual}'`;
    if (friendlyName) {
        errorMessage += ` for ${friendlyName}`;
    }

    try {
        expect(actual).toStrictEqual(expected);
    } catch (error) {
        throw new Error(errorMessage);
    }
}

export async function verifyElementCountEquals(el: string, expected: number, friendlyElementName: string = null, totalWaitTime: number = 3000): Promise<void> {
    const elements = await getAllElements(el);
    expect(elements).toBeElementsArrayOfSize(expected, {
        message: `Expected count for ${friendlyElementName} to be: '${expected}', but found: '${elements.length}' for element with selector: '${el}'`,
        interval: 1000,
        wait: totalWaitTime,
    });
}
