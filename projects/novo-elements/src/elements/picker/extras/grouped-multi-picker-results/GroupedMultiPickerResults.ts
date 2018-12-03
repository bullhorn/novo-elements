import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { Helpers } from '../../../../utils/Helpers';
import { NovoListElement } from '../../../list/List';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'grouped-multi-picker-results',
  template: `
        <div class="grouped-multi-picker-groups">
            <novo-list direction="vertical">
                <novo-list-item
                    *ngIf="config.displayAll"
                    (click)="selectCategory({ value: 'all', label: 'all' })"
                    [class.active]="selectedCategory?.value === 'all'"
                    data-automation-id="display-all"
                    [class.disabled]="isLoading">
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
                    [class.disabled]="isLoading">
                    <item-content>
                        <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
                        <span data-automation-id="label">{{ category.label }}</span>
                    </item-content>
                    <item-end>
                        <i class="bhi-next"></i>
                    </item-end>
                </novo-list-item>
            </novo-list>
            <footer class="grouped-multi-picker-groups-footer" *ngIf="customFilterEnabled" data-automation-id="footer" [class.disabled]="isLoading">
                <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
                <label data-automation-id="label">{{ customFilterLabel }}</label>
            </footer>
        </div>
        <div class="grouped-multi-picker-matches">
            <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
                <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder"/>
                <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
                <i class="bhi-times" *ngIf="searchTerm" (click)="clearSearchTerm($event)" [class.disabled]="isLoading" data-automation-id="remove-icon"></i>
            </div>
            <div class="grouped-multi-picker-list-container">
                <novo-list direction="vertical" #list>
                    <novo-list-item
                        *ngFor="let match of matches"
                        (click)="selectMatch($event)"
                        [class.active]="match === activeMatch"
                        (mouseenter)="selectActive(match)"
                        [class.disabled]="preselected(match) || isLoading"
                        [attr.data-automation-id]="match.label">
                        <item-content>
                            <span>{{ match.label }}</span>
                        </item-content>
                    </novo-list-item>
                </novo-list>
                <div class="grouped-multi-picker-no-results" *ngIf="matches.length === 0 && !isLoading && selectedCategory" data-automation-id="empty-message">
                    {{ labels.groupedMultiPickerEmpty }}
                </div>
                <div class="grouped-multi-picker-no-category" *ngIf="matches.length === 0 && !isLoading && !selectedCategory" data-automation-id="select-category-message">
                    {{ labels.groupedMultiPickerSelectCategory }}
                </div>
                <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
                    <novo-loading theme="line"></novo-loading>
                </div>
            </div>
        </div>
    `,
})
export class GroupedMultiPickerResults extends BasePickerResults implements OnInit, OnDestroy {
  @ViewChild('input')
  private inputElement: ElementRef;
  @ViewChild('list')
  private listElement: NovoListElement;

  public selectedCategory: { value: string; label: string };
  public searchTerm: string;
  public customFilterEnabled: boolean = false;
  public customFilterLabel: string;
  public placeholder: string = '';

  private keyboardSubscription: Subscription;
  private internalMap: Map<string, { value: string; label: string; items: { value: string; label: string }[] }> = new Map<
    string,
    { value: string; label: string; items: { value: string; label: string }[] }
  >();
  public customFilterValue: any;

  set term(value) {
    // Display all only will work for static categories
    if (this.config.displayAll && this.config.getItemsForCategoryAsync) {
      throw new Error(
        '[GroupedMultiPickerResults] - you can only have `displayAll` with a static `categoryMap`. Not available with `getItemsForCategoryAsync`',
      );
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
    } else {
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
      return (
        this.config.categories ||
        Array.from(this.config.categoryMap.values()).filter((category: { value: string }) => {
          return category.value !== 'all';
        })
      );
    }
    return [];
  }

  constructor(element: ElementRef, private renderer: Renderer2, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  public ngOnInit() {
    // Subscribe to keyboard events and debounce
    this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
      )
      .subscribe((event: KeyboardEvent) => {
        this.searchTerm = event.target['value'];
        this.matches = this.filterData();
        this.ref.markForCheck();
      });
  }

  public ngOnDestroy() {
    // Cleanup
    this.keyboardSubscription.unsubscribe();
  }

  public setAllCategory() {
    // If we have display all, set the all categories up
    if (this.config.displayAll) {
      this.selectedCategory = { value: 'all', label: 'all' };
      let allItems = [];
      Array.from(this.config.categoryMap.values())
        .filter((category: { value: string }) => {
          return category.value !== 'all';
        })
        .forEach((v: { value: string; label: string; items: any[] }) => allItems.push(...v.items));
      this.matches = this.filter(allItems);
      this.config.categoryMap.set('all', { value: 'all', label: 'All', items: allItems });
      this.ref.markForCheck();
    }
  }

  public selectCategory(category: { value: string; label: string }): void {
    // Scroll to top
    this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
    // Set focus
    this.inputElement.nativeElement.focus();
    // Find new items
    let key: string = category.value;
    this.selectedCategory = category;
    // Clear
    this.matches = [];
    this.ref.markForCheck();
    // New matches
    this.getNewMatches(category, key);
  }

  public clearSearchTerm(event: MouseEvent) {
    Helpers.swallowEvent(event);
    this.searchTerm = '';
    this.selectCategory({ value: this.selectedCategory.value, label: this.selectedCategory.label });
    this.ref.markForCheck();
  }

  public selectMatch(event?: MouseEvent, item?: { value: string; label: string }): boolean {
    // Set focus
    this.inputElement.nativeElement.focus();
    return super.selectMatch(event);
  }

  public fireCustomFilter(value: boolean) {
    this.customFilterValue = value;
    // Clear cache map
    this.internalMap.clear();
    // Only fire if we have a selected category
    if (this.selectCategory) {
      // Find new items
      let key: string = this.selectedCategory.value;
      // Get new matches
      this.getNewMatches(this.selectedCategory, key);
      this.ref.markForCheck();
    }
    // Focus
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  filterData(): { value: string; label: string }[] {
    if (this.selectedCategory) {
      if (this.config.categoryMap) {
        return this.filter(this.config.categoryMap.get(this.selectedCategory.value).items);
      } else {
        return this.filter(this.internalMap.get(this.selectedCategory.value).items);
      }
    }
    return [];
  }

  private getNewMatches(category: { value: string; label: string }, key: string): void {
    // Get new matches
    if (this.config.categoryMap) {
      this.matches = this.filter(this.config.categoryMap.get(key).items);
      this.ref.markForCheck();
    } else {
      if (!this.config.getItemsForCategoryAsync) {
        throw new Error(
          'The "config" for the Chips must include a function "getItemsForCategoryAsync(categoryKey: string)" to retrieve the items by category. Or if you have static data provide a "categoryMap"',
        );
      }
      if (!this.internalMap.get(key)) {
        this.isLoading = true;
        this.config.getItemsForCategoryAsync(key, this.customFilterValue).then((items: { value: string; label: string }[]) => {
          this.internalMap.set(key, { value: category.value, label: category.label, items: items });
          this.matches = this.filter(items, true);
          this.isLoading = false;
          this.ref.markForCheck();
          setTimeout(() => {
            this.inputElement.nativeElement.focus();
          });
        });
      } else {
        this.matches = this.filter(this.internalMap.get(key).items);
        this.ref.markForCheck();
      }
    }
  }

  private filter(
    array: { value: string; label: string; filterValue?: any }[],
    ignoreCustomFilter: boolean = false,
  ): { value: string; label: string }[] {
    let matches: { value: string; label: string; filterValue?: any }[] = array;
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
}
