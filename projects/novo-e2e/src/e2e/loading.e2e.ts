import { clickRadio, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText } from '../utils/VerifyUtil';
import {
    loading,
    loadingSizeLineSelector,
    loadingColorLineSelector,
    loadingSizeSpinnerSelector,
    loadingColorSpinnerSelector,
} from '../utils/LoadingUtil';

describe('Loading Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.LOADING);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Loading', 'Loading example page title');
        });

        it('should display loading-line example section', async () => {
            await scrollIntoView(loading.lineExample);
            await verifyPresent(loading.lineExample, 'loading line example section');
            await verifyPresent(loading.lineComponent, 'loading line component');
        });

        it('should display loading-circle example section', async () => {
            await scrollIntoView(loading.circleExample);
            await verifyPresent(loading.circleExample, 'loading circle example section');
            await verifyPresent(loading.spinnerComponent, 'loading spinner component');
        });
    });

    describe('Line Loader', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(loading.lineExample);
        });

        it('should allow selecting all size options', async () => {
            const sizes = ['small', 'medium', 'large'];
            for (const size of sizes) {
                await verifyPresent(loadingSizeLineSelector(size));
                await clickRadio(loadingSizeLineSelector(size));
                await verifyPresent(loading.lineComponent);
            }
        });

        it('should allow selecting all color options', async () => {
            const colors = ['grapefruit', 'aqua', 'mint', 'ocean'];
            for (const color of colors) {
                await verifyPresent(loadingColorLineSelector(color));
                await clickRadio(loadingColorLineSelector(color));
                await verifyPresent(loading.lineComponent);
            }
        });
    });

    describe('Spinner', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(loading.circleExample);
        });

        it('should allow selecting all size options', async () => {
            const sizes = ['small', 'medium', 'large'];
            for (const size of sizes) {
                await verifyPresent(loadingSizeSpinnerSelector(size));
                await clickRadio(loadingSizeSpinnerSelector(size));
                await verifyPresent(loading.spinnerComponent);
            }
        });

        it('should allow selecting all color options', async () => {
            const colors = ['grapefruit', 'aqua', 'mint', 'ocean'];
            for (const color of colors) {
                await verifyPresent(loadingColorSpinnerSelector(color));
                await clickRadio(loadingColorSpinnerSelector(color));
                await verifyPresent(loading.spinnerComponent);
            }
        });
    });
});
