import { automationId } from './SelectorUtil';
import { click } from './ElementActionUtil';
import { getDisplayedDate } from './DatePickerUtil';

export const dateTimePicker = {
    container: automationId('date-time-container'),
    picker12hr: automationId('date-time-picker-12hr'),
    value: automationId('date-time-value'),
    inputContainer: automationId('date-time-input-container'),
    input1: automationId('date-time-input-1'),
    input2: automationId('date-time-input-2'),
    picker3: automationId('date-time-input-picker3'),
    value1: automationId('date-time-input-value-1'),
    value2: automationId('date-time-input-value-2'),
    value3: automationId('date-time-input-value-3'),
};

export function timePickerHour(scope: string, hour: string | number): string {
    return `${scope} ${automationId('novo-time-picker-hours')} ${automationId(hour)}`;
}

export function timePickerMinute(scope: string, minute: string): string {
    return `${scope} ${automationId('novo-time-picker-minutes')} ${automationId(minute)}`;
}

export function timePickerMeridian(scope: string, meridian: 'am' | 'pm'): string {
    return `${scope} ${automationId('novo-time-picker-meridians')} ${automationId(meridian)}`;
}

export async function selectTime(scope: string, hour: string | number, minute: string, meridian?: 'am' | 'pm'): Promise<void> {
    await click(timePickerHour(scope, hour));
    await click(timePickerMinute(scope, minute));
    if (meridian !== undefined) {
        await click(timePickerMeridian(scope, meridian));
    }
}

export async function verifyDisplayedDateTime(displaySelector: string, expected: Date, friendlyName = 'displayed date-time'): Promise<void> {
    await browser.waitUntil(
        async () => {
            try {
                const actual = await getDisplayedDate(displaySelector);
                return (
                    actual.getFullYear() === expected.getFullYear() &&
                    actual.getMonth() === expected.getMonth() &&
                    actual.getDate() === expected.getDate() &&
                    actual.getHours() === expected.getHours() &&
                    actual.getMinutes() === expected.getMinutes()
                );
            } catch {
                return false;
            }
        },
        {
            timeout: 8000,
            interval: 500,
            timeoutMsg: `Expected ${friendlyName} (${displaySelector}) to be ${expected.toISOString()} but it was not`,
        },
    );
}
