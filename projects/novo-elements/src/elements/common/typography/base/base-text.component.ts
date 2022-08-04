import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils/decorators';
import { TypographyLength, TypographySize, TypographyWeight } from '../text.types';

@Directive()
export class NovoBaseTextElement {
  @Input()
  size: TypographySize;
  @Input()
  weight: TypographyWeight;
  @Input()
  lineLength: TypographyLength;
  @Input()
  color: string;

  @HostBinding('class')
  get hb_classBinding(): string {
    return [
      this.color ? `text-color-${this.color}` : null,
      this.lineLength ? `text-length-${this.lineLength}` : null,
      this.size ? `text-size-${this.size}` : null,
      this.weight ? `text-weight-${this.weight}` : null,
    ]
      .filter(Boolean)
      .join(' ');
  }

  @HostBinding('class.text-disabled')
  @Input()
  @BooleanInput()
  disabled: boolean;

  @HostBinding('class.text-color-empty')
  @Input()
  @BooleanInput()
  muted: boolean;

  @HostBinding('class.text-color-negative')
  @Input()
  @BooleanInput()
  error: boolean;

  @HostBinding('class.margin-before')
  @Input()
  @BooleanInput()
  marginBefore: boolean;

  @HostBinding('class.margin-after')
  @Input()
  @BooleanInput()
  marginAfter: boolean;

  @HostBinding('class.text-capitialize')
  @Input()
  @BooleanInput()
  capitialize: boolean;

  @HostBinding('class.text-uppercase')
  @Input()
  @BooleanInput()
  uppercase: boolean;

  @HostBinding('class.text-nowrap')
  @Input()
  @BooleanInput()
  nowrap: boolean;

  @HostBinding('class.text-ellipsis')
  @Input()
  @BooleanInput()
  ellipsis: boolean;

  @HostBinding('class.text-size-smaller')
  @Input()
  @BooleanInput()
  smaller: boolean;

  @HostBinding('class.text-size-larger')
  @Input()
  @BooleanInput()
  larger: boolean;

  @HostBinding('class.text-weight-thin')
  @Input()
  @BooleanInput()
  thin: boolean;

  @HostBinding('class.text-weight-lighter')
  @Input()
  @BooleanInput()
  lighter: boolean;

  @HostBinding('class.text-weight-light')
  @Input()
  @BooleanInput()
  light: boolean;

  @HostBinding('class.text-weight-medium')
  @Input()
  @BooleanInput()
  medium: boolean;

  @HostBinding('class.text-weight-bold')
  @Input()
  @BooleanInput()
  bold: boolean;

  @HostBinding('class.text-weight-bolder')
  @Input()
  @BooleanInput()
  bolder: boolean;

  @HostBinding('class.text-weight-extrabold')
  @Input()
  @BooleanInput()
  extrabold: boolean;

  constructor(protected element: ElementRef) {}

  get nativeElement() {
    return this.element.nativeElement;
  }
}
