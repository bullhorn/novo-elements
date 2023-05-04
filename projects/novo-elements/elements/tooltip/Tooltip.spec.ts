// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
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
