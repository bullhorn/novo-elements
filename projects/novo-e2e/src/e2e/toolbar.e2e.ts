import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements, Classes } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent } from '../utils/VerifyUtil';
import { toolbarSelectors } from '../utils/ToolbarUtil';
import { getAttribute } from '../utils/ElementPropertiesUtil';

describe('Toolbar Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.TOOLBAR);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Toolbar', 'Toolbar example page title');
        });

        const exampleSections = ['basic-toolbar', 'multi-row-toolbar'];
        exampleSections.forEach(section => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Basic Toolbar Examples', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display basic toolbar with title', async () => {
            await verifyPresent(toolbarSelectors.basicToolbar, 'basic toolbar');
        });

        it('should display toolbar with accent styling', async () => {
            await verifyPresent(toolbarSelectors.accentToolbar, 'accent toolbar');
            const accent = await getAttribute(toolbarSelectors.accentToolbar, 'accent');
            expect(accent).toBe('candidate');
            const gap = await getAttribute(toolbarSelectors.accentToolbar, 'gap');
            expect(gap).toBe('md');
        });

        it('should display company toolbar with icon and navigation', async () => {
            await verifyPresent(toolbarSelectors.companyToolbar, 'company toolbar');
            const color = await getAttribute(toolbarSelectors.companyToolbar, 'color');
            expect(color).toBe('company');
            const gap = await getAttribute(toolbarSelectors.companyToolbar, 'gap');
            expect(gap).toBe('1rem');
        });

        it('should display company toolbar button and action buttons', async () => {
            await Promise.all([
                verifyPresent(toolbarSelectors.companyButton, 'company toolbar button'),
                verifyPresent(toolbarSelectors.companyShareAction, 'company share action'),
                verifyPresent(toolbarSelectors.companyPrintAction, 'company print action'),
                verifyPresent(toolbarSelectors.companyCloseAction, 'company close action'),
            ]);
        });

        it('should display navigation toolbar with actions', async () => {
            await scrollIntoView(toolbarSelectors.navigationToolbar);
            await verifyPresent(toolbarSelectors.navigationToolbar, 'navigation toolbar');
            const color = await getAttribute(toolbarSelectors.navigationToolbar, 'color');
            expect(color).toBe('navigation');
        });

        it('should display navigation toolbar menu action', async () => {
            await verifyPresent(toolbarSelectors.navMenuAction, 'nav menu action');
            const icon = await getAttribute(toolbarSelectors.navMenuAction, 'icon');
            expect(icon).toBe('menu');
        });

        it('should display navigation toolbar logo', async () => {
            await verifyPresent(toolbarSelectors.navLogo, 'nav logo');
        });

        it('should display navigation toolbar add action', async () => {
            await verifyPresent(toolbarSelectors.navAddAction, 'nav add action');
            const icon = await getAttribute(toolbarSelectors.navAddAction, 'icon');
            expect(icon).toBe('add-thin');
        });

        it('should display navigation toolbar search', async () => {
            await verifyPresent(toolbarSelectors.navSearch, 'nav search');
        });

        it('should display navigation toolbar support action', async () => {
            await verifyPresent(toolbarSelectors.navSupportAction, 'nav support action');
            const icon = await getAttribute(toolbarSelectors.navSupportAction, 'icon');
            expect(icon).toBe('question');
        });

        it('should display navigation toolbar settings action', async () => {
            await verifyPresent(toolbarSelectors.navSettingsAction, 'nav settings action');
            const icon = await getAttribute(toolbarSelectors.navSettingsAction, 'icon');
            expect(icon).toBe('configure-o');
        });

        it('should display navigation toolbar avatar', async () => {
            await verifyPresent(toolbarSelectors.navAvatar, 'nav avatar');
        });
    });

    describe('Multi-Row Toolbar Examples', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display multi-row toolbar', async () => {
            await scrollIntoView(toolbarSelectors.multiRowToolbar);
            await verifyPresent(toolbarSelectors.multiRowToolbar, 'multi-row toolbar');
        });

        it('should display toolbar header row with company color', async () => {
            await verifyPresent(toolbarSelectors.toolbarRowHeader, 'toolbar header row');
            const color = await getAttribute(toolbarSelectors.toolbarRowHeader, 'color');
            expect(color).toBe('company');
            const gap = await getAttribute(toolbarSelectors.toolbarRowHeader, 'gap');
            expect(gap).toBe('md');
        });

        it('should display toolbar header row menu action', async () => {
            await verifyPresent(toolbarSelectors.toolbarRowHeaderMenu, 'toolbar header row menu action');
            const icon = await getAttribute(toolbarSelectors.toolbarRowHeaderMenu, 'icon');
            expect(icon).toBe('menu');
        });

        it('should display toolbar navigation row', async () => {
            await verifyPresent(toolbarSelectors.toolbarRowNav, 'toolbar nav row');
        });

        it('should display toolbar navigation row layout button', async () => {
            await verifyPresent(toolbarSelectors.toolbarRowNavLayoutBtn, 'toolbar nav row layout button');
        });
    });

    describe('Toolbar Interactions', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should click company toolbar tabs and show active class', async () => {
            await click(toolbarSelectors.companyOverviewTab);
            await verifyClassPresent(toolbarSelectors.companyOverviewTab, Classes.active);

            await click(toolbarSelectors.companyFilesTab);
            await verifyClassPresent(toolbarSelectors.companyFilesTab, Classes.active);
        });

        it('should click multi-row toolbar tabs and show active class', async () => {
            await scrollIntoView(toolbarSelectors.toolbarNavOverviewTab);
            await click(toolbarSelectors.toolbarNavOverviewTab);
            await verifyClassPresent(toolbarSelectors.toolbarNavOverviewTab, Classes.active);

            await click(toolbarSelectors.toolbarNavActivityTab);
            await verifyClassPresent(toolbarSelectors.toolbarNavActivityTab, Classes.active);

            await click(toolbarSelectors.toolbarNavFilesTab);
            await verifyClassPresent(toolbarSelectors.toolbarNavFilesTab, Classes.active);
        });
    });
});
