import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

@Component({
  selector: 'button[theme]',
  templateUrl: './button.component.html',
})
export class NovoButtonComponent implements OnChanges {
  @Input() public icon: string;
  @HostBinding('attr.color') @Input() public color: string;
  @Input() public side: string;
  @HostBinding('attr.theme') @Input() public theme: string;
  @Input() public loading: boolean;
  @Input() public state: string;

  @HostBinding('class') public buttonClasses: string;

  public leftSide: boolean = false;
  public rightSide: boolean = true;
  public iconClass: string;
  public flex: string;

  public ngOnChanges(changes?: SimpleChanges): void {
    // Enforcing style guidelines
    if (this.theme === 'primary' && !this.icon) {
      this.icon = 'check';
    } else if (this.theme === 'standard' && this.icon) {
      this.icon = undefined;
    }

    this.iconClass = (this.icon && !this.loading) ? `bhi-${this.icon}` : '';
    this.flex = this.theme ? 'flex-wrapper' : '';

    if (this.side !== undefined && this.theme !== 'primary') {
      this.leftSide = (this.side === 'left');
      this.rightSide = !this.leftSide;
    }

    let clazzes: string[] = [this.theme];
    if (this.icon) {
      clazzes.push('has-icon');
    }
    if (this.loading) {
      clazzes.push('loading');
    }
    if (this.color) {
      clazzes.push(this.color);
    }
    if (this.state) {
      clazzes.push(this.state);
    }
    this.buttonClasses = clazzes.join(' ');
  }
}
