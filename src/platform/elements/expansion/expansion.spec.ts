import {async, TestBed, fakeAsync, tick, ComponentFixture, flush} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NovoExpansionModule, NovoExpansionPanel} from './index';
// import {SPACE, ENTER} from '@angular/cdk/keycodes';
// import {dispatchKeyboardEvent} from '@angular/cdk/testing';


describe('NovoExpansionPanel', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        NovoExpansionModule
      ],
      declarations: [
        PanelWithContent,
        PanelWithContentInNgIf,
        PanelWithCustomMargin,
        LazyPanelWithContent,
        LazyPanelOpenOnLoad,
        PanelWithTwoWayBinding,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should expand and collapse the panel', fakeAsync(() => {
    const fixture = TestBed.createComponent(PanelWithContent);
    const contentEl = fixture.nativeElement.querySelector('.novo-expansion-panel-content');
    const headerEl = fixture.nativeElement.querySelector('.novo-expansion-panel-header');
    fixture.detectChanges();

    expect(headerEl.classList).not.toContain('novo-expanded');
    expect(contentEl.classList).not.toContain('novo-expanded');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    flush();

    expect(headerEl.classList).toContain('novo-expanded');
    expect(contentEl.classList).toContain('novo-expanded');
  }));

  it('should be able to render panel content lazily', fakeAsync(() => {
    let fixture = TestBed.createComponent(LazyPanelWithContent);
    let content = fixture.debugElement.query(By.css('.novo-expansion-panel-content')).nativeElement;
    fixture.detectChanges();

    expect(content.textContent.trim()).toBe('', 'Expected content element to be empty.');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();

    expect(content.textContent.trim())
        .toContain('Some content', 'Expected content to be rendered.');
  }));

  it('should render the content for a lazy-loaded panel that is opened on init', fakeAsync(() => {
    let fixture = TestBed.createComponent(LazyPanelOpenOnLoad);
    let content = fixture.debugElement.query(By.css('.novo-expansion-panel-content')).nativeElement;
    fixture.detectChanges();

    expect(content.textContent.trim())
        .toContain('Some content', 'Expected content to be rendered.');
  }));

  it('emit correct events for change in panel expanded state', () => {
    const fixture = TestBed.createComponent(PanelWithContent);
    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    expect(fixture.componentInstance.openCallback).toHaveBeenCalled();

    fixture.componentInstance.expanded = false;
    fixture.detectChanges();
    expect(fixture.componentInstance.closeCallback).toHaveBeenCalled();
  });

  it('should create a unique panel id for each panel', () => {
    const fixtureOne = TestBed.createComponent(PanelWithContent);
    const headerElOne = fixtureOne.nativeElement.querySelector('.novo-expansion-panel-header');
    const fixtureTwo = TestBed.createComponent(PanelWithContent);
    const headerElTwo = fixtureTwo.nativeElement.querySelector('.novo-expansion-panel-header');
    fixtureOne.detectChanges();
    fixtureTwo.detectChanges();

    const panelIdOne = headerElOne.getAttribute('aria-controls');
    const panelIdTwo = headerElTwo.getAttribute('aria-controls');
    expect(panelIdOne).not.toBe(panelIdTwo);
  });

  it('should set `aria-labelledby` of the content to the header id', () => {
    const fixture = TestBed.createComponent(PanelWithContent);
    const headerEl = fixture.nativeElement.querySelector('.novo-expansion-panel-header');
    const contentEl = fixture.nativeElement.querySelector('.novo-expansion-panel-content');

    fixture.detectChanges();

    const headerId = headerEl.getAttribute('id');
    const contentLabel = contentEl.getAttribute('aria-labelledby');

    expect(headerId).toBeTruthy();
    expect(contentLabel).toBeTruthy();
    expect(headerId).toBe(contentLabel);
  });

  it('should set the proper role on the content element', () => {
    const fixture = TestBed.createComponent(PanelWithContent);
    const contentEl = fixture.nativeElement.querySelector('.novo-expansion-panel-content');

    expect(contentEl.getAttribute('role')).toBe('region');
  });

  // it('should toggle the panel when pressing SPACE on the header', () => {
  //   const fixture = TestBed.createComponent(PanelWithContent);
  //   const headerEl = fixture.nativeElement.querySelector('.novo-expansion-panel-header');

  //   spyOn(fixture.componentInstance.panel, 'toggle');

  //   const event = dispatchKeyboardEvent(headerEl, 'keydown', SPACE);

  //   fixture.detectChanges();

  //   expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
  //   expect(event.defaultPrevented).toBe(true);
  // });

  // it('should toggle the panel when pressing ENTER on the header', () => {
  //   const fixture = TestBed.createComponent(PanelWithContent);
  //   const headerEl = fixture.nativeElement.querySelector('.novo-expansion-panel-header');

  //   spyOn(fixture.componentInstance.panel, 'toggle');

  //   const event = dispatchKeyboardEvent(headerEl, 'keydown', ENTER);

  //   fixture.detectChanges();

  //   expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
  //   expect(event.defaultPrevented).toBe(true);
  // });

  it('should not be able to focus content while closed', fakeAsync(() => {
    const fixture = TestBed.createComponent(PanelWithContent);
    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    tick(250);

    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.focus();
    expect(document.activeElement).toBe(button, 'Expected button to start off focusable.');

    button.blur();
    fixture.componentInstance.expanded = false;
    fixture.detectChanges();
    tick(250);

    button.focus();
    expect(document.activeElement).not.toBe(button, 'Expected button to no longer be focusable.');
  }));

  it('should not override the panel margin if it is not inside an accordion', fakeAsync(() => {
    let fixture = TestBed.createComponent(PanelWithCustomMargin);
    fixture.detectChanges();

    let panel = fixture.debugElement.query(By.css('novo-expansion-panel'));
    let styles = getComputedStyle(panel.nativeElement);

    expect(panel.componentInstance._hasSpacing()).toBe(false);
    expect(styles.marginTop).toBe('13px');
    expect(styles.marginBottom).toBe('13px');
    expect(styles.marginLeft).toBe('37px');
    expect(styles.marginRight).toBe('37px');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    tick(250);

    styles = getComputedStyle(panel.nativeElement);

    expect(panel.componentInstance._hasSpacing()).toBe(false);
    expect(styles.marginTop).toBe('13px');
    expect(styles.marginBottom).toBe('13px');
    expect(styles.marginLeft).toBe('37px');
    expect(styles.marginRight).toBe('37px');
  }));

  it('should be able to hide the toggle', () => {
    const fixture = TestBed.createComponent(PanelWithContent);
    const header = fixture.debugElement.query(By.css('.novo-expansion-panel-header')).nativeElement;

    fixture.detectChanges();

    expect(header.querySelector('.novo-expansion-indicator'))
        .toBeTruthy('Expected indicator to be shown.');

    fixture.componentInstance.hideToggle = true;
    fixture.detectChanges();

    expect(header.querySelector('.novo-expansion-indicator'))
        .toBeFalsy('Expected indicator to be hidden.');
  });

  it('should update the indicator rotation when the expanded state is toggled programmatically',
    fakeAsync(() => {
      const fixture = TestBed.createComponent(PanelWithContent);

      fixture.detectChanges();
      tick(250);

      const arrow = fixture.debugElement.query(By.css('.novo-expansion-indicator')).nativeElement;

      expect(arrow.style.transform).toBe('rotate(0deg)', 'Expected no rotation.');

      fixture.componentInstance.expanded = true;
      fixture.detectChanges();
      tick(250);

      expect(arrow.style.transform).toBe('rotate(180deg)', 'Expected 180 degree rotation.');
    }));

  it('should make sure accordion item runs ngOnDestroy when expansion panel is destroyed', () => {
    let fixture = TestBed.createComponent(PanelWithContentInNgIf);
    fixture.detectChanges();
    let destroyedOk = false;
    fixture.componentInstance.panel.destroyed.subscribe(() => destroyedOk = true);
    fixture.componentInstance.expansionShown = false;
    fixture.detectChanges();
    expect(destroyedOk).toBe(true);
  });

  it('should support two-way binding of the `expanded` property', () => {
    const fixture = TestBed.createComponent(PanelWithTwoWayBinding);
    const header = fixture.debugElement.query(By.css('novo-expansion-panel-header')).nativeElement;

    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toBe(false);

    header.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toBe(true);

    header.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toBe(false);
  });

  it('should not set the novo-expanded class until the open animation is done', fakeAsync(() => {
    const fixture = TestBed.createComponent(PanelWithContent);
    const contentEl = fixture.nativeElement.querySelector('.novo-expansion-panel-content');

    fixture.detectChanges();
    expect(contentEl.classList).not.toContain('novo-expanded',
        'Expected class not to be there on init');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    expect(contentEl.classList).not.toContain('novo-expanded',
        'Expected class not to be added immediately after becoming expanded');

    flush();
    expect(contentEl.classList).toContain('novo-expanded',
        'Expected class to be added after the animation has finished');
  }));

  describe('disabled state', () => {
    let fixture: ComponentFixture<PanelWithContent>;
    let panel: HTMLElement;
    let header: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(PanelWithContent);
      fixture.detectChanges();
      panel = fixture.debugElement.query(By.css('novo-expansion-panel')).nativeElement;
      header = fixture.debugElement.query(By.css('novo-expansion-panel-header')).nativeElement;
    });

    it('should toggle the aria-disabled attribute on the header', () => {
      expect(header.getAttribute('aria-disabled')).toBe('false');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(header.getAttribute('aria-disabled')).toBe('true');
    });

    it('should toggle the expansion indicator', () => {
      expect(panel.querySelector('.novo-expansion-indicator')).toBeTruthy();

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(panel.querySelector('.novo-expansion-indicator')).toBeFalsy();
    });

    it('should not be able to toggle the panel via a user action if disabled', () => {
      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(header.classList).not.toContain('novo-expanded');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      header.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(header.classList).not.toContain('novo-expanded');
    });

    it('should be able to toggle a disabled expansion panel programmatically', () => {
      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(header.classList).not.toContain('novo-expanded');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      fixture.componentInstance.expanded = true;
      fixture.detectChanges();

      expect(fixture.componentInstance.panel.expanded).toBe(true);
      expect(header.classList).toContain('novo-expanded');
    });

  });
});


