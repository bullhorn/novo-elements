import * as i0 from '@angular/core';
import { Input, Directive, Component, HostBinding, EventEmitter, Output, ViewEncapsulation, ViewChild, forwardRef, ViewContainerRef, NgModule } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { Helpers, notify } from 'novo-elements/utils';
import * as i1 from 'novo-elements/services';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoCommonModule, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i5 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i1$1 from '@angular/platform-browser';
import * as i6 from 'novo-elements/elements/list';
import { NovoListModule } from 'novo-elements/elements/list';
import * as i6$1 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i3$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i7 from 'novo-elements/elements/switch';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
class BasePickerResults {
    set matches(m) {
        this._matches = m;
    }
    get matches() {
        return this.customTextValue ? [...this._matches, this.customTextValue] : this._matches;
    }
    constructor(element, ref) {
        this._term = '';
        this.selected = [];
        this.hasError = false;
        this.isLoading = false;
        this.isStatic = true;
        this.page = 0;
        this.lastPage = false;
        this.autoSelectFirstOption = true;
        this.optionsFunctionHasChanged = false;
        this.selectingMatches = false;
        this._matches = [];
        this.customTextValue = null;
        this.element = element;
        this.ref = ref;
        this.scrollHandler = this.onScrollDown.bind(this);
    }
    cleanUp() {
        const element = this.getListElement();
        if (element && element.hasAttribute('scrollListener')) {
            element.removeAttribute('scrollListener');
            element.removeEventListener('scroll', this.scrollHandler);
        }
    }
    onScrollDown(event) {
        const element = event.target;
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
    set term(value) {
        if (this.shouldSearch(value)) {
            this._term = value;
            this.page = 0;
            this.optionsFunctionHasChanged = false;
            this.matches = [];
            this.processSearch(true);
        }
        else {
            this.addScrollListener();
        }
    }
    get term() {
        return this._term;
    }
    set config(value) {
        if (this.config && this.config.options !== value.options) {
            this.optionsFunctionHasChanged = true; // reset page so that new options call is used to search
        }
        this._config = value;
    }
    get config() {
        return this._config;
    }
    shouldSearch(value) {
        const termHasChanged = value !== this._term;
        const optionsNotYetCalled = this.page === 0;
        return termHasChanged || optionsNotYetCalled || this.optionsFunctionHasChanged;
    }
    addScrollListener() {
        if (this.config.enableInfiniteScroll) {
            const element = this.getListElement();
            if (element && !element.hasAttribute('scrollListener')) {
                element.setAttribute('scrollListener', 'true');
                element.addEventListener('scroll', this.scrollHandler);
            }
        }
    }
    processSearch(shouldReset) {
        this.hasError = false;
        this.isLoading = true;
        this.ref.markForCheck();
        this.search(this.term).subscribe((results) => {
            if (shouldReset) {
                this.matches = [];
            }
            if (this.isStatic) {
                this.matches = this.filterData(results);
            }
            else {
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
            });
        }, (err) => {
            this.hasError = this.term && this.term.length !== 0;
            this.isLoading = false;
            this.lastPage = true;
            if (this.term && this.term.length !== 0) {
                console.error(err); // tslint:disable-lineno
            }
            this.ref.markForCheck();
        });
    }
    search(term, mode) {
        const options = this.config.options;
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(options));
                }
                else if (this.shouldCallOptionsFunction(term)) {
                    if ((options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) ||
                        Object.getPrototypeOf(options).hasOwnProperty('then')) {
                        this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options.then(this.structureArray.bind(this)).then(resolve, reject);
                    }
                    else if (typeof options === 'function') {
                        this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options(term, ++this.page)
                            .then(this.structureArray.bind(this))
                            .then(resolve, reject);
                    }
                    else {
                        // All other kinds of data are rejected
                        reject('The data provided is not an array or a promise');
                        throw new Error('The data provided is not an array or a promise');
                    }
                }
                else {
                    if (this.config.defaultOptions) {
                        this.isStatic = false;
                        if (typeof this.config.defaultOptions === 'function') {
                            const defaultOptions = this.config.defaultOptions(term, ++this.page);
                            if (Object.getPrototypeOf(defaultOptions).hasOwnProperty('then')) {
                                defaultOptions.then(this.structureArray.bind(this)).then(resolve, reject);
                            }
                            else {
                                resolve(this.structureArray(defaultOptions));
                            }
                        }
                        else {
                            resolve(this.structureArray(this.config.defaultOptions));
                        }
                    }
                    else {
                        // No search term gets rejected
                        reject('No search term');
                    }
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    shouldCallOptionsFunction(term) {
        if (this.config && 'minSearchLength' in this.config && Number.isInteger(this.config.minSearchLength)) {
            return typeof term === 'string' && term.length >= this.config.minSearchLength;
        }
        else {
            return !!(term && term.length);
        }
    }
    /**
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
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
    filterData(matches) {
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
    selectMatch(event, item) {
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
            }
            this.selectingMatches = false;
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
            const preselectedFunc = this.config.preselected;
            return (selected.findIndex((item) => {
                return preselectedFunc(match, item);
            }) !== -1);
        }
        return (selected.findIndex((item) => {
            let isPreselected = false;
            if (item && item.value && match && match.value) {
                if (item.value.id && match.value.id) {
                    isPreselected = item.value.id === match.value.id;
                }
                else if (item.value instanceof Object && item.value.hasOwnProperty('value')) {
                    isPreselected = item.value.value === match.value;
                }
                else {
                    isPreselected = item.value === match.value;
                }
            }
            return isPreselected;
        }) !== -1);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BasePickerResults, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: BasePickerResults, isStandalone: true, inputs: { matches: "matches", term: "term" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BasePickerResults, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { matches: [{
                type: Input
            }], term: [{
                type: Input
            }] } });

// NG2
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
class ChecklistPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    search() {
        const options = this.config.options;
        // only set this the first time
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(options);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches) {
        if (this.term && matches) {
            this.filteredMatches = matches.map((section) => {
                const items = section.originalData.filter((match) => {
                    return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
                });
                section.data = items;
                return section;
            }, this);
            return this.filteredMatches;
        }
        else if (this.term === '') {
            matches.forEach((section) => {
                section.data = section.originalData;
            });
            return matches;
        }
        // Show no recent results template
        return matches;
    }
    selectMatch(event, item) {
        Helpers.swallowEvent(event);
        if (item.indeterminate) {
            item.indeterminate = false;
            item.checked = true;
        }
        else {
            item.checked = !item.checked;
        }
        const selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;
        }
        this.ref.markForCheck();
        return false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ChecklistPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ChecklistPickerResults, isStandalone: false, selector: "checklist-picker-results", host: { classAttribute: "active picker-results" }, usesInheritance: true, ngImport: i0, template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <ul *ngIf="matches.length > 0">
      <span *ngFor="let section of matches; let i = index">
        <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
        <li
          *ngFor="let match of section.data; let i = index"
          [ngClass]="{ checked: match.checked }"
          (click)="selectMatch($event, match)"
          [class.active]="match === activeMatch"
          (mouseenter)="selectActive(match)"
        >
          <label>
            <i
              [ngClass]="{
                'bhi-checkbox-empty': !match.checked,
                'bhi-checkbox-filled': match.checked,
                'bhi-checkbox-indeterminate': match.indeterminate
              }"
            ></i>
            {{ match.label }}
          </label>
        </li>
      </span>
    </ul>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError && term !== ''">{{ labels.pickerEmpty }}</p>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ChecklistPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'checklist-picker-results',
                    host: {
                        class: 'active picker-results',
                    },
                    template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <ul *ngIf="matches.length > 0">
      <span *ngFor="let section of matches; let i = index">
        <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
        <li
          *ngFor="let match of section.data; let i = index"
          [ngClass]="{ checked: match.checked }"
          (click)="selectMatch($event, match)"
          [class.active]="match === activeMatch"
          (mouseenter)="selectActive(match)"
        >
          <label>
            <i
              [ngClass]="{
                'bhi-checkbox-empty': !match.checked,
                'bhi-checkbox-filled': match.checked,
                'bhi-checkbox-indeterminate': match.indeterminate
              }"
            ></i>
            {{ match.label }}
          </label>
        </li>
      </span>
    </ul>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError && term !== ''">{{ labels.pickerEmpty }}</p>
  `,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }] });

// NG2
class DistributionListPickerResults extends BasePickerResults {
    get isHidden() {
        return this.matches.length === 0;
    }
    constructor(element, sanitizer, labels, ref) {
        super(element, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
        this.active = true;
        this.sanitizer = sanitizer;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    sanitizeHTML(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DistributionListPickerResults, deps: [{ token: i0.ElementRef }, { token: i1$1.DomSanitizer }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: DistributionListPickerResults, isStandalone: false, selector: "distribution-list-picker-results", host: { properties: { "class.active": "this.active", "hidden": "this.isHidden" } }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { kind: "component", type: i6.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DistributionListPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'distribution-list-picker-results',
                    template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$1.DomSanitizer }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }], isHidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });

class EntityPickerResult {
    constructor(labels) {
        this.labels = labels;
        this.select = new EventEmitter();
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
        return query && match ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    }
    getIconForResult(result) {
        if (result) {
            switch (result.searchEntity) {
                case 'ClientContact':
                    return 'person contact';
                case 'ClientCorporation':
                    return 'company';
                case 'Opportunity':
                    return 'opportunity';
                case 'Candidate':
                    return 'candidate';
                case 'Lead':
                    return 'lead';
                case 'JobOrder':
                    return 'job';
                case 'Placement':
                    return 'star placement';
                case 'CorporateUser':
                    return 'user';
                case 'CorporationDepartment':
                    return 'department';
                case 'JobShift':
                    return 'timetable contract';
                default:
                    return '';
            }
        }
        return '';
    }
    renderTimestamp(date) {
        let timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        return timestamp;
    }
    renderTime(dateStr) {
        let timestamp = '';
        if (dateStr) {
            timestamp = this.labels.formatTime(new Date(dateStr));
        }
        return timestamp;
    }
    renderTimeNoOffset(dateStr) {
        let timestamp = '';
        if (dateStr) {
            dateStr = dateStr.slice(0, 19);
            timestamp = this.labels.formatTime(dateStr);
        }
        return timestamp;
    }
    getNameForResult(result) {
        if (result) {
            switch (result.searchEntity) {
                case 'Lead':
                case 'CorporateUser':
                case 'ClientContact':
                case 'Candidate':
                case 'Person':
                    if ('firstName' in result) {
                        return `${result.firstName} ${result.lastName}`.trim();
                    }
                    return `${result.name || ''}`.trim();
                case 'ClientCorporation':
                    return `${result.name || ''}`.trim();
                case 'Opportunity':
                case 'JobOrder':
                case 'BillingProfile':
                case 'InvoiceTerm':
                    return `${result.id} | ${result.title || ''}`.trim();
                case 'Placement':
                    let label = `${result.id}`;
                    if (result.candidate || result.jobOrder) {
                        if (result.candidate && result.jobOrder) {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName} - ${result.jobOrder.title}`.trim();
                        }
                        else if (result.jobOrder) {
                            label = `${label} | ${result.jobOrder.title}`.trim();
                        }
                        else {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName}`.trim();
                        }
                    }
                    return label;
                case 'JobShift':
                    return `${result.jobOrder?.title} @ ${result.jobOrder?.clientCorporation?.name || ''}`.trim();
                default:
                    return `${result.name || result.label || ''}`.trim();
            }
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EntityPickerResult, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: EntityPickerResult, isStandalone: false, selector: "entity-picker-result", inputs: { match: "match", term: "term" }, outputs: { select: "select" }, ngImport: i0, template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight:term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight:term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight:term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight:term"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="match.data.jobOrder.title | highlight:term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight:term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight:term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight:term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight:term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight:term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight:term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight:term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, isInline: true, styles: [":host(.disabled){opacity:.5;pointer-events:none}:host(.active)>novo-list-item{background-color:#e0ebf9}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { kind: "component", type: i6.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { kind: "component", type: i6.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "pipe", type: i6$1.HighlightPipe, name: "highlight" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EntityPickerResult, decorators: [{
            type: Component,
            args: [{ selector: 'entity-picker-result', template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight:term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight:term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight:term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight:term"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="match.data.jobOrder.title | highlight:term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight:term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight:term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight:term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight:term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight:term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight:term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight:term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, standalone: false, styles: [":host(.disabled){opacity:.5;pointer-events:none}:host(.active)>novo-list-item{background-color:#e0ebf9}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { match: [{
                type: Input
            }], term: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
class EntityPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
        this.select = new EventEmitter();
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    selectMatch(event, item) {
        this.select.next(item);
        return super.selectMatch(event, item);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EntityPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: EntityPickerResults, isStandalone: false, selector: "entity-picker-results", outputs: { select: "select" }, host: { classAttribute: "novo-entity-picker-results" }, usesInheritance: true, ngImport: i0, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        [ngClass]="{ active: match === activeMatch }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `, isInline: true, styles: ["picker-results,entity-picker-results{background:#fff;color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}picker-results .novo-list,entity-picker-results .novo-list{border:1px solid #4a89dc}picker-results .novo-list .novo-list-item,entity-picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}picker-results .novo-list .novo-list-item>div,entity-picker-results .novo-list .novo-list-item>div{width:100%}picker-results .novo-list .novo-list-item.active,entity-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}picker-results .novo-list .novo-list-item:hover,entity-picker-results .novo-list .novo-list-item:hover{background-color:#f1f6fc}picker-results .novo-list .novo-list-item .novo-item-content,entity-picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}picker-results .novo-list .novo-list-item .novo-item-content>*,entity-picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}picker-results picker-error,picker-results picker-loader,picker-results picker-null-recent-results,picker-results picker-null-results,picker-results .picker-error,picker-results .picker-loader,picker-results .picker-null-recent-results,picker-results .picker-null-results,entity-picker-results picker-error,entity-picker-results picker-loader,entity-picker-results picker-null-recent-results,entity-picker-results picker-null-results,entity-picker-results .picker-error,entity-picker-results .picker-loader,entity-picker-results .picker-null-recent-results,entity-picker-results .picker-null-results{background-color:#fff;text-align:center;color:#b5b5b5;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:.5rem}picker-results p.picker-error,picker-results p.picker-loader,picker-results p.picker-null-recent-results,picker-results p.picker-null-results,entity-picker-results p.picker-error,entity-picker-results p.picker-loader,entity-picker-results p.picker-null-recent-results,entity-picker-results p.picker-null-results{max-width:inherit;padding:5px}picker-results picker-loader,picker-results .picker-loader,entity-picker-results picker-loader,entity-picker-results .picker-loader{background-color:#fff;display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}picker-results section,entity-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}picker-results,.picker-results,quick-note-results,.quick-note-results{background-color:#fff;cursor:default;line-height:26px;width:100%;display:block}picker-results novo-list,picker-results ul,.picker-results novo-list,.picker-results ul,quick-note-results novo-list,quick-note-results ul,.quick-note-results novo-list,.quick-note-results ul{background-color:#fff;max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li{font-size:.9em;padding:5px 16px}picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6{padding-top:0;font-weight:400;color:#93a0a9}picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong{font-weight:400;color:#3d464d}picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover{background-color:#e0ebf9}picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled{opacity:.5;pointer-events:none}picker-results novo-list novo-loading,picker-results ul novo-loading,.picker-results novo-list novo-loading,.picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading{justify-content:center}picker-results ul li,.picker-results ul li,quick-note-results ul li,.quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}picker-results.active,.picker-results.active,quick-note-results.active,.quick-note-results.active{z-index:1000}picker-results:focus,.picker-results:focus,quick-note-results:focus,.quick-note-results:focus{outline:none}entity-picker-results{background:#fff;width:100%;min-width:250px}entity-picker-results novo-list{background:#fff;min-width:30rem;max-height:49vh;overflow:auto}entity-picker-results novo-list .novo-item-content{margin-top:.5rem;margin-left:1.8rem;row-gap:1rem}entity-picker-results novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-picker-results novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:#fff;padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid #4a89dc}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:#fff;max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid #e2e2e2;cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: EntityPickerResult, selector: "entity-picker-result", inputs: ["match", "term"], outputs: ["select"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EntityPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'entity-picker-results', template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        [ngClass]="{ active: match === activeMatch }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-entity-picker-results',
                    }, standalone: false, styles: ["picker-results,entity-picker-results{background:#fff;color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}picker-results .novo-list,entity-picker-results .novo-list{border:1px solid #4a89dc}picker-results .novo-list .novo-list-item,entity-picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}picker-results .novo-list .novo-list-item>div,entity-picker-results .novo-list .novo-list-item>div{width:100%}picker-results .novo-list .novo-list-item.active,entity-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}picker-results .novo-list .novo-list-item:hover,entity-picker-results .novo-list .novo-list-item:hover{background-color:#f1f6fc}picker-results .novo-list .novo-list-item .novo-item-content,entity-picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}picker-results .novo-list .novo-list-item .novo-item-content>*,entity-picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}picker-results picker-error,picker-results picker-loader,picker-results picker-null-recent-results,picker-results picker-null-results,picker-results .picker-error,picker-results .picker-loader,picker-results .picker-null-recent-results,picker-results .picker-null-results,entity-picker-results picker-error,entity-picker-results picker-loader,entity-picker-results picker-null-recent-results,entity-picker-results picker-null-results,entity-picker-results .picker-error,entity-picker-results .picker-loader,entity-picker-results .picker-null-recent-results,entity-picker-results .picker-null-results{background-color:#fff;text-align:center;color:#b5b5b5;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:.5rem}picker-results p.picker-error,picker-results p.picker-loader,picker-results p.picker-null-recent-results,picker-results p.picker-null-results,entity-picker-results p.picker-error,entity-picker-results p.picker-loader,entity-picker-results p.picker-null-recent-results,entity-picker-results p.picker-null-results{max-width:inherit;padding:5px}picker-results picker-loader,picker-results .picker-loader,entity-picker-results picker-loader,entity-picker-results .picker-loader{background-color:#fff;display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}picker-results section,entity-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}picker-results,.picker-results,quick-note-results,.quick-note-results{background-color:#fff;cursor:default;line-height:26px;width:100%;display:block}picker-results novo-list,picker-results ul,.picker-results novo-list,.picker-results ul,quick-note-results novo-list,quick-note-results ul,.quick-note-results novo-list,.quick-note-results ul{background-color:#fff;max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li{font-size:.9em;padding:5px 16px}picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6{padding-top:0;font-weight:400;color:#93a0a9}picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong{font-weight:400;color:#3d464d}picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover{background-color:#e0ebf9}picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled{opacity:.5;pointer-events:none}picker-results novo-list novo-loading,picker-results ul novo-loading,.picker-results novo-list novo-loading,.picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading{justify-content:center}picker-results ul li,.picker-results ul li,quick-note-results ul li,.quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}picker-results.active,.picker-results.active,quick-note-results.active,.quick-note-results.active{z-index:1000}picker-results:focus,.picker-results:focus,quick-note-results:focus,.quick-note-results:focus{outline:none}entity-picker-results{background:#fff;width:100%;min-width:250px}entity-picker-results novo-list{background:#fff;min-width:30rem;max-height:49vh;overflow:auto}entity-picker-results novo-list .novo-item-content{margin-top:.5rem;margin-left:1.8rem;row-gap:1rem}entity-picker-results novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-picker-results novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:#fff;padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid #4a89dc}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:#fff;max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid #e2e2e2;cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { select: [{
                type: Output
            }] } });

class GroupedMultiPickerResults extends BasePickerResults {
    set term(value) {
        // Display all only will work for static categories
        if (this.config.displayAll && this.config.getItemsForCategoryAsync) {
            throw new Error('[GroupedMultiPickerResults] - you can only have `displayAll` with a static `categoryMap`. Not available with `getItemsForCategoryAsync`');
        }
        // Custom filter
        if (this.config.customFilter) {
            this.customFilterEnabled = true;
            this.customFilterLabel = this.config.customFilter.label;
            this.customFilterValue = !!this.config.customFilter.defaultFilterValue;
            this.ref.markForCheck();
            if (!this.customFilterLabel || !this.config.customFilter.matchFunction) {
                throw new Error('[GroupedMultiPickerResults] - custom filter/matchFunction set no label was provided!');
            }
        }
        else {
            this.customFilterEnabled = false;
        }
        // Configure ALL
        if (this.config.displayAll && !this.selectedCategory) {
            this.setAllCategory();
        }
        // Placeholder
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    get categories() {
        if (this.config.categories || this.config.categoryMap) {
            return (this.config.categories ||
                Array.from(this.config.categoryMap.values()).filter((category) => {
                    return category.value !== 'all';
                }));
        }
        return [];
    }
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.customFilterEnabled = false;
        this.placeholder = '';
        this.internalMap = new Map();
    }
    ngOnInit() {
        // Subscribe to keyboard events and debounce
        this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
            .pipe(debounceTime(350), distinctUntilChanged())
            .subscribe((event) => {
            this.searchTerm = event.target.value;
            this.matches = this.filterData();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        // Cleanup
        this.keyboardSubscription.unsubscribe();
    }
    setAllCategory() {
        // If we have display all, set the all categories up
        if (this.config.displayAll) {
            this.selectedCategory = { value: 'all', label: 'all' };
            const allItems = [];
            Array.from(this.config.categoryMap.values())
                .filter((category) => {
                return category.value !== 'all';
            })
                .forEach((v) => allItems.push(...v.items));
            this.matches = this.filter(allItems);
            this.config.categoryMap.set('all', { value: 'all', label: 'All', items: allItems });
            this.ref.markForCheck();
        }
    }
    selectCategory(category) {
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = category.value;
        this.selectedCategory = category;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        this.getNewMatches(category, key);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectCategory({ value: this.selectedCategory.value, label: this.selectedCategory.label });
        this.ref.markForCheck();
    }
    selectMatch(event, item) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    fireCustomFilter(value) {
        this.customFilterValue = value;
        // Clear cache map
        this.internalMap.clear();
        // Only fire if we have a selected category
        if (this.selectCategory) {
            // Find new items
            const key = this.selectedCategory.value;
            // Get new matches
            this.getNewMatches(this.selectedCategory, key);
            this.ref.markForCheck();
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    filterData() {
        if (this.selectedCategory) {
            if (this.config.categoryMap) {
                return this.filter(this.config.categoryMap.get(this.selectedCategory.value).items);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedCategory.value).items);
            }
        }
        return [];
    }
    getNewMatches(category, key) {
        // Get new matches
        if (this.config.categoryMap) {
            this.matches = this.filter(this.config.categoryMap.get(key).items);
            this.ref.markForCheck();
        }
        else {
            if (!this.config.getItemsForCategoryAsync) {
                throw new Error('The "config" for the Chips must include a function "getItemsForCategoryAsync(categoryKey: string)" to retrieve the items by category. Or if you have static data provide a "categoryMap"');
            }
            if (!this.internalMap.get(key)) {
                this.isLoading = true;
                this.config.getItemsForCategoryAsync(key, this.customFilterValue).then((items) => {
                    this.internalMap.set(key, { value: category.value, label: category.label, items });
                    this.matches = this.filter(items, true);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
            }
            else {
                this.matches = this.filter(this.internalMap.get(key).items);
                this.ref.markForCheck();
            }
        }
    }
    filter(array, ignoreCustomFilter = false) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedCategory) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        if (this.customFilterEnabled && this.config.customFilter.matchFunction && !ignoreCustomFilter) {
            matches = matches.filter((match) => this.config.customFilter.matchFunction(match, this.customFilterValue));
        }
        return matches;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GroupedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: GroupedMultiPickerResults, isStandalone: false, selector: "grouped-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
          <item-content>
            <span data-automation-id="label">{{ labels.all }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
        <novo-list-item
          *ngFor="let category of categories"
          (click)="selectCategory(category)"
          [class.active]="selectedCategory?.value === category.value"
          [attr.data-automation-id]="category.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row;width:fit-content}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item ::ng-deep div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid #f7f7f7}:host>.grouped-multi-picker-groups footer label{font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid #ffffff}:host>.grouped-multi-picker-groups novo-list-item ::ng-deep .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.grouped-multi-picker-groups novo-list-item.active ::ng-deep .list-item>item-content>*{color:#4a89dc!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "component", type: i6.NovoItemEndElement, selector: "item-end, novo-item-end" }, { kind: "component", type: i7.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GroupedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'grouped-multi-picker-results', template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
          <item-content>
            <span data-automation-id="label">{{ labels.all }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
        <novo-list-item
          *ngFor="let category of categories"
          (click)="selectCategory(category)"
          [class.active]="selectedCategory?.value === category.value"
          [attr.data-automation-id]="category.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `, standalone: false, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row;width:fit-content}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item ::ng-deep div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid #f7f7f7}:host>.grouped-multi-picker-groups footer label{font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid #ffffff}:host>.grouped-multi-picker-groups novo-list-item ::ng-deep .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.grouped-multi-picker-groups novo-list-item.active ::ng-deep .list-item>item-content>*{color:#4a89dc!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });

class MixedMultiPickerResults extends BasePickerResults {
    set term(value) {
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    get options() {
        return this.config.options || [];
    }
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.placeholder = '';
        this.emptyOptionsLabel = '';
        this.internalMap = new Map();
    }
    ngOnDestroy() {
        // Cleanup
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        if (this.config.options) {
            this.config.options.forEach((option) => {
                if (option.clearSecondaryOptions) {
                    option.clearSecondaryOptions.unsubscribe();
                }
            });
        }
    }
    selectPrimaryOption(primaryOption, event) {
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = primaryOption.value;
        this.selectedPrimaryOption = primaryOption;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        if (this.optionHasSecondaryOptions(primaryOption)) {
            // Subscribe to keyboard events and debounce
            this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
                .pipe(debounceTime(350), distinctUntilChanged())
                .subscribe((keyEvent) => {
                this.searchTerm = keyEvent.target.value;
                this.matches = this.filterData();
                this.ref.markForCheck();
            });
            this.getNewMatches(primaryOption);
        }
        else {
            this.selectActive(primaryOption);
            this.selectMatch(event);
        }
    }
    selectMatch(event) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectPrimaryOption({ value: this.selectedPrimaryOption.value, label: this.selectedPrimaryOption.label });
        this.ref.markForCheck();
    }
    optionHasSecondaryOptions(primaryOption) {
        return !!(primaryOption && (primaryOption.secondaryOptions || primaryOption.getSecondaryOptionsAsync));
    }
    shouldShowSearchBox(primaryOption) {
        return !!(primaryOption && primaryOption.showSearchOnSecondaryOptions);
    }
    clearPrimaryOption(primaryOption) {
        if (this.internalMap.get(primaryOption.value)) {
            if (primaryOption.value === this.selectedPrimaryOption?.value) {
                this.activeMatch = null;
                this.matches = [];
                this.selectedPrimaryOption = null;
            }
            this.internalMap.delete(primaryOption.value);
            this.ref.markForCheck();
        }
    }
    filterData() {
        if (this.selectedPrimaryOption) {
            if (this.selectedPrimaryOption.secondaryOptions) {
                return this.filter(this.selectedPrimaryOption.secondaryOptions);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedPrimaryOption.value).items);
            }
        }
        return [];
    }
    filter(array) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedPrimaryOption) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        return matches;
    }
    getNewMatches(primaryOption) {
        // Get new matches
        if (primaryOption.secondaryOptions) {
            this.matches = this.filter(primaryOption.secondaryOptions);
            this.ref.markForCheck();
        }
        else {
            if (!primaryOption.getSecondaryOptionsAsync) {
                throw new Error('An option needs to have either an array of secondaryOptions or a function getSecondaryOptionsAsync');
            }
            if (!this.internalMap.get(primaryOption.value)) {
                this.isLoading = true;
                primaryOption.getSecondaryOptionsAsync().then((items) => {
                    this.internalMap.set(primaryOption.value, { value: primaryOption.value, label: primaryOption.label, items });
                    this.matches = this.filter(items);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
                if (primaryOption.clearSecondaryOptions) {
                    primaryOption.clearSecondaryOptions.subscribe(() => {
                        this.clearPrimaryOption(primaryOption);
                    });
                }
            }
            else {
                this.matches = this.filter(this.internalMap.get(primaryOption.value).items);
                this.ref.markForCheck();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MixedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: MixedMultiPickerResults, isStandalone: false, selector: "mixed-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="mixed-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`, isInline: true, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid #ffffff;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e0ebf9}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:#4a89dc!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:#e0ebf9}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "component", type: i6.NovoItemEndElement, selector: "item-end, novo-item-end" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MixedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'mixed-multi-picker-results', template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="mixed-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`, standalone: false, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid #ffffff;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e0ebf9}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:#4a89dc!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:#e0ebf9}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });

// NG2
class PickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getEmptyMessage() {
        if (this.shouldShowMessageForZeroLengthSearch()) {
            // this property comes from Field Interactions
            return this.config.emptyPickerMessage;
        }
        else {
            return this.term === '' ? this.labels.pickerTextFieldEmpty : this.labels.pickerEmpty;
        }
    }
    shouldShowMessageForZeroLengthSearch() {
        return this.config && this.config.minSearchLength === 0 && this.term === '' && this.config.emptyPickerMessage;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: PickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: PickerResults, isStandalone: false, selector: "picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, styles: ["picker-results,entity-picker-results{background:#fff;color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}picker-results .novo-list,entity-picker-results .novo-list{border:1px solid #4a89dc}picker-results .novo-list .novo-list-item,entity-picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}picker-results .novo-list .novo-list-item>div,entity-picker-results .novo-list .novo-list-item>div{width:100%}picker-results .novo-list .novo-list-item.active,entity-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}picker-results .novo-list .novo-list-item:hover,entity-picker-results .novo-list .novo-list-item:hover{background-color:#f1f6fc}picker-results .novo-list .novo-list-item .novo-item-content,entity-picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}picker-results .novo-list .novo-list-item .novo-item-content>*,entity-picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}picker-results picker-error,picker-results picker-loader,picker-results picker-null-recent-results,picker-results picker-null-results,picker-results .picker-error,picker-results .picker-loader,picker-results .picker-null-recent-results,picker-results .picker-null-results,entity-picker-results picker-error,entity-picker-results picker-loader,entity-picker-results picker-null-recent-results,entity-picker-results picker-null-results,entity-picker-results .picker-error,entity-picker-results .picker-loader,entity-picker-results .picker-null-recent-results,entity-picker-results .picker-null-results{background-color:#fff;text-align:center;color:#b5b5b5;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:.5rem}picker-results p.picker-error,picker-results p.picker-loader,picker-results p.picker-null-recent-results,picker-results p.picker-null-results,entity-picker-results p.picker-error,entity-picker-results p.picker-loader,entity-picker-results p.picker-null-recent-results,entity-picker-results p.picker-null-results{max-width:inherit;padding:5px}picker-results picker-loader,picker-results .picker-loader,entity-picker-results picker-loader,entity-picker-results .picker-loader{background-color:#fff;display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}picker-results section,entity-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}picker-results,.picker-results,quick-note-results,.quick-note-results{background-color:#fff;cursor:default;line-height:26px;width:100%;display:block}picker-results novo-list,picker-results ul,.picker-results novo-list,.picker-results ul,quick-note-results novo-list,quick-note-results ul,.quick-note-results novo-list,.quick-note-results ul{background-color:#fff;max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li{font-size:.9em;padding:5px 16px}picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6{padding-top:0;font-weight:400;color:#93a0a9}picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong{font-weight:400;color:#3d464d}picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover{background-color:#e0ebf9}picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled{opacity:.5;pointer-events:none}picker-results novo-list novo-loading,picker-results ul novo-loading,.picker-results novo-list novo-loading,.picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading{justify-content:center}picker-results ul li,.picker-results ul li,quick-note-results ul li,.quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}picker-results.active,.picker-results.active,quick-note-results.active,.quick-note-results.active{z-index:1000}picker-results:focus,.picker-results:focus,quick-note-results:focus,.quick-note-results:focus{outline:none}entity-picker-results{background:#fff;width:100%;min-width:250px}entity-picker-results novo-list{background:#fff;min-width:30rem;max-height:49vh;overflow:auto}entity-picker-results novo-list .novo-item-content{margin-top:.5rem;margin-left:1.8rem;row-gap:1rem}entity-picker-results novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-picker-results novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:#fff;padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid #4a89dc}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:#fff;max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid #e2e2e2;cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "pipe", type: i6$1.HighlightPipe, name: "highlight" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: PickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'picker-results', host: {
                        class: 'active',
                    }, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, encapsulation: ViewEncapsulation.None, standalone: false, styles: ["picker-results,entity-picker-results{background:#fff;color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}picker-results .novo-list,entity-picker-results .novo-list{border:1px solid #4a89dc}picker-results .novo-list .novo-list-item,entity-picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}picker-results .novo-list .novo-list-item>div,entity-picker-results .novo-list .novo-list-item>div{width:100%}picker-results .novo-list .novo-list-item.active,entity-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}picker-results .novo-list .novo-list-item:hover,entity-picker-results .novo-list .novo-list-item:hover{background-color:#f1f6fc}picker-results .novo-list .novo-list-item .novo-item-content,entity-picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}picker-results .novo-list .novo-list-item .novo-item-content>*,entity-picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}picker-results picker-error,picker-results picker-loader,picker-results picker-null-recent-results,picker-results picker-null-results,picker-results .picker-error,picker-results .picker-loader,picker-results .picker-null-recent-results,picker-results .picker-null-results,entity-picker-results picker-error,entity-picker-results picker-loader,entity-picker-results picker-null-recent-results,entity-picker-results picker-null-results,entity-picker-results .picker-error,entity-picker-results .picker-loader,entity-picker-results .picker-null-recent-results,entity-picker-results .picker-null-results{background-color:#fff;text-align:center;color:#b5b5b5;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:.5rem}picker-results p.picker-error,picker-results p.picker-loader,picker-results p.picker-null-recent-results,picker-results p.picker-null-results,entity-picker-results p.picker-error,entity-picker-results p.picker-loader,entity-picker-results p.picker-null-recent-results,entity-picker-results p.picker-null-results{max-width:inherit;padding:5px}picker-results picker-loader,picker-results .picker-loader,entity-picker-results picker-loader,entity-picker-results .picker-loader{background-color:#fff;display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}picker-results section,entity-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}picker-results,.picker-results,quick-note-results,.quick-note-results{background-color:#fff;cursor:default;line-height:26px;width:100%;display:block}picker-results novo-list,picker-results ul,.picker-results novo-list,.picker-results ul,quick-note-results novo-list,quick-note-results ul,.quick-note-results novo-list,.quick-note-results ul{background-color:#fff;max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li{font-size:.9em;padding:5px 16px}picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6{padding-top:0;font-weight:400;color:#93a0a9}picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong{font-weight:400;color:#3d464d}picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover{background-color:#e0ebf9}picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled{opacity:.5;pointer-events:none}picker-results novo-list novo-loading,picker-results ul novo-loading,.picker-results novo-list novo-loading,.picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading{justify-content:center}picker-results ul li,.picker-results ul li,quick-note-results ul li,.quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}picker-results.active,.picker-results.active,quick-note-results.active,.quick-note-results.active{z-index:1000}picker-results:focus,.picker-results:focus,quick-note-results:focus,.quick-note-results:focus{outline:none}entity-picker-results{background:#fff;width:100%;min-width:250px}entity-picker-results novo-list{background:#fff;min-width:30rem;max-height:49vh;overflow:auto}entity-picker-results novo-list .novo-item-content{margin-top:.5rem;margin-left:1.8rem;row-gap:1rem}entity-picker-results novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-picker-results novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:#fff;padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid #4a89dc}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:#fff;max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid #e2e2e2;cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:#e0ebf9}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }] });

// NG2
class SkillsSpecialtyPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.element = element;
        this.labels = labels;
        this.active = true;
        this.limitedTo = false;
        this.limit = 200;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        let data = collection;
        if (collection.hasOwnProperty('data')) {
            this.limitedTo = collection.limitedTo200;
            this.total = collection.total;
            data = collection.data;
        }
        else if (data.length > this.limit) {
            this.limitedTo = true;
            this.total = data.length;
            data = data.slice(0, this.limit);
        }
        return super.structureArray(data);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SkillsSpecialtyPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: SkillsSpecialtyPickerResults, isStandalone: false, selector: "skill-specialty-picker-results", host: { properties: { "class.active": "this.active" } }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length"><novo-loading theme="line"></novo-loading></section>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content>
          <h6><span [innerHtml]="match.label | highlight:term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight:term"></span>
          </div>
        </item-content>
      </novo-list-item>
      <novo-list-item *ngIf="limitedTo"
        ><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item
      >
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
  `, isInline: true, styles: [":host{display:block;width:100%;color:#000;max-width:none;z-index:99;background:#fff}:host.active{border:1px solid #4a89dc}:host novo-list{list-style:none;padding:0;margin:0;max-height:330px;overflow-y:auto;overflow-x:hidden}:host novo-list novo-list-item{cursor:pointer;padding:10px 16px;box-sizing:border-box;display:block}:host novo-list novo-list-item item-content{flex-direction:column}:host novo-list novo-list-item item-content h6{padding-top:0}:host novo-list novo-list-item div{color:gray}:host novo-list novo-list-item span{display:inline-block;min-width:100px;margin:2px 0}:host novo-list novo-list-item.active,:host novo-list novo-list-item:focus,:host novo-list novo-list-item:hover{background-color:#e0ebf9}:host novo-list novo-list-item.disabled{opacity:.5;pointer-events:none}:host novo-list novo-loading{justify-content:center}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .picker-error,:host .picker-loading,:host .picker-null{text-align:center;color:#b5b5b5}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "pipe", type: i6$1.HighlightPipe, name: "highlight" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SkillsSpecialtyPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'skill-specialty-picker-results', template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length"><novo-loading theme="line"></novo-loading></section>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content>
          <h6><span [innerHtml]="match.label | highlight:term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight:term"></span>
          </div>
        </item-content>
      </novo-list-item>
      <novo-list-item *ngIf="limitedTo"
        ><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item
      >
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
  `, standalone: false, styles: [":host{display:block;width:100%;color:#000;max-width:none;z-index:99;background:#fff}:host.active{border:1px solid #4a89dc}:host novo-list{list-style:none;padding:0;margin:0;max-height:330px;overflow-y:auto;overflow-x:hidden}:host novo-list novo-list-item{cursor:pointer;padding:10px 16px;box-sizing:border-box;display:block}:host novo-list novo-list-item item-content{flex-direction:column}:host novo-list novo-list-item item-content h6{padding-top:0}:host novo-list novo-list-item div{color:gray}:host novo-list novo-list-item span{display:inline-block;min-width:100px;margin:2px 0}:host novo-list novo-list-item.active,:host novo-list novo-list-item:focus,:host novo-list novo-list-item:hover{background-color:#e0ebf9}:host novo-list novo-list-item.disabled{opacity:.5;pointer-events:none}:host novo-list novo-loading{justify-content:center}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .picker-error,:host .picker-loading,:host .picker-null{text-align:center;color:#b5b5b5}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });

// NG2
class WorkersCompCodesPickerResults extends PickerResults {
    constructor(element, sanitizer, labels, ref) {
        super(element, labels, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
    }
    sanitizeHTML(compCode, name) {
        return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: WorkersCompCodesPickerResults, deps: [{ token: i0.ElementRef }, { token: i1$1.DomSanitizer }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: WorkersCompCodesPickerResults, isStandalone: false, selector: "workers-comp-codes-picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { kind: "component", type: i6.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: WorkersCompCodesPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'workers-comp-codes-picker-results',
                    host: {
                        class: 'active',
                    },
                    template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$1.DomSanitizer }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }] });

// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true,
};
const DEFAULT_DEBOUNCE_TIME = 250;
/**
 * @description This class is the directive definition of the Picker. If you add an attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
class NovoPickerElement {
    // Disable from typing into the picker (result template does everything)
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    constructor(element, componentUtils, ref) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.ref = ref;
        this.closeOnSelect = true;
        this.selected = [];
        // Deprecated
        this.appendToBody = false;
        // Deprecated
        this.parentScrollAction = 'close';
        // Side the dropdown will open
        this.side = 'left';
        // Autoselects the first option in the results
        this.autoSelectFirstOption = true;
        this.allowCustomValues = false;
        this.allowTabNavigation = false;
        this._disablePickerInput = false;
        // Emitter for selects
        this.changed = new EventEmitter();
        this.select = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.typing = new EventEmitter();
        this.tab = new EventEmitter();
        this.term = '';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        if (this.overrideElement) {
            this.element = this.overrideElement;
        }
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        let debounceTimeInMilliSeconds = Number.isNaN(Number(this.config?.debounceTimeInMilliSeconds)) ? DEFAULT_DEBOUNCE_TIME : Number(this.config?.debounceTimeInMilliSeconds);
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;
        const pasteObserver = fromEvent(this.input.nativeElement, 'paste').pipe(debounceTime(debounceTimeInMilliSeconds), distinctUntilChanged());
        pasteObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
        const keyboardObserver = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(debounceTimeInMilliSeconds), distinctUntilChanged());
        keyboardObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
    }
    onDebouncedKeyup(event) {
        if (["Escape" /* Key.Escape */, "ArrowDown" /* Key.ArrowDown */, "ArrowUp" /* Key.ArrowUp */, "Enter" /* Key.Enter */, "Tab" /* Key.Tab */].some((key) => key === event.key)) {
            return;
        }
        this.show(event.target.value);
    }
    openPanel() {
        this.container.openPanel();
    }
    closePanel() {
        this.container.closePanel();
    }
    get panelOpen() {
        return this.container && this.container.panelOpen;
    }
    show(term) {
        this.openPanel();
        // Show the results inside
        this.showResults(term);
    }
    onKeyDown(event) {
        if (this.disablePickerInput) {
            Helpers.swallowEvent(event);
            return;
        }
        if (this.panelOpen && !this.disablePickerInput) {
            if (event.key === "Escape" /* Key.Escape */ || (event.key === "Tab" /* Key.Tab */ && !this.allowTabNavigation)) {
                this.hideResults();
                return;
            }
            if (event.key === "ArrowUp" /* Key.ArrowUp */) {
                this.popup.instance.prevActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "ArrowDown" /* Key.ArrowDown */) {
                this.popup.instance.nextActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "Enter" /* Key.Enter */) {
                const activeMatch = this.popup.instance.activeMatch;
                if (!this.selected.find((selected) => activeMatch && activeMatch.value && selected.value === activeMatch.value)) {
                    this.popup.instance.selectActiveMatch();
                    this.ref.markForCheck();
                }
                return;
            }
            if ((event.key === "Backspace" /* Key.Backspace */ || event.key === "Delete" /* Key.Delete */) && !Helpers.isEmpty(this._value) && (this._value === this.term)) {
                this.clearValue(false);
                this.closePanel();
            }
            if (event.key === "Delete" /* Key.Delete */ && Helpers.isBlank(this._value)) {
                this.clearValue(true);
            }
        }
        if (this.allowTabNavigation && event.key === "Tab" /* Key.Tab */) {
            this.closePanel();
            this.tab.emit();
        }
    }
    clearValue(wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.changed.emit({ value: this._value, rawValue: { label: '', value: this._value } });
        this.onModelChange(this._value);
        if (wipeTerm) {
            this.term = '';
            if (this.popup?.instance) {
                this.popup.instance.customTextValue = null;
            }
            this.hideResults();
        }
        this.ref.markForCheck();
    }
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
        if (!this.panelOpen) {
            this.show();
        }
        this.focus.emit(event);
    }
    // Creates an instance of the results (called popup) and adds all the bindings to that instance.
    showResults(term) {
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.ref.markForCheck();
        }
        else {
            this.popup = this.componentUtils.append(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.popup.instance.overlay = this.container.overlayRef;
            this.ref.markForCheck();
        }
    }
    // Tells the overlay component to hide the picker results from the DOM without deleting the dynamically allocated popup instance created in
    // showResults. The popup instance will remain in memory from the first time the results are shown until this component is destroyed.
    hideResults(err) {
        this.closePanel();
        this.ref.markForCheck();
    }
    // Cleans up listeners for the popup - will get executed no matter how the popup is closed.
    onOverlayClosed() {
        if (this.popup && this.popup.instance && this.popup.instance.cleanUp) {
            this.popup.instance.cleanUp();
        }
    }
    // get accessor
    get value() {
        return this._value;
    }
    // set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(this._value);
        }
        else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: selected.value } });
            this.select.emit(selected);
            this.onModelChange(selected.value);
            if (this.popup) {
                this.popup.instance.selected = this.selected;
            }
        }
        else {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
            this.select.emit(selected);
        }
        this.ref.markForCheck();
    }
    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        this.typing.emit(event);
        if (this.allowCustomValues) {
            if (this.term) {
                this.popup.instance.customTextValue = { label: this.term, value: this.term };
            }
            else {
                this.popup.instance.customTextValue = null;
            }
        }
        if ((!event || !event.length) && !Helpers.isEmpty(this._value)) {
            this._value = null;
            this.onModelChange(this._value);
        }
        this.ref.markForCheck();
    }
    // Set touched on blur
    onTouched(event) {
        this.onModelTouched();
        this.blur.emit(event);
    }
    // From ControlValueAccessor interface
    writeValue(value) {
        if (this.clearValueOnSelect) {
            this.term = '';
        }
        else {
            if (typeof value === 'string' && !this.config.useGetLabels) {
                this.term = value;
            }
            else if (value && value.label) {
                this.term = value.label;
            }
            else if (value && value.firstName) {
                this.term = `${value.firstName} ${value.lastName}`;
            }
            else if (value && value.name) {
                this.term = value.name;
            }
            else if (typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then((result) => {
                    if (result) {
                        this.term = result.length ? result[0].label || '' : result.label || '';
                    }
                    else {
                        this.term = value;
                    }
                    this.ref.markForCheck();
                });
            }
            else if (value && value.title) {
                this.term = value.title;
            }
            else {
                this.term = value || '';
            }
        }
        this._value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this._disablePickerInput = disabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoPickerElement, isStandalone: false, selector: "novo-picker", inputs: { config: "config", placeholder: "placeholder", clearValueOnSelect: "clearValueOnSelect", closeOnSelect: "closeOnSelect", selected: "selected", appendToBody: "appendToBody", parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", autoSelectFirstOption: "autoSelectFirstOption", overrideElement: "overrideElement", maxlength: "maxlength", allowCustomValues: "allowCustomValues", width: "width", minWidth: "minWidth", allowTabNavigation: "allowTabNavigation", disablePickerInput: "disablePickerInput" }, outputs: { changed: "changed", select: "select", focus: "focus", blur: "blur", typing: "typing", tab: "tab" }, providers: [PICKER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "results", first: true, predicate: ["results"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "container", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
    <i class="bhi-more" *ngIf="config?.entityIcon && !_value"></i>
    <i class="bhi-{{ config?.entityIcon }} entity-icon {{ config?.entityIcon }}" *ngIf="config?.entityIcon && _value"></i>
    <input
      type="text"
      class="picker-input"
      [(ngModel)]="term"
      [class.entity-picker]="config?.entityIcon"
      [class.entity-selected]="config?.entityIcon && _value"
      (ngModelChange)="checkTerm($event)"
      [placeholder]="placeholder"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (click)="onFocus($event)"
      (blur)="onTouched($event)"
      [maxlength]="maxlength"
      autocomplete="off"
      #input
      [disabled]="disablePickerInput"
    />
    <i class="bhi-search" *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput"></i>
    <i
      class="bhi-times"
      [class.entity-selected]="config?.entityIcon && _value"
      *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
      (click)="clearValue(true)"
    ></i>
    <novo-overlay-template class="picker-results-container" [parent]="element" [width]="width" [minWidth]="minWidth" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `, isInline: true, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652);border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid rgb(94.8152173913,108.8043478261,119.6847826087)}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed rgb(175.4891304348,184.7826086957,192.0108695652)!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000}novo-picker i.entity-icon.white{background:#fff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#39d}novo-picker i.entity-icon.candidate{background:#4b7}novo-picker i.entity-icon.lead{background:#a69}novo-picker i.entity-icon.contact{background:#fa4}novo-picker i.entity-icon.clientcontact{background:#fa4}novo-picker i.entity-icon.opportunity{background:#625}novo-picker i.entity-icon.job{background:#b56}novo-picker i.entity-icon.joborder{background:#b56}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.task{background:#4f5361}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0;font-size:1.2rem}novo-picker i.bhi-times{top:0;cursor:pointer;font-size:1.2rem}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker', providers: [PICKER_VALUE_ACCESSOR], template: `
    <i class="bhi-more" *ngIf="config?.entityIcon && !_value"></i>
    <i class="bhi-{{ config?.entityIcon }} entity-icon {{ config?.entityIcon }}" *ngIf="config?.entityIcon && _value"></i>
    <input
      type="text"
      class="picker-input"
      [(ngModel)]="term"
      [class.entity-picker]="config?.entityIcon"
      [class.entity-selected]="config?.entityIcon && _value"
      (ngModelChange)="checkTerm($event)"
      [placeholder]="placeholder"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (click)="onFocus($event)"
      (blur)="onTouched($event)"
      [maxlength]="maxlength"
      autocomplete="off"
      #input
      [disabled]="disablePickerInput"
    />
    <i class="bhi-search" *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput"></i>
    <i
      class="bhi-times"
      [class.entity-selected]="config?.entityIcon && _value"
      *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
      (click)="clearValue(true)"
    ></i>
    <novo-overlay-template class="picker-results-container" [parent]="element" [width]="width" [minWidth]="minWidth" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `, encapsulation: ViewEncapsulation.None, standalone: false, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652);border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid rgb(94.8152173913,108.8043478261,119.6847826087)}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed rgb(175.4891304348,184.7826086957,192.0108695652)!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000}novo-picker i.entity-icon.white{background:#fff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#39d}novo-picker i.entity-icon.candidate{background:#4b7}novo-picker i.entity-icon.lead{background:#a69}novo-picker i.entity-icon.contact{background:#fa4}novo-picker i.entity-icon.clientcontact{background:#fa4}novo-picker i.entity-icon.opportunity{background:#625}novo-picker i.entity-icon.job{background:#b56}novo-picker i.entity-icon.joborder{background:#b56}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.task{background:#4f5361}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0;font-size:1.2rem}novo-picker i.bhi-times{top:0;cursor:pointer;font-size:1.2rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i0.ChangeDetectorRef }], propDecorators: { results: [{
                type: ViewChild,
                args: ['results', { read: ViewContainerRef, static: true }]
            }], config: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], clearValueOnSelect: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], selected: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], parentScrollSelector: [{
                type: Input
            }], parentScrollAction: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], side: [{
                type: Input
            }], autoSelectFirstOption: [{
                type: Input
            }], overrideElement: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], allowCustomValues: [{
                type: Input
            }], width: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], allowTabNavigation: [{
                type: Input
            }], disablePickerInput: [{
                type: Input
            }], changed: [{
                type: Output
            }], select: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], typing: [{
                type: Output
            }], tab: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent, { static: true }]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }] } });

// NG2
class NovoPickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerModule, declarations: [NovoPickerElement,
            PickerResults,
            EntityPickerResult,
            EntityPickerResults,
            ChecklistPickerResults,
            GroupedMultiPickerResults,
            MixedMultiPickerResults,
            DistributionListPickerResults,
            WorkersCompCodesPickerResults,
            SkillsSpecialtyPickerResults], imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule], exports: [NovoPickerElement,
            PickerResults,
            EntityPickerResult,
            EntityPickerResults,
            ChecklistPickerResults,
            GroupedMultiPickerResults,
            MixedMultiPickerResults,
            DistributionListPickerResults,
            WorkersCompCodesPickerResults,
            SkillsSpecialtyPickerResults] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerModule, imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule],
                    declarations: [
                        NovoPickerElement,
                        PickerResults,
                        EntityPickerResult,
                        EntityPickerResults,
                        ChecklistPickerResults,
                        GroupedMultiPickerResults,
                        MixedMultiPickerResults,
                        DistributionListPickerResults,
                        WorkersCompCodesPickerResults,
                        SkillsSpecialtyPickerResults,
                    ],
                    exports: [
                        NovoPickerElement,
                        PickerResults,
                        EntityPickerResult,
                        EntityPickerResults,
                        ChecklistPickerResults,
                        GroupedMultiPickerResults,
                        MixedMultiPickerResults,
                        DistributionListPickerResults,
                        WorkersCompCodesPickerResults,
                        SkillsSpecialtyPickerResults,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BasePickerResults, ChecklistPickerResults, DistributionListPickerResults, EntityPickerResult, EntityPickerResults, GroupedMultiPickerResults, MixedMultiPickerResults, NovoPickerElement, NovoPickerModule, PickerResults, SkillsSpecialtyPickerResults, WorkersCompCodesPickerResults };
//# sourceMappingURL=novo-elements-elements-picker.mjs.map
