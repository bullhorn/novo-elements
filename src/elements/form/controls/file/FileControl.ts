// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class FileControl extends BaseControl {
    controlType = 'file';

    constructor(config:NovoControlConfig) {
        super(config);
        // TODO - translate
        this.placeholder = config.placeholder || 'Drag & Drop file(s) here to upload';
        this.multiple = config.multiple;
    }
}
