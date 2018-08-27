import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, TemplateRef } from '@angular/core';
import { NovoStepLabel } from './step-label.component';

@Component({
  selector: 'novo-step-header',
  templateUrl: 'step-header.component.html',
  styleUrls: ['step-header.component.scss'],
  host: {
    class: 'novo-step-header',
    role: 'tab',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoStepHeader implements OnDestroy {
  @Input()
  theme: string;
  @Input()
  color: string;
  @Input()
  icon: string;
  /** State of the given step. */
  @Input()
  state: string;

  /** Label of the given step. */
  @Input()
  label: NovoStepLabel | string;

  /** Overrides for the header icons, passed in via the stepper. */
  @Input()
  iconOverrides: { [key: string]: TemplateRef<any> };

  /** Index of the given step. */
  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = coerceNumberProperty(value);
  }
  private _index: number;

  /** Whether the given step is selected. */
  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected: boolean;

  /** Whether the given step label is active. */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    this._active = coerceBooleanProperty(value);
  }
  private _active: boolean;

  /** Whether the given step label is active. */
  get touched(): boolean {
    return this.selected || this.state === 'edit' || this.state === 'done';
  }

  /** Whether the given step is optional. */
  @Input()
  get optional(): boolean {
    return this._optional;
  }
  set optional(value: boolean) {
    this._optional = coerceBooleanProperty(value);
  }
  private _optional: boolean;

  constructor(private _focusMonitor: FocusMonitor, private _element: ElementRef) {
    _focusMonitor.monitor(_element.nativeElement, true);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }

  /** Returns string label of given step if it is a text label. */
  _stringLabel(): string | null {
    return this.label instanceof NovoStepLabel ? null : this.label;
  }

  /** Returns NovoStepLabel if the label of given step is a template label. */
  _templateLabel(): NovoStepLabel | null {
    return this.label instanceof NovoStepLabel ? this.label : null;
  }

  /** Returns the host HTML element. */
  _getHostElement() {
    return this._element.nativeElement;
  }
}
