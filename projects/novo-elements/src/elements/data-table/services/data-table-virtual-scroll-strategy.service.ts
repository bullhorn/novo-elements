import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class NovoDataTableVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {

  rowHeight = 50;

  constructor() {
    super(50, 1000, 2000); // first property should be rowHeight
  }

  attach(viewport: CdkVirtualScrollViewport): void {
    this.onDataLengthChanged();
  }
}