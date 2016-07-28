import { Component, ElementRef } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { NOVO_BUTTON_ELEMENTS } from './../button';
import { NovoLabelService } from './../../novo-elements';

@Component({
    selector: 'novo-slider',
    inputs: ['slides'],
    directives: [COMMON_DIRECTIVES, NOVO_BUTTON_ELEMENTS],
    template: require('./Slider.html'),
    host: {
        '[class]': 'currentClass'
    }
})
export class Slider {
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

export const NOVO_SLIDER_ELEMENTS = [Slider];
