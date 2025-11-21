import { Component } from '@angular/core';

@Component({
  template: `
    <header [title]="title" [icon]="entityIcon" [theme]="entityTheme" data-automation-id="fast-add-header">
      <utils>
        <novo-action icon="times" (click)="close()" data-automation-id="fast-add-close"></novo-action>
      </utils>
    </header>
    <style>
      header[theme] {
        border: red 1px solid;
      }
    </style>
  `,
  standalone: false
})
class B {}

@Component({
  template: `
    <div class="calendar-container" (mouseleave)="processEvents()">
      @if (loading) {
        <novo-loading></novo-loading>
      }
      <novo-agenda-month
        class="availability"
        [viewDate]="viewDate"
        [events]="events"
        [cellTemplate]="availTemplate"
        (dayClicked)="toggleAvailable($event)"
        [weekStartsOn]="weekStartDay"></novo-agenda-month>
    </div>
  `,
  styles: [
    `
      novo-agenda-month[theme] {
        border: red 1px solid;
      }
    `,
  ],
  standalone: false
})
class C {}

@Component({
  template: `
    <novo-dropdown side="bottom-right">
      <button type="button" theme="secondary" (click)="filterItems()" icon="collapse" inverse>BUTTON</button>
      <novo-optgroup class="primary-category-list">
        @for (action of filteredActions; track action) {
          <novo-option
            (click)="performAction(action)"
            [hidden]="action.hidden"
            [class.disabled]="action.disabled"
            [disabled]="action.disabled"
            [ngStyle]="action.style"
            [ngClass]="action.className">
            @if (action.label) {
              {{ action.label }}
            }
            @else {
              {{ action.defaultLabel | translate: action?.replacements }}
            }
          </novo-option>
        }
        <novo-option class="category-item" [keepOpen]="true" (click)="showMergeDocs = !showMergeDocs" [class.active]="showMergeDocs">
          {{ 'ACTIONS.GENERATE_DOCUMENT' | translate }}
          <item-end> <i class="bhi-next"></i> </item-end>
        </novo-option>
      </novo-optgroup>
      @if (showMergeDocs) {
        <novo-optgroup class="secondary-category-list">
          <!-- prettier-ignore -->
          @for (item of mergeDocActions; track item) {
            <novo-option
              (click)="item.action.perform(data)"
              [attr.data-automation-id]="item?.action?.name">
              {{ item?.action?.label | translate: item?.action?.replacements }}
            </novo-option>
          }
        </novo-optgroup>
      }
    </novo-dropdown>
  `,
  standalone: false
})
class D {}
