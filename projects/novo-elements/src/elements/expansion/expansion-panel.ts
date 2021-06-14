import { AnimationEvent } from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Host,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';
import { NovoAccordion } from './accordion';
import { novoExpansionAnimations } from './expansion-animations';
import { NovoExpansionPanelContent } from './expansion-panel-content';

/** NovoExpansionPanel's states. */
export type NovoExpansionPanelState = 'expanded' | 'collapsed';

/** Counter for generating unique element ids. */
let uniqueId = 0;

/**
 * `<novo-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the NovoAccordion directive attached.
 */
@Component({
  styleUrls: ['./expansion-panel.scss'],
  selector: 'novo-expansion-panel',
  exportAs: 'novoExpansionPanel',
  templateUrl: './expansion-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [novoExpansionAnimations.bodyExpansion],
  host: {
    class: 'novo-expansion-panel',
    '[class.novo-expanded]': 'expanded',
    '[class.novo-expansion-panel-spacing]': '_hasSpacing()',
    '[class.novo-expansion-panel-padding]': 'padding',
  },
})
export class NovoExpansionPanel extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {
  @Input()
  disabled: boolean;
  @Input()
  expanded: boolean;
  /** Whether the toggle indicator should be hidden. */
  @Input()
  get hideToggle(): boolean {
    return this._hideToggle;
  }
  set hideToggle(value: boolean) {
    this._hideToggle = coerceBooleanProperty(value);
  }
  private _hideToggle = false;

  @Input()
  get padding(): boolean {
    return this._padding;
  }
  set padding(value: boolean) {
    this._padding = coerceBooleanProperty(value);
  }
  private _padding = true;

  @Output()
  opened: EventEmitter<void> = new EventEmitter();
  @Output()
  closed: EventEmitter<void> = new EventEmitter();
  @Output()
  expandedChange: EventEmitter<boolean> = new EventEmitter();

  /** Stream that emits for changes in `@Input` properties. */
  readonly _inputChanges = new Subject<SimpleChanges>();

  /** Optionally defined accordion the expansion panel belongs to. */
  accordion: NovoAccordion;

  /** Content that will be rendered lazily. */
  @ContentChild(NovoExpansionPanelContent)
  _lazyContent: NovoExpansionPanelContent;

  /** Portal holding the user's content. */
  _portal: TemplatePortal;

  /** ID for the associated header element. Used for a11y labelling. */
  _headerId = `novo-expansion-panel-header-${uniqueId++}`;

  constructor(
    @Optional()
    @Host()
    accordion: NovoAccordion,
    _changeDetectorRef: ChangeDetectorRef,
    _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
    private _viewContainerRef: ViewContainerRef,
  ) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this.accordion = accordion;
  }

  /** Whether the expansion indicator should be hidden. */
  _getHideToggle(): boolean {
    if (this.accordion) {
      return this.accordion.hideToggle;
    }
    return this.hideToggle;
  }

  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing(): boolean {
    if (this.accordion) {
      return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default';
    }
    return false;
  }

  /** Gets the expanded state string. */
  _getExpandedState(): NovoExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  ngAfterContentInit() {
    if (this._lazyContent) {
      // Render the content as soon as the panel becomes open.
      this.opened
        .pipe(
          startWith(null),
          filter(() => this.expanded && !this._portal),
          take(1),
        )
        .subscribe(() => {
          this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._inputChanges.next(changes);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._inputChanges.complete();
  }

  _bodyAnimation(event: AnimationEvent) {
    const classList = event.element.classList;
    const cssClass = 'novo-expanded';
    const { phaseName, toState } = event;

    // Toggle the body's `overflow: hidden` class when closing starts or when expansion ends in
    // order to prevent the cases where switching too early would cause the animation to jump.
    // Note that we do it directly on the DOM element to avoid the slight delay that comes
    // with doing it via change detection.
    if (phaseName === 'done' && toState === 'expanded') {
      classList.add(cssClass);
    } else if (phaseName === 'start' && toState === 'collapsed') {
      classList.remove(cssClass);
    }
  }
}

@Directive({
  selector: 'novo-action-row',
  host: {
    class: 'novo-action-row',
  },
})
export class NovoExpansionPanelActionRow {}
