import { click } from 'utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, URLS } from 'utils/EnvironmentUtil';
import { automationId, codeExample, elements } from 'utils/SelectorUtil';
import { verifyAbsent, verifyPresent, verifyText, verifyDisabled } from 'utils/VerifyUtil';

describe('Dropdown Demo Page', () => {
  const url = examplesUrl(COMPONENT_URLS.DROPDOWN);

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(URLS.HOME);
  });

  describe('Page Elements', () => {
    it('should display page title and examples', async () => {
      await verifyPresent(elements.title);
      await verifyText(elements.title, 'Dropdown', 'Dropdown example page title');
      await verifyPresent('dropdown-examples-page');
    });

    const dropdownTypes = ['basic', 'position', 'large', 'scrollable', 'custom', 'multi', 'scroll-to-item'];
    dropdownTypes.forEach((type) => {
      it(`should display example section - ${type}`, async () => {
        await verifyPresent(codeExample(`${type}-drop-down`));
      });
    });
  });

  describe('Dropdown Menu', () => {
    it('should open a dropdown with options and opt-group label', async () => {
      await click(automationId('basic-dropdown-actions-button'));
      await verifyPresent('.dropdown-container');
      await verifyPresent(automationId('opt-group-engage-label'));
      await verifyText(automationId('opt-group-engage-label'), 'Engage');
    });
    it('should close the dropdown when clicked again', async () => {
      await click(automationId('basic-dropdown-actions-button'));
      await verifyAbsent('.dropdown-container');
    });
    it('should have a disabled option', async () => {
      await click(automationId('basic-dropdown-actions-button'));
      await verifyDisabled(automationId('dropdown-disabled-option'));
    });
  });
});
