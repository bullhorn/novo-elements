import { Component, ElementRef, Input, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'novo-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <i [class]="iconName"><span><ng-content></ng-content></span></i>
    `,
})
export class NovoIconComponent implements AfterViewInit {
  @HostBinding('attr.raised')
  @Input()
  public raised: boolean;
  @HostBinding('attr.size')
  @Input()
  public size: string = 'medium';
  @HostBinding('attr.theme')
  @Input()
  public theme: string;
  @HostBinding('attr.color')
  @Input()
  public color: string;
  @HostBinding('attr.role')
  public role: string = 'img';
  @HostBinding('attr.aria-label')
  public ariaLabel: string;

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
}
