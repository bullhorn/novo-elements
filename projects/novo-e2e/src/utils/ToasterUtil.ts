import { automationId, codeExample } from './SelectorUtil';

const toastComponent = 'novo-toast';

export const toaster = {
    usageContainer: automationId('toast-usage-container'),
    display: automationId('toast-display'),
    changeButton: automationId('toast-usage-change-button'),
    optionsDisplay: automationId('toast-options-display'),
    optionsPreview: automationId('toast-options-preview'),
};

export const positionedToast = {
    fixedBottom: `${toastComponent}.fixedBottom`,
    fixedTop: `${toastComponent}.fixedTop`,
    growlTopRight: `${toastComponent}.growlTopRight`,
};

export function actionsSectionTrigger(triggerId: string): string {
    return `${codeExample('toast-actions')} ${automationId(triggerId)}`;
}

export function toastTitle(scope: string): string {
    return `${scope} h5`;
}

export function toastMessage(scope: string): string {
    return `${scope} p`;
}

export function toastActionButton(scope: string): string {
    return `${scope} .action button`;
}

export function toastCloseButton(scope: string): string {
    return `${scope} .close-icon`;
}
