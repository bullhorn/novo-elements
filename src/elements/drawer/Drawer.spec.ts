// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDrawerElement, NovoDrawerToggleElement, NovoDrawerContentElement } from './Drawer';

xdescribe('Elements: NovoDrawerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                NovoDrawerToggleElement,
                NovoDrawerContentElement
            ]/*,
            providers: [
                // { provide: NovoDragulaService, useClass: NovoDragulaService }
            ]/*,
            imports: [
                NovoDrawerElement,
                NovoDrawerToggleElement,
                NovoDrawerContentElement
            ]*/
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDrawerElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    xdescribe('Method: ngOnInit()', () => {
        it('should initialize properly', () => {
            expect(component.ngOnInit).toBeDefined();
            expect(component.onDrawerToggle).toBeDefined();
            component.ngOnInit();
            expect(component.autoClose).toBe('outsideClick');
            expect(component.position).toBe('left');
        });
    });

    xdescribe('Method: toggle(open)', () => {
        it('should open or close the drawer', () => {
            //expect(component.toggle).toBeDefined();
            let test = component.toggle(false);
            expect(test).toBeTruthy();
            test = component.toggle();
            expect(test).toBeFalsy();
        });
    });

    xdescribe('Method: focusToggleElement()', () => {
        it('should focus the toggleElement', () => {
            expect(component.focusToggleElement).toBeDefined();
            spyOn(component.toggleEl.nativeElement, 'focus');
            component.focusToggleElement();
            expect(component.toggleEl.nativeElement.focus).toHaveBeenCalled();
        });
    });
});

xdescribe('Elements: NovoDrawerToggleElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerElement,
                NovoDrawerToggleElement,
                NovoDrawerContentElement
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

xdescribe('Elements: NovoDrawerContentElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDrawerContentElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDrawerContentElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
