// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoFileInputElement } from './FileInput';
import { NovoLoadingElement } from '../../../loading/Loading';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { DecodeURIPipe } from '../../../../pipes/decode-uri/DecodeURI';

describe('Elements: NovoFileInputElement', () => {
    let fixture;
    let component;

    let FakeEvent = () => { };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoFileInputElement,
                NovoLoadingElement,
                DecodeURIPipe
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoFileInputElement);
        component = fixture.debugElement.componentInstance;
    }));
    it('should initialize correctly.', () => {
        expect(component).toBeDefined();
    });

    describe('Method: ngOnInit()', () => {
        it('should setup drag events', () => {
            expect(component.ngOnInit).toBeDefined();
            spyOn(component.element.nativeElement, 'addEventListener');
            component.ngOnInit();
            expect(component.element.nativeElement.addEventListener).toHaveBeenCalled();
        });
    });
    //
    // describe('Method: ngOnDestroy()', () => {
    //     it('should destroy events.', () => {
    //         expect(component.ngOnDestroy).toBeDefined();
    //         spyOn(component.element.nativeElement, 'removeEventListener');
    //         component.ngOnDestroy();
    //         expect(component.element.nativeElement.removeEventListener).toHaveBeenCalled();
    //     });
    // });
    //
    // describe('Method: dragEnterHandler(event)', () => {
    //     it('should set active to true.', () => {
    //         expect(component.dragEnterHandler).toBeDefined();
    //         let evt = new FakeEvent();
    //         component.dragEnterHandler(evt);
    //         expect(evt.dataTransfer.dropEffect).toBe('copy');
    //         expect(component.active).toBe(true);
    //     });
    // });
    //
    // describe('Method: dragLeaveHandler(event)', () => {
    //     it('should set active to false.', () => {
    //         expect(component.dragLeaveHandler).toBeDefined();
    //         let evt = new FakeEvent();
    //         component.dragLeaveHandler(evt);
    //         expect(component.active).toBe(false);
    //     });
    // });
    //
    // describe('Method: dropHandler(event)', () => {
    //     it('should set active to false.', () => {
    //         expect(component.dropHandler).toBeDefined();
    //         let evt = new FakeEvent();
    //         component.dropHandler(evt);
    //         expect(component.active).toBe(false);
    //     });
    // });
    //
    // describe('Method: writeValue()', () => {
    //     it('should be defined.', () => {
    //         expect(component.writeValue).toBeDefined();
    //     });
    //
    //     it('should change the value', () => {
    //         component.writeValue(10);
    //         expect(component.model).toBe(10);
    //     });
    // });
    //
    // describe('Method: registerOnChange()', () => {
    //     it('should be defined.', () => {
    //         expect(component.registerOnChange).toBeDefined();
    //     });
    // });
    //
    // describe('Method: registerOnTouched()', () => {
    //     it('should be defined.', () => {
    //         expect(component.registerOnTouched).toBeDefined();
    //     });
    // });
});



