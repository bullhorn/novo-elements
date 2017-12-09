import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-section',
  styleUrls: ['./demo-section.component.scss'],
  templateUrl: './demo-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSectionComponent {
  @Input() public name: string;
  @Input() public src: string;
}
