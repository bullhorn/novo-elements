// NG2
import {
  Component,
  Input,
  Directive,
  TemplateRef,
  ViewContainerRef,
  ContentChildren,
  EmbeddedViewRef,
  HostBinding,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'novo-loading',
  host: {
    '[class]': 'theme || ""',
  },
  template: `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `,
})
export class NovoLoadingElement {
  @Input()
  theme: string;
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
    `,
})
export class NovoSpinnerElement {
  @Input()
  theme: string;
  @Input()
  inverse: boolean;
  @Input()
  baseHref: string;
}

@Directive({
  selector: '[skeleton]',
})
export class NovoSkeletonDirective {
  @HostBinding('class.skeleton')
  skeleton: boolean = true;
}
@Directive({
  selector: '[loaded]',
})
export class NovoLoadedDirective {}

@Directive({
  selector: '[isLoading]',
})
export class NovoIsLoadingDirective {
  @ContentChildren(NovoSkeletonDirective, { read: TemplateRef })
  public skeletonTemplates: QueryList<TemplateRef<any>>;
  @ContentChildren(NovoLoadedDirective, { read: TemplateRef })
  public loadedTemplates: QueryList<TemplateRef<any>>;

  private hasView = false;
  private skeletonViews: EmbeddedViewRef<NovoSkeletonDirective>[] = [];
  private loadedViews: EmbeddedViewRef<NovoLoadedDirective>[] = [];

  constructor(private viewContainer: ViewContainerRef) {}

  @Input()
  set isLoading(condition: boolean) {
    if (!condition && !this.hasView) {
      this.destroyViews(this.loadedViews);
      this.skeletonViews = this.createViews(this.skeletonTemplates);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.destroyViews(this.skeletonViews);
      this.loadedViews = this.createViews(this.loadedTemplates);
      this.hasView = false;
    }
  }
  createViews(templates: QueryList<TemplateRef<any>>) {
    return templates && templates.map((v) => this.viewContainer.createEmbeddedView(v));
  }
  destroyViews(views: EmbeddedViewRef<any>[]) {
    if (views) {
      for (let view of views) {
        view.destroy();
      }
    }
  }
}
