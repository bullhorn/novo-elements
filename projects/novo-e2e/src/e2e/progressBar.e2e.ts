import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent } from '../utils/VerifyUtil';
import { getAttribute } from '../utils/ElementPropertiesUtil';
import {
    linearProgressSelectors,
    radialProgressSelectors,
} from '../utils/ProgressUtil';

describe('Progress Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.PROGRESS);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Progress', 'Progress example page title');
        });
    });

    describe('Linear Progress Bars', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display flash effect progress bar', async () => {
            await verifyPresent(linearProgressSelectors.flashContainer, 'flash container');
            await verifyPresent(linearProgressSelectors.flashBar, 'flash bar');
            await verifyClassPresent(linearProgressSelectors.flashBar, 'flash');
            await verifyClassPresent(linearProgressSelectors.flashBar, 'linear');
            const flashAttr = await getAttribute(linearProgressSelectors.flashBar, 'flash');
            await expect(flashAttr).toBe('true');
        });

        it('should display indeterminate progress bar with animated class', async () => {
            await verifyPresent(linearProgressSelectors.indeterminateContainer, 'indeterminate container');
            await verifyPresent(linearProgressSelectors.indeterminateBar, 'indeterminate bar');
            await verifyClassPresent(linearProgressSelectors.indeterminateBar, 'animated');
            await verifyClassPresent(linearProgressSelectors.indeterminateBar, 'linear');
        });

        it('should display striped progress bar with striped class', async () => {
            await verifyPresent(linearProgressSelectors.stripedContainer, 'striped container');
            await verifyPresent(linearProgressSelectors.stripedBar, 'striped bar');
            await verifyClassPresent(linearProgressSelectors.stripedContainer, 'striped');
            await verifyClassPresent(linearProgressSelectors.stripedBar, 'linear');
            const stripedValue = await getAttribute(linearProgressSelectors.stripedBar, 'value');
            await expect(stripedValue).toBe('40');
        });

        it('should display multi-color progress bars with success color', async () => {
            await verifyPresent(linearProgressSelectors.multiColorContainer, 'multi-color container');
            await verifyPresent(linearProgressSelectors.multiColorSuccessBar, 'multi-color success bar');
            await verifyClassPresent(linearProgressSelectors.multiColorSuccessBar, 'linear');
            const successColor = await getAttribute(linearProgressSelectors.multiColorSuccessBar, 'color');
            await expect(successColor).toBe('success');
            const successValue = await getAttribute(linearProgressSelectors.multiColorSuccessBar, 'value');
            await expect(successValue).toBe('120');
        });

        it('should display multi-color progress bars with negative color', async () => {
            await verifyPresent(linearProgressSelectors.multiColorNegativeBar, 'multi-color negative bar');
            await verifyClassPresent(linearProgressSelectors.multiColorNegativeBar, 'linear');
            const negativeColor = await getAttribute(linearProgressSelectors.multiColorNegativeBar, 'color');
            await expect(negativeColor).toBe('negative');
            const negativeValue = await getAttribute(linearProgressSelectors.multiColorNegativeBar, 'value');
            await expect(negativeValue).toBe('40');
        });
    });

    describe('Radial Progress Bars', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display single radial progress bar', async () => {
            await verifyPresent(radialProgressSelectors.singleContainer, 'single radial container');
            await verifyPresent(radialProgressSelectors.singleBar, 'single radial bar');
            await verifyClassPresent(radialProgressSelectors.singleContainer, 'radial');
            await verifyClassPresent(radialProgressSelectors.singleBar, 'radial');
            const singleValue = await getAttribute(radialProgressSelectors.singleBar, 'value');
            await expect(singleValue).toBe('70');
        });

        it('should display multi-color radial progress bars with success', async () => {
            await verifyPresent(radialProgressSelectors.multiContainer, 'multi-color radial container');
            await verifyPresent(radialProgressSelectors.multiSuccessBar, 'multi-color radial success bar');
            await verifyClassPresent(radialProgressSelectors.multiSuccessBar, 'radial');
            const successColor = await getAttribute(radialProgressSelectors.multiSuccessBar, 'color');
            await expect(successColor).toBe('success');
            const successValue = await getAttribute(radialProgressSelectors.multiSuccessBar, 'value');
            await expect(successValue).toBe('50');
        });

        it('should display multi-color radial progress bars with negative', async () => {
            await verifyPresent(radialProgressSelectors.multiNegativeBar, 'multi-color radial negative bar');
            await verifyClassPresent(radialProgressSelectors.multiNegativeBar, 'radial');
            const negativeColor = await getAttribute(radialProgressSelectors.multiNegativeBar, 'color');
            await expect(negativeColor).toBe('negative');
            const negativeValue = await getAttribute(radialProgressSelectors.multiNegativeBar, 'value');
            await expect(negativeValue).toBe('40');
        });

        it('should display multi-color radial progress bars with warning', async () => {
            await verifyPresent(radialProgressSelectors.multiWarningBar, 'multi-color radial warning bar');
            await verifyClassPresent(radialProgressSelectors.multiWarningBar, 'radial');
            const warningColor = await getAttribute(radialProgressSelectors.multiWarningBar, 'color');
            await expect(warningColor).toBe('warning');
            const warningValue = await getAttribute(radialProgressSelectors.multiWarningBar, 'value');
            await expect(warningValue).toBe('30');
        });
    });
});
