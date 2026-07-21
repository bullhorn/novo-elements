import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsExamplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyInputValue } from '../utils/VerifyUtil';
import { expectedDate, verifyDisplayedDate, datePickerInputField, openInputPicker, overlayCalendar, scopedDate, overlayDate, MmDdYyyyRegex } from '../utils/DatePickerUtil';
import {
    dateTimePicker,
    selectTime,
    verifyDisplayedDateTime,
} from '../utils/DateTimePickerUtil';

describe('Date Time Picker Demo Page', () => {
    const url = formControlsExamplesUrl('date time picker');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Date Time Picker', 'Date Time Picker page title');
        });

        const exampleSections = ['date-time', 'date-time-input'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Date Time Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(dateTimePicker.container);
        });

        it('should display the initial date value', async () => {
            const initial = new Date('12/04/1987');
            await verifyDisplayedDate(dateTimePicker.value, initial, 'date-time initial value');
        });

        it('should select a date and update the value', async () => {
            const expected = await expectedDate(dateTimePicker.picker12hr, 15);
            await click(scopedDate(dateTimePicker.picker12hr, 15));
            await verifyDisplayedDate(dateTimePicker.value, expected, 'date-time value after date selection');
        });

        it('should select a time and update the value', async () => {
            // After clicking a date above, the picker auto-switches to the time view.
            const dateBase = await expectedDate(dateTimePicker.picker12hr, 15);
            dateBase.setHours(15, 30, 0, 0); // 3:30 PM
            await selectTime(dateTimePicker.picker12hr, '3', '30', 'pm');
            await verifyDisplayedDateTime(dateTimePicker.value, dateBase, 'date-time value after time selection');
        });
    });

    describe('Date Time Input Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(dateTimePicker.inputContainer);
        });

        it('should display preset initial values', async () => {
            const presetDateTime1 = new Date('08/01/1983 12:57 PM');
            const presetDateTime2 = new Date('08/02/1984 12:57 PM');
            const presetDateTime3 = new Date('08/03/1985 12:57 PM');
            await verifyDisplayedDate(dateTimePicker.value1, presetDateTime1, 'date-time-input-1 initial value');
            await verifyDisplayedDate(dateTimePicker.value2, presetDateTime2, 'date-time-input-2 initial value');
            await verifyDisplayedDate(dateTimePicker.value3, presetDateTime3, 'date-time-input-3 initial value');
        });

        it('should update value when a date is selected via the 12hr input', async () => {
            await openInputPicker(datePickerInputField(dateTimePicker.input1));
            const expected = await expectedDate(overlayCalendar, 15);
            await click(overlayDate(15));
            await verifyDisplayedDate(dateTimePicker.value1, expected, 'date-time-input-1 value after selection');
        });

        it('should display the selected date in MM/DD/YYYY format', async () => {
            await verifyInputValue(datePickerInputField(dateTimePicker.input1), MmDdYyyyRegex, 'date-time-input-1 date field format');
        });

        it('should update value when a date is selected in the inline picker', async () => {
            const expected = await expectedDate(dateTimePicker.picker3, 15);
            await click(scopedDate(dateTimePicker.picker3, 15));
            await verifyDisplayedDate(dateTimePicker.value3, expected, 'date-time-input-3 value after selection');
        });
    });
});
