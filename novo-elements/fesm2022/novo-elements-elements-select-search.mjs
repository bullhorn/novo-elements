import * as i0 from '@angular/core';
import { Directive, EventEmitter, ElementRef, forwardRef, HostBinding, ContentChild, ViewChild, Output, Input, Inject, Optional, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/cdk/a11y';
import * as i1 from '@angular/cdk/scrolling';
import * as i4 from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { debounceTime, switchMap, map, startWith, distinctUntilChanged, delay, takeUntil, take, filter, tap } from 'rxjs/operators';
import { isAlphaNumeric, BooleanInput } from 'novo-elements/utils';
import * as i7 from 'novo-elements/elements/common';
import { _countGroupLabelsBeforeOption, NovoOption, NovoCommonModule } from 'novo-elements/elements/common';
import * as i11 from 'novo-elements/elements/field';
import { NovoFieldElement, NovoFieldModule } from 'novo-elements/elements/field';
import * as i12 from 'novo-elements/elements/select';
import { NovoSelectElement } from 'novo-elements/elements/select';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'novo-elements/elements/checkbox';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import * as i6 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i8 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i9 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i10 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';

/**
 * Directive for providing a custom clear-icon.
 * e.g.
 * <novo-select-search [formControl]="bankFilterCtrl">
 *   <novo-icon novoSelectSearchClear>x</novo-icon>
 * </novo-select-search>
 */
class NovoSelectSearchClearDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchClearDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoSelectSearchClearDirective, isStandalone: false, selector: "[novoSelectSearchClear]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchClearDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSelectSearchClear]',
                    standalone: false
                }]
        }] });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** The max height of the select's overlay panel. */
