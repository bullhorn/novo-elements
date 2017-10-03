import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
                    [class.active]="selectedCategory === 'all'"
                    [class.disabled]="isLoading">
                    <item-content>
                        <span>{{ labels.all }}</span>
                    </item-content>
                    <item-end>
                        <i class="bhi-next"></i>
                    </item-end>
                </novo-list-item>
                <novo-list-item
                    *ngFor="let category of categories"
                    (click)="selectCategory(category)"
                    [class.active]="selectedCategory === category.value"
                    [class.disabled]="isLoading">
                    <item-content>
                        <span>{{ category.label }}</span>
                    </item-content>
                    <item-end>
                        <i class="bhi-next"></i>
                    </item-end>
                </novo-list-item>
            </novo-list>
        </div>
        <div class="grouped-multi-picker-matches">
            <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory">
                <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading"/>
                <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading"></i>
                <i class="bhi-times" *ngIf="searchTerm" (click)="clearSearchTerm($event)" [class.disabled]="isLoading"></i>
            </div>
            <div class="grouped-multi-picker-list-container">
                <novo-list direction="vertical" #list>
                    <novo-list-item
                        *ngFor="let match of matches"
                        (click)="selectMatch($event)"
                        [class.active]="match === activeMatch"
                        (mouseenter)="selectActive(match)"
                        [class.disabled]="preselected(match)"
                        [class.disabled]="isLoading">
                        <item-content>
                            <span>{{ match.label }}</span>
                        </item-content>
                    </novo-list-item>
                </novo-list>
                <div class="grouped-multi-picker-no-results" *ngIf="matches.length === 0 && !isLoading && selectedCategory">
                    {{ labels.groupedMultiPickerEmpty }}
                </div>
                <div class="grouped-multi-picker-no-category" *ngIf="matches.length === 0 && !isLoading && !selectedCategory">
                    {{ labels.groupedMultiPickerSelectCategory }}
                </div>
                <div class="grouped-multi-picker-loading" *ngIf="isLoading">
                    <novo-loading theme="line"></novo-loading>
                </div>
            </div>
        </div>
    `
})
export class GroupedMultiPickerResults extends BasePickerResults implements OnInit, OnDestroy {
    @ViewChild('input') private inputElement: ElementRef;
    @ViewChild('list') private listElement: NovoListElement;

    public selectedCategory: string;
    public searchTerm: string;

    private keyboardSubscription: Subscription;
    private internalMap: Map<string, { value: string, label: string, items: { value: string, label: string }[] }> = new Map<string, { value: string, label: string, items: { value: string, label: string }[] }>();

    set term(value) {
        // Display all only will work for static categories
        if (this.config.displayAll && this.config.getItemsForCategoryAsync) {
            throw new Error('[NovoChips] - you can only have `displayAll` with a static `categoryMap`. Not available with `getItemsForCategoryAsync`');
        }
        // Configure ALL
        if (this.config.displayAll) {
            this.setAllCategory();
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }

    get categories() {
        if (this.config.categories || this.config.categoryMap) {
            return this.config.categories || Array.from(this.config.categoryMap.values());
        }
        return [];
    }

    constructor(element: ElementRef, private renderer: Renderer2, public labels: NovoLabelService) {
        super(element);
    }

    public ngOnInit() {
        // Subscribe to keyboard events and debounce
        this.keyboardSubscription = Observable.fromEvent(this.inputElement.nativeElement, 'keyup')
            .debounceTime(350)
            .distinctUntilChanged()
            .subscribe((event: KeyboardEvent) => {
                this.searchTerm = event.target['value'];
                this.matches = this.filterData();
            });
    }

    public ngOnDestroy() {
        // Cleanup
        this.keyboardSubscription.unsubscribe();
    }

    public setAllCategory() {
        // If we have display all, set the all categories up
        if (this.config.displayAll) {
            this.selectedCategory = 'all';
            let allItems = [];
            Array.from(this.config.categoryMap.values()).forEach((v: { value: string, label: string, items: any[] }) => allItems.push(...v.items));
            this.matches = allItems;
            this.config.categoryMap.set('all', { value: 'all', label: 'All', items: allItems });
        }
    }

    public selectCategory(category: { value: string, label: string }): void {
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        let key: string = category.value;
        this.selectedCategory = key;
        // Clear
        this.matches = [];
        // Get new matches
        if (this.config.categoryMap) {
            this.matches = this.filter(this.config.categoryMap.get(key).items);
        } else {
            if (!this.config.getItemsForCategoryAsync) {
                throw new Error('The "config" for the Chips must include a function "getItemsForCategoryAsync(categoryKey: string)" to retrieve the items by category. Or if you have static data provide a "categoryMap"');
            }
            if (!this.internalMap.get(key)) {
                this.isLoading = true;
                this.config.getItemsForCategoryAsync(key).then((items: { value: string, label: string }[]) => {
                    this.internalMap.set(key, { value: category.value, label: category.label, items: items });
                    this.matches = this.filter(items);
                    this.isLoading = false;
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
            } else {
                this.matches = this.filter(this.internalMap.get(key).items);
            }
        }
    }

    public clearSearchTerm(event: MouseEvent) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectCategory({ value: this.selectedCategory, label: '' });
    }

    public selectMatch(event?: MouseEvent, item?: { value: string, label: string }): boolean {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event, item);
    }

    filterData(): { value: string, label: string }[] {
        if (this.selectedCategory) {
            if (this.config.categoryMap) {
                return this.filter(this.config.categoryMap.get(this.selectedCategory).items);
            } else {
                return this.filter(this.internalMap.get(this.selectedCategory).items);
            }
        }
        return [];
    }

    private filter(array: { value: string, label: string }[]): { value: string, label: string }[] {
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedCategory) {
            return array.filter((match) => {
                return ~String(match.label).toLowerCase().indexOf(this.searchTerm.toLowerCase());
            });
        }
        return array;
    }
}
