import * as i0 from '@angular/core';
import { model, input, signal, computed, effect, HostBinding, HostListener, ViewEncapsulation, ChangeDetectionStrategy, Component, InjectionToken, Inject, EventEmitter, DOCUMENT, Output, Input, Optional, QueryList, ViewChild, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1$2 from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/cdk/overlay';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject, fromEvent, merge } from 'rxjs';
import { filter, map, mapTo, takeUntil, distinctUntilChanged, take, startWith, debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1$1 from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i2 from '@angular/cdk/platform';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * Animation that grows/shrinks the panel width between its expanded and collapsed (icon-rail) sizes.
 * Width is animated rather than transform because the panel shrinks in place rather than sliding away.
 */
const novoCollapsibleNavAnimations = {
    expandCollapse: trigger('expandCollapse', [
        state('expanded', style({ width: '{{ expandedWidth }}' }), { params: { expandedWidth: '18rem' } }),
        state('collapsed', style({ width: '{{ collapsedWidth }}' }), { params: { collapsedWidth: '4rem' } }),
        transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
};

/**
 * A slide-out navigation panel that expands to a full-width panel or collapses to a narrow icon rail.
 * Generic building block: consumers project their own header, body, and footer content.
 */
class NovoCollapsibleNavComponent {
    constructor() {
        /** Whether the panel is collapsed to the icon rail. Two-way bindable via `[(collapsed)]`. */
        this.collapsed = model(false, ...(ngDevMode ? [{ debugName: "collapsed" }] : []));
        /** Width of the panel when expanded. */
        this.expandedWidth = input('18rem', ...(ngDevMode ? [{ debugName: "expandedWidth" }] : []));
        /** Width of the panel when collapsed to the icon rail. */
        this.collapsedWidth = input('4rem', ...(ngDevMode ? [{ debugName: "collapsedWidth" }] : []));
        /** When true, hovering a collapsed panel temporarily expands it as an overlay without affecting layout. */
        this.overlayOnHover = input(false, ...(ngDevMode ? [{ debugName: "overlayOnHover" }] : []));
        this.isHovered = signal(false, ...(ngDevMode ? [{ debugName: "isHovered" }] : []));
        this.effectiveCollapsed = computed(() => this.collapsed() && !(this.overlayOnHover() && this.isHovered()), ...(ngDevMode ? [{ debugName: "effectiveCollapsed" }] : []));
        effect(() => {
            if (this.collapsed()) {
                this.isHovered.set(false);
            }
        });
    }
    onMouseEnter() {
        this.isHovered.set(true);
    }
    onMouseLeave() {
        this.isHovered.set(false);
    }
    get expandCollapseState() {
        return {
            value: this.effectiveCollapsed() ? 'collapsed' : 'expanded',
            params: { expandedWidth: this.expandedWidth(), collapsedWidth: this.collapsedWidth() },
        };
    }
    get isCollapsed() {
        return this.effectiveCollapsed();
    }
    toggle() {
        this.collapsed.update((collapsed) => !collapsed);
    }
    expand() {
        this.collapsed.set(false);
    }
    collapse() {
        this.collapsed.set(true);
        this.isHovered.set(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoCollapsibleNavComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.19", type: NovoCollapsibleNavComponent, isStandalone: false, selector: "novo-collapsible-nav", inputs: { collapsed: { classPropertyName: "collapsed", publicName: "collapsed", isSignal: true, isRequired: false, transformFunction: null }, expandedWidth: { classPropertyName: "expandedWidth", publicName: "expandedWidth", isSignal: true, isRequired: false, transformFunction: null }, collapsedWidth: { classPropertyName: "collapsedWidth", publicName: "collapsedWidth", isSignal: true, isRequired: false, transformFunction: null }, overlayOnHover: { classPropertyName: "overlayOnHover", publicName: "overlayOnHover", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { collapsed: "collapsedChange" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "@expandCollapse": "this.expandCollapseState", "class.novo-collapsible-nav-collapsed": "this.isCollapsed" }, classAttribute: "novo-collapsible-nav" }, exportAs: ["novoCollapsibleNav"], ngImport: i0, template: "<div class=\"novo-collapsible-nav-header\">\n  <ng-content select=\"[novo-collapsible-nav-header]\"></ng-content>\n</div>\n<div class=\"novo-collapsible-nav-body\">\n  <ng-content select=\"[novo-collapsible-nav-body]\"></ng-content>\n</div>\n<div class=\"novo-collapsible-nav-footer\">\n  <ng-content select=\"[novo-collapsible-nav-footer]\"></ng-content>\n</div>\n", styles: [".novo-collapsible-nav{display:flex;flex-direction:column;height:100%;overflow:hidden;background:var(--background-bright)}.novo-collapsible-nav .novo-collapsible-nav-header{flex:0 0 auto}.novo-collapsible-nav .novo-collapsible-nav-body{flex:1 1 auto;overflow:hidden auto}.novo-collapsible-nav .novo-collapsible-nav-footer{flex:0 0 auto}\n"], animations: [novoCollapsibleNavAnimations.expandCollapse], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoCollapsibleNavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-collapsible-nav', exportAs: 'novoCollapsibleNav', animations: [novoCollapsibleNavAnimations.expandCollapse], host: {
                        class: 'novo-collapsible-nav',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: false, template: "<div class=\"novo-collapsible-nav-header\">\n  <ng-content select=\"[novo-collapsible-nav-header]\"></ng-content>\n</div>\n<div class=\"novo-collapsible-nav-body\">\n  <ng-content select=\"[novo-collapsible-nav-body]\"></ng-content>\n</div>\n<div class=\"novo-collapsible-nav-footer\">\n  <ng-content select=\"[novo-collapsible-nav-footer]\"></ng-content>\n</div>\n", styles: [".novo-collapsible-nav{display:flex;flex-direction:column;height:100%;overflow:hidden;background:var(--background-bright)}.novo-collapsible-nav .novo-collapsible-nav-header{flex:0 0 auto}.novo-collapsible-nav .novo-collapsible-nav-body{flex:1 1 auto;overflow:hidden auto}.novo-collapsible-nav .novo-collapsible-nav-footer{flex:0 0 auto}\n"] }]
        }], ctorParameters: () => [], propDecorators: { collapsed: [{ type: i0.Input, args: [{ isSignal: true, alias: "collapsed", required: false }] }, { type: i0.Output, args: ["collapsedChange"] }], expandedWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "expandedWidth", required: false }] }], collapsedWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "collapsedWidth", required: false }] }], overlayOnHover: [{ type: i0.Input, args: [{ isSignal: true, alias: "overlayOnHover", required: false }] }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], expandCollapseState: [{
                type: HostBinding,
                args: ['@expandCollapse']
            }], isCollapsed: [{
                type: HostBinding,
                args: ['class.novo-collapsible-nav-collapsed']
            }] } });

