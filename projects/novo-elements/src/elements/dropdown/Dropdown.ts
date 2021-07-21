// NG2
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Helpers } from '../../utils/Helpers';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { notify } from '../../utils/notifier/notifier.util';
// APP
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';

@Component({
  selector: 'novo-dropdown',
  template: `
    <ng-content select="button" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div
        class="dropdown-container {{ containerClass }}"
        [style.height.px]="height"
        [class.has-height]="!!height"
        (keydown)="onOverlayKeyDown($event)"
      >
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `,
})
export class NovoDropdownElement implements OnInit, OnDestroy {
  @Input()
  parentScrollSelector: string;
  @Input()
  parentScrollAction: string = 'close';
  @Input()
  containerClass: string;
  @Input()
  side:
    | 'default'
    | 'right'
    | 'above-below'
    | 'right-above-below'
    | 'center'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right' = 'default';
  @Input()
  scrollStrategy: 'reposition' | 'block' | 'close' = 'reposition';
  @Input()
  height: number;
  @Input()
  width: number = -1; // Defaults to dynamic width (no hardcoded width value and no host width lookup)
  @Input()
  appendToBody: boolean = false; // Deprecated

  @Output()
  toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  clickHandler: any;
  closeHandler: any;
  parentScrollElement: Element;
  private _items: QueryList<NovoItemElement>;
  private _textItems: string[];
  private _activeIndex: number = -1;
  private _activeIndex$ = new BehaviorSubject(this._activeIndex);
  private filterTerm: string = '';
  private filterTermTimeout: any;

  constructor(public element: ElementRef, private ref: ChangeDetectorRef) {
    this.clickHandler = this.togglePanel.bind(this);
    this.closeHandler = this.closePanel.bind(this);
  }

  public ngOnInit(): void {
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    // Add a click handler to the button to toggle the menu
    const button = this.element.nativeElement.querySelector('button');
    if (button) {
      button.addEventListener('click', this.clickHandler);
    }
    if (this.parentScrollSelector) {
      this.parentScrollElement = Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
    }
    this.updateItemIndices();
  }

