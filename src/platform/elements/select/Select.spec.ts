// NG
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';

const KeyEvent = (code) => {
  let event: any = document.createEvent('Event');
  event.keyCode = code;
  return event;
};

describe('Elements: NovoSelectElement', () => {
  let fixture, comp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoSelectModule],
      providers: [
        {
          provide: NovoLabelService,
          useClass: NovoLabelService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSelectElement);
    comp = fixture.debugElement.componentInstance;
  }));

  describe('Function: ngOnInit', () => {
    it('should invoke ngOnChanges', () => {
      comp.options = ['1', '2', '3'];
      comp.ngOnInit();
      expect(comp.filteredOptions).toBeDefined();
      expect(comp.filteredOptions[0].value).toEqual('1');
      expect(comp.filteredOptions[0].label).toEqual('1');
    });
  });

  describe('Function: ngOnChanges', () => {
    it('should convert readOnly from a non-boolean to a boolean', () => {
      comp.readonly = 'true';
      comp.ngOnChanges();
      expect(comp.readonly).toEqual(false);
    });
    it('should set filteredOptions to an array of objects from an array of strings', () => {
      comp.options = ['foo', 'bar', 'baz'];
      comp.ngOnChanges();
      expect(comp.filteredOptions).toEqual([
        { value: 'foo', label: 'foo' },
        { value: 'bar', label: 'bar' },
        { value: 'baz', label: 'baz' },
      ]);
    });
    it('should set filteredOptions to an array of objects', () => {
      comp.options = [{ readOnly: false }, { readOnly: true }, {}];
      comp.ngOnChanges();
      expect(comp.filteredOptions).toEqual([{ readOnly: false, active: false }, { active: false }]);
    });
    it('should clone each option in filteredOptions so its object reference changes', () => {
      const option = { value: 'clone', label: 'me' };
      comp.options = [option];
      comp.ngOnChanges();
      expect(comp.filteredOptions[0]).not.toBe(option);
      expect(comp.filteredOptions[0]).toEqual({ value: 'clone', label: 'me', active: false });
    });
    it('should invoke clear', () => {
      const mockPlaceholder = { test: true };
      comp.model = false;
      comp.createdItem = false;
      comp.placeholder = mockPlaceholder;
      comp.ngOnChanges();
      expect();
      expect(comp.selected).toEqual({
        label: mockPlaceholder,
        value: null,
        active: false,
      });
      expect(comp.header).toEqual({
        open: false,
        valid: true,
        value: '',
      });
      expect(comp.selectedIndex).toEqual(-1);
      expect(comp.empty).toEqual(true);
    });
    it('should invoke select', () => {
      spyOn(comp.onSelect, 'emit');
      comp.createdItem = 'baz';
      comp.options = [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }, { label: 'baz', value: 'baz' }];
      comp.ngOnChanges();
      expect(comp.selectedIndex).toEqual(2);
      expect(comp.selected).toEqual({ label: 'baz', value: 'baz', active: true });
      expect(comp.empty).toEqual(false);
      expect(comp.onSelect.emit).toHaveBeenCalledWith({ selected: 'baz' });
    });
    it('should invoke writeValue', () => {
      spyOn(comp, 'select');
      comp.model = 'bar';
      comp.options = [{ value: 'foo' }, { value: 'bar' }, { value: 'baz' }];
      comp.filteredOptions = [{ value: 'foo' }, { value: 'bar' }];
      comp.ngOnChanges();
      expect(comp.select).toHaveBeenCalledWith({ value: 'bar', active: false }, 1, false);
      expect(comp.empty).toEqual(false);
    });
    it('should invoke openPanel', () => {
      comp.overlay = {
        panelOpen: true,
        openPanel: jasmine.createSpy('openPanel'),
      };
      comp.ngOnChanges();
      expect(comp.overlay.openPanel).toHaveBeenCalled();
    });
  });

  describe('Function: openPanel', () => {
    it('should call overlay.openPanel', () => {
      spyOn(comp.overlay, 'openPanel');
      comp.openPanel();
      expect(comp.overlay.openPanel).toHaveBeenCalled();
    });
  });

  describe('Function: closePanel', () => {
    it('should call overlay.closePanel', () => {
      spyOn(comp.overlay, 'closePanel');
      comp.closePanel();
      expect(comp.overlay.closePanel).toHaveBeenCalled();
    });
  });

  describe('Function: panelOpen', () => {
    it('should return true', () => {
      comp.overlay = { panelOpen: true };
      expect(comp.panelOpen).toEqual(true);
    });
    it('should return false', () => {
      comp.overlay = { panelOpen: false };
      expect(comp.panelOpen).toEqual(false);
    });
  });

  describe('Function: setValueAndClose(event)', () => {
    it('should invoke select', () => {
      const mockEvent: any = {
        value: { test: true },
        index: 1,
      };
      comp.setValueAndClose(mockEvent);
      expect(comp.selectedIndex).toEqual(1);
      expect(comp.selected).toEqual({ test: true, active: true });
      expect(comp.empty).toEqual(false);
    });
    it('should invoke closePanel', () => {
      spyOn(comp.overlay, 'closePanel');
      comp.setValueAndClose({});
      expect(comp.overlay.closePanel).toHaveBeenCalled();
    });
  });

  describe('Function: select(option, i, fireEvents)', () => {
    it('should set selectedIndex', () => {
      comp.select({}, 1);
      expect(comp.selectedIndex).toEqual(1);
    });
    it('should set selected', () => {
      comp.select({ test: true });
      expect(comp.selected).toEqual({ test: true, active: true });
    });
    it('should set empty', () => {
      comp.select({});
      expect(comp.empty).toEqual(false);
    });
    it('should invoke onModelChange', () => {
      spyOn(comp, 'onModelChange');
      comp.select({ value: 'foo' }, 1);
      expect(comp.onModelChange).toHaveBeenCalledWith('foo');
    });
    it('should emit onSelect', () => {
      spyOn(comp.onSelect, 'emit');
      comp.select({ value: 'foo' });
      expect(comp.onSelect.emit).toHaveBeenCalledWith({ selected: 'foo' });
    });
    it('should not invoke onModelChange', () => {
      spyOn(comp, 'onModelChange');
      comp.select({ value: 'foo' }, 1, false);
      expect(comp.onModelChange).not.toHaveBeenCalled();
    });
    it('should not emit onSelect', () => {
      spyOn(comp.onSelect, 'emit');
      comp.select({ value: 'foo' }, 1, false);
      expect(comp.onSelect.emit).not.toHaveBeenCalled();
    });
  });

  describe('Function: clear', () => {
    it('should set selected', () => {
      comp.placeholder = 'bar';
      comp.selected = {
        label: 'foo',
        value: 'bar',
        active: true,
      };
      comp.clear();
      expect(comp.selected).toEqual({
        label: 'bar',
        value: null,
        active: false,
      });
    });
    it('should set header', () => {
      comp.header = {
        open: true,
        valid: false,
        value: 'foo',
      };
      comp.clear();
      expect(comp.header).toEqual({
        open: false,
        valid: true,
        value: '',
      });
    });
    it('should set selectedIndex', () => {
      comp.selectedIndex = 0;
      comp.clear();
      expect(comp.selectedIndex).toEqual(-1);
    });
    it('should set empty', () => {
      comp.empty = false;
      comp.clear();
      expect(comp.empty).toEqual(true);
    });
  });

  describe('Function: onKeyDown(event)', () => {
    xit('should not scroll', () => {});
    it('should close panel', () => {
      spyOn(comp.overlay, 'closePanel');
      const mockEvent: any = { keyCode: KeyCodes.ESC };
      comp.header.open = true;
      comp.onKeyDown(mockEvent);
      mockEvent.keyCode = KeyCodes.TAB;
      comp.onKeyDown(mockEvent);
      expect(comp.overlay.closePanel).toHaveBeenCalledTimes(2);
    });
    it('should save header', () => {
      const mockEvent: any = { keyCode: KeyCodes.ENTER };
      comp.header = {
        open: true,
        value: 'foo',
        valid: true,
      };
      comp.headerConfig = { onSave: jasmine.createSpy('onSave') };
      comp.onKeyDown(mockEvent);
      expect(comp.headerConfig.onSave).toHaveBeenCalled();
    });
    it('should move selection up', () => {
      const mockEvent: any = {
        keyCode: KeyCodes.UP,
        preventDefault: jasmine.createSpy('preventDefault'),
      };
      comp.selectedIndex = 1;
      comp.header = { open: true };
      comp.filteredOptions = [{ value: 'foo', label: 'foo' }, { value: 'bar', label: 'bar' }, { value: 'baz', label: 'baz' }];
      comp.overlay = {
        overlayRef: {
          overlayElement: {
            querySelector: jasmine.createSpy('querySelector').and.returnValue({
              querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([{ value: 'foo' }]),
            }),
          },
        },
        panelOpen: true,
      };
      comp.overlay.panelOpen = true;
      comp.onKeyDown(mockEvent);
      expect(comp.selectedIndex).toEqual(0);
    });
    it('should move selection down', () => {
      const mockEvent: any = {
        keyCode: KeyCodes.DOWN,
        preventDefault: jasmine.createSpy('preventDefault'),
      };
      comp.selectedIndex = 1;
      comp.header = { open: true };
      comp.filteredOptions = [{ value: 'foo', label: 'foo' }, { value: 'bar', label: 'bar' }, { value: 'baz', label: 'baz' }];
      comp.overlay = {
        overlayRef: {
          overlayElement: {
            querySelector: jasmine.createSpy('querySelector').and.returnValue({
              querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([{ value: 'foo' }]),
            }),
          },
        },
        panelOpen: true,
      };
      comp.onKeyDown(mockEvent);
      expect(comp.selectedIndex).toEqual(2);
    });
    xit('should toggle header open', () => {});
    xit('should toggle header closed', () => {});
    xit('should enter filter term', () => {});
    xit('should remove part of the filter term', () => {});
  });

  xdescribe('Function: scrollToSelected', () => {});

  xdescribe('Function: scrollToIndex(index)', () => {});

  xdescribe('Function: toggleHeader(event, forceValue)', () => {});

  xdescribe('Function: highlight(match, query)', () => {});

  xdescribe('Function: escapeRegexp(queryToEscape)', () => {});

  xdescribe('Function: saveHeader', () => {});

  xdescribe('Function: writeValue(model)', () => {});

  xdescribe('Function: registerOnChange(fn)', () => {});

  xdescribe('Function: registerOnTouched(fn)', () => {});
});
