import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent } from '../utils/VerifyUtil';
import { getAttribute } from '../utils/ElementPropertiesUtil';
import {
    linearProgressSelectors,
    radialProgressSelectors,
    getRadialSvgElement,
    getRadialCircleElement,
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
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Progress', 'Progress example page title');
        });
    });

    describe('Linear Progress Bars', () => {
        it('should display flash effect progress bar', async () => {
            await verifyPresent(linearProgressSelectors.flashContainer());
            await verifyPresent(linearProgressSelectors.flashBar());
            await verifyClassPresent(linearProgressSelectors.flashBar(), 'flash');
        });

        it('should display indeterminate progress bar with animated class', async () => {
            await verifyPresent(linearProgressSelectors.indeterminateContainer());
            await verifyPresent(linearProgressSelectors.indeterminateBar());
            await verifyClassPresent(linearProgressSelectors.indeterminateBar(), 'animated');
        });

        it('should display striped progress bar with striped class', async () => {
            await verifyPresent(linearProgressSelectors.stripedContainer());
            await verifyPresent(linearProgressSelectors.stripedBar());
            await verifyClassPresent(linearProgressSelectors.stripedContainer(), 'striped');
            await verifyClassPresent(linearProgressSelectors.stripedBar(), 'linear');
        });

        it('should display multi-color progress bars with success color', async () => {
            await verifyPresent(linearProgressSelectors.multiColorContainer());
            await verifyPresent(linearProgressSelectors.multiColorSuccessBar());
            const successColor = await getAttribute(linearProgressSelectors.multiColorSuccessBar(), 'color');
            await expect(successColor).toBe('success');
        });

        it('should display multi-color progress bars with negative color', async () => {
            await verifyPresent(linearProgressSelectors.multiColorNegativeBar());
            const negativeColor = await getAttribute(linearProgressSelectors.multiColorNegativeBar(), 'color');
            await expect(negativeColor).toBe('negative');
        });

        it('should verify linear progress bars have linear class', async () => {
            await verifyClassPresent(linearProgressSelectors.flashBar(), 'linear');
            await verifyClassPresent(linearProgressSelectors.indeterminateBar(), 'linear');
            await verifyClassPresent(linearProgressSelectors.multiColorSuccessBar(), 'linear');
        });

        it('should verify progress bars display with proper values', async () => {
            // Verify striped bar has value attribute
            const stripedValue = await getAttribute(linearProgressSelectors.stripedBar(), 'value');
            await expect(stripedValue).toBe('40');

            // Verify multi-color bars have correct values
            const successValue = await getAttribute(linearProgressSelectors.multiColorSuccessBar(), 'value');
            await expect(successValue).toBe('120');

            const negativeValue = await getAttribute(linearProgressSelectors.multiColorNegativeBar(), 'value');
            await expect(negativeValue).toBe('40');
        });
    });

    describe('Radial Progress Bars', () => {
        it('should display single radial progress bar', async () => {
            await verifyPresent(radialProgressSelectors.singleContainer());
            await verifyPresent(radialProgressSelectors.singleBar());
            await verifyClassPresent(radialProgressSelectors.singleContainer(), 'radial');
        });

        it('should display single radial progress bar with radial class on bar', async () => {
            await verifyClassPresent(radialProgressSelectors.singleBar(), 'radial');
        });

        it('should display SVG element in single radial progress bar', async () => {
            const svg = await getRadialSvgElement(radialProgressSelectors.singleBar());
            await expect(svg).toBeTruthy();
        });

        it('should display SVG circle element in single radial progress bar', async () => {
            const circle = await getRadialCircleElement(radialProgressSelectors.singleBar());
            await expect(circle).toBeTruthy();
        });

        it('should verify single radial progress bar has correct value', async () => {
            const singleValue = await getAttribute(radialProgressSelectors.singleBar(), 'value');
            await expect(singleValue).toBe('70');
        });

        it('should display multi-color radial progress bars', async () => {
            await verifyPresent(radialProgressSelectors.multiContainer());
            await verifyPresent(radialProgressSelectors.multiSuccessBar());
            await verifyPresent(radialProgressSelectors.multiNegativeBar());
            await verifyPresent(radialProgressSelectors.multiWarningBar());
        });

        it('should display multi-color radial bars with radial class', async () => {
            await verifyClassPresent(radialProgressSelectors.multiSuccessBar(), 'radial');
            await verifyClassPresent(radialProgressSelectors.multiNegativeBar(), 'radial');
            await verifyClassPresent(radialProgressSelectors.multiWarningBar(), 'radial');
        });

        it('should verify multi-color radial bars have correct color attributes', async () => {
            const successColor = await getAttribute(radialProgressSelectors.multiSuccessBar(), 'color');
            await expect(successColor).toBe('success');

            const negativeColor = await getAttribute(radialProgressSelectors.multiNegativeBar(), 'color');
            await expect(negativeColor).toBe('negative');

            const warningColor = await getAttribute(radialProgressSelectors.multiWarningBar(), 'color');
            await expect(warningColor).toBe('warning');
        });

        it('should verify multi-color radial bars have correct values', async () => {
            const successValue = await getAttribute(radialProgressSelectors.multiSuccessBar(), 'value');
            await expect(successValue).toBe('50');

            const negativeValue = await getAttribute(radialProgressSelectors.multiNegativeBar(), 'value');
            await expect(negativeValue).toBe('40');

            const warningValue = await getAttribute(radialProgressSelectors.multiWarningBar(), 'value');
            await expect(warningValue).toBe('30');
        });

        it('should display SVG elements in multi-color radial progress bars', async () => {
            const successSvg = await getRadialSvgElement(radialProgressSelectors.multiSuccessBar());
            await expect(successSvg).toBeTruthy();

            const negativeSvg = await getRadialSvgElement(radialProgressSelectors.multiNegativeBar());
            await expect(negativeSvg).toBeTruthy();

            const warningSvg = await getRadialSvgElement(radialProgressSelectors.multiWarningBar());
            await expect(warningSvg).toBeTruthy();
        });
    });
});
