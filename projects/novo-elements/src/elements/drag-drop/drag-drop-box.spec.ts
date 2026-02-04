// NG2
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// APP
import { NovoDragBoxParent } from './drag-drop-box';
import { NovoDragDropModule } from './drag-drop.module';

@Component({
  selector: 'test-drag-drop',
  template: `
    <div [novoDragDrop]="items">
      <button *ngFor="let item of items">
        <span class="novo-drag-target">{{ item }}</span>
        <span class="non-draggable-region"></span>
      </button>
    </div>`,
  styles: [],
  standalone: false,
})
class DragDropTestComponent {
  items = [1, 2, 3, 4, 5];
}

class FakeEvent {
  constructor(public target: HTMLElement, public currentTarget?: HTMLElement, other?: any) {
    if (other) {
      Object.assign(this, other);
    }
  }

  preventDefault() {}

  stopPropagation() {}

  dataTransfer = {
    effectAllowed: 'none',
    dropEffect: 'undefined',
  }
}

describe('Elements: NovoDragDropParent', () => {
  let fixture: ComponentFixture<DragDropTestComponent>;
  let component: DragDropTestComponent;
  let directiveDebugElement: DebugElement;
  let directive: NovoDragBoxParent<number>;
  let draggableItems: DebugElement[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DragDropTestComponent],
      imports: [NovoDragDropModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DragDropTestComponent);
    directive = fixture.debugElement.queryAllNodes(By.directive(NovoDragBoxParent))[0].injector.get(NovoDragBoxParent);
    component = fixture.componentRef.instance;
    fixture.detectChanges();
    draggableItems = fixture.debugElement.queryAll(By.css('[draggable]'));
  }));

  function itemTextOrder(): string[] {
    return Array.prototype.map.call(fixture.debugElement.nativeElement.querySelectorAll('[draggable]'), d => d.textContent);
  }

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(NovoDragBoxParent))).toBeTruthy();
  });

  it('should move first item to fourth position', () => {
    const itemOne = draggableItems[0];
    const itemFour = draggableItems[3];
    const startEvt = new FakeEvent(itemOne.nativeElement, undefined);
    jest.spyOn(startEvt, 'preventDefault');
    // this function mocked, as it's not easy to replicate bounds calculation in a test environment
    jest.spyOn(directive, 'isElementWithinEventBounds').mockReturnValue(true);
    let itemsAfterFinish;
    directive.novoDragDropFinish.subscribe(event => {
      itemsAfterFinish = event.allItems;
    });
    itemOne.triggerEventHandler('dragstart', startEvt);
    expect(startEvt.preventDefault).not.toHaveBeenCalled();
    directive.onDragOver(new FakeEvent(itemFour.nativeElement) as any);
    itemOne.triggerEventHandler('drop', new FakeEvent(itemOne.nativeElement, itemFour.nativeElement));
    expect(itemTextOrder()).toEqual(['2', '3', '4', '1', '5']);
    expect(itemsAfterFinish).toBeDefined();
    expect(itemsAfterFinish).toEqual([2, 3, 4, 1, 5]);
  });

  it('should move fourth item to first position', () => {
    const itemOne = draggableItems[0];
    const itemFour = draggableItems[3];
    const startEvt = new FakeEvent(itemFour.nativeElement, undefined);
    jest.spyOn(startEvt, 'preventDefault');
    // this function mocked, as it's not easy to replicate bounds calculation in a test environment
    jest.spyOn(directive, 'isElementWithinEventBounds').mockReturnValue(true);
    let itemsAfterFinish;
    directive.novoDragDropFinish.subscribe(event => {
      itemsAfterFinish = event.allItems;
    });
    itemFour.triggerEventHandler('dragstart', startEvt);
    expect(startEvt.preventDefault).not.toHaveBeenCalled();
    directive.onDragOver(new FakeEvent(itemOne.nativeElement) as any);
    itemFour.triggerEventHandler('drop', new FakeEvent(itemFour.nativeElement, itemOne.nativeElement));
    expect(itemTextOrder()).toEqual(['4', '1', '2', '3', '5']);
    expect(itemsAfterFinish).toBeDefined();
    expect(itemsAfterFinish).toEqual([4, 1, 2, 3, 5]);
  });

  it('should reject drag if it is outside the draggable region', () => {
    jest.spyOn(directive, 'isElementWithinEventBounds').mockReturnValue(false);
    const itemOne = draggableItems[0];
    const itemOneDragPt = itemOne.query(By.css('.novo-drag-target'));
    const startEvt: any = new FakeEvent(itemOne.nativeElement, undefined);
    jest.spyOn(startEvt, 'preventDefault');
    itemOne.triggerEventHandler('dragstart', startEvt);
    expect(directive.isElementWithinEventBounds).toHaveBeenCalledWith(itemOneDragPt.nativeElement, startEvt);
    expect(startEvt.preventDefault).toHaveBeenCalled();

  });

  it('should find whether a target is within event bounds', () => {
    const mockRect = {
      left: 150,
      right: 250,
      top: 220,
      bottom: 320,
    };
    const mockElement: any = {
      getBoundingClientRect() {
        return mockRect;
      },
    };
    expect(directive.isElementWithinEventBounds(mockElement, {
      clientX: 170,
      clientY: 280,
    } as any)).toBeTruthy();

    expect(directive.isElementWithinEventBounds(mockElement, {
      clientX: 140,
      clientY: 280,
    } as any)).toBeFalsy();

    expect(directive.isElementWithinEventBounds(mockElement, {
      clientX: 160,
      clientY: 200,
    } as any)).toBeFalsy();
  });

  it('should reset the sorting to normal if the user moves their mouse out of the drag region', () => {
    const itemOne = draggableItems[0];
    const itemFour = draggableItems[3];
    const startEvt = new FakeEvent(itemOne.nativeElement, undefined);
    jest.spyOn(startEvt, 'preventDefault');
    // Return true first when starting drag and checking if we're within novo-drag-target. Then, false when running drag event
    // and deciding we are out of bounds of the drag box.
    jest.spyOn(directive, 'isElementWithinEventBounds').mockReturnValueOnce(true).mockReturnValueOnce(false);
    itemOne.triggerEventHandler('dragstart', startEvt);
    expect(startEvt.preventDefault).not.toHaveBeenCalled();
    directive.onDragOver(new FakeEvent(itemFour.nativeElement) as any);
    expect(itemTextOrder()).toEqual(['2', '3', '4', '1', '5']);

    // fixture element is not inside the drag box, so this should count as a drag out
    const dragEvent = new FakeEvent(fixture.debugElement.nativeElement) as any;
    directive.onDragOver(dragEvent);
    fixture.debugElement.query(By.directive(NovoDragBoxParent)).triggerEventHandler('dragover', dragEvent);
    itemOne.triggerEventHandler('dragend', new FakeEvent(itemOne.nativeElement));

    // drag event sees we are not within bounds, and resets the order
    expect(itemTextOrder()).toEqual(['1', '2', '3', '4', '5']);
    expect(dragEvent.dataTransfer.dropEffect).toBe('none');
  });

  it('should trigger move operation if the target element is *inside* of a draggable item', () => {
    const itemOne = draggableItems[0];
    const itemFour = draggableItems[3];
    const startEvt = new FakeEvent(itemOne.nativeElement, undefined);
    jest.spyOn(startEvt, 'preventDefault');
    // Return true first when starting drag and checking if we're within novo-drag-target. Then, false when running drag event
    // and deciding we are out of bounds of the drag box.
    jest.spyOn(directive, 'isElementWithinEventBounds').mockReturnValueOnce(true).mockReturnValueOnce(false);
    itemOne.triggerEventHandler('dragstart', startEvt);
    expect(startEvt.preventDefault).not.toHaveBeenCalled();

    // fixture element is not inside the drag box, so this should count as a drag out
    const dragEvent = new FakeEvent(itemFour.query(By.css('.non-draggable-region')).nativeElement) as any;
    directive.onDragOver(dragEvent);

    // drag event sees the target is inside item 4, and processes the move
    expect(itemTextOrder()).toEqual(['2', '3', '4', '1', '5']);
    expect(dragEvent.dataTransfer.dropEffect).toBe('move');
  });

  it('should automatically update if the component externally removes data', async () => {
    component.items.pop();
    fixture.detectChanges();
    await fixture.whenStable();
    draggableItems = fixture.debugElement.queryAll(By.css('[draggable]'));
    expect(itemTextOrder()).toEqual(['1', '2', '3', '4']);
    expect(directive.itemsReordered).toEqual([1, 2, 3, 4]);
  });

  it('should automatically update if the component externally adds data', async () => {
    component.items.push(6);
    fixture.detectChanges();
    await fixture.whenStable();
    draggableItems = fixture.debugElement.queryAll(By.css('[draggable]'));
    expect(itemTextOrder()).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(directive.itemsReordered).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
