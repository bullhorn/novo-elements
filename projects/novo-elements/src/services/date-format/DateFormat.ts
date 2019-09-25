// NG2
import { Injectable } from '@angular/core';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

@Injectable()
export class DateFormatService {
  constructor(private labels: NovoLabelService) {}

  getTimeMask(militaryTime: boolean): Array<RegExp> {
    let mask: Array<RegExp> = [/\d/, /\d/, /:/, /\d/, /\d/],
      timeFormatArray: Array<string> = [],
      timeFormatPartsArray: Array<string> = [];
    let timeFormat: string = this.labels.timeFormatPlaceholderAM.toLowerCase();
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
              mask.push(/\s|\w|\d|\./);
            }
          }
        }
      }
    }
    return mask;
  }

  getDateMask(): Array<RegExp> {
    return [/\d/, /\d|\/|\.|\-/, /\/|\.|\-|\d/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d/, /\d/];
  }

  getDateTimeMask(militaryTime: boolean = false): Array<RegExp> {
    return [...this.getDateMask(), /\,?/, /\s/, ...this.getTimeMask(militaryTime)];
  }

  getTimePlaceHolder(militaryTime: boolean): string {
    if (militaryTime) {
      return this.labels.timeFormatPlaceholder24Hour;
    }
    return this.labels.timeFormatPlaceholderAM;
  }

  parseDateString(dateString: string): [Date, string] {
    let dateFormat: string = this.labels.dateFormatString(),
      dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi,
      dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi,
      dateFormatTokens: Array<string>,
      dateValueTokens: Array<string>,
      year: number,
      month: number,
      day: number,
      date: Date = new Date();
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
      if (month >= 0 && month <= 11 && year > 1900 && day > 0 && day <= 31) {
        date = new Date(year, month, day);
      }
    } else if (dateFormatTokens && dateFormatTokens.length === 4 && dateString.length >= 1) {
      let twoTokens = /\d{1,4}(\/|\.|\-)(\d{1,2})/.exec(dateString);
      let oneToken = /^(\d{1,4})$/.exec(dateString);
      let delimiter = /\w+(\/|\.|\-)\w+[\/|\.|\-]\w+/gi.exec(dateFormat);
      let dateStringWithDelimiter = dateString[dateString.length - 1].match(/\/|\.|\-/);
      if (twoTokens && twoTokens.length === 3 && this.isValidDatePart(twoTokens[2], dateFormatTokens[2]) && !dateStringWithDelimiter) {
        dateString = `${dateString}${delimiter[1]}`;
      } else if (oneToken && oneToken.length === 2 && this.isValidDatePart(oneToken[1], dateFormatTokens[1]) && !dateStringWithDelimiter) {
        dateString = `${dateString}${delimiter[1]}`;
      }
    }
    return [date, dateString];
  }

  parseTimeString(timeString: string, militaryTime: boolean): [Date, string] {
    let value: Date = new Date(),
      timeStringParts: Array<string>,
      timeFormat: string;
    let amFormat = this.labels.timeFormatAM;
    let pmFormat = this.labels.timeFormatPM;
    if (!(timeString && timeString.includes(':'))) {
      return [value, timeString];
    }
    if (!militaryTime && amFormat && pmFormat) {
      let splits: Array<string> = [],
        pm: boolean = false;
      amFormat = this.labels.timeFormatAM.toLowerCase();
      pmFormat = this.labels.timeFormatPM.toLowerCase();
      timeString = timeString.toLowerCase();
      if (timeString.includes(amFormat)) {
        splits = timeString.split(amFormat);
      } else if (timeString.includes(pmFormat)) {
        splits = timeString.split(pmFormat);
        pm = true;
      }
      if (splits && splits.length) {
        for (let item of splits) {
          if (item && item.trim().includes(':')) {
            timeStringParts = item.trim().split(':');
          }
        }
      }
      if (timeStringParts && timeStringParts.length && timeStringParts.length === 2) {
        let hours: number = parseInt(timeStringParts[0]);
        if (hours === 12 && pm) {
          hours = 12;
        } else if (pm) {
          hours = hours + 12;
        } else if (hours === 12) {
          hours = 0;
        }
        value.setHours(hours);
        value.setMinutes(parseInt(timeStringParts[1]));
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
    return [value, timeString];
  }

  parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string] {
    switch (type) {
      case 'datetime':
        let str = dateTimeString.replace(/-/g, '/');
        let parts = str.split(' ');
        let [dt, dts] = this.parseDateString(parts[0]);
        if (parts.length > 1) {
          let [tm, tms] = this.parseTimeString(parts[1], militaryTime);
          return [new Date(dt.setHours(tm.getHours(), tm.getMinutes())), `${dts} ${tms}`];
        }
        return [dt, dts];
      case 'date':
        return this.parseDateString(dateTimeString);
      case 'time':
        return this.parseTimeString(dateTimeString, militaryTime);
      default:
        return;
    }
  }

  isValidDatePart(value: string, format: string): boolean {
    let datePart = parseInt(value);
    if (format.includes('m') && (datePart >= 2 || value.length === 2)) {
      return true;
    } else if (format.includes('d') && (datePart >= 4 || value.length === 2)) {
      return true;
    } else if (format.includes('y') && datePart >= 1000) {
      return true;
    }
    return false;
  }
}
