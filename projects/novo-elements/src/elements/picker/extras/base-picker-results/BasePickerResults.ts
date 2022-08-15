// NG2
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
// Vendor
import { from, Observable } from 'rxjs';
// APP
import { Helpers } from '../../../../utils/Helpers';
import { NovoControlConfig } from '../../../form/controls/BaseControl';

/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
@Directive()
export class BasePickerResults {
  _term: string = '';
  selected: Array<any> = [];
  hasError: boolean = false;
  isLoading: boolean = false;
  isStatic: boolean = true;
  _config: NovoControlConfig['config'];
  activeMatch: any;
  parent: any;
  element: ElementRef;
  ref: ChangeDetectorRef;
  page: number = 0;
  lastPage: boolean = false;
  autoSelectFirstOption: boolean = true;
  overlay: OverlayRef;
  optionsFunctionHasChanged: boolean = false;
  private selectingMatches: boolean = false;
  private scrollHandler: any;
  _matches: Array<any> = [];

  @Input()
  set matches(m: Array<any>) {
    this._matches = m;
  }

  get matches() {
    return this._matches;
  }

  constructor(element: ElementRef, ref: ChangeDetectorRef) {
    this.element = element;
    this.ref = ref;
    this.scrollHandler = this.onScrollDown.bind(this);
  }

  cleanUp(): void {
    const element: Element = this.getListElement();
    if (element && element.hasAttribute('scrollListener')) {
      element.removeAttribute('scrollListener');
      element.removeEventListener('scroll', this.scrollHandler);
    }
  }

  onScrollDown(event: WheelEvent) {
    const element: any = event.target;
    if (element) {
      const offset = element.offsetHeight + element.scrollTop;
      const bottom = element.scrollHeight - 300;
      if (offset >= bottom) {
        event.stopPropagation();
        if (!this.lastPage && !this.isLoading) {
          this.processSearch();
        }
      }
    }
  }

  get term() {
    return this._term;
  }

  set term(value) {
    if (this.shouldSearch(value)) {
      this._term = value;
      this.page = 0;
      this.optionsFunctionHasChanged = false;
      this.matches = [];
      this.processSearch(true);
    } else {
      this.addScrollListener();
    }
  }

  set config(value: NovoControlConfig['config']) {
    if (this.config && this.config.options !== value.options) {
      this.optionsFunctionHasChanged = true; // reset page so that new options call is used to search
    }
    this._config = value;
  }

  get config(): NovoControlConfig['config'] {
    return this._config;
  }

  shouldSearch(value: unknown): boolean {
    const termHasChanged = value !== this._term;
    const optionsNotYetCalled = this.page === 0;

    return termHasChanged || optionsNotYetCalled || this.optionsFunctionHasChanged;
  }

  addScrollListener(): void {
    if (this.config.enableInfiniteScroll) {
      const element: Element = this.getListElement();
      if (element && !element.hasAttribute('scrollListener')) {
        element.setAttribute('scrollListener', 'true');
        element.addEventListener('scroll', this.scrollHandler);
      }
    }
  }

  processSearch(shouldReset?: boolean) {
    this.hasError = false;
    this.isLoading = true;
    this.ref.markForCheck();
    this.search(this.term).subscribe(
      (results: any) => {
        if (shouldReset) {
          this.matches = [];
        }
        if (this.isStatic) {
          this.matches = this.filterData(results);
        } else {
          this.matches = this.matches.concat(results);
          this.lastPage = results && !results.length;
        }
        if (this.matches.length > 0 && this.autoSelectFirstOption && !this.selectingMatches) {
          this.nextActiveMatch();
        }
        this.isLoading = false;
        this.ref.markForCheck();
        setTimeout(() => {
          this.overlay.updatePosition();
          this.addScrollListener();
        }); // @bkimball: This was added for Dylan Schulte, 9.18.2017 4:14PM EST, you're welcome!
      },
      (err) => {
        this.hasError = this.term && this.term.length !== 0;
        this.isLoading = false;
        this.lastPage = true;
        if (this.term && this.term.length !== 0) {
          console.error(err); // tslint:disable-lineno
        }
        this.ref.markForCheck();
      },
    );
  }

