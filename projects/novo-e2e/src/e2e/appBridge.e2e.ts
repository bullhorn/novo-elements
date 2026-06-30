import { getElementText } from 'projects/novo-e2e/src/utils/ElementPropertiesUtil';
import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { testingUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText, verifyTextIncludes } from '../utils/VerifyUtil';

// ─── Selectors ────────────────────────────────────────────────────────────────

// Parent frame (the outer Angular app page)
const parent = {
  frame:          '[data-automation-id="ab-child-frame"]',
  fireEvent:      '[data-automation-id="ab-parent-fire-event"]',
  register:       '[data-automation-id="ab-received-register"]',
  open:           '[data-automation-id="ab-received-open"]',
  update:         '[data-automation-id="ab-received-update"]',
  close:          '[data-automation-id="ab-received-close"]',
  refresh:        '[data-automation-id="ab-received-refresh"]',
  pin:            '[data-automation-id="ab-received-pin"]',
  customEvent:    '[data-automation-id="ab-received-custom"]',
};

// Child frame (inside the iframe)
const child = {
  status:         '[data-automation-id="ab-child-status"]',
  parentEvent:    '[data-automation-id="ab-child-parent-event"]',
  register:       '[data-automation-id="ab-child-register"]',
  open:           '[data-automation-id="ab-child-open"]',
  update:         '[data-automation-id="ab-child-update"]',
  close:          '[data-automation-id="ab-child-close"]',
  refresh:        '[data-automation-id="ab-child-refresh"]',
  pin:            '[data-automation-id="ab-child-pin"]',
  fireEvent:      '[data-automation-id="ab-child-fire-event"]',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Switch WebdriverIO context into the child iframe. */
async function enterChildFrame(): Promise<void> {
  const frame = await $(parent.frame);
  await browser.switchFrame(frame);
}

/** Return context to the parent (outer) page. */
async function leaveChildFrame(): Promise<void> {
  await browser.switchFrame(null);
}

/**
 * Click a button inside the child iframe, then return to the parent frame to
 * verify that the parent received the expected message.
 */
async function actAndVerify(
  childSelector: string,
  parentSelector: string,
  expectedText: string,
  description: string,
): Promise<void> {
  await enterChildFrame();
  await click(childSelector);
  await leaveChildFrame();
  await verifyTextIncludes(parentSelector, expectedText, description);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('AppBridge — parent/child iframe communication', () => {
  const url = testingUrl('app-bridge');

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(getURLs().HOME);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  describe('Page load', () => {
    it('should display the child iframe', async () => {
      await verifyPresent(parent.frame);
    });

    it('child should auto-register and parent should record it', async () => {
      // The child calls register() on ngOnInit; wait for the parent log to fill.
      await verifyText(parent.register, /register:\s*\d{10,}/, 'parent received register id');
    });

    it('child status should reflect successful registration', async () => {
      await enterChildFrame();
      await verifyTextIncludes(child.status, 'registered', 'child status after register');
      await leaveChildFrame();
    });
  });

  // ── Child → Parent actions ───────────────────────────────────────────────

  describe('open', () => {
    it('parent should receive an open event with entityType', async () => {
      await actAndVerify(child.open, parent.open, 'Candidate', 'parent received open');
    });
  });

  describe('update', () => {
    it('parent should receive an update event with the title', async () => {
      await actAndVerify(child.update, parent.update, 'E2E Test Title', 'parent received update');
    });
  });

  describe('close', () => {
    it('parent should receive a close event', async () => {
      await actAndVerify(child.close, parent.close, 'closed', 'parent received close');
    });
  });

  describe('refresh', () => {
    it('parent should receive a refresh event', async () => {
      await actAndVerify(child.refresh, parent.refresh, 'refreshed', 'parent received refresh');
    });
  });

  describe('pin', () => {
    it('parent should receive a pin event', async () => {
      await actAndVerify(child.pin, parent.pin, 'pinned', 'parent received pin');
    });
  });

  describe('custom event (child → parent)', () => {
    it('parent should receive the custom event payload', async () => {
      await actAndVerify(child.fireEvent, parent.customEvent, 'child', 'parent received custom event from child');
    });
  });

  // ── Parent → Child broadcast ─────────────────────────────────────────────

  describe('custom event (parent → children)', () => {
    it('child should receive a custom event broadcast from the parent', async () => {
      // Fire from parent
      await click(parent.fireEvent);

      // Verify inside child iframe
      await enterChildFrame();
      await verifyTextIncludes(child.parentEvent, 'parent', 'child received custom event from parent');
      await leaveChildFrame();
    });
  });
});
