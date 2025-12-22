import { failureMessage } from '../../utils/AutomationHelpers';
import { retry } from '../../utils/RetryUtil';
import { verifyPresent } from '../../utils/VerifyUtil';
import { automationId, elements } from '../../utils/SelectorUtil';
import { sleep } from '../../utils/SleepUtil';
import { getElementCount } from '../../utils/GetElementUtil';
import { getAllElementsText, isPresent } from '../../utils/ElementPropertiesUtil';
import { click } from '../../utils/ElementActionUtil';
import { waitForElementAbsenceOrXSeconds, waitForElementOrXMilliseconds } from '../../utils/WaitUtil';

const dateRegex: RegExp = /[\n\u202F\u00A0]/g;
const cellSelector = 'novo-data-table-cell.cdk-column-';
const maxVisibleRows = 50;

export async function sortArray(textArray): Promise<string[]> {
  const currencyRegex: RegExp = /(^\$|,|%)/g;
  return textArray.sort((a, b) => {
    if (a instanceof Date && b instanceof Date) {
      return Number(a) - Number(b);
    } else if (!isNaN(Number(a.toString().replace(currencyRegex, ''))) && !isNaN(Number(b.toString().replace(currencyRegex, ''))) && (Number(a.toString().replace(currencyRegex, '')) !== 0 && Number(b.toString().replace(currencyRegex, '')) !== 0)) {
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

export async function verifyColumnSorted(columnName: string, sortDirection: string, fieldName: string = null, errorMessage?: string): Promise<void> {
  const displayName = fieldName || 'Column';
  await retry(async () => {
    const error = errorMessage || `${displayName} ${columnName} was not sorted in ${sortDirection} direction.`;
    if (!await isColumnSorted(columnName, sortDirection)) {
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
    const isFiltered = Array.isArray(filterText) ? isListFilteredByMultipleValues(pageValues, filterText) : isListFiltered(pageValues, filterText);

    if (!isFiltered) {
      throw new Error(`Column ${columnName} is not properly filtered by: ${Array.isArray(filterText) ? filterText.join(', ') : filterText}`);
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
  const isNegativeCurrency = (item) => (/^[(]+[\d|.|,]*[)]+$/g.test(item));
  const convertNegativeCurrencyToNegativeNumber = (item) => `-${item.replace(/[(),]/g, '')}`;
  return filteredArray
    ? filteredArray.map(item =>
      isNegativeCurrency(item)
        ? convertNegativeCurrencyToNegativeNumber(item)
        : item)
    : [];
}

export async function filterTableColumn(
  columnName: string,
  filterData?: string | number,
  filterPartial: boolean = true
): Promise<string> {
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
  const textIsDate = (strDate) => (/[^\d]/g.test(strDate) && (strDate.includes('/') || /\d/g.test(strDate) && strDate.includes(':')) && Date.parse(strDate.replace(dateRegex, ' ')));
  const convertStrToMilliseconds = (strDate) => Date.parse(strDate.replace(dateRegex, ' '));
  return changeNegativeNumbersArray
    ? changeNegativeNumbersArray.map(item =>
      item === ''
        ? (textIsDate(item)
          ? convertStrToMilliseconds('1/1/1901')
          : item)
        : textIsDate(item)
          ? convertStrToMilliseconds(item)
          : item)
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

export async function getColumnHeaderSelector (columnName: string): Promise<string> {
  return `${automationId('novo-column-header-' + columnName)}`;
}
