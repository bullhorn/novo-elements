import { automationId } from './SelectorUtil';

export const linearProgressSelectors = {
    flashContainer: automationId('progress-bar-flash'),
    flashBar: automationId('progress-bar-flash-bar'),
    indeterminateContainer: automationId('progress-bar-indeterminate'),
    indeterminateBar: automationId('progress-bar-indeterminate-bar'),
    stripedContainer: automationId('progress-bar-striped'),
    stripedBar: automationId('progress-bar-striped-bar'),
    multiColorContainer: automationId('progress-bar-multi-color'),
    multiColorSuccessBar: automationId('progress-bar-multi-color-success'),
    multiColorNegativeBar: automationId('progress-bar-multi-color-negative'),
};

export const radialProgressSelectors = {
    singleContainer: automationId('progress-radial-single'),
    singleBar: automationId('progress-radial-single-bar'),
    multiContainer: automationId('progress-radial-multi'),
    multiSuccessBar: automationId('progress-radial-multi-success'),
    multiNegativeBar: automationId('progress-radial-multi-negative'),
    multiWarningBar: automationId('progress-radial-multi-warning'),
};
