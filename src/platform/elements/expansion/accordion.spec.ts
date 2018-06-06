import {async, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NovoExpansionModule, NovoAccordion} from './index';


describe('CdkAccordion', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NovoExpansionModule
      ],
      declarations: [
        SetOfItems
      ],
    });
    TestBed.compileComponents();
  }));

  it('should ensure only one item is expanded at a time', () => {
    const fixture = TestBed.createComponent(SetOfItems);
    const items = fixture.debugElement.queryAll(By.css('.novo-expansion-panel'));

    fixture.componentInstance.firstPanelExpanded = true;
    fixture.detectChanges();
    expect(items[0].classes['novo-expanded']).toBeTruthy();
    expect(items[1].classes['novo-expanded']).toBeFalsy();

    fixture.componentInstance.secondPanelExpanded = true;
    fixture.detectChanges();
    expect(items[0].classes['novo-expanded']).toBeFalsy();
    expect(items[1].classes['novo-expanded']).toBeTruthy();
  });

  it('should allow multiple items to be expanded simultaneously', () => {
    const fixture = TestBed.createComponent(SetOfItems);
    const panels = fixture.debugElement.queryAll(By.css('.novo-expansion-panel'));

    fixture.componentInstance.multi = true;
    fixture.componentInstance.firstPanelExpanded = true;
    fixture.componentInstance.secondPanelExpanded = true;
    fixture.detectChanges();
    expect(panels[0].classes['novo-expanded']).toBeTruthy();
    expect(panels[1].classes['novo-expanded']).toBeTruthy();
  });

//   it('should expand or collapse all enabled items', () => {
//     const fixture = TestBed.createComponent(SetOfItems);
//     const panels = fixture.debugElement.queryAll(By.css('.novo-expansion-panel'));

//     fixture.componentInstance.multi = true;
//     fixture.componentInstance.secondPanelExpanded = true;
//     fixture.detectChanges();
//     expect(panels[0].classes['novo-expanded']).toBeFalsy();
//     expect(panels[1].classes['novo-expanded']).toBeTruthy();

//     fixture.componentInstance.accordion.openAll();
//     fixture.detectChanges();
//     expect(panels[0].classes['novo-expanded']).toBeTruthy();
//     expect(panels[1].classes['novo-expanded']).toBeTruthy();

//     fixture.componentInstance.accordion.closeAll();
//     fixture.detectChanges();
//     expect(panels[0].classes['novo-expanded']).toBeFalsy();
//     expect(panels[1].classes['novo-expanded']).toBeFalsy();
//   });

//   it('should not expand or collapse disabled items', () => {
//     const fixture = TestBed.createComponent(SetOfItems);
//     const panels = fixture.debugElement.queryAll(By.css('.novo-expansion-panel'));

//     fixture.componentInstance.multi = true;
//     fixture.componentInstance.secondPanelDisabled = true;
//     fixture.detectChanges();
//     fixture.componentInstance.accordion.openAll();
//     fixture.detectChanges();
//     expect(panels[0].classes['novo-expanded']).toBeTruthy();
//     expect(panels[1].classes['novo-expanded']).toBeFalsy();

//     fixture.componentInstance.accordion.closeAll();
//     fixture.detectChanges();
//     expect(panels[0].classes['novo-expanded']).toBeFalsy();
//     expect(panels[1].classes['novo-expanded']).toBeFalsy();
//   });
});


@Component({template: `
  <novo-accordion [multi]="multi">
    <novo-expansion-panel [expanded]="firstPanelExpanded">
      <novo-expansion-panel-header>Summary</novo-expansion-panel-header>
      <p>Content</p>
    </novo-expansion-panel>
    <novo-expansion-panel [expanded]="secondPanelExpanded" [disabled]="secondPanelDisabled">
      <novo-expansion-panel-header>Summary</novo-expansion-panel-header>
      <p>Content</p>
    </novo-expansion-panel>
  </novo-accordion>`})
class SetOfItems {
  @ViewChild(NovoAccordion) accordion: NovoAccordion;

  multi: boolean = false;
  firstPanelExpanded: boolean = false;
  secondPanelExpanded: boolean = false;
  secondPanelDisabled: boolean = false;
}
