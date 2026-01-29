// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
// App
import { NovoValueElement, NOVO_VALUE_THEME, NOVO_VALUE_TYPE } from './Value';
import { NovoValueModule } from './Value.module';
import { NovoLabelService } from 'novo-elements/services';

describe('Elements: NovoValueElement', () => {
  let fixture;
  let component: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NovoValueModule],
      providers: [NovoLabelService],
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
    it('should set iconClass to icon iconCls', () => {
      component.launched = false;
      const icon: object = {
        iconCls: 'test',
        onIconClick: '',
      };
      const result = component.iconClass(icon);
      expect(result).toBe('bhi-test actions');
    });

    it('should set iconClass to iconCls and clickable', () => {
      component.launched = false;
      const icon: object = {
        iconCls: 'test',
        onIconClick() {},
      };
      const result = component.iconClass(icon);
      expect(result).toBe('bhi-test actions clickable');
    });

    it('should set iconClass to empty if no icon defined', () => {
      const result = component.iconClass({});
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

  describe('showLabel', () => {
    it('should return true when _type is INTERNAL_LINK', () => {
      component._type = NOVO_VALUE_TYPE.INTERNAL_LINK;
      expect(component.showLabel).toBe(true);
    });

    it('should return true when _type is LINK', () => {
      component._type = NOVO_VALUE_TYPE.LINK;
      expect(component.showLabel).toBe(true);
    });

    it('should return true when _type is ENTITY_LIST', () => {
      component._type = NOVO_VALUE_TYPE.ENTITY_LIST;
      expect(component.showLabel).toBe(true);
    });

    it('should return false when _type is DEFAULT', () => {
      component._type = NOVO_VALUE_TYPE.DEFAULT;
      expect(component.showLabel).toBe(false);
    });

    it('should return false when _type is undefined', () => {
      component._type = undefined;
      expect(component.showLabel).toBe(false);
    });

    it('should return true for any of the three valid types', () => {
      const validTypes = [
        NOVO_VALUE_TYPE.INTERNAL_LINK,
        NOVO_VALUE_TYPE.LINK,
        NOVO_VALUE_TYPE.ENTITY_LIST,
      ];

      validTypes.forEach((type) => {
        component._type = type;
        expect(component.showLabel).toBe(true);
      });
    });
  });

  describe('oninit: showIcon ', () => {
    it('should return true if icons is defined and not empty', () => {
      component.meta = {
        icons: [
          {
            iconCls: 'test',
            onIconClick: '',
          },
        ],
      };
      component.data = 'test';
      component.ngOnInit();
      expect(component.showIcon).toBeTruthy();
    });

    it('should return true with multiple icons', () => {
      component.meta = {
        icons: [
          {
            iconCls: 'test',
            onIconClick: '',
          },
          {
            iconCls: 'anchor',
            onIconClick: '',
          },
        ],
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
      const icon: any = {
        iconCls: 'test',
        onIconClick() {},
      };
      component.data = 'test';
      jest.spyOn(icon, 'onIconClick');
      component.onValueClick(icon);
      expect(icon.onIconClick).toHaveBeenCalledWith(component.data, component.meta);
    });

    it('should return flase if icon is defined and not empty', () => {
      const icon: any = {
        iconCls: 'test',
        onIconClick: '',
      };
      component.data = 'test';
      expect(() => component.onValueClick(icon)).not.toThrow();
    });
  });

  describe('openLink ', () => {
    it('should return true if icon is defined and not empty', () => {
      component.meta = {
        openLink() {},
      };
      component.data = 'test';
      jest.spyOn(component.meta, 'openLink');
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
      expect(component._type).toEqual(NOVO_VALUE_TYPE.INTERNAL_LINK);
    });
    it('should set type to internalLink for ClientCorporation', () => {
      component.meta.associatedEntity.entity = 'ClientCorporation';
      component.ngOnChanges();
      expect(component._type).toEqual(NOVO_VALUE_TYPE.INTERNAL_LINK);
    });
    it('should set type to internalLink for Opportunity', () => {
      component.meta.associatedEntity.entity = 'Opportunity';
      component.ngOnChanges();
      expect(component._type).toEqual(NOVO_VALUE_TYPE.INTERNAL_LINK);
    });
    it('should set type to link for a link', () => {
      component.meta.name = 'companyURL';
      component.data = '';
      component.ngOnChanges();
      expect(component._type).toEqual(NOVO_VALUE_TYPE.LINK);
    });
    it('should strip html tags in large fields if stripHTML = true', () => {
      component.meta.name = 'companyDescription';
      component.meta.dataSpecialization = 'HTML';
      component.meta.stripHTML = true;
      component.data = '<span style="color:#8e44ad">test</span>';
      component.ngOnChanges();
      expect(component.data).toEqual('test');
    });
    it('should strip html tags in large fields if stripHTML = false', () => {
      component.meta.name = 'companyDescription';
      component.meta.dataSpecialization = 'HTML';
      component.meta.stripHTML = false;
      component.data = '<span style="color:#8e44ad">test</span>';
      component.ngOnChanges();
      expect(component.data).toEqual('<span style="color:#8e44ad">test</span>');
    });
    it('should strip html tags in large fields if stripHTML is not defined', () => {
      component.meta.name = 'companyDescription';
      component.meta.dataSpecialization = 'HTML';
      component.data = '<span style="color:#8e44ad">test</span>';
      component.ngOnChanges();
      expect(component.data).toEqual('<span style="color:#8e44ad">test</span>');
    });
    it('should set customClass from meta', () => {
      component.meta.name = 'companyDescription';
      component.meta.dataSpecialization = 'HTML';
      component.meta.customClass = 'testClass';
      component.data = '<span style="color:#8e44ad">test</span>';
      component.ngOnChanges();
      expect(component.customClass).toEqual('testClass');
    });
    it('should set customClass to empty if not defined in meta', () => {
      component.meta.name = 'companyDescription';
      component.meta.dataSpecialization = 'HTML';
      component.data = '<span style="color:#8e44ad">test</span>';
      component.ngOnChanges();
      expect(component.customClass).toEqual('');
    });
  });
  describe('Function: isLinkField', () => {
    it('should return true for link fields or an obvious link', () => {
      expect(component.isLinkField({ name: 'companyURL' }, '')).toBeTruthy();
      expect(component.isLinkField({ name: 'mobile' }, '')).toBeFalsy();
      expect(component.isLinkField({ name: 'customText18' }, 'www.google.com')).toBeTruthy();
    });
  });
  describe('Function: isHTMLField', () => {
    it('should return true for html fields', () => {
      expect(component.isHTMLField({ dataSpecialization: 'HTML' })).toBeTruthy();
      expect(component.isHTMLField({ inputType: 'TEXTAREA' })).toBeTruthy();
      expect(component.isHTMLField({ dataSpecialization: 'NO_HTML' })).toBeFalsy();
    });
  });
});
