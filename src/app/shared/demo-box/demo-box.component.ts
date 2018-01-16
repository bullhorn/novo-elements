import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IDEAL_COLORS } from '../../consts';

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

  public activeTab: string = 'ts';
  public showCode: boolean = false;
  public randColor: string = IDEAL_COLORS[Math.floor(Math.random() * IDEAL_COLORS.length)];
}
