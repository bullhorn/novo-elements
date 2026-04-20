import { automationId, codeExample } from './SelectorUtil';
import { moveMouseToElement, moveMouse } from './ElementActionUtil';
import { verifyPresent, verifyText, verifyClassPresent, verifyAbsent } from './VerifyUtil';

export const popoverSelectors = {
    placementExample: codeExample('pop-over-placement'),
    left: automationId('popover-left'),
    right: automationId('popover-right'),
    top: automationId('popover-top'),
    bottom: automationId('popover-bottom'),
    contentText: '.popover-content-text',
    pageHeading: 'h2',
};

export function popoverScope(popoverName: string): string {
    return `code-example[example="${popoverName}"]`;
}

export function popoverTrigger(popoverName: string, triggerId: string): string {
    return `${popoverScope(popoverName)} [data-automation-id="${triggerId}"]`;
}

export function popoverContent(popoverName: string): string {
    return `${popoverScope(popoverName)} popover-content`;
}

export function popover(popoverName: string): string {
    return `${popoverScope(popoverName)} popover-content .popover`;
}

export function popoverArrow(popoverName: string): string {
    return `${popoverScope(popoverName)} popover-content .arrow`;
}

export const placementData = [
    { id: 'popover-left', placement: 'left', text: 'Popover is to left of element' },
    { id: 'popover-right', placement: 'right', text: 'Popover is to right of element' },
    { id: 'popover-top', placement: 'top', text: 'Popover is above the element' },
    { id: 'popover-bottom', placement: 'bottom', text: 'Popover is below the element' },
];

export const horizontalAlignmentData = [
    { id: 'popover-top-right', display: 'top-right', primaryDirection: 'top', alignment: 'right', text: 'Popover is on the top side and to the right of the element. Can also apply \'left\' to \'top\' placement PopOvers.' },
    { id: 'popover-bottom-left', display: 'bottom-left', primaryDirection: 'bottom', alignment: 'left', text: 'Popover is on the bottom side and to the left of the element. Can also apply \'right\' to \'bottom\' placement PopOvers.' },
];

export const verticalAlignmentData = [
    { id: 'popover-right-bottom', display: 'right-bottom', primaryDirection: 'right', alignment: 'bottom', text: 'Popover is on the right side and below the element. Can also apply \'top\' to \'right\' placement PopOvers.' },
    { id: 'popover-left-top', display: 'left-top', primaryDirection: 'left', alignment: 'top', text: 'Popover is on the left side and above the element. Can also apply \'bottom\' to \'left\' placement PopOvers.' },
];

export const autoPlacementData = [
    { id: 'popover-auto-placement-first', initialPlacement: 'top', expandedPlacement: 'bottom' },
    { id: 'popover-auto-placement-second', initialPlacement: 'top', expandedPlacement: 'bottom' },
];

export async function testAlignmentPopover(popoverName: string, alignment: any): Promise<void> {
    const trigger = popoverTrigger(popoverName, alignment.id);
    await verifyPresent(trigger);
    await moveMouseToElement(trigger);
    await verifyPresent(popoverContent(popoverName));
    await verifyClassPresent(popover(popoverName), alignment.primaryDirection);
    await verifyClassPresent(popoverArrow(popoverName), alignment.alignment);
    await verifyText(popoverSelectors.contentText, alignment.text);
    await moveMouse(100, 100);
    await verifyAbsent(popoverContent(popoverName));
}
