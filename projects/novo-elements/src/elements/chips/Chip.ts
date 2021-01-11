// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'chip,novo-chip',
  styleUrls: ['./Chip.scss'],
  template: `
    <span (click)="onSelect($event)" (mouseenter)="onSelect($event)" (mouseleave)="onDeselect($event)" [ngClass]="_type">
      <i *ngIf="_type" class="bhi-circle"></i>
      <span><ng-content></ng-content></span>
    </span>
    <i class="bhi-close" *ngIf="!disabled" (click)="onRemove($event)"></i>
  `,
})
export class NovoChipElement {
  @Input()
  set type(type: string) {
    this._type = type ? type.toLowerCase() : null;
  }

  @Input()
  disabled: boolean = false;

  @Output()
  select: EventEmitter<any> = new EventEmitter();
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  deselect: EventEmitter<any> = new EventEmitter();

  entity: string;
  _type: string;

  onRemove(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.remove.emit(e);
    return false;
  }

  onSelect(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.select.emit(e);
    return false;
  }

  onDeselect(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.deselect.emit(e);
    return false;
  }
}
