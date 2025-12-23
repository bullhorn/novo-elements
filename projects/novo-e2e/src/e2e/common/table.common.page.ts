import { asyncForEach, failureMessage } from '../../utils/AutomationHelpers';
import { retry } from '../../utils/RetryUtil';
import {
  automationId,
  checkBox,
  clearPickerButton,
  control,
  controlInput,
  ControlType,
  elements,
  frame,
  keyboardKeys,
  radioButton,
  selectInput,
  selectOption,
  switchControl,
  textAreaControl,
  tile,
} from '../../utils/SelectorUtil';
import { sleep } from '../../utils/SleepUtil';
import { getElement, getElementCount } from '../../utils/GetElementUtil';
import {
  getAllElementsText,
  getAttribute,
  getElementText,
  isPresent
} from '../../utils/ElementPropertiesUtil';
import { verifyPresent } from '../../utils/VerifyUtil';
import {
  clearInputAndSendKeys,
  click,
  clickIfPresent,
  sendKeys,
  sendKeysWithoutElement,
} from '../../utils/ElementActionUtil';
import {
  wait,
  waitForElementAbsenceOrXSeconds,
  waitForElementOrXMilliseconds,
  waitForElementToBeClickable,
} from '../../utils/WaitUtil';

const dateRegex: RegExp = /[\n\u202F\u00A0]/g;
const cellSelector = 'novo-data-table-cell.cdk-column-';
const maxVisibleRows = 50;

export type AllowedKey = string | number | boolean;
export type FormValue = AllowedKey | AllowedKey[] | { [key: string]: AllowedKey | AllowedKey[] };
export type FieldNamesToFormValues = { [key: string]: FormValue };
export type FormValues = FieldNamesToFormValues | FieldNamesToFormValues[];

export async function setFiltersFromAdvancedSearch(formValues: FieldNamesToFormValues[], appendSearch: boolean = false) {
  await adjustNumberOfAdvancedSearchCriteriaRows(formValues.length);
  await setFormValues(formValues, appendSearch);
  await clickIfPresent(elements.input);
  await sendKeysWithoutElement(keyboardKeys.escape);
}

export async function setFormValues(values: FormValues, appendText = false): Promise<void> {
  const formArray: FieldNamesToFormValues[] = Array.isArray(values) ? values : [values];
  await asyncForEach(formArray, async (form, index) => {
    return await asyncForEach(Object.keys(form), async (fieldName) => {
      const value = form[fieldName];
      // Support one-level deep nesting of objects - send over addresses as: 'secondaryAddress.city'
      if (isObject(value)) {
        return await asyncForEach(Object.keys(value), async (nestedField) => {
          return await setFormValue(`${fieldName}.${nestedField}`, value[nestedField], appendText, index);
        });
      }
      return await setFormValue(fieldName, value, appendText, index);
    });
  });

  // Introduce a small wait time after filling out all form values, just long enough to prepare novo for saving the form.
  await sleep(500);
}

