"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
var DateFormatService = (function () {
    function DateFormatService(labels) {
        this.labels = labels;
    }
    DateFormatService.prototype.getTimeMask = function (militaryTime) {
        var mask = [/\d/, /\d/, /:/, /\d/, /\d/], timeFormatArray = [], timeFormatPartsArray = [];
        var timeFormat = this.labels.timeFormatPlaceholderAM.toLowerCase();
        if (militaryTime) {
            return mask;
        }
        else {
            timeFormatArray = timeFormat.split('hh:mm');
            if (timeFormatArray && timeFormatArray.length) {
                mask = [];
                for (var _i = 0, timeFormatArray_1 = timeFormatArray; _i < timeFormatArray_1.length; _i++) {
                    var timeFormatPart = timeFormatArray_1[_i];
                    if (timeFormatPart === '') {
                        mask = mask.concat([/\d/, /\d|:/, /:|\d/, /\d|\w|\s/, /\d|\s|\w/]);
                    }
                    else if (timeFormatPart.length) {
                        for (var i = 0; i < timeFormatPart.length; i++) {
                            mask.push(/\s|\w|\d|\./);
                        }
                    }
                }
            }
        }
        return mask;
    };
    DateFormatService.prototype.getDateMask = function () {
        return [/\d/, /\d|\/|\.|\-/, /\/|\.|\-|\d/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d/, /\d/];
    };
    DateFormatService.prototype.getTimePlaceHolder = function (militaryTime) {
        if (militaryTime) {
            return this.labels.timeFormatPlaceholder24Hour;
        }
        return this.labels.timeFormatPlaceholderAM;
    };
    DateFormatService.prototype.parseDateString = function (dateString) {
        var dateFormat = this.labels.dateFormat, dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi, dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi, dateFormatTokens, dateValueTokens, year, month, day, date = new Date();
        if (Helpers_1.Helpers.isEmpty(dateFormat)) {
            // Default to MM/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        }
        else {
            dateFormat = dateFormat.toLowerCase();
        }
        dateFormatTokens = dateFormatRegex.exec(dateFormat);
        dateValueTokens = dateValueRegex.exec(dateString);
        if (dateFormatTokens && dateFormatTokens.length === 4 && dateValueTokens && dateValueTokens.length === 4) {
            for (var i = 1; i < 4; i++) {
                if (dateFormatTokens[i].includes('m')) {
                    month = parseInt(dateValueTokens[i]) - 1;
                }
                else if (dateFormatTokens[i].includes('d')) {
                    day = parseInt(dateValueTokens[i]);
                }
                else {
                    year = parseInt(dateValueTokens[i]);
                }
            }
            if (month >= 0 && month <= 11 && year > 1900 && day > 0 && day <= 31) {
                date = new Date(year, month, day);
            }
        }
        else if (dateFormatTokens && dateFormatTokens.length === 4 && dateString.length >= 1) {
            var twoTokens = /\d{1,4}(\/|\.|\-)(\d{1,2})/.exec(dateString);
            var oneToken = /^(\d{1,4})$/.exec(dateString);
            var delimiter = /\w+(\/|\.|\-)\w+[\/|\.|\-]\w+/gi.exec(dateFormat);
            var dateStringWithDelimiter = dateString[dateString.length - 1].match(/\/|\.|\-/);
            if (twoTokens && twoTokens.length === 3 && this.isValidDatePart(twoTokens[2], dateFormatTokens[2]) && !dateStringWithDelimiter) {
                dateString = "" + dateString + delimiter[1];
            }
            else if (oneToken && oneToken.length === 2 && this.isValidDatePart(oneToken[1], dateFormatTokens[1]) && !dateStringWithDelimiter) {
                dateString = "" + dateString + delimiter[1];
            }
        }
        return [date, dateString];
    };
    DateFormatService.prototype.parseTimeString = function (timeString, militaryTime) {
        var value = new Date(), timeStringParts, timeFormat;
        var amFormat = this.labels.timeFormatAM;
        var pmFormat = this.labels.timeFormatPM;
        if (!(timeString && timeString.includes(':'))) {
            return [value, timeString];
        }
        if (!militaryTime && amFormat && pmFormat) {
            var splits = [], pm = false;
            amFormat = this.labels.timeFormatAM.toLowerCase();
            pmFormat = this.labels.timeFormatPM.toLowerCase();
            timeString = timeString.toLowerCase();
            if (timeString.includes(amFormat)) {
                splits = timeString.split(amFormat);
            }
            else if (timeString.includes(pmFormat)) {
                splits = timeString.split(pmFormat);
                pm = true;
            }
            if (splits && splits.length) {
                for (var _i = 0, splits_1 = splits; _i < splits_1.length; _i++) {
                    var item = splits_1[_i];
                    if (item && item.trim().includes(':')) {
                        timeStringParts = item.trim().split(':');
                    }
                }
            }
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 2) {
                var hours = parseInt(timeStringParts[0]);
                if (hours === 12 && pm) {
                    hours = 12;
                }
                else if (pm) {
                    hours = hours + 12;
                }
                else if (hours === 12) {
                    hours = 0;
                }
                value.setHours(hours);
                value.setMinutes(parseInt(timeStringParts[1]));
                value.setSeconds(0);
            }
        }
        else {
            timeStringParts = /(\d{1,2}):(\d{2})/.exec(timeString);
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 3) {
                value.setHours(parseInt(timeStringParts[1]));
                value.setMinutes(parseInt(timeStringParts[2]));
                value.setSeconds(0);
            }
        }
        return [value, timeString];
    };
    DateFormatService.prototype.parseString = function (dateTimeString, militaryTime, type) {
        switch (type) {
            case 'date':
                return this.parseDateString(dateTimeString);
            case 'time':
                return this.parseTimeString(dateTimeString, militaryTime);
            default:
                return;
        }
    };
    DateFormatService.prototype.isValidDatePart = function (value, format) {
        var datePart = parseInt(value);
        if (format.includes('m') && (datePart >= 2 || value.length === 2)) {
            return true;
        }
        else if (format.includes('d') && (datePart >= 4 || value.length === 2)) {
            return true;
        }
        else if (format.includes('y') && datePart >= 1000) {
            return true;
        }
        return false;
    };
    return DateFormatService;
}());
DateFormatService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
DateFormatService.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.DateFormatService = DateFormatService;
//# sourceMappingURL=DateFormat.js.map