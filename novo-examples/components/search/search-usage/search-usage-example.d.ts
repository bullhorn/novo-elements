import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @title Search Box Usage
 */
export declare class SearchUsageExample {
    test: string;
    geo: any;
    entity: string;
    searchResults: Subject<any[]>;
    searchData: any[];
    search(term: string): void;
    onSelectMatch(item: any): void;
    onSelectEntity(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchUsageExample, "search-usage-example", never, {}, {}, never, never, false, never>;
}
