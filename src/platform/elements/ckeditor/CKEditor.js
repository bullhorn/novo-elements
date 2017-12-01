"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Value accessor for the component (supports ngModel)
var CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoCKEditorElement; }),
    multi: true
};
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
var NovoCKEditorElement = (function () {
    function NovoCKEditorElement(zone) {
        this.zone = zone;
        this.change = new core_1.EventEmitter();
        this.ready = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.paste = new core_1.EventEmitter();
        this.loaded = new core_1.EventEmitter();
        this._value = '';
    }
    Object.defineProperty(NovoCKEditorElement.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    NovoCKEditorElement.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.instance) {
            this.instance.focusManager.blur(true); // Remove focus from editor
            setTimeout(function () {
                _this.instance.removeAllListeners();
                CKEDITOR.instances[_this.instance.name].destroy();
                _this.instance.destroy();
                _this.instance = null;
            });
        }
    };
    NovoCKEditorElement.prototype.ngAfterViewInit = function () {
        var config = this.config || this.getBaseConfig();
        this.ckeditorInit(config);
    };
    NovoCKEditorElement.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.value = value;
            _this.onChange(value);
            _this.onTouched();
            _this.change.emit(value);
        });
    };
    NovoCKEditorElement.prototype.ckeditorInit = function (config) {
        var _this = this;
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);
        // Set initial value
        this.instance.setData(this.value);
        // listen for instanceReady event
        this.instance.on('instanceReady', function (evt) {
            // send the evt to the EventEmitter
            _this.ready.emit(evt);
        });
        // CKEditor change event
        this.instance.on('change', function () {
            _this.onTouched();
            var value = _this.instance.getData();
            // Debounce update
            if (_this.debounce) {
                if (_this.debounceTimeout) {
                    clearTimeout(_this.debounceTimeout);
                }
                _this.debounceTimeout = setTimeout(function () {
                    _this.updateValue(value);
                    _this.debounceTimeout = null;
                }, parseInt(_this.debounce));
            }
            else {
                _this.updateValue(value);
            }
        });
        this.instance.on('blur', function (event) {
            _this.blur.emit(event);
        });
        this.instance.on('focus', function (event) {
            _this.focus.emit(event);
        });
        this.instance.on('paste', function (event) {
            _this.paste.emit(event);
        });
        this.instance.on('loaded', function (event) {
            _this.loaded.emit(event);
        });
    };
    NovoCKEditorElement.prototype.getBaseConfig = function () {
        var baseConfig = {
            enterMode: CKEDITOR.ENTER_BR,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            removePlugins: 'liststyle,tabletools,contextmenu' // allows browser based spell checking
        };
        var minimalConfig = {
            toolbar: [{
                    name: 'basicstyles',
                    items: ['Styles', 'FontSize', 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Link']
                }]
        };
        var extendedConfig = {
            toolbar: [
                { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
                { name: 'links', items: ['Link'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                { name: 'tools', items: ['Maximize', 'Source'] },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] }
            ]
        };
        return Object.assign(baseConfig, this.minimal ? minimalConfig : extendedConfig);
    };
    NovoCKEditorElement.prototype.writeValue = function (value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    };
    NovoCKEditorElement.prototype.onChange = function (value) {
    };
    NovoCKEditorElement.prototype.onTouched = function (event) {
    };
    NovoCKEditorElement.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NovoCKEditorElement.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NovoCKEditorElement.prototype.insertText = function (text) {
        var trimmedText = text.trim();
        this.instance.insertText(trimmedText);
    };
    return NovoCKEditorElement;
}());
NovoCKEditorElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-editor',
                providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
                template: '<textarea [name]="name" [id]="name" #host></textarea>'
            },] },
];
/** @nocollapse */
NovoCKEditorElement.ctorParameters = function () { return [
    { type: core_1.NgZone, },
]; };
NovoCKEditorElement.propDecorators = {
    'config': [{ type: core_1.Input },],
    'debounce': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'minimal': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
    'ready': [{ type: core_1.Output },],
    'blur': [{ type: core_1.Output },],
    'focus': [{ type: core_1.Output },],
    'paste': [{ type: core_1.Output },],
    'loaded': [{ type: core_1.Output },],
    'host': [{ type: core_1.ViewChild, args: ['host',] },],
    'value': [{ type: core_1.Input },],
};
exports.NovoCKEditorElement = NovoCKEditorElement;
//# sourceMappingURL=CKEditor.js.map