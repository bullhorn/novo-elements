import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { delay, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { isAlphaNumeric, Key } from '../../utils';
import { NovoOption, _countGroupLabelsBeforeOption } from '../common';
import { NovoFieldElement } from '../field';
import { NovoSelectElement } from '../select';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';

/** The max height of the select's overlay panel. */
const SELECT_PANEL_MAX_HEIGHT = 256;
let autoIncrement = 1;
/* tslint:disable:member-ordering component-selector */
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
@Component({
  selector: 'novo-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovoSelectSearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSelectSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() name = 'select-search-' + autoIncrement++;
  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Search';

  /** Type of the search input field */
  @Input() type = 'text';

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  @Input() noEntriesFoundLabel = 'No Records Found';

  /**
   *  Text that is appended to the currently active item label announced by screen readers,
   *  informing the user of the current index, value and total options.
   *  eg: Bank R (Germany) 1 of 6
   */
  @Input() indexAndLengthScreenReaderText = ' of ';

  /**
   * Whether or not the search field should be cleared after the dropdown menu is closed.
   * Useful for server-side filtering.
   */
  @Input() clearSearchInput = true;

  /** Whether to show the search-in-progress indicator */
  @Input() searching = false;

  /** Disables initial focusing of the input field */
  @Input() disableInitialFocus = false;

  /** Enable clear input on escape pressed */
  @Input() enableClearOnEscapePressed = false;

  /**
   * Prevents home / end key being propagated to novo-select,
   * allowing to move the cursor within the search input instead of navigating the options
   */
  @Input() preventHomeEndKeyPropagation = false;

  /** Disables scrolling to active options when option list changes. Useful for server-side search */
  @Input() disableScrollToActiveOnOptionsChanged = false;

  /** Adds 508 screen reader support for search box */
  @Input() ariaLabel = 'dropdown search';

  /** Whether to show Select All Checkbox (for novo-select[multi=true]) */
  @Input() showToggleAllCheckbox = false;

  /** select all checkbox checked state */
  @Input() toggleAllCheckboxChecked = false;

  /** select all checkbox indeterminate state */
  @Input() toggleAllCheckboxIndeterminate = false;

  /** Display a message in a tooltip on the toggle-all checkbox */
  @Input() toggleAllCheckboxTooltipMessage = '';

  /** Define the position of the tooltip on the toggle-all checkbox. */
  @Input() toogleAllCheckboxTooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after' = 'below';

  /** Show/Hide the search clear button of the search input */
  @Input() hideClearSearchButton = false;

  /**
   * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
   * Defaults to false, so selected options are only restored while filtering is active.
   */
  @Input() alwaysRestoreSelectedOptionsMulti = false;

  /** Output emitter to send to parent component with the toggle all boolean */
  @Output() toggleAll = new EventEmitter<boolean>();

  /** Reference to the search input field */
  @ViewChild('searchSelectInput', { read: ElementRef, static: true }) searchSelectInput: ElementRef;

  /** Reference to the search input field */
  @ViewChild('innerSelectSearch', { read: ElementRef, static: true }) innerSelectSearch: ElementRef;

  /** Reference to custom search input clear icon */
  @ContentChild(NovoSelectSearchClearDirective, { static: false }) clearIcon: NovoSelectSearchClearDirective;

  @HostBinding('class.novo-select-search-inside-novo-option')
  get isInsideNovoOption(): boolean {
    return !!this.novoOption;
  }

  /** Current search value */
  get value(): string {
    return this._formControl.value;
  }
  private _lastExternalInputValue: string;

  onTouched: Function = (_: any) => {};

  /** Reference to the NovoSelectElement options */
  public set _options(_options: QueryList<NovoOption>) {
    this._options$.next(_options);
  }
  public get _options(): QueryList<NovoOption> {
    return this._options$.getValue();
  }
  public _options$: BehaviorSubject<QueryList<NovoOption>> = new BehaviorSubject<QueryList<NovoOption>>(null);

  private optionsList$: Observable<NovoOption[]> = this._options$.pipe(
    switchMap((_options) =>
      _options
        ? _options.changes.pipe(
            map((options) => options.toArray()),
            startWith<NovoOption[]>(_options.toArray()),
          )
        : of(null),
    ),
  );

  private optionsLength$: Observable<number> = this.optionsList$.pipe(map((options) => (options ? options.length : 0)));

  /** Previously selected values when using <novo-select [multiple]="true">*/
  private previousSelectedValues: any[];

  public _formControl: FormControl = new FormControl('');

  /** whether to show the no entries found message */
  public _showNoEntriesFound$: Observable<boolean> = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(
    map(([value, optionsLength]) => this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset()),
  );

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    @Inject(NovoSelectElement) public novoSelect: NovoSelectElement,
    public changeDetectorRef: ChangeDetectorRef,
    private _viewportRuler: ViewportRuler,
    @Optional() @Inject(NovoOption) public novoOption: NovoOption = null,
    private liveAnnouncer: LiveAnnouncer,
    @Optional() @Inject(NovoFieldElement) public matFormField: NovoFieldElement = null,
  ) {}

  ngOnInit() {
    // set custom panel class
    // const panelClass = 'novo-select-search-panel';
    // if (this.novoSelect.panelClass) {
    //   if (Array.isArray(this.novoSelect.panelClass)) {
    //     (<string[]>this.novoSelect.panelClass).push(panelClass);
    //   } else if (typeof this.novoSelect.panelClass === 'string') {
    //     this.novoSelect.panelClass = [this.novoSelect.panelClass, panelClass];
    //   } else if (typeof this.novoSelect.panelClass === 'object') {
    //     this.novoSelect.panelClass[panelClass] = true;
    //   }
    // } else {
    //   this.novoSelect.panelClass = panelClass;
    // }

    // set custom novo-option class if the component was placed inside a novo-option
    if (this.novoOption) {
      this.novoOption.novoInert = true;
      this.novoOption._getHostElement().classList.add('contains-novo-select-search');
    } else {
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
      } else {
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
        } else {
          console.log('_keyManager was not initialized.');
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
              if (
                firstOptionIsChanged ||
                !keyManager.activeItem ||
                !options.find((option) => this.novoSelect.compareWith(option, keyManager.activeItem))
              ) {
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
        } else {
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

    this.initMultipleHandling();

    this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      // update view when available options change
      this.changeDetectorRef.markForCheck();
    });
  }

  _emitSelectAllBooleanToParent(state: boolean) {
    this.toggleAll.emit(state);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  _isToggleAllCheckboxVisible(): boolean {
    return this.novoSelect.multiple && this.showToggleAllCheckbox;
  }

  /**
   * Handles the key down event with NovoSelectElement.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if (
      (event.key && event.key.length === 1) ||
      isAlphaNumeric(event.key) ||
      event.key === Key.Space ||
      (this.preventHomeEndKeyPropagation && (event.key === Key.Home || event.key === Key.End))
    ) {
      event.stopPropagation();
    }

    if (this.novoSelect.multiple && event.key && event.key === Key.Enter) {
      // Regain focus after multiselect, so we can further type
      setTimeout(() => this._focus());
    }

    // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
    if (this.enableClearOnEscapePressed === true && event.key === Key.Escape && this.value) {
      this._reset(true);
      event.stopPropagation();
    }
  }

  /**
   * Handles the key up event with NovoSelectElement.
   * Allows e.g. the announcing of the currently activeDescendant by screen readers.
   */
  _handleKeyup(event: KeyboardEvent) {
    if (event.key === Key.ArrowUp || event.key === Key.ArrowDown) {
      const ariaActiveDescendantId = this.novoSelect._getAriaActiveDescendant();
      const index = this._options.toArray().findIndex((item) => item.id === ariaActiveDescendantId);
      if (index !== -1) {
        const activeDescendant = this._options.toArray()[index];
        this.liveAnnouncer.announce(
          activeDescendant.viewValue + ' ' + this.getAriaIndex(index) + this.indexAndLengthScreenReaderText + this.getAriaLength(),
        );
      }
    }
  }

  /**
   * Calculate the index of the current option, taking the offset to length into account.
   * examples:
   *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
   *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
   */
  getAriaIndex(optionIndex: number): number {
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
  getAriaLength(): number {
    return this._options.toArray().length - this.getOptionsLengthOffset();
  }

  writeValue(value: string) {
    this._lastExternalInputValue = value;
    this._formControl.setValue(value);
    this.changeDetectorRef.markForCheck();
  }

  onBlur() {
    this.onTouched();
  }

  registerOnChange(fn: (value: string) => void) {
    this._formControl.valueChanges
      .pipe(
        filter((value) => value !== this._lastExternalInputValue),
        tap(() => (this._lastExternalInputValue = undefined)),
        takeUntil(this._onDestroy),
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  /**
   * Focuses the search input field
   */
  public _focus() {
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
  public _reset(focus?: boolean) {
    this._formControl.setValue('');
    if (focus) {
      this._focus();
    }
  }

  /**
   * Initializes handling <novo-select [multiple]="true">
   * Note: to improve this code, novo-select should be extended to allow disabling resetting the selection while filtering.
   */
  private initMultipleHandling() {
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
        if (
          (this.alwaysRestoreSelectedOptionsMulti || (this._formControl.value && this._formControl.value.length)) &&
          this.previousSelectedValues &&
          Array.isArray(this.previousSelectedValues)
        ) {
          if (!values || !Array.isArray(values)) {
            values = [];
          }
          const optionValues = this.novoSelect.options.map((option) => option.value);
          this.previousSelectedValues.forEach((previousValue) => {
            if (
              !values.some((v) => this.novoSelect.compareWith(v, previousValue)) &&
              !optionValues.some((v) => this.novoSelect.compareWith(v, previousValue))
            ) {
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
  private adjustScrollTopToFitActiveOptionIntoView(): void {
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
      } else if (indexOfFirstVisibleOption + amountOfVisibleOptions <= indexOfOptionToFitIntoView) {
        this.novoSelect.panel.nativeElement.scrollTop =
          (indexOfOptionToFitIntoView + 1) * novoOptionHeight - (SELECT_PANEL_MAX_HEIGHT - searchInputHeight);
      }
    }
  }

  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operation Systems
   */
  public updateInputWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element: HTMLElement = this.innerSelectSearch.nativeElement;
    let panelElement: HTMLElement;
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

  private getNovoOptionHeight(): number {
    if (this.novoSelect.contentOptions.length > 0) {
      return this.novoSelect.contentOptions.first._getHostElement().getBoundingClientRect().height;
    }

    return 0;
  }

  /**
   * Determine the offset to length that can be caused by the optional novoOption used as a search input.
   */
  private getOptionsLengthOffset(): number {
    if (this.novoOption) {
      return 1;
    } else {
      return 0;
    }
  }
}