async function setFormValue(fieldName: string, value: AllowedKey | AllowedKey[], appendText = false, index = 0): Promise<void> {
  const valueArray: AllowedKey[] = Array.isArray(value) ? value : [value];
  // Determine the element-specific index of the control on the screen in order to pass the index along to the specific set method
  const controlTypes = [];
  for (let i = 0; i <= index; i++) {
    const controlType = await getControlType(fieldName, i);
    controlTypes.push(controlType);
  }
  const currentControlType = controlTypes.pop();
  const controlSpecificTypes = controlTypes.filter((controlType) => controlType === currentControlType);
  const elementSpecificIndex = controlSpecificTypes.length;
  switch (currentControlType) {
    // case ControlType.aceEditor:
    // case ControlType.editor:
    // case ControlType.editorWithTemplate:
    // case ControlType.quickNote:
    //   // Embedded editors have their own iframe - switch to theirs, send keys then switch back
    //   if (appendText) {
    //     await sendKeys('body', value.toString());
    //   } else {
    //     await clearInputAndSendKeys('body', value.toString());
    //   }
    //   break;
    case ControlType.date:
    case ControlType.dateTime:
    case ControlType.picker:
    case ControlType.time:
      await asyncForEach(valueArray, async (key, i) => {
        await setPickerValue(fieldName, key, elementSpecificIndex, i === 0 && !appendText, currentControlType);
      });
      break;
    case ControlType.checkbox:
      await click(checkBox(fieldName));
      break;
    case ControlType.radio:
      await click(radioButton(fieldName, valueArray[0], false), elementSpecificIndex);
      break;
    case ControlType.select:
      await asyncForEach(valueArray, async (key) => {
        await setSelectValue(fieldName, key, elementSpecificIndex);
        await sendKeysWithoutElement(keyboardKeys.escape);
      });
      break;
    case ControlType.switch:
      const switchState = await getAttribute(switchControl(fieldName), 'aria-checked');
      if (valueArray[0].toString() !== switchState) {
        await click(`${switchControl(fieldName)} div.novo-switch-container`);
      }
      break;
    case ControlType.textarea:
      await sendFormValueKeys(textAreaControl(fieldName), value, appendText, elementSpecificIndex);
      break;
    case ControlType.tiles:
      await click(tile(fieldName, valueArray[0]), elementSpecificIndex);
      break;
    case ControlType.chipList:
      const keyArrayForTextInput = appendText ? valueArray : [keyboardKeys.clear, ...valueArray];
      const revisedKeyArray = keyArrayForTextInput.flatMap((entry, i) => {
        if (i === 0 && !appendText) {
          return entry;
        }
        return [entry, keyboardKeys.enter];
      });
      await sendKeysWithKeyboardKeys(controlInput(fieldName), revisedKeyArray, elementSpecificIndex);
      break;
    default:
      // Default for all fields that accept text entry
      await sendFormValueKeys(controlInput(fieldName), value, appendText, elementSpecificIndex);
      break;
  }

  // Introduce a small wait time after filling out form value, just long enough for field interactions
  // to fire, which happen after a 300 millisecond timeout.
  await sleep(300);
}

// Ensures that the advanced search criteria has the same number of rows as the form data we wish to set in it so that setFormValues works
async function adjustNumberOfAdvancedSearchCriteriaRows(requestedRowCount: number) {
  const existingRowCount = await getElementCount(elements.advancedSearch.button.clearSingleCondition);
  if (requestedRowCount < existingRowCount) {
    for (let i = 0; i < (requestedRowCount - existingRowCount); i++) {
      await click(elements.advancedSearch.button.clearSingleCondition);
    }
  } else if (requestedRowCount > existingRowCount) {
    if (await clickIfPresent(elements.advancedSearch.button.addFilter)) {
      await click(elements.advancedSearch.button.filterOption);
    } else {
      await click(elements.advancedSearch.button.addCondition);
    }
  }
}

async function sendFormValueKeys(selector: string, keyValues: AllowedKey | AllowedKey[], appendText: boolean, index): Promise<void> {
  if (Array.isArray(keyValues)) {
    const keysFromAllowedKey: string[] = keyValues.map((keyValue) => {
      return keyValue.toString();
    });
    const keysToSend: string[] = appendText ? keysFromAllowedKey : [keyboardKeys.clear, ...keysFromAllowedKey];
    await sendKeysWithKeyboardKeys(selector, keysToSend, index);
  } else {
    if (appendText) {
      await sendKeys(selector, keyValues.toString(), index);
    } else {
      await clearInputAndSendKeys(selector, keyValues.toString(), index);
    }
  }
}

export async function sendKeysWithKeyboardKeys(selector: string, value: AllowedKey | AllowedKey[], index: number = 0): Promise<void> {
  const keysToSend: any[] = Array.isArray(value) ? value : [value];
  const convKeysToSend = keysToSend.map((key) => {
    return key.toString();
  });
  const elem = await getElement(selector, index);
  await browser.action('pointer').move({origin: elem}).down().up().perform();
  await browser.keys(convKeysToSend);
}

export async function getControlType(fieldName: string, index: number = 0): Promise<ControlType> {
  return retry(
    async () => {
      // If the field is an address block, then get the type of that field
      const el: WebdriverIO.Element = (await isPresent(control(fieldName), index))
        ? await getElement(control(fieldName), index)
        : await getElement(control(fieldName.split('.')[0]), index);

      // Allow for overrides coming from novo when necessary
      const override = (await el.getAttribute('data-control-type-override')) as ControlType;
      // // Handle address subfields by converting them to the appropriate input type
      // if (controlType === ControlType.address && fieldName.includes('.')) {
      //   const addressSubField = fieldName.split('.')[1];
      //   if (getAddressPickerFieldOrNull(addressSubField)) {
      //     controlType = ControlType.picker;
      //   }
      // }

      return override || ((await el.getAttribute('data-control-type')) as ControlType);
    },
    async () => {
      failureMessage(`Cannot locate the ${fieldName} form control`);
    },
  );
}

