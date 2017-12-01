"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// CDK
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var rxjs_1 = require("@angular/cdk/rxjs");
var merge_1 = require("rxjs/observable/merge");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var of_1 = require("rxjs/observable/of");
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
exports.DEFAULT_OVERLAY_SCROLL_STRATEGY = new core_1.InjectionToken('novo-overlay-scroll-strategy');
/** @docs-private */
function DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY = DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY;
/** @docs-private */
exports.DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: exports.DEFAULT_OVERLAY_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
var NovoOverlayTemplate = (function () {
    function NovoOverlayTemplate(_overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _document) {
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollStrategy = _scrollStrategy;
        this._document = _document;
        this.id = "novo-overlay-" + Date.now();
        this.position = 'default';
        this.closeOnSelect = true;
        this.select = new core_1.EventEmitter();
        this.closing = new core_1.EventEmitter();
        this._panelOpen = false;
    }
    NovoOverlayTemplate.prototype.ngOnDestroy = function () {
        this._destroyPanel();
    };
    Object.defineProperty(NovoOverlayTemplate.prototype, "panelOpen", {
        /* Whether or not the autocomplete panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Opens the autocomplete suggestion panel. */
    NovoOverlayTemplate.prototype.openPanel = function () {
        //if (!this.overlayTemplate) {
        //throw getMdAutocompleteMissingPanelError();
        //}
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay(this.template);
        }
        else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getState().width = this._getHostWidth();
            this._overlayRef.updateSize();
            this._overlayRef.updatePosition();
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        this._panelOpen = true;
        this._changeDetectorRef.markForCheck();
        setTimeout(function () { return _this._overlayRef.updatePosition(); });
    };
    /** Closes the autocomplete suggestion panel. */
    NovoOverlayTemplate.prototype.closePanel = function () {
        var _this = this;
        this._zone.run(function () {
            if (_this._overlayRef && _this._overlayRef.hasAttached()) {
                _this._overlayRef.detach();
                _this._closingActionsSubscription.unsubscribe();
            }
            _this.closing.emit(true);
            if (_this._panelOpen) {
                _this._panelOpen = false;
                // We need to trigger change detection manually, because
                // `fromEvent` doesn't seem to do it at the proper time.
                // This ensures that the placeholder is reset when the
                // user clicks outside.
                _this._changeDetectorRef.markForCheck();
            }
        });
    };
    NovoOverlayTemplate.prototype.onClosingAction = function (event) {
        this.closePanel();
    };
    Object.defineProperty(NovoOverlayTemplate.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         */
        get: function () {
            return merge_1.merge(
            //this.overlayTemplate._keyManager.tabOut,
            this._outsideClickStream);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoOverlayTemplate.prototype, "_outsideClickStream", {
        /** Stream of clicks outside of the autocomplete panel. */
        get: function () {
            var _this = this;
            if (!this._document) {
                return of_1.of(null);
            }
            return rxjs_1.RxChain.from(merge_1.merge(fromEvent_1.fromEvent(this._document, 'click'), fromEvent_1.fromEvent(this._document, 'touchend'))).call(rxjs_1.filter, function (event) {
                var clickTarget = event.target;
                var clicked = _this._panelOpen &&
                    clickTarget !== _this._getConnectedElement().nativeElement &&
                    (!_this._getConnectedElement().nativeElement.contains(clickTarget)) &&
                    (!!_this._overlayRef && !_this._overlayRef.overlayElement.contains(clickTarget));
                if (_this._panelOpen && !!_this._overlayRef && _this._overlayRef.overlayElement.contains(clickTarget) && _this.closeOnSelect) {
                    _this.select.emit(event);
                }
                return clicked;
            }).result();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    NovoOverlayTemplate.prototype._subscribeToClosingActions = function () {
        var _this = this;
        var firstStable = rxjs_1.first.call(this._zone.onStable);
        //const valueChanges = Observable.from(this.value);
        // When the zone is stable initially, and when the option list changes...
        return rxjs_1.RxChain.from(merge_1.merge(firstStable))
            .call(rxjs_1.switchMap, function () {
            return _this.panelClosingActions;
        })
            .call(rxjs_1.first)
            .subscribe(function (event) { return _this.onClosingAction(event); });
    };
    /** Destroys the autocomplete suggestion panel. */
    NovoOverlayTemplate.prototype._destroyPanel = function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    NovoOverlayTemplate.prototype._createOverlay = function (template) {
        this._portal = new portal_1.TemplatePortal(template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
        this._overlayRef.getState().width = this._getHostWidth();
    };
    NovoOverlayTemplate.prototype._getOverlayConfig = function () {
        var overlayState = new overlay_1.OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        //overlayState.width = this._getHostWidth();
        overlayState.direction = 'ltr';
        overlayState.scrollStrategy = this._scrollStrategy();
        return overlayState;
    };
    NovoOverlayTemplate.prototype._getOverlayPosition = function () {
        switch (this.position) {
            case 'center':
                this._positionStrategy = this._overlay.position()
                    .connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
                    .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                    .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' });
                break;
            default:
                this._positionStrategy = this._overlay.position()
                    .connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
                    .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
                break;
        }
        return this._positionStrategy;
    };
    NovoOverlayTemplate.prototype._getConnectedElement = function () {
        return this.parent;
    };
    /** Returns the width of the input element, so the panel width can match it. */
    NovoOverlayTemplate.prototype._getHostWidth = function () {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    };
    return NovoOverlayTemplate;
}());
NovoOverlayTemplate.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-overlay-template',
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                template: "\n    <ng-template>\n        <div class=\"novo-overlay-panel\" role=\"listbox\" [id]=\"id\" #panel>\n            <ng-content></ng-content>\n        </div>\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoOverlayTemplate.ctorParameters = function () { return [
    { type: overlay_1.Overlay, },
    { type: core_1.ViewContainerRef, },
    { type: core_1.NgZone, },
    { type: core_1.ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.DEFAULT_OVERLAY_SCROLL_STRATEGY,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
]; };
NovoOverlayTemplate.propDecorators = {
    'template': [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
    'panel': [{ type: core_1.ViewChild, args: ['panel',] },],
    'parent': [{ type: core_1.Input },],
    'position': [{ type: core_1.Input },],
    'closeOnSelect': [{ type: core_1.Input },],
    'select': [{ type: core_1.Output },],
    'closing': [{ type: core_1.Output },],
};
exports.NovoOverlayTemplate = NovoOverlayTemplate;
//# sourceMappingURL=Overlay.js.map