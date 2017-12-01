"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
//APP
var Helpers_1 = require("../../utils/Helpers");
var NOVO_VALUE_TYPE;
(function (NOVO_VALUE_TYPE) {
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["DEFAULT"] = 0] = "DEFAULT";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["EMAIL"] = 1] = "EMAIL";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["PHONE"] = 2] = "PHONE";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["ENTITY_LIST"] = 3] = "ENTITY_LIST";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["LINK"] = 4] = "LINK";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["INTERNAL_LINK"] = 5] = "INTERNAL_LINK";
})(NOVO_VALUE_TYPE = exports.NOVO_VALUE_TYPE || (exports.NOVO_VALUE_TYPE = {}));
;
var NOVO_VALUE_THEME;
(function (NOVO_VALUE_THEME) {
    NOVO_VALUE_THEME[NOVO_VALUE_THEME["DEFAULT"] = 0] = "DEFAULT";
    NOVO_VALUE_THEME[NOVO_VALUE_THEME["MOBILE"] = 1] = "MOBILE";
})(NOVO_VALUE_THEME = exports.NOVO_VALUE_THEME || (exports.NOVO_VALUE_THEME = {}));
;
var NovoValuePhone = (function () {
    function NovoValuePhone() {
    }
    Object.defineProperty(NovoValuePhone.prototype, "isMobile", {
        get: function () {
            return this.theme === NOVO_VALUE_THEME.MOBILE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoValuePhone.prototype, "showIcon", {
        get: function () {
            return !Helpers_1.Helpers.isEmpty(this.data);
        },
        enumerable: true,
        configurable: true
    });
    return NovoValuePhone;
}());
NovoValuePhone.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-value-phone',
                template: "\n        <div class=\"value-outer\">\n            <label>{{ meta.label }}</label>\n            <a *ngIf=\"!isMobile\" class=\"value\" href=\"tel:{{data}}\" target=\"_parent\">\n                {{ data }}\n            </a>\n            <div *ngIf=\"isMobile\" class=\"value\">{{ data }}</div>\n        </div>\n        <div class=\"actions\" *ngIf=\"showIcon\">\n            <a href=\"tel:{{data}}\"><i class=\"bhi-phone\"></i></a>\n            <a href=\"sms:{{data}}\"><i class=\"bhi-sms\"></i></a>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoValuePhone.ctorParameters = function () { return []; };
NovoValuePhone.propDecorators = {
    'data': [{ type: core_1.Input },],
    'meta': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'isMobile': [{ type: core_1.HostBinding, args: ['class.mobile',] },],
};
exports.NovoValuePhone = NovoValuePhone;
var NovoValueEmail = (function () {
    function NovoValueEmail() {
    }
    Object.defineProperty(NovoValueEmail.prototype, "isMobile", {
        get: function () {
            return this.theme === NOVO_VALUE_THEME.MOBILE;
        },
        enumerable: true,
        configurable: true
    });
    NovoValueEmail.prototype.openEmail = function (data) {
        if (this.meta && this.meta.openEmail && typeof this.meta.openEmail === 'function') {
            this.meta.openEmail(data);
        }
        else {
            var newTab_1 = window.open('', '_blank', '', true);
            if (newTab_1) {
                newTab_1.location.replace("mailto:" + encodeURIComponent(data));
                // Self close for desktop clients
                setTimeout(function () {
                    try {
                        if (newTab_1.location.href === 'about:blank') {
                            newTab_1.close();
                        }
                    }
                    catch (error) {
                        // No op, browser handled the mailto link
                    }
                });
            }
        }
        if (Helpers_1.Helpers.isEmpty(this.theme)) {
            this.theme = NOVO_VALUE_THEME.DEFAULT;
        }
    };
    Object.defineProperty(NovoValueEmail.prototype, "showIcon", {
        get: function () {
            return !Helpers_1.Helpers.isEmpty(this.data);
        },
        enumerable: true,
        configurable: true
    });
    return NovoValueEmail;
}());
NovoValueEmail.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-value-email',
                template: "\n        <div class=\"value-outer\">\n            <label>{{ meta.label }}</label>\n            <a *ngIf=\"!isMobile\"  class=\"value\" (click)=\"openEmail(data)\"> {{ data }}</a>\n            <div *ngIf=\"isMobile\" class=\"value\">{{ data }}</div>\n        </div>\n        <i class=\"bhi-email actions\" *ngIf=\"showIcon\" (click)=\"openEmail(data)\"></i>\n    "
            },] },
];
/** @nocollapse */
NovoValueEmail.ctorParameters = function () { return []; };
NovoValueEmail.propDecorators = {
    'data': [{ type: core_1.Input },],
    'meta': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'isMobile': [{ type: core_1.HostBinding, args: ['class.mobile',] },],
};
exports.NovoValueEmail = NovoValueEmail;
var NovoValueElement = (function () {
    function NovoValueElement() {
        this.theme = NOVO_VALUE_THEME.DEFAULT;
        this.NOVO_VALUE_TYPE = NOVO_VALUE_TYPE;
        this.NOVO_VALUE_THEME = NOVO_VALUE_THEME;
    }
    NovoValueElement.prototype.ngOnInit = function () {
        if (Helpers_1.Helpers.isEmpty(this.meta)) {
            this.meta = {
                label: ''
            };
        }
    };
    Object.defineProperty(NovoValueElement.prototype, "isMobile", {
        get: function () {
            return this.theme === NOVO_VALUE_THEME.MOBILE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoValueElement.prototype, "iconClass", {
        get: function () {
            if (this.meta && this.meta.icon) {
                return "bhi-" + this.meta.icon + " actions";
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoValueElement.prototype, "isDefault", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoValueElement.prototype, "showLabel", {
        get: function () {
            return this.type === NOVO_VALUE_TYPE.INTERNAL_LINK || this.type === NOVO_VALUE_TYPE.LINK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoValueElement.prototype, "showIcon", {
        get: function () {
            return this.meta && this.meta.icon && !Helpers_1.Helpers.isEmpty(this.data);
        },
        enumerable: true,
        configurable: true
    });
    NovoValueElement.prototype.onValueClick = function () {
        if (this.meta && this.meta.onIconClick && typeof this.meta.onIconClick === 'function') {
            this.meta.onIconClick(this.data, this.meta);
        }
    };
    NovoValueElement.prototype.openLink = function () {
        if (this.meta && this.meta.openLink && typeof this.meta.openLink === 'function') {
            this.meta.openLink(this.data, this.meta);
        }
    };
    NovoValueElement.prototype.ngOnChanges = function (changes) {
        if (this.meta && this.isEmailField(this.meta)) {
            this.type = NOVO_VALUE_TYPE.EMAIL;
        }
        else if (this.meta && this.isPhoneField(this.meta)) {
            this.type = NOVO_VALUE_TYPE.PHONE;
        }
        else if (this.meta && this.isLinkField(this.meta, this.data)) {
            this.type = NOVO_VALUE_TYPE.LINK;
            // Make sure the value has a protocol, otherwise the URL will be relative
            var hasProtocol = new RegExp('^(http|https)://', 'i');
            if (!hasProtocol.test(this.data)) {
                this.url = "http://" + this.data;
            }
            else {
                this.url = this.data;
            }
        }
        else if (this.meta && this.meta.associatedEntity) {
            switch (this.meta.associatedEntity.entity) {
                case 'ClientCorporation':
                case 'ClientContact':
                case 'Candidate':
                case 'JobOrder':
                case 'Placement':
                    this.type = NOVO_VALUE_TYPE.INTERNAL_LINK;
                    break;
                default:
                    break;
            }
        }
    };
    NovoValueElement.prototype.isEmailField = function (field) {
        var emailFields = ['email', 'email2', 'email3'];
        return emailFields.indexOf(field.name) > -1 || field.type === NOVO_VALUE_TYPE.EMAIL;
    };
    NovoValueElement.prototype.isPhoneField = function (field) {
        var phoneFields = ['phone', 'phone2', 'phone3', 'pager', 'mobile', 'workPhone', 'billingPhone'];
        return phoneFields.indexOf(field.name) > -1 || field.type === NOVO_VALUE_TYPE.PHONE;
    };
    NovoValueElement.prototype.isLinkField = function (field, data) {
        var linkFields = ['companyURL', 'clientCorporationCompanyURL'];
        var regex = new RegExp('^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$', 'gi');
        var isURL = Helpers_1.Helpers.isString(data) && regex.exec(data.trim());
        return (linkFields.indexOf(field.name) > -1) || !!isURL || field.type === NOVO_VALUE_TYPE.LINK;
    };
    return NovoValueElement;
}());
NovoValueElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-value',
                template: "\n        <ng-container [ngSwitch]=\"type\">\n            <div class=\"value-outer\" *ngIf=\"showLabel\">\n                <label>{{ meta.label }}</label>\n                <a *ngSwitchCase=\"NOVO_VALUE_TYPE.INTERNAL_LINK\" class=\"value\" (click)=\"openLink()\" [innerHTML]=\"data | render : meta\"></a>\n                <a *ngSwitchCase=\"NOVO_VALUE_TYPE.LINK\" class=\"value\" [href]=\"url\" target=\"_blank\" [innerHTML]=\"data | render : meta\"></a>\n            </div>\n\n            <novo-value-phone *ngSwitchCase=\"NOVO_VALUE_TYPE.PHONE\" [data]=\"data\" [theme]=\"theme\" [meta]=\"meta\"></novo-value-phone>\n            <novo-value-email *ngSwitchCase=\"NOVO_VALUE_TYPE.EMAIL\" [data]=\"data\" [theme]=\"theme\" [meta]=\"meta\"></novo-value-email>\n\n            <div *ngSwitchDefault class=\"value-outer\">\n                <label>{{ meta.label }}</label>\n                <div *ngIf=\"isDefault\" class=\"value\" [innerHTML]=\"data | render : meta\"></div>\n            </div>\n            <i *ngIf=\"showIcon\" [class]=\"iconClass\" (click)=\"onValueClick()\"></i>\n        </ng-container>\n    "
            },] },
];
/** @nocollapse */
NovoValueElement.ctorParameters = function () { return []; };
NovoValueElement.propDecorators = {
    'data': [{ type: core_1.Input },],
    'meta': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'isMobile': [{ type: core_1.HostBinding, args: ['class.mobile',] },],
};
exports.NovoValueElement = NovoValueElement;
//# sourceMappingURL=Value.js.map