  public ngOnDestroy(): void {
    // Remove listener
    const button = this.element.nativeElement.querySelector('button');
    if (button) {
      button.removeEventListener('click', this.clickHandler);
    }
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
    }
  }

  public set items(items: QueryList<NovoItemElement>) {
    this._items = items;
    this.activeIndex = -1;
    // Get the innerText of all the items to allow for searching
    this._textItems = items.map((item: NovoItemElement) => {
      return item.element.nativeElement.innerText;
    });
    this.updateItemIndices();
  }

  /** BEGIN: Convenient Panel Methods. */
  public get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }

  private updateItemIndices() {
    let index = 0;
    if (this._items) {
      this._items.map((item: NovoItemElement) => {
        item.index = index;
        index++;
      });
    }
  }

  public set activeIndex(value) {
    if (this._activeIndex > -1 && this._activeIndex < this._items.length) {
      this._items.toArray()[this._activeIndex].active = false;
    }
    this._activeIndex = value;
    if (value > -1 && value < this._items.length) {
      this._items.toArray()[this.activeIndex].active = true;
    }
    this._activeIndex$.next(this._activeIndex);
  }

  public get activeIndex() {
    return this._activeIndex;
  }

  public get activeIndexObs() {
    return this._activeIndex$.asObservable();
  }

  public openPanel(): void {
    this.overlay.openPanel();
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.addEventListener('scroll', this.closeHandler);
    }
    this.toggled.emit(true);
  }

  public closePanel(): void {
    this._items.forEach((item) => {
      if (item.hasSubmenu()) {
        item.submenu.closePanel();
      }
    });
    this.overlay.closePanel();
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
    }
    // Clear active index
    this.activeIndex = -1;
    this.ref.markForCheck();
    this.toggled.emit(false);
  }

  public togglePanel(): void {
    this.panelOpen ? this.closePanel() : this.openPanel();
  }

  public get itemHasSubmenu(): boolean {
    return this.activeIndex > -1
    && this.activeIndex < this._items.length
    && this._items.toArray()[this.activeIndex].hasSubmenu();
  }

  public get navigatingSubmenu(): boolean {
    return this.itemHasSubmenu
      && this._items.toArray()[this.activeIndex].submenu.panelOpen;
  }

  /** END: Convenient Panel Methods. */

  private moveDown(dropdown: NovoDropdownElement): void {
    if (dropdown._items && dropdown._items.filter(item => !item.disabled).length > 0) {
      dropdown.activeIndex++;
      if (dropdown.activeIndex === dropdown._items.length) {
        dropdown.activeIndex = 0;
      }
      while (dropdown._items.toArray()[dropdown.activeIndex].disabled) {
        dropdown.activeIndex++;
        if (dropdown.activeIndex === dropdown._items.length) {
          dropdown.activeIndex = 0;
        }
      }
      dropdown.scrollToActive();
    }
  }

  private moveUp(dropdown: NovoDropdownElement): void {
    if (dropdown._items && dropdown._items.filter(item => !item.disabled).length > 0) {
      dropdown.activeIndex--;
      if (dropdown.activeIndex < 0) {
        dropdown.activeIndex = dropdown._items.length - 1;
      }
      while (dropdown._items.toArray()[dropdown.activeIndex].disabled) {
        dropdown.activeIndex--;
        if (dropdown.activeIndex < 0) {
          dropdown.activeIndex = dropdown._items.length - 1;
        }
      }
      dropdown.scrollToActive();
    }
  }

  private pressEnter(dropdown: NovoDropdownElement, event: KeyboardEvent): void {
    dropdown._items.toArray()[dropdown.activeIndex].onClick(event);
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.panelOpen && event.keyCode === KeyCodes.ESC) {
      Helpers.swallowEvent(event);
      // active & esc hit -- close
      this.closePanel();
    } else if (event.keyCode === KeyCodes.ENTER) {
      // enter -- perform the "click"
      if (this.navigatingSubmenu) {
        this.pressEnter(this._items.toArray()[this.activeIndex].submenu, event);
      } else {
        this.pressEnter(this, event);
      }
    } else if (event.keyCode === KeyCodes.DOWN) {
      Helpers.swallowEvent(event);
      if (this.navigatingSubmenu) {
        this.moveDown(this._items.toArray()[this.activeIndex].submenu);
      } else {
        this.moveDown(this);
      }
    } else if (event.keyCode === KeyCodes.UP) {
      Helpers.swallowEvent(event);
      // up -- navigate through the list ignoring disabled ones
      if (this.navigatingSubmenu) {
        this.moveUp(this._items.toArray()[this.activeIndex].submenu);
      } else {
        this.moveUp(this);
      }
    } else if (event.keyCode === KeyCodes.RIGHT) {
      Helpers.swallowEvent(event);
      // right -- if this item has a submenu, expand it and switch to that context
      if (this.itemHasSubmenu) {
        this._items.toArray()[this.activeIndex].submenu.openPanel();
        this._items.toArray()[this.activeIndex].submenu.activeIndex = 0;
      }
    } else if (event.keyCode === KeyCodes.LEFT) {
      Helpers.swallowEvent(event);
      // left -- if currently navigating a submenu, close it and go back to main context
      if (this.itemHasSubmenu) {
        this._items.toArray()[this.activeIndex].submenu.closePanel();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      event.keyCode === KeyCodes.SPACE
    ) {
      Helpers.swallowEvent(event);
      // A-Z, 0-9, space -- filter the list and scroll to active filter
      // filter has hard reset after 2s
      clearTimeout(this.filterTermTimeout);
      this.filterTermTimeout = setTimeout(() => {
        this.filterTerm = '';
      }, 2000);
      const char = event.key;
      this.filterTerm = this.filterTerm.concat(char);
      const index = this._textItems.findIndex((value: string) => {
        return new RegExp(`^${this.filterTerm.toLowerCase()}`).test(value.trim().toLowerCase());
      });
      if (index !== -1) {
        this.activeIndex = index;
        this.scrollToActive();
      }
    } else if ([KeyCodes.BACKSPACE, KeyCodes.DELETE].includes(event.keyCode)) {
      Helpers.swallowEvent(event);
      // backspace, delete -- remove partial filters
      clearTimeout(this.filterTermTimeout);
      this.filterTermTimeout = setTimeout(() => {
        this.filterTerm = '';
      }, 2000);
      this.filterTerm = this.filterTerm.slice(0, -1);
    }
  }

  public onOverlayKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER) {
      Helpers.swallowEvent(event);
      this.closePanel();
    }
  }

  private scrollToActive(): void {
    const container = this.overlay.overlayRef.overlayElement.querySelector('.dropdown-container');
    const item = this._items.toArray()[this.activeIndex];
    if (container && item) {
      container.scrollTop = item.element.nativeElement.offsetTop;
    }
  }
}

