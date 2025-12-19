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
}

export function codeExample(exampleName: string): string {
    return `code-example[example="${exampleName}"]`;
}