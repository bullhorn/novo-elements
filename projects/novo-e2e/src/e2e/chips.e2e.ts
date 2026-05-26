import { click, scrollIntoView, clickRadio } from '../utils/ElementActionUtil';
import { formControlsExamplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyDisabled, verifyClassPresent, verifyAbsent } from '../utils/VerifyUtil';
import { chipsSelectors, chipUsageSizeSelector, chipUsageColorSelector, chipUsageAccentSelector } from '../utils/ChipsUtil';
import { getAttribute } from '../utils/ElementPropertiesUtil';

describe('Chips Demo Page', () => {
    const url = formControlsExamplesUrl('chips');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Chips', 'Chips example page title');
        });

        const exampleSections = [
            'chip-usage',
            'basic-chips',
            'custom-values',
            'async-chips',
            'formatted-chips',
            'close-on-select-chips',
            'grouped-multi-picker',
            'hide-chips',
            'row-chips',
        ];
        exampleSections.forEach(section => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Chip Usage - Sizes', () => {
        it('should display size control group', async () => {
            await scrollIntoView(chipsSelectors.chipUsageSizeGroup);
            await verifyPresent(chipsSelectors.chipUsageSizeGroup);
        });

        it('should display and apply sizes correctly', async () => {
            const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
            for (const size of sizes) {
                await verifyPresent(chipUsageSizeSelector(size));
                await clickRadio(chipUsageSizeSelector(size));
                await verifyClassPresent(chipsSelectors.chipUsageStandard, `novo-size-${size}`);
            }
        });
    });

    describe('Chip Usage - Variants', () => {
        it('should display standard chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageStandard);
        });

        it('should display icon-only chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageIcon);
        });

        it('should display removable chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageRemovable);
        });

        it('should display disabled chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageDisabled);
            await verifyDisabled(chipsSelectors.chipUsageDisabled);
        });
    });

    describe('Chip Usage - Colors', () => {
        it('should display all color chips with correct attributes', async () => {
            const colors = ['success', 'negative', 'ocean', 'candidate'];
            for (const color of colors) {
                await verifyPresent(chipUsageColorSelector(color));
                const colorAttr = await getAttribute(chipUsageColorSelector(color), 'color');
                expect(colorAttr).toBe(color);
            }
        });
    });

    describe('Chip Usage - Accents', () => {
        it('should display all accent chips with correct attributes', async () => {
            const accents = ['success', 'negative', 'ocean', 'candidate'];
            for (const accent of accents) {
                await verifyPresent(chipUsageAccentSelector(accent));
                const accentAttr = await getAttribute(chipUsageAccentSelector(accent), 'accent');
                expect(accentAttr).toBe(accent);
            }
        });
    });

    describe('Basic Chips', () => {
        it('should display Alabama chip and select additional values', async () => {
            await scrollIntoView(chipsSelectors.basicInput);
            await verifyPresent(chipsSelectors.basicInput);
            await verifyText(`${chipsSelectors.basicInput} novo-chip`, 'Alabama');
            await click(chipsSelectors.basicInput);
            await click('[data-automation-id="picker-result-list-item"]:nth-of-type(2)');
            await verifyText(`${chipsSelectors.basicInput} novo-chip:nth-of-type(2)`, 'Alaska');
            await click(chipsSelectors.basicInput);
            await click('[data-automation-id="picker-result-list-item"]:nth-of-type(3)');
            await verifyText(`${chipsSelectors.basicInput} novo-chip:nth-of-type(3)`, 'Arizona');
            await click(`${chipsSelectors.basicInput} novo-chip:nth-of-type(3) .novo-chip-remove`);
            await verifyAbsent(`${chipsSelectors.basicInput} novo-chip:nth-of-type(3)`);
        });
    });
});
