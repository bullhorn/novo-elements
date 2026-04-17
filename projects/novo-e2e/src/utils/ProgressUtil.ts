import { automationId } from './SelectorUtil';

// Linear Progress Bar Selectors
export const linearProgressSelectors = {
    flashContainer: () => automationId('progress-bar-flash'),
    flashBar: () => automationId('progress-bar-flash-bar'),
    indeterminateContainer: () => automationId('progress-bar-indeterminate'),
    indeterminateBar: () => automationId('progress-bar-indeterminate-bar'),
    stripedContainer: () => automationId('progress-bar-striped'),
    stripedBar: () => automationId('progress-bar-striped-bar'),
    multiColorContainer: () => automationId('progress-bar-multi-color'),
    multiColorSuccessBar: () => automationId('progress-bar-multi-color-success'),
    multiColorNegativeBar: () => automationId('progress-bar-multi-color-negative'),
};

// Radial Progress Bar Selectors
export const radialProgressSelectors = {
    singleContainer: () => automationId('progress-radial-single'),
    singleBar: () => automationId('progress-radial-single-bar'),
    multiContainer: () => automationId('progress-radial-multi'),
    multiSuccessBar: () => automationId('progress-radial-multi-success'),
    multiNegativeBar: () => automationId('progress-radial-multi-negative'),
    multiWarningBar: () => automationId('progress-radial-multi-warning'),
};

// Helper function to get SVG element for a radial progress bar
export async function getRadialSvgElement(progressBarSelector: string): Promise<any> {
    const progressBar = await $(progressBarSelector);
    const svg = await progressBar.$('svg');
    return svg;
}

// Helper function to get SVG circle element for a radial progress bar
export async function getRadialCircleElement(progressBarSelector: string): Promise<any> {
    const svg = await getRadialSvgElement(progressBarSelector);
    const circle = await svg.$('circle');
    return circle;
}
