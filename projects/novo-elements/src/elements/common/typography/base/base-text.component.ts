import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput, BooleanInputAccept } from 'novo-elements/utils';
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
  static readonly ngAcceptInputType_disabled: BooleanInputAccept;

  @HostBinding('class.text-color-empty')
  @Input()
  @BooleanInput()
  muted: boolean;
  static readonly ngAcceptInputType_muted: BooleanInputAccept;

  @HostBinding('class.text-color-negative')
  @Input()
  @BooleanInput()
  error: boolean;
  static readonly ngAcceptInputType_error: BooleanInputAccept;

  @HostBinding('class.margin-before')
  @Input()
  @BooleanInput()
  marginBefore: boolean;
  static readonly ngAcceptInputType_marginBefore: BooleanInputAccept;

  @HostBinding('class.margin-after')
  @Input()
  @BooleanInput()
  marginAfter: boolean;
  static readonly ngAcceptInputType_marginAfter: BooleanInputAccept;

  @HostBinding('class.text-capitialize')
  @Input()
  @BooleanInput()
  capitialize: boolean;
  static readonly ngAcceptInputType_capitalize: BooleanInputAccept;

  @HostBinding('class.text-uppercase')
  @Input()
  @BooleanInput()
  uppercase: boolean;
  static readonly ngAcceptInputType_uppercase: BooleanInputAccept;

  @HostBinding('class.text-nowrap')
  @Input()
  @BooleanInput()
  nowrap: boolean;
  static readonly ngAcceptInputType_nowrap: BooleanInputAccept;

  @HostBinding('class.text-ellipsis')
  @Input()
  @BooleanInput()
  ellipsis: boolean;
  static readonly ngAcceptInputType_ellipsis: BooleanInputAccept;

  @HostBinding('class.text-size-smaller')
  @Input()
  @BooleanInput()
  smaller: boolean;
  static readonly ngAcceptInputType_smaller: BooleanInputAccept;

  @HostBinding('class.text-size-larger')
  @Input()
  @BooleanInput()
  larger: boolean;
  static readonly ngAcceptInputType_larger: BooleanInputAccept;

  @HostBinding('class.text-weight-thin')
  @Input()
  @BooleanInput()
  thin: boolean;
  static readonly ngAcceptInputType_thin: BooleanInputAccept;

  @HostBinding('class.text-weight-lighter')
  @Input()
  @BooleanInput()
  lighter: boolean;
  static readonly ngAcceptInputType_lighter: BooleanInputAccept;

  @HostBinding('class.text-weight-light')
  @Input()
  @BooleanInput()
  light: boolean;
  static readonly ngAcceptInputType_light: BooleanInputAccept;

  @HostBinding('class.text-weight-medium')
  @Input()
  @BooleanInput()
  medium: boolean;
  static readonly ngAcceptInputType_medium: BooleanInputAccept;

  @HostBinding('class.text-weight-bold')
  @Input()
  @BooleanInput()
  bold: boolean;
  static readonly ngAcceptInputType_bold: BooleanInputAccept;

  @HostBinding('class.text-weight-bolder')
  @Input()
  @BooleanInput()
  bolder: boolean;
  static readonly ngAcceptInputType_bolder: BooleanInputAccept;

  @HostBinding('class.text-weight-extrabold')
  @Input()
  @BooleanInput()
  extrabold: boolean;
  static readonly ngAcceptInputType_extrabold: BooleanInputAccept;

  constructor(protected element: ElementRef) {}

  get nativeElement() {
    return this.element.nativeElement;
  }
}
