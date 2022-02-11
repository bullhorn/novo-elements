import { ViewportScroller } from '@angular/common';

export class AnchorViewportScroller implements ViewportScroller {
  private offset: () => [number, number] = () => [0, 0];

  constructor(private document: Document, private element: HTMLElement) {}

  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(offset: [number, number] | (() => [number, number])): void {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }

  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition(): [number, number] {
    if (this.supportsScrolling()) {
      return [this.element.offsetLeft, this.element.offsetTop];
    } else {
      return [0, 0];
    }
  }

  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(position: [number, number]): void {
    if (this.supportsScrolling()) {
      this.element.scrollTo(position[0], position[1]);
    }
  }

  /**
   * Scrolls to an element and attempts to focus the element.
   *
   * Note that the function name here is misleading in that the target string may be an ID for a
   * non-anchor element.
   *
   * @param target The ID of an element or name of the anchor.
   *
   * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
   * @see https://html.spec.whatwg.org/#scroll-to-fragid
   */
  scrollToAnchor(target: string): void {
    if (!this.supportsScrolling()) {
      return;
    }

    const elSelected = findAnchorFromDocument(this.document, target);

    if (elSelected) {
      this.scrollToElement(elSelected);
      elSelected.focus();
    }
  }

  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void {
    if (this.supportScrollRestoration()) {
    }
  }

  /**
   * Scrolls to an element using the native offset and the specified offset set on this scroller.
   *
   * The offset can be used when we know that there is a floating header and scrolling naively to an
   * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
   */
  private scrollToElement(el: HTMLElement): void {
    console.log('Scrolling to ', el);
    const rect = el.getBoundingClientRect();
    const left = rect.left + this.element.offsetLeft;
    const top = rect.top + this.element.offsetTop;
    const offset = this.offset();
    this.element.scrollTo(left - offset[0], top - offset[1]);
  }

  /**
   * We only support scroll restoration when we can get a hold of window.
   * This means that we do not support this behavior when running in a web worker.
   *
   * Lifting this restriction right now would require more changes in the dom adapter.
   * Since webworkers aren't widely used, we will lift it once RouterScroller is
   * battle-tested.
   */
  private supportScrollRestoration(): boolean {
    return false;
  }

  private supportsScrolling(): boolean {
    try {
      return !!this.element && !!this.element.scrollTo && 'offsetLeft' in this.element;
    } catch {
      return false;
    }
  }
}

function findAnchorFromDocument(document: Document, target: string): HTMLElement | null {
  const documentResult = document.getElementById(target) || document.getElementsByName(target)[0];

  if (documentResult) {
    return documentResult;
  }

  // `getElementById` and `getElementsByName` won't pierce through the shadow DOM so we
  // have to traverse the DOM manually and do the lookup through the shadow roots.
  if (
    typeof document.createTreeWalker === 'function' &&
    document.body &&
    ((document.body as any).createShadowRoot || document.body.attachShadow)
  ) {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let currentNode = treeWalker.currentNode as HTMLElement | null;

    while (currentNode) {
      const shadowRoot = currentNode.shadowRoot;

      if (shadowRoot) {
        // Note that `ShadowRoot` doesn't support `getElementsByName`
        // so we have to fall back to `querySelector`.
        const result = shadowRoot.getElementById(target) || shadowRoot.querySelector(`[name="${target}"]`);
        if (result) {
          return result;
        }
      }

      currentNode = treeWalker.nextNode() as HTMLElement | null;
    }
  }

  return null;
}
