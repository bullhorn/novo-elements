import { automationId } from './SelectorUtil';

export const switchSelectors = {
    label: () => automationId('switch-label'),
    value: () => automationId('switch-value'),
    defaultSwitch: () => automationId('switch-default'),
    grapefruitSwitch: () => automationId('switch-grapefruit'),
    disabledSwitch: () => automationId('switch-disabled'),
};
