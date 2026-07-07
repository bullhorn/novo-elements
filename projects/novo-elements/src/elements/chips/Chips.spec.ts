import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { tick } from 'novo-testing';
import { vi } from 'vitest';
import { NovoChipsElement } from './Chips';
import { NovoChipsModule } from './Chips.module';

describe('Elements: NovoChipsElement', () => {
  let fixture: ComponentFixture<NovoChipsElement>;
  let component: NovoChipsElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoChipsElement);
    component = fixture.debugElement.componentInstance;
    component.source = { hiddenChipsLimit: 4 };
    fixture.detectChanges();
  });

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.ngOnInit).toBeDefined();
      expect(component.changed).toBeDefined();
      expect(component.focus).toBeDefined();
      expect(component.blur).toBeDefined();
      expect(component.items.length).toBe(0);
    });
  });

  describe('Method: deselectAll()', () => {
    it('should remove selection', () => {
      component.selected = 'test';
      component.deselectAll();
      expect(component.selected).toBeFalsy();
    });
  });

  describe('Method: select(event, item)', () => {
    it('should select item', () => {
      component.source = {
        previewTemplate: '',
      };
      component.selected = 'before';
      component.select(null, 'after');
      expect(component.selected).toBe('after');
    });
  });

  describe('Method: onFocus(event)', () => {
    it('should remove selection', () => {
      vi.spyOn(component, 'deselectAll');
      vi.spyOn(component.focus, 'emit').mockImplementation(() => {});
      component.onFocus();
      expect(component.focus.emit).toHaveBeenCalled();
      expect(component.deselectAll).toHaveBeenCalled();
    });
  });

  describe('Method: add(event)', () => {
    it('should add an item', () => {
      component.add({ value: 'test' });
      expect(component.items[0].value).toBe('test');
    });
    it('should set value wih valueFomatterFunc if provided', async () => {
      component.source = {
        hiddenChipsLimit: 4,
        valueFormatter: (values) => `${values[0].label} (${values[0].value})`,
      };
      component.picker = {
        container: { overlayRef: { updatePosition: () => {} } },
        popup: { instance: { selected: [] } },
        selected: [],
      } as any;
      component.add({ label: 'Test', value: 'test' });
      expect(component.value).toBe('Test (test)');
      await tick(10);
    });
  });

  describe('Method: updateHiddenChips()', () => {
    beforeEach(() => {
      component.picker = {
        container: { overlayRef: { updatePosition: () => {} } },
        popup: { instance: { selected: [] } },
        selected: [],
      } as any;
    });

    it('should update hiddenChipsCount based on the items length and the hiddenChipsLimit property', () => {
      component.items = ['A', 'B', 'C', 'D', 'E', 'F'];
      component.hiddenChipsLimit = 4;
      component._hiddenChipsLimit = component.hiddenChipsLimit;
      component.updateHiddenChips();
      expect(component.hiddenChipsCount).toBe(2);
      component.items.pop();
      component.updateHiddenChips();
      expect(component.hiddenChipsCount).toBe(1);
    });

    it('should reset the hiddenChipsLimit to the original limit if: currently showing all chips BUT there are no longer any extra chips to hide', () => {
      component.items = ['A', 'B', 'C', 'D'];
      component._hiddenChipsLimit = 3;
      component.hiddenChipsLimit = component.CHIPS_SHOWN_MAX; // currently showing all chips
      component.items.pop(); // ['A', 'B', 'C']
      component.updateHiddenChips();
      expect(component.hiddenChipsLimit).toBe(component._hiddenChipsLimit);
    });
  });

  describe('Method: toggleHiddenChips()', () => {
    it('should flip the hiddenChipsLimit count between the original set at init and the CHIPS_SHOWN_MAX const', () => {
      component.hiddenChipsLimit = 3;
      component._hiddenChipsLimit = component.hiddenChipsLimit;
      expect(component.hiddenChipsLimit).toBe(3);
      component.toggleHiddenChips();
      expect(component.hiddenChipsLimit).toBe(999);
    });
  });

  describe('Method: remove(event, item)', () => {
    it('should remove an item', () => {
      const item = { value: 'test' };
      component.items = [item];
      component.remove(null, item);
      expect(component.items.length).toBe(0);
    });
    it('should remove an item wih valueFomatterFunc if provided', () => {
      const itemFoo = { label: 'Foo', value: 'foo' };
      const itemBar = { label: 'Bar', value: 'bar' };
      component.source = {
        hiddenChipsLimit: 4,
        valueFormatter: (values) => `${values[0].label} (${values[0].value})`,
      };
      component.items = [itemFoo, itemBar];
      component.remove(null, itemFoo);
      expect(component.value).toBe('Bar (bar)');
      expect(component.items.length).toEqual(1);
    });
  });

  describe('Method: writeValue()', () => {
    it('should be defined.', () => {
      expect(component.writeValue).toBeDefined();
    });

    it('should change the value', () => {
      component.writeValue(10);
      expect(component.model).toBe(10);
    });
  });

  describe('Method: registerOnChange()', () => {
    it('should be defined.', () => {
      expect(component.registerOnChange).toBeDefined();
    });
  });

  describe('Method: setItems()', () => {
    beforeEach(() => {
      component.model = [
        {
          value: 1,
        },
        {
          value: 2,
          label: 'two',
        },
      ];
      component.source = {
        format: '$name',
        getLabels: (values) => {
          return new Promise((resolve) => {
            values.map((item) => {
              item.label = 'one';
              return item;
            });
            resolve(values);
          });
        },
      };
    });
    it('should be defined.', () => {
      expect(component.setItems).toBeDefined();
    });
    it('should retrieve items with labels', async () => {
      component.setItems();
      await tick(1);
      const result = await new Promise((resolve) => {
        component._items.subscribe((val) => resolve(val));
      });
      expect((result as any[])[0].label).toEqual('one');
    });
    it('should handle category labels', async () => {
      component.model = [
        {
          category: {
            label: 'One',
            value: 'one',
          },
          item: {
            label: 'Two',
            value: 'two',
          },
        },
      ];
      component.source = {
        categoryMap: new Map([
          [
            'numbers',
            {
              value: 'numbers',
              label: 'Numbers',
              items: [
                { label: 'One', value: 'one' },
                { label: 'Two', value: 'two' },
                { label: 'Three', value: 'three' },
              ],
            },
          ],
        ]),
      };
      component.setItems();
      await tick(1);
      const result = await new Promise((resolve) => {
        component._items.subscribe((val) => resolve(val));
      });
      expect(result).toEqual(component.model);
    });
  });

  describe('Method: getLabelFromOptions', () => {
    it('should return a proper response if passed an object as value', () => {
      component.source = {
        options: [
          {
            value: 1,
            label: 'option 1',
          },
          {
            value: 2,
            label: 'option 2',
          },
          {
            value: 3,
            label: 'option 3',
          },
        ],
      };
      const result = component.getLabelFromOptions({ id: 2 });
      expect(result).toEqual({ value: 2, label: 'option 2' });
    });
    it('should return a proper response if passed an number as value', () => {
      component.source = {
        options: [
          {
            value: 1,
            label: 'option 1',
          },
          {
            value: 2,
            label: 'option 2',
          },
          {
            value: 3,
            label: 'option 3',
          },
        ],
      };
      const result = component.getLabelFromOptions(2);
      expect(result).toEqual({ value: 2, label: 'option 2' });
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeDefined();
    });
  });

  describe('Method: getDynamicClasses(item)', () => {
    it('should return null when source has no classFunction', () => {
      component.source = { hiddenChipsLimit: 4 };
      expect(component.getDynamicClasses({ value: { id: 1 } })).toBeNull();
    });

    it('should return null when classFunction returns null', () => {
      component.source = { classFunction: () => null };
      expect(component.getDynamicClasses({ value: { id: 1 } })).toBeNull();
    });

    it('should return null when classFunction returns undefined', () => {
      component.source = { classFunction: () => undefined };
      expect(component.getDynamicClasses({ value: { id: 1 } })).toBeNull();
    });

    it('should pass the unwrapped value to classFunction', () => {
      const classFunc = vi.fn((value) => 'called');
      component.source = { classFunction: classFunc };
      component.getDynamicClasses({ value: { id: 1, status: 'active' } });
      expect(classFunc).toHaveBeenCalledWith({ id: 1, status: 'active' });
    });

    it('should fall back to the whole item when item.value is missing', () => {
      const classFunc = vi.fn((value) => 'called');
      component.source = { classFunction: classFunc };
      const item = { id: 42, label: 'no value field' };
      component.getDynamicClasses(item);
      expect(classFunc).toHaveBeenCalledWith(item);
    });

    it('should pass classFunction string returns through unchanged', () => {
      component.source = { classFunction: () => 'status-active' };
      expect(component.getDynamicClasses({ value: { id: 1 } })).toBe('status-active');
    });

    it('should pass classFunction array returns through unchanged', () => {
      component.source = { classFunction: () => ['a', 'b'] };
      expect(component.getDynamicClasses({ value: { id: 1 } })).toEqual(['a', 'b']);
    });

    it('should pass classFunction object returns through unchanged', () => {
      component.source = { classFunction: () => ({ archived: true, recent: false }) };
      expect(component.getDynamicClasses({ value: { id: 1 } }))
        .toEqual({ archived: true, recent: false });
    });
  });

  describe('Integration: classFunction renders classes on the chip host', () => {
    it('should apply the string return to the rendered chip', async () => {
      component.source = {
        hiddenChipsLimit: 4,
        classFunction: (value) => (value.priority === 'high' ? 'priority-high' : 'priority-low'),
      };
      component.model = [{ value: 1, priority: 'high', label: 'Item 1' }];
      component.setItems();
      fixture.detectChanges();
      await tick(10);

      const chip = fixture.nativeElement.querySelector('novo-chip');
      expect(chip).toBeTruthy();
      expect(chip.classList).toContain('priority-high');
    });

    it('should apply each class from an array return to the rendered chip', async () => {
      component.source = {
        hiddenChipsLimit: 4,
        classFunction: (value) => [`priority-${value.priority}`, `type-${value.type}`],
      };
      component.model = [{ value: 1, priority: 'high', type: 'warning', label: 'Item 1' }];
      component.setItems();
      fixture.detectChanges();
      await tick(10);

      const chip = fixture.nativeElement.querySelector('novo-chip');
      expect(chip).toBeTruthy();
      expect(chip.classList).toContain('priority-high');
      expect(chip.classList).toContain('type-warning');
    });

    it('should apply only truthy keys from an object return to the rendered chip', async () => {
      component.source = {
        hiddenChipsLimit: 4,
        classFunction: (value) => ({
          archived: value.status === 'archived',
          featured: value.featured,
          recent: false,
        }),
      };
      component.model = [{ value: 1, status: 'archived', featured: true, label: 'Item 1' }];
      component.setItems();
      fixture.detectChanges();
      await tick(10);

      const chip = fixture.nativeElement.querySelector('novo-chip');
      expect(chip).toBeTruthy();
      expect(chip.classList).toContain('archived');
      expect(chip.classList).toContain('featured');
      expect(chip.classList).not.toContain('recent');
    });
  });
});
