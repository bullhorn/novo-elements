import { scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent } from '../utils/VerifyUtil';
import { getAttribute } from '../utils/ElementPropertiesUtil';
import {
    iconSections,
    basicIcon,
    basicIconClass,
    themedIconColor,
    themedIconTheme,
    raisedIcon,
} from '../utils/IconUtil';

describe('Icon Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.ICON);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Icon', 'Icon example page title');
        });

        it('should display Basic Usage section', async () => {
            await scrollIntoView(iconSections.basicUsage);
            await verifyPresent(iconSections.basicUsage);
        });

        it('should display Themes & Colors section', async () => {
            await scrollIntoView(iconSections.themedColors);
            await verifyPresent(iconSections.themedColors);
        });

        it('should display Raised Icons section', async () => {
            await scrollIntoView(iconSections.raisedIcons);
            await verifyPresent(iconSections.raisedIcons);
        });
    });

    describe('Basic Icons', () => {
        beforeEach(async () => {
            await scrollIntoView(iconSections.basicUsage);
        });

        it('should display novo-icon component variants', async () => {
            const icons = ['candidate', 'job', 'company', 'lead', 'opportunity'];
            for (const name of icons) {
                await verifyPresent(basicIcon(name));
            }
        });

        it('should display class-based icon variants', async () => {
            const icons = ['candidate', 'person', 'job', 'company', 'lead', 'opportunity'];
            for (const name of icons) {
                await verifyPresent(basicIconClass(name));
            }
        });
    });

    describe('Themed & Colored Icons', () => {
        beforeEach(async () => {
            await scrollIntoView(iconSections.themedColors);
        });

        it('should display color variant icons with correct color attribute and class', async () => {
            const icons = ['candidate', 'job', 'company', 'submission', 'placement'];
            for (const name of icons) {
                await verifyPresent(themedIconColor(name));
                const colorAttr = await getAttribute(themedIconColor(name), 'color');
                await expect(colorAttr).toBe(name);
                await verifyClassPresent(themedIconColor(name), `text-color-${name}`);
            }
        });

        it('should display theme variant icons with correct theme attribute and class', async () => {
            const icons = ['candidate', 'job', 'company', 'submission', 'placement'];
            for (const name of icons) {
                await verifyPresent(themedIconTheme(name));
                const themeAttr = await getAttribute(themedIconTheme(name), 'theme');
                await expect(themeAttr).toBe(name);
                await verifyClassPresent(themedIconTheme(name), `novo-theme-${name}`);
            }
        });
    });

    describe('Raised Icons', () => {
        beforeEach(async () => {
            await scrollIntoView(iconSections.raisedIcons);
        });

        it('should display all raised icon variants with raised attribute and class', async () => {
            const icons = ['candidate', 'job', 'company', 'submission', 'placement'];
            for (const name of icons) {
                await verifyPresent(raisedIcon(name));
                const raisedAttr = await getAttribute(raisedIcon(name), 'raised');
                await expect(raisedAttr).toBe('true');
                await verifyClassPresent(raisedIcon(name), 'novo-icon-raised');
            }
        });
    });
});
