Pagination [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/elements/components/pagination)
========================================================================================================

Pagination provides navigation between pages of content, and it highlights which page or items are currently being displayed. Typically the `novo-pagination` element provides the paged information when display tabular data.

### Use When

- (✓) A data table includes enough items to necessitate pagination.
- (✓) A page contains enough content to justify breaking it into smaller sections.


### Don′t Use When

- (x) Using lazy loading to load content as the user scrolls.


##### Usage

Each paginator instance requires:

The number of items per page (default set to 50)
The total number of items being paged
The current page index defaults to 1, but can be explicitly set via pageIndex.

When the user interacts with the `novo-pagination` element, a PageChangeEvent will be fired that can be used to update any associated data view.


<code-example example="pagination-usage"></code-example>

