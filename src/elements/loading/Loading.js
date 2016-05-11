import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
    selector: 'novo-loading',
    inputs: ['theme'],
    host: {
        '[class]': 'theme || ""'
    },
    template: `
        <dot></dot>
        <dot></dot>
        <dot></dot>
        <dot></dot>
        <dot></dot>
    `,
    directives: [
        CORE_DIRECTIVES
    ]
})
export class Loading {}

@Component({
    selector: 'novo-spinner',
    inputs: ['theme', 'inverse', 'baseHref'],
    template: `
    <svg class="bullhornSpinner" [ngClass]="theme" height="100" width="100" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" [attr.inverse]="inverse">
        <title>Bullhorn Spinner Animation</title>
        <desc>Spinner animation indicating loading</desc>
        <defs>
            <style>
                .bullhornSpinner g.circleGroup {
                    -webkit-filter: url("{{baseHref || ''}}#gooEffect");
                    filter: url("{{baseHref || ''}}#gooEffect");
                }
            </style>
            <filter id="gooEffect">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="
                        1.3 0 0 0 0
                        0 1.3 0 0 0
                        0 0 1.3 0 0
                        0 0 0 19 -7" result="gooEffect" />
                <feComposite in="SourceGraphic" in2="gooEffect" operator="atop" />
            </filter>
        </defs>
        <g class="circleGroup" transform="translate(7, 7)">
            <circle />
            <circle />
            <circle />
            <circle />
            <circle />
        </g>
    </svg>
    `
})
export class NovoSpinner {}

export const NOVO_LOADING_ELEMENTS = [Loading, NovoSpinner];
