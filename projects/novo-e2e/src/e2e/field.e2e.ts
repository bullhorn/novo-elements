import { click, clearInputAndSendKeys, scrollIntoView, sendKeysWithoutElement } from '../utils/ElementActionUtil';
import { examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements, keyboardKeys } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyInputValue, verifyTextIncludes } from '../utils/VerifyUtil';

// ─── Selectors ────────────────────────────────────────────────────────────────

const field = {
  // Date of Birth (date picker)
  dob: {
    setNull:   '[data-automation-id="dob-set-null"]',
    set1:      '[data-automation-id="dob-set-1"]',
    set2:      '[data-automation-id="dob-set-2"]',
    field:     '[data-automation-id="dob-field"]',
    input:     '[data-automation-id="dob-input"]',
    value:     '[data-automation-id="dob-value"]',
    // novo-picker-toggle renders a novo-button which renders a <button>
    toggle:    '[data-automation-id="dob-field"] novo-picker-toggle button',
  },

  // Datetime (date-time picker)
  datetime: {
    setNull:   '[data-automation-id="datetime-set-null"]',
    set1:      '[data-automation-id="datetime-set-1"]',
    set2:      '[data-automation-id="datetime-set-2"]',
    field:     '[data-automation-id="datetime-field"]',
    input:     '[data-automation-id="datetime-input"]',
    value:     '[data-automation-id="datetime-value"]',
    toggle:    '[data-automation-id="datetime-field"] novo-picker-toggle button',
  },

  // Vacation (date range picker)
  vacation: {
    setNull:   '[data-automation-id="vacation-set-null"]',
    set1:      '[data-automation-id="vacation-set-1"]',
    set2:      '[data-automation-id="vacation-set-2"]',
    field:     '[data-automation-id="vacation-field"]',
    input:     '[data-automation-id="vacation-input"]',
    value:     '[data-automation-id="vacation-value"]',
    toggle:    '[data-automation-id="vacation-field"] novo-picker-toggle button',
  },

  // Calendar popup (shared overlay container)
  popup: {
    calendar:  '.cdk-overlay-container novo-calendar',
    day13:     '.cdk-overlay-container novo-calendar [data-automation-id="13"]',
    day20:     '.cdk-overlay-container novo-calendar [data-automation-id="20"]',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Type a date string into an input, then Tab away to commit. */
async function typeDate(inputSelector: string, value: string): Promise<void> {
  await clearInputAndSendKeys(inputSelector, value);
  await sendKeysWithoutElement(keyboardKeys.tab);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Field Usage Example Page', () => {
  const url = examplesUrl('field');

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(getURLs().HOME);
  });

  // ── Page presence ─────────────────────────────────────────────────────────

  describe('Page Elements', () => {
    it('should display the page title', async () => {
      await verifyPresent(elements.title);
      await verifyText(elements.title, 'Field', 'Field page title');
    });

    it('should display the dob field', async () => {
      await verifyPresent(field.dob.field);
    });

    it('should display the datetime field', async () => {
      await verifyPresent(field.datetime.field);
    });

    it('should display the vacation (date range) field', async () => {
      await verifyPresent(field.vacation.field);
    });
  });

  // ── Date of Birth field (novo-date-picker) ────────────────────────────────

  describe('Date of Birth field', () => {
    before(async () => {
      await scrollIntoView(field.dob.field);
    });

    it('should start with a value (today)', async () => {
      // The hint shows the Date object; it should contain a year.
      await verifyTextIncludes(field.dob.value, '20', 'dob initial value contains a year');
    });

    describe('External setter buttons', () => {
      it('should set value to November 16, 2004 when set-1 is clicked', async () => {
        await click(field.dob.set1);
        await verifyTextIncludes(field.dob.value, '2004', 'dob value after set-1');
      });

      it('should set value to June 19, 2021 when set-2 is clicked', async () => {
        await click(field.dob.set2);
        await verifyTextIncludes(field.dob.value, '2021', 'dob value after set-2');
      });

      it('should clear the value when set-null is clicked', async () => {
        await click(field.dob.setNull);
        await verifyText(field.dob.value, 'value is:', 'dob value after set-null');
      });
    });

    describe('Typing into the date input', () => {
      before(async () => {
        // Restore a known value first so the input is in a clean state
        await click(field.dob.set2);
      });

      it('should accept a typed ISO date and reflect it in the hint', async () => {
        await typeDate(field.dob.input, '03-26-2026');
        await verifyTextIncludes(field.dob.value, '2026', 'dob value after typing');
      });
    });

    /*
    describe('Selecting a day from the calendar popup', () => {
      before(async () => {
        await click(field.dob.toggle);
      });

      it('should open the calendar popup', async () => {
        await verifyPresent(field.popup.calendar);
      });

      it('should update the hint after selecting day 13', async () => {
        await click(field.popup.day13);
        await verifyTextIncludes(field.dob.value, '13', 'dob value after calendar selection');
      });*/
    });
  });

  // ── Datetime field (novo-date-time-picker) ────────────────────────────────

  describe('Datetime field', () => {
    before(async () => {
      await scrollIntoView(field.datetime.field);
    });

    it('should start with a value (today)', async () => {
      await verifyTextIncludes(field.datetime.value, '20', 'datetime initial value contains a year');
    });

    describe('External setter buttons', () => {
      it('should set value to November 16, 2004 when set-1 is clicked', async () => {
        await click(field.datetime.set1);
        await verifyTextIncludes(field.datetime.value, '2004', 'datetime value after set-1');
      });

      it('should set value to June 19, 2021 when set-2 is clicked', async () => {
        await click(field.datetime.set2);
        await verifyTextIncludes(field.datetime.value, '2021', 'datetime value after set-2');
      });

      it('should clear the value when set-null is clicked', async () => {
        await click(field.datetime.setNull);
        await verifyText(field.datetime.value, 'value is:', 'datetime value after set-null');
      });
    });
  });

  // ── Vacation field (date range picker) ───────────────────────────────────

  describe('Vacation (date range) field', () => {
    before(async () => {
      await scrollIntoView(field.vacation.field);
    });

    describe('External setter buttons', () => {
      it('should set a date range when set-1 is clicked', async () => {
        await click(field.vacation.set1);
        await verifyTextIncludes(field.vacation.value, '2004', 'vacation value after set-1');
      });

      it('should set a different date range when set-2 is clicked', async () => {
        await click(field.vacation.set2);
        await verifyTextIncludes(field.vacation.value, '2021', 'vacation value after set-2');
      });

      it('should clear the date range when set-null is clicked', async () => {
        await click(field.vacation.setNull);
        await verifyText(field.vacation.value, 'value is:', 'vacation value after set-null');
      });
    });
  });
});
