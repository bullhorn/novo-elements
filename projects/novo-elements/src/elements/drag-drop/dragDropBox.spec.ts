// NG2
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// APP
import { NovoDragDropModule } from './dragdrop.module';
import { NovoDragBoxParent } from './dragDropBox';

@Component({
    selector: 'test-drag-drop',
    template: `<div [novoDragDrop]="items">
        <button *ngFor="let item of items">Button</button>
    </div>`
})
class DragDropTestComponent {
    items: [1,2,3];
}

describe('Elements: NovoDragDropParent', () => {
  let fixture: ComponentFixture<DragDropTestComponent>;
  let component: DragDropTestComponent;
  let directive: NovoDragBoxParent<number>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DragDropTestComponent],
        imports: [NovoDragDropModule]
    }).compileComponents();
    fixture = TestBed.createComponent(DragDropTestComponent);
    component = fixture.componentRef.instance;
    fixture.debugElement.query(By)
  }));