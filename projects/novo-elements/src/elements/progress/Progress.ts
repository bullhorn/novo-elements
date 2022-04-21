// NG2
import { AfterContentInit, Component, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';

@Component({
  selector: 'novo-progress',
  styleUrls: ['./Progress.scss'],
  template: ` <ng-content></ng-content> `,
  providers: [
    {
      provide: NOVO_PROGRESS_CONTAINER,
      useExisting: NovoProgressElement,
    },
  ],
})
export class NovoProgressElement implements AfterContentInit {
  @Input()
  color: string;
  @Input() theme: string;
  @Input() total: number = 100;
  @Input() radius: number = 54;

  @HostBinding('class.striped')
  @Input()
  striped: boolean = false;

  // Private vars for getters
  private _appearance: ProgressAppearance = ProgressAppearance.LINEAR;
  private _disabled: boolean = false;

  @HostBinding('class')
  @Input()
  get appearance(): ProgressAppearance {
    return this._appearance;
  }
  set appearance(value: ProgressAppearance) {
    if (this._appearance !== value) {
      this._appearance = value as ProgressAppearance;
      this._updateBarAppearance();
    }
  }

  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  @ContentChildren(forwardRef(() => NovoProgressBarElement), { descendants: true })
  _bars: QueryList<NovoProgressBarElement>;

  ngAfterContentInit() {
    this._updateBarRadius();
  }

  private _updateBarAppearance(): void {
    if (this._bars) {
      this._bars.forEach((bar) => {
        bar.appearance = this.appearance as ProgressAppearance;
      });
    }
  }

  private _updateBarRadius(): void {
    if (this._bars) {
      this._bars.forEach((bar, i) => {
        bar.radius = this.radius - i * 5;
      });
    }
  }
}
