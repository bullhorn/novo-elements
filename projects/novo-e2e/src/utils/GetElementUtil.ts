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

export async function getElementCount(selector: string): Promise<number> {
    const elems = await getAllElements(selector);
    return elems.length;
}

export async function getChainedElement(parentElem: WebdriverIO.Element, childElemSelector: string): Promise<WebdriverIO.Element> {
    return (await (parentElem.$(childElemSelector).getElement()));
}

export async function getChainedElements(parentElem: WebdriverIO.Element, childElemSelector: string): Promise<WebdriverIO.ElementArray> {
    return await parentElem.$$(childElemSelector).getElements();
}

export async function getElementWithTextValue(selector: string, textValue: string): Promise<WebdriverIO.Element | null> {
    const elements: WebdriverIO.Element[] = Array.from(await getAllElements(selector));

    for (const el of elements) {
        const text = await el.getText();
        if (text.toLowerCase() === textValue.toLowerCase()) {
            return el;
        }
    }

    return null;
}

export async function getElementIndexWithTextValue(selector: string, textValue: string): Promise<number | null> {
    const elements = await getAllElements(selector);

    for (let index = 0; index < elements.length; index++) {
        const text = await elements[index].getText();
        if (text.toLowerCase() === textValue.toLowerCase()) {
            return index;
        }
    }

    return null;
}

export async function resolveElement(element: string | WebdriverIO.Element, index: number = 0): Promise<WebdriverIO.Element> {
    return typeof element === 'string' ? await getElement(element, index) : element;
}
