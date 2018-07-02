// NG2
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { Pagination } from './Pagination';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoSelectModule } from '../../../select/Select.module';

describe('Elements: NovoTable', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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
      // component.onPageSizeChanged();
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
