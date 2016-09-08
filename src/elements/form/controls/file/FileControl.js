// APP
import { BaseControl } from './../BaseControl';
//import { FormValidators } from './../../FormValidators';

export class FileControl extends BaseControl {
    controlType = 'file';
    constructor(config = {}) {
        super(config);
        this.placeholder = config.placeholder || 'Drag & Drop file(s) here to upload';
        this.multiple = config.multiple;
        //this.setValidators(this.type);
    }
}
