import { asyncMap } from './AutomationHelpers';
import { getAllElements, getElement, resolveElement } from './GetElementUtil';
import { retry } from './RetryUtil';
import { Attributes, Classes } from './SelectorUtil';

export async function getElementVisibility(element: string | WebdriverIO.Element, index: number = 0): Promise<boolean> {
    const resolvedElement = await resolveElement(element, index);
    const hasNoSuchElementError = resolvedElement.error?.message?.includes('no such element') || false;
    const hasCouldNotFindElementError = resolvedElement.error?.message?.includes('Couldn\'t find element with selector') || false;

    if (!resolvedElement || hasNoSuchElementError || hasCouldNotFindElementError) {
        return false;
    }

    const [elementSize, hiddenAttribute, cssVisibilityHidden, cssDisplayNone] = await Promise.all([
        resolvedElement.getSize(),
        hasAttribute(resolvedElement, 'hidden', index),
        hasCssValue(resolvedElement, 'visibility', 'hidden', index),
        hasCssValue(resolvedElement, 'display', 'none', index),
    ]);

    if ((elementSize.height === 0 || elementSize.width === 0) || hiddenAttribute || cssVisibilityHidden || cssDisplayNone) {
        return false;
    }

    return (await resolvedElement.isDisplayed());
}

export async function getElementClickability(element: string | WebdriverIO.Element, index: number = 0): Promise<boolean> {
    const resolvedElement = await resolveElement(element, index);
    return resolvedElement.isClickable();
}

export async function getElementText(selector: string, index: number = 0): Promise<string> {
    const elem = await getElement(selector, index);
    return elem.getText();
}

export async function getAllElementsText(el: string, limit: number = 100): Promise<string[]> {
    const elements = await getAllElements(el);
    const texts = await Promise.all(elements.slice(0, limit).map(async (element) => {
        const text = await element.getText();
        return text;
    }));
    return texts;
}

export async function hasEmptyText(el: string, index: number = 0) { // renamed from isEmpty
    const elementText: string = await getElementText(el, index);
    const elementValue: string = await getAttribute(el, 'value', index);
    const elementInnerText: string = await getAttribute(el, 'innerText', index);

    return (
        (!elementText || elementText === '') &&
        (!elementValue || elementValue === '') &&
        (!elementInnerText || elementInnerText === '')
    );
}

export async function getElementCount(selector: string): Promise<number> {
    const elems = await getAllElements(selector);
    return elems.length;
}

export async function getElementTag(el: string, index: number = 0): Promise<string> {
    const elementFinder = await getElement(el, index);
    return await elementFinder.getTagName();
}

export async function getElementLocation(el: string): Promise<{x: number, y: number}> {
    return (await getElement(el)).getLocation();
}

/**
 * If you need to get the value attribute, use the getValue WebUtil instead.
 */
export async function getAttribute(el: string, attribute: string, index: number = 0): Promise<string> {
    const element = await getElement(el, index);
    return element.getAttribute(attribute);
}

export async function getElementArrayAttribute(arrayCss: string, attribute: string): Promise<string[]> {
    const elements: WebdriverIO.ElementArray = await getAllElements(arrayCss);
    const elementList: WebdriverIO.Element[] = Array.from(elements);
    const valueList: {}[] = await asyncMap(elementList, async (value: WebdriverIO.Element) =>
        await value.getAttribute(attribute));
    return valueList.map((value: string) => value.trim());
}

export async function getElementArrayValue(arrayCss: string): Promise<string[]> {
    const elements: WebdriverIO.ElementArray = await getAllElements(arrayCss);

    return await Promise.all(await elements.map(async (element: WebdriverIO.Element) => {
        return await element.getValue();
    }));
}

export async function getValue(selector: string, index: number = 0): Promise<string> {
    const element = await getElement(selector, index);
    return element.getValue();
}

export async function getClasses(el: string | WebdriverIO.Element, index: number = 0): Promise<string[]> {
    const element = typeof el === 'string' ? await getElement(el, index) : el;
    const classes = await element.getAttribute('class');
    return classes ?
        classes.split(' ').map(clazz => clazz.toLowerCase())
        : [];
}

export async function hasClass(el: string, expectedClass: string, index: number = 0): Promise<boolean> {
    const classes = await getClasses(el, index);
    return classes ? classes.includes(expectedClass.toLowerCase())
        : false;
}

export async function hasAttribute(element: string | WebdriverIO.Element, attribute: string, index: number = 0): Promise<boolean> {
    const resolvedElement = await resolveElement(element, index);
    const attributeValue = await resolvedElement.getAttribute(attribute);
    return !!attributeValue;
}

