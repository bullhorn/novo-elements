import { Collection } from './Collection';
export interface PagedCollection<T> extends Collection<T> {
    /**
     * The current page number that the paginated collection is "showing".
     */
    page: number;
    /**
     * The total number of pages in the paginated collection.
     */
    numberOfPages: number;
    /**
     * The page size to use when paginating the collection.
     */
    pageSize: number;
}
