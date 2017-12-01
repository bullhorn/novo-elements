import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
export declare class NovoToastService {
    private componentUtils;
    _parentViewContainer: any;
    references: Array<any>;
    themes: Array<string>;
    icons: any;
    defaults: any;
    constructor(componentUtils: ComponentUtils);
    parentViewContainer: any;
    alert(options: any): Promise<{}>;
    isVisible(toast: any): any;
    hide(toast: any): void;
    handleAlert(toast: any, options: any): void;
    setToastOnSession(toast: any, opts: any): void;
    show(toast: any): void;
    toastTimer(toast: any): void;
}
