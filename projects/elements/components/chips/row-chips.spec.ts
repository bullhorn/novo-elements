// NG2
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NovoRowChipsElement } from './row-chips';
import { NovoChipsModule } from './chips.module';
import { NovoLabelService, ComponentUtils } from 'novo-elements/services';

// describe('Elements: NovoRowChipElement', () => {
//   let fixture;
//   let component;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, NovoChipsModule],
//     }).compileComponents();
//     fixture = TestBed.createComponent(NovoRowChipElement);
//     component = fixture.debugElement.componentInstance;
//   }));
// });

describe('Elements: NovoRowChipsElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRowChipsElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: onKeyDown(event)', () => {
    it('should not call select or remove.', () => {
      jest.spyOn(component, 'select');
      jest.spyOn(component, 'remove');
      component.onKeyDown();
      expect(component.select).not.toHaveBeenCalled();
      expect(component.remove).not.toHaveBeenCalled();
    });
  });
});
