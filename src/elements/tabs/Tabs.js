// NG2
import { Component } from '@angular/core';

@Component({
    selector: 'novo-nav',
    inputs: ['theme', 'direction', 'outlet', 'router'],
    template: '<ng-content></ng-content>'
})
export class NovoNavElement {
    constructor() {
        this.items = [];
        this.theme = '';
        this.direction = '';
    }

    select(item) {
        /**
         * Deactivate all other tabs
         */
        function _deactivateAllItems(items) {
            items.forEach((t) => {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }

        _deactivateAllItems(this.items);
        item.active = true;
        if (this.outlet) {
            this.outlet.show(this.items.indexOf(item));
        }

        // TODO - remove hack to make DOM rerender - jgodi
        let element = document.querySelector('novo-tab-link.active span.indicator');
        if (element) {
            element.style.opacity = 0.99;
            setTimeout(() => {
                element.style.opacity = 1;
            }, 10);
        }
    }

    add(item) {
        if (this.items.length === 0) {
            item.active = true;
            // item.selected.next();
        }
        this.items.push(item);
    }
}

@Component({
    selector: 'novo-tab',
    inputs: ['active'],
    host: {
        '(click)': 'select()',
        '[class.active]': 'active'
    },
    template: `
        <div class="novo-tab-link">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
   `
})
export class NovoTabElement {
    constructor(nav:NovoNavElement) {
        this.active = this.active || false;
        this.nav = nav;
        this.nav.add(this);
    }

    select() {
        this.nav.select(this);
    }
}

@Component({
    selector: 'novo-tab-button',
    inputs: ['active'],
    host: {
        '(click)': 'select()',
        '[class.active]': 'active'
    },
    template: '<ng-content></ng-content>'
})
export class NovoTabButtonElement {
    constructor(nav:NovoNavElement) {
        this.active = this.active || false;
        this.nav = nav;
        this.nav.add(this);
    }

    select() {
        this.nav.select(this);
    }
}

@Component({
    selector: 'novo-tab-link',
    inputs: ['active'],
    host: {
        '(click)': 'select()',
        '[class.active]': 'active'
    },
    template: `
        <div class="novo-tab-link">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
    `
})
export class NovoTabLinkElement {
    constructor(nav:NovoNavElement) {
        this.active = this.active || false;
        this.nav = nav;
        this.nav.add(this);
    }

    select() {
        this.nav.select(this);
    }
}

@Component({
    selector: 'novo-nav-outlet',
    template: '<ng-content></ng-content>'
})
export class NovoNavOutletElement {
    constructor() {
        this.items = [];
    }

    show(index) {
        let item = this.items[index];

        /**
         * Deactivates other tab items
         * @param items - deactivated items
         */
        function _deactivateAllItems(items) {
            items.forEach((t) => {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }

        _deactivateAllItems(this.items);
        item.active = true;
    }

    add(item) {
        if (this.items.length === 0) {
            item.active = true;
        }
        this.items.push(item);
    }
}

@Component({
    selector: 'novo-nav-content',
    inputs: ['active'],
    host: {
        '[class.active]': 'active'
    },
    template: '<ng-content></ng-content>'
})
export class NovoNavContentElement {
    constructor(outlet:NovoNavOutletElement) {
        this.active = this.active || false;
        outlet.add(this);
    }
}

@Component({
    selector: 'novo-nav-header',
    inputs: ['active', 'for'],
    host: {
        '[class.active]': 'active',
        '(click)': 'show($event)'
    },
    template: '<ng-content></ng-content>'
})
export class NovoNavHeaderElement {
    constructor(outlet:NovoNavOutletElement) {
        this.active = this.active || false;
        this.outlet = outlet;
    }

    show() {
        try {
            const INDEX = this.outlet.items.indexOf(this.for);
            if (INDEX > -1) {
                this.outlet.show(INDEX);
            }
        } catch (err) {
            // do nothing
        }
    }
}