/**
 * Throws an exception when two NovoSidenav are matching the same position.
 * @docs-private
 */
function throwNovoDuplicatedSidenavError(position) {
    throw Error(`A drawer was already declared for 'position="${position}"'`);
}
/** Configures whether drawers should use auto sizing by default. */
const NOVO_LAYOUT_DEFAULT_AUTOSIZE = new InjectionToken('NOVO_LAYOUT_DEFAULT_AUTOSIZE', {
    providedIn: 'root',
    factory: NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY,
});
/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
const NOVO_LAYOUT_CONTAINER = new InjectionToken('NOVO_LAYOUT_CONTAINER');
/** @docs-private */
function NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY() {
    return false;
}

class NovoLayoutContent extends CdkScrollable {
    constructor(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone, destroyRef) {
        super(elementRef, scrollDispatcher, ngZone);
        this._changeDetectorRef = _changeDetectorRef;
        this._container = _container;
        this.destroyRef = destroyRef;
    }
    ngAfterContentInit() {
        this._container._contentMarginChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutContent, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_LAYOUT_CONTAINER }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.NgZone }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoLayoutContent, isStandalone: false, selector: "novo-layout-content", host: { classAttribute: "novo-layout-content" }, exportAs: ["novoLayoutContent"], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-layout-content',
                    exportAs: 'novoLayoutContent',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'novo-layout-content',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_LAYOUT_CONTAINER]
                }] }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.NgZone }, { type: i0.DestroyRef }] });

