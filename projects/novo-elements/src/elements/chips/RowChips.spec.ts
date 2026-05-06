import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { vi } from 'vitest';
import { NovoChipsModule } from './Chips.module';
import { NovoRowChipsElement } from './RowChips';

describe('Elements: NovoRowChipsElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRowChipsElement);
    component = fixture.debugElement.componentInstance;
  });

  describe('Method: onKeyDown(event)', () => {
    it('should not call select or remove.', () => {
      vi.spyOn(component, 'select');
      vi.spyOn(component, 'remove');
      component.onKeyDown();
      expect(component.select).not.toHaveBeenCalled();
      expect(component.remove).not.toHaveBeenCalled();
    });
  });
});
