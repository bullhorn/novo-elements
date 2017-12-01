"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers = (function () {
    function Helpers() {
    }
    /**
     * Swallows an event to stop further execution
     * @param event
     */
    Helpers.swallowEvent = function (event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * Interpolates a string with vars passed to it
     * @param  {String} str   The string to interpolate
     * @param  {Object} props The params to replace in string.
     * @return {String}
     */
    Helpers.interpolate = function (str, props) {
        return str.replace(/\$([\w\.]+)/g, function (original, key) {
            var keys = key.split('.');
            var value = props[keys.shift()];
            while (keys.length && value !== undefined) {
                var k = keys.shift();
                value = k ? value[k] : value + ".";
            }
            return value !== undefined ? value : original;
        });
    };
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param  {String} str   The string to interpolate
     * @param  {Object} props The params to replace in string.
     * @return {Boolean}
     */
    Helpers.validateInterpolationProps = function (str, props) {
        var keys = str.match(/\$([\w\.]+)/g);
        return keys.every(function (key) {
            return props.hasOwnProperty(key.substr(1));
        });
    };
    Helpers.isObject = function (item) {
        return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
    };
    /**
     * Checks to see if the object is a string
     */
    Helpers.isString = function (obj) {
        return typeof obj === 'string';
    };
    /**
     * Checks to see if the object is a undefined or null
     */
    Helpers.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    /**
     * Checks to see if the object is a undefined or null
     */
    Helpers.isEmpty = function (obj) {
        return Helpers.isBlank(obj) || obj === '' || (Array.isArray(obj) && obj.length === 0);
    };
    /**
     * Checks to see if the object is a function
     */
    Helpers.isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };
    /**
     * Checks to see if the object is a Date
     */
    Helpers.isDate = function (obj) {
        return obj instanceof Date;
    };
    Helpers.sortByField = function (fields, reverse) {
        if (reverse === void 0) { reverse = false; }
        return function (previous, current) {
            if (Helpers.isFunction(fields)) {
                return fields((reverse) ? 'desc' : 'asc', previous, current);
            }
            if (!Array.isArray(fields)) {
                fields = [fields];
            }
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var first = previous[field] || '';
                var second = current[field] || '';
                if (Helpers.isDate(first) && Helpers.isDate(second)) {
                    // Dates
                    first = first.getTime();
                    second = second.getTime();
                }
                else if (Helpers.isString(first) && Helpers.isString(second)) {
                    // Basic strings
                    first = first.toLowerCase();
                    second = second.toLowerCase();
                }
                else {
                    // Numbers
                    first = isNaN(Number(first)) ? first : Number(first);
                    second = isNaN(Number(second)) ? second : Number(second);
                }
                if (first > second) {
                    return (reverse) ? -1 : 1;
                }
                else if (first < second) {
                    return (reverse) ? 1 : -1;
                }
            }
            return 0;
        };
    };
    Helpers.filterByField = function (key, value) {
        return function (item) {
            var results = [];
            var field = can(item).have(key);
            if (value instanceof Function) {
                results.push(value(field, item));
            }
            else if (Array.isArray(value)) {
                results.push(value.includes(field));
            }
            else if (value instanceof Object) {
                if (field instanceof Date) {
                    field = field.getTime();
                }
                if (value.min) {
                    results.push(field > value.min);
                }
                if (value.max) {
                    results.push(field < value.max);
                }
                if (value.any && Array.isArray(value.any)) {
                    if (Array.isArray(field)) {
                        results.push(value.any.some(function (v) { return field.includes(v); }));
                    }
                    else {
                        results.push(value.any.includes(field));
                    }
                }
                if (value.all && Array.isArray(value.all)) {
                    results.push(value.all.every(function (v) { return field.includes(v); }));
                }
                if (value.not) {
                    results.push(!Helpers.filterByField(key, value.not)(item));
                }
                for (var subkey in value) {
                    if (['min', 'max', 'any', 'all', 'not'].indexOf(subkey) < 0) {
                        var subvalue = value[subkey];
                        results.push(Helpers.filterByField(key + "." + subkey, subvalue)(item));
                    }
                }
            }
            else {
                results.push(JSON.stringify(field).match(new RegExp(value, 'gi')));
            }
            return results.every(function (x) { return x; });
        };
    };
    Helpers.calcPositionOffset = function (position, element, side) {
        if (!position) {
            return;
        }
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
        var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ?
            document.documentElement.scrollLeft : document.body.scrollLeft;
        var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ?
            document.documentElement.scrollTop : document.body.scrollTop;
        var sideOffset = 0;
        if (side === 'right') {
            sideOffset = position.width - element.clientWidth;
        }
        var top = position.top + y + position.height + 10 + "px";
        var left = position.left + x + sideOffset + "px";
        var width = position.width + "px";
        var clientWidth = element.clientWidth, clientHeight = element.clientHeight, marginFromBottom = parseInt(top) + clientHeight, marginFromRight = parseInt(left) + clientWidth, windowScrollHeight = window.innerHeight + window.scrollY, windowScrollWidth = window.innerWidth + window.scrollX;
        // Force open up
        if (marginFromBottom >= windowScrollHeight) {
            top = parseInt(top.replace('px', '')) - clientHeight - position.height - 20 + "px";
        }
        // Force open right
        if (marginFromRight >= windowScrollWidth) {
            left = parseInt(left.replace('px', '')) - clientWidth + position.width + "px";
        }
        // Force open middle
        if (parseInt(top.replace('px', '')) <= window.scrollY) {
            top = parseInt(top.replace('px', '')) + (clientHeight / 2) + (position.height / 2) + 10 + "px";
        }
        // Force open left
        if (parseInt(left.replace('px', '')) <= window.scrollX) {
            left = parseInt(left.replace('px', '')) + (clientWidth / 2) + (position.width * 2) - 4 + "px";
        }
        return { top: top, left: left, width: width };
    };
    Helpers.findAncestor = function (element, selector) {
        while ((element = element.parentElement) && !(element.matches.call(element, selector)))
            ; // tslint:disable-line
        return element;
    };
    Helpers.deepClone = function (item) {
        if (Array.isArray(item)) {
            var newArr = [];
            for (var i = item.length; i-- > 0;) {
                newArr[i] = Helpers.deepClone(item[i]);
            }
            return newArr;
        }
        if (typeof item === 'function' && !(/\(\) \{ \[native/).test(item.toString())) {
            var obj = void 0;
            eval('obj = ' + item.toString()); // tslint:disable-line
            for (var k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        if (item && typeof item === 'object') {
            var obj = {};
            for (var k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        return item;
    };
    Helpers.deepAssign = function () {
        var objs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objs[_i] = arguments[_i];
        }
        if (objs.length < 2) {
            throw new Error('Need two or more objects to merge');
        }
        var target = Object.assign({}, objs[0]);
        var _loop_1 = function (i) {
            var source = Object.assign({}, objs[i]);
            Object.keys(source).forEach(function (prop) {
                var value = source[prop];
                if (Helpers.isObject(value)) {
                    if (target.hasOwnProperty(prop) && Helpers.isObject(target[prop])) {
                        target[prop] = Helpers.deepAssign(target[prop], value);
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else if (Array.isArray(value)) {
                    if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {
                        var targetArray_1 = target[prop];
                        value.forEach(function (sourceItem, itemIndex) {
                            if (itemIndex < targetArray_1.length) {
                                var targetItem = targetArray_1[itemIndex];
                                if (Object.is(targetItem, sourceItem)) {
                                    return;
                                }
                                if (Helpers.isObject(targetItem) && Helpers.isObject(sourceItem)) {
                                    targetArray_1[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else if (Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                                    targetArray_1[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else {
                                    targetArray_1[itemIndex] = sourceItem;
                                }
                            }
                            else {
                                targetArray_1.push(sourceItem);
                            }
                        });
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else {
                    target[prop] = value;
                }
            });
        };
        for (var i = 1; i < objs.length; i++) {
            _loop_1(i);
        }
        return target;
    };
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    Helpers.getNextElementSibling = function (element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        else {
            var e = element.nextSibling;
            while (e && 1 !== e.nodeType) {
                e = e.nextSibling;
            }
            return e;
        }
    };
    return Helpers;
}());
exports.Helpers = Helpers;
var Can = (function () {
    function Can(obj) {
        this.obj = obj;
    }
    Can.prototype.have = function (key) {
        var props = key.split('.');
        var item = this.obj;
        for (var i = 0; i < props.length; i++) {
            item = item[props[i]];
            if (this.check(item) === false) {
                return item;
            }
        }
        return item;
    };
    Can.prototype.check = function (thing) {
        return thing !== void 0;
    };
    return Can;
}());
exports.Can = Can;
/**
 * @param {any} obj
 * @returns
 */
function can(obj) {
    return new Can(obj);
}
exports.can = can;
//# sourceMappingURL=Helpers.js.map