// NG
import { TestBed, waitForAsync } from '@angular/core/testing';
// App
import { NovoDropdownElement, NovoDropdownListElement, NovoItemElement } from './Dropdown';
import { NovoDropdownModule } from './Dropdown.module';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { ElementRef, EventEmitter, QueryList } from '@angular/core';
import { first, skip, toArray } from 'rxjs/operators';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, of } from 'rxjs';

class MockNovoOverlayTemplateComponent {
  openPanel() {}
  closePanel() {}
  panelOpen: boolean;
  overlayRef: {
    overlayElement: HTMLElement;
  };
}

class MockNovoDropdownElement {
  openPanel() {}
  closePanel() {}
  panelOpen: boolean;
  toggled: EventEmitter<boolean>;
  activeIndexObs: Observable<number>;
  constructor(testVal: number = 1) {
    this.toggled = new EventEmitter<boolean>();
    this.activeIndexObs = new Observable<number>(subscriber => {
      subscriber.next(testVal);
    });
  }
}

class MockKeyboardEvent {
  stopPropagation() {}
  preventDefault() {}
  keyCode: number;
  key: string;
}

describe('Elements: NovoDropdownElement', () => {
  let fixture;
  let component;
  let ref0: ElementRef;
  let ref1: ElementRef;
  let ref2: ElementRef;
  let items: QueryList<NovoItemElement>;
  let oe: HTMLElement;

  beforeAll(() => {
    let e0: HTMLDivElement = document.createElement('div');
    e0.innerText = 'ABCDE';
    ref0 = {
      nativeElement: e0,
    };
    let e1: HTMLDivElement = document.createElement('div');
    e1.innerText = 'FGHIJ';
    ref1 = {
      nativeElement: e1,
    };
    let e2: HTMLDivElement = document.createElement('div');
    e2.innerText = 'KLMNO';
    ref2 = {
      nativeElement: e2,
    };
    oe = document.createElement('div');
    oe.className = 'dropdown-container';
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDropdownElement],
      imports: [NovoDropdownModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDropdownElement);
    component = fixture.componentInstance;
    const item1 = new NovoItemElement(component, ref1);
    item1.submenuItems = ['submenu1', 'submenu2'];
    (item1 as any).submenu = new MockNovoDropdownElement();
    const itemsArray: NovoItemElement[] = [new NovoItemElement(component, ref0), item1, new NovoItemElement(component, ref2)];
    items = new QueryList<NovoItemElement>();
    items.reset(itemsArray);
    let overlay: MockNovoOverlayTemplateComponent = new MockNovoOverlayTemplateComponent();
    overlay.overlayRef = {overlayElement: oe};
    component.overlay = overlay;
  }));
  it('should initialize correctly.', () => {
    expect(component).toBeDefined();
  });

  describe('Function: ngOnInit', () => {
    it('should call updateItemIndices', () => {
      spyOn(component, 'updateItemIndices');
      component.ngOnInit();
      expect(component.updateItemIndices).toHaveBeenCalled();
    });
    it('should set an event listener on the button', () => {
      const button = document.createElement('button');
      spyOn(component, 'clickHandler');
      component.element.nativeElement.appendChild(button);
      component.ngOnInit();
      button.click();
      expect(component.clickHandler).toHaveBeenCalled();
    });
    it('should set a parent scroll element if parent scroll selector is defined', () => {
      component.parentScrollSelector = '.table-container';
      component.ngOnInit();
      expect(component.parentScrollElement).toBeDefined();
    });
  });

  describe('Function: ngOnDestroy', () => {
    it('should remove the event listener from the button', () => {
      const button = document.createElement('button');
      spyOn(component, 'clickHandler');
      component.element.nativeElement.appendChild(button);
      component.ngOnInit();
      component.ngOnDestroy();
      button.click();
      expect(component.clickHandler).not.toHaveBeenCalled();
    });
    it('should remove the event listener from the parent scroll element', () => {
      component.parentScrollElement = {removeEventListener(val1, val2) {}};
      component.parentScrollAction = 'close';
      spyOn(component.parentScrollElement, 'removeEventListener').and.stub();
      component.ngOnDestroy();
      expect(component.parentScrollElement.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('Function: set items', () => {
    beforeEach(() => {
      spyOn(component, 'updateItemIndices').and.stub();
      component.items = items;
    });
    it('should set _items', () => {
      expect(component._items).toEqual(items);
    });
    it('should set activeIndex to -1', () => {
      expect(component.activeIndex).toEqual(-1);
    });
    it('should set _textItems', () => {
      expect(component._textItems).toEqual(['ABCDE', 'FGHIJ', 'KLMNO']);
    });
    it('should call updateItemIndices', () => {
      expect(component.updateItemIndices).toHaveBeenCalled();
    });
  });

  describe('Function: get panelOpen', () => {
    it('should be false if there is no overlay', () => {
      component.overlay = null;
      expect(component.panelOpen).toBeFalsy();
    });
    it('should be false if overlay is not open', () => {
      component.overlay.panelOpen = false;
      expect(component.panelOpen).toBeFalsy();
    });
    it('should be true if overlay is open', () => {
      component.overlay.panelOpen = true;
      expect(component.panelOpen).toBeTruthy();
    });
  });

  describe('Function: updateItemIndices', () => {
    beforeEach(() => {
      component.items = items;
    });
    it('should set the first item index to 0', () => {
      expect(component._items.toArray()[0].index).toEqual(0);
    });
    it('should set the second item index to 1', () => {
      expect(component._items.toArray()[1].index).toEqual(1);
    });
  });

  describe('Function: set activeIndex', () => {
    beforeEach(() => {
      component.items = items;
      component.activeIndex = 0;
    });
    it('should set active index to active=true', () => {
      expect(component._items.toArray()[0].active).toBe(true);
    });
    it('should set _activeIndex', () => {
      expect(component._activeIndex).toEqual(0);
    });
    it('should set old active index to false when changed', () => {
      component.activeIndex = 1;
      expect(component._items.toArray()[0].active).toBe(false);
    });
    it('should emit initial value to activeIndexObs', (done) => {
      component.activeIndexObs.pipe(first()).subscribe((val: number) => {
        expect(val).toEqual(0);
        done();
      });
    });
    it('should emit new value to activeIndexObs', (done) => {
      component.activeIndexObs.pipe(skip(1)).subscribe((val: number) => {
        expect(val).toEqual(1);
        done();
      });
      component.activeIndex = 1;
    });
  });

  describe('Function: openPanel', () => {
    beforeEach(() => {
      spyOn(component.overlay, 'openPanel').and.stub();
      component.parentScrollElement = {
        addEventListener(val1, val2) {},
        removeEventListener(val1, val2) {}
      };
      component.parentScrollAction = 'close';
      spyOn(component.parentScrollElement, 'addEventListener').and.stub();
      spyOn(component.parentScrollElement, 'removeEventListener').and.stub();
    });
    it('should call openPanel on overlay', () => {
      component.openPanel();
      expect(component.overlay.openPanel).toHaveBeenCalled();
    });
    it('should add event listener to parent scroll element', () => {
      component.openPanel();
      expect(component.parentScrollElement.addEventListener).toHaveBeenCalled();
    });
    it('should emit toggled event true', (done) => {
      component.toggled.subscribe((val) => {
        expect(val).toBe(true);
        done();
      });
      component.openPanel();
    });
  });

  describe('Function: closePanel', () => {
    beforeEach(() => {
      component.items = items;
      spyOn(component.overlay, 'closePanel').and.stub();
      component.parentScrollElement = {
        addEventListener(val1, val2) {},
        removeEventListener(val1, val2) {}
      };
      component.parentScrollAction = 'close';
      spyOn(component.parentScrollElement, 'addEventListener').and.stub();
      spyOn(component.parentScrollElement, 'removeEventListener').and.stub();
    });
    it('should call closePanel on submenus', () => {
      spyOn(component._items.toArray()[1].submenu, 'closePanel').and.stub();
      component.closePanel();
      expect(component._items.toArray()[1].submenu.closePanel).toHaveBeenCalled();
    });
    it('should call closePanel on overlay', () => {
      component.closePanel();
      expect(component.overlay.closePanel).toHaveBeenCalled();
    });
    it('should remove event listener from parent scroll element', () => {
      component.closePanel();
      expect(component.parentScrollElement.removeEventListener).toHaveBeenCalled();
    });
    it('should set activeIndex to -1', () => {
      component.closePanel();
      expect(component._activeIndex).toEqual(-1);
    });
    it('should emit toggled event false', (done) => {
      component.toggled.subscribe((val) => {
        expect(val).toBe(false);
        done();
      });
      component.closePanel();
    });
  });

  describe('Function: togglePanel', () => {
    beforeEach(() => {
      spyOn(component, 'closePanel').and.stub();
      spyOn(component, 'openPanel').and.stub();
    });
    it('should close panel if the panel is open', () => {
      component.overlay.panelOpen = true;
      component.togglePanel();
      expect(component.closePanel).toHaveBeenCalled();
      expect(component.openPanel).not.toHaveBeenCalled();
    });
    it('should open panel if the panel is closed', () => {
      component.overlay.panelOpen = false;
      component.togglePanel();
      expect(component.closePanel).not.toHaveBeenCalled();
      expect(component.openPanel).toHaveBeenCalled();
    });
  });

  describe('Function: itemHasSubmenu', () => {
    beforeEach(() => {
      component.items = items;
    });
    it('should be false if activeIndex is -1', () => {
      component.activeIndex = -1;
      expect(component.itemHasSubmenu).toEqual(false);
    });
    it('should be false for item with no submenu items', () => {
      component.activeIndex = 0;
      expect(component.itemHasSubmenu).toEqual(false);
    });
    it('should be true for item with submenu items', () => {
      component.activeIndex = 1;
      expect(component.itemHasSubmenu).toEqual(true);
    });
  });

  describe('Function: navigatingSubmenu', () => {
    beforeEach(() => {
      component.items = items;
    });
    it('should be false if activeIndex is -1', () => {
      component.activeIndex = -1;
      expect(component.navigatingSubmenu).toEqual(false);
    });
    it('should be false for item with no submenu items', () => {
      component.activeIndex = 0;
      expect(component.navigatingSubmenu).toEqual(false);
    });
    it('should be false for item with submenu items if the panel is not open', () => {
      component._items.toArray()[1].submenu.panelOpen = false;
      component.activeIndex = 1;
      expect(component.navigatingSubmenu).toEqual(false);
    });
    it('should be true for item with submenu items if the panel is open', () => {
      component._items.toArray()[1].submenu.panelOpen = true;
      component.activeIndex = 1;
      expect(component.navigatingSubmenu).toEqual(true);
    });
  });

  describe('Function: moveDown', () => {
    beforeEach(() => {
      spyOn(component, 'scrollToActive').and.stub();
    });
    it(`shouldn't do anything if there are no items`, () => {
      component.moveDown(component);
      expect(component.scrollToActive).not.toHaveBeenCalled();
    });
    it('should move from index 0 to 1', () => {
       component._items = items;
       component.activeIndex = 0;
       component.moveDown(component);
       expect(component._activeIndex).toEqual(1);
    });
    it('should wrap around back to index 0 when moving past the end', () => {
      component.items = items;
      component.activeIndex = 2;
      component.moveDown(component);
      expect(component._activeIndex).toEqual(0);
    });
    it('should skip disabled indexes and wrap around', () => {
      items.toArray()[2].disabled = true;
      component.items = items;
      component.activeIndex = 1;
      component.moveDown(component);
      expect(component._activeIndex).toEqual(0);
    });
    it('should call scrollToActive', () => {
      component.items = items;
      component.moveDown(component);
      expect(component.scrollToActive).toHaveBeenCalled();
    });
  });

  describe('Function: moveUp', () => {
    beforeEach(() => {
      spyOn(component, 'scrollToActive').and.stub();
    });
    it(`shouldn't do anything if there are no items`, () => {
      component.moveUp(component);
      expect(component.scrollToActive).not.toHaveBeenCalled();
    });
    it('should move from index 0 to 1', () => {
       component._items = items;
       component.activeIndex = 2;
       component.moveUp(component);
       expect(component._activeIndex).toEqual(1);
    });
    it('should wrap around back to index 0 when moving past the end', () => {
      component.items = items;
      component.activeIndex = 0;
      component.moveUp(component);
      expect(component._activeIndex).toEqual(2);
    });
    it('should skip disabled indexes and wrap around', () => {
      items.toArray()[0].disabled = true;
      component.items = items;
      component.activeIndex = 1;
      component.moveUp(component);
      expect(component._activeIndex).toEqual(2);
    });
    it('should call scrollToActive', () => {
      component.items = items;
      component.moveUp(component);
      expect(component.scrollToActive).toHaveBeenCalled();
    });
  });

  describe('Function: pressEnter', () => {
    beforeEach(() => {
      component.items = items;
      component.activeIndex = 0;
    });
    it('should call item.onClick()', () => {
      spyOn(component._items.toArray()[0], 'onClick').and.stub();
      component.pressEnter(component, {keyCode: KeyCodes.ENTER});
      expect(component._items.toArray()[0].onClick).toHaveBeenCalled();
    });
    it('should not call item.onClick() for different items', () => {
      spyOn(component._items.toArray()[1], 'onClick').and.stub();
      component.pressEnter(component, {keyCode: KeyCodes.ENTER});
      expect(component._items.toArray()[1].onClick).not.toHaveBeenCalled();
    });
  });

  describe('Function: onKeyDown', () => {
    let keyEvent: MockKeyboardEvent;
    beforeEach(() => {
      keyEvent = new MockKeyboardEvent();
      spyOn(component, 'scrollToActive').and.stub();
    });
    it('should close the panel if you press escape', () => {
      component.overlay.panelOpen = true;
      spyOn(component, 'closePanel').and.stub();
      keyEvent.keyCode = KeyCodes.ESC;
      component.onKeyDown(keyEvent);
      expect(component.closePanel).toHaveBeenCalled();
    });
    it('should press enter on the submenu if navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = true;
      component.activeIndex = 1;
      spyOn(component, 'pressEnter').and.stub();
      keyEvent.keyCode = KeyCodes.ENTER;
      component.onKeyDown(keyEvent);
      expect(component.pressEnter).toHaveBeenCalledWith(component._items.toArray()[1].submenu, keyEvent);
    });
    it('should not press enter on the submenu if not navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = false;
      component.activeIndex = 1;
      spyOn(component, 'pressEnter').and.stub();
      keyEvent.keyCode = KeyCodes.ENTER;
      component.onKeyDown(keyEvent);
      expect(component.pressEnter).not.toHaveBeenCalledWith(component._items.toArray()[1].submenu, keyEvent);
    });
    it('should call pressEnter when enter is pressed', () => {
      component.items = items;
      component.activeIndex = 2;
      spyOn(component, 'pressEnter').and.stub();
      keyEvent.keyCode = KeyCodes.ENTER;
      component.onKeyDown(keyEvent);
      expect(component.pressEnter).toHaveBeenCalledWith(component, keyEvent);
    });
    it('should call moveDown on the submenu if navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = true;
      component.activeIndex = 1;
      spyOn(component, 'moveDown').and.stub();
      keyEvent.keyCode = KeyCodes.DOWN;
      component.onKeyDown(keyEvent);
      expect(component.moveDown).toHaveBeenCalledWith(component._items.toArray()[1].submenu);
    });
    it('should not call moveDown on the submenu if not navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = false;
      component.activeIndex = 1;
      spyOn(component, 'moveDown').and.stub();
      keyEvent.keyCode = KeyCodes.DOWN;
      component.onKeyDown(keyEvent);
      expect(component.moveDown).not.toHaveBeenCalledWith(component._items.toArray()[1].submenu);
    });
    it('should call moveDown when down is pressed', () => {
      component.items = items;
      component.activeIndex = 2;
      spyOn(component, 'moveDown').and.stub();
      keyEvent.keyCode = KeyCodes.DOWN;
      component.onKeyDown(keyEvent);
      expect(component.moveDown).toHaveBeenCalledWith(component);
    });
    it('should call moveUp on the submenu if navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = true;
      component.activeIndex = 1;
      spyOn(component, 'moveUp').and.stub();
      keyEvent.keyCode = KeyCodes.UP;
      component.onKeyDown(keyEvent);
      expect(component.moveUp).toHaveBeenCalledWith(component._items.toArray()[1].submenu);
    });
    it('should not call moveUp on the submenu if not navigating submenu', () => {
      component.items = items;
      component._items.toArray()[1].submenu.panelOpen = false;
      component.activeIndex = 1;
      spyOn(component, 'moveUp').and.stub();
      keyEvent.keyCode = KeyCodes.UP;
      component.onKeyDown(keyEvent);
      expect(component.moveUp).not.toHaveBeenCalledWith(component._items.toArray()[1].submenu);
    });
    it('should call moveUp when down is pressed', () => {
      component.items = items;
      component.activeIndex = 2;
      spyOn(component, 'moveUp').and.stub();
      keyEvent.keyCode = KeyCodes.UP;
      component.onKeyDown(keyEvent);
      expect(component.moveUp).toHaveBeenCalledWith(component);
    });
    it('should open a submenu when right is pressed', () => {
      component.items = items;
      component.activeIndex = 1;
      spyOn(component._items.toArray()[1].submenu, 'openPanel').and.stub();
      keyEvent.keyCode = KeyCodes.RIGHT;
      component.onKeyDown(keyEvent);
      expect(component._items.toArray()[1].submenu.openPanel).toHaveBeenCalled();
    });
    it('should set the active index of the submenu to 0', () => {
      component.items = items;
      component.activeIndex = 1;
      spyOn(component._items.toArray()[1].submenu, 'openPanel').and.stub();
      keyEvent.keyCode = KeyCodes.RIGHT;
      component.onKeyDown(keyEvent);
      expect(component._items.toArray()[1].submenu.activeIndex).toEqual(0);
    });
    it('should close a submenu when left is pressed', () => {
      component.items = items;
      component.activeIndex = 1;
      spyOn(component._items.toArray()[1].submenu, 'closePanel').and.stub();
      keyEvent.keyCode = KeyCodes.LEFT;
      component.onKeyDown(keyEvent);
      expect(component._items.toArray()[1].submenu.closePanel).toHaveBeenCalled();
    });
    it('should set filterTermTimeout when an alphanumeric or space key is pressed', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      expect(component.filterTermTimeout).toBeDefined();
    });
    it('should set filterTerm based on the alphanumeric key pressed', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      expect(component.filterTerm).toEqual('A');
    });
    it('should activate a matching list item based on alphanumeric keys pressed', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      expect(component._activeIndex).toEqual(0);
    });
    it('should call scrollToActive() based on alphanumeric keys pressed', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      expect(component.scrollToActive).toHaveBeenCalled;
    });
    it('should keep a matching list item active based on alphanumeric keys pressed even if the next key doesn\'t match', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      keyEvent.keyCode = KeyCodes.ONE;
      keyEvent.key = '1';
      component.onKeyDown(keyEvent);
      expect(component._activeIndex).toEqual(0);
    });
    it('should clear out the filter term 2000 ms after an alphanumeric key is pressed', (done) => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      setTimeout(() => {
        expect(component.filterTerm).toEqual('');
        done();
      }, 2001);
    });
    it('should not activate a list item if nothing matches', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.SPACE;
      keyEvent.key = ' ';
      component.onKeyDown(keyEvent);
      expect(component._activeIndex).toEqual(-1);
    });
    it('should remove the last character from the filter term when delete or backspace is pressed', () => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      keyEvent.keyCode = KeyCodes.NUM_NINE;
      keyEvent.key = '9';
      component.onKeyDown(keyEvent);
      keyEvent.keyCode = KeyCodes.BACKSPACE;
      keyEvent.key = null;
      component.onKeyDown(keyEvent);
      expect(component.filterTerm).toEqual('A');
    });
    it('should clear out the filter term 2000 ms after the delete or backspace key is pressed', (done) => {
      component.items = items;
      component.activeIndex = -1;
      keyEvent.keyCode = KeyCodes.A;
      keyEvent.key = 'A';
      component.onKeyDown(keyEvent);
      keyEvent.keyCode = KeyCodes.DELETE;
      keyEvent.key = null;
      component.onKeyDown(keyEvent);
      setTimeout(() => {
        expect(component.filterTerm).toEqual('');
        done();
      }, 2001);
    });
  });

  describe('Function: onOverlayKeyDown', () => {
    it('should call closePanel() when escape is pushed', () => {
      let keyEvent = new MockKeyboardEvent();
      keyEvent.keyCode = KeyCodes.ESC;
      spyOn(component, 'closePanel').and.stub();
      component.onOverlayKeyDown(keyEvent);
      expect(component.closePanel).toHaveBeenCalled();
    });

    it('should call closePanel() when enter is pushed', () => {
      let keyEvent = new MockKeyboardEvent();
      keyEvent.keyCode = KeyCodes.ENTER;
      spyOn(component, 'closePanel').and.stub();
      component.onOverlayKeyDown(keyEvent);
      expect(component.closePanel).toHaveBeenCalled();
    });
  });

  describe('Function: scrollToActive', () => {
    let obj: {scrollTop; offsetTop?};
    beforeEach(() => {
      component.items = items;
      obj = {scrollTop: undefined};
      spyOn(component.overlay.overlayRef.overlayElement, 'querySelector').and.returnValue(obj);
      component.activeIndex = 1;
      component.scrollToActive();
    });
    it('should call overlay.overlayRef.overlayElement.querySelector', () => {
      expect(component.overlay.overlayRef.overlayElement.querySelector).toHaveBeenCalled();
    });
  });
});

