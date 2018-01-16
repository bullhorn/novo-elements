import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-box',
  styleUrls: ['./demo-box.component.scss'],
  templateUrl: './demo-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBoxComponent {
  @Input() public ts: string;
  @Input() public html: string;
  @Input() public style: string;
  @Input() public name: string;
  @Input() public label: string;

  public showCode: boolean = false;

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }
}
