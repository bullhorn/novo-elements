import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { novoExpansionAnimations } from './expansion-animations';
import { NovoExpansionPanel } from './expansion-panel';

/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
@Component({
  selector: 'novo-expansion-panel-header',
  styleUrls: ['./expansion-panel-header.scss'],
  templateUrl: './expansion-panel-header.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [novoExpansionAnimations.indicatorRotate, novoExpansionAnimations.expansionHeaderHeight],
  host: {
    class: 'novo-expansion-panel-header',
    role: 'button',
    '[attr.id]': 'panel._headerId',
    '[attr.tabindex]': 'panel.disabled ? -1 : 0',
    '[attr.aria-controls]': '_getPanelId()',
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': 'panel.disabled',
    '[class.novo-expanded]': '_isExpanded()',
    '(click)': '_toggle()',
    '(keydown)': '_keydown($event)',
    '[@expansionHeight]': `{
        value: _getExpandedState(),
        params: {
          collapsedHeight: collapsedHeight,
          expandedHeight: expandedHeight
        }
    }`,
  },
})
export class NovoExpansionPanelHeader implements OnDestroy {
  private _parentChangeSubscription = Subscription.EMPTY;

  constructor(
    @Host() public panel: NovoExpansionPanel,
    private _element: ElementRef,
    // private _focusMonitor: FocusMonitor,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    // Since the toggle state depends on an @Input on the panel, we
    // need to  subscribe and trigger change detection manually.
    this._parentChangeSubscription = merge(
      panel.opened,
      panel.closed,
      panel._inputChanges.pipe(filter((changes) => !!(changes.hideToggle || changes.disabled))),
    ).subscribe(() => this._changeDetectorRef.markForCheck());

    // _focusMonitor.monitor(_element.nativeElement);
  }

  /** Height of the header while the panel is expanded. */
  @Input()
  expandedHeight: string;

  /** Height of the header while the panel is collapsed. */
  @Input()
  collapsedHeight: string;

  /** Toggles the expanded state of the panel. */
  _toggle(): void {
    this.panel.toggle();
  }

  /** Gets whether the panel is expanded. */
  _isExpanded(): boolean {
    return this.panel.expanded;
  }

  /** Gets the expanded state string of the panel. */
  _getExpandedState(): string {
    return this.panel._getExpandedState();
  }

  /** Gets the panel id. */
  _getPanelId(): string {
    return this.panel.id;
  }

  /** Gets whether the expand indicator should be shown. */
  _showToggle(): boolean {
    return !this.panel.hideToggle && !this.panel.disabled;
  }

  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      // Toggle for space and enter keys.
      case SPACE:
      case ENTER:
        event.preventDefault();
        this._toggle();
        break;
      default:
        return;
    }
  }

  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    // this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }
}

/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
@Directive({
  selector: 'novo-panel-description',
  host: {
    class: 'novo-expansion-panel-header-description',
  },
})
export class NovoExpansionPanelDescription {}

/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
@Directive({
  selector: 'novo-panel-title',
  host: {
    class: 'novo-expansion-panel-header-title',
  },
})
export class NovoExpansionPanelTitle {}
