// NG2
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, QueryList } from '@angular/core';
import { NovoIconComponent } from 'novo-elements/components/icon';
import { BooleanInput, notify } from 'novo-elements/utils';

@Component({
  selector: 'novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]',
  host: {
    class: 'novo-button',
    '[attr.color]': 'color',
    '[attr.icon]': 'icon',
    '[attr.loading]': 'loading',
    '[attr.side]': 'side',
    // '[attr.size]': 'size',
    '[attr.role]': "'button'",
    '[class.icon-only]': '(icon || _icons.length > 0) && (!fab && !basic && !primary && !outlined)',
  },
  styleUrls: [
    './styles/button.scss',
    './styles/button-standard.scss',
    './styles/button-primary.scss',
    './styles/button-secondary.scss',
    './styles/button-fab.scss',
    './styles/button-icon.scss',
    './styles/button-dialogue.scss',
    './styles/button-sizes.scss',
    './styles/button-other.scss',
  ],

  template: `
    <span class="button-focus-indicator"></span>
    <!--Left Icon-->
    <i *ngIf="icon && side === 'left' && !loading" [ngClass]="icon" class="novo-button-icon novo-button-icon-left"></i>
    <!--Transcluded Content-->
    <span #textContent class="button-contents"><ng-content></ng-content></span>
    <!--Right Icon-->
    <i *ngIf="icon && side === 'right' && !loading" [ngClass]="icon" class="novo-button-icon novo-button-icon-right"></i>
    <!--Loading-->
    <i *ngIf="loading" class="loading novo-button-loading">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px"
        y="0px"
        width="18.2px"
        height="18.5px"
        viewBox="0 0 18.2 18.5"
        style="enable-background:new 0 0 18.2 18.5;"
        xml:space="preserve"
      >
        <style type="text/css">
          .spinner {
            fill: #ffffff;
          }
        </style>
        <path
          class="spinner"
          d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                        c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                        c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"
        />
      </svg>
    </i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoButtonElement {
  /**
   * The text color of the button. Should be used for Icon buttons. see theme.
   */
  @Input() color: string;
  /**
   * The side of the button to display the icon.
   * @deprecated
   */
  @Input() side: string = 'right';
  /**
   * 	Sets the size of the button. One of: sm, lg
   */
  @Input() size: string;

  /**
   * The base styling to apply to the button.
   * @deprecated
   */
  @Input()
  public get theme(): string {
    return this.variant;
  }
  public set theme(value: string) {
    notify(`'theme' has been deprecated for button. Please use variant instead.`);
    this.variant = value;
  }

  /**
   * The visual style of the button.
   */
  @Input()
  public get variant(): string {
    return this._variant;
  }
  public set variant(value: string) {
    this._variant = value;
    this.fab = value === 'fab';
    this.basic = ['basic', 'dialogue', 'text'].includes(value);
    this.primary = ['primary', 'cta'].includes(value);
    this.outlined = ['outlined', 'secondary'].includes(value);
    this.standard = value === 'standard';
  }
  private _variant: string;

  /**
   * Conditionally show a spinner over the top of a button.
   */
  @Input() loading: boolean;
  /**
   * Optionally display `bullhorn-icon` with the button along with the text.
   * @deprecated
   */
  @Input()
  set icon(icon: string) {
    if (icon) {
      this._icon = `bhi-${icon}`;
    }
  }
  get icon(): string {
    return this._icon;
  }

  @ContentChildren(NovoIconComponent, { descendants: true })
  _icons: QueryList<NovoIconComponent>;

  @HostBinding('class')
  get hb_calculatedClasses() {
    const size = this._translateSize(this.size);
    const sizeClass = size ? `novo-button-${size}` : null;
    return [sizeClass].filter(Boolean);
  }

  private _translateSize(size: string) {
    if (['s', 'sm', 'small'].includes(size)) return 'small';
    if (['l', 'lg', 'large'].includes(size)) return 'large';
    return false;
  }

  // Variants
  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-text')
  basic: boolean = false;

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-primary')
  primary: boolean = false;

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-outlined')
  outlined: boolean = false;

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-fab')
  fab: boolean = false;

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-standard')
  standard: boolean = false;

  /**
   * Make the button non-interactive.
   */
  @Input()
  @BooleanInput()
  @HostBinding('class.novo-button-disabled')
  disabled: boolean = false;

  private _icon: string;

  constructor(public element: ElementRef) {}

  /** Focuses the input. */
  focus(options?: FocusOptions): void {
    this.element.nativeElement.focus(options);
  }
}
