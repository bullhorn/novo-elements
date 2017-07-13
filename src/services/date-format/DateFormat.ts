// NG2
import { Injectable } from '@angular/core';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

@Injectable()
export class DateFormatService {
    constructor (private labels: NovoLabelService) {}

    getTimeMask(militaryTime: boolean): Array<RegExp> {
        let mask: Array<RegExp> = [/\d/, /\d/, /:/, /\d/, /\d/], timeFormatArray: Array<string> = [], timeFormatPartsArray: Array<string> = [];
        let timeFormat: string = this.labels.timeFormatAM.toLowerCase();
        if (militaryTime) {
            return mask;
        } else {
            timeFormatArray = timeFormat.split('hh:mm');
            if (timeFormatArray && timeFormatArray.length) {
                mask = [];
                for (let timeFormatPart of timeFormatArray) {
                    if (timeFormatPart === '') {
                        mask = mask.concat([/\d/, /\d|:/, /:|\d/, /\d|\w|\s/, /\d|\s|\w/]);
                    } else if (timeFormatPart.length) {
                        for (let i = 0; i < timeFormatPart.length; i++) {
                            mask.push(/\s|\w|\d/);
                        }
                    }
                }
            }
        }
        return mask;
    }

    getDateTimeMask(militaryTime: boolean): Array<RegExp> {
        let dateMask: Array<RegExp>, timeMask: Array<RegExp>;
        dateMask = this.getDateMask();
        timeMask = this.getTimeMask(militaryTime);
        return dateMask.concat([/\,/]).concat(timeMask);
    }

    getDateMask(): Array<RegExp> {
        let mask: Array<RegExp> = [], dateFormatArray: Array<string> = [];
        let dateFormat: string = this.labels.dateFormat;
        if (Helpers.isEmpty(dateFormat)) {
            // Default mask for dd/MM/yyyy or MM/dd/yyyy
            return [ /\d/, /\d/, /\//, /\d/, /\d/, /\//, /\d/, /\d/, /\d/, /\d/];
        }
        dateFormat = dateFormat.toLowerCase();
        if (!dateFormat.match('mm') && dateFormat.includes('m')) {
            dateFormat = dateFormat.replace('m', 'mm');
        }
        if (!dateFormat.match('dd') && dateFormat.includes('d')) {
            dateFormat = dateFormat.replace('d', 'dd');
        }
        dateFormatArray = dateFormat.split('');
        for (let char of dateFormatArray) {
            if (['m', 'd', 'y'].includes(char)) {
                mask.push(/\d/);
            } else {
                mask.push(new RegExp(char));
            }
        }
        return mask;
    }

    getTimePlaceHolder(militaryTime: boolean): string {
        if (militaryTime) {
            return this.labels.timeFormatPlaceholder24Hour;
        }
        return this.labels.timeFormatPlaceholderAM;
    }

    parseDateString(dateString: string): Date {
        let dateFormat: string = this.labels.dateFormat,
            dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi,
            dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi,
            dateFormatTokens: Array<string>, dateValueTokens: Array<string>, year: number, month: number, day: number, date: Date;
        if (Helpers.isEmpty(dateFormat)) {
            // Default to MM/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        } else {
            dateFormat = dateFormat.toLowerCase();
        }
        dateFormatTokens = dateFormatRegex.exec(dateFormat);
        dateValueTokens = dateValueRegex.exec(dateString);
        if (dateFormatTokens && dateFormatTokens.length === 4 && dateValueTokens && dateValueTokens.length === 4) {
            for (let i = 1; i < 4; i++) {
                if (dateFormatTokens[i].includes('m')) {
                    month = parseInt(dateValueTokens[i]) - 1;
                } else if (dateFormatTokens[i].includes('d')) {
                    day = parseInt(dateValueTokens[i]);
                } else {
                    year = parseInt(dateValueTokens[i]);
                }
            }
            if (month >= 0 && year > 0 && day > 0) {
                date = new Date(year, month, day);
            }
        }
        return date;
    }

    parseTimeString(timeString: string, militaryTime: boolean): Date {
        let value: Date = new Date(), timeStringParts: Array<string>, timeFormat: string;
        let amPrefixRegex: RegExp = /[\w\s]{0,3}(\d{1,2}):(\d{1,2})/;
        let amSuffixRegex: RegExp = /(\d{1,2}):(\d{1,2})[\w\s]{0,3}/;
        if (!(timeString && timeString.includes(':'))) {
            return value;
        }
        if (!militaryTime) { //TODO: (arajiv) account for am/pm!!!! pm = +12 hours :(), account for A.M/P.M
            timeFormat = this.labels.timeFormatAM.toLowerCase();
            if (timeFormat.match(/hh:mm[\w\s]{0,3}/ig)) {
                timeStringParts = amSuffixRegex.exec(timeString);
            } else {
                timeStringParts = amPrefixRegex.exec(timeString);
            }
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 3) {
                value.setHours(parseInt(timeStringParts[1]));
                value.setMinutes(parseInt(timeStringParts[2]));
                value.setSeconds(0);
            }
        } else {
            timeStringParts = /(\d{1,2}):(\d{2})/.exec(timeString);
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 3) {
                value.setHours(parseInt(timeStringParts[1]));
                value.setMinutes(parseInt(timeStringParts[2]));
                value.setSeconds(0);
            }
        }
        return value;
    }

    parseDateTimeString(dateTimeString: string, militaryTime: boolean): Date {
        let dateString: string, timeString: string, dateTimevalue: Date, timeValue: Date;
        [dateString, timeString] = dateTimeString.split(','); //TODO: trim spaces
        if (!dateString || !timeString) {
            return;
        }
        dateTimevalue = this.parseDateString(dateString);
        timeValue = this.parseTimeString(timeString, militaryTime);
        dateTimevalue.setMinutes(timeValue.getMinutes());
        dateTimevalue.setHours(timeValue.getHours());
        dateTimevalue.setSeconds(0);
        return dateTimevalue;
    }

    parseString(dateTimeString: string, militaryTime: boolean, type: string) {
        switch (type) {
            case 'date':
                return this.parseDateString(dateTimeString);
            case 'time':
                return this.parseTimeString(dateTimeString, militaryTime);
            case 'date-time':
                return this.parseDateTimeString(dateTimeString, militaryTime);
            default:
                return;
        }
    }

}
