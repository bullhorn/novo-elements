// NG2
import { TestBed, async } from '@angular/core/testing';
import { NovoDataTableCellHeader } from './data-table-header-cell.component';
import { NovoButtonModule, NovoLabelService, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule } from '../../..';
import { FormsModule } from '@angular/forms';
import { DataTableState } from '../state/data-table-state.service';
import { EventEmitter } from '@angular/core';
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
    component._column = {
      width: 999,
    };
    component.resizable = new EventEmitter();
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
      mouseDownEvent.initMouseEvent('mousedown', true, true, window, 1, 50, 50, 500, 50, false, false, false, false, 0, null);
      spyOn(mouseDownEvent, 'preventDefault');

      component.elementRef = {
        nativeElement: {
          getBoundingClientRect: () => {
            return {
              width: 120,
            };
          },
        },
      };
    });

    it('should stop from dispatching the event', () => {
      component.startResize(mouseDownEvent);
      expect(mouseDownEvent.preventDefault).toHaveBeenCalled();
    });

    it('should add subscriptions to global list', () => {
      component.startResize(mouseDownEvent);
      expect(component.subscriptions.length).toEqual(2);
    });

    it('should change the width when moving mouse', () => {
      spyOn(component.renderer, 'setStyle');
      component.startResize(mouseDownEvent);

      let mouseMoveEvent: MouseEvent = window.document.createEvent('MouseEvents');
      mouseMoveEvent.initMouseEvent('mousemove', true, true, window, 1, 50, 50, 550, 50, false, false, false, false, 0, null);
      window.document.dispatchEvent(mouseMoveEvent);

      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'min-width', '170px');
      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'width', '170px');
      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'max-width', '170px');
      expect(component._column.width).toEqual(170);
    });
  });
});
