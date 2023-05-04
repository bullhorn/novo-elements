// APP
import { BaseControl } from './BaseControl';

describe('Control: BaseControl', () => {
  let control;

  describe('Base Config', () => {
    beforeEach(() => {
      control = new BaseControl();
    });

    it('should set the validators', () => {
      expect(control.validators.length).toBe(0);
    });
    it('should set the asyncValidators', () => {
      expect(control.asyncValidators.length).toBe(0);
    });
    it('should set the value', () => {
      expect(control.value).toBeFalsy();
    });
    it('should set the key', () => {
      expect(control.key).toEqual('');
    });
    it('should set the label', () => {
      expect(control.label).toEqual('');
    });
    it('should set the required', () => {
      expect(control.required).toBe(false);
    });
    it('should set the hidden', () => {
      expect(control.hidden).toBe(false);
    });
    it('should set the encrypted', () => {
      expect(control.encrypted).toBe(false);
    });
    it('should set the multiple', () => {
      expect(control.multiple).toBe(false);
    });
    it('should set the sortOrder', () => {
      expect(control.sortOrder).toBe(1);
    });
    it('should set the placeholder', () => {
      expect(control.placeholder).toEqual('');
    });
    it('should set the currencyFormat', () => {
      expect(control.currencyFormat).toEqual(null);
    });
    it('should set the config', () => {
      expect(control.config).toEqual(null);
    });
    it('should set the headerConfig', () => {
      expect(control.headerConfig).toEqual(null);
    });
    it('should set the associatedEntity', () => {
      expect(control.associatedEntity).toEqual(null);
    });
    it('should set the optionsType', () => {
      expect(control.optionsType).toEqual(null);
    });
    it('should set the disabled', () => {
      expect(control.disabled).toEqual(false);
    });
  });

  describe('With Config', () => {
    beforeEach(() => {
      control = new BaseControl('BaseControl', {
        validators: ['TEST_VALIDATORS'],
        value: 'TEST_VALUE',
        key: 'TEST_KEY',
        label: 'TEST_LABEL',
        required: true,
        hidden: false,
        encrypted: true,
        sortOrder: 2,
        placeholder: 'TEST_PLACEHOLDER',
        config: { test: 'TEST_CONFIG' },
        multiple: true,
        headerConfig: { test: 'TEST_HEADER_CONFIG' },
        currencyFormat: 'TEST_CURRENCY_FORMAT',
        associatedEntity: 'ENTITY',
        optionsType: 'TYPE',
        maxlength: 100,
        disabled: true,
        layoutOptions: { removable: false },
        fileBrowserImageUploadUrl: '/foo/bar/baz',
        textMaskEnabled: true,
        maskOptions: { mask: ['TEST_MASK_OPTIONS'], keepCharPositions: false, guide: true },
      });
    });

    it('should set the validators', () => {
      expect(control.validators.length).toBe(3);
    });
    it('should set the value', () => {
      expect(control.value).toEqual('TEST_VALUE');
    });
    it('should set the key', () => {
      expect(control.key).toEqual('TEST_KEY');
    });
    it('should set the label', () => {
      expect(control.label).toEqual('TEST_LABEL');
    });
    it('should set the required', () => {
      expect(control.required).toBe(true);
    });
    it('should set the hidden', () => {
      expect(control.hidden).toBe(false);
    });
    it('should set the encrypted', () => {
      expect(control.encrypted).toBe(true);
    });
    it('should set the multiple', () => {
      expect(control.multiple).toBe(true);
    });
    it('should set the sortOrder', () => {
      expect(control.sortOrder).toBe(2);
    });
    it('should set the placeholder', () => {
      expect(control.placeholder).toEqual('TEST_PLACEHOLDER');
    });
    it('should set the currencyFormat', () => {
      expect(control.currencyFormat).toEqual('TEST_CURRENCY_FORMAT');
    });
    it('should set the config', () => {
      expect(control.config).toEqual({ test: 'TEST_CONFIG' });
    });
    it('should set the headerConfig', () => {
      expect(control.headerConfig).toEqual({ test: 'TEST_HEADER_CONFIG' });
    });
    it('should set the associatedEntity', () => {
      expect(control.associatedEntity).toEqual('ENTITY');
    });
    it('should set the optionsType', () => {
      expect(control.optionsType).toEqual('TYPE');
    });
    it('should set maxlength', () => {
      expect(control.maxlength).toEqual(100);
    });
    it('should set the disabled', () => {
      expect(control.disabled).toEqual(true);
    });
    it('should set the layoutOptions', () => {
      expect(control.layoutOptions).toEqual({ removable: false });
    });
    it('should set fileBrowserImageUploadUrl', () => {
      expect(control.fileBrowserImageUploadUrl).toEqual('/foo/bar/baz');
    });
    it('should set textMaskEnabled', () => {
      expect(control.textMaskEnabled).toEqual(true);
    });
    it('should set maskOptions', () => {
      expect(control.maskOptions).toEqual({ mask: ['TEST_MASK_OPTIONS'], keepCharPositions: false, guide: true });
    });
  });

  describe('Dirty flag tests', () => {
    it('non-zero value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Integer',
        value: 2,
      });
      expect(control.dirty).toBe(true);
    });
    it('zero value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Integer',
        value: 0,
      });
      expect(control.dirty).toBe(true);
    });
    it('string value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'String',
        value: 'remote work',
      });
      expect(control.dirty).toBe(true);
    });
    it('empty string value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'String',
        value: '',
      });
      expect(control.dirty).toBe(true);
    });
    it('boolean value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Boolean',
        value: false,
      });
      expect(control.dirty).toBe(true);
    });
    it('boolean value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Boolean',
        value: true,
      });
      expect(control.dirty).toBe(true);
    });
    it('double value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Double',
        value: 12.34,
      });
      expect(control.dirty).toBe(true);
    });
    it('zero double value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Double',
        value: 0.0,
      });
      expect(control.dirty).toBe(true);
    });
    it('timestamp value should be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Timestamp',
        value: '10-04-19 12:00:17',
      });
      expect(control.dirty).toBe(true);
    });
    it('undefined value should not be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'String',
      });
      expect(control.dirty).toBe(false);
    });
    it('null string value should not be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'String',
        value: null,
      });
      expect(control.dirty).toBe(false);
    });
    it('null boolean should not be marked dirty', () => {
      control = new BaseControl('BaseControl', {
        dataType: 'Boolean',
        value: null,
      });
      expect(control.dirty).toBe(false);
    });
  });
});
