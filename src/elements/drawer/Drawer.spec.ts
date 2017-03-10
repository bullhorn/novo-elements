// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDrawerElement, NovoDrawerToggleElement } from './Drawer';

fdescribe('Elements: NovoDrawerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                NovoDrawerToggleElement
            ],
            providers: [
                // { provide: NovoDragulaService, useClass: NovoDragulaService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDrawerElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize properly', () => {
            expect(component.ngOnInit).toBeDefined();
            expect(component.onDrawerToggle).toBeDefined();
            component.ngOnInit();
            expect(component.autoClose).toBe('outsideClick');
            expect(component.position).toBe('left');
        });
    });

    describe('Method: toggle(open)', () => {
        it('should open or close the drawer', () => {
            //expect(component.toggle).toBeDefined();
            let test = component.toggle(false);
            expect(test).toBeTruthy();
            test = component.toggle();
            expect(test).toBeFalsy();
        });
    });

    describe('Method: focusToggleElement()', () => {
        it('should focus the toggleElement', () => {
            expect(component.focusToggleElement).toBeDefined();
            spyOn(component.toggleEl.nativeElement, 'focus');
            component.focusToggleElement();
            expect(component.toggleEl.nativeElement.focus).toHaveBeenCalled();
        });
    });
});

describe('Elements: NovoDrawerToggleElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                NovoDrawerToggleElement
            ],
            providers: [
                // { provide: NovoDragulaService, useClass: NovoDragulaService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDrawerToggleElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize properly', () => {
            expect(component.ngOnInit).toBeDefined();
            expect(component.disabled).toBeFalsy();
        });
    });

    xdescribe('Method: toggleDrawer(event)', () => {
        it('should toggle drawer', () => {
            expect(component.toggleDrawer).toBeDefined();
            spyOn(component.drawer, 'toggle');
            expect(component.drawer.toggle).toHaveBeenCalled();
        });
    });

    xdescribe('Getter: isOpen()', () => {
        it('should toggle isOpen value', () => {
            let test = component.isOpen;
            expect(test).toBeFalsy();
        });
    });
});
