// NG
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
// APP
import { NovoConfirmModal } from './confirm-modal.component';
import { NovoModalModule } from '../modal.module';
import { NovoModalParams, NovoModalRef } from '../modal-ref';
import { NovoLabelService } from 'novo-elements/services';

describe('Modal: NovoConfirmModal', () => {
    let component: NovoConfirmModal;
    let fixture: ComponentFixture<NovoConfirmModal>;

    beforeAll(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NovoConfirmModal],
            imports: [NovoModalModule],
            providers: [
                { provide: NovoModalParams, useValue: {} },
                { provide: NovoModalRef, useValue: { close: () => {} } },
                NovoLabelService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            declarations: [NovoConfirmModal],
            imports: [NovoModalModule],
            providers: [
                { provide: NovoModalParams, useValue: {} },
                { provide: NovoModalRef, useValue: { close: jasmine.createSpy('close') } },
                NovoLabelService,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(NovoConfirmModal);
        component = fixture.componentInstance;
    });

    describe('cancel()', () => {
        it('should call close on novoModalRef when called.', () => {
            expect(component.cancel).toBeDefined();
            component.cancel();
            expect((component as any).novoModalRef.close).toHaveBeenCalled();
        });
    });

    describe('ngOnInit()', () => {
        it('should get messages from params', () => {
            (component as any).params = {
                headerText: 'header stuff',
                subheaderText: 'subheader stuff',
                descriptionText1: 'description1 stuff',
                descriptionText2: 'description2 stuff',
                showCancel: true,
            };
            component.ngOnInit();
            expect(component.headerText).toEqual('header stuff');
            expect(component.subheaderText).toEqual('subheader stuff');
            expect(component.descriptionText1).toEqual('description1 stuff');
            expect(component.descriptionText2).toEqual('description2 stuff');
            expect(component.showCancel).toBe(true);
        });

        it('should handle customIcon when provided', () => {
            (component as any).params = {
                headerText: 'Are you sure?',
                customIcon: 'bhi-delete',
            };
            component.ngOnInit();
            expect(component.headerText).toEqual('Are you sure?');
            expect(component.customIcon).toEqual('bhi-delete');
        });
    });

    describe('yes()', () => {
        it('should call close on novoModalRef when called.', () => {
            component.yes();
            expect((component as any).novoModalRef.close).toHaveBeenCalledWith(true);
        });
    });
});
