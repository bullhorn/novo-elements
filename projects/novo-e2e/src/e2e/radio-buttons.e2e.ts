import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, Classes } from '../utils/SelectorUtil';
import { verifyPresent, verifyClassPresent, verifyClassAbsent } from '../utils/VerifyUtil';
import {
    radioSelectors,
    basicRadio,
    basicRadioIcon,
    basicRadioLabel,
    buttonRadio,
    buttonRadioControl,
    buttonRadioLabel,
    iconRadio,
    iconRadioControl,
    iconRadioLabel,
    verticalRadioIcon,
    verticalRadioLabel,
} from '../utils/RadioButtonUtil';

describe('Radio Buttons Demo Page', () => {
    const url = formControlsUrl('radio-buttons');
    const radioInitialStates = [
        { value: 'one', label: 'one', iconClass: Classes.bhiRadioEmpty },
        { value: 'two', label: 'two', iconClass: Classes.bhiRadioFilled },
        { value: 'three', label: 'three', iconClass: Classes.bhiRadioEmpty },
    ];

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = ['basic-radio', 'button-radio', 'icon-radio', 'vertical-radio'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Basic Radio', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(radioSelectors.basicGroup);
        });

        it('should display the radio group', async () => {
            await verifyPresent(radioSelectors.basicGroup);
        });

        radioInitialStates.forEach(({ value, label, iconClass }) => {
            it(`should display ${label} radio with correct initial icon`, async () => {
                await verifyClassPresent(basicRadioIcon(value), iconClass, `${label} radio icon`);
            });
        });

        it('should have disabled class on radio-two label', async () => {
            await verifyClassPresent(basicRadioLabel('two'), Classes.disabled, 'radio-two label');
        });

        it('should not have disabled class on enabled radio labels', async () => {
            await verifyClassAbsent(basicRadioLabel('one'), Classes.disabled, 'radio-one label');
            await verifyClassAbsent(basicRadioLabel('three'), Classes.disabled, 'radio-three label');
        });

        it('should select radio-one on click', async () => {
            await click(basicRadio('one'));
            await verifyClassPresent(basicRadioIcon('one'), Classes.bhiRadioFilled, 'radio-one icon after click');
            await verifyClassAbsent(basicRadioIcon('one'), Classes.bhiRadioEmpty, 'radio-one icon after click');
        });
    });

    describe('Button Radio', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(radioSelectors.buttonGroup);
        });

        it('should display the button radio group', async () => {
            await verifyPresent(radioSelectors.buttonGroup);
        });

        const uncheckedButtons = ['one', 'two', 'three'];
        uncheckedButtons.forEach((value) => {
            it(`should have radio-${value} initially unchecked`, async () => {
                await verifyClassPresent(buttonRadioControl(value), Classes.radioButtonUnchecked, `button-${value} initial state`);
            });
        });

        const disabledButtons = ['disabled', 'also-disabled'];
        disabledButtons.forEach((value) => {
            it(`should have disabled class on radio-button-${value}`, async () => {
                await verifyClassPresent(buttonRadioLabel(value), Classes.disabled, `radio-button-${value} label`);
            });
        });

        it('should select radio-one on click', async () => {
            await click(buttonRadio('one'));
            await verifyClassPresent(buttonRadioControl('one'), Classes.radioButtonChecked, 'button-one after click');
            await verifyClassPresent(buttonRadioControl('two'), Classes.radioButtonUnchecked, 'button-two after click');
        });
    });

    describe('Icon Radio', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(radioSelectors.iconGroup);
        });

        it('should display the icon radio group', async () => {
            await verifyPresent(radioSelectors.iconGroup);
        });

        it('should display all icon radios', async () => {
            const iconRadios = ['company', 'job', 'candidate', 'opportunity', 'lead'];
            for (const icon of iconRadios) {
                await verifyPresent(iconRadio(icon), `${icon} icon radio`);
            }
        });

        it('should have disabled class on all disabled icon radios', async () => {
            const disabledIcons = ['opportunity', 'lead'];
            for (const icon of disabledIcons) {
                await verifyClassPresent(iconRadioLabel(icon), Classes.disabled, `${icon} icon radio label`);
            }
        });

        it('should have lead icon radio initially checked', async () => {
            await verifyClassPresent(iconRadioControl('lead'), Classes.radioButtonChecked, 'lead icon control');
        });
    });

    describe('Vertical Radio', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(radioSelectors.verticalGroup);
        });

        it('should display the vertical radio group', async () => {
            await verifyPresent(radioSelectors.verticalGroup);
        });

        radioInitialStates.forEach(({ value, label, iconClass }) => {
            it(`should display vertical ${label} radio with correct initial icon`, async () => {
                await verifyClassPresent(verticalRadioIcon(value), iconClass, `vertical ${label} radio icon`);
            });
        });

        it('should have disabled class on vertical-two label', async () => {
            await verifyClassPresent(verticalRadioLabel('two'), Classes.disabled, 'vertical-two label');
        });
    });
});
