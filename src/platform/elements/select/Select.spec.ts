// NG
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';

const KeyEvent = (code) => {
    let event: any = document.createEvent('Event');
    event.keyCode = code;
    return event;
};

xdescribe('Elements: NovoSelectElement', () => {
    let fixture, component;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NovoSelectModule],
        providers: [{
          provide: NovoLabelService,
          useClass: NovoLabelService
        }]
      }).compileComponents();
      fixture = TestBed.createComponent(NovoSelectElement);
      component = fixture.debugElement.componentInstance;
    }));

    describe('Function: ngOnInit', () => {
      it('should call ngOnChanges function', () => {
        component.options = ['1', '2', '3'];
        component.ngOnInit();
        expect(component.filteredOptions).toBeDefined();
        expect(component.filteredOptions[0].value).toEqual('1');
        expect(component.filteredOptions[0].label).toEqual('1');
      });
    });

    describe('Function: ngOnChanges', () => {
      it('should convert readOnly from a non-boolean to a boolean', () => {
        component.readOnly = 'true';
        component.ngOnChanges();
        expect(component.readOnly).toEqual(false);
      });
    });

    describe('Function: openPanel', () => {

    });

    describe('Function: closePanel', () => {

    });

    describe('Function: panelOpen', () => {

    });

    describe('Function: setValueAndClose(event)', () => {

    });

    describe('Function: select(option, i, fireEvents)', () => {
      it('should select second option', () => {
        const option = component.options[1];
        component.select(option, 1);
        expect(component.selected).toBe(option.value);
        expect(option.active).toBeTruthy();
      });
    });

    describe('Function: clear', () => {
        it('should clear selected', () => {
          component.selected = {
            label: 'test',
            value: 'test',
            active: true
          };
          component.clear();
          expect(component.selected.active).toBeFalsy();
          expect(component.selectedIndex).toEqual(-1);
          expect(component.empty).toBeTruthy();
        });
    });

    describe('Function: onKeyDown(event)', () => {
      it('should do nothing select is not open', () => {
        component.active = false;
        component.selectedIndex = 1;
        component.onKeyDown(KeyEvent(KeyCodes.UP));
        expect(component.selectedIndex).toEqual(1);
      });
      it('should close select with ESC is pressed', () => {
        component.openPanel();
        spyOn(component, 'closePanel');
        component.onKeyDown(KeyEvent(KeyCodes.ESC));
        expect(component.closePanel).toHaveBeenCalled();
      });
      it('should select a value and close when ENTER is pressed', () => {
        component.openPanel();
        component.selectedIndex = 1;
        spyOn(component, 'closePanel');
        spyOn(component, 'select');
        component.onKeyDown(KeyEvent(KeyCodes.ENTER));
        expect(component.closePanel).toHaveBeenCalled();
        expect(component.select).toHaveBeenCalledWith(
          {
            label: 'two',
            value: '2'
          },
          1
        );
      });
      it('should increment selected index when DOWN is pressed', () => {
        component.openPanel();
        component.selectedIndex = 1;
        spyOn(component, 'select');
        component.onKeyDown(KeyEvent(KeyCodes.DOWN));
        expect(component.selectedIndex).toEqual(2);
      });
      it('should decrement selected index when UP is pressed', () => {
        component.openPanel();
        component.selectedIndex = 2;
        spyOn(component, 'select');
        component.onKeyDown(KeyEvent(KeyCodes.UP));
        expect(component.selectedIndex).toEqual(1);
      });
      it('should select a value when any letter key is pressed', () => {
        component.openPanel();
        component.selectedIndex = 1;
        component.options = [
          { value: 1, label: 'One' },
          { value: 2, label: 'two' }
        ];
        component.filteredOptions = [
          { value: 1, label: 'One' },
          { value: 2, label: 'two' }
        ];
        component.element = {
          nativeElement: { querySelector: () => {} }
        };
        spyOn(component, 'select');
        let params = {
          '.novo-select-list': {
            querySelectorAll: () => [{
              getAttribute: () => [
                { getAttribute: () => {} },
                { getAttribute: () => {} }
              ]
            }]
          },
          '[data-automation-value^="C" i]': { getAttribute: () => {} }
        };
        component.onKeyDown(KeyEvent(KeyCodes.T));
        expect(component.select).toHaveBeenCalled();
      });
    });

    describe('Function: scrollToSelected', () => {

    });

    describe('Function: scrollToIndex(index)', () => {

    });

    describe('Function: toggleHeader(event, forceValue)', () => {

    });

    describe('Function: highlight(match, query)', () => {

    });

    describe('Function: escapeRegexp(queryToEscape)', () => {

    });

    describe('Function: saveHeader', () => {

    });

    describe('Function: writeValue(model)', () => {
      it('should change the value', () => {
        component.writeValue(10);
        expect(component.model).toEqual(10);
      });
    });

    describe('Function: registerOnChange(fn)', () => {
    });

    describe('Function: registerOnTouched(fn)', () => {
    });
});