  search(term, mode?): Observable<any> {
    const options = this.config.options;
    return from(
      new Promise((resolve, reject) => {
        // Check if there is match data
        if (options) {
          // Resolve the data
          if (Array.isArray(options)) {
            this.isStatic = true;
            // Arrays are returned immediately
            resolve(this.structureArray(options));
          } else if (this.shouldCallOptionsFunction(term)) {
            if (
              (options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) ||
              Object.getPrototypeOf(options).hasOwnProperty('then')
            ) {
              this.isStatic = false;
              // Promises (ES6 or Deferred) are resolved whenever they resolve
              options.then(this.structureArray.bind(this)).then(resolve, reject);
            } else if (typeof options === 'function') {
              this.isStatic = false;
              // Promises (ES6 or Deferred) are resolved whenever they resolve
              options(term, ++this.page)
                .then(this.structureArray.bind(this))
                .then(resolve, reject);
            } else {
              // All other kinds of data are rejected
              reject('The data provided is not an array or a promise');
              throw new Error('The data provided is not an array or a promise');
            }
          } else {
            if (this.config.defaultOptions) {
              this.isStatic = false;
              if (typeof this.config.defaultOptions === 'function') {
                const defaultOptions = this.config.defaultOptions(term, ++this.page);
                if (Object.getPrototypeOf(defaultOptions).hasOwnProperty('then')) {
                  defaultOptions.then(this.structureArray.bind(this)).then(resolve, reject);
                } else {
                  resolve(this.structureArray(defaultOptions));
                }
              } else {
                resolve(this.structureArray(this.config.defaultOptions));
              }
            } else {
              // No search term gets rejected
              reject('No search term');
            }
          }
        } else {
          // No data gets rejected
          reject('error');
        }
      }),
    );
  }

  shouldCallOptionsFunction(term: string): boolean {
    if (this.config && 'minSearchLength' in this.config && Number.isInteger(this.config.minSearchLength)) {
      return typeof term === 'string' && term.length >= this.config.minSearchLength;
    } else {
      return !!(term && term.length);
    }
  }

  /**
   * @param collection - the data once getData resolves it
   *
   * @description This function structures an array of nodes into an array of objects with a
   * 'name' field by default.
   */
  structureArray(collection: any): any {
    const dataArray = collection.data ? collection.data : collection;
    if (dataArray && (typeof dataArray[0] === 'string' || typeof dataArray[0] === 'number')) {
      return collection.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
    }
    return dataArray.map((data) => {
      let value = this.config.field ? data[this.config.field] : data.value || data;
      if (this.config.valueFormat) {
        value = Helpers.interpolate(this.config.valueFormat, data);
      }
      const label = this.config.format ? Helpers.interpolate(this.config.format, data) : data.label || String(value);
      return { value, label, data };
    });
  }

  /**
   * @param matches - Collection of objects=
   *
   * @description This function loops through the picker options and creates a filtered list of objects that contain
   * the newSearch.
   */
  filterData(matches): Array<any> {
    if (this.term && matches) {
      return matches.filter((match) => {
        return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
      });
    }
    // Show no recent results template
    return matches;
  }

  /**
   * @description This function is called when the user presses the enter key to call the selectMatch method.
   */
  selectActiveMatch() {
    this.selectMatch();
  }

  /**
   * @description This function sets activeMatch to the match before the current node.
   */
  prevActiveMatch() {
    const index = this.matches.indexOf(this.activeMatch);
    this.activeMatch = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
    this.scrollToActive();
    this.ref.markForCheck();
  }

  /**
   * @description This function sets activeMatch to the match after the current node.
   */
  nextActiveMatch() {
    const index = this.matches.indexOf(this.activeMatch);
    this.activeMatch = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
    this.scrollToActive();
    this.ref.markForCheck();
  }

  getListElement() {
    return this.element.nativeElement;
  }

  getChildrenOfListElement() {
    let children = [];
    if (this.getListElement()) {
      children = this.getListElement().children;
    }
    return children;
  }

  scrollToActive() {
    const list = this.getListElement();
    const items = this.getChildrenOfListElement();
    const index = this.matches.indexOf(this.activeMatch);
    const item = items[index];
    if (item) {
      list.scrollTop = item.offsetTop;
    }
  }

  /**
   * @description
   */
  selectActive(match) {
    this.activeMatch = match;
  }

  /**
   * @description
   */
  isActive(match) {
    return this.activeMatch === match;
  }

  /**
   * @description
   */
  selectMatch(event?: any, item?: any) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const selected = this.activeMatch;
    if (selected && this.parent) {
      this.parent.value = selected;
      this.selectingMatches = true;
      if (this.parent.closeOnSelect) {
        this.parent.hideResults();
        this.selectingMatches = false;
      }
    }
    this.ref.markForCheck();
    return false;
  }

  /**
   * @description This function captures the whole query string and replace it with the string that will be used to
   * match.
   */
  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  /**
   * @deprecated use highlight pipe
   */
  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
  }

  preselected(match) {
    let selected = this.selected;
    if (this.config && this.config.selected) {
      selected = [...this.selected, ...this.config.selected];
    }
    if (this.config && this.config.preselected) {
      const preselectedFunc: Function = this.config.preselected;
      return (
        selected.findIndex((item) => {
          return preselectedFunc(match, item);
        }) !== -1
      );
    }
    return (
      selected.findIndex((item) => {
        let isPreselected = false;
        if (item && item.value && match && match.value) {
          if (item.value.id && match.value.id) {
            isPreselected = item.value.id === match.value.id;
          } else if (item.value instanceof Object && item.value.hasOwnProperty('value')) {
            isPreselected = item.value.value === match.value;
          } else {
            isPreselected = item.value === match.value;
          }
        }
        return isPreselected;
      }) !== -1
    );
  }
}
