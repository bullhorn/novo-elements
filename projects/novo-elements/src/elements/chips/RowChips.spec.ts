// NG2
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import { NovoChipsModule } from './Chips.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoRowChipElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRowChipElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: onSelect(event)', () => {
    it('should not emit select event', () => {
      spyOn(component.select, 'emit');
      component.onSelect();
      expect(component.select.emit).not.toHaveBeenCalled();
    });
  });
});

describe('Elements: NovoRowChipsElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [{ provide: ComponentUtils, useClass: ComponentUtils }, { provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRowChipsElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: onKeyDown(event)', () => {
    it('should not call select or remove.', () => {
      spyOn(component, 'select');
      spyOn(component, 'remove');
      component.onKeyDown();
      expect(component.select).not.toHaveBeenCalled();
      expect(component.remove).not.toHaveBeenCalled();
    });
  });
});
