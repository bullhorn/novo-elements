import { automationId, codeExample } from './SelectorUtil';

export const loading = {
    lineComponent: automationId('loading-line-component'),
    lineExample: codeExample('loading-line'),
    lineSizeGroup: automationId('size-line-group'),
    lineColorGroup: automationId('color-line-group'),
    spinnerComponent: automationId('spinner-component'),
    circleExample: codeExample('loading-circle'),
    spinnerSizeGroup: automationId('size-spinner-group'),
    spinnerColorGroup: automationId('color-spinner-group'),
};

export function loadingSizeLineRadio(size: string): string {
    return `${automationId(`size-line-${size}`)} i`;
}

export function loadingColorLineRadio(color: string): string {
    return `${automationId(`color-line-${color}`)} i`;
}

export function loadingSizeSpinnerRadio(size: string): string {
    return `${automationId(`size-spinner-${size}`)} i`;
}

export function loadingColorSpinnerRadio(color: string): string {
    return `${automationId(`color-spinner-${color}`)} i`;
}
