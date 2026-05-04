import { moveMouseToElement, click, moveMouse } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText, verifyClassPresent, verifyAbsent } from '../utils/VerifyUtil';
import { popoverTrigger, popoverContent, popover, popoverSelectors, testAlignmentPopover, placementData, horizontalAlignmentData, verticalAlignmentData } from '../utils/PopoverUtil';
import { sleep } from '../utils/SleepUtil';

describe('PopOver Placement Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.POPOVER);

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

});
