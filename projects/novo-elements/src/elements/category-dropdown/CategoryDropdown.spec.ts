// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoItemContentElement, NovoItemEndElement, NovoListElement, NovoListItemElement } from '../list/List';
import { NovoNavContentElement, NovoNavElement, NovoNavOutletElement, NovoTabElement } from '../tabs/Tabs';
// App
import { NovoCategoryDropdownElement } from './CategoryDropdown';

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
