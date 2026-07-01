import { automationId } from './SelectorUtil';

export const tilesSelectors = {
    defaultGroup: automationId('tiles-default'),
    defaultContainer: `${automationId('tiles-default')} .tile-container`,

    iconsGroup: automationId('tiles-icons'),

    disabledGroup: automationId('tiles-disabled'),
    disabledContainer: `${automationId('tiles-disabled')} .tile-container`,

    colorsGroup: automationId('tiles-colors'),
    colorsTileAll: `${automationId('tiles-colors')} button.tile`,

    addButton: automationId('tiles-add'),
    resetButton: automationId('tiles-reset'),
};

export function defaultTile(label: string): string {
    return `${automationId('tiles-default')} ${automationId(label)}`;
}

export function iconsTile(label: string): string {
    return `${automationId('tiles-icons')} ${automationId(label)}`;
}

export function colorsTile(label: string): string {
    return `${automationId('tiles-colors')} ${automationId(label)}`;
}