export async function hasStyle(selector: string, style: string, index: number = 0): Promise<boolean> {
    const elemHasStyleAttribute = await hasAttribute(selector, Attributes.style, index);

    if (!elemHasStyleAttribute) {
        return false;
    } else {
        const styles = await getAttribute(selector, Attributes.style, index);
        const styleList = styles.replace(/[:;]/g, '').split(' '); // replacing semicolons and colons to strip return down to the actual values
        return styleList.indexOf(style) !== -1;
    }
}

export async function hasCssValue(element: string | WebdriverIO.Element, cssProperty: string, expectedCssValue: string, index: number = 0) {
    const resolvedElement = await resolveElement(element, index);
    const actualCssValue = await resolvedElement.getElementCSSValue(resolvedElement.elementId, cssProperty);
    return actualCssValue === expectedCssValue;
}

export async function isActive(el: string, index: number = 0): Promise<boolean> {
    return hasClass(el, Classes.active, index);
}

export async function isPresent(selector: string, index: number = 0): Promise<boolean> {
    let elem;
    try {
        elem = await getElement(selector, index);
    } catch (e) {
        return false;
    }
    return elem.isExisting();
}

export async function isDisplayed(selector: string, index: number = 0): Promise<boolean> {
    let elem;
    try {
        elem = await getElement(selector, index);
    } catch (e) {
        return false;
    }
    return elem.isDisplayed();
}

export async function isEnabled(el: string, index: number = 0): Promise<boolean> {
    const element = await getElement(el, index);
    return element.isEnabled();
}

export async function isSelected(el: string, index: number = 0): Promise<boolean> {
    return (await getElement(el, index)).isSelected();
}

export async function isDisabled(selector: string, index: number = 0): Promise<boolean> {
    const isDisabledAttribute = await hasAttribute(selector, 'disabled', index);
    if (!isDisabledAttribute) {
        return ((await hasClass(selector, 'disabled', index)) ||
            (await hasClass(selector, 'novo-button-disabled', index)) ||
            (await hasClass(selector, 'novo-option-disabled', index)) ||
            (await hasClass(selector, 'control-disabled', index)));
    }
    return true;
}

export async function isHidden(selector: string, index: number = 0): Promise<boolean> {
    const hidden = await hasAttribute(selector, 'hidden', index);
    if (hidden) {
        return hidden;
    }
    const hiddenStyle = await hasStyle(selector, 'hidden', index);
    if (hiddenStyle) {
        return hiddenStyle;
    }
    return await hasClass(selector, 'hidden', index);
}

export async function getElementArrayText(arrayCss: string): Promise<string[]> {
    const elementList: WebdriverIO.Element[] = Array.from(await getAllElements(arrayCss));
    const valueList: {}[] = await asyncMap(elementList, async (value: WebdriverIO.Element) =>
        await value.getText());
    return valueList.map((value: string) => value.trim());
}

export async function isPresentAndDisplayed(el: string, index: number = 0): Promise<boolean> {
    const present = await isPresent(el, index);
    if (!present) {
        return present;
    }
    return isDisplayed(el, index);
}

export async function elementIsOverlapped(upperElementSelector: string, lowerElementSelector: string): Promise<boolean> {
    const upperElement = await getElement(upperElementSelector);
    const lowerElement = await getElement(lowerElementSelector);
    const upperRectangle = await browser.getElementRect(upperElement.elementId);
    const lowerRectangle = await browser.getElementRect(lowerElement.elementId);

    return (
        upperRectangle.x <= lowerRectangle.x &&
        upperRectangle.x + upperRectangle.width >= lowerRectangle.x + lowerRectangle.width &&
        upperRectangle.y <= lowerRectangle.y &&
        upperRectangle.y + upperRectangle.height >= lowerRectangle.y + lowerRectangle.height
    );
}

export async function isDisplayedWithinViewport(selector: string, index: number = 0, friendlyElementName: string = null, maxRetries: number = 3): Promise <void> {
    let elem: WebdriverIO.Element;
    const elementName = friendlyElementName || 'element';
    await retry(async () => {
        elem = await getElement(selector, index);
        const isDisplayedInViewport = await elem.isDisplayed({withinViewport: true});
        if (!isDisplayedInViewport) {
            throw new Error(`Expected ${elementName} to be displayed in the viewport, but it was not displayed for selector: ${selector}`);
        }
    }, undefined, maxRetries);
}
