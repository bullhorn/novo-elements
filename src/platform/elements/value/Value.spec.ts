// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoValueElement, NOVO_VALUE_THEME, NOVO_VALUE_TYPE } from './Value';
// import { NovoLabelService } from '../../services/novo-label-service';
import { NovoValueModule } from './Value.module';
// TODO fix specs
describe('Elements: NovoValueElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NovoValueModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoValueElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('oninit ', () => {
        it('should default meta.lable if no meta is defined.', () => {
            component.ngOnInit();
            expect(component.meta.label).toBe('');
        });
    });

    describe('iconClass ', () => {
        it('should set iconClass to meta icon', () => {
            component.launched = false;
            let icon: object = {
                    iconCls: 'test',
                    onIconClick: '',
            };
            let result = component.iconClass(icon);
            expect(result).toBe('bhi-test actions');
        });

        it('should set iconClass to empty if no icon defined', () => {
            let result = component.iconClass({});
            expect(result).toBe('');
        });
    });

    describe('oninit: isMobile: ', () => {
        it('should return true if theme is mobile.', () => {
            component.theme = NOVO_VALUE_THEME.MOBILE;
            component.ngOnInit();
            expect(component.isMobile).toBeTruthy();
        });

        it('should return false if theme is not mobile.', () => {
            component.theme = NOVO_VALUE_THEME.DEFAULT;
            component.ngOnInit();
            expect(component.isMobile).toBeFalsy();
        });
    });

    describe('oninit: showLabel: ', () => {
        it('should return true if type is valid', () => {
            component.type= NOVO_VALUE_TYPE.INTERNAL_LINK;
            component.ngOnInit();
            expect(component.showLabel).toBeTruthy();
        });

        it('should return true if type is valid', () => {
            component.type= NOVO_VALUE_TYPE.LINK;
            component.ngOnInit();
            expect(component.showLabel).toBeTruthy();
        });

        it('should return false if type is not correct.', () => {
            component.ngOnInit();
            expect(component.showLabel).toBeFalsy();
        });
    });

    describe('oninit: showIcon ', () => {
        it('should return true if icon is defined and not empty', () => {
            component.meta = {
                icons:[{
                    iconCls: 'test',
                    onIconClick: '',
                }]
            };
            component.data = 'test';
            component.ngOnInit();
            expect(component.showIcon).toBeTruthy();
        });

        it('should return false if type is not correct.', () => {
            component.ngOnInit();
            expect(component.showIcon).toBeFalsy();
        });
    });

    describe('onValueClick ', () => {
        it('should return true if icon is defined and not empty', () => {
            let icon: any = {
                    iconCls: 'test',
                    onIconClick: function() { },
            };
            component.data = 'test';
            spyOn(icon, 'onIconClick');
            component.onValueClick(icon);
            expect(icon.onIconClick).toHaveBeenCalledWith(component.data, component.meta);
        });
    });

    describe('openLink ', () => {
        it('should return true if icon is defined and not empty', () => {
            component.meta = {
                openLink: function() { },
            };
            component.data = 'test';
            spyOn(component.meta, 'openLink');
            component.openLink();
            expect(component.meta.openLink).toHaveBeenCalledWith(component.data, component.meta);
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
        it('should set type to email for an email', () => {
            component.meta.name = 'email';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.EMAIL);
        });
        it('should set type to link for a link', () => {
            component.meta.name = 'companyURL';
            component.data = '';
            component.ngOnChanges();
            expect(component.type).toEqual(NOVO_VALUE_TYPE.LINK);
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
    describe('Function: isLinkField', () => {
        it('should return true for link fields or an obvious link', () => {
            expect(component.isLinkField({ name: 'companyURL' }, '')).toBeTruthy();
            expect(component.isLinkField({ name: 'mobile' }, '')).toBeFalsy();
            expect(component.isLinkField({ name: 'customText18' }, 'www.google.com')).toBeTruthy();
        });
    });
});
