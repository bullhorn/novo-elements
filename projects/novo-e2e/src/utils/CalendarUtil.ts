import { automationId, elements } from './SelectorUtil';
import { verifyClassPresent } from './VerifyUtil';
import { getAllElements } from './GetElementUtil';

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
    'December',
];

export const calendar = {
    monthHeader: automationId('header-month'),
    yearHeader: automationId('header-year'),
    nextButton: automationId('calendar-next'),
    previousButton: automationId('calendar-previous'),
    monthText: `${elements.calendar} .month`,
    yearText: `${elements.calendar} .year`,
    weekdayHeaders: `${elements.calendar} .calendar-th`,
    firstVisibleDate: `${elements.calendar} .calendar-date:first-child`,
    lastVisibleDate: `${elements.calendar} .calendar-date:last-child`,
    selectedValues: automationId('calendar-selected-values'),
};

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

export function calendarDate(dayNumber: number | string): string {
    return `${elements.calendar} .calendar-date${automationId(dayNumber)}`;
}

/**
 * Returns the selector for a calendar date in a specific month
 * @param dayNumber the day number to select
 * @param monthIndex the index of the month
 */
export function calendarDateInMonth(dayNumber: number | string, monthIndex: number): string {
    return `${elements.calendar} .month-view:nth-of-type(${monthIndex + 1}) .calendar-date${automationId(dayNumber)}`;
}

export function calendarMonth(monthName: string): string {
    return `div${automationId(monthName)}`;
}

export function calendarYear(yearNumber: number): string {
    return `div${automationId(yearNumber)}`;
}

export function calendarSelectionMode(mode: string): string {
    return `${automationId(`mode-${mode}`)} i`;
}

export function calendarNumberOfMonths(months: number): string {
    return `${automationId(`months-${months}`)} i`;
}

/**
 * Returns the selector for the week start radio button by day (0 for Sunday, 1 for Monday)
 */
export function calendarWeekStart(day: number): string {
    return `${automationId(`weekstart-${day}`)} i`;
}

/**
 * Gets the selected values from the calendar display as a Date array
 */
export async function getCalendarSelectedValues(): Promise<Date[]> {
    const valueText = await $(calendar.selectedValues).getText();
    return JSON.parse(valueText);
}

export async function verifyCalendarDateSelected(dayNumber: number): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    expect(selectedValues.length).toBe(1);
    const selectedDate = new Date(selectedValues[0]);
    expect(selectedDate.getDate()).toBe(dayNumber);
}

export async function verifyCalendarDatesSelected(dayNumbers: number[]): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    expect(selectedValues.length).toBe(dayNumbers.length);
    const selectedDays = selectedValues.map(val => new Date(val).getDate()).sort((a, b) => a - b);
    const expectedDays = dayNumbers.sort((a, b) => a - b);
    expect(selectedDays).toEqual(expectedDays);
}

export async function getCalendarWeekdayHeaders(): Promise<WebdriverIO.ElementArray> {
    return await getAllElements(calendar.weekdayHeaders);
}

export async function verifyCalendarDateRangeSelected(startDay: number, endDay: number): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    expect(selectedValues.length).toBe(2);
    const selectedDates = selectedValues.map(val => new Date(val).getDate()).sort((a, b) => a - b);
    expect(selectedDates).toEqual([startDay, endDay].sort((a, b) => a - b));
}

export async function verifyCalendarWeekRangeDays(): Promise<void> {
    const selectedValues = await getCalendarSelectedValues();
    const startDay = new Date(selectedValues[0]).getDate();
    const endDay = new Date(selectedValues[1]).getDate();

    await verifyCalendarDateRangeSelected(startDay, endDay);

    await verifyClassPresent(calendarDate(startDay), 'rangeStart', `calendar date ${startDay} (range start)`);
    await verifyClassPresent(calendarDate(endDay), 'rangeEnd', `calendar date ${endDay} (range end)`);

    for (let day = startDay + 1; day < endDay; day++) {
        await verifyClassPresent(calendarDate(day), 'inRange', `calendar date ${day} (in range)`);
    }
}