export async function setPickerValue(fieldName: string, value: string = '', index = 0, clearFirst = true, controlType?: ControlType): Promise<void> {
  // Explicit null value (provided by caller) will leave the field empty without any text entry
  if (value === null) {
    await clickIfPresent(clearPickerButton(fieldName), index);
    await getElement(controlInput(fieldName));
    return;
  }

  await enterPickerIfValueNotNull(clearFirst, fieldName, value, index);
  const pickerOptionWasPresentAndClicked =
    await clickIfPresent(`${frame.overlay} ${automationId(value)}`);

  if (!pickerOptionWasPresentAndClicked) {
    if (controlType === ControlType.picker) {
      // Handle occasional case where picker does not show results the first time a value is entered
      await reenterPickerValueIfNoOptions(fieldName, value, index);

      try {
        await waitForSpecificOptionToBeFirst(value);
        await click(`${frame.overlay} ${elements.picker.item}`);
      } catch (errorFromWaitingForSpecificOption) {
        // If specific picker option is not in results after timeout, proceed with the first option
        console.log(errorFromWaitingForSpecificOption);
        await click(`${frame.overlay} ${elements.picker.item}`);
      }
    }

    // Hit enter if picker dropdown overlay is still present
    await waitForElementAbsenceOrXSeconds(frame.overlay, 13000);
    if (await isPresent(frame.overlay)) {
      await sendKeysWithoutElement(keyboardKeys.enter);
    }
  }

  // Attempt to close the picker dropdown overlay if it's still open
  if (await isPresent(frame.overlay)) {
    await sendKeysWithoutElement(keyboardKeys.escape);
  }
}

async function waitForSpecificOptionToBeFirst(value: string): Promise<void> {
  await wait(async () => {
    console.log(`Waiting for ${value} to be the first option in the picker`);
    const firstOptionText: string =
      await getElementText(`${frame.overlay} ${elements.picker.item} ${elements.picker.itemTitle},.list-item`);
    const pickerOptionsCount: number = await getElementCount(`${frame.overlay} ${elements.picker.item}`);
    if (firstOptionText.includes(value) || pickerOptionsCount === 1) {
      return true;
    }
  }, 15000, `The picker item for ${value} was never in the dropdown, picking first option`);
}

export async function enterPickerIfValueNotNull(clearFirst: boolean, fieldName: string, value: string, index: number): Promise<void> {
  if (clearFirst) {
    await clearInputAndSendKeys(controlInput(fieldName), value, index);
  } else {
    await sendKeys(controlInput(fieldName), value, index);
  }

  await sleep();
  await waitForElementAbsenceOrXSeconds(`${frame.overlay} ${frame.loading}`, 8000);
}

export async function setSelectValue(fieldName: string, value: string | number = '', index = 0): Promise<void> {
  return retry(async () => {
    await click(selectInput(fieldName, false), index);
    await click(selectOption(value));
  }, async () => {
    failureMessage(`Cannot set ${fieldName} select value: '${value}'`);
  });
}

async function reenterPickerValueIfNoOptions(fieldName: string, value: string, index: number): Promise<void> {
  await retry(async () => {
    await waitForElementToBeClickable(`${frame.overlay} ${elements.picker.item}`, 30000);
  }, async () => {
    await clickIfPresent(clearPickerButton(fieldName), index);
    await clearInputAndSendKeys(controlInput(fieldName), value, index);
  }, 2);
}

export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export async function sortArray(textArray): Promise<string[]> {
  const currencyRegex: RegExp = /(^\$|,|%)/g;
  return textArray.sort((a, b) => {
    if (a instanceof Date && b instanceof Date) {
      return Number(a) - Number(b);
    } else if (
      !isNaN(Number(a.toString().replace(currencyRegex, ''))) &&
      !isNaN(Number(b.toString().replace(currencyRegex, ''))) &&
      Number(a.toString().replace(currencyRegex, '')) !== 0 &&
      Number(b.toString().replace(currencyRegex, '')) !== 0
    ) {
      return Number(a.toString().replace(currencyRegex, '')) - Number(b.toString().replace(currencyRegex, ''));
    } else if (a.toString().toLocaleLowerCase() < b.toString().toLocaleLowerCase()) {
      return -1;
    } else if (a.toString().toLocaleLowerCase() === b.toString().toLocaleLowerCase()) {
      return 0;
    }
    return 1;
  });
}

