// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoCategoryDropdownElement } from './CategoryDropdown';
import { NovoNavElement, NovoTabElement, NovoNavContentElement, NovoNavOutletElement } from '../tabs/Tabs';
import { NovoListElement, NovoListItemElement, NovoItemEndElement, NovoItemContentElement } from '../list/List';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoCategoryDropdownElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NovoCategoryDropdownElement,
        NovoTabElement,
        NovoNavElement,
        NovoListElement,
        NovoListItemElement,
        NovoItemEndElement,
        NovoItemContentElement,
        NovoNavContentElement,
        NovoNavOutletElement,
      ],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoCategoryDropdownElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.ngOnInit).toBeDefined();
    });
  });

  describe('Method: ngOnDestroy()', () => {
    it('should be defined.', () => {
      expect(component.ngOnDestroy).toBeDefined();
    });
  });

  describe('Method: onKeyDown()', () => {
    it('should be defined.', () => {
      expect(component.onKeyDown).toBeDefined();
    });
  });

  describe('Method: clearSelection()', () => {
    it('should be defined.', () => {
      expect(component.clearSelection).toBeDefined();
    });
  });

  describe('Method: select()', () => {
    it('should be defined.', () => {
      expect(component.select).toBeDefined();
    });
  });

  describe('Method: clearQuery()', () => {
    it('should be defined.', () => {
      expect(component.clearQuery).toBeDefined();
    });
  });

  describe('Method: queryCategories()', () => {
    it('should be defined.', () => {
      expect(component.queryCategories).toBeDefined();
    });
  });

  describe('Method: executeClickCallback()', () => {
    it('should be defined.', () => {
      expect(component.executeClickCallback).toBeDefined();
    });
  });

  describe('Method: onCategorySelected()', () => {
    it('should be defined.', () => {
      expect(component.onCategorySelected).toBeDefined();
    });
  });
});
