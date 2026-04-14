import { automationId, codeExample } from './SelectorUtil';

export function loadingLineComponent(): string {
    return automationId('loading-line-component');
}

export function loadingLineExample(): string {
    return codeExample('loading-line');
}

export function loadingSizeLineRadio(size: string): string {
    return `${automationId(`size-line-${size}`)} i`;
}

export function loadingColorLineRadio(color: string): string {
    return `${automationId(`color-line-${color}`)} i`;
}

export function loadingLineSizeGroup(): string {
    return automationId('size-line-group');
}

export function loadingLineColorGroup(): string {
    return automationId('color-line-group');
}
