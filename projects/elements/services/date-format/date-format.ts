// NG2
import { Injectable } from '@angular/core';
import { MaskedEnum, MaskedRange } from 'imask';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoLabelService } from '../labels/novo-label-service';

@Injectable({
  providedIn: `root`,
})
export class DateFormatService {
  constructor(private labels: NovoLabelService) {}

 getTimeMask(militaryTime: boolean) {
  const amFormat = this.labels.timeFormatAM.toUpperCase();
  const pmFormat = this.labels.timeFormatPM.toUpperCase();
  const mask = {
    mask: Date,
    pattern: militaryTime ? 'HH:mm' : 'hh:mm aa',
    overwrite: true,
    autofix: true,
    lazy: false,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),
    prepare(str) {
      return str.toUpperCase();
    },
    format(date) {
      return DateUtil.format(date, militaryTime ? 'HH:mm' : 'hh:mm A');
    },
    parse: (str) => {
      const time = militaryTime ? str : this.convertTime12to24(str);
      return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
    },
    blocks: {
      HH: {
        mask: MaskedRange,
        placeholderChar: 'H',
        maxLength: 2,
        from: 0,
        to: 23,
      },
      hh: {
        mask: MaskedRange,
        placeholderChar: 'h',
        maxLength: 2,
        from: 1,
        to: 12,
      },
      mm: {
        mask: MaskedRange,
        placeholderChar: 'm',
        maxLength: 2,
        from: 0,
        to: 59,
      },
      aa: {
        mask: MaskedEnum,
        placeholderChar: 'x',
        enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
      },
    },
  };
  return mask;
 }

  getDateMask() {
    const mask = {
      mask: Date,
      pattern: 'm/`d/`Y',
      overwrite: true,
      autofix: 'pad',
      min: new Date(1970, 0, 1),
      max: new Date(2030, 0, 1),
      prepare(str) {
        return str.toUpperCase();
      },
      format(date) {
        return DateUtil.format(date, 'MM/DD/YYYY');
      },
      parse: (str) => {
        return DateUtil.parse(str);
      },
    }
    return mask;
  }

  getDateTimeMask(militaryTime: boolean = false): Array<any> {
    return [this.getDateMask(), /\,?/, /\s/, this.getTimeMask(militaryTime)];
  }

  getTimePlaceHolder(militaryTime: boolean): string {
    if (militaryTime) {
      return this.labels.timeFormatPlaceholder24Hour;
    }
    return this.labels.timeFormatPlaceholderAM;
  }

  parseDateString(dateString: string): [Date, string, boolean] {
    let dateFormat: string = this.labels.dateFormatString();
    const dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi;
    const dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi;
    let dateFormatTokens: Array<string>;
    let dateValueTokens: Array<string>;
    let year: number;
    let month: number;
    let day: number;
    let date: Date = null;
    let isInvalidDate = true;
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
          month = parseInt(dateValueTokens[i], 10) - 1;
        } else if (dateFormatTokens[i].includes('d')) {
          day = parseInt(dateValueTokens[i], 10);
        } else {
          year = parseInt(dateValueTokens[i], 10);
        }
      }
      if (month >= 0 && month <= 11 && year > 1900 && day > 0 && day <= 31) {
        date = new Date(year, month, day);
        isInvalidDate = false;
      }
    } else if (dateFormatTokens && dateFormatTokens.length === 4 && dateString.length >= 1) {
      const twoTokens = /\d{1,4}(\/|\.|\-)(\d{1,2})/.exec(dateString);
      const oneToken = /^(\d{1,4})$/.exec(dateString);
      const delimiter = /\w+(\/|\.|\-)\w+[\/|\.|\-]\w+/gi.exec(dateFormat);
      const dateStringWithDelimiter = dateString[dateString.length - 1].match(/\/|\.|\-/);
      if (twoTokens && twoTokens.length === 3 && this.isValidDatePart(twoTokens[2], dateFormatTokens[2]) && !dateStringWithDelimiter) {
        dateString = `${dateString}${delimiter[1]}`;
      } else if (oneToken && oneToken.length === 2 && this.isValidDatePart(oneToken[1], dateFormatTokens[1]) && !dateStringWithDelimiter) {
        dateString = `${dateString}${delimiter[1]}`;
      }
    }
    return [date, dateString, isInvalidDate];
  }

  parseTimeString(timeString: string, militaryTime: boolean): [Date, string] {
    const value: Date = new Date();
    let timeStringParts: Array<string>;
    let amFormat = this.labels.timeFormatAM;
    let pmFormat = this.labels.timeFormatPM;
    if (!(timeString && timeString.includes(':'))) {
      return [value, timeString];
    }
    if (!militaryTime && amFormat && pmFormat) {
      let splits: Array<string> = [];
      let pm: boolean = false;
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
        for (const item of splits) {
          if (item && item.trim().includes(':')) {
            timeStringParts = item.trim().split(':');
          }
        }
      }
      if (timeStringParts && timeStringParts.length && timeStringParts.length === 2) {
        let hours: number = parseInt(timeStringParts[0], 10);
        if (hours === 12 && pm) {
          hours = 12;
        } else if (pm) {
          hours = hours + 12;
        } else if (hours === 12) {
          hours = 0;
        }
        value.setHours(hours);
        value.setMinutes(parseInt(timeStringParts[1], 10));
        value.setSeconds(0);
      }
    } else {
      timeStringParts = /(\d{1,2}):(\d{2})/.exec(timeString);
      if (timeStringParts && timeStringParts.length && timeStringParts.length === 3) {
        value.setHours(parseInt(timeStringParts[1], 10));
        value.setMinutes(parseInt(timeStringParts[2], 10));
        value.setSeconds(0);
      }
    }
    return [value, timeString];
  }

  parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string, boolean?] {
    switch (type) {
      case 'datetime':
        const str = dateTimeString.replace(/-/g, '/');
        const parts = str.split(' ');
        const [dt, dts] = this.parseDateString(parts[0]);
        if (parts.length > 1) {
          const [tm, tms] = this.parseTimeString(parts[1], militaryTime);
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

  convertTime12to24(time12h: string) {
    const pmFormat = this.labels.timeFormatPM.toUpperCase();

    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (['PM', pmFormat].includes(modifier)) {
      hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
    }
    return `${hours}:${minutes}`;
  }

  isValidDatePart(value: string, format: string): boolean {
    const datePart = parseInt(value, 10);
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