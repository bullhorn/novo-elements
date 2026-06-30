import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsExamplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample } from '../utils/SelectorUtil';
import { verifyPresent, verifyAbsent, verifyDisabled } from '../utils/VerifyUtil';
import {
    timePicker1,
    timePicker2,
    timePickerOptions,
    overlayTimePicker,
    timePickerHoursContainer,
    timePickerMinutesContainer,
    timePickerSaveButton,
    timePickerCancelButton,
    timeInput,
    pickerToggle,
    scopedHours,
    scopedMeridians,
} from '../utils/TimePickerUtil';

describe('Time Picker Demo Page', () => {
    const url = formControlsExamplesUrl('time picker');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display example section - time-picker', async () => {
            await verifyPresent(codeExample('time-picker'), 'time-picker example section');
        });
    });

    describe('Input Components', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(timePicker1.component);
        });

        it('should display the standalone time picker input', async () => {
            await verifyPresent(timePicker1.component, 'standalone time picker input');
        });

        it('should display the field with attached time picker', async () => {
            await verifyPresent(timePicker2.field, 'time picker field');
        });
    });

    describe('Picker 1 Overlay', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(timePicker1.component);
            await click(timeInput(timePicker1.component));
        });

        it('should display the hours column', async () => {
            await verifyPresent(timePickerHoursContainer, 'time picker hours column');
        });

        it('should display the minutes column', async () => {
            await verifyPresent(timePickerMinutesContainer, 'time picker minutes column');
        });
    });

    describe('Picker 1 24h Default', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(timePicker1.component);
            await click(timeInput(timePicker1.component));
        });

        it('should not display the AM/PM column in 24h mode', async () => {
            await verifyAbsent(scopedMeridians(overlayTimePicker), 'meridians column in 24h mode');
        });
    });

    describe('Picker 1 Disabled', () => {
        before(async () => {
            await browser.refresh();
            await click(timePickerOptions.disabledDisabled);
        });

        it('should disable the time input', async () => {
            await verifyDisabled(timeInput(timePicker1.component), 'disabled time input');
        });
    });

    describe('Picker 1 With Buttons', () => {
        before(async () => {
            await browser.refresh();
            await click(timePickerOptions.buttonsEnabled);
            await scrollIntoView(timePicker1.component);
            await click(timeInput(timePicker1.component));
        });

        it('should display the save button', async () => {
            await verifyPresent(timePickerSaveButton, 'time picker save button');
        });

        it('should display the cancel button', async () => {
            await verifyPresent(timePickerCancelButton, 'time picker cancel button');
        });
    });

    describe('Picker 2 Overlay', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(timePicker2.field);
            await click(pickerToggle(timePicker2.field));
        });

        it('should display hours when picker 2 overlay is opened', async () => {
            await verifyPresent(scopedHours(timePicker2.picker), 'picker 2 hours column');
        });

        it('should display the AM/PM column since picker 2 defaults to 12h mode', async () => {
            await verifyPresent(scopedMeridians(timePicker2.picker), 'picker 2 meridians column');
        });
    });
});
