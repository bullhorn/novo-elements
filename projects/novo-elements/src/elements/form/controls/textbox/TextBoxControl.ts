// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';
import { FormValidators } from './../../FormValidators';

export class TextBoxControl extends BaseControl {
  controlType: string = 'textbox';
  type: string;
  subType: string;

  constructor(config: NovoControlConfig) {
    super('TextBoxControl', config);
    this.type = this.getTextboxType(config.type) || '';
    this.subType = config.type || '';
    this.setValidators(this.subType);
  }

  setValidators(type) {
    switch (type) {
      case 'email':
        this.validators.push(FormValidators.isEmail);
        break;
      case 'number':
      case 'currency':
        this.validators.push(FormValidators.maxInteger);
        break;
      case 'float':
      case 'percentage':
        this.validators.push(FormValidators.maxDouble);
        break;
      case 'year':
        this.validators.push(FormValidators.minYear);
        break;
      default:
        break;
    }
  }

  getTextboxType(type) {
    switch (type) {
      case 'percentage':
      case 'currency':
      case 'float':
      case 'year':
        return 'number';
      default:
        return type;
    }
  }
}
