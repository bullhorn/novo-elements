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
            await verifyPresent(elements.title, 'page title');
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
        before(async () => {
            await browser.refresh();
        });

        it('should display size control group', async () => {
            await scrollIntoView(chipsSelectors.chipUsageSizeGroup);
            await verifyPresent(chipsSelectors.chipUsageSizeGroup, 'chip usage size group');
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
        before(async () => {
            await browser.refresh();
        });

        it('should display standard chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageStandard, 'standard chip');
        });

        it('should display icon-only chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageIcon, 'icon-only chip');
        });

        it('should display removable chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageRemovable, 'removable chip');
        });

        it('should display disabled chip', async () => {
            await verifyPresent(chipsSelectors.chipUsageDisabled, 'disabled chip');
            await verifyDisabled(chipsSelectors.chipUsageDisabled);
        });
    });

    describe('Chip Usage - Colors', () => {
        before(async () => {
            await browser.refresh();
        });

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
        before(async () => {
            await browser.refresh();
        });

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
        before(async () => {
            await browser.refresh();
        });

        it('should display Alabama chip and select additional values', async () => {
            await scrollIntoView(chipsSelectors.basicInput);
            await verifyPresent(chipsSelectors.basicInput, 'basic chips input');
            await verifyText(chipsSelectors.basicFirstChip, 'Alabama');
            await click(chipsSelectors.basicInput);
            await click(chipsSelectors.pickerResultItem(2));
            await verifyText(chipsSelectors.basicSecondChip, 'Alaska');
            await click(chipsSelectors.basicInput);
            await click(chipsSelectors.pickerResultItem(3));
            await verifyText(chipsSelectors.basicThirdChip, 'Arizona');
            await click(chipsSelectors.basicChipRemove(3));
            await verifyAbsent(chipsSelectors.basicThirdChip, 'third chip after removal');
        });
    });
});
