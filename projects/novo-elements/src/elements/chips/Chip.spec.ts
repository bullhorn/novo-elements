import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NovoChipElement } from './Chip';
import { NovoChipsModule } from './Chips.module';

fdescribe('Elements: NovoChipElement', () => {
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

  describe('Method: remove()', () => {
    it('should emit remove event if removable', () => {
      jest.spyOn(component.removed, 'emit').mockImplementation(() => { });
      component.removable = true;
      component.remove();
      expect(component.removed.emit).toHaveBeenCalled();
    });
    it('should not emit remove event if not removable', () => {
      jest.spyOn(component.removed, 'emit').mockImplementation(() => { });
      component.removable = false;
      component.remove();
      expect(component.removed.emit).not.toHaveBeenCalled();
    });
  });
});
