import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
    selector: 'novo-nav',
    inputs: ['theme', 'direction', 'outlet', 'router'],
    directives: [CORE_DIRECTIVES],
    template: '<ng-content></ng-content>'
})
export class NovoNav {
    constructor() {
        this.items = [];
        this.theme = '';
        this.direction = '';
    }

    select(item) {
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
        if (this.outlet) {
            this.outlet.show(this.items.indexOf(item));
        }

        // TODO - remove hack to make DOM rerender
        let element = document.querySelector('novo-tab-link.active span.indicator');
        if (element) {
            element.style.opacity = 0.99;
            setTimeout(() => {
                element.style.opacity = 1;
            }, 10);
        }
        // item.selected.next();
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
    directives: [CORE_DIRECTIVES],
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
export class NovoTab {
    constructor(nav:NovoNav) {
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
    directives: [CORE_DIRECTIVES],
    host: {
        '(click)': 'select()',
        '[class.active]': 'active'
    },
    template: `
            <ng-content></ng-content>
  `
})
export class NovoTabButton {
    constructor(nav:NovoNav) {
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
    directives: [CORE_DIRECTIVES],
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
export class NovoTabLink {
    constructor(nav:NovoNav) {
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
    directives: [CORE_DIRECTIVES],
    template: `
        <ng-content></ng-content>
  `
})
export class NovoNavOutlet {
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
    directives: [CORE_DIRECTIVES],
    host: {
        '[class.active]': 'active'
    },
    template: `
        <ng-content></ng-content>
  `
})
export class NovoNavContent {
    constructor(outlet:NovoNavOutlet) {
        this.active = this.active || false;
        outlet.add(this);
    }
}

@Component({
    selector: 'novo-nav-header',
    inputs: ['active', 'for'],
    directives: [CORE_DIRECTIVES],
    host: {
        '[class.active]': 'active',
        '(click)': 'show($event)'
    },
    template: `
        <ng-content></ng-content>
  `
})
export class NovoNavHeader {
    constructor(outlet:NovoNavOutlet) {
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

export const NOVO_TAB_ELEMENTS = [NovoNav, NovoTab, NovoTabLink, NovoNavOutlet, NovoNavHeader, NovoNavContent, NovoTabButton];
