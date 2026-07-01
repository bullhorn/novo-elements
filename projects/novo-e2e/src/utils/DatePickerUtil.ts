import { automationId, elements, frame } from './SelectorUtil';
import { scrollIntoView, click } from './ElementActionUtil';
import { waitForElementToBePresent } from './WaitUtil';

export const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MmDdYyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const datePicker = {
    standalone: automationId('date-picker-picker'),
    standaloneValue: automationId('date-picker-value'),
    inputWrapper: automationId('date-picker-input'),
    inputValue: automationId('date-picker-input-value'),
    rangeWrapper: automationId('date-range-input'),
    rangeValue: automationId('date-range-value'),
    weekStartPicker: automationId('week-start-picker'),
    weekStartValue: automationId('week-start-value'),
    limitsStart: automationId('date-picker-limits-start'),
    limitsEnd: automationId('date-picker-limits-end'),
    limitsCalendar: automationId('date-picker-limits-calendar'),
    limitsStartValue: automationId('date-picker-limits-start-value'),
    limitsEndValue: automationId('date-picker-limits-end-value'),
    overlay: frame.overlay,
};

export function scopedDate(scope: string, dayNumber: number | string): string {
    return `${scope} .calendar-date${automationId(dayNumber)}`;
}

export const overlayCalendar = `${datePicker.overlay} ${elements.calendar}`;

export function overlayDate(dayNumber: number | string): string {
    return scopedDate(overlayCalendar, dayNumber);
}

export function scopedWeekdayHeaders(scope: string): string {
    return `${scope} .calendar-th`;
}

export function datePickerMode(mode: 'single' | 'multiple' | 'range' | 'week'): string {
    return `${automationId(`date-picker-mode-${mode}`)} i`;
}

export function datePickerMonths(months: 1 | 2): string {
    return `${automationId(`date-picker-months-${months}`)} i`;
}

export function datePickerInputFormat(index: 1 | 2 | 3 | 4): string {
    return `${automationId(`date-picker-input-format-${index}`)} i`;
}

export function datePickerInputState(state: 'enabled' | 'disabled'): string {
    return `${automationId(`date-picker-input-${state}`)} i`;
}

export function dateRangeMode(mode: 'week' | 'range'): string {
    return `${automationId(`date-range-mode-${mode}`)} i`;
}

export function weekStartButton(day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'): string {
    return automationId(`week-start-${day}`);
}

export function datePickerInputField(wrapperScope: string): string {
    return `${wrapperScope} ${automationId('date-input')}`;
}

export function dateRangeInputField(position: 'start' | 'end' = 'start', wrapperScope: string = datePicker.rangeWrapper): string {
    return `${wrapperScope} ${automationId(`date-range-input-${position}`)}`;
}

export async function clearPreselectedDate(scope: string): Promise<void> {
    await click(scopedDate(scope, new Date().getDate()));
}

export async function openInputPicker(inputFieldSelector: string): Promise<void> {
    await scrollIntoView(inputFieldSelector);
    await click(inputFieldSelector);
    await waitForElementToBePresent(`${datePicker.overlay} ${elements.calendar}`);
}

// Reads the calendar header instead of using new Date() so assertions stay correct in any month/year.
export async function readActiveMonthYear(scope: string, monthViewIndex = 0): Promise<{ monthIndex: number; year: number }> {
    const monthElements = await $$(`${scope} .month`).getElements();
    const yearElements = await $$(`${scope} .year`).getElements();
    const monthLabel = (await monthElements[monthViewIndex].getText()).trim();
    const yearText = (await yearElements[monthViewIndex].getText()).trim();
    const monthIndex = SHORT_MONTHS.indexOf(monthLabel);
    if (monthIndex === -1) {
        throw new Error(`Unrecognized month label '${monthLabel}' in calendar header for scope '${scope}'`);
    }
    return { monthIndex, year: parseInt(yearText, 10) };
}

export async function expectedDate(scope: string, day: number, monthViewIndex = 0): Promise<Date> {
    const { monthIndex, year } = await readActiveMonthYear(scope, monthViewIndex);
    return new Date(year, monthIndex, day);
}

async function getDisplayedRaw(displaySelector: string): Promise<unknown> {
    const text = (await $(displaySelector).getText()).trim();
    return JSON.parse(text);
}

export async function getDisplayedDate(displaySelector: string): Promise<Date> {
    return new Date(await getDisplayedRaw(displaySelector) as string);
}

export async function getDisplayedDateText(displaySelector: string): Promise<Date> {
    const text = (await $(displaySelector).getText()).trim();
    return new Date(text);
}

export async function getDisplayedDates(displaySelector: string): Promise<Date[]> {
    const raw = (await getDisplayedRaw(displaySelector)) as string[];
    return raw.map((value) => new Date(value));
}

export async function getDisplayedRange(displaySelector: string): Promise<{ startDate: Date; endDate: Date }> {
    const raw = (await getDisplayedRaw(displaySelector)) as { startDate: string; endDate: string };
    return { startDate: new Date(raw.startDate), endDate: new Date(raw.endDate) };
}

// Range pickers and standalone week mode default to a Sunday week start, so this mirrors that boundary.
export function sundayWeekRange(date: Date): { start: Date; end: Date } {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
}

function sameYearMonthDay(actual: Date, expected: Date): boolean {
    return (
        actual.getFullYear() === expected.getFullYear() &&
        actual.getMonth() === expected.getMonth() &&
        actual.getDate() === expected.getDate()
    );
}

export async function verifyDisplayedDate(displaySelector: string, expected: Date, friendlyName = 'displayed date'): Promise<void> {
    await browser.waitUntil(
        async () => {
            try {
                return sameYearMonthDay(await getDisplayedDate(displaySelector), expected);
            } catch {
                return false;
            }
        },
        {
            timeout: 8000,
            interval: 500,
            timeoutMsg: `Expected ${friendlyName} (${displaySelector}) to be ${expected.toDateString()} but it was not`,
        },
    );
}

export async function verifyDisplayedDates(displaySelector: string, expected: Date[], friendlyName = 'displayed dates'): Promise<void> {
    const expectedSorted = [...expected].sort((a, b) => a.getTime() - b.getTime());
    await browser.waitUntil(
        async () => {
            try {
                const actual = (await getDisplayedDates(displaySelector)).sort((a, b) => a.getTime() - b.getTime());
                return actual.length === expectedSorted.length && actual.every((date, index) => sameYearMonthDay(date, expectedSorted[index]));
            } catch {
                return false;
            }
        },
        {
            timeout: 8000,
            interval: 500,
            timeoutMsg: `Expected ${friendlyName} (${displaySelector}) to be ${expectedSorted.map((date) => date.toDateString()).join(', ')}`,
        },
    );
}

export async function verifyDisplayedRange(displaySelector: string, expectedStart: Date, expectedEnd: Date, friendlyName = 'displayed range'): Promise<void> {
    await browser.waitUntil(
        async () => {
            try {
                const { startDate, endDate } = await getDisplayedRange(displaySelector);
                return sameYearMonthDay(startDate, expectedStart) && sameYearMonthDay(endDate, expectedEnd);
            } catch {
                return false;
            }
        },
        {
            timeout: 8000,
            interval: 500,
            timeoutMsg: `Expected ${friendlyName} (${displaySelector}) to be ${expectedStart.toDateString()} - ${expectedEnd.toDateString()}`,
        },
    );
}
