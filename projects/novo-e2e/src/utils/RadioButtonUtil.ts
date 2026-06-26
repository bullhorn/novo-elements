import { automationId } from './SelectorUtil';

export const radioSelectors = {
    basicGroup: automationId('radio-basic-group'),
    basicRadio: (value: string): string => automationId(`radio-basic-${value}`),
    basicIcon: (value: string): string => `${automationId(`radio-basic-${value}`)} i`,
    basicLabel: (value: string): string => `${automationId(`radio-basic-${value}`)} label`,

    buttonGroup: automationId('radio-button-group'),
    buttonRadio: (value: string): string => automationId(`radio-button-${value}`),
    buttonControl: (value: string): string => `${automationId(`radio-button-${value}`)} novo-button`,
    buttonLabel: (value: string): string => `${automationId(`radio-button-${value}`)} label`,

    iconGroup: automationId('radio-icon-group'),
    iconRadio: (icon: string): string => automationId(`radio-icon-${icon}`),
    iconControl: (icon: string): string => `${automationId(`radio-icon-${icon}`)} novo-button`,
    iconLabel: (icon: string): string => `${automationId(`radio-icon-${icon}`)} label`,

    verticalGroup: automationId('radio-vertical-group'),
    verticalRadio: (value: string): string => automationId(`radio-vertical-${value}`),
    verticalIcon: (value: string): string => `${automationId(`radio-vertical-${value}`)} i`,
    verticalLabel: (value: string): string => `${automationId(`radio-vertical-${value}`)} label`,
};
