// NG2
import { ElementRef, Input, ChangeDetectorRef } from '@angular/core';
// APP
import { Helpers } from '../../../../utils/Helpers';
// Vendor
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { OverlayRef } from '@angular/cdk/overlay';

/**
 * @name: PickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
export class BasePickerResults {
  _term: string = '';
  selected: Array<any> = [];
  @Input() matches: any = [];
  hasError: boolean = false;
  isLoading: boolean = false;
  isStatic: boolean = true;
  config: any;
  activeMatch: any;
  parent: any;
  element: ElementRef;
  ref: ChangeDetectorRef;
  page: number = 0;
  lastPage: boolean = false;
  autoSelectFirstOption: boolean = true;
  overlay: OverlayRef;

  private selectingMatches: boolean = false;
  private scrollHandler: any;

  constructor(element: ElementRef, ref: ChangeDetectorRef) {
    this.element = element;
    this.ref = ref;
    this.scrollHandler = this.onScrollDown.bind(this);
  }

  cleanUp(): void {
    let element: Element = this.getListElement();
    if (element && element.hasAttribute('scrollListener')) {
      element.removeAttribute('scrollListener');
      element.removeEventListener('scroll', this.scrollHandler);
    }
  }

  onScrollDown(event: MouseWheelEvent) {
    let element: any = event.target;
    if (element) {
      let offset = element.offsetHeight + element.scrollTop,
        bottom = element.scrollHeight - 300;
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
    if (value !== this._term || this.page === 0) {
      this._term = value;
      this.page = 0;
      this.matches = [];
      this.processSearch(true);
    } else {
      this.addScrollListener();
    }
  }

  addScrollListener(): void {
    if (this.config.enableInfiniteScroll) {
      let element: Element = this.getListElement();
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

  search(term, mode?) {
    let options = this.config.options;
    return Observable.fromPromise(
      new Promise((resolve, reject) => {
        // Check if there is match data
        if (options) {
          // Resolve the data
          if (Array.isArray(options)) {
            this.isStatic = true;
            // Arrays are returned immediately
            resolve(this.structureArray(options));
          } else if (term && term.length >= (this.config.minSearchLength || 1)) {
            if ((options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) || Object.getPrototypeOf(options).hasOwnProperty('then')) {
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
                let defaultOptions = this.config.defaultOptions(term, ++this.page);
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

  /**
   * @name structureArray
   * @param collection - the data once getData resolves it
   * @returns { Array }
   *
   * @description This function structures an array of nodes into an array of objects with a
   * 'name' field by default.
   */
  structureArray(collection: any): any {
    let dataArray = collection.data ? collection.data : collection;
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
      let label = this.config.format ? Helpers.interpolate(this.config.format, data) : data.label || String(value);
      return { value, label, data };
    });
  }

  /**
   * @name filterData=
   * @param matches - Collection of objects=
   *
   * @description This function loops through the picker options and creates a filtered list of objects that contain
   * the newSearch.
   */
  filterData(matches): Array<any> {
    if (this.term && matches) {
      return matches.filter((match) => {
        return ~String(match.label)
          .toLowerCase()
          .indexOf(this.term.toLowerCase());
      });
    }
    // Show no recent results template
    return matches;
  }

  /**
   * @name selectActiveMatch
   *
   * @description This function is called when the user presses the enter key to call the selectMatch method.
   */
  selectActiveMatch() {
    this.selectMatch();
  }

  /**
   * @name prevActiveMatch
   *
   * @description This function sets activeMatch to the match before the current node.
   */
  prevActiveMatch() {
    let index = this.matches.indexOf(this.activeMatch);
    this.activeMatch = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
    this.scrollToActive();
    this.ref.markForCheck();
  }

  /**
   * @name nextActiveMatch
   *
   * @description This function sets activeMatch to the match after the current node.
   */
  nextActiveMatch() {
    let index = this.matches.indexOf(this.activeMatch);
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
    let list = this.getListElement();
    let items = this.getChildrenOfListElement();
    let index = this.matches.indexOf(this.activeMatch);
    let item = items[index];
    if (item) {
      list.scrollTop = item.offsetTop;
    }
  }

  /**
   * @name selectActive
   * @param match
   *
   * @description
   */
  selectActive(match) {
    this.activeMatch = match;
  }

  /**
   * @name isActive
   * @param match
   *
   * @description
   */
  isActive(match) {
    return this.activeMatch === match;
  }

  /**
   * @name selectMatch
   * @param event
   * @param item
   *
   * @description
   */
  selectMatch(event?: any, item?: any) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    let selected = this.activeMatch;
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
   * @name escapeRegexp
   * @param queryToEscape
   *
   * @description This function captures the whole query string and replace it with the string that will be used to
   * match.
   */
  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  /**
   * @name highlight
   * @param match
   * @param query
   *
   * @description This function should return a <strong>-tag wrapped HTML string.
   */
  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
  }

  preselected(match) {
    return (
      this.selected.findIndex((item) => {
        let isPreselected = false;
        if (item && item.value && match && match.value) {
          if (item.value.id && match.value.id) {
            isPreselected = item.value.id === match.value.id;
          } else {
            isPreselected = item.value === match.value;
          }
        }
        return isPreselected;
      }) !== -1
    );
  }
}
