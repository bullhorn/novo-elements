import { examplesUrl, URLS } from '../utils/EnvironmentUtil';
import { browser } from '@wdio/globals';
import { setFiltersFromAdvancedSearch } from './common/table.common.page';
import { automationId, elements, novoAdvancedSearchOperator } from '../utils/SelectorUtil';
import { sleep } from '../utils/SleepUtil';
import {
  verifyAbsent,
  verifyAllElementsTextIncludes,
  verifyClassPresent,
  verifyElementCountEquals,
  verifyFormValues,
  verifyPresent,
  verifyText,
} from '../utils/VerifyUtil';
import { getElementWithTextValue } from '../utils/GetElementUtil';
import { click, moveMouseToElement } from '../utils/ElementActionUtil';

describe('Query Builder Demo Page', () => {
  const url = examplesUrl('query builder');
  const sectionLabel = 'section .novo-label';
  const sectionLabelSpan = 'section novo-label span';
  const pageHeader1 = 'query-builder-examples-page h1';
  const pageHeader2 = 'query-builder-examples-page h2';
  const pageText = 'query-builder-examples-page p';
  const andOperator = automationId('and');
  const orOperator = automationId('or');
  const notOperator = automationId('not');

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(URLS.HOME);
  });

  describe('Basic Criteria builder', () => {
    const trueButtonActive = `button ${automationId('True')}${elements.buttonThemes.primary}`;
    const falseButtonActive = `button ${automationId('False')}${elements.buttonThemes.primary}`;
    const yesButtonActive = `button ${automationId("Yes")}${elements.buttonThemes.primary}`;
    const noButtonActive = `button ${automationId("No")}${elements.buttonThemes.primary}`;

    it('criteria builder elements', async () => {
      await Promise.all([
        await verifyText(pageHeader2, 'Just a basic Criteria Builder'),
        await verifyText(pageText, 'A common use case is to just collect a list of criteria to build as a query. A Criteria can contain multiple conditions which will need to be joined by a conjunctions (and/or).'),
        await verifyPresent('novo-condition-group'),
        await verifyText(elements.primaryButton, 'Add a group'),
        await verifyText(elements.secondaryButton, 'Reset'),
        await verifyText(elements.secondaryButton, 'Repopulate', 'Repopulate Button', 1),
        await verifyPresent('.novo-radio-group'),
      ]);
    });
    it('Join Operators', async () => {
      const joinOperator = '.novo-label.text-color-ash';
      const radioLabel = `${elements.radio} .novo-radio-button-label i`;
      const radioSelected = 'bhi-radio-filled';
      const operatorDropdown = automationId(elements.advancedSearch.button.andNotDropdown);
      await click(elements.radio);
      await verifyClassPresent(radioLabel, radioSelected);
      await verifyAllElementsTextIncludes(joinOperator, 'And');
      await click(elements.radio, 1);
      await verifyClassPresent(radioLabel, radioSelected, 'And, Or', 1);
      await click(operatorDropdown);
      await verifyText(andOperator, 'and');
      await verifyText(orOperator, 'or');
      await click(elements.radio, 2);
      await verifyClassPresent(radioLabel, radioSelected, 'And, Or, Not', 2);
      await click(operatorDropdown);
      await verifyText(andOperator, 'and');
      await verifyText(orOperator, 'or');
      await verifyText(notOperator, 'not');
    });
    it('should enable/disable additional scope', async () => {
      await verifyText(sectionLabel, 'Add Additional Scope', 'Add Additional Scope Section', 1);
      await moveMouseToElement(sectionLabelSpan, 0);
      await sleep(500);
      await verifyPresent('[tooltip="Adding an additional entity scope to the searchable fields will change the behavior when adding a new condition"]');
      await click(`${automationId('True')}`, 0);
      await verifyAbsent(elements.primaryButton, 'Add a group button should be disabled when additional scope is disabled');
      await verifyElementCountEquals(trueButtonActive, 2);
      await verifyElementCountEquals(falseButtonActive, 1);
      await click(`${automationId('False')}`, 0);
      await verifyElementCountEquals(trueButtonActive, 1);
      await verifyElementCountEquals(falseButtonActive, 2);
      await verifyPresent(elements.primaryButton, 'Add a group button should be enabled when additional scope is disabled');
    });
    it('should show/hide first operator', async () => {
      await verifyText(sectionLabel, 'Hide First Operator', 'Hide First Operator Section', 2);
      await moveMouseToElement(sectionLabelSpan, 2);
      await sleep(500);
      await verifyPresent('[tooltip="Disabling will display the AND/OR/NOT operator in the first row. Enabling (default) will hide it"]');
      await click(`button ${automationId('True')}`, 1);
      await verifyElementCountEquals(automationId(elements.advancedSearch.button.andNotDropdown), 4);
      await click(`button ${automationId('False')}`, 1);
      await verifyElementCountEquals(automationId(elements.advancedSearch.button.andNotDropdown), 5);
    })
    it('should toggle Can Be Empty', async () => {
      await verifyText(sectionLabel, 'Can Be Empty', 'Can Be Empty Section', 3);
      await moveMouseToElement(sectionLabelSpan, 4);
      await sleep(500);
      await verifyPresent('[tooltip="Enabling will allow you to delete a row if it is the only row in the criteria builder. Disabling (default) will keep the final row, and will instead clear it out"]');
      await click(`${automationId('True')}`, 2);
      await verifyElementCountEquals(trueButtonActive, 1);
      await verifyElementCountEquals(falseButtonActive, 2);
      await click(`${automationId('False')}`, 2);
      await verifyElementCountEquals(trueButtonActive, 0);
      await verifyElementCountEquals(falseButtonActive, 3);
    });
    it('should enable/disable Address Radius', async () => {
      let radiusUnits;
      await verifyText(sectionLabel, 'Address Radius', 'Address Radius  Section', 4);
      await moveMouseToElement(sectionLabelSpan, 6);
      await sleep(500);
      await verifyPresent('[tooltip="Enabling will add a radius option to the full address criteria operator dropdown"]');
      await click(`${automationId('Yes')}`);
      await verifyElementCountEquals(yesButtonActive, 1);
      await verifyElementCountEquals(noButtonActive, 0);
      radiusUnits = await getElementWithTextValue('novo-label', 'Units:');
      await expect(radiusUnits).toBeDisplayed();
      await click(`${automationId('No')}`);
      await verifyElementCountEquals(yesButtonActive, 0);
      await verifyElementCountEquals(noButtonActive, 1);
      radiusUnits = await getElementWithTextValue('novo-label', 'Units:');
      await expect(radiusUnits).not.toBeDisplayed();
    });
  });

  describe('Single Field Criteria Builder', async () => {
    it('single field criteria builder elements', async () => {
      await verifyText(pageHeader1, 'Single Field Criteria Builder');
      await verifyText(pageText, 'While the Criteria Builder can support multiple fields at once, its UI can also be configured to express a condition on a single field specified in via configuration input. This mode is more suitable for compact scenarios.', 'Single field criteria builder description', 2);
      await verifyPresent('single-field-criteria-example');
    });
  });

  describe('Full Query Builder', async () => {
    it('single field criteria builder elements', async () => {
      await verifyText(pageHeader2, 'Full Query Builder', 'Full Query Builder header',  1);
      await verifyText(pageText, 'The difference between the Query and Criteria Builder is that it allow for the user to define multiple criteria and join them as either inclusion or exclusion criteria. ie. Find where fruit.seeds >= 1 and not fruit.name=\'Avacodo\'', 'Single field criteria builder description', 4);
    });
  });

  describe('Filtering tests', () => {
    it('should apply status filter in query builder', async () => {
      await setFiltersFromAdvancedSearch([
        { field: 'status', operator: novoAdvancedSearchOperator.includeAny, value: 'Active' },
      ], true);
      await verifyFormValues([
        { field: 'status', value: 'Active' },
      ]);
    });
    it('should clear all fields and name filter in query builder', async () => {
      const resetButton = await getElementWithTextValue('button', 'Reset');
      await click(resetButton);
      await setFiltersFromAdvancedSearch([
        { field: 'name', operator: novoAdvancedSearchOperator.exclude, value: 'Test' },
      ], true);
      await verifyFormValues([
        { field: 'name', value: 'Test' },
      ]);
    });
  });
});
