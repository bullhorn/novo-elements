// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoLabelService } from 'novo-elements/services';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { Pagination } from './PaginationOld';

describe('Elements: NovoTable', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Pagination],
      imports: [FormsModule, NovoSelectModule],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(Pagination);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });

  describe('Method: ngOnInit()', () => {
    it('should be defined.', () => {
      expect(component.ngOnInit).toBeDefined();
      component.ngOnInit();
    });
  });

  describe('Method: ngOnChanges()', () => {
    it('should be defined.', () => {
      expect(component.ngOnChanges).toBeDefined();
      component.ngOnChanges();
    });
  });

  describe('Method: getDefaultRowOptions()', () => {
    it('should be defined.', () => {
      expect(component.getDefaultRowOptions).toBeDefined();
      component.getDefaultRowOptions();
    });
  });

  describe('Method: onPageSizeChanged()', () => {
    it('should be defined.', () => {
      expect(component.onPageSizeChanged).toBeDefined();
    });
  });

  describe('Method: selectPage()', () => {
    it('should be defined.', () => {
      expect(component.selectPage).toBeDefined();
      component.selectPage();
    });
  });

  describe('Method: noPrevious()', () => {
    it('should be defined.', () => {
      expect(component.noPrevious).toBeDefined();
      component.noPrevious();
    });
  });

  describe('Method: noNext()', () => {
    it('should be defined.', () => {
      expect(component.noNext).toBeDefined();
      component.noNext();
    });
  });

  describe('Method: makePage()', () => {
    it('should be defined.', () => {
      expect(component.makePage).toBeDefined();
      component.makePage();
    });
  });

  describe('Method: getPages()', () => {
    it('should be defined.', () => {
      expect(component.getPages).toBeDefined();
      component.getPages();
    });
  });

  describe('Method: calculateTotalPages()', () => {
    it('should be defined.', () => {
      expect(component.calculateTotalPages).toBeDefined();
      component.calculateTotalPages();
    });
  });
});
