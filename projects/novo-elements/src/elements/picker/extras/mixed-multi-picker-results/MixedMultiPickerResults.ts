import { ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';
import { NovoListElement } from '../../../list/List';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

export interface IMixedMultiPickerOption {
  value: string;
  label: string;
  secondaryOptions?: {
    value: string;
    label: string;
    filterValue?: any;
  }[];
  getSecondaryOptionsAsync?(): Promise<{ value: string; label: string }[]>;
  // TODO: Refactor to prevent the need for a behaviorSubject to allow primaryOption's secondaryOptions to be cleared
  // Currently secondaryOptions cannot be cleared via FieldInteraction API and must use a behavior subject - this includes modifyPickerConfig
  clearSecondaryOptions?: Subject<any>;
  showSearchOnSecondaryOptions?: boolean;
}

@Component({
  selector: 'mixed-multi-picker-results',
  template: ` <div class="mixed-multi-picker-groups">
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
    </div>`,
})
export class MixedMultiPickerResults extends BasePickerResults implements OnDestroy {
  @ViewChild('input', { static: true })
  private inputElement: ElementRef;
  @ViewChild('list')
  private listElement: NovoListElement;

  public selectedPrimaryOption: IMixedMultiPickerOption;
  public searchTerm: string;
  public placeholder: string = '';
  public emptyOptionsLabel: string = '';

  private keyboardSubscription: Subscription;

  private internalMap: Map<string, { value: string; label: string; items: { value: string; label: string }[] }> = new Map<
    string,
    { value: string; label: string; items: { value: string; label: string }[] }
  >();

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

  constructor(element: ElementRef, private renderer: Renderer2, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  public ngOnDestroy() {
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

  public selectPrimaryOption(primaryOption: IMixedMultiPickerOption, event?: MouseEvent): void {
    if (this.keyboardSubscription) {
      this.keyboardSubscription.unsubscribe();
    }
    // Scroll to top
    this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
    // Set focus
    this.inputElement.nativeElement.focus();
    // Find new items
    const key: string = primaryOption.value;
    this.selectedPrimaryOption = primaryOption;
    // Clear
    this.matches = [];
    this.ref.markForCheck();
    // New matches
    if (this.optionHasSecondaryOptions(primaryOption)) {
      // Subscribe to keyboard events and debounce
      this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
        .pipe(debounceTime(350), distinctUntilChanged())
        .subscribe((keyEvent: KeyboardEvent) => {
          this.searchTerm = (keyEvent.target as HTMLInputElement).value;
          this.matches = this.filterData();
          this.ref.markForCheck();
        });
      this.getNewMatches(primaryOption);
    } else {
      this.selectActive(primaryOption);
      this.selectMatch(event);
    }
  }

  public selectMatch(event?: MouseEvent): boolean {
    // Set focus
    this.inputElement.nativeElement.focus();
    return super.selectMatch(event);
  }

  public clearSearchTerm(event: MouseEvent) {
    Helpers.swallowEvent(event);
    this.searchTerm = '';
    this.selectPrimaryOption({ value: this.selectedPrimaryOption.value, label: this.selectedPrimaryOption.label });
    this.ref.markForCheck();
  }

  public optionHasSecondaryOptions(primaryOption: IMixedMultiPickerOption) {
    return !!(primaryOption && (primaryOption.secondaryOptions || primaryOption.getSecondaryOptionsAsync));
  }

  public shouldShowSearchBox(primaryOption: IMixedMultiPickerOption) {
    return !!(primaryOption && primaryOption.showSearchOnSecondaryOptions);
  }

  public clearPrimaryOption(primaryOption: IMixedMultiPickerOption) {
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

  filterData(): { value: string; label: string }[] {
    if (this.selectedPrimaryOption) {
      if (this.selectedPrimaryOption.secondaryOptions) {
        return this.filter(this.selectedPrimaryOption.secondaryOptions);
      } else {
        return this.filter(this.internalMap.get(this.selectedPrimaryOption.value).items);
      }
    }
    return [];
  }

  private filter(array: { value: string; label: string; filterValue?: any }[]): { value: string; label: string }[] {
    let matches: { value: string; label: string; filterValue?: any }[] = array;
    if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedPrimaryOption) {
      matches = matches.filter((match) => {
        const searchTerm = this.searchTerm.toLowerCase();
        return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
      });
    }
    return matches;
  }

  private getNewMatches(primaryOption: IMixedMultiPickerOption): void {
    // Get new matches
    if (primaryOption.secondaryOptions) {
      this.matches = this.filter(primaryOption.secondaryOptions);
      this.ref.markForCheck();
    } else {
      if (!primaryOption.getSecondaryOptionsAsync) {
        throw new Error('An option needs to have either an array of secondaryOptions or a function getSecondaryOptionsAsync');
      }
      if (!this.internalMap.get(primaryOption.value)) {
        this.isLoading = true;
        primaryOption.getSecondaryOptionsAsync().then((items: { value: string; label: string }[]) => {
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
      } else {
        this.matches = this.filter(this.internalMap.get(primaryOption.value).items);
        this.ref.markForCheck();
      }
    }
  }
}