export async function isListSorted(inputArray: Array<any>, sortDirection: string): Promise<boolean> {
  /*
   checks if string contains ONLY numbers OR is empty to avoid catching IDs
   checks if string contains / or : to avoid catching strings with numbers in them, eg. 'Email Test 2'
   checks if string contains a number to avoid catching regular strings, eg. 'Novo Auto'
   checks if input contains dates and empty strings or strings and empty strings
   */
  const filteredArray = inputArray.filter((item) => isNaN(item) && item !== '' && !item.includes('null'));
  const changeNegativeNumbersArray = await negativeCurrencyToNegativeNumber(filteredArray);
  const validateArray = await handleDatesAndEmptyDates(changeNegativeNumbersArray);

  const originalList = validateArray.slice();
  const sortedArray = await sortArray(validateArray);

  if (sortDirection.includes('asc')) {
    return JSON.stringify(originalList).toLocaleLowerCase() === JSON.stringify(sortedArray).toLocaleLowerCase();
  }
  const sortedArrayReversed = sortedArray.reverse();
  return JSON.stringify(originalList).toLocaleLowerCase() === JSON.stringify(sortedArrayReversed).toLocaleLowerCase();
}

export async function isColumnSorted(columnName: string, sortDirection: string): Promise<boolean> {
  const textArray = await getAllColumnText(columnName);

  if (textArray.length === 0) {
    failureMessage(`Get all column text returned with: ${textArray.length}. Make sure Column is there.`);
    return false;
  }

  return isListSorted(textArray, sortDirection);
}

export async function verifyColumnSorted(
  columnName: string,
  sortDirection: string,
  fieldName: string = null,
  errorMessage?: string,
): Promise<void> {
  const displayName = fieldName || 'Column';
  await retry(async () => {
    const error = errorMessage || `${displayName} ${columnName} was not sorted in ${sortDirection} direction.`;
    if (!(await isColumnSorted(columnName, sortDirection))) {
      throw new Error(error);
    }
  });
}

export async function sortTableColumn(column, sortOrder?: 'asc' | 'desc'): Promise<void> {
  await click(await getColumnSort(column));
  if (sortOrder && sortOrder === 'desc') { // In the event we want to sort from descending first, this will allow us to immediately go there without calling the whole sort method twice
    await waitForTableToRefresh();
    await click(await getColumnSort(column));
  }
  await waitForTableToRefresh();
}

export async function verifyColumnFiltered(columnName: string, filterText?: string | string[]): Promise<void> {
  await verifyPresent(elements.filter.activeFilter, `Active filter badge for ${columnName}`);

  if (filterText) {
    await sleep(1000);
    const allCells = await $$(`${cellSelector}${columnName}`);
    const visibleValues: string[] = [];
    for (const cell of allCells) {
      const isDisplayed = await cell.isDisplayed();
      if (isDisplayed) {
        const text = await cell.getText();
        visibleValues.push(text);
      }
    }

    const pageValues = visibleValues.slice(0, maxVisibleRows);
    const isFiltered = Array.isArray(filterText)
      ? isListFilteredByMultipleValues(pageValues, filterText)
      : isListFiltered(pageValues, filterText);

    if (!isFiltered) {
      throw new Error(
        `Column ${columnName} is not properly filtered by: ${Array.isArray(filterText) ? filterText.join(', ') : filterText}`,
      );
    }
  }
}

export async function clearFilter(): Promise<void> {
  const activeFilterCount = await getElementCount(elements.filter.activeFilter);

  if (activeFilterCount > 0) {
    const clearButtonIsPresent: boolean = await isPresent(elements.filter.clearFilterButton);

    if (clearButtonIsPresent) {
      await click(elements.filter.clearFilterButton);
    } else {
      await click(elements.filter.activeFilter);
      const clearButton = elements.filter.clearFilterButton;
      await click(clearButton);
    }
    await waitForTableToRefresh();
  } else {
    console.log('column is not filtered');
  }
}

