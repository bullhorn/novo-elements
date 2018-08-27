// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTipWellElement } from './TipWell';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoTipWellElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTipWellElement],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTipWellElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
    expect(component.isActive).toBeTruthy();
    expect(component.isLocalStorageEnabled).toBeTruthy();
  });

  xdescribe('Method: hideTip()', () => {
    it('should hide the tip and add a value to localStorage', () => {
      expect(component.hideTip).toBeDefined();
      expect(localStorage.getItem(component.localStorageKey)).toBe(null);
      component.hideTip();
      expect(JSON.parse(localStorage.getItem(component.localStorageKey))).toBeFalsy();
    });
  });

  describe('Method: ngOnInit()', () => {
    it('should initialize tipwell variables to defaults', () => {
      component.ngOnInit();
      expect(component.tip).toEqual('');
      expect(component.buttonText).toEqual('Ok, Got it');
      expect(component.button).toBeTruthy();
      expect(component.icon).toBeNull();
    });
  });
});
