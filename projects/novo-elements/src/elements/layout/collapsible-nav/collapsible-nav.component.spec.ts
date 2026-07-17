import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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

  it('expandCollapseState should carry the current state and width params', () => {
    component.collapse();
    fixture.componentRef.setInput('expandedWidth', '20rem');
    fixture.componentRef.setInput('collapsedWidth', '5rem');
    expect(component.expandCollapseState).toEqual({
      value: 'collapsed',
      params: { expandedWidth: '20rem', collapsedWidth: '5rem' },
    });
  });

  describe('overlayOnHover', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('overlayOnHover', true);
      component.collapse();
      fixture.detectChanges();
    });

    it('mouseenter while collapsed should expand the animation state and remove collapsed class', () => {
      component.onMouseEnter();
      fixture.detectChanges();
      expect(component.expandCollapseState.value).toBe('expanded');
      expect(component.isCollapsed).toBe(false);
    });

    it('mouseleave should collapse the animation state and restore collapsed class', () => {
      component.onMouseEnter();
      component.onMouseLeave();
      fixture.detectChanges();
      expect(component.expandCollapseState.value).toBe('collapsed');
      expect(component.isCollapsed).toBe(true);
    });

    it('mouseenter should have no effect when overlayOnHover is false', () => {
      fixture.componentRef.setInput('overlayOnHover', false);
      component.onMouseEnter();
      fixture.detectChanges();
      expect(component.expandCollapseState.value).toBe('collapsed');
      expect(component.isCollapsed).toBe(true);
    });

    it('setting collapsed to true while hovered should collapse immediately', () => {
      component.onMouseEnter();
      fixture.detectChanges();
      expect(component.expandCollapseState.value).toBe('expanded');
      component.collapse();
      fixture.detectChanges();
      expect(component.expandCollapseState.value).toBe('collapsed');
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
      expect(component.expandCollapseState.value).toBe('collapsed');
      expect(component.isCollapsed).toBe(true);
    });
  });
});
