import { automationId, codeExample, elements } from './SelectorUtil';

export const breadcrumbSelectors = {
    page: 'breadcrumb-examples-page',
    staticExample: codeExample('breadcrumb-usage'),
    dynamicExample: codeExample('breadcrumb-source-usage'),
    dropdownButton: 'novo-breadcrumb-item novo-button',
    dropdownContainer: elements.dropdownContainer,
    dropdownOption: '.novo-option-text',
    staticHomeLink: `${automationId('breadcrumb-home')} span.novo-breadcrumb-item a`,
    staticComponentsSpan: `${automationId('breadcrumb-components')} span.novo-breadcrumb-item span`,
};

export function dynamicItemLink(exampleSelector: string): string {
    return `${exampleSelector} span.novo-breadcrumb-item a`;
}

export function dynamicItemSpan(exampleSelector: string): string {
    return `${exampleSelector} span.novo-breadcrumb-item span`;
}
