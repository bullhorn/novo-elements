// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
// App
import { TooltipDirective } from './Tooltip.directive';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `<div tooltip="test" tooltipPosition="right"></div>
             <div tooltip="test" [tooltipCloseOnClick]="true" tooltipPosition="right"></div>`,
})
class TestComponent {}

describe('Elements: TooltipDirective', () => {
  let fixture;
  let component;
  let tooltipHost;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent],
      imports: [OverlayModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
    tooltipHost = fixture.debugElement.queryAll(By.directive(TooltipDirective))
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });

  describe('function: onclick', () => {
    it('should not close tooltip on click', async() => {
      tooltipHost[0].triggerEventHandler('mouseenter');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
      tooltipHost[0].triggerEventHandler('click');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
    });

    it('should close tooltip on click', async() => {
      tooltipHost[1].triggerEventHandler('mouseenter');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
      tooltipHost[1].triggerEventHandler('click')
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeFalsy();
    });
  });

});
