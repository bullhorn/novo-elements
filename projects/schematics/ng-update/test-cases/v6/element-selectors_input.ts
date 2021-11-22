import { Component } from '@angular/core';

@Component({
  template: `
    <header [title]="title" [icon]="entityIcon" [theme]="entityTheme" data-automation-id="fast-add-header">
      <utils>
        <util-action icon="times" (click)="close()" data-automation-id="fast-add-close"></util-action>
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
      <novo-calendar-month
        class="availability"
        [viewDate]="viewDate"
        [events]="events"
        [cellTemplate]="availTemplate"
        (dayClicked)="toggleAvailable($event)"
        [weekStartsOn]="weekStartDay"
      ></novo-calendar-month>
    </div>
  `,
  styles: [
    `
      novo-calendar-month[theme] {
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
      <list class="primary-category-list">
        <item
          *ngFor="let action of filteredActions"
          (action)="performAction(action)"
          [hidden]="action.hidden"
          [class.disabled]="action.disabled"
          [disabled]="action.disabled"
          [ngStyle]="action.style"
          [ngClass]="action.className"
        >
          <ng-container *ngIf="action.label"> {{ action.label }} </ng-container>
          <ng-container *ngIf="!action.label"> {{ action.defaultLabel | translate: action?.replacements }} </ng-container>
        </item>
        <item class="category-item" [keepOpen]="true" (click)="showMergeDocs = !showMergeDocs" [class.active]="showMergeDocs">
          {{ 'ACTIONS.GENERATE_DOCUMENT' | translate }}
          <item-end> <i class="bhi-next"></i> </item-end>
        </item>
      </list>
      <list class="secondary-category-list" *ngIf="showMergeDocs">
        <!-- prettier-ignore -->
        <item
          *ngFor="let item of mergeDocActions"
          (action)="item.action.perform(data)"
          [attr.data-automation-id]="item?.action?.name"
        >
          {{ item?.action?.label | translate: item?.action?.replacements }}
        </item>
      </list>
    </novo-dropdown>
  `,
})
class D {}
