// NG2
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
  QueryList, ViewChild,
} from '@angular/core';
// APP
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';
import { notify } from '../../utils/notifier/notifier.util';

@Component({
  selector: 'novo-dropdown',
  template: `
    <ng-content select="button" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div class="dropdown-container {{ containerClass }}" [style.height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `,
})
export class NovoDropdownElement implements OnInit, OnDestroy {
  @Input() parentScrollSelector: string;
  @Input() parentScrollAction: string = 'close';
  @Input() containerClass: string;
  @Input() side: 'right' | 'default' | 'bottom' = 'default';
  @Input() scrollStrategy: 'reposition' | 'block' | 'close' = 'reposition';
  @Input() height: number;
  @Input() width: number = 180;
  @Input() appendToBody: boolean = false; // Deprecated

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(NovoOverlayTemplateComponent) overlay: NovoOverlayTemplateComponent;
  @ViewChild('trigger') public button;

  clickHandler: any;
  closeHandler: any;
  parentScrollElement: Element;
  private _items: QueryList<NovoItemElement>;
  private _textItems: string[];
  private activeIndex: number = -1;
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
    let button = this.element.nativeElement.querySelector('button');
    button.addEventListener('click', this.clickHandler);
    if (this.parentScrollSelector) {
      this.parentScrollElement = Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
    }
  }

  public ngOnDestroy(): void {
    // Remove listener
    let button = this.element.nativeElement.querySelector('button');
    if (button) {
      button.removeEventListener('click', this.clickHandler);
    }
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
    }
  }

  public set items(items: QueryList<NovoItemElement>) {
    this._items = items;
    // Get the innerText of all the items to allow for searching
    this._textItems = items.map((item: NovoItemElement) => {
      return item.element.nativeElement.innerText;
    });
  }

  /** BEGIN: Convenient Panel Methods. */
  public get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }

  public openPanel(): void {
    this.overlay.openPanel();
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.addEventListener('scroll', this.closeHandler);
    }
    this.toggled.emit(true);
  }

  public closePanel(): void {
    this.overlay.closePanel();
    if (this.parentScrollElement && this.parentScrollAction === 'close') {
      this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
    }
    // Clear active index
    if (this.activeIndex !== -1) {
      this._items.toArray()[this.activeIndex].active = false;
    }
    this.activeIndex = -1;
    this.ref.markForCheck();
    this.toggled.emit(false);
  }

  public togglePanel(): void {
    this.panelOpen ? this.closePanel() : this.openPanel();
  }

  /** END: Convenient Panel Methods. */

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.panelOpen && event.keyCode === KeyCodes.ESC) {
      Helpers.swallowEvent(event);
      // active & esc hit -- close
      this.closePanel();
    } else if (event.keyCode === KeyCodes.ENTER) {
      Helpers.swallowEvent(event);
      // enter -- perform the "click"
      this._items.toArray()[this.activeIndex].onClick(event);
    } else if (event.keyCode === KeyCodes.DOWN) {
      Helpers.swallowEvent(event);
      // down - navigate through the list ignoring disabled ones
      if (this.activeIndex !== -1) {
        this._items.toArray()[this.activeIndex].active = false;
      }
      this.activeIndex++;
      if (this.activeIndex === this._items.length) {
        this.activeIndex = 0;
      }
      while (this._items.toArray()[this.activeIndex].disabled) {
        this.activeIndex++;
        if (this.activeIndex === this._items.length) {
          this.activeIndex = 0;
        }
      }
      this._items.toArray()[this.activeIndex].active = true;
      this.scrollToActive();
    } else if (event.keyCode === KeyCodes.UP) {
      Helpers.swallowEvent(event);
      // up -- navigate through the list ignoring disabled ones
      if (this.activeIndex !== -1) {
        this._items.toArray()[this.activeIndex].active = false;
      }
      this.activeIndex--;
      if (this.activeIndex < 0) {
        this.activeIndex = this._items.length - 1;
      }
      while (this._items.toArray()[this.activeIndex].disabled) {
        this.activeIndex--;
        if (this.activeIndex < 0) {
          this.activeIndex = this._items.length - 1;
        }
      }
      this._items.toArray()[this.activeIndex].active = true;
      this.scrollToActive();
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
      let char = String.fromCharCode(event.keyCode);
      this.filterTerm = this.filterTerm.concat(char);
      let index = this._textItems.findIndex((value: string) => {
        return new RegExp(`^${this.filterTerm.toLowerCase()}`).test(value.trim().toLowerCase());
      });
      if (index !== -1) {
        if (this.activeIndex !== -1) {
          this._items.toArray()[this.activeIndex].active = false;
        }
        this.activeIndex = index;
        this._items.toArray()[this.activeIndex].active = true;
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

  private scrollToActive(): void {
    let container = this.overlay.overlayRef.overlayElement.querySelector('.dropdown-container');
    let item = this._items.toArray()[this.activeIndex];
    if (container && item) {
      container.scrollTop = item.element.nativeElement.offsetTop;
    }
  }
}

@Component({
  selector: 'item',
  template: '<ng-content></ng-content>',
  host: {
    '[class.disabled]': 'disabled',
    '[class.active]': 'active',
  },
})
export class NovoItemElement {
  @Input() public disabled: boolean;
  @Input() public keepOpen: boolean = false;
  @Output() public action: EventEmitter<any> = new EventEmitter();

  public active: boolean = false;

  constructor(private dropdown: NovoDropdownElement, public element: ElementRef) {}

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    // Poor man's disable
    if (!this.disabled) {
      // Close if keepOpen is false
      if (!this.keepOpen) {
        this.dropdown.closePanel();
      }
      // Emit the action
      this.action.emit({ originalEvent: event });
    }
  }
}

@Component({
  selector: 'list',
  template: '<ng-content></ng-content>',
})
export class NovoListElement implements AfterContentInit {
  @ContentChildren(NovoItemElement) public items: QueryList<NovoItemElement>;

  constructor(private dropdown: NovoDropdownElement) {}

  public ngAfterContentInit(): void {
    this.dropdown.items = this.items;
  }
}

@Component({
  selector: 'dropdown-item-header',
  template: '<ng-content></ng-content>',
})
export class NovoItemHeaderElement {}
