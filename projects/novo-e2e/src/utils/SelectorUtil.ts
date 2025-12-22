/**
 * Common element attributes.
 */
export enum Attributes {
    automationId = 'data-automation-id',
    automationValue = 'data-automation-value',
    backgroundColor = 'background-color',
    color = 'color',
    dataHint = 'data-hint',
    tooltip = 'tooltip',
    hidden = 'hidden',
    id = 'id',
    innerText = 'innerText',
    name = 'name',
    src = 'src',
    style = 'style',
    title = 'title',
    type = 'type',
    value = 'value',
    action = 'action',
    ariaSelected = 'aria-selected',
    disabled = 'disabled'
}

/**
 * Common element classes.
 */
export enum Classes {
    active = 'active',
    disabled = 'disabled',
    novoButtonDisabled = 'novo-button-disabled',
    novoOptionDisabled = 'novo-option-disabled',
    controlDisabled = 'control-disabled',
    expanded = 'expanded',
    open = 'open',
    validForm = 'valid-form',
    activeRouterLink = 'router-link-active',
    bhiCheckboxFilled = 'bhi-checkbox-filled',
    bhiCheckboxUnfilled = 'bhi-checkbox-empty'
}

export const elements = {
    title: 'novo-title',
    text: 'novo-text',
    icon: 'novo-icon',
    search: 'novo-search',
    loading: 'novo-loading',
    tipWell: 'novo-tip-well',
    novoButton: 'button.novo-button',
    primary: 'button.novo-button.novo-theme-primary',
    secondary: 'button.novo-button.novo-theme-secondary',
    iconButton: 'button.novo-button.novo-theme-icon',
    fab: 'button.novo-button.novo-theme-fab',
    dialogue: 'button.novo-button.novo-theme-dialogue',
    checkbox: 'novo-checkbox',
    pagination: 'novo-data-table-pagination',
    paginationDropdown: 'pager-select',
    headerButtons: '.custom-header-buttons',
    loadingOverlay: '.novo-data-table-loading-mask',
    dropdownOptions: '.novo-option',
    actions: '.novo-data-table-actions',
    filter: {
        filterIcon: `${automationId('novo-data-table-filter')} i.bhi-filter`,
        activeFilter: 'novo-data-table .filter-active',
        clearFilterButton: automationId('novo-data-table-filter-clear'),
    },
    buttonThemes: {
        primary: '[theme="primary"]',
        dialogue: '[theme="dialogue"]',
        standard: '[theme="standard"]',
    }
}

export function codeExample(exampleName: string): string {
    return `code-example[example="${exampleName}"]`;
}

/**
 * Wraps the given value with a data-automation-id selector.
 */
export function automationId(value: string | number, attributeSelector: string = AttributeSelectors.equals, isCaseSensitive: boolean = true): string {
    if (isCaseSensitive) {
        return `[data-automation-id${attributeSelector}"${value}"]`;
    } else {
        return `[data-automation-id${attributeSelector}"${value}" i]`;
    }
}

/**
 * Wraps the given value with a name selector.
 * Created this for dropdown list items on the list action menu
 */
export function name(value: string | number, attributeSelector: string = AttributeSelectors.equals): string {
    return `[name${attributeSelector}"${value}"]`;
}

/**
 * Types of selectors that can be used with any attribute comparison.
 */
export enum AttributeSelectors {
    equals = '=',
    beginsWith = '^=',
    endsWith = '$=',
    contains = '*=',
}
