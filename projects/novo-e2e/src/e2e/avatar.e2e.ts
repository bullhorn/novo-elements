import { browser } from '@wdio/globals';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyElementCountEquals, verifyPresent, verifyText } from '../utils/VerifyUtil';
import { automationId, codeExample, elements } from '../utils/SelectorUtil';

describe('Avatar Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.AVATAR);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    it('should display page title and examples', async () => {
        await verifyPresent(elements.title);
        await verifyText(elements.title, 'Avatar', 'Avatar example page title');
        await verifyPresent('avatar-examples-page');
    });

    describe('Avatar Section', () => {
        it('should display Avatar section', async () => {
            const avatarTitle = 'avatar-examples-page h3';
            await verifyText(avatarTitle, 'Avatar', 'Avatar section title');
        });

        it('should have Avatar usage example', async () => {
            await verifyPresent(codeExample('avatar-usage'));
        });

        it('should display novo-avatar elements', async () => {
            await verifyElementCountEquals(`avatar-usage-example ${automationId('avatar')}`, 3);
        });
    });

    describe('Avatar Stack Section', () => {
        it('should display Avatar Stack section', async () => {
            await verifyText('h3', 'Avatar Stack', 'Avatar Stack section title', 1);
        });

        it('should have Avatar Stack usage example', async () => {
            await verifyPresent(codeExample('avatar-stack-usage'));
        });

        it('should display novo-avatar-stack element', async () => {
            await verifyPresent(automationId('avatar-stack'));
        });

        it('should have multiple avatars in the stack', async () => {
            await verifyElementCountEquals(automationId('avatar'), 6);
        });
    });
});
