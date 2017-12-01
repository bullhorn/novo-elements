import { NovoModalRef } from './Modal';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
export declare class NovoModalService {
    private componentUtils;
    _parentViewContainer: any;
    constructor(componentUtils: ComponentUtils);
    parentViewContainer: any;
    open(component: any, scope?: {}): NovoModalRef;
}
