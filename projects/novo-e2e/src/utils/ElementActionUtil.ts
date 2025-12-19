import { failureMessage } from './AutomationHelpers';
import { getElementClickability, getElementVisibility, isDisplayed } from './ElementPropertiesUtil';
import { getElement, resolveElement } from './GetElementUtil';
import { retry } from './RetryUtil';
import { sleep } from './SleepUtil';
import { waitForElementToBePresent } from './WaitUtil';


export async function click(element: string | WebdriverIO.Element, index: number = 0, maxRetries = 3): Promise<void> {
    return retry(async () => {
        const resolvedElement = await resolveElement(element, index);

        if (!await getElementClickability(resolvedElement) || !await getElementVisibility(resolvedElement)) {
            try {
                await scrollIntoView(resolvedElement);
                await moveMouseToElement(resolvedElement);
            } catch (error) {
                throw new Error(`Cannot click element: '${ typeof element === 'object' && element.selector ? element.selector : element }. '` +
                `Likely because it is not visible and clickable.:\n${error.message}`);
            }
        }

        try {
            await resolvedElement.click();
        } catch (error) {
            if (error.message && error.message.includes('element click intercepted')) {
                await javaScriptClick(resolvedElement);
            } else {
                throw error;
            }
        }
    }, async () => {
        failureMessage(`Cannot click element: '${ typeof element === 'object' && element.selector ? element.selector : element }'. Retrying.`);
    }, maxRetries);
}

export async function clickIfPresent(selector: string, index: number = 0): Promise<boolean> {
    const elemDisplayed = await isDisplayed(selector, index);
    if (elemDisplayed) {
        await click(selector, index);
    }
    return elemDisplayed;
}

export async function clickOutsideOfElement(selector: string, x: number, y: number): Promise<void> {
    const elem: WebdriverIO.Element = await getElement(selector);
    await browser.action('pointer').move({origin: elem, x: x, y: y}).down().up().perform();
}

export async function doubleClick(el: string, index?: number): Promise<void> {
    const element = await getElement(el, index);
    await element.doubleClick();
}

export async function javaScriptClick(element: string | WebdriverIO.Element, index: number = 0): Promise<void> {
    const resolvedElement = await resolveElement(element, index);
    await waitForElementToBePresent(resolvedElement);
    await browser.execute((elem) => {
        elem.click();
    }, resolvedElement);
}

export async function sendKeys(selector: string, value: string | number, index: number = 0): Promise<void> {
    const elem = await getElement(selector, index);
    await elem.addValue(value);
}

export async function sendKeysWithoutElement(value: string | string[]): Promise<void> {
    const keysToSend: string[] = Array.isArray(value) ? value : [value];
    await browser.keys(keysToSend);
}

export async function clearInputAndSendKeys(selector: string, value: string | number, index: number = 0): Promise<void> {
    const elem = await getElement(selector, index);
    await elem.setValue(value);
}

export async function moveMouse(x = 0, y = 0): Promise<void> {
    const body = await $('body');
    await body.moveTo({xOffset: x, yOffset: y});
}

export async function moveMouseToElement(element: string | WebdriverIO.Element, index: number = 0, xOffset = 1, yOffset = 1): Promise<void> {
    const resolvedElement = await resolveElement(element, index);
    await resolvedElement.moveTo({ xOffset, yOffset });
}

export async function scrollIntoView(element: string | WebdriverIO.Element, alignToTop: boolean = true, index: number = 0): Promise<void> {
    const resolvedElement = await resolveElement(element, index);
    await resolvedElement.scrollIntoView(alignToTop);
}

export async function scrollHorizontallyIntoView(selector: string) {
    const element = await getElement(selector);
    await element.scrollIntoView({ block: 'center', inline: 'center' });
}

export async function selectDropdownOption(dropdownField: string, option: string) {
    await $(dropdownField).selectByVisibleText(option);
}

export async function dragAndDropOnElement(selector: string, targetElement: string, dragDuration) {
    const target = await getElement(targetElement);
    await $(selector).dragAndDrop(target, dragDuration);
    await sleep(1000);
}

export async function dragAndDropOnCoordinate(selector: string, xCoord: number, yCoord: number, dragDuration) {
    await $(selector).dragAndDrop({x: xCoord, y: yCoord}, dragDuration);
}
