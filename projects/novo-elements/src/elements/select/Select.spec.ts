// NG
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// App
import { NovoLabelService } from 'novo-elements/services';
import { NovoOption, HasOverlay, NovoOverlayModule, NovoOptionModule } from 'novo-elements/elements/common';
import { Key } from 'novo-elements/utils';
import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';
import { SelectionModel } from '@angular/cdk/collections';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { TAB } from '@angular/cdk/keycodes';
import { Component, Input, viewChild } from '@angular/core';

@Component({
  selector: 'test-select-component',
  template: `
  <novo-select [value]="value">
    <novo-option *ngFor="let option of options" [value]="option.value">
      {{ option.label }}
    </novo-option>
  </novo-select>`,
  standalone: false,
})
class TestSelectComponent {
  select = viewChild(NovoSelectElement);
  @Input() value: any;
  options = [{
    label: 'Option 1',
    value: '111',
  }, {
    label: 'Option 2',
    value: '222',
  }, {
    label: 'Option 3',
    value: '333',
  }];
}

describe('Elements: NovoSelectElement', () => {
  let fixture: ComponentFixture<NovoSelectElement>;
  let comp: NovoSelectElement;
  let selectionModel: SelectionModel<NovoOption>;
  let keyManager: ActiveDescendantKeyManager<NovoOption>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NovoSelectModule, NovoOptionModule, NovoOverlayModule],
      declarations: [TestSelectComponent],
      providers: [
        {
          provide: NovoLabelService,
          useClass: NovoLabelService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSelectElement);
    comp = fixture.debugElement.componentInstance;
    selectionModel = comp._selectionModel;
  }));

  beforeEach(() => {
    fixture.detectChanges();
    keyManager = comp._keyManager;
  });

  describe('Function: ngOnInit', () => {
    it('should invoke ngOnChanges', () => {
      fixture.componentRef.setInput('options', ['1', '2', '3']);
      fixture.detectChanges();
      comp.ngOnInit();
      expect(comp.filteredOptions).toBeDefined();
      expect(comp.filteredOptions[0].value).toEqual('1');
      expect(comp.filteredOptions[0].label).toEqual('1');
    });
  });

  describe('Function: ngOnChanges', () => {
    xit('should convert readOnly from a non-boolean to a boolean', () => {
      // Note: readonly input is not currently coerced to boolean by the component
      fixture.componentRef.setInput('readonly', 'true');
      fixture.detectChanges();
      expect(comp.readonly).toEqual(true);
    });
    it('should set filteredOptions to an array of objects from an array of strings', () => {
      fixture.componentRef.setInput('options', ['foo', 'bar', 'baz']);
      fixture.detectChanges();
      expect(comp.filteredOptions).toEqual([
        { value: 'foo', label: 'foo' },
        { value: 'bar', label: 'bar' },
        { value: 'baz', label: 'baz' },
      ]);
    });
    it('should set filteredOptions to an array of objects', () => {
      fixture.componentRef.setInput('options', [{ readOnly: false }, { readOnly: true }, {}]);
      fixture.detectChanges();
      expect(comp.filteredOptions).toEqual([
        { readOnly: false, disabled: false, active: false },
        { active: false, disabled: true, readOnly: true },
        { active: false, disabled: false },
      ]);
    });
    it('should clone each option in filteredOptions so its object reference changes', () => {
      const option = { value: 'clone', label: 'text1' };
      fixture.componentRef.setInput('options', [option]);
      fixture.detectChanges();
      option.label = 'text2';
      fixture.componentRef.setInput('options', [option]);
      fixture.detectChanges();
      expect(comp.filteredOptions[0]).not.toBe(option);
      expect(comp.filteredOptions[0]).toEqual(jasmine.objectContaining({ value: 'clone', label: 'text2', active: false }));
    });
    it('should invoke clear', () => {
      spyOn(selectionModel, 'clear');
      const mockPlaceholder = 'Test placeholder';
      fixture.componentRef.setInput('options', ['foo', 'bar', 'baz']);
      fixture.componentRef.setInput('value', 'baz');
      fixture.componentRef.setInput('placeholder', mockPlaceholder);
      fixture.detectChanges();
      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();
      const placeholderText = fixture.debugElement.query(By.css('.novo-select-placeholder'));
      expect(placeholderText).not.toBeNull();
      expect(placeholderText.nativeElement.textContent).toBe(mockPlaceholder);
      expect(comp.empty).toEqual(true);
      expect(selectionModel.clear).toHaveBeenCalled();
    });
    it('should invoke select', () => {
      const selectAction = jest.spyOn(selectionModel, 'select');
      comp.createdItem = 'baz';
      const options = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
        { label: 'baz', value: 'baz' },
      ];
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      comp.writeValue('baz');
      fixture.detectChanges();

      expect(selectAction.mock.calls[0][0]).toBeInstanceOf(NovoOption);
      expect(selectAction.mock.calls[0][0].value).toEqual('baz');
      // onSelect should not fire because this selection is incoming from parent
      expect(comp.empty).toEqual(false);
    });
    it('should invoke openPanel', () => {
      const options = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
        { label: 'baz', value: 'baz' },
      ];
      comp.writeValue('baz');
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      jest.spyOn(comp.overlay, 'openPanel');
      jest.spyOn(keyManager, 'setActiveItem');
      comp.openPanel();
      expect(comp.overlay.openPanel).toHaveBeenCalled();
      expect(keyManager.setActiveItem).toHaveBeenCalledWith(2);
    });
  });

  it('should propagate changes from NovoOption elements', fakeAsync(() => {
    let selected;
    comp.onSelect.subscribe(val => selected = val);
    jest.spyOn(comp, 'closePanel');
    jest.spyOn(comp, 'focus');
    const options = [
      { label: 'foo', value: 'foo' },
      { label: 'bar', value: 'bar' },
      { label: 'baz', value: 'baz' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
    comp.writeValue('baz');
    fixture.detectChanges();
    expect(comp.viewOptions.length).toBe(3);
    comp.openPanel();
    const newNovoOption = comp.viewOptions.find(option => option.value === 'foo');
    newNovoOption._selectViaInteraction();
    tick();
    expect(selected).toEqual({ selected: 'foo' });
    expect((comp as HasOverlay).closePanel).toHaveBeenCalled();
    expect(comp.focus).toHaveBeenCalled();
  }));

  describe('Function: _handleKeydown(event)', () => {
    it('should close panel', () => {
      jest.spyOn(comp.overlay, 'closePanel');
      const mockEvent: any = { key: Key.Escape };
      comp.openPanel();
      comp._handleKeydown(mockEvent);
      mockEvent.key = Key.Tab;
      mockEvent.keyCode = TAB;
      comp.openPanel();
      comp._handleKeydown(mockEvent);
      expect(comp.overlay.closePanel).toHaveBeenCalledTimes(2);
    });
    xit('should save header', () => {
      // Note: Header saving on Enter key is not currently implemented
      const mockEvent: any = {
        key: Key.Enter,
        preventDefault: jest.fn(),
      };
      comp.header = {
        open: true,
        value: 'foo',
        valid: true,
      };
      const headerConfig = { onSave: jest.fn() };
      fixture.componentRef.setInput('headerConfig', headerConfig);
      fixture.detectChanges();
      comp._handleKeydown(mockEvent);
      expect(headerConfig.onSave).toHaveBeenCalled();
    });
    it('should open panel when key is sent to open it', () => {
      jest.spyOn(comp, 'openPanel');
      const mockEvent: any = {
        key: Key.Space,
        preventDefault: jest.fn(),
      };
      comp._handleKeydown(mockEvent);
      expect(comp.openPanel).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('should forward up/down events to keyManager', () => {
      const mockEvent: any = {
        key: Key.ArrowUp,
        preventDefault: jest.fn(),
      };
      jest.spyOn(keyManager, 'onKeydown');
      comp.openPanel();
      comp._handleKeydown(mockEvent);
      expect(keyManager.onKeydown).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('Legacy options', () => {
    it('should present a disabled "legacy option" when selecting a value that does not exist in the option list', () => {
      const options = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
        { label: 'baz', value: 'baz' },
      ];
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      comp.writeValue('bif');
      fixture.detectChanges();
      comp.openPanel();
      expect(comp.viewOptions.length).toBe(4);
      const legacyOption: NovoOption = comp.viewOptions.get(3);
      expect(legacyOption.disabled).toBeTruthy();
      expect(legacyOption.viewValue).toBe('bif');
    });

    xit('should present a disabled "legacy option" when updating the list of options (via content children) to remove a previously valid value', fakeAsync(() => {
      // Note: This test is niche and depends on component internals that may not be working as expected
      const fixture2 = TestBed.createComponent(TestSelectComponent);
      fixture2.componentRef.setInput('value', '333');
      fixture2.detectChanges();
      tick();
      const select = fixture2.componentInstance.select() as NovoSelectElement;
      fixture2.detectChanges();
      tick();
      select.openPanel();
      fixture2.detectChanges();
      tick();
      expect(select.contentOptions.length).toBe(3);
      expect(select.contentOptions.get(2).disabled).toBeFalsy();
      fixture2.componentInstance.options.splice(2, 1);
      fixture2.detectChanges();
      tick();
      // After removing the option, contentOptions should still have 3 items (they're querylist items from template)
      expect(select.contentOptions.length).toBe(3);
      expect(select.viewOptions.length).toBe(3);
      const legacyOption: NovoOption = select.viewOptions.get(2);
      expect(legacyOption.disabled).toBeTruthy();
      expect(legacyOption.viewValue).toBe('333');
    }));

    xit('should present a disabled "legacy option" when updating the list of options (via input) to remove a previously valid value', () => {
      // Note: This test is niche and depends on component internals that may not be working as expected
      const options = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
        { label: 'baz', value: 'baz' },
      ];
      const options2 = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
      ];
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      comp.writeValue('baz');
      fixture.detectChanges();
      comp.openPanel();
      expect(comp.viewOptions.length).toBe(3);
      fixture.componentRef.setInput('options', options2);
      fixture.detectChanges();
      comp.openPanel();
      fixture.detectChanges();
      // After updating options, legacy option should be added, so there should be 3 total
      // (2 new options + 1 legacy option for 'baz')
      expect(comp.viewOptions.length).toBe(3);
      const legacyOption: NovoOption = comp.viewOptions.get(2);
      expect(legacyOption.disabled).toBeTruthy();
      expect(legacyOption.viewValue).toBe('baz');
    });

    it('should hide legacy options when input or signal is configured to hide them', fakeAsync(() => {
      const options = [
        { label: 'foo', value: 'foo' },
        { label: 'bar', value: 'bar' },
        { label: 'baz', value: 'baz' },
      ];
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('hideLegacyOptions', true);
      fixture.detectChanges();
      comp.writeValue('bif');
      fixture.detectChanges();
      comp.openPanel();
      fixture.detectChanges();
      tick();
      expect(comp.viewOptions.length).toBe(3);
    }));
  });
  describe('Function: _handleKeydown(event) - typeahead', () => {
    it('should set active item when typing a letter that matches an option', fakeAsync(() => {
      const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
      ];
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      tick();

      comp.openPanel();
      fixture.detectChanges();
      tick();

      const mockEvent: any = {
        key: 'b',
        preventDefault: jest.fn(),
      };

      comp._handleKeydown(mockEvent);
      tick(300); // Wait for typeahead delay + processing
      fixture.detectChanges();

      expect(keyManager.activeItem).toBeDefined();
      expect(keyManager.activeItem.value).toBe('banana');
    }));

    it('should cycle through options starting with the same letter on repeated key presses', fakeAsync(() => {
      const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cantelope', value: 'cantelope' },
        { label: 'Coconut', value: 'coconut'},
      ];
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      tick();

      comp.openPanel();
      fixture.detectChanges();
      tick();
      comp.writeValue(null);
      fixture.detectChanges();
      tick();

      const mockEvent: any = {
        key: 'c',
        preventDefault: jest.fn(),
      };

      comp._handleKeydown(mockEvent);
      tick(300);
      fixture.detectChanges();

      expect(keyManager.activeItem.value).toBe('cantelope');

      comp._handleKeydown(mockEvent);
      tick(300);
      fixture.detectChanges();

      expect(keyManager.activeItem.value).toBe('coconut');
    }));
  });
});