class NovoRailComponent extends CdkScrollable {
    constructor(elementRef, scrollDispatcher, ngZone) {
        super(elementRef, scrollDispatcher, ngZone);
    }
    ngAfterContentInit() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRailComponent, deps: [{ token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoRailComponent, isStandalone: false, selector: "novo-rail", host: { classAttribute: "novo-rail" }, usesInheritance: true, ngImport: i0, template: `
    <div class="novo-rail-contents">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRailComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-rail',
                    template: `
    <div class="novo-rail-contents">
      <ng-content></ng-content>
    </div>
  `,
                    host: {
                        class: 'novo-rail',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.NgZone }] });

/**
 * Animations used by the Material drawers.
 * @docs-private
 */
const novoSidenavAnimations = {
    /** Animation that slides a drawer in and out. */
    transformDrawer: trigger('transform', [
        // We remove the `transform` here completely, rather than setting it to zero, because:
        // 1. Having a transform can cause elements with ripples or an animated
        //    transform to shift around in Chrome with an RTL layout (see #10023).
        // 2. 3d transforms causes text to appear blurry on IE and Edge.
        state('open, open-instant', style({
            transform: 'none',
            visibility: 'visible',
        })),
        state('void', style({
            // Avoids the shadow showing up when closed in SSR.
            'box-shadow': 'none',
            visibility: 'hidden',
        })),
        transition('void => open-instant', animate('0ms')),
        transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
};

class NovoSidenavComponent {
    /** Whether the sidenav is fixed in the viewport. */
    get fixedInViewport() {
        return this._fixedInViewport;
    }
    set fixedInViewport(value) {
        this._fixedInViewport = coerceBooleanProperty(value);
    }
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     */
    get fixedTopGap() {
        return this._fixedTopGap;
    }
    set fixedTopGap(value) {
        this._fixedTopGap = coerceNumberProperty(value);
    }
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     */
    get fixedBottomGap() {
        return this._fixedBottomGap;
    }
    set fixedBottomGap(value) {
        this._fixedBottomGap = coerceNumberProperty(value);
    }
    /** The side that the drawer is attached to. */
    get position() {
        return this._position;
    }
    set position(value) {
        // Make sure we have a valid value.
        value = value === 'end' ? 'end' : 'start';
        if (value !== this._position) {
            this._position = value;
            this.onPositionChanged.emit();
        }
    }
    /** Mode of the drawer; one of 'over', 'push' or 'side'. */
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this._updateFocusTrapState();
        this._modeChanged.next();
    }
    /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
    get disableClose() {
        return this._disableClose;
    }
    set disableClose(value) {
        this._disableClose = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer should focus the first focusable element automatically when opened.
     * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
     * enabled, focus will be moved into the sidenav in `side` mode as well.
     */
    get autoFocus() {
        const value = this._autoFocus;
        // Note that usually we disable auto focusing in `side` mode, because we don't know how the
        // sidenav is being used, but in some cases it still makes sense to do it. If the consumer
        // explicitly enabled `autoFocus`, we take it as them always wanting to enable it.
        return value == null ? this.mode !== 'side' : value;
    }
    set autoFocus(value) {
        this._autoFocus = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    get opened() {
        return this._opened;
    }
    set opened(value) {
        this.toggle(coerceBooleanProperty(value));
    }
    constructor(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc, _container) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._doc = _doc;
        this._container = _container;
        this._fixedInViewport = false;
        this._fixedTopGap = 0;
        this._fixedBottomGap = 0;
        this._elementFocusedBeforeDrawerWasOpened = null;
        /** Whether the drawer is initialized. Used for disabling the initial animation. */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        this._opened = false;
        /** Emits whenever the drawer has started animating. */
        this._animationStarted = new Subject();
        /** Emits whenever the drawer is done animating. */
        this._animationEnd = new Subject();
        /** Current state of the sidenav animation. */
        // @HostBinding is used in the class as it is expected to be extended.  Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        this._animationState = 'void';
        /** Event emitted when the drawer open state is changed. */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new EventEmitter(/* isAsync */ true);
        /** Event emitted when the drawer has been opened. */
        this._openedStream = this.openedChange.pipe(filter((o) => o), map(() => { }));
        /** Event emitted when the drawer has started opening. */
        this.openedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState.indexOf('open') === 0), mapTo(undefined));
        /** Event emitted when the drawer has been closed. */
        this._closedStream = this.openedChange.pipe(filter((o) => !o), map(() => { }));
        /** Event emitted when the drawer has started closing. */
        this.closedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState === 'void'), mapTo(undefined));
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Event emitted when the drawer's position changes. */
        this.onPositionChanged = new EventEmitter();
        /**
         * An observable that emits when the drawer mode changes. This is used by the drawer container to
         * to know when to when the mode changes so it can adapt the margins on the content.
         */
        this._modeChanged = new Subject();
        this.openedChange.subscribe((opened) => {
            if (opened) {
                if (this._doc) {
                    this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement;
                }
                this._takeFocus();
            }
            else if (this._isFocusWithinDrawer()) {
                this._restoreFocus();
            }
        });
        /**
         * Listen to `keydown` events outside the zone so that change detection is not run every
         * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
         * and we don't have close disabled.
         */
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(filter((event) => {
                return event.key === "Escape" /* Key.Escape */ && !this.disableClose && !hasModifierKey(event);
            }), takeUntil(this._destroyed))
                .subscribe((event) => this._ngZone.run(() => {
                this.close();
                event.stopPropagation();
                event.preventDefault();
            }));
        });
        // We need a Subject with distinctUntilChanged, because the `done` event
        // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
        this._animationEnd
            .pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))
            .subscribe((event) => {
            const { fromState, toState } = event;
            if ((toState.indexOf('open') === 0 && fromState === 'void') || (toState === 'void' && fromState.indexOf('open') === 0)) {
                this.openedChange.emit(this._opened);
            }
        });
    }
    /**
     * Moves focus into the drawer. Note that this works even if
     * the focus trap is disabled in `side` mode.
     */
    _takeFocus() {
        if (!this.autoFocus || !this._focusTrap) {
            return;
        }
        this._focusTrap.focusInitialElementWhenReady().then((hasMovedFocus) => {
            // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
            // still works. We need to check that `focus` is a function due to Universal.
            if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
                this._elementRef.nativeElement.focus();
            }
        });
    }
    /**
     * Restores focus to the element that was originally focused when the drawer opened.
     * If no element was focused at that time, the focus will be restored to the drawer.
     */
    _restoreFocus() {
        if (!this.autoFocus) {
            return;
        }
        // Note that we don't check via `instanceof HTMLElement` so that we can cover SVGs as well.
        if (this._elementFocusedBeforeDrawerWasOpened) {
            this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
        }
        else {
            this._elementRef.nativeElement.blur();
        }
        this._elementFocusedBeforeDrawerWasOpened = null;
        this._openedVia = null;
    }
    /** Whether focus is currently within the drawer. */
    _isFocusWithinDrawer() {
        const activeEl = this._doc?.activeElement;
        return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
    }
    ngAfterContentInit() {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._updateFocusTrapState();
    }
    ngAfterContentChecked() {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    }
    ngOnDestroy() {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
        this._animationStarted.complete();
        this._animationEnd.complete();
        this._modeChanged.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    open(openedVia) {
        return this.toggle(true, openedVia);
    }
    /** Close the drawer. */
    close() {
        return this.toggle(false);
    }
    /** Closes the drawer with context that the backdrop was clicked. */
    _closeViaBackdropClick() {
        // If the drawer is closed upon a backdrop click, we always want to restore focus. We
        // don't need to check whether focus is currently in the drawer, as clicking on the
        // backdrop causes blurring of the active element.
        return this._setOpen(/* isOpen */ false, /* restoreFocus */ true);
    }
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    toggle(isOpen = !this.opened, openedVia) {
        // If the focus is currently inside the drawer content and we are closing the drawer,
        // restore the focus to the initially focused element (when the drawer opened).
        return this._setOpen(isOpen, /* restoreFocus */ !isOpen && this._isFocusWithinDrawer(), openedVia);
    }
    /**
     * Toggles the opened state of the drawer.
     * @param isOpen Whether the drawer should open or close.
     * @param restoreFocus Whether focus should be restored on close.
     * @param openedVia Focus origin that can be optionally set when opening a drawer. The
     *   origin will be used later when focus is restored on drawer close.
     */
    _setOpen(isOpen, restoreFocus, openedVia = 'program') {
        this._opened = isOpen;
        if (isOpen) {
            this._animationState = this._enableAnimations ? 'open' : 'open-instant';
            this._openedVia = openedVia;
        }
        else {
            this._animationState = 'void';
            if (restoreFocus) {
                this._restoreFocus();
            }
        }
        this._updateFocusTrapState();
        return new Promise((resolve) => {
            this.openedChange.pipe(take(1)).subscribe((open) => resolve(open ? 'open' : 'close'));
        });
    }
    _getWidth() {
        return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
    }
    /** Updates the enabled state of the focus trap. */
    _updateFocusTrapState() {
        if (this._focusTrap) {
            // The focus trap is only enabled when the drawer is open in any mode other than side.
            this._focusTrap.enabled = this.opened && this.mode !== 'side';
        }
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _animationStartListener(event) {
        this._animationStarted.next(event);
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _animationDoneListener(event) {
        this._animationEnd.next(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoSidenavComponent, deps: [{ token: i0.ElementRef }, { token: i1$1.FocusTrapFactory }, { token: i1$1.FocusMonitor }, { token: i2.Platform }, { token: i0.NgZone }, { token: DOCUMENT, optional: true }, { token: NOVO_LAYOUT_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoSidenavComponent, isStandalone: false, selector: "novo-sidenav", inputs: { fixedInViewport: "fixedInViewport", fixedTopGap: "fixedTopGap", fixedBottomGap: "fixedBottomGap", position: "position", mode: "mode", disableClose: "disableClose", autoFocus: "autoFocus", opened: "opened" }, outputs: { openedChange: "openedChange", _openedStream: "opened", openedStart: "openedStart", _closedStream: "closed", closedStart: "closedStart", onPositionChanged: "positionChanged" }, host: { attributes: { "tabIndex": "-1" }, listeners: { "@transform.start": "_animationStartListener($event)", "@transform.done": "_animationDoneListener($event)" }, properties: { "attr.align": "null", "class.novo-sidenav-end": "position === \"end\"", "class.novo-sidenav-over": "mode === \"over\"", "class.novo-sidenav-push": "mode === \"push\"", "class.novo-sidenav-side": "mode === \"side\"", "class.novo-sidenav-opened": "opened", "class.novo-sidenav-fixed": "fixedInViewport", "style.top.px": "fixedInViewport ? fixedTopGap : null", "style.bottom.px": "fixedInViewport ? fixedBottomGap : null", "@transform": "this._animationState" }, classAttribute: "novo-sidenav" }, exportAs: ["novoSidenav"], ngImport: i0, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=border-default]{background:#dbdbdb}.novo-sidenav[theme=black]{color:var(--color-contrast-black);background:#000}.novo-sidenav[theme=white]{color:var(--color-contrast-white);background:#fff}.novo-sidenav[theme=gray]{color:var(--color-contrast-gray);background:#9e9e9e}.novo-sidenav[theme=grey]{color:var(--color-contrast-grey);background:#9e9e9e}.novo-sidenav[theme=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}.novo-sidenav[theme=bright]{color:var(--color-contrast-bright);background:#f7f7f7}.novo-sidenav[theme=light]{color:var(--color-contrast-light);background:#dbdbdb}.novo-sidenav[theme=neutral]{color:var(--color-contrast-neutral);background:#4f5361}.novo-sidenav[theme=dark]{color:var(--color-contrast-dark);background:#3d464d}.novo-sidenav[theme=orange]{color:var(--color-contrast-orange);background:#ff6900}.novo-sidenav[theme=navigation]{color:var(--color-contrast-navigation);background:#202945}.novo-sidenav[theme=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}.novo-sidenav[theme=steel]{color:var(--color-contrast-steel);background:#5b6770}.novo-sidenav[theme=metal]{color:var(--color-contrast-metal);background:#637893}.novo-sidenav[theme=sand]{color:var(--color-contrast-sand);background:#f4f4f4}.novo-sidenav[theme=silver]{color:var(--color-contrast-silver);background:#e2e2e2}.novo-sidenav[theme=stone]{color:var(--color-contrast-stone);background:#bebebe}.novo-sidenav[theme=ash]{color:var(--color-contrast-ash);background:#a0a0a0}.novo-sidenav[theme=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}.novo-sidenav[theme=slate]{color:var(--color-contrast-slate);background:#707070}.novo-sidenav[theme=onyx]{color:var(--color-contrast-onyx);background:#526980}.novo-sidenav[theme=charcoal]{color:var(--color-contrast-charcoal);background:#282828}.novo-sidenav[theme=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}.novo-sidenav[theme=midnight]{color:var(--color-contrast-midnight);background:#202945}.novo-sidenav[theme=darkness]{color:var(--color-contrast-darkness);background:#161f27}.novo-sidenav[theme=navy]{color:var(--color-contrast-navy);background:#0d2d42}.novo-sidenav[theme=aqua]{color:var(--color-contrast-aqua);background:#3bafda}.novo-sidenav[theme=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}.novo-sidenav[theme=mint]{color:var(--color-contrast-mint);background:#37bc9b}.novo-sidenav[theme=grass]{color:var(--color-contrast-grass);background:#8cc152}.novo-sidenav[theme=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}.novo-sidenav[theme=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}.novo-sidenav[theme=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}.novo-sidenav[theme=carnation]{color:var(--color-contrast-carnation);background:#d770ad}.novo-sidenav[theme=lavender]{color:var(--color-contrast-lavender);background:#967adc}.novo-sidenav[theme=mountain]{color:var(--color-contrast-mountain);background:#9678b6}.novo-sidenav[theme=info]{color:var(--color-contrast-info);background:#4a89dc}.novo-sidenav[theme=positive]{color:var(--color-contrast-positive);background:#4a89dc}.novo-sidenav[theme=success]{color:var(--color-contrast-success);background:#8cc152}.novo-sidenav[theme=negative]{color:var(--color-contrast-negative);background:#da4453}.novo-sidenav[theme=danger]{color:var(--color-contrast-danger);background:#da4453}.novo-sidenav[theme=error]{color:var(--color-contrast-error);background:#da4453}.novo-sidenav[theme=warning]{color:var(--color-contrast-warning);background:#f6b042}.novo-sidenav[theme=empty]{color:var(--color-contrast-empty);background:#cccdcc}.novo-sidenav[theme=disabled]{color:var(--color-contrast-disabled);background:#bebebe}.novo-sidenav[theme=background]{color:var(--color-contrast-background);background:#f7f7f7}.novo-sidenav[theme=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}.novo-sidenav[theme=border]{color:var(--color-contrast-border);background:#dbdbdb}.novo-sidenav[theme=border2]{color:var(--color-contrast-border2);background:#f7f7f7}.novo-sidenav[theme=text]{color:var(--color-contrast-text);background:#282828}.novo-sidenav[theme=presentation]{color:var(--color-contrast-presentation);background:#5b6770}.novo-sidenav[theme=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}.novo-sidenav[theme=pulse]{color:var(--color-contrast-pulse);background:#3bafda}.novo-sidenav[theme=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}.novo-sidenav[theme=toast]{color:var(--color-contrast-toast);background:#0d2d42}.novo-sidenav[theme=company]{color:var(--color-contrast-company);background:#39d}.novo-sidenav[theme=candidate]{color:var(--color-contrast-candidate);background:#4b7}.novo-sidenav[theme=lead]{color:var(--color-contrast-lead);background:#a69}.novo-sidenav[theme=contact]{color:var(--color-contrast-contact);background:#fa4}.novo-sidenav[theme=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}.novo-sidenav[theme=opportunity]{color:var(--color-contrast-opportunity);background:#625}.novo-sidenav[theme=job]{color:var(--color-contrast-job);background:#b56}.novo-sidenav[theme=joborder]{color:var(--color-contrast-joborder);background:#b56}.novo-sidenav[theme=submission]{color:var(--color-contrast-submission);background:#a9adbb}.novo-sidenav[theme=sendout]{color:var(--color-contrast-sendout);background:#747884}.novo-sidenav[theme=placement]{color:var(--color-contrast-placement);background:#0b344f}.novo-sidenav[theme=note]{color:var(--color-contrast-note);background:#747884}.novo-sidenav[theme=contract]{color:var(--color-contrast-contract);background:#454ea0}.novo-sidenav[theme=task]{color:var(--color-contrast-task);background:#4f5361}.novo-sidenav[theme=jobCode]{color:var(--color-contrast-job-code);background:#696d79}.novo-sidenav[theme=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}.novo-sidenav[theme=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}.novo-sidenav[theme=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}.novo-sidenav[theme=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}.novo-sidenav[theme=user]{color:var(--color-contrast-user);background:#696d79}.novo-sidenav[theme=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}.novo-sidenav[theme=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}.novo-sidenav[theme=credential]{color:var(--color-contrast-credential);background:#696d79}.novo-sidenav[theme=person]{color:var(--color-contrast-person);background:#696d79}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"], animations: [novoSidenavAnimations.transformDrawer], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoSidenavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-sidenav', exportAs: 'novoSidenav', animations: [novoSidenavAnimations.transformDrawer], host: {
                        class: 'novo-sidenav',
                        tabIndex: '-1',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.novo-sidenav-end]': 'position === "end"',
                        '[class.novo-sidenav-over]': 'mode === "over"',
                        '[class.novo-sidenav-push]': 'mode === "push"',
                        '[class.novo-sidenav-side]': 'mode === "side"',
                        '[class.novo-sidenav-opened]': 'opened',
                        '[class.novo-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: false, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=border-default]{background:#dbdbdb}.novo-sidenav[theme=black]{color:var(--color-contrast-black);background:#000}.novo-sidenav[theme=white]{color:var(--color-contrast-white);background:#fff}.novo-sidenav[theme=gray]{color:var(--color-contrast-gray);background:#9e9e9e}.novo-sidenav[theme=grey]{color:var(--color-contrast-grey);background:#9e9e9e}.novo-sidenav[theme=offWhite]{color:var(--color-contrast-off-white);background:#f7f7f7}.novo-sidenav[theme=bright]{color:var(--color-contrast-bright);background:#f7f7f7}.novo-sidenav[theme=light]{color:var(--color-contrast-light);background:#dbdbdb}.novo-sidenav[theme=neutral]{color:var(--color-contrast-neutral);background:#4f5361}.novo-sidenav[theme=dark]{color:var(--color-contrast-dark);background:#3d464d}.novo-sidenav[theme=orange]{color:var(--color-contrast-orange);background:#ff6900}.novo-sidenav[theme=navigation]{color:var(--color-contrast-navigation);background:#202945}.novo-sidenav[theme=skyBlue]{color:var(--color-contrast-sky-blue);background:#009bdf}.novo-sidenav[theme=steel]{color:var(--color-contrast-steel);background:#5b6770}.novo-sidenav[theme=metal]{color:var(--color-contrast-metal);background:#637893}.novo-sidenav[theme=sand]{color:var(--color-contrast-sand);background:#f4f4f4}.novo-sidenav[theme=silver]{color:var(--color-contrast-silver);background:#e2e2e2}.novo-sidenav[theme=stone]{color:var(--color-contrast-stone);background:#bebebe}.novo-sidenav[theme=ash]{color:var(--color-contrast-ash);background:#a0a0a0}.novo-sidenav[theme=anonymous]{color:var(--color-contrast-anonymous);background:#696d79}.novo-sidenav[theme=slate]{color:var(--color-contrast-slate);background:#707070}.novo-sidenav[theme=onyx]{color:var(--color-contrast-onyx);background:#526980}.novo-sidenav[theme=charcoal]{color:var(--color-contrast-charcoal);background:#282828}.novo-sidenav[theme=moonlight]{color:var(--color-contrast-moonlight);background:#1a242f}.novo-sidenav[theme=midnight]{color:var(--color-contrast-midnight);background:#202945}.novo-sidenav[theme=darkness]{color:var(--color-contrast-darkness);background:#161f27}.novo-sidenav[theme=navy]{color:var(--color-contrast-navy);background:#0d2d42}.novo-sidenav[theme=aqua]{color:var(--color-contrast-aqua);background:#3bafda}.novo-sidenav[theme=ocean]{color:var(--color-contrast-ocean);background:#4a89dc}.novo-sidenav[theme=mint]{color:var(--color-contrast-mint);background:#37bc9b}.novo-sidenav[theme=grass]{color:var(--color-contrast-grass);background:#8cc152}.novo-sidenav[theme=sunflower]{color:var(--color-contrast-sunflower);background:#f6b042}.novo-sidenav[theme=bittersweet]{color:var(--color-contrast-bittersweet);background:#eb6845}.novo-sidenav[theme=grapefruit]{color:var(--color-contrast-grapefruit);background:#da4453}.novo-sidenav[theme=carnation]{color:var(--color-contrast-carnation);background:#d770ad}.novo-sidenav[theme=lavender]{color:var(--color-contrast-lavender);background:#967adc}.novo-sidenav[theme=mountain]{color:var(--color-contrast-mountain);background:#9678b6}.novo-sidenav[theme=info]{color:var(--color-contrast-info);background:#4a89dc}.novo-sidenav[theme=positive]{color:var(--color-contrast-positive);background:#4a89dc}.novo-sidenav[theme=success]{color:var(--color-contrast-success);background:#8cc152}.novo-sidenav[theme=negative]{color:var(--color-contrast-negative);background:#da4453}.novo-sidenav[theme=danger]{color:var(--color-contrast-danger);background:#da4453}.novo-sidenav[theme=error]{color:var(--color-contrast-error);background:#da4453}.novo-sidenav[theme=warning]{color:var(--color-contrast-warning);background:#f6b042}.novo-sidenav[theme=empty]{color:var(--color-contrast-empty);background:#cccdcc}.novo-sidenav[theme=disabled]{color:var(--color-contrast-disabled);background:#bebebe}.novo-sidenav[theme=background]{color:var(--color-contrast-background);background:#f7f7f7}.novo-sidenav[theme=backgroundDark]{color:var(--color-contrast-background-dark);background:#e2e2e2}.novo-sidenav[theme=border]{color:var(--color-contrast-border);background:#dbdbdb}.novo-sidenav[theme=border2]{color:var(--color-contrast-border2);background:#f7f7f7}.novo-sidenav[theme=text]{color:var(--color-contrast-text);background:#282828}.novo-sidenav[theme=presentation]{color:var(--color-contrast-presentation);background:#5b6770}.novo-sidenav[theme=bullhorn]{color:var(--color-contrast-bullhorn);background:#ff6900}.novo-sidenav[theme=pulse]{color:var(--color-contrast-pulse);background:#3bafda}.novo-sidenav[theme=fastFind]{color:var(--color-contrast-fast-find);background:#0d2d42}.novo-sidenav[theme=toast]{color:var(--color-contrast-toast);background:#0d2d42}.novo-sidenav[theme=company]{color:var(--color-contrast-company);background:#39d}.novo-sidenav[theme=candidate]{color:var(--color-contrast-candidate);background:#4b7}.novo-sidenav[theme=lead]{color:var(--color-contrast-lead);background:#a69}.novo-sidenav[theme=contact]{color:var(--color-contrast-contact);background:#fa4}.novo-sidenav[theme=clientcontact]{color:var(--color-contrast-clientcontact);background:#fa4}.novo-sidenav[theme=opportunity]{color:var(--color-contrast-opportunity);background:#625}.novo-sidenav[theme=job]{color:var(--color-contrast-job);background:#b56}.novo-sidenav[theme=joborder]{color:var(--color-contrast-joborder);background:#b56}.novo-sidenav[theme=submission]{color:var(--color-contrast-submission);background:#a9adbb}.novo-sidenav[theme=sendout]{color:var(--color-contrast-sendout);background:#747884}.novo-sidenav[theme=placement]{color:var(--color-contrast-placement);background:#0b344f}.novo-sidenav[theme=note]{color:var(--color-contrast-note);background:#747884}.novo-sidenav[theme=contract]{color:var(--color-contrast-contract);background:#454ea0}.novo-sidenav[theme=task]{color:var(--color-contrast-task);background:#4f5361}.novo-sidenav[theme=jobCode]{color:var(--color-contrast-job-code);background:#696d79}.novo-sidenav[theme=earnCode]{color:var(--color-contrast-earn-code);background:#696d79}.novo-sidenav[theme=invoiceStatement]{color:var(--color-contrast-invoice-statement);background:#696d79}.novo-sidenav[theme=billableCharge]{color:var(--color-contrast-billable-charge);background:#696d79}.novo-sidenav[theme=payableCharge]{color:var(--color-contrast-payable-charge);background:#696d79}.novo-sidenav[theme=user]{color:var(--color-contrast-user);background:#696d79}.novo-sidenav[theme=corporateUser]{color:var(--color-contrast-corporate-user);background:#696d79}.novo-sidenav[theme=distributionList]{color:var(--color-contrast-distribution-list);background:#696d79}.novo-sidenav[theme=credential]{color:var(--color-contrast-credential);background:#696d79}.novo-sidenav[theme=person]{color:var(--color-contrast-person);background:#696d79}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$1.FocusTrapFactory }, { type: i1$1.FocusMonitor }, { type: i2.Platform }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_LAYOUT_CONTAINER]
                }] }], propDecorators: { fixedInViewport: [{
                type: Input
            }], fixedTopGap: [{
                type: Input
            }], fixedBottomGap: [{
                type: Input
            }], position: [{
                type: Input
            }], mode: [{
                type: Input
            }], disableClose: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], opened: [{
                type: Input
            }], _animationState: [{
                type: HostBinding,
                args: ['@transform']
            }], openedChange: [{
                type: Output
            }], _openedStream: [{
                type: Output,
                args: ['opened']
            }], openedStart: [{
                type: Output
            }], _closedStream: [{
                type: Output,
                args: ['closed']
            }], closedStart: [{
                type: Output
            }], onPositionChanged: [{
                type: Output,
                args: ['positionChanged']
            }], _animationStartListener: [{
                type: HostListener,
                args: ['@transform.start', ['$event']]
            }], _animationDoneListener: [{
                type: HostListener,
                args: ['@transform.done', ['$event']]
            }] } });

class NovoLayoutContainer {
    /** The drawer child with the `start` position. */
    get start() {
        return this._start;
    }
    /** The drawer child with the `end` position. */
    get end() {
        return this._end;
    }
    /**
     * Whether to automatically resize the container whenever
     * the size of any of its drawers changes.
     *
     * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
     * the drawers on every change detection cycle. Can be configured globally via the
     * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
     */
    get autosize() {
        return this._autosize;
    }
    set autosize(value) {
        this._autosize = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer container should have a backdrop while one of the sidenavs is open.
     * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
     * mode as well.
     */
    get hasBackdrop() {
        if (this._backdropOverride == null) {
            return !this._start || this._start.mode !== 'side' || !this._end || this._end.mode !== 'side';
        }
        return this._backdropOverride;
    }
    set hasBackdrop(value) {
        this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
    }
    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable() {
        return this._userContent || this._content;
    }
    constructor(_dir, _element, _ngZone, _changeDetectorRef, viewportRuler, defaultAutosize = false, _animationMode) {
        this._dir = _dir;
        this._element = _element;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._animationMode = _animationMode;
        /** Drawers that belong to this container. */
        this._drawers = new QueryList();
        /** Event emitted when the drawer backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Emits on every ngDoCheck. Used for debouncing reflows. */
        this._doCheckSubject = new Subject();
        /**
         * Margins to be applied to the content. These are used to push / shrink the drawer content when a
         * drawer is open. We use margin rather than transform even for push mode because transform breaks
         * fixed position elements inside of the transformed element.
         */
        this._contentMargins = { left: null, right: null };
        this._contentMarginChanges = new Subject();
        // If a `Dir` directive exists up the tree, listen direction changes
        // and update the left/right properties to point to the proper start/end.
        if (_dir) {
            _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._validateDrawers();
                this.updateContentMargins();
            });
        }
        // Since the minimum width of the sidenav depends on the viewport width,
        // we need to recompute the margins if the viewport changes.
        viewportRuler
            .change()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this.updateContentMargins());
        this._autosize = defaultAutosize;
    }
    ngAfterContentInit() {
        this._allDrawers.changes
            .pipe(startWith(this._allDrawers), takeUntil(this._destroyed))
            .subscribe((drawer) => {
            this._drawers.reset(drawer.filter((item) => !item._container || item._container === this));
            this._drawers.notifyOnChanges();
        });
        this._drawers.changes.pipe(startWith(null)).subscribe(() => {
            this._validateDrawers();
            this._drawers.forEach((drawer) => {
                this._watchDrawerToggle(drawer);
                this._watchDrawerPosition(drawer);
                this._watchDrawerMode(drawer);
            });
            if (!this._drawers.length || this._isDrawerOpen(this._start) || this._isDrawerOpen(this._end)) {
                this.updateContentMargins();
            }
            this._changeDetectorRef.markForCheck();
        });
        // Avoid hitting the NgZone through the debounce timeout.
        this._ngZone.runOutsideAngular(() => {
            this._doCheckSubject
                .pipe(debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
            takeUntil(this._destroyed))
                .subscribe(() => this.updateContentMargins());
        });
    }
    ngOnDestroy() {
        this._contentMarginChanges.complete();
        this._doCheckSubject.complete();
        this._drawers.destroy();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** Calls `open` of both start and end drawers */
    open() {
        this._drawers.forEach((drawer) => drawer.open());
    }
    /** Calls `close` of both start and end drawers */
    close() {
        this._drawers.forEach((drawer) => drawer.close());
    }
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     */
    updateContentMargins() {
        // 1. For drawers in `over` mode, they don't affect the content.
        // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
        //    left margin (for left drawer) or right margin (for right the drawer).
        // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
        //    adding to the left or right margin and simultaneously subtracting the same amount of
        //    margin from the other side.
        let left = 0;
        let right = 0;
        if (this._left && this._left.opened) {
            if (this._left.mode === 'side') {
                left += this._left._getWidth();
            }
            else if (this._left.mode === 'push') {
                const width = this._left._getWidth();
                left += width;
                right -= width;
            }
        }
        if (this._right && this._right.opened) {
            if (this._right.mode === 'side') {
                right += this._right._getWidth();
            }
            else if (this._right.mode === 'push') {
                const width = this._right._getWidth();
                right += width;
                left -= width;
            }
        }
        // If either `right` or `left` is zero, don't set a style to the element. This
        // allows users to specify a custom size via CSS class in SSR scenarios where the
        // measured widths will always be zero. Note that we reset to `null` here, rather
        // than below, in order to ensure that the types in the `if` below are consistent.
        left = left || null;
        right = right || null;
        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = { left, right };
            // Pull back into the NgZone since in some cases we could be outside. We need to be careful
            // to do it only when something changed, otherwise we can end up hitting the zone too often.
            this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
        }
    }
    ngDoCheck() {
        // If users opted into autosizing, do a check every change detection cycle.
        if (this._autosize && this._isPushed()) {
            // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
            this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
        }
    }
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     */
    _watchDrawerToggle(drawer) {
        drawer._animationStarted
            .pipe(filter((event) => event.fromState !== event.toState), takeUntil(this._drawers.changes))
            .subscribe((event) => {
            // Set the transition class on the container so that the animations occur. This should not
            // be set initially because animations should only be triggered via a change in state.
            if (event.toState !== 'open-instant' && this._animationMode !== 'NoopAnimations') {
                this._element.nativeElement.classList.add('mat-drawer-transition');
            }
            this.updateContentMargins();
            this._changeDetectorRef.markForCheck();
        });
        if (drawer.mode !== 'side') {
            drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._setContainerClass(drawer.opened));
        }
    }
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     */
    _watchDrawerPosition(drawer) {
        if (!drawer) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping positions at the same time.
        drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
            this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
                this._validateDrawers();
            });
        });
    }
    /** Subscribes to changes in drawer mode so we can run change detection. */
    _watchDrawerMode(drawer) {
        if (drawer) {
            drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed))).subscribe(() => {
                this.updateContentMargins();
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    _setContainerClass(isAdd) {
        const classList = this._element.nativeElement.classList;
        const className = 'mat-drawer-container-has-open';
        if (isAdd) {
            classList.add(className);
        }
        else {
            classList.remove(className);
        }
    }
    /** Validate the state of the drawer children components. */
    _validateDrawers() {
        this._start = this._end = null;
        // Ensure that we have at most one start and one end drawer.
        this._drawers.forEach((drawer) => {
            if (drawer.position === 'end') {
                if (this._end != null) {
                    throw new Error('Duplication drawers at end');
                }
                this._end = drawer;
            }
            else {
                if (this._start != null) {
                    throw new Error('Duplication drawers at start');
                }
                this._start = drawer;
            }
        });
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir && this._dir.value === 'rtl') {
            this._left = this._end;
            this._right = this._start;
        }
        else {
            this._left = this._start;
            this._right = this._end;
        }
    }
    /** Whether the container is being pushed to the side by one of the drawers. */
    _isPushed() {
        return (this._isDrawerOpen(this._start) && this._start.mode !== 'over') || (this._isDrawerOpen(this._end) && this._end.mode !== 'over');
    }
    _onBackdropClicked() {
        this.backdropClick.emit();
        this._closeModalDrawersViaBackdrop();
    }
    _closeModalDrawersViaBackdrop() {
        // Close all open drawers where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter((drawer) => drawer && !drawer.disableClose && this._canHaveBackdrop(drawer))
            .forEach((drawer) => drawer._closeViaBackdropClick());
    }
    _isShowingBackdrop() {
        return ((this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
            (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end)));
    }
    _canHaveBackdrop(drawer) {
        return drawer.mode !== 'side' || !!this._backdropOverride;
    }
    _isDrawerOpen(drawer) {
        return drawer != null && drawer.opened;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutContainer, deps: [{ token: i1$2.Directionality, optional: true }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: NOVO_LAYOUT_DEFAULT_AUTOSIZE }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoLayoutContainer, isStandalone: false, selector: "novo-layout-container", inputs: { autosize: "autosize", hasBackdrop: "hasBackdrop" }, outputs: { backdropClick: "backdropClick" }, host: { properties: { "class.novo-layout-container-explicit-backdrop": "_backdropOverride" }, classAttribute: "novo-layout-container" }, providers: [
            {
                provide: NOVO_LAYOUT_CONTAINER,
                useExisting: NovoLayoutContainer,
            },
        ], queries: [{ propertyName: "_rail", first: true, predicate: NovoRailComponent, descendants: true }, { propertyName: "_content", first: true, predicate: NovoLayoutContent, descendants: true }, { propertyName: "_allDrawers", predicate: NovoSidenavComponent, descendants: true }], viewQueries: [{ propertyName: "_userContent", first: true, predicate: NovoLayoutContent, descendants: true }], exportAs: ["novoLayoutContainer"], ngImport: i0, template: "<div class=\"novo-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n  [class.novo-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"novo-sidenav\"></ng-content>\n\n<div class=\"novo-layout-content-container\"\n  [class.and-has-rail]=\"_rail\"\n  [style.margin-left.px]=\"_contentMargins.left\"\n  [style.margin-right.px]=\"_contentMargins.right\">\n  <ng-content select=\"novo-rail\"></ng-content>\n\n  <ng-content select=\"novo-layout-content\">\n  </ng-content>\n\n  <novo-layout-content *ngIf=\"!_content\" cdkScrollable>\n    <ng-content></ng-content>\n  </novo-layout-content>\n</div>", styles: [".novo-layout-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden;height:100%}.novo-layout-container[fullscreen].novo-layout-container-has-open{overflow:hidden}.novo-layout-container.novo-layout-container-explicit-backdrop .novo-drawer-side{z-index:3}.novo-layout-container.ng-animate-disabled .novo-drawer-backdrop,.novo-layout-container.ng-animate-disabled .novo-layout-content,.ng-animate-disabled .novo-layout-container .novo-drawer-backdrop,.ng-animate-disabled .novo-layout-container .novo-layout-content{transition:none}.novo-drawer-backdrop{display:block;position:absolute;background:#000;inset:0;z-index:3;visibility:hidden;opacity:.5}.novo-drawer-backdrop.novo-drawer-shown{visibility:visible}.novo-drawer-transition .novo-drawer-backdrop{transition-duration:.1s;transition-timing-function:ease-out;transition-property:background-color,visibility}.novo-layout-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.novo-drawer-transition .novo-layout-content{transition-duration:.1s;transition-timing-function:ease-out;transition-property:transform,margin-left,margin-right}.novo-rail{display:inline-flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;height:inherit;height:100%;min-width:5rem;width:max-content;background:var(--background-bright)}.novo-rail .novo-rail-contents{display:inline-flex;flex-direction:column;width:-webkit-fill-available}.novo-layout-content-container{display:grid;grid-template-columns:1fr;height:100%}.novo-layout-content-container.and-has-rail{grid-template-columns:auto 1fr}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NovoLayoutContent, selector: "novo-layout-content", exportAs: ["novoLayoutContent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutContainer, decorators: [{
            type: Component,
            args: [{ selector: 'novo-layout-container', exportAs: 'novoLayoutContainer', host: {
                        class: 'novo-layout-container',
                        '[class.novo-layout-container-explicit-backdrop]': '_backdropOverride',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        {
                            provide: NOVO_LAYOUT_CONTAINER,
                            useExisting: NovoLayoutContainer,
                        },
                    ], standalone: false, template: "<div class=\"novo-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n  [class.novo-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"novo-sidenav\"></ng-content>\n\n<div class=\"novo-layout-content-container\"\n  [class.and-has-rail]=\"_rail\"\n  [style.margin-left.px]=\"_contentMargins.left\"\n  [style.margin-right.px]=\"_contentMargins.right\">\n  <ng-content select=\"novo-rail\"></ng-content>\n\n  <ng-content select=\"novo-layout-content\">\n  </ng-content>\n\n  <novo-layout-content *ngIf=\"!_content\" cdkScrollable>\n    <ng-content></ng-content>\n  </novo-layout-content>\n</div>", styles: [".novo-layout-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden;height:100%}.novo-layout-container[fullscreen].novo-layout-container-has-open{overflow:hidden}.novo-layout-container.novo-layout-container-explicit-backdrop .novo-drawer-side{z-index:3}.novo-layout-container.ng-animate-disabled .novo-drawer-backdrop,.novo-layout-container.ng-animate-disabled .novo-layout-content,.ng-animate-disabled .novo-layout-container .novo-drawer-backdrop,.ng-animate-disabled .novo-layout-container .novo-layout-content{transition:none}.novo-drawer-backdrop{display:block;position:absolute;background:#000;inset:0;z-index:3;visibility:hidden;opacity:.5}.novo-drawer-backdrop.novo-drawer-shown{visibility:visible}.novo-drawer-transition .novo-drawer-backdrop{transition-duration:.1s;transition-timing-function:ease-out;transition-property:background-color,visibility}.novo-layout-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.novo-drawer-transition .novo-layout-content{transition-duration:.1s;transition-timing-function:ease-out;transition-property:transform,margin-left,margin-right}.novo-rail{display:inline-flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;height:inherit;height:100%;min-width:5rem;width:max-content;background:var(--background-bright)}.novo-rail .novo-rail-contents{display:inline-flex;flex-direction:column;width:-webkit-fill-available}.novo-layout-content-container{display:grid;grid-template-columns:1fr;height:100%}.novo-layout-content-container.and-has-rail{grid-template-columns:auto 1fr}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_LAYOUT_DEFAULT_AUTOSIZE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }], propDecorators: { _allDrawers: [{
                type: ContentChildren,
                args: [NovoSidenavComponent, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }], _rail: [{
                type: ContentChild,
                args: [NovoRailComponent]
            }], _content: [{
                type: ContentChild,
                args: [NovoLayoutContent]
            }], _userContent: [{
                type: ViewChild,
                args: [NovoLayoutContent]
            }], autosize: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], backdropClick: [{
                type: Output
            }] } });

// NG2
class NovoLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutModule, declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent, NovoCollapsibleNavComponent], imports: [CommonModule], exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent, NovoCollapsibleNavComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent, NovoCollapsibleNavComponent],
                    exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent, NovoCollapsibleNavComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NOVO_LAYOUT_CONTAINER, NOVO_LAYOUT_DEFAULT_AUTOSIZE, NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY, NovoCollapsibleNavComponent, NovoLayoutContainer, NovoLayoutContent, NovoLayoutModule, NovoRailComponent, NovoSidenavComponent, throwNovoDuplicatedSidenavError };
//# sourceMappingURL=novo-elements-elements-layout.mjs.map
