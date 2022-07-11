import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils/decorators/BooleanInput';
import { TypographySize } from '../common/typography';

@Component({
  selector: 'novo-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `,
  host: {
    class: 'novo-icon',
  },
})
export class NovoIconComponent implements AfterViewInit {
  @HostBinding('class.novo-icon-raised')
  @Input()
  public raised: boolean;

  @HostBinding('attr.theme')
  @Input()
  public theme: string;

  @HostBinding('attr.shape')
  @Input()
  public shape: string = 'box';

  @Input()
  public color: string;

  @HostBinding('attr.role')
  public role: string = 'img';

  @HostBinding('attr.aria-label')
  public ariaLabel: string;

  @Input()
  public size: TypographySize;

  @HostBinding('class.icon-size-smaller')
  @Input()
  @BooleanInput()
  public smaller: boolean;

  @HostBinding('class.icon-size-larger')
  @Input()
  @BooleanInput()
  public larger: boolean;

  @Input()
  set alt(value: string) {
    this.ariaLabel = value;
  }

  get alt(): string {
    return this.ariaLabel;
  }

  @Input()
  set name(iconName: string) {
    this.iconName = `bhi-${iconName}`;
  }

  get name(): string {
    return this.iconName;
  }

  @HostBinding('class')
  get hb_classBinding(): string {
    return [this.color ? `text-color-${this.color}` : null, this.size ? `text-size-${this.size}` : null].filter(Boolean).join(' ');
  }

  public iconName: string;

  constructor(public element: ElementRef, private cdr: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    if (this.element.nativeElement.textContent.trim()) {
      Promise.resolve().then(() => {
        this.name = this.element.nativeElement.textContent.trim();
        this.cdr.markForCheck();
      });
    }
  }

  public projectContentChanged(record: MutationRecord) {
    this.name = this.element.nativeElement.textContent.trim();
    this.cdr.detectChanges();
  }
}
