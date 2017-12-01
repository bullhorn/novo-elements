"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// Vendor
var dragula = require("dragula");
var NovoDragulaService = (function () {
    function NovoDragulaService() {
        this.cancel = new core_1.EventEmitter();
        this.cloned = new core_1.EventEmitter();
        this.drag = new core_1.EventEmitter();
        this.dragend = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
        this.out = new core_1.EventEmitter();
        this.over = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.shadow = new core_1.EventEmitter();
        this.dropModel = new core_1.EventEmitter();
        this.removeModel = new core_1.EventEmitter();
        this.events = [
            'cancel',
            'cloned',
            'drag',
            'dragend',
            'drop',
            'out',
            'over',
            'remove',
            'shadow',
            'dropModel',
            'removeModel'
        ];
        this.bags = [];
    }
    /**
     * @name add
     * @param name
     * @param drake
     * @returns {*}
     */
    NovoDragulaService.prototype.add = function (name, drake) {
        var bag = this.find(name);
        if (bag) {
            throw new Error("Bag named: " + name + " already exists.");
        }
        bag = {
            name: name,
            drake: drake
        };
        this.bags.push(bag);
        if (drake.models) {
            this.handleModels(name, drake);
        }
        if (!bag.initEvents) {
            this.setupEvents(bag);
        }
        return bag;
    };
    /**
     * @name find
     * @param name
     * @returns {*}
     */
    NovoDragulaService.prototype.find = function (name) {
        for (var i = 0; i < this.bags.length; i++) {
            if (this.bags[i].name === name) {
                return this.bags[i];
            }
        }
        return null;
    };
    /**
     * @name destroy
     * @param name
     */
    NovoDragulaService.prototype.destroy = function (name) {
        var bag = this.find(name);
        var i = this.bags.indexOf(bag);
        this.bags.splice(i, 1);
        bag.drake.destroy();
    };
    /**
     * @name setOptions
     * @param name
     * @param options
     */
    NovoDragulaService.prototype.setOptions = function (name, options) {
        var bag = this.add(name, dragula(options));
        this.handleModels(name, bag.drake);
    };
    /**
     * @name handleModels
     * @param name
     * @param drake
     */
    NovoDragulaService.prototype.handleModels = function (name, drake) {
        var _this = this;
        var dragElm;
        var dragIndex;
        var dropIndex;
        var sourceModel;
        drake.on('remove', function (el, source) {
            if (!drake.models) {
                return;
            }
            sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel.splice(dragIndex, 1);
            _this.removeModel.emit([name, el, source]);
        });
        drake.on('drag', function (el, source) {
            dragElm = el;
            dragIndex = _this.domIndexOf(el, source);
        });
        drake.on('drop', function (dropElm, target, source) {
            if (!drake.models) {
                return;
            }
            dropIndex = _this.domIndexOf(dropElm, target);
            sourceModel = drake.models[drake.containers.indexOf(source)];
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                var notCopy = dragElm === dropElm;
                var targetModel = drake.models[drake.containers.indexOf(target)];
                var dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
            _this.dropModel.emit([name, dropElm, target, source]);
        });
    };
    /**
     * @name setupEvents
     * @param bag
     */
    NovoDragulaService.prototype.setupEvents = function (bag) {
        bag.initEvents = true;
        var that = this;
        var emitter = function (type) {
            function replicate() {
                var args = Array.prototype.slice.call(arguments);
                that[type].emit([bag.name].concat(args));
            }
            bag.drake.on(type, replicate);
        };
        this.events.forEach(emitter);
    };
    /**
     * @name domIndexOf
     * @param child
     * @param parent
     * @returns {*}
     */
    NovoDragulaService.prototype.domIndexOf = function (child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    };
    return NovoDragulaService;
}());
NovoDragulaService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NovoDragulaService.ctorParameters = function () { return []; };
exports.NovoDragulaService = NovoDragulaService;
//# sourceMappingURL=DragulaService.js.map