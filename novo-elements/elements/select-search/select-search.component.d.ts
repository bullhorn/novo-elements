import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NovoOption } from 'novo-elements/elements/common';
import { NovoFieldElement } from 'novo-elements/elements/field';
import { NovoSelectElement } from 'novo-elements/elements/select';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import * as i0 from "@angular/core";
/**
 * Component providing an input field for searching NovoSelectElement options.
 *
 * Example usage:
 *
 * interface Bank {
 *  id: string;
 *  name: string;
 * }
 *
 * @Component({
 *   selector: 'my-app-data-selection',
 *   template: `
 *     <novo-form-field>
 *       <novo-select [formControl]="bankCtrl" placeholder="Bank">
 *         <novo-option>
 *           <ngx-novo-select-search [formControl]="bankFilterCtrl"></ngx-novo-select-search>
 *         </novo-option>
 *         <novo-option *ngFor="let bank of filteredBanks | async" [value]="bank.id">
 *           {{bank.name}}
 *         </novo-option>
 *       </novo-select>
 *     </novo-form-field>
 *   `
 * })
 * export class DataSelectionComponent implements OnInit, OnDestroy {
 *
 *   // control for the selected bank
 *   public bankCtrl: FormControl = new FormControl();
 *   // control for the NovoSelectElement filter keyword
 *   public bankFilterCtrl: FormControl = new FormControl();
 *
 *   // list of banks
 *   private banks: Bank[] = [{name: 'Bank A', id: 'A'}, {name: 'Bank B', id: 'B'}, {name: 'Bank C', id: 'C'}];
 *   // list of banks filtered by search keyword
 *   public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
 *
 *   // Subject that emits when the component has been destroyed.
 *   private _onDestroy = new Subject<void>();
 *
 *
 *   ngOnInit() {
 *     // load the initial bank list
 *     this.filteredBanks.next(this.banks.slice());
 *     // listen for search field value changes
 *     this.bankFilterCtrl.valueChanges
 *       .pipe(takeUntil(this._onDestroy))
 *       .subscribe(() => {
 *         this.filterBanks();
 *       });
 *   }
 *
 *   ngOnDestroy() {
 *     this._onDestroy.next();
 *     this._onDestroy.complete();
 *   }
 *
 *   private filterBanks() {
 *     if (!this.banks) {
 *       return;
 *     }
 *
 *     // get the search keyword
 *     let search = this.bankFilterCtrl.value;
 *     if (!search) {
 *       this.filteredBanks.next(this.banks.slice());
 *       return;
 *     } else {
 *       search = search.toLowerCase();
 *     }
 *
 *     // filter the banks
 *     this.filteredBanks.next(
 *       this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
 *     );
 *   }
 * }
 */
