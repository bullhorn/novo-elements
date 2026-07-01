import { click } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyDisabled, verifyEnabled } from '../utils/VerifyUtil';
import { menu, closeMenu } from '../utils/MenuUtil';
import { acceptAlertIfPresent } from '../utils/AutomationHelpers';

describe('Menu Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.MENU);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Menu', 'Menu example page title');
        });
    });

    describe('Basic Menu', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display basic menu example section', async () => {
            await verifyPresent(menu.basicMenuExample, 'basic menu example section');
        });

        it('should open menu and display all menu items', async () => {
            await click(menu.basicMenuButton);
            await Promise.all([
                verifyPresent(menu.basicMenu, 'basic menu'),
                verifyPresent(menu.basicMenuPreview, 'preview item'),
                verifyPresent(menu.basicMenuEdit, 'edit item'),
                verifyPresent(menu.basicMenuDisabled, 'disabled item'),
                verifyPresent(menu.basicMenuDelete, 'delete item'),
            ]);
            await closeMenu();
        });

        it('should have disabled and enabled menu items', async () => {
            await click(menu.basicMenuButton);
            await verifyEnabled(menu.basicMenuPreview, 'preview menu item');
            await verifyEnabled(menu.basicMenuEdit, 'edit menu item');
            await verifyDisabled(menu.basicMenuDisabled, 'disabled menu item');
            await verifyEnabled(menu.basicMenuDelete, 'delete menu item');
            await closeMenu();
        });

        it('should allow clicking preview menu item action', async () => {
            await click(menu.basicMenuButton);
            await click(menu.basicMenuPreview);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.basicMenuButton, 'basic menu button still accessible after preview action');
        });

        it('should allow clicking delete menu item action', async () => {
            await click(menu.basicMenuButton);
            await click(menu.basicMenuDelete);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.basicMenuButton, 'basic menu button still accessible after delete action');
        });
    });

    describe('Icon Menu', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display icon menu button and open menu with all items', async () => {
            await verifyPresent(menu.iconMenuButton, 'icon menu button');
            await click(menu.iconMenuButton);
            await Promise.all([
                verifyPresent(menu.iconMenu, 'icon menu'),
                verifyPresent(menu.iconMenuPreview, 'icon preview item'),
                verifyPresent(menu.iconMenuEdit, 'icon edit item'),
                verifyPresent(menu.iconMenuDelete, 'icon delete item'),
            ]);
            await closeMenu();
        });

        it('should allow clicking icon menu preview action', async () => {
            await click(menu.iconMenuButton);
            await click(menu.iconMenuPreview);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.iconMenuButton, 'icon menu button still accessible after preview action');
        });

        it('should allow clicking icon menu delete action', async () => {
            await click(menu.iconMenuButton);
            await click(menu.iconMenuDelete);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.iconMenuButton, 'icon menu button still accessible after delete action');
        });
    });

    describe('Nested Menu', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display nested menu example section', async () => {
            await verifyPresent(menu.nestedMenuExample, 'nested menu example section');
        });

        it('should open nested menu and display all items', async () => {
            await click(menu.nestedMenuButton);
            await Promise.all([
                verifyPresent(menu.nestedMenu, 'nested menu'),
                verifyPresent(menu.nestedMenuPreview, 'nested preview item'),
                verifyPresent(menu.nestedMenuEdit, 'nested edit item'),
                verifyPresent(menu.nestedMenuChoose, 'nested choose item'),
            ]);
            await closeMenu();
        });

        it('should display submenu trigger item', async () => {
            await click(menu.nestedMenuButton);
            await verifyPresent(menu.nestedMenuChoose, 'nested choose submenu trigger');
            await closeMenu();
        });

        it('should allow clicking nested menu preview action', async () => {
            await click(menu.nestedMenuButton);
            await click(menu.nestedMenuPreview);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.nestedMenuButton, 'nested menu button still accessible after preview action');
        });
    });

    describe('Context Menu', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display context menu example section', async () => {
            await verifyPresent(menu.contextMenuExample, 'context menu example section');
        });

        it('should display context menu buttons', async () => {
            await Promise.all([
                verifyPresent(menu.contextMenuButton('apple'), 'apple context menu button'),
                verifyPresent(menu.contextMenuButton('orange'), 'orange context menu button'),
            ]);
        });

        it('should open context menu for apples and display all items', async () => {
            await click(menu.contextMenuButton('apple'));
            await Promise.all([
                verifyPresent(menu.contextMenu, 'context menu'),
                verifyPresent(menu.contextMenuPreview, 'context preview item'),
                verifyPresent(menu.contextMenuEdit, 'context edit item'),
                verifyPresent(menu.contextMenuDelete, 'context delete item'),
                verifyPresent(menu.contextMenuDisabled, 'context disabled item'),
            ]);
            await closeMenu();
        });

        it('should allow clicking context menu preview for apples', async () => {
            await click(menu.contextMenuButton('apple'));
            await click(menu.contextMenuPreview);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.contextMenuButton('apple'), 'apple context button still accessible after preview action');
        });

        it('should open context menu for oranges and display all items', async () => {
            await click(menu.contextMenuButton('orange'));
            await Promise.all([
                verifyPresent(menu.contextMenu, 'context menu'),
                verifyPresent(menu.contextMenuPreview, 'context preview item'),
                verifyPresent(menu.contextMenuEdit, 'context edit item'),
                verifyPresent(menu.contextMenuDelete, 'context delete item'),
            ]);
            await closeMenu();
        });

        it('should allow clicking context menu preview for oranges', async () => {
            await click(menu.contextMenuButton('orange'));
            await click(menu.contextMenuPreview);
            await acceptAlertIfPresent();
            await closeMenu();
            await verifyPresent(menu.contextMenuButton('orange'), 'orange context button still accessible after preview action');
        });
    });
});
