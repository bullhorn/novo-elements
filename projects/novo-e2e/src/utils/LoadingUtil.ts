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

export function loadingSizeLineSelector(size: string): string {
    return automationId(`size-line-${size}`);
}

export function loadingColorLineSelector(color: string): string {
    return automationId(`color-line-${color}`);
}

export function loadingSizeSpinnerSelector(size: string): string {
    return automationId(`size-spinner-${size}`);
}

export function loadingColorSpinnerSelector(color: string): string {
    return automationId(`color-spinner-${color}`);
}
