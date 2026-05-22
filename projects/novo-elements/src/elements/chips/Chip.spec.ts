import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { NovoChipElement } from './Chip';
import { NovoChipsModule } from './Chips.module';

describe('Elements: NovoChipElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoChipElement);
    component = fixture.debugElement.componentInstance;
  });

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.select).toBeDefined();
      expect(component.remove).toBeDefined();
      expect(component.entity).toBeUndefined();
    });
  });

  describe('Method: remove()', () => {
    it('should emit remove event if removable', () => {
      vi.spyOn(component.removed, 'emit').mockImplementation(() => {});
      component.removable = true;
      component.remove();
      expect(component.removed.emit).toHaveBeenCalled();
    });
    it('should not emit remove event if not removable', () => {
      vi.spyOn(component.removed, 'emit').mockImplementation(() => {});
      component.removable = false;
      component.remove();
      expect(component.removed.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: dynamicClasses', () => {
    it('should return empty string if no source', () => {
      component.source = null;
      expect(component.dynamicClasses).toBe('');
    });

    it('should return empty string if source has no classFunction', () => {
      component.source = { options: [] };
      expect(component.dynamicClasses).toBe('');
    });

    it('should apply single class returned by classFunction', () => {
      component.value = { status: 'active' };
      component.source = {
        classFunction: (value) => (value.status === 'active' ? 'status-active' : 'status-inactive'),
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('status-active');
    });

    it('should apply multiple classes as array', () => {
      component.value = { priority: 'high', type: 'warning' };
      component.source = {
        classFunction: (value) => [`priority-${value.priority}`, `type-${value.type}`],
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('priority-high type-warning');
    });

    it('should handle null return from classFunction', () => {
      component.value = { status: 'unknown' };
      component.source = {
        classFunction: () => null,
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('');
    });

    it('should handle undefined return from classFunction', () => {
      component.value = { status: 'unknown' };
      component.source = {
        classFunction: () => undefined,
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('');
    });

    it('should pass value and label to classFunction', () => {
      const classFunc = vi.fn((value, label) => 'test-class');
      component.value = { id: 1 };
      component.label = 'Test Label';
      component.source = { classFunction: classFunc };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('test-class');
      expect(classFunc).toHaveBeenCalledWith({ id: 1 }, 'Test Label');
    });

    it('should react to value changes', () => {
      component.source = {
        classFunction: (value) => (value?.priority === 'high' ? 'priority-high' : 'priority-low'),
      };
      component.value = { priority: 'low' };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('priority-low');

      component.value = { priority: 'high' };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('priority-high');
    });

    it('should react to source changes', () => {
      component.value = { status: 'active' };
      component.source = {
        classFunction: (value) => 'class-v1',
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('class-v1');

      component.source = {
        classFunction: (value) => 'class-v2',
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('class-v2');
    });

    it('should handle empty string return from classFunction', () => {
      component.source = {
        classFunction: () => '',
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('');
    });

    it('should handle empty array return from classFunction', () => {
      component.source = {
        classFunction: () => [],
      };
      fixture.detectChanges();
      expect(component.dynamicClasses).toBe('');
    });
  });
});
