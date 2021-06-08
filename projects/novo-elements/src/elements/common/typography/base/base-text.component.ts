import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils';
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

  @HostBinding('class.text-size-small')
  get hb_isSizeSmall(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.text-size-large')
  get hb_isSizeLarge(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.text-size-default')
  get hb_isSizeDefault(): boolean {
    return !['small', 'large'].includes(this.size);
  }

  @HostBinding('class.text-weight-thin')
  get hb_isWeightThin(): boolean {
    return this.weight === 'thin';
  }

  @HostBinding('class.text-weight-medium')
  get hb_isWeightMedium(): boolean {
    return this.weight === 'medium';
  }

  @HostBinding('class.text-weight-bold')
  get hb_isWeightBold(): boolean {
    return this.weight === 'bold';
  }

  @HostBinding('class.text-weight-default')
  get hb_isWeightDefault(): boolean {
    return !['thin', 'medium', 'bold'].includes(this.weight);
  }

  @HostBinding('class')
  get hb_classBinding(): string {
    return [this.color ? `text-color-${this.color}` : null, this.lineLength ? `text-length-${this.lineLength}` : null]
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

  constructor(protected element: ElementRef) {}

  get nativeElement() {
    return this.element.nativeElement;
  }
}
