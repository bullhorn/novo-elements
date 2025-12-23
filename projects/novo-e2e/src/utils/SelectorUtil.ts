import { Key } from 'webdriverio';

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
    primaryButton: 'button.novo-button.novo-theme-primary',
    secondaryButton: 'button.novo-button.novo-theme-secondary',
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
    input: automationId('keywords-chip-input'),
    radio: 'novo-radio',
    filter: {
        filterIcon: `${automationId('novo-data-table-filter')} i.bhi-filter`,
        activeFilter: 'novo-data-table .filter-active',
        clearFilterButton: automationId('novo-data-table-filter-clear'),
    },
    buttonThemes: {
        primary: '[theme="primary"]',
        dialogue: '[theme="dialogue"]',
        standard: '[theme="standard"]',
    },
    picker: {
        container: 'novo-list',
        item: 'novo-list-item',
        itemTitle: 'novo-item-title',
    },
    advancedSearch: {
        button: {
            addCondition: automationId('add-advanced-search-condition'),
            filterOption: '.tabbed-group-picker-column .novo-option',
            applySearch: automationId('apply-search-button'),
            applySearchSpinner: `${automationId('apply-search-button')} novo-spinner`,
            closeSearch: automationId('close-advanced-search-header-icon'),
            backToQuickSearch: automationId('back-to-quick-search-header-link'),
            clearConditions: automationId('clear-all-search-conditions'),
            saveAsFavorite: '.advanced-search novo-toolbar.footer button.save-as-favorite-button',
            openSearchFromList: automationId('open-advanced-search-from-list-box'),
            clearAdvancedSearch: automationId('clear-advanced-search-from-list-box'),
            updateSavedSearchDropdown: automationId('save-search-dropdown-button'),
            updateSavedSearch: automationId('save-search-update-button'),
            createSavedSearch: automationId('save-search-create-button'),
            tabbedPickerAddCondition: 'novo-criteria-builder novo-tabbed-group-picker',
            clearAdvancedSearchFromAdvancedSearch: automationId('clear-advanced-search-from-advanced-search'),
            addFilter: '.advanced-search .tabbed-group-picker-button',
            trashIconFilter: '.novo-condition-group .novo-theme-icon',
            clearAll: automationId('clear-advanced-search-from-advanced-search'),
            tabbedPickerCertificationPanel: 'Certification',
            tabbedPickerNotePanel: 'Note',
            tabbedPickerEducationPanel: 'Education',
            tabbedPickerReferencePanel: 'Reference',
            tabbedPickerWorkHistoryPanel: 'Work History',
            booleanSwitch: automationId('boolean-switch'),
            customValueAdd: 'novo-option .bhi-add-thin',
            clearSingleCondition: '.delete-btn',
            andNotDropdown: 'groupings-dropdown',
        },
    }
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

export const keyboardKeys = {
    arrowDown: Key.ArrowDown,
    arrowRight: Key.ArrowRight,
    arrowUp: Key.ArrowUp,
    backspace: Key.Backspace,
    clear: Key.Clear,
    control: Key.Ctrl,
    enter: Key.Enter,
    escape: Key.Escape,
    pause: Key.Pause,
    tab: Key.Tab,
    spaceBar: Key.Space
};

export enum ControlType {
    aceEditor = 'ace-editor',
    address = 'address',
    checkbox = 'checkbox',
    checklist = 'checklist',
    chipList = 'chip-list',
    custom = 'custom',
    date = 'date',
    dateTime = 'date-time',
    editor = 'editor',
    editorWithTemplate = 'editor-with-template',
    file = 'file',
    picker = 'picker',
    quickNote = 'quick-note',
    radio = 'radio',
    select = 'select',
    switch = 'switch',
    textarea = 'text-area',
    tiles = 'tiles',
    time = 'time',
}

export const frame = {
    activeContent: 'iframe.active',
    bowlingAlley: 'mainframe main bowlingalley',
    bowlingAlleyTabLoading: '[data-hint="Loading..."]',
    ckeEditor: '.cke_wysiwyg_frame',
    iframe: 'iframe',
    loading: 'novo-loading',
    mainframe: 'mainframe',
    overlay: '.novo-overlay-panel',
    subMainFrame: '.main-frame',
    mainWindow: '#bhMainWindow'
};

export const novoAdvancedSearchOperator = {
    includeAll: 'includeAll',
    includeAny: 'includeAny',
    exclude: 'excludeAny',
    isEmpty: 'isNull',
    include: 'include',
    insideRadius: 'insideRadius',
    outsideRadius: 'outsideRadius',
    doesNotEqual: 'exclude',
    equalTo: 'equalTo',
    verifyIncludeAny: 'Include Any',
    verifyIncludeAll: 'Include All',
    verifyRadiusInside: 'Radius (Inside)',
    dateWithin: 'within',
    verifyEqualTo: 'Equal To',
};

export function codeExample(exampleName: string): string {
    return `code-example[example="${exampleName}"]`;
}

/**
 * For a switch control, returns the switch
 */
export function switchControl(fieldName: string): string {
    return `${control(fieldName)} novo-switch`;
}

/**
 * Returns the input field for a text area control
 * @param fieldName the name of the field in meta
 */
export function textAreaControl(fieldName: string): string {
    return `${control(fieldName)} textArea`;
}

/**
 * For a tile control, returns the particular tile using either a label or an index selector
 * @param fieldName the name of the field in meta
 * @param value the label if a string or the index if a number, or boolean value.
 */
