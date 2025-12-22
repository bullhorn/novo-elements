import { browser } from "@wdio/globals";
import { examplesUrl, URLS } from "../utils/EnvironmentUtil";
import { verifyPresent, verifyText } from "../utils/VerifyUtil";
import { codeExample, elements } from "../utils/SelectorUtil";

describe('Avatar Demo Page', () => {
    const url = examplesUrl('avatar');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
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
            await verifyPresent('avatar-usage-example novo-avatar');
        });
    });

    describe('Avatar Stack Section', () => {
        it('should display Avatar Stack section', async () => {
            const stackTitle = 'avatar-examples-page h3:nth-of-type(2)';
            await verifyText(stackTitle, 'Avatar Stack', 'Avatar Stack section title');
        });

        it('should have Avatar Stack usage example', async () => {
            await verifyPresent(codeExample('avatar-stack-usage'));
        });

        it('should display novo-avatar-stack element', async () => {
            await verifyPresent('avatar-stack-usage-example novo-avatar-stack');
        });

        it('should have multiple avatars in the stack', async () => {
            await verifyPresent('avatar-stack-usage-example novo-avatar-stack novo-avatar');
        });
    });
});
