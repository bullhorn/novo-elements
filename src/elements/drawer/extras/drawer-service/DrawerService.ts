export const ALWAYS: string = 'always';
export const DISABLED: string = 'disabled';
export const OUTSIDE_CLICK: string = 'outsideClick';

export const POSITION_LEFT: string = 'left';
export const POSITION_RIGHT: string = 'right';
export const POSITION_TOP: string = 'top';
export const POSITION_BOTTOM: string = 'bottom';

export class DrawerService {
    closeDrawerBind: any;
    openScope: any;
    scope: any;

    constructor() {
        this.closeDrawerBind = this.closeDrawer.bind(this);
    }

    open(scope) {
        if (!this.openScope) {
            window.document.addEventListener('click', this.closeDrawerBind);
        }

        if (this.openScope && this.openScope !== this.scope) {
            this.openScope.isOpen = false;
        }

        this.openScope = scope;
    }

    close(scope) {
        if (this.openScope !== scope) {
            return;
        }

        this.openScope = null;
        window.document.removeEventListener('click', this.closeDrawerBind);
    }

    closeDrawer(event) {
        if (!this.openScope) {
            return;
        }

        if (event && this.openScope.autoClose === DISABLED) {
            return;
        }

        if (event && this.openScope.toggleEl && this.openScope.toggleEl.nativeElement === event.target) {
            return;
        }

        if (event && this.openScope.autoClose === OUTSIDE_CLICK && this.openScope.drawerEl && this.openScope.drawerEl.nativeElement === event.target) {
            return;
        }

        this.openScope.isOpen = false;
    }
}
