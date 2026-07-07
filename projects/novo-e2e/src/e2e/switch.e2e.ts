import { click } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, componentsUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText, verifyDisabled } from '../utils/VerifyUtil';
import { switchSelectors, switchIcon, isSwitchChecked } from '../utils/SwitchUtil';
import { getElementText } from '../utils/ElementPropertiesUtil';

describe('Switch Demo Page', () => {
    const url = componentsUrl(COMPONENT_URLS.SWITCH);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });


    describe('Switch Interactions', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should toggle default switch and update label', async () => {
            await verifyPresent(switchSelectors.defaultSwitch);
            const initialLabel = await getElementText(switchSelectors.label);
            const isChecked = isSwitchChecked(initialLabel);
            await verifyPresent(switchIcon(switchSelectors.defaultSwitch, isChecked));

            await click(switchSelectors.defaultSwitch);
            const afterClick = await getElementText(switchSelectors.label);
            await verifyPresent(switchIcon(switchSelectors.defaultSwitch, !isChecked));
            await expect(afterClick).not.toBe(initialLabel);
        });

        it('should toggle grapefruit themed switch', async () => {
            await verifyPresent(switchSelectors.grapefruitSwitch);
            const initialLabel = await getElementText(switchSelectors.label);
            const isChecked = isSwitchChecked(initialLabel);
            await verifyPresent(switchIcon(switchSelectors.grapefruitSwitch, isChecked));

            await click(switchSelectors.grapefruitSwitch);
            const afterFirstClick = await getElementText(switchSelectors.label);
            await verifyPresent(switchIcon(switchSelectors.grapefruitSwitch, !isChecked));
            await expect(afterFirstClick).not.toBe(initialLabel);

            await click(switchSelectors.grapefruitSwitch);
            const afterSecondClick = await getElementText(switchSelectors.label);
            await verifyPresent(switchIcon(switchSelectors.grapefruitSwitch, isChecked));
            await expect(afterSecondClick).toBe(initialLabel);
        });

        it('should not toggle disabled switch', async () => {
            await verifyPresent(switchSelectors.disabledSwitch);
            await verifyDisabled(switchSelectors.disabledSwitch, 'disabled switch');
            await verifyText(switchSelectors.disabledSwitch, 'THIS IS DISABLED', 'disabled switch text');
            const initialLabel = await getElementText(switchSelectors.label);
            await click(switchSelectors.disabledSwitch);
            const afterClick = await getElementText(switchSelectors.label);
            await expect(afterClick).toBe(initialLabel);
        });
    });
});
