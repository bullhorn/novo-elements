import { Component, Injectable, ApplicationRef, DynamicComponentLoader, ElementRef, Injector } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

@Injectable()
export class NovoToaster {
    constructor(loader:DynamicComponentLoader, appRef:ApplicationRef, injector:Injector) {
        this.loader = loader;
        this.injector = injector;
        this.app = appRef;
        this.references = [];

        this.positions = [
            'fixedTop',
            'fixedBottom',
            'growlTopLeft',
            'growlTopRight',
            'growlBottomLeft',
            'growlBottomRight'
        ];

        this.themes = [
            'default',
            'success',
            'info',
            'warning',
            'danger'
        ];

        this.icons = {
            default: 'bell',
            success: 'check',
            info: 'info',
            warning: 'warning',
            danger: 'remove'
        };

        this.defaults = {
            hideDelay: 3500,
            position: 'growlTopRight',
            theme: 'default'
        };
    }

    register(root, location) {
        this.root = root;
        if (location) {
            this.location = location;
        }
    }

    alert(component, options) {
        return new Promise((resolve) => {
            if (!this.root) {
                this.root = this.app._rootComponents[0].location;
            }
            if (this.location) {
                this.loader.loadIntoLocation(component, this.root, this.location).then(toast => {
                    toast.instance.embedded = true;
                    this.references.push(toast);
                    this.handleAlert(toast.instance, options);
                    resolve(toast);
                });
            } else {
                this.loader.loadNextToLocation(component, this.root).then(toast => {
                    this.references.push(toast);
                    this.handleAlert(toast.instance, options);
                    resolve(toast);
                });
            }
        });
    }

    isVisible(toast) {
        return toast.show;
    }

    hide(toast) {
        toast.animate = false;
        setTimeout(() => {
            toast.show = false;
            const REF = this.references.filter(x => x.instance === toast)[0];
            if (REF) {
                this.references.splice(this.references.indexOf(REF), 1);
                REF.dispose();
            }
        }, 300);
    }

    handleAlert(toast, options) {
        this.setToastOnSession(toast, options);
        setTimeout(() => {
            this.show(toast);
        }, 20);
        this.toastTimer(toast);
    }

    setToastOnSession(toast, opts) {
        const OPTIONS = (typeof opts === 'object') ? opts : {};

        toast.parent = this;
        toast.title = OPTIONS.title || '';
        toast.message = OPTIONS.message || '';
        toast.hideDelay = OPTIONS.hideDelay || this.defaults.hideDelay;

        const CUSTOM_CLASS = OPTIONS.customClass || '';
        const ALERT_STYLE = OPTIONS.theme || this.defaults.theme;
        const ALERT_POSITION = OPTIONS.position || this.defaults.position;
        const ALERT_ICON = OPTIONS.icon || this.icons.default;

        toast.iconClass = `bhi-${ALERT_ICON}`;
        toast.alertTheme = `${ALERT_STYLE} ${ALERT_POSITION} ${CUSTOM_CLASS} toast-container`;
    }

    show(toast) {
        toast.show = true;
        setTimeout(addClass, 25);
        /**
        * Adds animate class to be called after a timeout
        **/
        function addClass() {
            toast.animate = true;
        }
    }

    toastTimer(toast) {
        if (toast.hideDelay < 0) return;
        setTimeout(() => {
            this.hide(toast);
        }, toast.hideDelay);
    }
}

@Component({
    selector: 'novo-toast',
    inputs: [],
    host: {
        '[class]': 'alertTheme',
        '[class.show]': 'show',
        '[class.animate]': 'animate',
        '[class.embedded]': 'embedded',
        '(click)': 'clickHandler($event)'
    },
    template: `
        <div class="toast-icon">
            <i [ngClass]="iconClass"></i>
        </div>
        <div class="toast-content">
            <h5 *ngIf="title">{{title}}</h5>
            <p *ngIf="message" [class.message-only]="!title">{{message}}</p>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class NovoToast {
    constructor(element:ElementRef) {
        this.show = false;
        this.animate = false;
        this.embedded = false;
        this.parent = null;
        this.ref = element;
    }

    clickHandler(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.parent) {
            this.parent.hide(this);
        }
    }
}

export const NOVO_TOAST_ELEMENTS = [NovoToast];
