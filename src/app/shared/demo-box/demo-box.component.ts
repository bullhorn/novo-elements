import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-box',
  styleUrls: ['./demo-box.component.scss'],
  templateUrl: './demo-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBoxComponent implements OnChanges {
  @Input() public ts: string;
  @Input() public html: string;
  @Input() public style: string;
  @Input() public name: string;
  @Input() public label: string;

  public activeTab: string = 'ts';
  public showCode: boolean = false;

  public ngOnChanges(changes?: SimpleChanges): void {
    this.activeTab = this.ts ? 'ts' : this.html ? 'html' : 'style';
  }

  public changeTab(tab: string): void {
    this.activeTab = tab;
  }

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }
}
