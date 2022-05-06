import { expect, Locator, Page } from '@playwright/test';

// From example https://playwright.dev/docs/test-pom
export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  // From comments on adding .clock() functionality https://github.com/microsoft/playwright/issues/6347#issuecomment-1085850728
  async setDateTime(dateString: string) {
      // Pick the new/fake "now" for you test pages. Should be valid date string format e.g. 'March 14 2042 13:37:11'
    const fakeNow = new Date(dateString).valueOf();

    // Update the Date accordingly in your test pages
    await this.page.addInitScript(`{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
        constructor(...args) {
        if (args.length === 0) {
            super(${fakeNow});
        } else {
            super(...args);
        }
        }
    }
    // Override Date.now() to start from fakeNow
    const __DateNowOffset = ${fakeNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
    }`);
  }
}