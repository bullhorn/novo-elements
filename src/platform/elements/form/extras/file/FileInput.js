"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var novo_label_service_1 = require("../../../../services/novo-label-service");
var DragulaService_1 = require("../../../../elements/dragula/DragulaService");
var File_1 = require("./extras/file/File");
// Value accessor for the component (supports ngModel)
var FILE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoFileInputElement; }),
    multi: true
};
var LAYOUT_DEFAULTS = { order: 'default', download: true, labelStyle: 'default', draggable: false };
var NovoFileInputElement = (function () {
    function NovoFileInputElement(element, labels, dragula) {
        this.element = element;
        this.labels = labels;
        this.dragula = dragula;
        this.multiple = false;
        this.disabled = false;
        this.value = [];
        this.elements = [];
        this.files = [];
        this.active = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
        this.commands = {
            dragenter: this.dragEnterHandler.bind(this),
            dragleave: this.dragLeaveHandler.bind(this),
            dragover: this.dragOverHandler.bind(this),
            drop: this.dropHandler.bind(this)
        };
    }
    NovoFileInputElement.prototype.ngOnInit = function () {
        var _this = this;
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(function (type) {
            _this.element.nativeElement.addEventListener(type, _this.commands[type]);
        });
        this.updateLayout();
        this.initializeDragula();
        this.setInitialFileList();
    };
    NovoFileInputElement.prototype.ngOnDestroy = function () {
        var _this = this;
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(function (type) {
            _this.element.nativeElement.removeEventListener(type, _this.commands[type]);
        });
        var dragulaHasFileOutputBag = this.dragula.bags.length > 0 && this.dragula.bags.filter(function (x) { return x.name === _this.fileOutputBag; }).length > 0;
        if (dragulaHasFileOutputBag) {
            this.dragula.destroy(this.fileOutputBag);
        }
    };
    NovoFileInputElement.prototype.ngOnChanges = function (changes) {
        this.onModelChange(this.model);
    };
    NovoFileInputElement.prototype.updateLayout = function () {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.insertTemplatesBasedOnLayout();
    };
    NovoFileInputElement.prototype.insertTemplatesBasedOnLayout = function () {
        var _this = this;
        var order;
        switch (this.layoutOptions['order']) {
            case 'displayFilesBelow':
                order = ['fileInput', 'fileOutput'];
                break;
            default:
                order = ['fileOutput', 'fileInput'];
        }
        order.forEach(function (template) {
            _this.container.createEmbeddedView(_this[template], 0);
        });
        return order;
    };
    NovoFileInputElement.prototype.initializeDragula = function () {
        var _this = this;
        this.fileOutputBag = "file-output-" + this.dragula.bags.length;
        this.dragula.setOptions(this.fileOutputBag, {
            moves: function (el, container, handle) {
                return _this.layoutOptions.draggable;
            }
        });
    };
    NovoFileInputElement.prototype.setInitialFileList = function () {
        if (this.value) {
            this.files = this.value;
        }
    };
    NovoFileInputElement.prototype.dragEnterHandler = function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.target = event.target;
        this.active = true;
    };
    NovoFileInputElement.prototype.dragLeaveHandler = function (event) {
        event.preventDefault();
        if (this.target === event.target) {
            this.active = false;
        }
    };
    NovoFileInputElement.prototype.dragOverHandler = function (event) {
        event.preventDefault();
        // no-op
    };
    NovoFileInputElement.prototype.dropHandler = function (event) {
        event.preventDefault();
        this.visible = false;
        if (event.dataTransfer.types[0] !== 'Files') {
            return;
        }
        var filelist = Array.from(event.dataTransfer.files);
        this.process(this.multiple ? filelist : [filelist[0]]);
        this.active = false;
    };
    NovoFileInputElement.prototype.writeValue = function (model) {
        this.model = model;
    };
    NovoFileInputElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoFileInputElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    NovoFileInputElement.prototype.check = function (event) {
        this.process(Array.from(event.target.files));
    };
    NovoFileInputElement.prototype.process = function (filelist) {
        var _this = this;
        Promise.all(filelist.map(function (file) { return _this.readFile(file); })).then(function (files) {
            if (_this.multiple) {
                (_a = _this.files).push.apply(_a, files);
            }
            else {
                _this.files = files;
            }
            _this.model = _this.files;
            _this.onModelChange(_this.model);
            var _a;
        });
    };
    NovoFileInputElement.prototype.download = function (file) {
        window.open(file.dataURL, '_blank');
    };
    NovoFileInputElement.prototype.remove = function (file) {
        this.files.splice(this.files.findIndex(function (f) { return (f.name === file.name && f.size === file.size); }), 1);
        this.model = this.files;
        this.onModelChange(this.model);
    };
    NovoFileInputElement.prototype.readFile = function (file) {
        return new File_1.NovoFile(file).read();
    };
    return NovoFileInputElement;
}());
NovoFileInputElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-file-input',
                providers: [FILE_VALUE_ACCESSOR],
                template: "\n        <div #container></div>\n        <ng-template #fileInput>\n            <div class=\"file-input-group\" [class.disabled]=\"disabled\" [class.active]=\"active\">\n                <input type=\"file\" [name]=\"name\" [attr.id]=\"name\" (change)=\"check($event)\" [attr.multiple]=\"multiple\" tabindex=\"-1\"/>\n                <section [ngSwitch]=\"layoutOptions.labelStyle\">\n                    <label *ngSwitchCase=\"'no-box'\" [attr.for]=\"name\" class=\"no-box\">\n                        <div><i class=\"bhi-dropzone\"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }} <strong class=\"link\">{{ labels.clickToBrowse }}</strong></div>\n                    </label>\n                    <label *ngSwitchDefault [attr.for]=\"name\" class=\"boxed\">\n                        <span>{{ placeholder || labels.chooseAFile }}</span>\n                        <small>{{ labels.or }} <strong class=\"link\">{{ labels.clickToBrowse }}</strong></small>\n                    </label>\n                </section>\n            </div>\n        </ng-template>\n        <ng-template #fileOutput>\n            <div class=\"file-output-group\" [dragula]=\"fileOutputBag\" [dragulaModel]=\"files\">\n                <div class=\"file-item\" *ngFor=\"let file of files\">\n                    <i *ngIf=\"layoutOptions.draggable\" class=\"bhi-move\"></i>\n                    <label>{{ file.name | decodeURI }}</label>\n                    <div class=\"actions\" [attr.data-automation-id]=\"'file-actions'\" *ngIf=\"file.loaded\">\n                        <button *ngIf=\"layoutOptions.download\" type=\"button\" theme=\"icon\" icon=\"save\" (click)=\"download(file)\" [attr.data-automation-id]=\"'file-download'\" tabindex=\"-1\"></button>\n                        <button type=\"button\" theme=\"icon\" icon=\"close\" (click)=\"remove(file)\" [attr.data-automation-id]=\"'file-remove'\" tabindex=\"-1\"></button>\n                    </div>\n                    <novo-loading *ngIf=\"!file.loaded\"></novo-loading>\n                </div>\n            </div>\n        </ng-template>"
            },] },
];
/** @nocollapse */
NovoFileInputElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: DragulaService_1.NovoDragulaService, },
]; };
NovoFileInputElement.propDecorators = {
    'fileInput': [{ type: core_1.ViewChild, args: ['fileInput',] },],
    'fileOutput': [{ type: core_1.ViewChild, args: ['fileOutput',] },],
    'container': [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] },],
    'name': [{ type: core_1.Input },],
    'multiple': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'layoutOptions': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
};
exports.NovoFileInputElement = NovoFileInputElement;
//# sourceMappingURL=FileInput.js.map