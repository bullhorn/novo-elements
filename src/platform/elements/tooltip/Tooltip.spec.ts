// NG2
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
// App
import { TooltipDirective } from './Tooltip.directive';

@Component({
  selector: 'test-component',
  template: `<div tooltip="test" tooltipPosition="right"></div>`,
})
class TestComponent {}

describe('Elements: TooltipDirective', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent],
      imports: [OverlayModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });
});
