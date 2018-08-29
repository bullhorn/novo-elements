// NG2
import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'novo-loading',
    host: {
        '[class]': 'theme || ""'
    },
    template: `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `
})
export class NovoLoadingElement {
    @Input() theme: string;
}

@Component({
    selector: 'novo-spinner',
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
                    _:-webkit-full-screen:not(:root:root), .bullhornSpinner g.circleGroup {
                        -webkit-filter: none;
                        filter: none;
                    }
                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {
                        .bullhornSpinner g.circleGroup {
                            -webkit-filter: none;
                            filter: none;
                        }
                    }
                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {
                        .bullhornSpinner g.circleGroup {
                            -webkit-filter: none;
                            filter: none;
                        }
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
            <path d="M 43 43 L 54 45 L 80 40 L 43 43" stroke="none" fill="none" id="firstLinePath"/>
            <path d="M 43 43 L 48 41 L 48 18 L 43 43" stroke="none" fill="none" id="secondLinePath"/>
            <path d="M 43 43 L 42 45 L 15 40 L 43 43" stroke="none" fill="none" id="thirdLinePath"/>
            <path d="M 43 43 L 44 52 L 29 78 L 43 43" stroke="none" fill="none" id="fourthLinePath"/>
            <path d="M 43 43 L 52 52 L 68 78 L 43 43" stroke="none" fill="none" id="fifthLinePath"/>
            <g class="circleGroup" transform="translate(7, 7)">
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#firstLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#secondLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#thirdLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#fourthLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#fifthLinePath"/>
                    </animateMotion>
                </circle>
            </g>
        </svg>
    `
})
export class NovoSpinnerElement {
    @Input() theme: string;
    @Input() inverse: boolean;
    @Input() baseHref: string;
}


@Component({
  selector: 'novo-simple-spinner',
  template: `
    <div class="loading-simple-spinner">
        <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="18.2px" height="18.5px" viewBox="0 0 18.2 18.5" style="enable-background:new 0 0 18.2 18.5;"
            xml:space="preserve">
            <path [ngStyle]="spinnerCss" class="spinner" d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                    c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                    c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"/>
        </svg>
    </div>
    `,
})
export class NovoSimpleSpinnerElement {
  spinnerCss: any;

  @Input()
  set fillColor(color) {
    this.spinnerCss = {
      fill: color,
    };
  }

}
