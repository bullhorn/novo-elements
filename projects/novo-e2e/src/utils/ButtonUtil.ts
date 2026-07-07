import { automationId } from './SelectorUtil';

export const buttonSelectors = {
    overviewLabels: 'button-overview-example div.example-label',
    overviewRows: 'button-overview-example div.example-button-row',
    overviewThemeRow: (theme: string) => `button.novo-button.novo-theme-${theme}`,
    dynamicSection: 'button-dynamic-example',
    dynamicCheckbox: `${automationId('disable-button-checkbox')} i`,
    dynamicExample: automationId('dynamic-button-example'),
    loadingSection: 'button-loading-example',
    loadingButton: automationId('button-loading-example'),
    loadingButtonActive: `${automationId('button-loading-example')}[loading="true"]`,
};
