import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, Classes } from '../utils/SelectorUtil';
import { verifyPresent, verifyClassPresent, verifyClassAbsent } from '../utils/VerifyUtil';
import { checkboxSelectors } from '../utils/CheckboxUtil';

describe('Checkbox Demo Page', () => {
    const url = formControlsUrl('checkbox');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = ['basic-checkbox', 'checkbox-list'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Basic Checkbox - Initial States', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(checkboxSelectors.basicCheckbox(0));
        });

        const enabledStates = [
            { index: 0, label: 'unchecked', iconClass: Classes.bhiCheckboxUnfilled },
            { index: 1, label: 'checked', iconClass: Classes.bhiCheckboxFilled },
            { index: 2, label: 'indeterminate', iconClass: Classes.bhiCheckboxIndeterminate },
        ];
        enabledStates.forEach(({ index, label, iconClass }) => {
            it(`should display ${label} checkbox with correct icon`, async () => {
                await verifyClassPresent(checkboxSelectors.basicCheckboxIcon(index), iconClass, `${label} checkbox icon`);
            });
        });

        const disabledStates = [
            { index: 3, label: 'disabled', iconClass: Classes.bhiCheckboxUnfilled },
            { index: 4, label: 'disabled+checked', iconClass: Classes.bhiCheckboxFilled },
            { index: 5, label: 'disabled+indeterminate', iconClass: Classes.bhiCheckboxIndeterminate },
        ];
        disabledStates.forEach(({ index, label, iconClass }) => {
            it(`should display ${label} checkbox with disabled class and correct icon`, async () => {
                await verifyClassPresent(checkboxSelectors.basicCheckboxGroup(index), Classes.disabled, `${label} checkbox group`);
                await verifyClassPresent(checkboxSelectors.basicCheckboxIcon(index), iconClass, `${label} checkbox icon`);
            });
        });

        it('should not have disabled class on enabled checkboxes', async () => {
            await verifyClassAbsent(checkboxSelectors.basicCheckboxGroup(0), Classes.disabled, 'unchecked checkbox group');
            await verifyClassAbsent(checkboxSelectors.basicCheckboxGroup(1), Classes.disabled, 'checked checkbox group');
            await verifyClassAbsent(checkboxSelectors.basicCheckboxGroup(2), Classes.disabled, 'indeterminate checkbox group');
        });
    });

    describe('Basic Checkbox - Interaction', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(checkboxSelectors.basicCheckbox(0));
        });

        const interactions = [
            { index: 0, label: 'unchecked', gains: Classes.bhiCheckboxFilled, loses: Classes.bhiCheckboxUnfilled },
            { index: 1, label: 'checked', gains: Classes.bhiCheckboxUnfilled, loses: Classes.bhiCheckboxFilled },
            { index: 2, label: 'indeterminate', gains: Classes.bhiCheckboxUnfilled, loses: Classes.bhiCheckboxIndeterminate },
        ];
        interactions.forEach(({ index, label, gains, loses }) => {
            it(`should toggle ${label} checkbox on click`, async () => {
                await click(checkboxSelectors.basicCheckboxIcon(index));
                await verifyClassPresent(checkboxSelectors.basicCheckboxIcon(index), gains, `${label} checkbox icon after click`);
                await verifyClassAbsent(checkboxSelectors.basicCheckboxIcon(index), loses, `${label} checkbox icon after click`);
            });
        });
    });

    describe('Checkbox List', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(checkboxSelectors.listEnabled);
        });

        it('should display enabled checkbox list', async () => {
            await verifyPresent(checkboxSelectors.listEnabled, 'enabled checkbox list');
        });

        it('should display disabled checkbox list', async () => {
            await verifyPresent(checkboxSelectors.listDisabled, 'disabled checkbox list');
        });

        it('should have disabled class on disabled checkbox list items', async () => {
            await verifyClassPresent(checkboxSelectors.listDisabledGroup, Classes.disabled, 'disabled checkbox list group');
        });
    });
});
