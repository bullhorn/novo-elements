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
})
class B {}

@Component({
  template: `
    <div class="calendar-container" (mouseleave)="processEvents()">
      <novo-loading *ngIf="loading"></novo-loading>
      <novo-agenda-month
        class="availability"
        [viewDate]="viewDate"
        [events]="events"
        [cellTemplate]="availTemplate"
        (dayClicked)="toggleAvailable($event)"
        [weekStartsOn]="weekStartDay"
      ></novo-agenda-month>
    </div>
  `,
  styles: [
    `
      novo-agenda-month[theme] {
        border: red 1px solid;
      }
    `,
  ],
})
class C {}

@Component({
  template: `
    <novo-dropdown side="bottom-right">
      <button type="button" theme="secondary" (click)="filterItems()" icon="collapse" inverse>BUTTON</button>
      <novo-optgroup class="primary-category-list">
        <novo-option
          *ngFor="let action of filteredActions"
          (click)="performAction(action)"
          [hidden]="action.hidden"
          [class.disabled]="action.disabled"
          [disabled]="action.disabled"
          [ngStyle]="action.style"
          [ngClass]="action.className"
        >
          <ng-container *ngIf="action.label"> {{ action.label }} </ng-container>
          <ng-container *ngIf="!action.label"> {{ action.defaultLabel | translate: action?.replacements }} </ng-container>
        </novo-option>
        <novo-option class="category-item" [keepOpen]="true" (click)="showMergeDocs = !showMergeDocs" [class.active]="showMergeDocs">
          {{ 'ACTIONS.GENERATE_DOCUMENT' | translate }}
          <item-end> <i class="bhi-next"></i> </item-end>
        </novo-option>
      </novo-optgroup>
      <novo-optgroup class="secondary-category-list" *ngIf="showMergeDocs">
        <!-- prettier-ignore -->
        <novo-option
          *ngFor="let item of mergeDocActions"
          (click)="item.action.perform(data)"
          [attr.data-automation-id]="item?.action?.name"
        >
          {{ item?.action?.label | translate: item?.action?.replacements }}
        </novo-option>
      </novo-optgroup>
    </novo-dropdown>
  `,
})
class D {}
