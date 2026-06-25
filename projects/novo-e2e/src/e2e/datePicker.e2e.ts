import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsExamplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyDisabled, verifyAbsent, verifyClassPresent, verifyClassAbsent } from '../utils/VerifyUtil';
import { getAllElements } from '../utils/GetElementUtil';
import {
    datePicker,
    scopedDate,
    overlayDate,
    scopedWeekdayHeaders,
    datePickerMode,
    datePickerInputState,
    dateRangeMode,
    weekStartButton,
    datePickerInputField,
    dateRangeInputField,
    openInputPicker,
    clearPreselectedDate,
    expectedDate,
    verifyDisplayedDate,
    verifyDisplayedDates,
    verifyDisplayedRange,
    getDisplayedDateText,
    sundayWeekRange,
} from '../utils/DatePickerUtil';

const overlayCalendar = `${datePicker.overlay} ${elements.calendar}`;

describe('Date Picker Demo Page', () => {
    const url = formControlsExamplesUrl('date picker');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Date Picker', 'Date Picker example page title');
        });

        const exampleSections = ['date-picker', 'date-picker-input', 'date-range-input', 'week-start', 'date-picker-limits'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Date Picker Standalone', () => {
        describe('Single Selection', () => {
            before(async () => {
                await browser.refresh();
                await scrollIntoView(datePicker.standalone);
            });

            it('should select a single date and display the full date', async () => {
                const expected = await expectedDate(datePicker.standalone, 15);
                await click(scopedDate(datePicker.standalone, 15));
                await verifyClassPresent(scopedDate(datePicker.standalone, 15), 'selected', 'standalone date 15');
                await verifyDisplayedDate(datePicker.standaloneValue, expected, 'standalone selected value');
            });

            it('should replace the selection with a new date', async () => {
                const expected = await expectedDate(datePicker.standalone, 20);
                await click(scopedDate(datePicker.standalone, 20));
                await verifyClassPresent(scopedDate(datePicker.standalone, 20), 'selected', 'standalone date 20');
                await verifyClassAbsent(scopedDate(datePicker.standalone, 15), 'selected', 'standalone date 15');
                await verifyDisplayedDate(datePicker.standaloneValue, expected, 'standalone selected value');
            });

            it('should select the first day of the month', async () => {
                const expected = await expectedDate(datePicker.standalone, 1);
                await click(scopedDate(datePicker.standalone, 1));
                await verifyClassPresent(scopedDate(datePicker.standalone, 1), 'selected', 'standalone date 1');
                await verifyDisplayedDate(datePicker.standaloneValue, expected, 'standalone selected value');
            });
        });

        describe('Multiple Selection', () => {
            before(async () => {
                await browser.refresh();
                await scrollIntoView(datePicker.standalone);
                await click(datePickerMode('multiple'));
                await clearPreselectedDate(datePicker.standalone);
            });

            it('should select multiple dates and display them all', async () => {
                const expected10 = await expectedDate(datePicker.standalone, 10);
                const expected15 = await expectedDate(datePicker.standalone, 15);
                const expected20 = await expectedDate(datePicker.standalone, 20);

                await click(scopedDate(datePicker.standalone, 10));
                await click(scopedDate(datePicker.standalone, 15));
                await click(scopedDate(datePicker.standalone, 20));

                await verifyClassPresent(scopedDate(datePicker.standalone, 10), 'selected', 'standalone date 10');
                await verifyClassPresent(scopedDate(datePicker.standalone, 15), 'selected', 'standalone date 15');
                await verifyClassPresent(scopedDate(datePicker.standalone, 20), 'selected', 'standalone date 20');
                await verifyDisplayedDates(datePicker.standaloneValue, [expected10, expected15, expected20], 'standalone selected values');
            });

            it('should deselect a date when clicking it again', async () => {
                const expected10 = await expectedDate(datePicker.standalone, 10);
                const expected20 = await expectedDate(datePicker.standalone, 20);

                await click(scopedDate(datePicker.standalone, 15));
                await verifyClassAbsent(scopedDate(datePicker.standalone, 15), 'selected', 'standalone date 15');
                await verifyDisplayedDates(datePicker.standaloneValue, [expected10, expected20], 'standalone selected values');
            });
        });

        describe('Range Selection', () => {
            before(async () => {
                await browser.refresh();
                await scrollIntoView(datePicker.standalone);
                await click(datePickerMode('range'));
            });

            it('should select a date range and display the full start and end dates', async () => {
                const expectedStart = await expectedDate(datePicker.standalone, 10);
                const expectedEnd = await expectedDate(datePicker.standalone, 20);

                await clearPreselectedDate(datePicker.standalone);
                await click(scopedDate(datePicker.standalone, 10));
                await click(scopedDate(datePicker.standalone, 20));

                await verifyClassPresent(scopedDate(datePicker.standalone, 10), 'rangeStart', 'standalone range start 10');
                await verifyClassPresent(scopedDate(datePicker.standalone, 20), 'rangeEnd', 'standalone range end 20');
                await verifyDisplayedRange(datePicker.standaloneValue, expectedStart, expectedEnd, 'standalone selected range');
            });
        });

        describe('Week Selection', () => {
            before(async () => {
                await browser.refresh();
                await scrollIntoView(datePicker.standalone);
                await click(datePickerMode('week'));
            });

            it('should select the full week containing the clicked date', async () => {
                const clicked = await expectedDate(datePicker.standalone, 15);
                const { start, end } = sundayWeekRange(clicked);

                await click(scopedDate(datePicker.standalone, 15));
                await verifyClassPresent(scopedDate(datePicker.standalone, 15), 'inRange', 'standalone week date 15');
                await verifyDisplayedRange(datePicker.standaloneValue, start, end, 'standalone selected week');
            });
        });
    });

    describe('Date Picker Input', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(datePicker.inputWrapper);
        });

        it('should default to the current date', async () => {
            await verifyDisplayedDate(datePicker.inputValue, new Date(), 'date-picker-input default value');
        });

        it('should select a date from the overlay and display the full date', async () => {
            await openInputPicker(datePickerInputField(datePicker.inputWrapper));
            const expected = await expectedDate(overlayCalendar, 15);
            await click(overlayDate(15));
            await verifyDisplayedDate(datePicker.inputValue, expected, 'date-picker-input value');
        });

        it('should not open the overlay when disabled', async () => {
            await click(datePickerInputState('disabled'));
            await verifyDisabled(datePickerInputField(datePicker.inputWrapper), 'disabled date-picker-input');
            await verifyAbsent(overlayCalendar, 'date picker overlay calendar');
        });
    });

    describe('Range Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(datePicker.rangeWrapper);
        });

        it('should select a full week in week mode and display the range', async () => {
            await openInputPicker(dateRangeInputField('start'));
            const clicked = await expectedDate(overlayCalendar, 15);
            const { start, end } = sundayWeekRange(clicked);
            await click(overlayDate(15));
            await verifyDisplayedRange(datePicker.rangeValue, start, end, 'date-range week value');
        });

        it('should select a start and end date in range mode and display the full range', async () => {
            await click(dateRangeMode('range'));
            await openInputPicker(dateRangeInputField('start'));
            const expectedStart = await expectedDate(overlayCalendar, 10);
            const expectedEnd = await expectedDate(overlayCalendar, 20);
            await click(overlayDate(10));
            await click(overlayDate(20));
            await verifyDisplayedRange(datePicker.rangeValue, expectedStart, expectedEnd, 'date-range range value');
        });
    });

    describe('Customizing Week Start', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(datePicker.weekStartPicker);
        });

        it('should start the week on Monday', async () => {
            await click(weekStartButton('mon'));
            const headers = await getAllElements(scopedWeekdayHeaders(datePicker.weekStartPicker));
            expect(await headers[0].getText()).toBe('Mo');
        });

        it('should start the week on Sunday', async () => {
            await click(weekStartButton('sun'));
            const headers = await getAllElements(scopedWeekdayHeaders(datePicker.weekStartPicker));
            expect(await headers[0].getText()).toBe('Su');
        });

        it('should select a date and display the full date', async () => {
            const expected = await expectedDate(datePicker.weekStartPicker, 15);
            await click(scopedDate(datePicker.weekStartPicker, 15));
            await verifyClassPresent(scopedDate(datePicker.weekStartPicker, 15), 'selected', 'week-start date 15');
            const displayed = await getDisplayedDateText(datePicker.weekStartValue);
            expect(displayed.getFullYear()).toBe(expected.getFullYear());
            expect(displayed.getMonth()).toBe(expected.getMonth());
            expect(displayed.getDate()).toBe(expected.getDate());
        });
    });

    describe('Date Picker Limits', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(datePicker.limitsStart);
        });

        it('should display both inputs, the calendar, and both value displays', async () => {
            await verifyPresent(datePicker.limitsStart, 'limits start input');
            await verifyPresent(datePicker.limitsEnd, 'limits end input');
            await verifyPresent(datePicker.limitsCalendar, 'limits calendar');
            await verifyPresent(datePicker.limitsStartValue, 'limits start value');
            await verifyPresent(datePicker.limitsEndValue, 'limits end value');
        });

        it('should update the start value display when a start date is selected', async () => {
            await openInputPicker(datePickerInputField(datePicker.limitsStart));
            const expected = await expectedDate(overlayCalendar, 15);
            await click(overlayDate(15));
            await verifyDisplayedDate(datePicker.limitsStartValue, expected, 'limits start value');
        });

        it('should update the end value display when an end date is selected', async () => {
            await openInputPicker(datePickerInputField(datePicker.limitsEnd));
            const expected = await expectedDate(overlayCalendar, 20);
            await click(overlayDate(20));
            await verifyDisplayedDate(datePicker.limitsEndValue, expected, 'limits end value');
        });
    });
});
