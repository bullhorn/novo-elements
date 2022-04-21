// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ContentChildren,
  Directive,
  EmbeddedViewRef,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'novo-loading',
  template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `,
})
export class NovoLoadingElement {
  /**
   * **deprecated** please use `color`.
   * @deprecated
   **/
  @Input()
  set theme(value: string) {
    console.warn(`'theme' property is deprecated, please use 'color'.`);
    this.color = value;
  }
  get theme(): string {
    return this.color;
  }

  @Input()
  color: string;

  @Input()
  size: string = 'medium';

  @HostBinding('class')
  get hb_class() {
    return [`color-${this.color}`, `size-${this.size}`].join(' ');
  }
}

@Component({
  selector: 'novo-spinner',
  template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `,
})
export class NovoSpinnerElement {
  /**
   * **deprecated** please use `color`.
   * @deprecated
   **/
  @Input()
  set theme(value: string) {
    console.warn(`'theme' property is deprecated, please use 'color'.`);
    this.color = value;
  }
  get theme(): string {
    return this.color;
  }

  @Input()
  color: string;

  @Input()
  size: string = 'medium';

  private _inverse: boolean;
  get inverse(): boolean {
    return this._inverse;
  }
  @Input()
  set inverse(value: boolean) {
    this._inverse = coerceBooleanProperty(value);
  }

  @HostBinding('class')
  get hb_class() {
    return [this.inverse ? 'color-white' : `color-${this.color}`, `size-${this.size}`].join(' ');
  }
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
    return templates && templates.map((v, i) => this.viewContainer.createEmbeddedView(v, null, i));
  }
  destroyViews(views: EmbeddedViewRef<any>[]) {
    if (views) {
      for (const view of views) {
        view.destroy();
      }
    }
  }
}