@Component({
  selector: 'item',
  template: `<ng-content></ng-content><i class="bhi-expand" *ngIf="hasSubmenu()">
            <novo-dropdown ngModel #submenu *ngIf="hasSubmenu()">
              <list>
                <item *ngFor="let item of submenuItems" (action)="submenuClicked(item)">{{ item }}</item>
              </list>
            </novo-dropdown>`,
  host: {
    '[class.disabled]': 'disabled',
    '[class.active]': 'active',
    '(mouseenter)': 'mouseEnter()',
  },
})
export class NovoItemElement implements AfterViewInit {
  @Input()
  public disabled: boolean;
  @Input()
  public keepOpen: boolean = false;
  @Output()
  public onSubmenuClick: EventEmitter<any> = new EventEmitter();
  @Output()
  public action: EventEmitter<any> = new EventEmitter();
  @Input()
  public submenuItems: String[] = [];
  @ViewChild('submenu', {static: false})
  submenu: NovoDropdownElement;

  private _active: boolean = false;
  private _active$ = new BehaviorSubject(this._active);
  private submenuIsOpen: boolean = false;
  public index: number;
  public set active(value) {
    this._active = value;
    this._active$.next(this._active);
  }

  public get active() {
    return this._active;
  }

  constructor(private dropdown: NovoDropdownElement, public element: ElementRef) { }

  ngAfterViewInit(): void {
    if (this.submenu) {
      this.submenu.toggled.subscribe(value => this.submenuIsOpen = value);
      this.dropdown.activeIndexObs.subscribe((val) => {
        if (val !== -1 && val !== this.index) {
          this.submenu.closePanel();
        } else if (val === this.index) {
          this.submenu.openPanel();
        }
      });
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    // Poor man's disable
    if (!this.disabled) {
      // Close if keepOpen is false
      if (!this.keepOpen && !this.hasSubmenu()) {
        this.dropdown.closePanel();
      }
      if (this.hasSubmenu()) {
        this.submenu.openPanel();
      }
      // Emit the action
      this.action.emit({ originalEvent: event });
    }
  }

  public hasSubmenu(): boolean {
    return this.submenuItems.length > 0;
  }

  public mouseEnter() {
    this.dropdown.activeIndex = this.index;
  }

  public submenuClicked(item: String): void {
    this.onSubmenuClick.emit(item);
  }
}

@Component({
  selector: 'list',
  template: '<ng-content></ng-content>',
})
export class NovoDropdownListElement implements AfterContentInit {
  @ContentChildren(NovoItemElement)
  public items: QueryList<NovoItemElement>;

  constructor(private dropdown: NovoDropdownElement) {}

  public ngAfterContentInit(): void {
    this.dropdown.items = this.items;
    this.items.changes.subscribe(() => {
      this.dropdown.items = this.items;
    });
  }
}

@Component({
  selector: 'dropdown-item-header',
  template: '<ng-content></ng-content>',
})
export class NovoDropDownItemHeaderElement {}
