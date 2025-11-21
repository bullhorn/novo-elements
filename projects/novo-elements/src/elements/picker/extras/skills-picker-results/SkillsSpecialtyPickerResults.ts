// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
// App
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
  selector: 'skill-specialty-picker-results',
  template: `
    @if (isLoading && !matches?.length) {
      <section class="picker-loading"><novo-loading theme="line"></novo-loading></section>
    }
    @if (matches.length > 0) {
      <novo-list direction="vertical">
        @for (match of matches; track match) {
          <novo-list-item
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match)">
            <item-content>
              <h6><span [innerHtml]="match.label | highlight:term"></span></h6>
              <div class="category">
                <i class="bhi-category-tags"></i><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight:term"></span>
              </div>
            </item-content>
          </novo-list-item>
        }
        @if (limitedTo) {
          <novo-list-item><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item>
        }
        @if (isLoading && matches.length > 0) {
          <novo-loading theme="line"></novo-loading>
        }
      </novo-list>
    }
    @if (hasError) {
      <p class="picker-error">{{ labels.pickerError }}</p>
    }
    @if (!isLoading && !matches.length && !hasError) {
      <p class="picker-null">{{ labels.pickerEmpty }}</p>
    }
  `,
  styleUrls: ['./SkillsSpecialtyPickerResults.scss'],
  standalone: false
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
