import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'novo-color-swatch',
  template: `
    <div
      class="swatch"
      [ngStyle]="currentStyles()"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (blur)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .swatch {
        border-radius: 0.4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoColorSwatchComponent implements OnInit {
  @Input() color!: string;
  @Input() style: { [key: string]: string } = {};
  @Input() focusStyle: { [key: string]: string } = {};
  @Input() focus!: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onHover = new EventEmitter<any>();
  divStyles: { [key: string]: string } = {};
  focusStyles: { [key: string]: string } = {};
  inFocus = false;

  ngOnInit() {
    this.divStyles = {
      background: this.color as string,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...this.style,
    };
  }
  currentStyles() {
    this.focusStyles = {
      ...this.divStyles,
      ...this.focusStyle,
    };
    return this.focus || this.inFocus ? this.focusStyles : this.divStyles;
  }
  handleFocusOut() {
    this.inFocus = false;
  }
  handleFocus() {
    this.inFocus = true;
  }
  handleHover(hex: string, $event) {
    this.onHover.emit({ hex, $event });
  }
  handleClick(hex: string, $event) {
    this.onClick.emit({ hex, $event });
  }
}
