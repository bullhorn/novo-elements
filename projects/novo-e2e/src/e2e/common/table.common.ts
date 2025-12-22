import { verifyPresent } from '../../utils/VerifyUtil';
import { automationId, elements } from '../../utils/SelectorUtil';
import { waitForElementToBeAbsent, waitForElementToBePresent } from '../../utils/WaitUtil';
import {
  clearFilter, filterTableColumn,
  getColumnHeaderSelector,
  sortTableColumn,
  verifyColumnFiltered,
  verifyColumnSorted,
} from './table.common.page';

export async function testElements(columns: string[]) {
  for (const column of columns) {
    it(`should have ${column} header`, async () => {
      const headerSelector = await getColumnHeaderSelector(column);
      await waitForElementToBePresent(headerSelector, 30000);
      await verifyPresent(headerSelector, `column header: ${column}`, 30000);
    });
  }
  for (const column of columns) {
    it(`should have ${column} sort`, async () => {
      const sortSelector = `${await getColumnHeaderSelector(column)} ${automationId('novo-data-table-sort')}`;
      await verifyPresent(sortSelector, `sort header: ${column}`);
    });
  }
  for (const column of columns) {
    it(`should have ${column} filter`, async () => {
      const filterSelector = `${await getColumnHeaderSelector(column)} ${elements.filter.filterIcon}`;
      await verifyPresent(filterSelector, `filter header: ${column}`);
    });
  }
}

export async function testFiltering(
  columns: string[],
  shouldClearFilters = true,
) {
  afterEach(async () => {
    if (shouldClearFilters) {
      await clearFilter();
    }
  });

  for (const column of columns) {
    it(`should filter ${column} column`, async () => {
      if (shouldClearFilters) {
        await clearFilter();
      }
      const filterText = await filterTableColumn(column, undefined);
      await verifyColumnFiltered(column, filterText);
    });
  }
}

export async function testSorting(columns: string[]) {
  for (const column of columns) {
    it(`should sort ${column} ascending`, async () => {
      await sortTableColumn(column);
      await waitForElementToBeAbsent(elements.loadingOverlay);
      await verifyColumnSorted(column, 'asc');
    });
    it(`should sort ${column} descending`, async () => {
      await sortTableColumn(column);
      await verifyColumnSorted(column, 'desc');
    });
  }
}
