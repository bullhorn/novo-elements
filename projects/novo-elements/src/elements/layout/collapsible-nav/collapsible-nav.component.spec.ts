import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { tick } from 'novo-testing';
import { NovoCollapsibleNavComponent } from './collapsible-nav.component';

describe('Elements: NovoCollapsibleNavComponent', () => {
  let fixture: ComponentFixture<NovoCollapsibleNavComponent>;
  let component: NovoCollapsibleNavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovoCollapsibleNavComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoCollapsibleNavComponent);
    component = fixture.componentInstance;
    const element = component.element;
    vi.spyOn(element.nativeElement, 'matches').mockReturnValue(true);
    fixture.detectChanges();
  });

  it('should be compiled', () => {
    expect(component).toBeDefined();
  });

  it('should default to expanded (not collapsed)', () => {
    expect(component.collapsed()).toBe(false);
    expect(component.isCollapsed).toBe(false);
  });

  it('should default expandedWidth and collapsedWidth', () => {
    expect(component.expandedWidth()).toBe('18rem');
    expect(component.collapsedWidth()).toBe('4rem');
  });

  it('toggle() should flip the collapsed state and emit collapsedChange', () => {
    let emitted: boolean | undefined;
    const subscription = component.collapsed.subscribe((value) => {
      emitted = value;
    });
    component.toggle();
    expect(component.collapsed()).toBe(true);
    expect(emitted).toBe(true);
    component.toggle();
    expect(component.collapsed()).toBe(false);
    expect(emitted).toBe(false);
    subscription.unsubscribe();
  });

  it('collapse() should set collapsed to true; expand() should set it to false', () => {
    component.collapse();
    expect(component.collapsed()).toBe(true);
    component.expand();
    expect(component.collapsed()).toBe(false);
  });

  it('should reflect the collapsed state on the host class', () => {
    component.collapse();
    expect(component.isCollapsed).toBe(true);
  });

  it('should apply the width params as CSS styles', async () => {
    component.collapse();
    fixture.componentRef.setInput('expandedWidth', '20rem');
    fixture.componentRef.setInput('collapsedWidth', '5rem');
    fixture.detectChanges();
    expect(fixture.componentRef.location.nativeElement.style.getPropertyValue('--novo-collapsible-nav-width')).toBe('5rem');
  });

  describe('CSS width transition', () => {
    const widthVar = () => component.element.nativeElement.style.getPropertyValue('--novo-collapsible-nav-width');

    // jsdom implements the TransitionEvent constructor but ignores `propertyName` in its init dict,
    // so it has to be defined explicitly for the component's property filter to be exercised at all.
    const transitionEndEvent = (propertyName: string): TransitionEvent => {
      const evt = new TransitionEvent('transitionend', { bubbles: true });
      Object.defineProperty(evt, 'propertyName', { value: propertyName });
      return evt;
    };

    it('should publish the expanded width as a custom property', () => {
      expect(widthVar()).toBe('18rem');
    });

    it('should publish the collapsed width after collapse()', () => {
      component.collapse();
      fixture.detectChanges();
      expect(widthVar()).toBe('4rem');
    });

    it('should publish transitionTime as a custom property', () => {
      expect(component.element.nativeElement.style.getPropertyValue('--novo-collapsible-nav-transition-time')).toBe('300ms');
    });

    it('should update the width when expandedWidth changes while already expanded', () => {
      expect(widthVar()).toBe('18rem');
      fixture.componentRef.setInput('expandedWidth', '30rem');
      fixture.detectChanges();
      expect(widthVar()).toBe('30rem');
    });

    it('should ignore transitionend for properties other than width', () => {
      vi.spyOn(component.transitionChange, 'emit');
      component.element.nativeElement.dispatchEvent(transitionEndEvent('height'));
      expect(component.transitionChange.emit).not.toHaveBeenCalled();
    });

    it('should ignore transitionend bubbled from projected content', () => {
      vi.spyOn(component.transitionChange, 'emit');
      const child = document.createElement('div');
      component.element.nativeElement.appendChild(child);
      child.dispatchEvent(transitionEndEvent('width'));
      expect(component.transitionChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('overlayOnHover', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('overlayOnHover', true);
      component.collapse();
      fixture.detectChanges();
    });

    it('mouseenter while collapsed should expand the animation state and remove collapsed class', async () => {
      component.onMouseEnter();
      fixture.detectChanges();
      await tick(400);
      expect(component.appliedWidth()).toBe('18rem');
      expect(component.isCollapsed).toBe(false);
    });

    it('mouseleave should collapse the animation state and restore collapsed class', () => {
      component.onMouseEnter();
      component.onMouseLeave();
      fixture.detectChanges();
      expect(component.appliedWidth()).toBe('4rem');
      expect(component.isCollapsed).toBe(true);
    });

    it('mouseenter should have no effect when overlayOnHover is false', () => {
      fixture.componentRef.setInput('overlayOnHover', false);
      component.onMouseEnter();
      fixture.detectChanges();
      expect(component.appliedWidth()).toBe('4rem');
      expect(component.isCollapsed).toBe(true);
    });

    it('setting collapsed to true while hovered should collapse immediately', async () => {
      component.onMouseEnter();
      fixture.detectChanges();
      await tick(40);
      expect(component.appliedWidth()).toBe('18rem');
      component.collapse();
      fixture.detectChanges();
      expect(component.appliedWidth()).toBe('4rem');
    });

    it('should not expand if the user\'s mouse exits before the debounce finishes', async () => {
      fixture.componentRef.setInput('expandDelay', 300);
      component.onMouseEnter();
      fixture.detectChanges();
      await tick(10);
      component.onMouseLeave();
      fixture.detectChanges();
      await tick(10);

      expect(component.appliedWidth()).toBe('4rem');
    });

    it('setting collapsed input to true while hovered should reset hover via effect', () => {
      component.expand();
      fixture.detectChanges();
      component.onMouseEnter();
      fixture.detectChanges();
      expect(component.isCollapsed).toBe(false);
      fixture.componentRef.setInput('collapsed', true);
      fixture.detectChanges();
      expect(component.isCollapsed).toBe(true);
    });

    it('mouseleave without prior mouseenter should be a no-op', () => {
      component.onMouseLeave();
      fixture.detectChanges();
      expect(component.isCollapsed).toBe(true);
    });
  });
});