export function tile(fieldName: string, value: string | number | boolean): string {
    if (typeof value === 'number') {
        return tileByIndex(fieldName, value);
    } else if (typeof value === 'boolean') {
        return tileByLabel(fieldName, value ? 'es' : 'o', AttributeSelectors.endsWith);
    }
    return tileByLabel(fieldName, value);
}

/**
 * For a tile control, returns the particular tile with the given text in its label
 * @param fieldName the name of the field in meta
 * @param tileLabel the particular label of the tile to pick
 * @param attributeSelector the way to match the label
 */
export function tileByLabel(fieldName: string, tileLabel: string, attributeSelector: string = AttributeSelectors.equals): string {
    return `${control(fieldName)} .tile ${automationId(tileLabel, attributeSelector)}`;
}

/**
 * Returns the selector for a novo control in a novo form.
 *
 * Ignores any controls with the `assoc-field` class which indicates the control is in a header/card and not a form.
 *
 * @param fieldName the name of the field in meta
 * @param allowDisabled if set to true, then enabled and disabled form inputs will be allowed. defaults to true.
 */
export function control(fieldName: string, allowDisabled = true): string {
    const baseSelector = `[data-control-key="${fieldName}"]:not(.assoc-field):not(.hidden)`;
    return allowDisabled ? baseSelector : `${baseSelector}:not(.disabled)`;
}

/**
 * For a tile control, returns the particular tile with the given text in its label
 * @param fieldName the name of the field in meta
 * @param index the index of tile to choose
 */
export function tileByIndex(fieldName: string, index: number): string {
    return `${control(fieldName)} .tile:nth-of-type(${index}) `;
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
 *  Returns the checkbox on a form field given field name
 * @param fieldName the of the field in meta
 */
export function checkBox(fieldName: string): string {
    return `${automationId(fieldName)} i`;
}

/**
 * Returns radio buttons within a button group. If a labelOrValue is provided, will return the selector for
 * a specific radio button with the given value within a radio button group for the fieldName.
 *
 * Each individual radio button has an automation id of the field name, hyphen, label or value.
 * @param allowDisabled if set to true, then enabled and disabled form inputs will be allowed. defaults to true.
 */
export function radioButton(fieldName: string, labelOrValue: string | number | boolean = null, allowDisabled = true): string {
    if (labelOrValue === null) {
        return `${control(fieldName, allowDisabled)} ${automationId(fieldName, AttributeSelectors.beginsWith)}`;
    }
    return `${control(fieldName, allowDisabled)} ${automationId(fieldName + '-' + labelOrValue)}`;
}

/**
 * Returns the selector for opening a select control by clicking it
 * @param fieldName the name of the select field in meta
 * @param allowDisabled if set to true, then enabled and disabled form inputs will be allowed. defaults to true.
 */
export function selectInput(fieldName: string, allowDisabled = true): string {
    return `${control(fieldName, allowDisabled)} .novo-select:not([hidden])`;
}

/**
 * Returns the selector for an option in the select control. This supports three different versions of options in novo
 * elements.
 * @param fieldName the name of the field in meta
 * @param attributeSelector how strictly to match the select option
 */
export function selectOption(fieldName: string | number, attributeSelector: string = AttributeSelectors.equals): string {
    return `.novo-select-list ${automationValue(fieldName, attributeSelector)}`
      + `, .novo-select-list ${automationId(fieldName, attributeSelector)}`
      + `, .novo-select-list ${valueAttribute(fieldName, attributeSelector)}`;
}

/**
 * Wraps the given value with a name selector.
 * Created this for dropdown list items on the list action menu
 */
export function name(value: string | number, attributeSelector: string = AttributeSelectors.equals): string {
    return `[name${attributeSelector}"${value}"]`;
}

/**
 * Returns the selector for a control input for a form field with the given name, ignoring disabled fields.
 * @param fieldName the name of the field in meta
 * @param allowDisabled if set to true, then enabled and disabled form inputs will be allowed. defaults to false.
 */
export function controlInput(fieldName: string, allowDisabled = false): string {
    return `${control(fieldName)} ${allowDisabled ? 'input' : 'input:not([disabled])'}`;
}

/**
 * Returns the picker clear button for a form field for a given field name
 * @param fieldName the name of the field in meta
 */
export function clearPickerButton(fieldName: string): string {
    return `${control(fieldName)} i.bhi-times`;
}

/**
 * Used in Gladmin testing to select a button based on the text within it, such as: valueAttribute('Save')
 */
export function valueAttribute(value: string | number, attributeSelector: string = AttributeSelectors.equals): string {
    return `[value${attributeSelector}"${value}"]`;
}

/**
 * Wraps the given value with a data-automation-value selector that allows matching values in places like a drop-down.
 */
export function automationValue(value: string | number, attributeSelector: string = AttributeSelectors.equals): string {
    return `[data-automation-value${attributeSelector}"${value}"]`;
}

/**
 * For the given picker field, will return the
 * selector for the picker field's chip
 * @param field the name of the field on the add-edit form
 */
export function pickerChips(field: string): string {
    return `${control(field)} novo-chips`;
}

/**
 * For the given picker field, will return the
 * selector for the picker field's chip value
 * @param field the name of the field on the add-edit form
 */
export function pickerChipValue(field: string): string {
    return `${control(field)} novo-chips novo-chip, ${control(field)} novo-chip-list novo-chip`;
}