const SELECT_PANEL_MAX_HEIGHT = 256;
let autoIncrement = 1;
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
class NovoSelectSearchComponent {
    get isInsideNovoOption() {
        return !!this.novoOption;
    }
    /** Current search value */
    get value() {
        return this._formControl.value;
    }
    /** Reference to the NovoSelectElement options */
    set _options(_options) {
        this._options$.next(_options);
    }
    get _options() {
        return this._options$.getValue();
    }
    constructor(novoSelect, changeDetectorRef, _viewportRuler, novoOption = null, liveAnnouncer, matFormField = null) {
        this.novoSelect = novoSelect;
        this.changeDetectorRef = changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this.novoOption = novoOption;
        this.liveAnnouncer = liveAnnouncer;
        this.matFormField = matFormField;
        this.name = 'select-search-' + autoIncrement++;
        /** Label of the search placeholder */
        this.placeholderLabel = 'Search';
        /** Type of the search input field */
        this.type = 'text';
        /** Label to be shown when no entries are found. Set to null if no message should be shown. */
        this.noEntriesFoundLabel = 'No Records Found';
        /**
         *  Text that is appended to the currently active item label announced by screen readers,
         *  informing the user of the current index, value and total options.
         *  eg: Bank R (Germany) 1 of 6
         */
        this.indexAndLengthScreenReaderText = ' of ';
        /**
         * Whether or not the search field should be cleared after the dropdown menu is closed.
         * Useful for server-side filtering.
         */
        this.clearSearchInput = true;
        /** Whether to show the search-in-progress indicator */
        this.searching = false;
        /** Disables initial focusing of the input field */
        this.disableInitialFocus = false;
        /** Enable clear input on escape pressed */
        this.enableClearOnEscapePressed = false;
        /** Allow user to uncheck a value while filtering. */
        this.allowDeselectDuringFilter = false;
        /**
         * Prevents home / end key being propagated to novo-select,
         * allowing to move the cursor within the search input instead of navigating the options
         */
        this.preventHomeEndKeyPropagation = false;
        /** Disables scrolling to active options when option list changes. Useful for server-side search */
        this.disableScrollToActiveOnOptionsChanged = false;
        /** Adds 508 screen reader support for search box */
        this.ariaLabel = 'dropdown search';
        /** Whether to show Select All Checkbox (for novo-select[multi=true]) */
        this.showToggleAllCheckbox = false;
        /** select all checkbox checked state */
        this.toggleAllCheckboxChecked = false;
        /** select all checkbox indeterminate state */
        this.toggleAllCheckboxIndeterminate = false;
        /** Display a message in a tooltip on the toggle-all checkbox */
        this.toggleAllCheckboxTooltipMessage = '';
        /** Define the position of the tooltip on the toggle-all checkbox. */
        this.toogleAllCheckboxTooltipPosition = 'below';
        /** Show/Hide the search clear button of the search input */
        this.hideClearSearchButton = false;
        /**
         * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
         * Defaults to false, so selected options are only restored while filtering is active.
         */
        this.alwaysRestoreSelectedOptionsMulti = false;
        /** Output emitter to send to parent component with the toggle all boolean */
        this.toggleAll = new EventEmitter();
        this.onTouched = (_) => { };
        this._formControl = new FormControl('');
        this._options$ = new BehaviorSubject(null);
        this._filterFinishedRerender = this._formControl.valueChanges.pipe(debounceTime(1));
        this.optionsList$ = this._options$.pipe(switchMap((_options) => _options
            ? combineLatest([_options.changes, this._filterFinishedRerender]).pipe(map(([options,]) => options.toArray().filter(option => !(option._getHostElement()?.classList.contains('add-option') || option._getHostElement().hidden))), startWith(_options.toArray()), distinctUntilChanged((optsA, optsB) => optsA.map(opt => opt.value).join(',') === optsB.map(opt => opt.value).join(',')))
            : of(null)));
        this.optionsLength$ = this.optionsList$.pipe(map((options) => (options ? options.length : 0)));
        /** whether to show the no entries found message */
        this._showNoEntriesFound$ = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(map(([value, optionsLength]) => this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset()));
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
        this.novoSelect.hideLegacyOptionsForSearch.set(true);
    }
    ngOnInit() {
        // set custom novo-option class if the component was placed inside a novo-option
        if (this.novoOption) {
            this.novoOption.novoInert = true;
            this.novoOption._getHostElement().classList.add('contains-novo-select-search');
        }
        else {
            console.error('<novo-select-search> must be placed inside a <novo-option> element');
        }
        // when the select dropdown panel is opened or closed
        this.novoSelect.openedChange.pipe(delay(1), takeUntil(this._onDestroy)).subscribe((opened) => {
            if (opened) {
                this.updateInputWidth();
                // focus the search field when opening
                if (!this.disableInitialFocus) {
                    this._focus();
                }
            }
            else {
                // clear it when closing
                if (this.clearSearchInput) {
                    this._reset();
                }
            }
        });
        // set the first item active after the options changed
        this.novoSelect.openedChange
            .pipe(take(1))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
            if (this.novoSelect._keyManager) {
                this.novoSelect._keyManager.change
                    .pipe(takeUntil(this._onDestroy))
                    .subscribe(() => this.adjustScrollTopToFitActiveOptionIntoView());
            }
            else {
                console.warn('_keyManager was not initialized.');
            }
            this._options = this.novoSelect.contentOptions;
            // Closure variable for tracking the most recent first option.
            // In order to avoid avoid causing the list to
            // scroll to the top when options are added to the bottom of
            // the list (eg: infinite scroll), we compare only
            // the changes to the first options to determine if we
            // should set the first item as active.
            // This prevents unnecessary scrolling to the top of the list
            // when options are appended, but allows the first item
            // in the list to be set as active by default when there
            // is no active selection
            let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
            this._options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                // avoid "expression has been changed" error
                setTimeout(() => {
                    // Convert the QueryList to an array
                    const options = this._options.toArray();
                    // The true first item is offset by 1
                    const currentFirstOption = options[this.getOptionsLengthOffset()];
                    const keyManager = this.novoSelect._keyManager;
                    if (keyManager && this.novoSelect.panelOpen) {
                        // set first item active and input width
                        // Check to see if the first option in these changes is different from the previous.
                        const firstOptionIsChanged = !this.novoSelect.compareWith(previousFirstOption, currentFirstOption);
                        // CASE: The first option is different now.
                        // Indiciates we should set it as active and scroll to the top.
                        if (firstOptionIsChanged ||
                            !keyManager.activeItem ||
                            !options.find((option) => this.novoSelect.compareWith(option, keyManager.activeItem))) {
                            keyManager.setFirstItemActive();
                        }
                        // wait for panel width changes
                        setTimeout(() => {
                            this.updateInputWidth();
                        });
                        if (!this.disableScrollToActiveOnOptionsChanged) {
                            this.adjustScrollTopToFitActiveOptionIntoView();
                        }
                    }
                    // Update our reference
                    previousFirstOption = currentFirstOption;
                });
            });
        });
        // add or remove css class depending on whether to show the no entries found message
        // note: this is hacky
        this._showNoEntriesFound$.pipe(takeUntil(this._onDestroy)).subscribe((showNoEntriesFound) => {
            // set no entries found class on mat option
            if (this.novoOption) {
                if (showNoEntriesFound) {
                    this.novoOption._getHostElement().classList.add('novo-select-search-no-entries-found');
                }
                else {
                    this.novoOption._getHostElement().classList.remove('novo-select-search-no-entries-found');
                }
            }
        });
        // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
        this._viewportRuler
            .change()
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
            if (this.novoSelect.panelOpen) {
                this.updateInputWidth();
            }
        });
        if (!this.allowDeselectDuringFilter) {
            this.initMultipleHandling();
        }
        this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            // update view when available options change
            this.changeDetectorRef.markForCheck();
        });
    }
    _emitSelectAllBooleanToParent(state) {
        this.toggleAll.emit(state);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    _isToggleAllCheckboxVisible() {
        return this.novoSelect.multiple && this.showToggleAllCheckbox;
    }
    /**
     * Handles the key down event with NovoSelectElement.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event) {
        // Prevent propagation for all alphanumeric characters in order to avoid selection issues
        if ((event.key && event.key.length === 1) ||
            isAlphaNumeric(event.key) ||
            event.key === " " /* Key.Space */ ||
            (this.preventHomeEndKeyPropagation && (event.key === "Home" /* Key.Home */ || event.key === "End" /* Key.End */))) {
            event.stopPropagation();
        }
        if (this.novoSelect.multiple && event.key && event.key === "Enter" /* Key.Enter */) {
            // Regain focus after multiselect, so we can further type
            setTimeout(() => this._focus());
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.key === "Escape" /* Key.Escape */ && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    }
    /**
     * Handles the key up event with NovoSelectElement.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event) {
        if (event.key === "ArrowUp" /* Key.ArrowUp */ || event.key === "ArrowDown" /* Key.ArrowDown */) {
            const ariaActiveDescendantId = this.novoSelect._getAriaActiveDescendant();
            const index = this._options.toArray().findIndex((item) => item.id === ariaActiveDescendantId);
            if (index !== -1) {
                const activeDescendant = this._options.toArray()[index];
                this.liveAnnouncer.announce(activeDescendant.viewValue + ' ' + this.getAriaIndex(index) + this.indexAndLengthScreenReaderText + this.getAriaLength());
            }
        }
    }
    /**
     * Calculate the index of the current option, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
     *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
     */
    getAriaIndex(optionIndex) {
        if (this.getOptionsLengthOffset() === 0) {
            return optionIndex + 1;
        }
        return optionIndex;
    }
    /**
     * Calculate the length of the options, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
     *    Case 2 [1, 2, 3] will have length of options.length.
     */
    getAriaLength() {
        return this._options.toArray().length - this.getOptionsLengthOffset();
    }
    writeValue(value) {
        this._lastExternalInputValue = value;
        this._formControl.setValue(value);
        this.changeDetectorRef.markForCheck();
    }
    onBlur() {
        this.onTouched();
    }
    registerOnChange(fn) {
        this._formControl.valueChanges
            .pipe(filter((value) => value !== this._lastExternalInputValue), tap(() => (this._lastExternalInputValue = undefined)), takeUntil(this._onDestroy))
            .subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Focuses the search input field
     */
    _focus() {
        if (!this.searchSelectInput || !this.novoSelect.panel) {
            return;
        }
        // save and restore scrollTop of panel, since it will be reset by focus()
        // note: this is hacky
        const panel = this.novoSelect.panel.nativeElement;
        const scrollTop = panel.scrollTop;
        // focus
        this.searchSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    }
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus) {
        this._formControl.setValue('');
        if (focus) {
            this._focus();
        }
    }
    /**
     * Initializes handling <novo-select [multiple]="true">
     * Note: to improve this code, novo-select should be extended to allow disabling resetting the selection while filtering.
     */
    initMultipleHandling() {
        if (!this.novoSelect.ngControl) {
            if (this.novoSelect.multiple) {
                // note: the access to novoSelect.ngControl (instead of novoSelect.value / novoSelect.valueChanges)
                // is necessary to properly work in multi-selection mode.
                console.error('the novo-select containing novo-select-search must have a ngModel or formControl directive when multiple=true');
            }
            return;
        }
        // if <novo-select [multiple]="true">
        // store previously selected values and restore them when they are deselected
        // because the option is not available while we are currently filtering
        this.previousSelectedValues = this.novoSelect.ngControl.value;
        this.novoSelect.ngControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((values) => {
            let restoreSelectedValues = false;
            if (this.novoSelect.multiple) {
                if ((this.alwaysRestoreSelectedOptionsMulti || (this._formControl.value && this._formControl.value.length)) &&
                    this.previousSelectedValues &&
                    Array.isArray(this.previousSelectedValues)) {
                    if (!values || !Array.isArray(values)) {
                        values = [];
                    }
                    const optionValues = (this.novoSelect.options || []).map((option) => option.value);
                    this.previousSelectedValues.forEach((previousValue) => {
                        if (!values.some((v) => this.novoSelect.compareWith(v, previousValue)) &&
                            !optionValues.some((v) => this.novoSelect.compareWith(v, previousValue))) {
                            // if a value that was selected before is deselected and not found in the options, it was deselected
                            // due to the filtering, so we restore it.
                            values.push(previousValue);
                            restoreSelectedValues = true;
                        }
                    });
                }
            }
            this.previousSelectedValues = values;
            if (restoreSelectedValues) {
                // TODO: Fix this
                // this.novoSelect._onChange(values);
            }
        });
    }
    /**
     * Scrolls the currently active option into the view if it is not yet visible.
     */
    adjustScrollTopToFitActiveOptionIntoView() {
        if (this.novoSelect.panel && this.novoSelect.contentOptions.length > 0) {
            const novoOptionHeight = this.getNovoOptionHeight();
            const activeOptionIndex = this.novoSelect._keyManager.activeItemIndex || 0;
            const labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.novoSelect.contentOptions, this.novoSelect.optionGroups);
            // If the component is in a NovoOption, the activeItemIndex will be offset by one.
            const indexOfOptionToFitIntoView = (this.novoOption ? -1 : 0) + labelCount + activeOptionIndex;
            const currentScrollTop = this.novoSelect.panel.nativeElement.scrollTop;
            const searchInputHeight = this.innerSelectSearch.nativeElement.offsetHeight;
            const amountOfVisibleOptions = Math.floor((SELECT_PANEL_MAX_HEIGHT - searchInputHeight) / novoOptionHeight);
            const indexOfFirstVisibleOption = Math.round((currentScrollTop + searchInputHeight) / novoOptionHeight) - 1;
            if (indexOfFirstVisibleOption >= indexOfOptionToFitIntoView) {
                this.novoSelect.panel.nativeElement.scrollTop = indexOfOptionToFitIntoView * novoOptionHeight;
            }
            else if (indexOfFirstVisibleOption + amountOfVisibleOptions <= indexOfOptionToFitIntoView) {
                this.novoSelect.panel.nativeElement.scrollTop =
                    (indexOfOptionToFitIntoView + 1) * novoOptionHeight - (SELECT_PANEL_MAX_HEIGHT - searchInputHeight);
            }
        }
    }
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth() {
        if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
            return;
        }
        let element = this.innerSelectSearch.nativeElement;
        let panelElement;
        while ((element = element.parentElement)) {
            if (element.classList.contains('novo-select-panel')) {
                panelElement = element;
                break;
            }
        }
        if (panelElement) {
            this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
        }
    }
    getNovoOptionHeight() {
        if (this.novoSelect.contentOptions.length > 0) {
            return this.novoSelect.contentOptions.first._getHostElement().getBoundingClientRect().height;
        }
        return 0;
    }
    /**
     * Determine the offset to length that can be caused by the optional novoOption used as a search input.
     */
    getOptionsLengthOffset() {
        if (this.novoOption) {
            return 1;
        }
        else {
            return 0;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchComponent, deps: [{ token: NovoSelectElement }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: NovoOption, optional: true }, { token: i2.LiveAnnouncer }, { token: NovoFieldElement, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoSelectSearchComponent, isStandalone: false, selector: "novo-select-search", inputs: { name: "name", placeholderLabel: "placeholderLabel", type: "type", noEntriesFoundLabel: "noEntriesFoundLabel", indexAndLengthScreenReaderText: "indexAndLengthScreenReaderText", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", allowDeselectDuringFilter: "allowDeselectDuringFilter", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toogleAllCheckboxTooltipPosition: "toogleAllCheckboxTooltipPosition", hideClearSearchButton: "hideClearSearchButton", alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti" }, outputs: { toggleAll: "toggleAll" }, host: { properties: { "class.novo-select-search-inside-novo-option": "this.isInsideNovoOption" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NovoSelectSearchComponent),
                multi: true,
            },
        ], queries: [{ propertyName: "clearIcon", first: true, predicate: NovoSelectSearchClearDirective, descendants: true }], viewQueries: [{ propertyName: "searchSelectInput", first: true, predicate: ["searchSelectInput"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerSelectSearch", first: true, predicate: ["innerSelectSearch"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "directive", type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i8.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9.NovoSpinnerElement, selector: "novo-spinner", inputs: ["theme", "color", "size", "inverse"] }, { kind: "directive", type: i10.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "component", type: i11.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i11.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i11.NovoFieldPrefixDirective, selector: "[novoPrefix]" }, { kind: "directive", type: i11.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Object)
], NovoSelectSearchComponent.prototype, "allowDeselectDuringFilter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select-search', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NovoSelectSearchComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"] }]
        }], ctorParameters: () => [{ type: i12.NovoSelectElement, decorators: [{
                    type: Inject,
                    args: [NovoSelectElement]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i7.NovoOption, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoOption]
                }] }, { type: i2.LiveAnnouncer }, { type: i11.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoFieldElement]
                }] }], propDecorators: { name: [{
                type: Input
            }], placeholderLabel: [{
                type: Input
            }], type: [{
                type: Input
            }], noEntriesFoundLabel: [{
                type: Input
            }], indexAndLengthScreenReaderText: [{
                type: Input
            }], clearSearchInput: [{
                type: Input
            }], searching: [{
                type: Input
            }], disableInitialFocus: [{
                type: Input
            }], enableClearOnEscapePressed: [{
                type: Input
            }], allowDeselectDuringFilter: [{
                type: Input
            }], preventHomeEndKeyPropagation: [{
                type: Input
            }], disableScrollToActiveOnOptionsChanged: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], showToggleAllCheckbox: [{
                type: Input
            }], toggleAllCheckboxChecked: [{
                type: Input
            }], toggleAllCheckboxIndeterminate: [{
                type: Input
            }], toggleAllCheckboxTooltipMessage: [{
                type: Input
            }], toogleAllCheckboxTooltipPosition: [{
                type: Input
            }], hideClearSearchButton: [{
                type: Input
            }], alwaysRestoreSelectedOptionsMulti: [{
                type: Input
            }], toggleAll: [{
                type: Output
            }], searchSelectInput: [{
                type: ViewChild,
                args: ['searchSelectInput', { read: ElementRef, static: true }]
            }], innerSelectSearch: [{
                type: ViewChild,
                args: ['innerSelectSearch', { read: ElementRef, static: true }]
            }], clearIcon: [{
                type: ContentChild,
                args: [NovoSelectSearchClearDirective, { static: false }]
            }], isInsideNovoOption: [{
                type: HostBinding,
                args: ['class.novo-select-search-inside-novo-option']
            }] } });

class NovoSelectSearchModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchModule, declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective], imports: [CommonModule,
            ReactiveFormsModule,
            NovoCheckboxModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoIconModule,
            NovoLoadingModule,
            NovoTooltipModule,
            NovoFieldModule], exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchModule, imports: [CommonModule,
            ReactiveFormsModule,
            NovoCheckboxModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoIconModule,
            NovoLoadingModule,
            NovoTooltipModule,
            NovoFieldModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSelectSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NovoCheckboxModule,
                        NovoButtonModule,
                        NovoCommonModule,
                        NovoIconModule,
                        NovoLoadingModule,
                        NovoTooltipModule,
                        NovoFieldModule,
                    ],
                    declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                    exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSelectSearchClearDirective, NovoSelectSearchComponent, NovoSelectSearchModule };
//# sourceMappingURL=novo-elements-elements-select-search.mjs.map