describe('Elements: NovoItemElement', () => {
  let fixture;
  let component;
  let dropdown: MockNovoDropdownElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemElement],
      providers: [{ provide: NovoDropdownElement, useClass: NovoDropdownElement }],
      imports: [NovoDropdownModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemElement);
    component = fixture.componentInstance;
    dropdown = new MockNovoDropdownElement();
    component.dropdown = dropdown;
    component.index = 0;
  }));
  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });
  it('should start as not active', () => {
    expect(component._active).toEqual(false);
  });
  it('should start as not submenuIsOpen', () => {
    expect(component.submenuIsOpen).toEqual(false);
  });

  describe('Function: set active()', () => {
    it('should set _active', () => {
      component.active = true;
      expect(component._active).toEqual(true);
    });
    it('should emit first value to _active$', (done) => {
      component._active$.pipe(first()).subscribe((val: number) => {
        expect(val).toEqual(false);
        done();
      });
    });
    it('should emit new value to _active$', (done) => {
      component._active$.pipe(skip(1)).subscribe((val: number) => {
        expect(val).toEqual(true);
        done();
      });
      component.active = true;
    });
  });

  describe('Function: get active()', () => {
    it('should return _active', () => {
      component._active = true;
      expect(component.active).toEqual(true);
    });
  });

  describe('Function: ngAfterViewInit()', () => {
    let submenu;
    beforeEach(() => {
      submenu = new MockNovoDropdownElement();
    });
    it('should do nothing if there is no submenu', () => {
      component.ngAfterViewInit();
      expect(component.submenu).toBeUndefined();
    });
    it('should subscribe submenuIsOpened to submenu.toggled', () => {
      component.submenu = submenu;
      component.ngAfterViewInit();
      component.submenu.toggled.emit(true);
      expect(component.submenuIsOpen).toEqual(true);
    });
    it('should close submenu panel if the active index isn\'t this item\'s index or -1', () => {
      let testDropdown = new MockNovoDropdownElement(1);
      component.dropdown = testDropdown;
      spyOn(submenu, 'closePanel').and.stub();
      spyOn(submenu, 'openPanel').and.stub();
      component.submenu = submenu;
      component.ngAfterViewInit();
      expect(submenu.closePanel).toHaveBeenCalled();
    });
    it('should open submenu panel if the active index is this item\'s index', () => {
      let testDropdown = new MockNovoDropdownElement(0);
      component.dropdown = testDropdown;
      spyOn(submenu, 'closePanel').and.stub();
      spyOn(submenu, 'openPanel').and.stub();
      component.submenu = submenu;
      component.ngAfterViewInit();
      expect(submenu.openPanel).toHaveBeenCalled();
    });
    it('should neither open nor close submenu panel if the active index is -1', () => {
      let testDropdown = new MockNovoDropdownElement(-1);
      component.dropdown = testDropdown;
      spyOn(submenu, 'closePanel').and.stub();
      spyOn(submenu, 'openPanel').and.stub();
      component.submenu = submenu;
      component.ngAfterViewInit();
      expect(submenu.closePanel).not.toHaveBeenCalled();
      expect(submenu.openPanel).not.toHaveBeenCalled();
    });
  });

  describe('Function: onClick()', () => {
    beforeEach(() => {
      spyOn(component.dropdown, 'closePanel');
    });
    it('should do nothing if the item is disabled', () => {
      component.submenu = new MockNovoDropdownElement();
      spyOn(component.submenu, 'openPanel');
      component.disabled = true;
      component.onClick({});
      expect(component.submenu.openPanel).not.toHaveBeenCalled();
      expect(component.dropdown.closePanel).not.toHaveBeenCalled();
    });
    it('should close the panel if there is no submenu', () => {
      component.disabled = false;
      component.onClick({});
      expect(component.dropdown.closePanel).toHaveBeenCalled();
    });
    it('should not close the panel if keepOpen is set to True', () => {
      component.disabled = false;
      component.keepOpen = true;
      component.onClick({});
      expect(component.dropdown.closePanel).not.toHaveBeenCalled();
    });
    it('should not close the panel if there is a submenu', () => {
      component.submenu = new MockNovoDropdownElement();
      component.submenuItems = ['ABCDE'];
      component.disabled = false;
      component.onClick({});
      expect(component.dropdown.closePanel).not.toHaveBeenCalled();
    });
    it('should open the submenu if there is one', () => {
      component.submenu = new MockNovoDropdownElement();
      component.submenuItems = ['ABCDE'];
      spyOn(component.submenu, 'openPanel');
      component.disabled = false;
      component.onClick({});
      expect(component.submenu.openPanel).toHaveBeenCalled();
    });
    it('should emit the event to action', (done) => {
      component.disabled = false;
      component.action.subscribe(val => {
        expect(val).toEqual({originalEvent: {}});
        done();
      });
      component.onClick({});
    });
  });

  describe('Function: hasSubmenu()', () => {
    it('should be false if the item has no submenu items', () => {
      expect(component.hasSubmenu()).toBe(false);
    });
    it('should be true if the item has submenu items', () => {
      component.submenuItems = ['ABCDE'];
      expect(component.hasSubmenu()).toBe(true);
    });
  });

  describe('Function: mouseEnter()', () => {
    it('should set the parent dropdown\'s active index', () => {
      component.mouseEnter();
      expect(component.dropdown.activeIndex).toEqual(0);
    });
  });

  describe('Function: submenuClicked()', () => {
    it('should emit the item clicked', (done) => {
      component.onSubmenuClick.subscribe((val) => {
        expect(val).toEqual('ABCDE');
        done();
      });
      component.submenuClicked('ABCDE');
    });
  });
});

