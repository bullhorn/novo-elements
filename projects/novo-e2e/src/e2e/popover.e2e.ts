import { moveMouseToElement, click, scrollIntoView, moveMouse } from '../utils/ElementActionUtil';
import { getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText, verifyClassPresent, verifyAbsent } from '../utils/VerifyUtil';
import { popoverTrigger, popoverContent, popover, popoverSelectors, testAlignmentPopover, placementData, horizontalAlignmentData, verticalAlignmentData, autoPlacementData } from '../utils/PopoverUtil';
import { codeExampleExpandButton } from '../utils/SelectorUtil';
import { sleep } from '../utils/SleepUtil';

describe('PopOver Placement Demo Page', () => {
    const baseUrl = (global as any).E2E_BASE_URL || 'https://bullhorn.github.io/novo-elements/docs';
    const url = `${baseUrl}/#/components/pop%20over/examples`;

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Placement', () => {
        const popoverName = 'pop-over-placement';

        placementData.forEach((placement) => {
            it(`should display and hide ${placement.placement} popover on hover`, async () => {
                const trigger = popoverTrigger(popoverName, placement.id);
                await verifyPresent(trigger);
                await moveMouseToElement(trigger);
                await verifyPresent(popoverContent(popoverName));
                await verifyClassPresent(popover(popoverName), placement.placement);
                await verifyText(popoverSelectors.contentText, placement.text);
                await moveMouse(100, 100);
                await verifyAbsent(popoverContent(popoverName));
            });
        });
    });

    describe('Horizontal Alignment', () => {
        const popoverName = 'pop-over-horizontal';

        horizontalAlignmentData.forEach((alignment) => {
            it(`should display and hide ${alignment.display} popover on hover`, async () => {
                await testAlignmentPopover(popoverName, alignment);
            });
        });
    });

    describe('Vertical Alignment', () => {
        const popoverName = 'pop-over-vertical';

        verticalAlignmentData.forEach((alignment) => {
            it(`should display and hide ${alignment.display} popover on hover`, async () => {
                await testAlignmentPopover(popoverName, alignment);
            });
        });
    });

    describe('Behavior', () => {
        const popoverName = 'pop-over-behaviors';

        it('should display and hide on hover', async () => {
            const trigger = popoverTrigger(popoverName, 'popover-on-hover');
            await verifyPresent(trigger);
            await moveMouseToElement(trigger);
            await verifyPresent(popoverContent(popoverName));
            await verifyText(popoverSelectors.contentText, 'PopOver appears when hovering over the element. When the mouse is no longer over the element or the PopOver, then it will be dismissed.');
            await moveMouse(100, 100);
            await verifyAbsent(popoverContent(popoverName));
        });

        it('should display and hide on click', async () => {
            const trigger = popoverTrigger(popoverName, 'popover-on-click');
            await verifyPresent(trigger);
            await click(trigger);
            await verifyPresent(popoverContent(popoverName));
            await verifyText(popoverSelectors.contentText, 'PopOver appears when clicking on the element. Dismiss it by clicking the element again.');
            await click(trigger);
            await verifyAbsent(popoverContent(popoverName));
        });

        it('should display and hide on click with timeout', async () => {
            const trigger = popoverTrigger(popoverName, 'popover-on-click-timeout');
            await verifyPresent(trigger);
            await click(trigger);
            await verifyPresent(popoverContent(popoverName));
            await verifyText(popoverSelectors.contentText, 'This PopOver has a 2000 ms or 2 second timeout on it. Dismiss it by clicking on the element or waiting for the timeout.');
            await sleep(2000); // Wait for popoverDismissTimeout to trigger auto-dismiss
            await verifyAbsent(popoverContent(popoverName));
        });

        it('should not display when disabled', async () => {
            const trigger = popoverTrigger(popoverName, 'popover-disabled');
            await verifyPresent(trigger);
            await click(trigger);
            await verifyAbsent(popoverContent(popoverName));
            await moveMouseToElement(trigger);
            await verifyAbsent(popoverContent(popoverName));
        });
    });

    describe('Dynamic HTML', () => {
        const popoverName = 'pop-over-dynamic';

        it('should display dynamic HTML content on click', async () => {
            const trigger = popoverTrigger(popoverName, 'popover-dynamic-trigger');
            await verifyPresent(trigger);
            await click(trigger);
            await verifyPresent(popoverContent(popoverName));
        });
    });

    describe('Auto Placement', () => {
        const popoverName = 'pop-over-auto-placement';

        autoPlacementData.forEach((placement) => {
            it(`should adjust popover placement based on available screen space for ${placement.id}`, async () => {
                const trigger = popoverTrigger(popoverName, placement.id);
                await verifyPresent(trigger);
                await moveMouseToElement(trigger);
                await verifyPresent(popoverContent(popoverName));
                await verifyClassPresent(popover(popoverName), placement.initialPlacement);
                await moveMouse(100, 100);
                await verifyAbsent(popoverContent(popoverName));

                const expandButton = codeExampleExpandButton(popoverName);
                await click(expandButton);
                await scrollIntoView(expandButton, false);
                await verifyPresent(trigger);
                await moveMouseToElement(trigger);
                await verifyPresent(popoverContent(popoverName));
                await verifyClassPresent(popover(popoverName), placement.expandedPlacement);
                await moveMouse(100, 100);
                await verifyAbsent(popoverContent(popoverName));
                await click(expandButton);
            });
        });
    });
});
