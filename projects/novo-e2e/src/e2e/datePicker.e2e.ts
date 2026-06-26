import { sharedSelectors } from 'projects/novo-e2e/src/e2e/common/table.common';
import { click, clearInputAndSendKeys, scrollIntoView, clickRadio, sendKeysWithoutElement } from '../utils/ElementActionUtil';
import { formControlsExamplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements, keyboardKeys } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyInputValue, verifyTextIncludes, verifyAbsent } from '../utils/VerifyUtil';

// ─── Selectors ────────────────────────────────────────────────────────────────

const datePicker = {
  // Date Picker Input example
  input: {
    container:   '[data-automation-id="date-picker-input-container"]',
    component:   '[data-automation-id="date-picker-input"]',
    textInput:   '[data-automation-id="date-picker-input"] [data-automation-id="date-input"]',
    value:       '[data-automation-id="date-picker-input-value"]',
    clearBtn:    '[data-automation-id="date-picker-input"] .bhi-times',
    // Format radio buttons (clickRadio appends " i" to reach the icon inside novo-radio)
    formatMmDdYyyy:      '[data-automation-id="date-picker-input-format-1"]',  // MM-DD-YYYY
    formatDdMmYyyy:      '[data-automation-id="date-picker-input-format-2"]',  // DD-MM-YYYY
    formatMmmDdYyyy:     '[data-automation-id="date-picker-input-format-3"]',  // MMM DD, YYYY
    formatDddMmmDdYyyy:  '[data-automation-id="date-picker-input-format-4"]',  // ddd MMM DD, YYYY (default)
  },

  // Date Range Input example
  range: {
    component:  '[data-automation-id="date-range-input"]',
    startInput: '[data-automation-id="date-range-input-start"]',
    endInput:   '[data-automation-id="date-range-input-end"]',
    value:      '[data-automation-id="date-range-value"]',
    modeRange:  '[data-automation-id="date-range-mode-range"]',
    modeWeek:   '[data-automation-id="date-range-mode-week"]',
  },

  // Date Picker Limits example
  // These inputs have no format prop, so textMask is active (accepts digits + / . -)
  limits: {
    startComponent: '[data-automation-id="date-picker-limits-start"]',
    startInput:     '[data-automation-id="date-picker-limits-start"] [data-automation-id="date-input"]',
    startValue:     '[data-automation-id="date-picker-limits-start-value"]',
    endComponent:   '[data-automation-id="date-picker-limits-end"]',
    endInput:       '[data-automation-id="date-picker-limits-end"] [data-automation-id="date-input"]',
    endValue:       '[data-automation-id="date-picker-limits-end-value"]',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Type a date string into an input, then Tab away to commit the value. */
async function typeDate(inputSelector: string, value: string): Promise<void> {
  await clearInputAndSendKeys(inputSelector, value);
  await sendKeysWithoutElement(keyboardKeys.tab);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Date Picker Demo Page', () => {
  const url = formControlsExamplesUrl('date picker');

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(getURLs().HOME);
  });

  // ── Page Elements ────────────────────────────────────────────────────────────

  describe('Page Elements', () => {
    it('should display the page title', async () => {
      await verifyPresent(elements.title);
      await verifyText(elements.title, 'Date Picker', 'Date Picker page title');
    });

    const exampleSections = [
      'date-picker',
      'date-picker-input',
      'date-range-input',
      'week-start',
      'date-picker-limits',
    ];
    exampleSections.forEach((section) => {
      it(`should display example section - ${section}`, async () => {
        await verifyPresent(codeExample(section));
      });
    });
  });

  // ── Date Picker Input ────────────────────────────────────────────────────────
  //
  // Uses novo-date-picker-input. We switch to MM-DD-YYYY format (no text mask,
  // user types freely with dashes) so keyboard input is straightforward.

  describe('Date Picker Input', () => {
    const MmmDdYyyyRegex = /\w+ \w+ \d{1,2}, \d{4}/;
    before(async () => {
      await scrollIntoView(datePicker.input.container);
    });

    it('should display the date input field', async () => {
      await verifyPresent(datePicker.input.textInput);
    });

    it('should already have a date value entered (Today)', async () =>{
      await verifyText(datePicker.input.textInput, MmmDdYyyyRegex);
    });

    describe('Typing a date with MM-DD-YYYY format', () => {
      before(async () => {
        // Switch format so we can type a simple date string (no text mask in this mode)
        await clickRadio(datePicker.input.formatMmDdYyyy);
      });

      it('should accept 03-26-2026 and reflect it in the input', async () => {
        await typeDate(datePicker.input.textInput, '03-26-2026');
        await verifyInputValue(datePicker.input.textInput, '03-26-2026', 'date picker input');
        await verifyAbsent(sharedSelectors.errorText);
      });

      it('should clear the date when the clear icon is clicked', async () => {
        await click(datePicker.input.clearBtn);
        await verifyInputValue(datePicker.input.textInput, '', 'date picker input after clear');
      });
    });

    describe('Typing a date with MMM DD, YYYY format', () => {
      before(async () => {
        await clickRadio(datePicker.input.formatMmmDdYyyy);
      });

      it('should accept "Mar 26, 2026" and update the selected value', async () => {
        await typeDate(datePicker.input.textInput, 'Mar 26, 2026');
        await verifyTextIncludes(datePicker.input.value, '2026-03-26', 'date picker value output (MMM DD, YYYY)');
        await verifyAbsent(sharedSelectors.errorText);
      });

      after(async () => {
        // Reset to default format
        await click(datePicker.input.clearBtn);
        await clickRadio(datePicker.input.formatDddMmmDdYyyy);
      });
    });
  });

  // ── Date Range Input ─────────────────────────────────────────────────────────
  //
  // Uses novo-date-range-input. Default mode is "week"; we switch to "range" so
  // start and end dates are entered independently. Default format is MM-DD-YYYY.

  describe('Date Range Input', () => {
    before(async () => {
      await scrollIntoView(datePicker.range.component);
      await clickRadio(datePicker.range.modeRange);
    });

    it('should display start and end date inputs', async () => {
      await verifyPresent(datePicker.range.startInput);
      await verifyPresent(datePicker.range.endInput);
    });

    it('should accept a typed start date of 03-26-2026', async () => {
      await typeDate(datePicker.range.startInput, '03-26-2026');
      await verifyInputValue(datePicker.range.startInput, '03-26-2026', 'date range start input');
    });

    it('should accept a typed end date of 03-28-2026', async () => {
      await typeDate(datePicker.range.endInput, '03-28-2026');
      await verifyInputValue(datePicker.range.endInput, '03-28-2026', 'date range end input');
    });

    it('should reflect both dates in the selected value output', async () => {
      await verifyTextIncludes(datePicker.range.value, '2026-03-26', 'date range value output (start)');
      await verifyTextIncludes(datePicker.range.value, '2026-03-28', 'date range value output (end)');
    });

    after(async () => {
      // Restore default week mode
      await clickRadio(datePicker.range.modeWeek);
    });
  });

  // ── Date Picker Limits ───────────────────────────────────────────────────────
  //
  // Uses two novo-date-picker-input components without an explicit format prop,
  // so the default text mask is active. The mask accepts digits plus / . -
  // separators, so "03/26/2026" is a natural input string here.

  describe('Date Picker Limits', () => {
    before(async () => {
      await scrollIntoView(datePicker.limits.startComponent);
    });

    it('should display start and end date limit inputs', async () => {
      await verifyPresent(datePicker.limits.startInput);
      await verifyPresent(datePicker.limits.endInput);
    });

    it('should accept a typed start date of 03/26/2026', async () => {
      await typeDate(datePicker.limits.startInput, '03/26/2026');
      await verifyTextIncludes(datePicker.limits.startValue, '2026-03-26', 'limits start value output');
    });

    it('should accept a typed end date of 03/28/2026', async () => {
      await typeDate(datePicker.limits.endInput, '03/28/2026');
      await verifyTextIncludes(datePicker.limits.endValue, '2026-03-28', 'limits end value output');
    });
  });
});
