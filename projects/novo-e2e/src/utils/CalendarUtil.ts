/**
 * Returns the selector for a calendar date by day number
 * @param dayNumber the day number to select (1-31)
 */
export function calendarDate(dayNumber: number | string): string {
    return `novo-calendar .calendar-date[data-automation-id="${dayNumber}"]`;
}

/**
 * Returns the selector for the first visible day in the calendar grid
 * (may include overflow days from previous month)
 */
export function firstVisibleCalendarDate(): string {
    return 'novo-calendar .calendar-date:first-child';
}

/**
 * Returns the selector for the last visible day in the calendar grid
 * (may include overflow days from next month)
 */
export function lastVisibleCalendarDate(): string {
    return 'novo-calendar .calendar-date:last-child';
}

/**
 * Gets the selected values from the calendar display as a Date array
 */
export async function getCalendarSelectedValues(): Promise<Date[]> {
    const elements = await $('[data-automation-id="calendar-selected-values"]');
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
