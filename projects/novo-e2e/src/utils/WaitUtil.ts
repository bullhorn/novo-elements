import { getAllElements, getElement } from './GetElementUtil';
import {
    getElementCount,
    getElementText,
    getElementVisibility,
    hasAttribute,
    hasClass,
    hasStyle,
    isActive,
    isDisabled,
} from './ElementPropertiesUtil';
import { sleep } from './SleepUtil';

export async function wait(condition: () => Promise<boolean>, timeout: number = 9000, message: string = '', interval: number = 1000): Promise<boolean> {
    try {
        return await browser.waitUntil(condition, {
            timeout: timeout,
            interval: interval,
            timeoutMsg: message,
        });
    } catch (error) {
        if (message !== '') {
            throw new Error(message);
        }  else {
            throw error;
        }
    }
}

export async function waitForElementToBePresent(element: string | WebdriverIO.Element, timeout: number = 9000, index: number = 0): Promise<boolean> {
    return wait(async () => {
        return (await getElementVisibility(element, index));
    }, timeout, `Expected element ${element} to be visible within ${timeout}ms but it was not`);
}

export async function waitForElementToNotBeDisplayed(selector: string, timeout: number = 8000, index: number = 0) {
    return wait(async () => {
        return !(await getElementVisibility(selector, index));
    }, timeout, `Expected element ${selector} to not be visible within ${timeout}ms but it still was`);
}

export async function waitForElementDisplayAndReturnIsDisplayed(selector: string, expectToBePresent: boolean, timeout: number = 9000): Promise<boolean> {
    let displayed: boolean = await getElementVisibility(selector, 0);

    const startTime = +new Date();
    while (displayed !== expectToBePresent && (+new Date() - startTime) <= timeout) {
        displayed = await getElementVisibility(selector, 0);
    }

    return displayed;
}

export async function waitForElementPresenceOrAbsenceAndReturnIsPresent(el: string, expectToBePresent: boolean, timeout: number = 9000): Promise<boolean> {
    const element = await getElement(el);

    if (expectToBePresent) {
        try {
            await element.waitForExist({timeout: timeout});
            return true;
        } catch (error) {
            console.error(`expected ${el} to be present`);
            return false;
        }
    } else {
        try {
            await element.waitForExist({timeout: timeout, reverse: false});
            return true;
        } catch (error) {
            console.error(`expected ${el} to be absent`);
            return false;
        }
    }
}

export async function waitForElementToBeUnhidden(selector: string, timeout: number = 8000, index: number = 0) {
    return wait(async () => {
        const hiddenAttribute = await hasAttribute(selector, 'hidden', index);
        const hiddenStyle = await hasStyle(selector, 'hidden', index);
        return !(hiddenAttribute || hiddenStyle);
    }, timeout, `element: ${selector} was never unhidden`);
}

export async function waitForPresenceOfClass(el: string, className: string, timeout: number = 8000, index: number = 0) {
    return wait(async () =>
        await hasClass(el, className, index), timeout, `element: ${el} was never present`);
}

export async function waitForAbsenceOfClass(el: string, className: string, timeout: number = 8000, index: number = 0) {
    return wait(async () =>
        !(await hasClass(el, className, index)), timeout, `element: ${el} was still present`);
}

export async function waitForElementOrXMilliseconds(selector: string, timeout: number = 30000): Promise<void> {
    try {
        await waitForElementToExist(selector, timeout);
    } catch (e) {
        console.error(`The element at ${selector} was not present before the timeout of ${timeout}.
            Still moving forward with the test`);
    }
}

export async function waitForElementToExist(selector: string, timeout: number = 9000, index: number = 0): Promise<boolean> {
    const elem = await getElement(selector, index);
    return elem.waitForExist({timeout: timeout, timeoutMsg: `element: ${selector} was never present`});
}

export async function waitForElementToBeActive(el: string, index: number = 0) {
    return wait(async () => {
        return isActive(el, index);
    }, 8000, `element: ${el} was never active`);
}

export async function waitForElementAbsenceOrXSeconds(el: string, timeout = 3000): Promise<void> {
    try {
        await waitForElementToBeAbsent(el, timeout);
    } catch (e) {
        console.error(`The element at ${el} was still present after the timeout of ${timeout}.
            Still moving forward with the test`);
    }
}

export async function waitForElementToBeAbsent(selector: string, timeout: number = 8000, index: number = 0): Promise<boolean> {
    let elem: WebdriverIO.Element;

    if (index !== 0) {
        return waitForElementCountToDropBelowIndex(selector, index, timeout);
    }

    try {
        elem = await getElement(selector);
    } catch (e) {
        return true;
    }

    return elem.waitForExist({
        reverse: true,
        timeout: timeout,
        timeoutMsg: `element: ${selector} at index ${index} was never absent`,
    });
}

export async function waitForElementCountToDropBelowIndex(el: string, index: number, timeout: number = 8000): Promise<boolean> {
    return wait(async () => {
        const elementCount = await getElementCount(el);
        return elementCount < index + 1;
    }, timeout, `element: ${el} at index ${index} was never absent`);
}

export async function waitForElementToBeClickable(el: string, timeout: number = 8000, index: number = 0) {
    // There are scenarios in NOVO where when elements are still loading, the element at index 0 may not ever be clickable
    // By fetching the element with each attempt, we ensure that if a new, clickable element appears at index 0 we can utilize it
    const startTime = Date.now();
    let clickable = false;

    while (!clickable && Date.now() - startTime < timeout) {
        const element = await getElement(el, index);

        try {
            clickable = await element.waitForClickable({timeout: 0});
        } catch {
            clickable = false;
        }
    }

    if (!clickable && Date.now() - startTime >= timeout) {
        throw new Error(`Expected ${el} to be clickable within ${timeout} but it was not!`);
    }

    return clickable;
}

export async function waitForToastToBePresent(timeout: number = 2000) {
    await waitForElementOrXMilliseconds('novo-toast', timeout);
}

export async function waitForToastToBeAbsent() {
    await waitForElementToBeAbsent('novo-toast');
    await sleep(200);
}

export function waitForFrameToBePresent(frameId: string, timeout = 30000) {
    return waitForElementToBePresent(`iframe[id^="${frameId}"]`, timeout);
}

export function waitForFrameToBeAbsent(frameId: string, timeout = 8000) {
    return waitForElementToBeAbsent(`iframe[id^="${frameId}"]`, timeout);
}

export async function waitForElementCount(el: string, count: number, timeout: number = 8000) {
    return wait(async () => {
        const elems = await getAllElements(el);
        return elems.length === count;
    }, timeout, `number of elements: ${el} never matched count: ${count}`);
}

export async function waitForElementText(el: string, timeout: number = 8000) {
    await wait(async () => {
        return await getElementText(el) !== '';
    }, timeout, 'Element text was an empty string');
}

export async function waitForElementToBeDisabled(el: string , timeout: number = 8000, index: number = 0) {
    return wait(async () => {
        return (await isDisabled(el, index));
    }, timeout, `element: ${el} was never disabled`);
}

export async function waitForElementToBeEnabled(el: string , timeout: number = 8000, index: number = 0) {
    return wait(async () => {
        return !(await isDisabled(el, index));
    }, timeout, `element: ${el} was never enabled`);
}