describe('Elements: NovoDropdownListElement', () => {
  let fixture;
  let component;
  let dropdown: MockNovoDropdownElement;
  let items: QueryList<NovoItemElement>;
  let ref0: ElementRef;
  let ref1: ElementRef;
  beforeAll(() => {
    let e0: HTMLDivElement = document.createElement('div');
    e0.innerText = 'ABCDE';
    ref0 = {
      nativeElement: e0,
    };
    let e1: HTMLDivElement = document.createElement('div');
    e1.innerText = 'FGHIJ';
    ref1 = {
      nativeElement: e1,
    };
    items = new QueryList<NovoItemElement>();
  });
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDropdownListElement],
      providers: [{ provide: NovoDropdownElement, useClass: NovoDropdownElement }],
      imports: [NovoDropdownModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDropdownListElement);
    component = fixture.componentInstance;
    dropdown = new MockNovoDropdownElement();
    component.dropdown = dropdown;
    const itemsArray: NovoItemElement[] = [new NovoItemElement(component.dropdown, ref0), new NovoItemElement(component.dropdown, ref1)];
    items.reset(itemsArray);
    component.items = items;
  }));
  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Function: ngAfterContentInit', () => {
    it('should set dropdown.items based on items field', () => {
      component.ngAfterContentInit();
      expect(component.dropdown.items).toEqual(items);
    });
    it('should subscribe dropdown.items to changes on items field', () => {
      component.ngAfterContentInit();
      items.reset([]);
      expect(component.dropdown.items).toEqual(items);
    });
  });
});
