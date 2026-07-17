import { click, moveMouseToElement, moveMouse, scrollIntoView } from '../utils/ElementActionUtil';
import { LAYOUT_URLS, getURLs, layoutsUrl } from '../utils/EnvironmentUtil';
import { sleep } from '../utils/SleepUtil';
import { verifyClassAbsent, verifyClassPresent, verifyElementCountEquals, verifyNotDisplayed, verifyPresent } from '../utils/VerifyUtil';
import { COLLAPSED_CLASS, collapsibleNav, navTabCloseButton, navTabLabel } from '../utils/CollapsibleNavUtil';

describe('Collapsible Nav Demo Page', () => {
    const url = layoutsUrl(LAYOUT_URLS.COLLAPSIBLE_NAV);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display the nav, toggle, tabs, and footer option', async () => {
            await Promise.all([
                verifyPresent(collapsibleNav.nav, 'collapsible nav'),
                verifyPresent(collapsibleNav.toggle, 'toggle button'),
                verifyElementCountEquals(collapsibleNav.tab, 3, 'nav tabs'),
            ]);
        });
    });

    describe('Expand/Collapse Toggle', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(collapsibleNav.nav);
        });

        it('should start expanded', async () => {
            await verifyClassAbsent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });

        it('should collapse when toggle is clicked', async () => {
            await click(collapsibleNav.toggle);
            await verifyClassPresent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });

        it('should expand again when toggle is clicked a second time', async () => {
            await click(collapsibleNav.toggle);
            await verifyClassAbsent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });
    });

    describe('Collapsed Visual State', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(collapsibleNav.nav);
            await click(collapsibleNav.toggle);
            await verifyClassPresent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });

        it('should hide tab labels when collapsed', async () => {
            await verifyNotDisplayed(navTabLabel(), 'tab label');
        });

        it('should hide tab close buttons when collapsed', async () => {
            await verifyNotDisplayed(navTabCloseButton(), 'tab close button');
        });
    });

    describe('Overlay on Hover', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(collapsibleNav.nav);
            await click(collapsibleNav.toggle);
            await verifyClassPresent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });

        it('should temporarily expand when hovered while collapsed', async () => {
            await moveMouse(0, 0);
            await sleep(200);
            await moveMouseToElement(collapsibleNav.nav);
            await sleep(400);
            await verifyClassAbsent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });

        it('should collapse again when mouse leaves', async () => {
            await moveMouse(0, 0);
            await sleep(400);
            await verifyClassPresent(collapsibleNav.nav, COLLAPSED_CLASS, 'collapsible nav');
        });
    });
});
