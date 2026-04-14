import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText } from '../utils/VerifyUtil';
import {
    loadingLineComponent,
    loadingLineExample,
    loadingSizeLineRadio,
    loadingColorLineRadio,
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
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Loading', 'Loading example page title');
        });

        it('should display loading-line example section', async () => {
            await verifyPresent(loadingLineExample());
        });

        it('should display loading-line component', async () => {
            await scrollIntoView(loadingLineExample());
            await verifyPresent(loadingLineComponent());
        });
    });

    describe('Line Loader - Size Control', () => {
        beforeEach(async () => {
            await scrollIntoView(loadingLineExample());
        });

        it('should have small size option', async () => {
            await verifyPresent(loadingSizeLineRadio('small'));
        });

        it('should have medium size option', async () => {
            await verifyPresent(loadingSizeLineRadio('medium'));
        });

        it('should have large size option', async () => {
            await verifyPresent(loadingSizeLineRadio('large'));
        });

        it('should select small size', async () => {
            await click(loadingSizeLineRadio('small'));
            await verifyPresent(loadingLineComponent());
        });

        it('should select medium size', async () => {
            await click(loadingSizeLineRadio('medium'));
            await verifyPresent(loadingLineComponent());
        });

        it('should select large size', async () => {
            await click(loadingSizeLineRadio('large'));
            await verifyPresent(loadingLineComponent());
        });
    });

    describe('Line Loader - Color Control', () => {
        beforeEach(async () => {
            await scrollIntoView(loadingLineExample());
        });

        it('should have grapefruit color option', async () => {
            await verifyPresent(loadingColorLineRadio('grapefruit'));
        });

        it('should have aqua color option', async () => {
            await verifyPresent(loadingColorLineRadio('aqua'));
        });

        it('should have mint color option', async () => {
            await verifyPresent(loadingColorLineRadio('mint'));
        });

        it('should have ocean color option', async () => {
            await verifyPresent(loadingColorLineRadio('ocean'));
        });

        it('should select grapefruit color', async () => {
            await click(loadingColorLineRadio('grapefruit'));
            await verifyPresent(loadingLineComponent());
        });

        it('should select aqua color', async () => {
            await click(loadingColorLineRadio('aqua'));
            await verifyPresent(loadingLineComponent());
        });

        it('should select mint color', async () => {
            await click(loadingColorLineRadio('mint'));
            await verifyPresent(loadingLineComponent());
        });

        it('should select ocean color', async () => {
            await click(loadingColorLineRadio('ocean'));
            await verifyPresent(loadingLineComponent());
        });
    });
});
