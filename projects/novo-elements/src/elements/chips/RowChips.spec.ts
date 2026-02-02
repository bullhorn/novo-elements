// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { NovoChipsModule } from './Chips.module';
// App
import { NovoRowChipsElement } from './RowChips';

describe('Elements: NovoRowChipsElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule],
      providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRowChipsElement);
    component = fixture.debugElement.componentInstance;
    component.source = { hiddenChipsLimit: 1 };
    fixture.detectChanges();
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
