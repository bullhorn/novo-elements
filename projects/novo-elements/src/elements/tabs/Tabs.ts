// NG2
import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'novo-nav',
  template: '<ng-content></ng-content>',
})
export class NovoNavElement {
  @Input()
  theme: string = '';
  @Input()
  direction: string = '';
  @Input()
  outlet: any;
  @Input()
  router: string;
  @HostBinding('class.condensed')
  @Input()
  condensed: boolean = false;

  items: Array<any> = [];

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
    let element = document.querySelector('novo-tab-link.active span.indicator') as any;
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
  host: {
    '(click)': 'select()',
    '[class.active]': 'active',
    '[class.disabled]': 'disabled',
  },
  template: `
        <div class="novo-tab-link">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
   `,
})
export class NovoTabElement {
  @Input()
  active: boolean = false;
  @Input()
  disabled: boolean = false;
  @Output()
  activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  nav: any;

  constructor(nav: NovoNavElement) {
    this.nav = nav;
    this.nav.add(this);
  }

  select() {
    if (!this.disabled) {
      this.activeChange.emit(true);
      this.nav.select(this);
    }
  }
}

@Component({
  selector: 'novo-tab-button',
  host: {
    '(click)': 'select()',
    '[class.active]': 'active',
    '[class.disabled]': 'disabled',
  },
  template: '<ng-content></ng-content>',
})
export class NovoTabButtonElement {
  @Input()
  active: boolean = false;
  @Input()
  disabled: boolean = false;

  nav: any;

  constructor(nav: NovoNavElement) {
    this.nav = nav;
    this.nav.add(this);
  }

  select() {
    if (!this.disabled) {
      this.nav.select(this);
    }
  }
}

@Component({
  selector: 'novo-tab-link',
  host: {
    '(click)': 'select()',
    '[class.active]': 'active',
    '[class.disabled]': 'disabled',
  },
  template: `
        <div class="novo-tab-link">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
    `,
})
export class NovoTabLinkElement {
  @Input()
  active: boolean = false;
  @Input()
  disabled: boolean = false;

  nav: any;

  constructor(nav: NovoNavElement) {
    this.nav = nav;
    this.nav.add(this);
  }

  select() {
    if (!this.disabled) {
      this.nav.select(this);
    }
  }
}

@Component({
  selector: 'novo-nav-outlet',
  template: '<ng-content></ng-content>',
})
export class NovoNavOutletElement {
  items: Array<any> = [];

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
  host: {
    '[class.active]': 'active',
  },
  template: '<ng-content></ng-content>',
})
export class NovoNavContentElement {
  @Input()
  active: boolean = false;

  constructor(outlet: NovoNavOutletElement) {
    outlet.add(this);
  }
}

@Component({
  selector: 'novo-nav-header',
  host: {
    '[class.active]': 'active',
    '(click)': 'show($event)',
  },
  template: '<ng-content></ng-content>',
})
export class NovoNavHeaderElement {
  @Input()
  active: boolean = false;
  @Input('for')
  forElement: any;
  outlet: any;

  constructor(outlet: NovoNavOutletElement) {
    this.active = this.active || false;
    this.outlet = outlet;
  }

  show(event?: any) {
    try {
      const INDEX = this.outlet.items.indexOf(this.forElement);
      if (INDEX > -1) {
        this.outlet.show(INDEX);
      }
    } catch (err) {
      // do nothing
    }
  }
}
