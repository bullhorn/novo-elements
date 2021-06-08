import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Color, HSL, HSLA, HSV, HSVA, RGB, RGBA } from '../../utils/color-utils/ColorUtils';

@Component({
  selector: 'novo-color-picker',
  template: `
    <div class="novo-color-preview" [style.backgroundColor]="currentColor.hex">
      <div class="novo-color-preview-text">{{ hex }}</div>
    </div>
    <div class="novo-color-swatches">
      <novo-color-swatch
        *ngFor="let color of colors"
        [color]="color"
        (onClick)="handleBlockChange($event)"
        (onHover)="handleSwatchHover($event)"
      ></novo-color-swatch>
    </div>
    <div class="novo-color-input">
      <input [value]="hex.replace('#', '')" (onChange)="handleValueChange($event)" />
    </div>
  `,
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class NovoColorPickerComponent implements OnInit, OnChanges, OnDestroy {
  /** Pixel value for picker width */
  @Input() width: string | number = 276;
  /** Color squares to display */
  @Input() colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
  @Input() color: HSLA | HSVA | RGBA | string = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  };
  @Output() onChange = new EventEmitter<any>();
  @Output() onChangeComplete = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  hsl!: HSL;
  hsv!: HSV;
  rgb!: RGB;
  hex!: string;
  currentColor!: Color;
  changes!: Subscription;

  swatchStyle: { [key: string]: string } = {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    fontSize: '0',
  };
  input: { [key: string]: string } = {
    borderRadius: '4px',
    borderBottomLeftRadius: '0',
    borderTopLeftRadius: '0',
    border: '1px solid #e6ecf0',
    boxSizing: 'border-box',
    display: 'inline',
    fontSize: '14px',
    height: '30px',
    padding: '0',
    paddingLeft: '6px',
    width: '100%',
    color: '#657786',
  };

  focus(color: string) {
    return { boxShadow: `0 0 4px ${color}` };
  }

  handleBlockChange({ hex, $event }: any) {
    if (Color.isValidHex(hex)) {
      // this.hex = hex;
      this.handleChange({ hex, source: 'hex' }, $event);
    }
  }

  handleValueChange({ data, $event }: any) {
    this.handleBlockChange({ hex: data, $event });
  }

  ngOnInit() {
    this.changes = this.onChange.pipe(debounceTime(100)).subscribe((x) => this.onChangeComplete.emit(x));
    this.setState(new Color(this.color));
  }

  ngOnChanges() {
    this.setState(new Color(this.color));
  }

  ngOnDestroy() {
    this.changes.unsubscribe();
  }

  setState(data: Color) {
    this.currentColor = data;
    this.hsl = data.hsl;
    this.hsv = data.hsv;
    this.rgb = data.rgb;
    this.hex = data.hex;
    this.afterValidChange();
  }

  handleChange(data, $event) {
    const color = new Color(data.hex);
    if (color.isValid) {
      this.setState(color);
      this.onChange.emit({ color, $event });
      this.afterValidChange();
    }
  }
  /** hook for components after a complete change */
  afterValidChange() {}

  handleSwatchHover($event) {
    const color = new Color($event.hex);
    if (color.isValid) {
      this.setState(color);
      this.onSwatchHover.emit({ color, $event });
    }
  }
}
