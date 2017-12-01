"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Toast_1 = require("./Toast");
var ComponentUtils_1 = require("../../utils/component-utils/ComponentUtils");
var NovoToastService = (function () {
    function NovoToastService(componentUtils) {
        this.componentUtils = componentUtils;
        this.references = [];
        this.themes = [
            'default',
            'success',
            'info',
            'warning',
            'danger'
        ];
        this.icons = {
            default: 'bell',
            success: 'check',
            info: 'info',
            warning: 'warning',
            danger: 'remove'
        };
        this.defaults = {
            hideDelay: 3500,
            position: 'growlTopRight',
            theme: 'default'
        };
    }
    Object.defineProperty(NovoToastService.prototype, "parentViewContainer", {
        set: function (view) {
            this._parentViewContainer = view;
        },
        enumerable: true,
        configurable: true
    });
    NovoToastService.prototype.alert = function (options) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this._parentViewContainer) {
                console.error('No parent view container specified for the ToastService. Set it inside your main application. \nthis.toastService.parentViewContainer = view (ViewContainerRef)');
                return;
            }
            var toast = _this.componentUtils.appendNextToLocation(Toast_1.NovoToastElement, _this._parentViewContainer);
            _this.references.push(toast);
            _this.handleAlert(toast.instance, options);
            resolve(toast);
        });
    };
    NovoToastService.prototype.isVisible = function (toast) {
        return toast.show;
    };
    NovoToastService.prototype.hide = function (toast) {
        var _this = this;
        toast.animate = false;
        setTimeout(function () {
            toast.show = false;
            var REF = _this.references.filter(function (x) { return x.instance === toast; })[0];
            if (REF) {
                _this.references.splice(_this.references.indexOf(REF), 1);
                REF.destroy();
            }
        }, 300);
    };
    NovoToastService.prototype.handleAlert = function (toast, options) {
        var _this = this;
        this.setToastOnSession(toast, options);
        setTimeout(function () {
            _this.show(toast);
        }, 20);
        if (!toast.isCloseable) {
            this.toastTimer(toast);
        }
    };
    NovoToastService.prototype.setToastOnSession = function (toast, opts) {
        var OPTIONS = (typeof opts === 'object') ? opts : {};
        toast.parent = this;
        toast.title = OPTIONS.title || '';
        toast.message = OPTIONS.message || '';
        toast.hideDelay = OPTIONS.hideDelay || this.defaults.hideDelay;
        toast.link = OPTIONS.link || '';
        toast.isCloseable = OPTIONS.isCloseable || false;
        var CUSTOM_CLASS = OPTIONS.customClass || '';
        var ALERT_STYLE = OPTIONS.theme || this.defaults.theme;
        var ALERT_POSITION = OPTIONS.position || this.defaults.position;
        var ALERT_ICON = OPTIONS.icon || this.icons.default;
        toast.iconClass = "bhi-" + ALERT_ICON;
        toast.launched = true;
        toast.alertTheme = ALERT_STYLE + " " + ALERT_POSITION + " " + CUSTOM_CLASS + " toast-container launched";
    };
    NovoToastService.prototype.show = function (toast) {
        toast.show = true;
        setTimeout(addClass, 25);
        /**
         * Adds animate class to be called after a timeout
         **/
        function addClass() {
            toast.animate = true;
        }
    };
    NovoToastService.prototype.toastTimer = function (toast) {
        var _this = this;
        if (toast.hideDelay < 0) {
            return;
        }
        setTimeout(function () {
            _this.hide(toast);
        }, toast.hideDelay);
    };
    return NovoToastService;
}());
NovoToastService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NovoToastService.ctorParameters = function () { return [
    { type: ComponentUtils_1.ComponentUtils, },
]; };
exports.NovoToastService = NovoToastService;
//# sourceMappingURL=ToastService.js.map