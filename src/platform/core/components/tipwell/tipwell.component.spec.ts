// NG2
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// App
import { NovoTipwellComponent } from './tipwell.component';
import { NovoTipwellModule } from './tipwell.module';
import { NovoLabelService } from '../../services';

describe('Elements: NovoTipwellComponent', () => {
    let fixture: ComponentFixture<NovoTipwellComponent>;
    let component: NovoTipwellComponent;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
            NovoTipwellModule,
        ],
        providers: [
            { provide: NovoLabelService, useClass: NovoLabelService },
          ],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoTipwellComponent);
      component = fixture.debugElement.componentInstance;
    }));

    it('should initialize with defaults', () => {
        expect(component).toBeDefined();
        expect(component.isActive).toBeTruthy();
        expect(component.isLocalStorageEnabled).toBeTruthy();
    });

    describe('Method: hideTip()', () => {
        it('should hide the tip and add a value to localStorage', () => {
            expect(component.hideTip).toBeDefined();
            expect(localStorage.getItem(component.localStorageKey)).toBe(null); // tslint:disable-line
            component.hideTip();
            expect(JSON.parse(localStorage.getItem(component.localStorageKey))).toBeFalsy();
        });
        it('should not attempt to set localstorage if not enabled', () => {
            component.isLocalStorageEnabled = false;
            spyOn(localStorage, 'setItem');
            component.hideTip();
            expect(localStorage.setItem).not.toHaveBeenCalled();
        });
    });

    describe('Method: ngOnInit()', () => {
        it('should initialize tipwell variables to defaults', () => {
            component.ngOnInit();
            expect(component.tip).toEqual('');
            expect(component.isLocalStorageEnabled).toBeTruthy();
            expect(component.buttonText).toEqual('Ok, Got it');
            expect(component.button).toBeTruthy();
            expect(component.icon).toBeUndefined();
        });
    });
});