@Component({
  template: `
  <novo-expansion-panel [expanded]="expanded"
                      [hideToggle]="hideToggle"
                      [disabled]="disabled"
                      (opened)="openCallback()"
                      (closed)="closeCallback()">
    <novo-expansion-panel-header>Panel Title</novo-expansion-panel-header>
    <p>Some content</p>
    <button>I am a button</button>
  </novo-expansion-panel>`
})
class PanelWithContent {
  expanded = false;
  hideToggle = false;
  disabled = false;
  openCallback = jasmine.createSpy('openCallback');
  closeCallback = jasmine.createSpy('closeCallback');
  @ViewChild(NovoExpansionPanel) panel: NovoExpansionPanel;
}

@Component({
  template: `
  <div *ngIf="expansionShown">
    <novo-expansion-panel>
      <novo-expansion-panel-header>Panel Title</novo-expansion-panel-header>
    </novo-expansion-panel>
  </div>`
})
class PanelWithContentInNgIf {
  expansionShown = true;
  @ViewChild(NovoExpansionPanel) panel: NovoExpansionPanel;
}

@Component({
  styles: [
    `novo-expansion-panel {
      margin: 13px 37px;
    }`
  ],
  template: `
  <novo-expansion-panel [expanded]="expanded">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores officia, aliquam dicta
    corrupti maxime voluptate accusamus impedit atque incidunt pariatur.
  </novo-expansion-panel>`
})
class PanelWithCustomMargin {
  expanded: boolean = false;
}

@Component({
  template: `
  <novo-expansion-panel [expanded]="expanded">
    <novo-expansion-panel-header>Panel Title</novo-expansion-panel-header>

    <ng-template matExpansionPanelContent>
      <p>Some content</p>
      <button>I am a button</button>
    </ng-template>
  </novo-expansion-panel>`
})
class LazyPanelWithContent {
  expanded = false;
}

@Component({
  template: `
  <novo-expansion-panel [expanded]="true">
    <novo-expansion-panel-header>Panel Title</novo-expansion-panel-header>

    <ng-template matExpansionPanelContent>
      <p>Some content</p>
    </ng-template>
  </novo-expansion-panel>`
})
class LazyPanelOpenOnLoad {}


@Component({
  template: `
  <novo-expansion-panel [(expanded)]="expanded">
    <novo-expansion-panel-header>Panel Title</novo-expansion-panel-header>
  </novo-expansion-panel>`
})
class PanelWithTwoWayBinding {
  expanded = false;
}
