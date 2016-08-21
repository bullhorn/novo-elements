// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { NovoLabelService } from './../../services/novo-label-service';

@Component({
    selector: 'novo-slider',
    inputs: ['slides'],
    template: require('./Slider.html'),
    host: {
        '[class]': 'currentClass'
    }
})
export class NovoSliderElement {
    constructor(element:ElementRef, labels:NovoLabelService) {
        this.element = element;
        this.labels = labels;
        this.currentSlide = 0;
        this.start = true;
        this.end = false;
        this.currSlides = ['active'];
        this.handleKeyDownFunc = this.handleKeyDown.bind(this);
    }

    ngOnInit() {
        for (let i = 0; i < this.slides; i++) {
            this.currSlides[i] = (i > 0) ? 'inactive' : 'active';
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
            if (this.currentSlide === this.slides - 1) return;
            this.currentSlide++;
        } else {
            if (this.currentSlide === 0) return;
            this.currentSlide--;
        }

        for (let i = 0; i < this.slides; i++) {
            this.currSlides[i] = 'inactive';
        }

        this.currSlides[this.currentSlide] = 'active';
        this.start = (this.currentSlide === 0);
        this.end = (this.currentSlide === this.slides - 1);
        this.currentClass = `slide-${this.currentSlide}`;
    }
}