export async function negativeCurrencyToNegativeNumber(filteredArray): Promise<Array<any>> {
  const isNegativeCurrency = (item) => /^[(]+[\d|.|,]*[)]+$/g.test(item);
  const convertNegativeCurrencyToNegativeNumber = (item) => `-${item.replace(/[(),]/g, '')}`;
  return filteredArray
    ? filteredArray.map((item) => (isNegativeCurrency(item) ? convertNegativeCurrencyToNegativeNumber(item) : item))
    : [];
}

export async function filterTableColumn(columnName: string, filterData?: string | number, filterPartial: boolean = true): Promise<string> {
  const dropdownContainerInput = '.dropdown-container input';
  const filterButton = `${await getColumnHeaderSelector(columnName)} ${elements.filter.filterIcon}`;
  const getDropdownContainerSelect = (value: string) => `.dropdown-container [data-automation-value="${value}"]`;
  await click(filterButton);

  const isTextFilter: boolean = await isPresent(dropdownContainerInput);
  let filterText: string;

  if (isTextFilter) {
    if (filterData) {
      filterText = String(filterData);
    } else {
      const cells = await $$(`${cellSelector}${columnName}`);
      if ((await cells.length) < 5) {
        throw new Error(`Expected at least 5 cells in column ${columnName}, got ${cells.length}`);
      }
      filterText = await cells[4].getText();

      if (filterPartial && filterText.length > 3) {
        filterText = filterText.substring(0, 3);
      }
    }

    if (filterPartial) {
      await $(dropdownContainerInput).setValue(filterText);
    } else {
      await $(dropdownContainerInput).clearValue();
      await $(dropdownContainerInput).setValue(filterText);
    }

    await browser.keys(['Enter']);
  } else {
    filterText = filterData ? String(filterData) : 'option1';
    const selectOption = getDropdownContainerSelect(filterText);
    await click(selectOption);
  }

  await waitForTableToRefresh();
  return filterText;
}

export async function getAllColumnText(columnName): Promise<string[]> {
  let columnTextArray: string[];
  await retry(async () => {
    columnTextArray = await getAllElementsText(`${cellSelector}${columnName}`);
  });
  return columnTextArray.slice(0, maxVisibleRows).map((text: string) => {
    if (text.includes('#')) {
      return text.replace(/^(.*?)\|/g, ''); // if the column returns a concatenated display, strips the appended id (eg. #1234 | Job Title)
    } else if (dateRegex.test(text)) {
      return text.replace(dateRegex, ' ');
    }
    return text.trim();
  });
}

export async function handleDatesAndEmptyDates(changeNegativeNumbersArray): Promise<Array<any>> {
  const textIsDate = (strDate) =>
    /[^\d]/g.test(strDate) &&
    (strDate.includes('/') || (/\d/g.test(strDate) && strDate.includes(':'))) &&
    Date.parse(strDate.replace(dateRegex, ' '));
  const convertStrToMilliseconds = (strDate) => Date.parse(strDate.replace(dateRegex, ' '));
  return changeNegativeNumbersArray
    ? changeNegativeNumbersArray.map((item) =>
        item === ''
          ? textIsDate(item)
            ? convertStrToMilliseconds('1/1/1901')
            : item
          : textIsDate(item)
            ? convertStrToMilliseconds(item)
            : item,
      )
    : [];
}

export async function waitForTableToRefresh(maxWaitTime: number = 5000) {
  await waitForElementOrXMilliseconds(elements.loadingOverlay, maxWaitTime);
  await waitForElementAbsenceOrXSeconds(elements.loadingOverlay, 8000);
}

export function isListFiltered(values: string[], filterText: string): boolean {
  const filter = filterText.toLowerCase();
  return values.every((value) => value.trim().toLowerCase().includes(filter));
}

export function isListFilteredByMultipleValues(values: string[], filterTexts: string[]): boolean {
  return values.every((value) => filterTexts.some((filter) => value.trim().toLowerCase().includes(filter.trim().toLowerCase())));
}

export async function getColumnSort(column): Promise<string> {
  return `${await tableColumnHeader(column)} ${automationId('novo-data-table-sort')}`;
}

export async function tableColumnHeader(column): Promise<string> {
  return `${automationId('novo-column-header-' + column)}`;
}

export async function getColumnHeaderSelector(columnName: string): Promise<string> {
  return `${automationId('novo-column-header-' + columnName)}`;
}
