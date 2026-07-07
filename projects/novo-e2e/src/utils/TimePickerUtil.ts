import { automationId } from './SelectorUtil';

export const timePicker1 = {
    component: automationId('time-picker-input-1-control'),
};

export const timePicker2 = {
    field: automationId('time-picker-input-2'),
    picker: automationId('time-picker-input-2-picker'),
};

export const timePickerOptions = {
    display24: automationId('time-picker-display-24'),
    display12: automationId('time-picker-display-12'),
    disabledEnabled: automationId('time-picker-disabled-enabled'),
    disabledDisabled: automationId('time-picker-disabled-disabled'),
    buttonsEnabled: automationId('time-picker-buttons-enabled'),
    buttonsDisabled: automationId('time-picker-buttons-disabled'),
};

// novo-time-picker-input renders its picker via CDK TemplatePortal outside the component DOM
export const overlayTimePicker = 'cdk-overlay-container novo-time-picker';
export const timePickerHoursContainer = automationId('novo-time-picker-hours');
export const timePickerMinutesContainer = automationId('novo-time-picker-minutes');
export const timePickerMeridiansContainer = automationId('novo-time-picker-meridians');
export const timePickerSaveButton = 'novo-time-picker .save-button';
export const timePickerCancelButton = 'novo-time-picker .cancel-button';

export function timeInput(componentSelector: string): string {
    return `${componentSelector} ${automationId('time-input')}`;
}

export function pickerToggle(containerSelector: string): string {
    return `${containerSelector} novo-picker-toggle`;
}

export function scopedHours(pickerSelector: string): string {
    return `${pickerSelector} ${timePickerHoursContainer}`;
}

export function scopedMeridians(pickerSelector: string): string {
    return `${pickerSelector} ${timePickerMeridiansContainer}`;
}
