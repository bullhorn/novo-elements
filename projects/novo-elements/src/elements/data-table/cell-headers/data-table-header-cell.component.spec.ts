// NG2
import { TestBed, async } from '@angular/core/testing';
import { NovoDataTableCellHeader } from './data-table-header-cell.component';
import { NovoButtonModule, NovoLabelService, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule } from '../../..';
import { FormsModule } from '@angular/forms';
import { DataTableState } from '../state/data-table-state.service';
// App

describe('Elements: NovoDataTableCellHeader', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTableCellHeader],
      imports: [FormsModule, NovoTooltipModule, NovoButtonModule, NovoDropdownModule, NovoDatePickerModule],
      providers: [NovoLabelService, DataTableState],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTableCellHeader);
    component = fixture.debugElement.componentInstance;
  }));

  beforeEach(() => {
    component.config = {
      filterable: true,
      sortable: true,
      resizable: true,
    };
  });

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.ngOnInit).toBeDefined();
    });
  });

  describe('Method: startResize(mouseDownEvent: MouseEvent)', () => {
    let mouseDownEvent: MouseEvent;

    beforeEach(() => {
      mouseDownEvent = window.document.createEvent('MouseEvents');
      mouseDownEvent.initEvent('mousedown', true, true);
      spyOn(mouseDownEvent, 'preventDefault');
    });

    it('should stop from dispatching the event', () => {
      component.startResize(mouseDownEvent);
      expect(mouseDownEvent.preventDefault).toHaveBeenCalled();
    });

    it('should add subscriptions to global list', () => {
      component.startResize(mouseDownEvent);
      expect(component.subscriptions.length).toEqual(2);
    });

    it('should unsubscribe when the mouse is lifted', () => {
      component.startResize(mouseDownEvent);

      let mouseUpEvent = window.document.createEvent('MouseEvents');
      mouseUpEvent.initEvent('mouseup', true, true);
      window.document.dispatchEvent(mouseUpEvent);

      expect(component.subscriptions[0].closed).toBeTruthy();
      expect(component.subscriptions[1].closed).toBeTruthy();
    });
  });
});
