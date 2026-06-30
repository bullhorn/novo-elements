import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample } from '../utils/SelectorUtil';
import { verifyPresent, verifyAbsent, verifyText, verifyTextIncludes } from '../utils/VerifyUtil';
import {
    basicMultiPicker,
    nestedMultiPicker,
    basicSelectedState,
    nestedSelectedDept,
    nestedSelectedUser,
    checklistResults,
    checklistSectionHeaders,
    multiPickerInput,
    clearAllButtonIn,
    chipsIn,
    clickChecklistItemByLabel,
} from '../utils/MultiPickerUtil';

describe('Multi-Picker Demo Page', () => {
    const url = formControlsUrl('multi-picker');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = ['basic-multi-picker', 'nested-multi-picker'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section), section);
            });
        });
    });

    describe('Basic Multi-Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicMultiPicker.component);
        });

        it('should display the multi-picker component', async () => {
            await verifyPresent(basicMultiPicker.component, 'basic multi-picker component');
        });

        it('should display initial chips for the pre-selected values', async () => {
            await verifyPresent(chipsIn(basicMultiPicker.component), 'initial chips');
        });

        it('should display Alabama in the selected states display', async () => {
            await verifyTextIncludes(basicSelectedState(0), 'Alabama', 'first selected state');
        });
    });

    describe('Basic Multi-Picker Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicMultiPicker.component);
            await click(multiPickerInput(basicMultiPicker.component));
        });

        it('should display the checklist picker results', async () => {
            await verifyPresent(checklistResults, 'checklist picker results');
        });

        it('should display section headers for collaborators and states', async () => {
            await Promise.all([
                verifyText(checklistSectionHeaders, 'collaborators', 'collaborators section header', 0),
                verifyText(checklistSectionHeaders, 'states', 'states section header', 1),
            ]);
        });
    });

    describe('Basic Multi-Picker State Selection', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicMultiPicker.component);
            await click(multiPickerInput(basicMultiPicker.component));
            await clickChecklistItemByLabel('Alaska');
        });

        it('should add Alaska to the selected states display', async () => {
            await verifyTextIncludes(basicSelectedState(1), 'Alaska', 'second selected state after selecting Alaska');
        });
    });

    describe('Basic Multi-Picker Clear All', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicMultiPicker.component);
            await click(clearAllButtonIn(basicMultiPicker.component));
        });

        it('should remove all chips when clear all is clicked', async () => {
            await verifyAbsent(chipsIn(basicMultiPicker.component), 'chips after clearing all');
        });
    });

    describe('Nested Multi-Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(nestedMultiPicker.component);
        });

        it('should display the nested multi-picker component', async () => {
            await verifyPresent(nestedMultiPicker.component, 'nested multi-picker component');
        });

        it('should display initial selected department values', async () => {
            await verifyPresent(nestedSelectedDept(0), 'first selected department');
        });

        it('should display initial selected user values', async () => {
            await verifyPresent(nestedSelectedUser(0), 'first selected user');
        });
    });

    describe('Nested Multi-Picker Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(nestedMultiPicker.component);
            await click(multiPickerInput(nestedMultiPicker.component));
        });

        it('should display section headers for departments and users', async () => {
            await Promise.all([
                verifyText(checklistSectionHeaders, 'departments', 'departments section header', 0),
                verifyText(checklistSectionHeaders, 'users', 'users section header', 1),
            ]);
        });
    });

    describe('Nested Multi-Picker Department Selection', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(nestedMultiPicker.component);
            await click(multiPickerInput(nestedMultiPicker.component));
            await clickChecklistItemByLabel('Sales');
        });

        it('should add Sales to the selected departments display', async () => {
            await verifyPresent(nestedSelectedDept(3), 'fourth selected department after selecting Sales');
        });
    });
});
