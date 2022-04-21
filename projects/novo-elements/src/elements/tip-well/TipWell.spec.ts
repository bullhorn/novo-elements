// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../services/novo-label-service';
// App
import { NovoTipWellElement } from './TipWell';

describe('Elements: NovoTipWellElement', () => {
  let fixture;
  let component: NovoTipWellElement | any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTipWellElement],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTipWellElement);
    component = fixture.debugElement.componentInstance;
    jest.spyOn(component.sanitizer, 'bypassSecurityTrustHtml').mockReturnValue('TRUSTED_HTML');
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
    expect(component.isActive).toBeTruthy();
    expect(component.isLocalStorageEnabled).toBeTruthy();
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

  describe('Method: tipWithStyles()', () => {
    it('should return sanitized tip', () => {
      component.tip = `<div style="color: red">This text is RED</div>`;
      const actual = component.tipWithStyles;
      expect(actual).toEqual('TRUSTED_HTML');
      expect(component.sanitizer.bypassSecurityTrustHtml).toBeCalledTimes(1);
    });
    it('should cache previous sanitized tip when re-requested', () => {
      component.tip = `<div style="color: red">This text is RED</div>`;
      component.tipWithStyles;
      component.tipWithStyles;
      component.tipWithStyles;
      const actual = component.tipWithStyles;
      expect(actual).toEqual('TRUSTED_HTML');
      expect(component.sanitizer.bypassSecurityTrustHtml).toBeCalledTimes(1);
    });
    it('should bust the cache when the tip is modified', () => {
      component.tip = `<div style="color: red">This text is RED</div>`;
      component.tipWithStyles;
      component.tipWithStyles;
      component.tip = `<div style="color: blue">This text is BLUE</div>`;
      component.tipWithStyles;
      const actual = component.tipWithStyles;
      expect(actual).toEqual('TRUSTED_HTML');
      expect(component.sanitizer.bypassSecurityTrustHtml).toBeCalledTimes(2);
    });
  });

  describe('Method: hideTip()', () => {
    it('should hide the tip', () => {
      component.isLocalStorageEnabled = false;
      expect(component.isActive).toBe(true);
      component.hideTip();
      expect(component.isActive).toBe(false);
    });
  });
});
