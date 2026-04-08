import { automationId, elements } from './SelectorUtil';

export const CALENDAR_MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

/**
 * Gets a month name offset from the current month
 * @param offset number of months to offset (negative for past, positive for future)
 * @returns the month name
 */
export function getMonthByOffset(offset: number): string {
    const currentDate = new Date();
    let targetMonthIndex = currentDate.getMonth() + offset;
    if (targetMonthIndex < 0) {
        targetMonthIndex += 12;
    } else if (targetMonthIndex > 11) {
        targetMonthIndex -= 12;
    }
    return CALENDAR_MONTHS[targetMonthIndex];
}

/**
 * Gets a year offset from the current year
 * @param offset number of years to offset (negative for past, positive for future)
 * @returns the year number
 */
export function getYearByOffset(offset: number): number {
    return new Date().getFullYear() + offset;
}

/**
 * Returns the selector for a calendar date by day number
 * @param dayNumber the day number to select (1-31)
 */
export function calendarDate(dayNumber: number | string): string {
    return `${elements.calendar} .calendar-date${automationId(dayNumber)}`;
}

/**
 * Returns the selector for the first visible day in the calendar grid
 * (may include overflow days from previous month)
 */
export function firstVisibleCalendarDate(): string {
    return `${elements.calendar} .calendar-date:first-child`;
}

/**
 * Returns the selector for the last visible day in the calendar grid
 * (may include overflow days from next month)
 */
export function lastVisibleCalendarDate(): string {
    return `${elements.calendar} .calendar-date:last-child`;
}

/**
 * Returns the selector for the month header
 */
export function calendarMonthHeader(): string {
    return automationId('header-month');
}

/**
 * Returns the selector for the year header
 */
export function calendarYearHeader(): string {
    return automationId('header-year');
}

/**
 * Returns the selector for the next month button
 */
export function calendarNextButton(): string {
    return automationId('calendar-next');
}

/**
 * Returns the selector for the previous month button
 */
export function calendarPreviousButton(): string {
    return automationId('calendar-previous');
}

/**
 * Returns the selector for the month text element
 */
export function calendarMonthText(): string {
    return `${elements.calendar} .month`;
}

/**
 * Returns the selector for the year text element
 */
export function calendarYearText(): string {
    return `${elements.calendar} .year`;
}

/**
 * Returns the selector for a month by name in month view
 */
export function calendarMonth(monthName: string): string {
    return `div${automationId(monthName)}`;
}

/**
 * Returns the selector for a year by number in year view
 */
export function calendarYear(yearNumber: number): string {
    return `div${automationId(yearNumber)}`;
}


/**
 * Gets the selected values from the calendar display as a Date array
 */
export async function getCalendarSelectedValues(): Promise<Date[]> {
    // TODO: swap this back
    // const element = await $(automationId('calendar-selected-values'));
    const elements = await $$('novo-label ~ div');
    const text = await elements[0].getText();
    return JSON.parse(text);
}

/**
 * Verifies that a specific day is selected in the calendar output
 */
export async function verifyCalendarDateSelected(dayNumber: number): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    expect(selectedValues.length).toBe(1);
    const selectedDate = new Date(selectedValues[0]);
    expect(selectedDate.getDate()).toBe(dayNumber);
}

/**
 * Verifies that multiple specific days are selected in the calendar output
 */
export async function verifyCalendarDatesSelected(dayNumbers: number[]): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    expect(selectedValues.length).toBe(dayNumbers.length);
    const selectedDays = selectedValues.map(val => new Date(val).getDate()).sort((a, b) => a - b);
    const expectedDays = dayNumbers.sort((a, b) => a - b);
    expect(selectedDays).toEqual(expectedDays);
}
