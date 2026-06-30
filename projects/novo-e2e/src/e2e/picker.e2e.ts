import { click, scrollIntoView, sendKeys } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample } from '../utils/SelectorUtil';
import { verifyPresent, verifyAbsent, verifyTextIncludes } from '../utils/VerifyUtil';
import { sleep } from '../utils/SleepUtil';
import {
    basicPicker,
    asyncPicker,
    formattedPicker,
    entityPicker,
    defaultArrayPicker,
    pickerResultItems,
    entityPickerResultItems,
    pickerInput,
    clearButtonIn,
    clickPickerItemByLabel,
} from '../utils/PickerUtil';

describe('Picker Demo Page', () => {
    const url = formControlsUrl('picker');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = [
            'basic-picker',
            'async-picker',
            'custom-picker-results',
            'default-options-picker',
            'entity-picker',
            'formatted-picker',
            'grouped-picker',
            'mixed-picker',
            'override-template',
        ];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section), section);
            });
        });
    });

    describe('Basic Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicPicker.component);
        });

        it('should display the picker component', async () => {
            await verifyPresent(basicPicker.component, 'basic picker component');
        });

        it('should display the picker input', async () => {
            await verifyPresent(pickerInput(basicPicker.component), 'basic picker input');
        });
    });

    describe('Basic Picker Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicPicker.component);
            await click(pickerInput(basicPicker.component));
        });

        it('should display picker result items', async () => {
            await verifyPresent(pickerResultItems, 'picker result items');
        });
    });

    describe('Basic Picker Selection', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicPicker.component);
            await click(pickerInput(basicPicker.component));
            await clickPickerItemByLabel('Alaska');
        });

        it('should update the value display after selecting Alaska', async () => {
            await verifyTextIncludes(basicPicker.value, 'Alaska', 'basic picker value after selecting Alaska');
        });
    });

    describe('Basic Picker Clear', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicPicker.component);
            await click(pickerInput(basicPicker.component));
            await clickPickerItemByLabel('Alabama');
            await click(clearButtonIn(basicPicker.component));
        });

        it('should clear the value display after clicking clear', async () => {
            await verifyAbsent(clearButtonIn(basicPicker.component), 'clear button after clearing');
        });
    });

    describe('Formatted Picker Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(formattedPicker.component);
            await click(pickerInput(formattedPicker.component));
        });

        it('should display picker result items', async () => {
            await verifyPresent(pickerResultItems, 'formatted picker result items');
        });
    });

    describe('Formatted Picker Selection', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(formattedPicker.component);
            await click(pickerInput(formattedPicker.component));
            await clickPickerItemByLabel('Brian Kimball');
        });

        it('should update the value display after selecting Brian Kimball', async () => {
            await verifyTextIncludes(formattedPicker.value, '1', 'formatted picker value after selecting Brian Kimball');
        });
    });

    describe('Entity Picker Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(entityPicker.component);
            await click(pickerInput(entityPicker.component));
        });

        it('should display entity picker result items', async () => {
            await verifyPresent(entityPickerResultItems, 'entity picker result items');
        });
    });

    describe('Default Options Array Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(defaultArrayPicker.component);
            await click(pickerInput(defaultArrayPicker.component));
        });

        it('should display result items when opened with default options', async () => {
            await verifyPresent(pickerResultItems, 'default options picker result items');
        });
    });

    describe('Async Picker', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(asyncPicker.component);
            await sendKeys(pickerInput(asyncPicker.component), 'Item');
            await sleep(2000);
        });

        it('should display results after async load completes', async () => {
            await verifyPresent(pickerResultItems, 'async picker result items');
        });
    });
});
