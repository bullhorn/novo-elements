// NG2
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'novo-slider',
  template: `
        <section class="slides">
            <ng-content select="div[slide]"></ng-content>
        </section>
        <div class="controls">
            <button *ngIf="!start" theme="icon" icon="previous" (click)="changeSlide('back')"></button>
            <div class="indicators">
                <div class="indicator-circle" *ngFor="let indicator of currSlides; let i = index" [ngClass]="indicator"></div>
            </div>
            <button *ngIf="!end" theme="primary" icon="next" (click)="changeSlide('next')">{{ labels.next }}</button>
            <ng-content select="button" *ngIf="end"></ng-content>
        </div>
    `,
  host: {
    '[class]': 'currentClass',
  },
})
export class NovoSliderElement implements OnInit, OnDestroy {
  @Input()
  slides: any;

  currentSlide: number = 0;
  start: boolean = true;
  end: boolean = true;
  currSlides: Array<any> = ['active'];
  handleKeyDownFunc: any;
  currentClass: string;

  constructor(private element: ElementRef, public labels: NovoLabelService) {
    this.handleKeyDownFunc = this.handleKeyDown.bind(this);
  }

  ngOnInit() {
    for (let i = 0; i < this.slides; i++) {
      this.currSlides[i] = i > 0 ? 'inactive' : 'active';
    }
    // Catch Tab Events
    this.element.nativeElement.addEventListener('keydown', this.handleKeyDownFunc);
  }

  ngOnDestroy() {
    this.element.nativeElement.removeEventListener('keydown', this.handleKeyDownFunc);
  }

  handleKeyDown(event) {
    if (event.keyCode === 9) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  changeSlide(direction) {
    if (direction === 'next') {
      if (this.currentSlide === this.slides - 1) {
        return;
      }
      this.currentSlide++;
    } else {
      if (this.currentSlide === 0) {
        return;
      }
      this.currentSlide--;
    }

    for (let i = 0; i < this.slides; i++) {
      this.currSlides[i] = 'inactive';
    }

    this.currSlides[this.currentSlide] = 'active';
    this.start = this.currentSlide === 0;
    this.end = this.currentSlide === this.slides - 1;
    this.currentClass = `slide-${this.currentSlide}`;
  }
}
