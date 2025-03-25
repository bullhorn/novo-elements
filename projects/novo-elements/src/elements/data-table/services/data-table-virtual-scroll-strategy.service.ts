import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Injectable } from '@angular/core';

@Injectable()
export class NovoDataTableVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {

  rowHeight = 33;

  constructor() {
    super(33, 1000, 5000); // first property should be rowHeight
  }

  attach(viewport: CdkVirtualScrollViewport): void {
    this.onDataLengthChanged();
  }
}