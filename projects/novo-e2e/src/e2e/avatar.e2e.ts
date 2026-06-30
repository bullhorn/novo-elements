import { browser } from '@wdio/globals';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyElementCountEquals, verifyPresent, verifyText } from '../utils/VerifyUtil';
import { elements } from '../utils/SelectorUtil';
import { avatarSelectors } from '../utils/AvatarUtil';

describe('Avatar Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.AVATAR);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Title and Layout', () => {
        it('should display page title and examples', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Avatar', 'Avatar example page title');
            await verifyPresent(avatarSelectors.page, 'avatar examples page');
        });
    });

    describe('Avatar Section', () => {
        it('should display Avatar section heading', async () => {
            await verifyText(avatarSelectors.sectionHeading, 'Avatar', 'Avatar section title');
        });

        it('should have Avatar usage example', async () => {
            await verifyPresent(avatarSelectors.usageExample, 'avatar usage example');
        });

        it('should display novo-avatar elements', async () => {
            await verifyElementCountEquals(avatarSelectors.avatarsInUsage, 3, 'avatars in usage example');
        });
    });

    describe('Avatar Stack Section', () => {
        it('should display Avatar Stack section heading', async () => {
            await verifyText(avatarSelectors.sectionHeading, 'Avatar Stack', 'Avatar Stack section title', 1);
        });

        it('should have Avatar Stack usage example', async () => {
            await verifyPresent(avatarSelectors.stackExample, 'avatar stack usage example');
        });

        it('should display novo-avatar-stack element', async () => {
            await verifyPresent(avatarSelectors.stack, 'avatar-stack element');
        });

        it('should have multiple avatars in the stack', async () => {
            await verifyElementCountEquals(avatarSelectors.avatarsPageTotal, 6, 'total avatars on page');
        });
    });
});
