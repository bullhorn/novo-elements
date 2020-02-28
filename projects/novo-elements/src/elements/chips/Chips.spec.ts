// NG2
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoChipElement, NovoChipsElement } from './Chips';
import { NovoChipsModule } from './Chips.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoChipElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoChipElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.select).toBeDefined();
      expect(component.remove).toBeDefined();
      expect(component.entity).toBeUndefined();
    });
  });

  describe('Method: onRemove(event)', () => {
    it('should emit remove event', () => {
      jest.spyOn(component.remove, 'emit').mockImplementation(() => {});
      component.onRemove();
      expect(component.remove.emit).toHaveBeenCalled();
    });
  });

  describe('Method: onSelect(event)', () => {
    it('should emit select event', () => {
      jest.spyOn(component.select, 'emit').mockImplementation(() => {});
      component.onSelect();
      expect(component.select.emit).toHaveBeenCalled();
    });
  });
});

describe('Elements: NovoChipsElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [{ provide: ComponentUtils, useClass: ComponentUtils }, { provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoChipsElement);
    component = fixture.debugElement.componentInstance;
  }));

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

  xdescribe('Method: onFocus(event)', () => {
    it('should remove selection', () => {
      jest.spyOn(component.focus, 'emit').mockImplementation(() => {});
      component.onFocus();
      expect(component.focus.emit).toHaveBeenCalled();
    });
  });

  describe('Method: add(event)', () => {
    it('should add an item', () => {
      component.add({ value: 'test' });
      expect(component.items[0].value).toBe('test');
    });
    it('should set value wih valueFomatterFunc if provided', () => {
      component.source = { valueFormatter: (values) => `${values[0].label} (${values[0].value})` };
      component.add({ label: 'Test', value: 'test' });
      expect(component.value).toBe('Test (test)');
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
      component.source = { valueFormatter: (values) => `${values[0].label} (${values[0].value})` };
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
    it('should retrieve items with labels', (done) => {
      component.setItems();
      setTimeout(() => {
        component._items.subscribe((result) => {
          expect(result[0].label).toEqual('one');
          done();
        });
      }, 1);
    });
    it('should handle category labels', (done) => {
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
              items: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }, { label: 'Three', value: 'three' }],
            },
          ],
        ]),
      };
      component.setItems();
      setTimeout(() => {
        component._items.subscribe((result) => {
          expect(result).toEqual(component.model);
          done();
        });
      }, 1);
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeDefined();
    });
  });
});
