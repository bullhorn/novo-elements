import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, Classes } from '../utils/SelectorUtil';
import { verifyPresent, verifyClassPresent, verifyClassAbsent, verifyElementCountEquals } from '../utils/VerifyUtil';
import { tilesSelectors, defaultTile, iconsTile, colorsTile } from '../utils/TilesUtil';

describe('Tiles Demo Page', () => {
    const url = formControlsUrl('tiles');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display example section - tiles-usage', async () => {
            await verifyPresent(codeExample('tiles-usage'));
        });
    });

    describe('Default Tiles', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(tilesSelectors.defaultGroup);
        });

        it('should display the default tiles group', async () => {
            await verifyPresent(tilesSelectors.defaultGroup);
        });

        it('should have Yes tile initially selected', async () => {
            await verifyClassPresent(defaultTile('Yes'), Classes.active, 'Yes tile');
        });

        it('should have No tile not selected initially', async () => {
            await verifyClassAbsent(defaultTile('No'), Classes.active, 'No tile');
        });

        it('should have Maybe tile disabled', async () => {
            await verifyClassPresent(defaultTile('Maybe'), Classes.disabled, 'Maybe tile');
        });

        it('should select No tile on click', async () => {
            await click(defaultTile('No'));
            await verifyClassPresent(defaultTile('No'), Classes.active, 'No tile after click');
            await verifyClassAbsent(defaultTile('Yes'), Classes.active, 'Yes tile after No selected');
        });
    });

    describe('Icons Tiles', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(tilesSelectors.iconsGroup);
        });

        it('should display the icons tiles group', async () => {
            await verifyPresent(tilesSelectors.iconsGroup);
        });

        it('should have Exclude tile initially selected', async () => {
            await verifyClassPresent(iconsTile('Exclude'), Classes.active, 'Exclude tile');
        });

        it('should select Include tile on click', async () => {
            await click(iconsTile('Include'));
            await verifyClassPresent(iconsTile('Include'), Classes.active, 'Include tile after click');
        });
    });

    describe('Disabled Tiles', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(tilesSelectors.disabledGroup);
        });

        it('should display the disabled tiles group', async () => {
            await verifyPresent(tilesSelectors.disabledGroup);
        });

        it('should have disabled class on the tile container', async () => {
            await verifyClassPresent(tilesSelectors.disabledContainer, Classes.disabled, 'disabled tiles container');
        });
    });

    describe('Color Tiles', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(tilesSelectors.colorsGroup);
        });

        it('should display the color tiles group', async () => {
            await verifyPresent(tilesSelectors.colorsGroup);
        });

        it('should have Good tile initially selected', async () => {
            await verifyClassPresent(colorsTile('Good'), Classes.active, 'Good tile');
        });

        it('should display Add Tile and Reset buttons', async () => {
            for (const selector of [tilesSelectors.addButton, tilesSelectors.resetButton]) {
                await verifyPresent(selector);
            }
        });

        it('should add a tile when Add Tile is clicked', async () => {
            await verifyElementCountEquals(tilesSelectors.colorsTileAll, 2, 'color tiles');
            await click(tilesSelectors.addButton);
            await verifyElementCountEquals(tilesSelectors.colorsTileAll, 3, 'color tiles after add');
        });

        it('should reset to 2 tiles when Reset is clicked', async () => {
            await click(tilesSelectors.resetButton);
            await verifyElementCountEquals(tilesSelectors.colorsTileAll, 2, 'color tiles after reset');
        });
    });
});
