import { asyncForEach } from "./AutomationHelpers";

export async function getElement(selector: string, index: number = 0): Promise<WebdriverIO.Element> {
    let elem: WebdriverIO.Element;

    if (index !== 0) {
        await browser.waitUntil(async () => {
            const elems = await getAllElements(selector);
            if (index < 0) {
                index += elems.length;
            }
            elem = elems[index];
            return elem;
        }, {
            timeout: 8000,
            timeoutMsg: `No element found for selector ${selector} at index ${index}`
        });
    } else {
        elem = await $(selector).getElement();
    }

    return elem;
}

export async function getAllElements(selector: string): Promise<WebdriverIO.ElementArray> {
    return (await ($$(selector)).getElements());
}

export async function getChainedElement(parentElem: WebdriverIO.Element, childElemSelector: string): Promise<WebdriverIO.Element> {
    return (await (parentElem.$(childElemSelector).getElement()));
}

export async function getChainedElements(parentElem: WebdriverIO.Element, childElemSelector: string): Promise<WebdriverIO.ElementArray> {
    return await parentElem.$$(childElemSelector).getElements();
}

export async function getElementWithTextValue(selector: string, textValue: string): Promise<WebdriverIO.Element | null> {
    const elements: WebdriverIO.Element[] = Array.from(await getAllElements(selector));
    let elementMatchingText: WebdriverIO.Element;

    await asyncForEach(elements, async (el: WebdriverIO.Element) => {
        const text = await el.getText();
        if (text.toLowerCase() === textValue.toLowerCase()) {
            elementMatchingText = el;
        }
    });

    return elementMatchingText;
}

export async function getElementIndexWithTextValue(selector: string, textValue: string): Promise<number | null> {
    let elIndex = null;
    const elements = await getAllElements(selector);
    await asyncForEach(elements, async (el: { getText: () => any; }, index: number) => {
        const text = await el.getText();
        if (text.toLowerCase() === textValue.toLowerCase()) {
            elIndex = index;
        }
    });
    return elIndex;
}

export async function resolveElement(element: string | WebdriverIO.Element, index: number = 0): Promise<WebdriverIO.Element> {
    return typeof element === 'string' ? await getElement(element, index) : element;
}
