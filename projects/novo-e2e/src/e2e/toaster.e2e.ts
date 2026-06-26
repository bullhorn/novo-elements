import { browser } from '@wdio/globals';
import { click, clickRadio, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { automationId, codeExample, elements } from '../utils/SelectorUtil';
import { verifyAbsent, verifyClassAbsent, verifyClassPresent, verifyPresent, verifyText } from '../utils/VerifyUtil';
import { toaster, toastTitle, toastMessage, toastActionButton, toastCloseButton } from '../utils/ToasterUtil';

describe('Toaster Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.TOASTER);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Toaster', 'Toaster page title');
        });

        const exampleSections = ['toast-options', 'toast-usage', 'toast-service', 'toast-actions'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Toast Usage', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(toaster.usageContainer);
        });

        it('should display the embedded toast', async () => {
            await verifyPresent(toaster.display);
        });

        it('should have the initial danger theme', async () => {
            await verifyClassPresent(toaster.display, 'danger');
        });

        it('should cycle to default theme after one click', async () => {
            await click(toaster.changeButton);
            await verifyClassPresent(toaster.display, 'default');
        });

        it('should cycle to success theme after a second click', async () => {
            await click(toaster.changeButton);
            await verifyClassPresent(toaster.display, 'success');
        });
    });

    describe('Toast Options', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(toaster.optionsDisplay);
        });

        it('should display the options preview toast', async () => {
            await verifyPresent(toaster.optionsPreview);
        });

        it('should have the default banner appearance', async () => {
            await verifyClassPresent(toaster.optionsPreview, 'banner');
        });

        it('should have the default info color', async () => {
            await verifyClassPresent(toaster.optionsPreview, 'info');
        });

        it('should switch to growl appearance', async () => {
            await clickRadio(automationId('toast-appearance-growl'));
            await verifyClassPresent(toaster.optionsPreview, 'growl');
            await verifyClassAbsent(toaster.optionsPreview, 'banner');
        });

        it('should switch back to banner appearance', async () => {
            await clickRadio(automationId('toast-appearance-banner'));
            await verifyClassPresent(toaster.optionsPreview, 'banner');
        });

        it('should switch to success color', async () => {
            await clickRadio(automationId('toast-color-success'));
            await verifyClassPresent(toaster.optionsPreview, 'success');
        });

        it('should switch to danger color', async () => {
            await clickRadio(automationId('toast-color-danger'));
            await verifyClassPresent(toaster.optionsPreview, 'danger');
        });

        it('should hide the title when hide is selected', async () => {
            await clickRadio(automationId('toast-title-hide'));
            await verifyAbsent(toastTitle(toaster.optionsPreview));
        });

        it('should show the title when show is selected', async () => {
            await clickRadio(automationId('toast-title-show'));
            await verifyPresent(toastTitle(toaster.optionsPreview));
        });

        it('should show the close button when closeable is true', async () => {
            await clickRadio(automationId('toast-closeable-true'));
            await verifyPresent(toastCloseButton(toaster.optionsPreview));
        });

        it('should hide the close button when closeable is false', async () => {
            await clickRadio(automationId('toast-closeable-false'));
            await verifyAbsent(toastCloseButton(toaster.optionsPreview));
        });
    });

    describe('Toast Service', () => {
        const triggerIds = [
            'toast-trigger',
            'toast-trigger-bottom',
            'toast-trigger-growl-top-right',
            'toast-trigger-growl-top-left',
            'toast-trigger-growl-bottom-right',
            'toast-trigger-growl-bottom-left',
            'toast-trigger-top-accent',
        ];

        it('should display all service trigger buttons', async () => {
            await scrollIntoView(automationId('toast-trigger'));
            for (const id of triggerIds) {
                await verifyPresent(automationId(id));
            }
        });

        it('should show a fixed-bottom toast and display its title', async () => {
            await browser.refresh();
            await scrollIntoView(automationId('toast-trigger-bottom'));
            await click(automationId('toast-trigger-bottom'));
            await verifyPresent('novo-toast.fixedBottom');
            await verifyText(toastTitle('novo-toast.fixedBottom'), 'Bottom', 'fixed-bottom toast title');
        });

        it('should show a growl-top-right toast and display its message', async () => {
            await browser.refresh();
            await scrollIntoView(automationId('toast-trigger-growl-top-right'));
            await click(automationId('toast-trigger-growl-top-right'));
            await verifyPresent('novo-toast.growlTopRight');
            await verifyText(toastMessage('novo-toast.growlTopRight'), 'This positioning is growlTopRight', 'growl-top-right toast message');
        });

        it('should show a closeable toast and dismiss it via the close button', async () => {
            await browser.refresh();
            await scrollIntoView(automationId('toast-trigger-top-accent'));
            await click(automationId('toast-trigger-top-accent'));
            await verifyPresent('novo-toast.fixedTop');
            await verifyPresent(toastCloseButton('novo-toast.fixedTop'));
            await click(toastCloseButton('novo-toast.fixedTop'));
            await browser.waitUntil(
                async () => {
                    const toasts = await $$('novo-toast.fixedTop');
                    return toasts.length === 0;
                },
                { timeout: 5000, timeoutMsg: 'Toast did not dismiss after clicking close button' },
            );
        });
    });

    describe('Toast Actions', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(automationId('toast-trigger'));
        });

        it('should display all action trigger buttons', async () => {
            const actionTriggers = [
                'toast-trigger',
                'toast-trigger-bottom',
                'toast-trigger-growl-top-right',
                'toast-trigger-growl-top-left',
                'toast-trigger-growl-bottom-right',
                'toast-trigger-growl-bottom-left',
            ];
            for (const id of actionTriggers) {
                await verifyPresent(automationId(id));
            }
        });

        it('should show a growl toast with an action button', async () => {
            // Both toast-service and toast-actions share trigger automation IDs — scope to this section.
            await click(`${codeExample('toast-actions')} ${automationId('toast-trigger-growl-top-right')}`);
            await verifyPresent('novo-toast.growlTopRight');
            await verifyPresent(toastActionButton('novo-toast.growlTopRight'));
            await verifyText(toastActionButton('novo-toast.growlTopRight'), 'Click Me', 'toast action button label');
        });
    });
});
