import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ComponentFixture } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NovoTooltip } from './Tooltip.component';
import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltipModule } from './Tooltip.module';

@Component({
  selector: 'test-component',
  template: ` <div tooltip="test" tooltipPosition="right"></div>
    <div tooltip="test" [tooltipCloseOnClick]="true" tooltipPosition="right"></div>`,
  standalone: false,
})
class TestComponent {}

describe('Component: NovoTooltip', () => {
  describe('preline rendering', () => {
    let fixture: ComponentFixture<NovoTooltip>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NovoTooltipModule, OverlayModule],
        providers: [provideNoopAnimations()],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoTooltip);
    });

    it('should render a span per newline-delimited segment when preline is true', () => {
      const instance = fixture.componentInstance;
      instance.message.set('line1\nline2\nline3');
      instance.preline = true;
      instance.tooltipType = 'normal';
      instance.position = 'top';
      instance.noAnimate = true;
      fixture.detectChanges();
      const spans = fixture.debugElement.queryAll(By.css('span'));
      expect(spans.length).toBe(3);
      expect(spans[0].nativeElement.textContent).toBe('line1');
      expect(spans[1].nativeElement.textContent).toBe('line2');
      expect(spans[2].nativeElement.textContent).toBe('line3');
    });

    it('should not render spans when preline is false', () => {
      const instance = fixture.componentInstance;
      instance.message.set('single line');
      instance.preline = false;
      instance.tooltipType = 'normal';
      instance.position = 'top';
      instance.noAnimate = true;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('span')).length).toBe(0);
    });
  });
});

describe('Elements: TooltipDirective', () => {
  let fixture;
  let component;
  let tooltipHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent],
      imports: [OverlayModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
    tooltipHost = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });

  describe('function: onclick', () => {
    it('should not close tooltip on click', async () => {
      tooltipHost[0].triggerEventHandler('mouseenter');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
      tooltipHost[0].triggerEventHandler('click');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
    });

    it('should close tooltip on click', async () => {
      tooltipHost[1].triggerEventHandler('mouseenter');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeTruthy();
      tooltipHost[1].triggerEventHandler('click');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('novo-tooltip'))).toBeFalsy();
    });
  });
});
