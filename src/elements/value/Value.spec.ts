// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoValueElement, NOVO_VALUE_THEME, NOVO_VALUE_TYPE } from './Value';
import { NovoLabelService } from '../../services/novo-label-service';
// TODO fix specs
xdescribe('Elements: NovoValueElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoValueElement
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoValueElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('oninit: ', () => {
        it('should be defined.', () => {
            expect(component.ngOnInit).toBeDefined();
        });

        it('should defaulr.', () => {
            component.launched = false;
            component.ngOnInit();
            expect(component.iconClass).toBeDefined();
        });

    });

    describe('close: ', () => {
        it('should be defined.', () => {
            expect(component.close).toBeDefined();
        });
    });

    describe('Function: ngOnChanges', () => {
        beforeEach(() => {
            component.meta = {
                associatedEntity: {
                    entity: 'ClientContact',
                },
                name: 'test',
            };
        });
        it('should set type to internalLink for ClientContact', () => {
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.INTERNAL_LINK);
        });
        it('should set type to internalLink for ClientCorporation', () => {
            component.meta.associatedEntity.entity = 'ClientCorporation';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.INTERNAL_LINK);
        });
        it('should not set type to internalLink for any entity other than ClientCorporation or ClientContact', () => {
            component.meta.associatedEntity.entity = 'NotEntity';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.DEFAULT);
        });
        it('should set type to email for an email', () => {
            component.meta.name = 'email';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.EMAIL);
        });
        it('should set type to phone for an phone', () => {
            component.meta.name = 'mobile';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.PHONE);
        });
        it('should set type to link for a link', () => {
            component.meta.name = 'companyURL';
            component.data = '';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.LINK);
        });
        it('should filter options if meta has readOnly options', () => {
            component.meta.options = [{ label: 1, readOnly: true }, { label: 2 }];
            component.ngOnChanges();
            expect(component.filteredOptions).toEqual([{ label: 2 }]);
        });
    });
    describe('Function: isEmailField', () => {
        it('should return true for email fields and false if not email field', () => {
            expect(component.isEmailField({ name: 'email' })).toBeTruthy();
            expect(component.isEmailField({ name: 'email2' })).toBeTruthy();
            expect(component.isEmailField({ name: 'email3' })).toBeTruthy();
            expect(component.isEmailField({ name: 'cat' })).toBeFalsy();
        });
    });
    describe('Function: isPhoneField', () => {
        it('should return true for phone fields and false if not phone field', () => {
            expect(component.isPhoneField({ name: 'phone' })).toBeTruthy();
            expect(component.isPhoneField({ name: 'mobile' })).toBeTruthy();
            expect(component.isPhoneField({ name: 'phone3' })).toBeTruthy();
            expect(component.isPhoneField({ name: 'cat' })).toBeFalsy();
        });
    });
    describe('Function: isLinkField', () => {
        it('should return true for link fields or an obvious link', () => {
            expect(component.isLinkField({ name: 'companyURL' }, '')).toBeTruthy();
            expect(component.isLinkField({ name: 'mobile' }, '')).toBeFalsy();
            expect(component.isLinkField({ name: 'customText18' }, 'www.google.com')).toBeTruthy();
        });
    });
});