export declare class NovoSelectSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
    novoSelect: NovoSelectElement;
    changeDetectorRef: ChangeDetectorRef;
    private _viewportRuler;
    novoOption: NovoOption;
    private liveAnnouncer;
    matFormField: NovoFieldElement;
    name: string;
    /** Label of the search placeholder */
    placeholderLabel: string;
    /** Type of the search input field */
    type: string;
    /** Label to be shown when no entries are found. Set to null if no message should be shown. */
    noEntriesFoundLabel: string;
    /**
     *  Text that is appended to the currently active item label announced by screen readers,
     *  informing the user of the current index, value and total options.
     *  eg: Bank R (Germany) 1 of 6
     */
    indexAndLengthScreenReaderText: string;
    /**
     * Whether or not the search field should be cleared after the dropdown menu is closed.
     * Useful for server-side filtering.
     */
    clearSearchInput: boolean;
    /** Whether to show the search-in-progress indicator */
    searching: boolean;
    /** Disables initial focusing of the input field */
    disableInitialFocus: boolean;
    /** Enable clear input on escape pressed */
    enableClearOnEscapePressed: boolean;
    /** Allow user to uncheck a value while filtering. */
    allowDeselectDuringFilter: boolean;
    /**
     * Prevents home / end key being propagated to novo-select,
     * allowing to move the cursor within the search input instead of navigating the options
     */
    preventHomeEndKeyPropagation: boolean;
    /** Disables scrolling to active options when option list changes. Useful for server-side search */
    disableScrollToActiveOnOptionsChanged: boolean;
    /** Adds 508 screen reader support for search box */
    ariaLabel: string;
    /** Whether to show Select All Checkbox (for novo-select[multi=true]) */
    showToggleAllCheckbox: boolean;
    /** select all checkbox checked state */
    toggleAllCheckboxChecked: boolean;
    /** select all checkbox indeterminate state */
    toggleAllCheckboxIndeterminate: boolean;
    /** Display a message in a tooltip on the toggle-all checkbox */
    toggleAllCheckboxTooltipMessage: string;
    /** Define the position of the tooltip on the toggle-all checkbox. */
    toogleAllCheckboxTooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
    /** Show/Hide the search clear button of the search input */
    hideClearSearchButton: boolean;
    /**
     * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
     * Defaults to false, so selected options are only restored while filtering is active.
     */
    alwaysRestoreSelectedOptionsMulti: boolean;
    /** Output emitter to send to parent component with the toggle all boolean */
    toggleAll: EventEmitter<boolean>;
    /** Reference to the search input field */
    searchSelectInput: ElementRef;
    /** Reference to the search input field */
    innerSelectSearch: ElementRef;
    /** Reference to custom search input clear icon */
    clearIcon: NovoSelectSearchClearDirective;
    get isInsideNovoOption(): boolean;
    /** Current search value */
    get value(): string;
    private _lastExternalInputValue;
    onTouched: Function;
    _formControl: FormControl;
    /** Reference to the NovoSelectElement options */
    set _options(_options: QueryList<NovoOption>);
    get _options(): QueryList<NovoOption>;
    _options$: BehaviorSubject<QueryList<NovoOption>>;
    private _filterFinishedRerender;
    private optionsList$;
    private optionsLength$;
    /** Previously selected values when using <novo-select [multiple]="true">*/
    private previousSelectedValues;
    /** whether to show the no entries found message */
    _showNoEntriesFound$: Observable<boolean>;
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy;
    constructor(novoSelect: NovoSelectElement, changeDetectorRef: ChangeDetectorRef, _viewportRuler: ViewportRuler, novoOption: NovoOption, liveAnnouncer: LiveAnnouncer, matFormField?: NovoFieldElement);
    ngOnInit(): void;
    _emitSelectAllBooleanToParent(state: boolean): void;
    ngOnDestroy(): void;
    _isToggleAllCheckboxVisible(): boolean;
    /**
     * Handles the key down event with NovoSelectElement.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Handles the key up event with NovoSelectElement.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event: KeyboardEvent): void;
    /**
     * Calculate the index of the current option, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
     *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
     */
    getAriaIndex(optionIndex: number): number;
    /**
     * Calculate the length of the options, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
     *    Case 2 [1, 2, 3] will have length of options.length.
     */
    getAriaLength(): number;
    writeValue(value: string): void;
    onBlur(): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: Function): void;
    /**
     * Focuses the search input field
     */
    _focus(): void;
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus?: boolean): void;
    /**
     * Initializes handling <novo-select [multiple]="true">
     * Note: to improve this code, novo-select should be extended to allow disabling resetting the selection while filtering.
     */
    private initMultipleHandling;
    /**
     * Scrolls the currently active option into the view if it is not yet visible.
     */
    private adjustScrollTopToFitActiveOptionIntoView;
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth(): void;
    private getNovoOptionHeight;
    /**
     * Determine the offset to length that can be caused by the optional novoOption used as a search input.
     */
    private getOptionsLengthOffset;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSelectSearchComponent, [null, null, null, { optional: true; }, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSelectSearchComponent, "novo-select-search", never, { "name": { "alias": "name"; "required": false; }; "placeholderLabel": { "alias": "placeholderLabel"; "required": false; }; "type": { "alias": "type"; "required": false; }; "noEntriesFoundLabel": { "alias": "noEntriesFoundLabel"; "required": false; }; "indexAndLengthScreenReaderText": { "alias": "indexAndLengthScreenReaderText"; "required": false; }; "clearSearchInput": { "alias": "clearSearchInput"; "required": false; }; "searching": { "alias": "searching"; "required": false; }; "disableInitialFocus": { "alias": "disableInitialFocus"; "required": false; }; "enableClearOnEscapePressed": { "alias": "enableClearOnEscapePressed"; "required": false; }; "allowDeselectDuringFilter": { "alias": "allowDeselectDuringFilter"; "required": false; }; "preventHomeEndKeyPropagation": { "alias": "preventHomeEndKeyPropagation"; "required": false; }; "disableScrollToActiveOnOptionsChanged": { "alias": "disableScrollToActiveOnOptionsChanged"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "showToggleAllCheckbox": { "alias": "showToggleAllCheckbox"; "required": false; }; "toggleAllCheckboxChecked": { "alias": "toggleAllCheckboxChecked"; "required": false; }; "toggleAllCheckboxIndeterminate": { "alias": "toggleAllCheckboxIndeterminate"; "required": false; }; "toggleAllCheckboxTooltipMessage": { "alias": "toggleAllCheckboxTooltipMessage"; "required": false; }; "toogleAllCheckboxTooltipPosition": { "alias": "toogleAllCheckboxTooltipPosition"; "required": false; }; "hideClearSearchButton": { "alias": "hideClearSearchButton"; "required": false; }; "alwaysRestoreSelectedOptionsMulti": { "alias": "alwaysRestoreSelectedOptionsMulti"; "required": false; }; }, { "toggleAll": "toggleAll"; }, ["clearIcon"], ["[novoSelectSearchClear]", ".novo-select-search-custom-header-content"], false, never>;
}
