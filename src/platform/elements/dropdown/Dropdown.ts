// NG2
import {
  Component,
  ElementRef,
  ChangeDetectorRef,
  EventEmitter,
  OnInit,
  AfterContentInit,
  OnDestroy,
  Input,
  Output,
  ViewChild,
  DoCheck,
  Renderer2,
  HostListener,
  ContentChildren,
  QueryList,
} from '@angular/core';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';

@Component({
  selector: 'novo-dropdown-container',
  template: '<ng-content></ng-content>',
})
export class NovoDropdownContainer implements DoCheck {
  private position: ClientRect;
  private isVisible: boolean;
  private relativeElement: Element;
  private scrollHandler: any;
  private side: string;
  private appendToBody: boolean;
  public parent: NovoDropdownElement;

  constructor(public element: ElementRef, private renderer: Renderer2, private ref: ChangeDetectorRef) {
    this.scrollHandler = this.handleScroll.bind(this);
  }

  ngDoCheck() {
    if (this.isVisible && this.position) {
      const element = this.element.nativeElement;
      const position = Helpers.calcPositionOffset(this.position, element, this.side);
      if (position) {
        this.renderer.setStyle(element, 'top', position.top);
        this.renderer.setStyle(element, 'left', position.left);
      }
    }
  }

  private handleScroll(): void {
    // On scroll, don't force the position to update (jump from top/middle/bottom/right)
    this.updatePosition(this.relativeElement, this.side);
  }

  public show(appendToBody: boolean): void {
    this.appendToBody = appendToBody;
    this.renderer.setStyle(this.element.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    this.isVisible = true;
    if (appendToBody) {
      window.addEventListener('scroll', this.scrollHandler);
    }
    this.ref.markForCheck();
  }

  public hide(): void {
    this.isVisible = false;
    this.renderer.setStyle(this.element.nativeElement, 'visibility', 'hidden');
    if (this.appendToBody) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    this.ref.markForCheck();
  }

  public updatePosition(element: Element, side: string): void {
    this.relativeElement = element;
    this.side = side;
    this.position = element.getBoundingClientRect();
    this.ngDoCheck();
    this.ref.markForCheck();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    // Close with ESC/Enter
    if (this.isVisible && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
      this.parent.toggleActive(null, false);
    }
  }
}

@Component({
  selector: 'novo-dropdown',
  template: `
        <ng-content select="button" #trigger></ng-content>
        <novo-dropdown-container class="dropdown-container {{ containerClass }}">
            <ng-content></ng-content>
        </novo-dropdown-container>
    `,
})
export class NovoDropdownElement extends OutsideClick implements OnInit, OnDestroy {
  // Append the dropdown container to the body
  @Input() appendToBody: boolean = false;
  // Listen for scroll on a parent selector, so we can close the dropdown
  @Input() parentScrollSelector: string;
  // What action to perform when we recieve scroll from parent selector
  // TODO - handle "move"
  @Input() parentScrollAction: string = 'close';
  // Custom class for the dropdown container
  @Input() containerClass: string;
  // Side the dropdown will open
  @Input() side: string = 'left';
  // Output for when the dropdown is toggled
  @Output() toggled: EventEmitter<boolean>;

  @ViewChild(NovoDropdownContainer) public container: NovoDropdownContainer;
  @ViewChild('trigger') public button;

  clickHandler: any;
  closeHandler: any;
  parentScrollElement: Element;
  private _items: QueryList<NovoItemElement>;
  private _textItems: string[];
  private activeIndex: number = -1;
  private filterTerm: string = '';
  private filterTermTimeout: any;

  constructor(element: ElementRef, private ref: ChangeDetectorRef) {
    super(element);
    // Click handler
    this.clickHandler = this.toggleActive.bind(this);
    this.closeHandler = this.toggleActive.bind(this);
    this.toggled = this.onActiveChange;
    // Listen for active change to hide/show menu
    this.onActiveChange.subscribe((active) => {
      if (active) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  public set items(items: QueryList<NovoItemElement>) {
    this._items = items;
    // Get the innertext of all the items to allow for searching
    this._textItems = items.map((item: NovoItemElement) => {
      return item.element.nativeElement.innerText;
    });
  }

  public ngOnInit(): void {
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
  }

  private show(): void {
    this.container.parent = this;
    this.container.show(this.appendToBody);
    this.otherElement = this.container.element;
    if (this.appendToBody) {
      this.container.updatePosition(this.element.nativeElement.children[0], this.side);
      // If append to body then rip it out of here and put on body
      window.document.body.appendChild(this.container.element.nativeElement);
      window.addEventListener('resize', this.closeHandler);
    }
    // Listen for scroll on a parent to force close
    if (this.parentScrollElement) {
      if (this.parentScrollAction === 'close') {
        this.parentScrollElement.addEventListener('scroll', this.closeHandler);
      }
    }
    this.ref.markForCheck();
  }

  private hide(): void {
    this.container.hide();
    // If append to body then rip it out of here and put on body
    if (this.appendToBody) {
      let elm = this.container.element.nativeElement;
      elm.parentNode.removeChild(elm);
      window.removeEventListener('resize', this.closeHandler);
    }
    if (this.parentScrollElement) {
      if (this.parentScrollAction === 'close') {
        this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
      }
    }
    // Clear active index
    if (this.activeIndex !== -1) {
      this._items.toArray()[this.activeIndex].active = false;
    }
    this.activeIndex = -1;
    this.ref.markForCheck();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    Helpers.swallowEvent(event);

    if (this.active && event.keyCode === KeyCodes.ESC) {
      // active & esc hit -- close
      this.toggleActive();
    } else if (event.keyCode === KeyCodes.ENTER) {
      // enter -- perform the "click"
      this._items.toArray()[this.activeIndex].onClick();
    } else if (event.keyCode === KeyCodes.DOWN) {
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
      // backspace, delete -- remove partial filters
      clearTimeout(this.filterTermTimeout);
      this.filterTermTimeout = setTimeout(() => {
        this.filterTerm = '';
      }, 2000);
      this.filterTerm = this.filterTerm.slice(0, -1);
    }
  }

  private scrollToActive(): void {
    let container = this.element.nativeElement.querySelector('novo-dropdown-container');
    let item = this._items.toArray()[this.activeIndex];
    if (container && item) {
      container.scrollTop = item.element.nativeElement.offsetTop;
    } else {
      // Append to body
      container = document.querySelector('body > novo-dropdown-container');
      if (container && item) {
        container.scrollTop = item.element.nativeElement.offsetTop;
      }
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
  public onClick(): void {
    // Poor man's disable
    if (!this.disabled) {
      // Close if keepOpen is false
      if (!this.keepOpen) {
        this.dropdown.toggleActive();
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
