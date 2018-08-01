// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
// App
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'skill-specialty-picker-results',
  template: `
        <section class="picker-loading" *ngIf="isLoading && !matches?.length">
            <novo-loading theme="line"></novo-loading>
        </section>
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <novo-list-item
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match === activeMatch"
                (mouseenter)="selectActive(match)"
                [class.disabled]="preselected(match)">
                <item-content>
                    <h6><span [innerHtml]="highlight(match.label, term)"></span></h6>
                    <div class="category">
                        <i class="bhi-category-tags"></i><span [innerHtml]="highlight(match.data.categories || match.data.parentCategory.name, term)"></span>
                    </div>
                </item-content>
            </novo-list-item>
            <novo-list-item *ngIf="limitedTo"><div>{{labels.showingXofXResults(limit, total)}}</div></novo-list-item>
            <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
        </novo-list>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `,
})
export class SkillsSpecialtyPickerResults extends BasePickerResults {
  @HostBinding('class.active')
  active: boolean = true;
  limitedTo: boolean = false;
  limit: number = 200;
  total: number;

  constructor(public element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  getListElement(): any {
    return this.element.nativeElement.querySelector('novo-list');
  }

  /**
   * @name structureArray
   * @param collection - the data once getData resolves it
   *
   * @description This function structures an array of nodes into an array of objects with a
   * 'name' field by default.
   */
  structureArray(collection: any): any {
    let data = collection;
    if (collection.hasOwnProperty('data')) {
      this.limitedTo = collection.limitedTo200;
      this.total = collection.total;
      data = collection.data;
    } else if (data.length > this.limit) {
      this.limitedTo = true;
      this.total = data.length;
      data = data.slice(0, this.limit);
    }
    return super.structureArray(data);
  }
}
