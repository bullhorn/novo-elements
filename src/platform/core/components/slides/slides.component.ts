import { Component, ElementRef, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';

import { NovoLabelService } from '../../services/';

@Component({
  selector: 'novo-slides',
  template: `
        <section class="slides">
            <ng-content select="div[slide]"></ng-content>
        </section>
        <div class="controls">
            <button *ngIf="!start && !auto" theme="icon" icon="previous" (click)="changeSlide('back')">{{ labels.previous }}</button>
            <div class="indicators">
                <div class="indicator-circle" *ngFor="let indicator of currSlides; let i = index" [ngClass]="indicator" (click)=goToSlide(i)></div>
            </div>
            <button *ngIf="!end && !auto" theme="primary" icon="next" (click)="changeSlide('next')">{{ labels.next }}</button>
            <ng-content select="button" *ngIf="end"></ng-content>
        </div>
    `,
})
export class NovoSlidesComponent implements OnInit, OnDestroy {
  @Input() public slides: number;
  @Input() public auto: boolean = false;
  @Input() public secondsDelay: number = 3;
  @HostBinding('class') public currentClass: string = 'slide-0';

  public currentSlide: number = 0;
  public start: boolean = true;
  public end: boolean = false;
  public currSlides: string[] = ['active'];
  public handleKeyDownFunc: Function;

  constructor(public element: ElementRef, public labels: NovoLabelService) {
    this.handleKeyDownFunc = this.handleKeyDown.bind(this);
  }

  public ngOnInit(): void {
    for (let i: number = 0; i < this.slides; i++) {
      this.currSlides[i] = (i > 0) ? 'inactive' : 'active';
    }
    // Catch Tab Events
    this.element.nativeElement.addEventListener('keydown', this.handleKeyDownFunc);
    if (this.auto) {
      this.initSlides();
    }
  }

  public ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('keydown', this.handleKeyDownFunc);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'tab') {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  public initSlides(): void {
    let changeSlideBound: Function = this.changeSlide.bind(this);
    setTimeout(() => {
      changeSlideBound('next');
      this.initSlides();
    }, this.secondsDelay * 1000);
  }

  public changeSlide(direction: string): void {
    if (direction === 'next') {
      if (this.currentSlide === this.slides - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    } else {
      if (this.currentSlide === 0) {
        this.currentSlide = this.slides - 1;
      } else {
        this.currentSlide--;
      }
    }
    this.updateDisplayProperties();
  }

  public goToSlide(slide: number): void {
    this.currentSlide = slide;
    this.updateDisplayProperties();
  }

  private updateDisplayProperties(): void {
    for (let i: number = 0; i < this.slides; i++) {
      this.currSlides[i] = 'inactive';
    }
    this.currSlides[this.currentSlide] = 'active';
    this.start = (this.currentSlide === 0);
    this.end = (this.currentSlide === this.slides - 1);
    this.currentClass = `slide-${this.currentSlide}`;
  }
}
