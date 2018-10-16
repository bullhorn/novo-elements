// APP
import { DateFormatService } from './DateFormat';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Service: DateFormatService', () => {
  let service;

  beforeEach(() => {
    service = new DateFormatService(new NovoLabelService());
  });

  describe('Function: getDateMask()', () => {
    it('should be defined', () => {
      expect(service.getDateMask).toBeDefined();
    });
    it('should return a default mask', () => {
      service.labels.dateFormat = '';
      let actual = service.getDateMask();
      expect(actual.length).toBeGreaterThan(0);
    });
    it('should return a mask that supports a date with format dd-MM-yyyy', () => {
      let value = '11-02-2017';
      let dateMask = service.getDateMask();
      for (let i in dateMask) {
        if (dateMask[i]) {
          expect(value[i].match(dateMask[i])).toBeTruthy();
        }
      }
    });
    it('should return a mask that supports dd.MM.yyyy', () => {
      let value = '11.02.2017';
      let dateMask = service.getDateMask();
      for (let i in dateMask) {
        if (dateMask[i]) {
          expect(value[i].match(dateMask[i])).toBeTruthy();
        }
      }
    });
    it('should return a mask that supports d/M/yyyy', () => {
      let value: Array<string> = '1/2/2017'.split('');
      let dateMask = service.getDateMask();
      value.forEach((v, i) => {
        expect(v.match(dateMask[i])).toBeTruthy();
      });
    });
    it('should return a mask that supports M/d/yyyy', () => {
      let value: Array<string> = '11/2/2017'.split('');
      let dateMask = service.getDateMask();
      value.forEach((v, i) => {
        expect(v.match(dateMask[i])).toBeTruthy();
      });
    });
  });

  describe('Function: getTimeMask()', () => {
    it('should be defined', () => {
      expect(service.getTimeMask).toBeDefined();
    });
    describe('For Military Time', () => {
      let militaryTimeMask;
      beforeEach(() => {
        militaryTimeMask = service.getTimeMask(true);
      });
      it('should work for 1:23', () => {
        let timeString = '01:23'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(militaryTimeMask[i])).toBeTruthy();
        });
      });
      it('should work for 12:23', () => {
        let timeString = '12:23'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(militaryTimeMask[i])).toBeTruthy();
        });
      });
      it('should work for 00:23', () => {
        let timeString = '00:23'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(militaryTimeMask[i])).toBeTruthy();
        });
      });
      it('should work for 23:23', () => {
        let timeString = '23:23'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(militaryTimeMask[i])).toBeTruthy();
        });
      });
    });
    describe('For 12hour time', () => {
      it('should work for 12:23am', () => {
        let timeMask = service.getTimeMask(false);
        let timeString = '12:23am'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
      it('should work for 12:23pm', () => {
        let timeMask = service.getTimeMask(false);
        let timeString = '12:23pm'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
      it('should work for 1:23pm', () => {
        let timeMask = service.getTimeMask(false);
        let timeString = '1:23pm'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
      it('should work for 1:23am', () => {
        let timeMask = service.getTimeMask(false);
        let timeString = '1:23am'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
      it('should work for 1:23 A.M.', () => {
        service.labels.timeFormatPlaceholderAM = 'hh:mm A.M.';
        let timeMask = service.getTimeMask(false);
        let timeString = '1:23 A.M.'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
      it('should work for 1:23 P.M.', () => {
        service.labels.timeFormatPlaceholderAM = 'hh:mm A.M.';
        let timeMask = service.getTimeMask(false);
        let timeString = '1:23 P.M.'.split('');
        timeString.forEach((v, i) => {
          expect(v.match(timeMask[i])).toBeTruthy();
        });
      });
    });
  });

  describe('Function: getTimePlaceHolder(militaryTime: boolean): string', () => {
    it('should be defined', () => {
      expect(service.getTimePlaceHolder).toBeDefined();
    });
    it('should get the right placeholder for 24 hour time', () => {
      service.labels.timeFormatPlaceholder24Hour = 'stuff';
      expect(service.getTimePlaceHolder(true)).toEqual(service.labels.timeFormatPlaceholder24Hour);
    });
    it('should get the right placeholder for 12 hour time', () => {
      service.labels.timeFormatPlaceholderAM = 'stuff';
      expect(service.getTimePlaceHolder()).toEqual(service.labels.timeFormatPlaceholderAM);
    });
  });

  describe('Function: parseDateString(dateString: string): Date', () => {
    it('should be defined', () => {
      expect(service.parseDateString).toBeDefined();
    });
    describe('when dateFormat is not defined', () => {
      beforeEach(() => {
        service.labels.dateFormat = '';
      });
      it('should parse the date string using mm/dd/yyyy', () => {
        let dateString = '1/22/2017',
          dateValue;
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should default to current date when dateString in an unsupported format ', () => {
        let dateString = '22-22-2017',
          dateValue,
          expectedDateValue = new Date();
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(expectedDateValue.getMonth());
        expect(dateValue.getDate()).toEqual(expectedDateValue.getDate());
        expect(dateValue.getFullYear()).toEqual(expectedDateValue.getFullYear());
      });
    });
    describe('when dateFormat is defined', () => {
      it('should parse the date string using dd/mm/yyyy', () => {
        let dateString = '11/2/2017',
          dateValue;
        service.labels.dateFormat = 'dd/mm/yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(1);
        expect(dateValue.getDate()).toEqual(11);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using M-d-yyyy', () => {
        let dateString = '2-11-2017',
          dateValue;
        service.labels.dateFormat = 'M-d-yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(1);
        expect(dateValue.getDate()).toEqual(11);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using dd.MM.yyyy', () => {
        let dateString = '22.01.2017',
          dateValue;
        service.labels.dateFormat = 'dd.MM.yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using yyyy-MM-dd', () => {
        let dateString = '2017-01-22',
          dateValue;
        service.labels.dateFormat = 'yyyy-MM-dd';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
    });
    describe('when dateString is an incomplete date value ', () => {
      describe('and only 1 digit is filled in', () => {
        it('should not append delimiter for dd-MM-yyyy when value = 1', () => {
          let dateString = '1',
            dateValue;
          service.labels.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('1');
        });
        it('should append delimiter for dd-MM-yyyy when value = 4', () => {
          let dateString = '4',
            dateValue;
          service.labels.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4-');
        });
        it('should append delimiter for dd-MM-yyyy when value = 21', () => {
          let dateString = '21',
            dateValue;
          service.labels.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('21-');
        });
        it('should fill in the right delimiter for dd.MM.yyyy when value = 5', () => {
          let dateString = '5',
            dateValue;
          service.labels.dateFormat = 'dd.MM.yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('5.');
        });
      });
      describe('when 2 date-part digits are filled in', () => {
        it('should append the right delimiter for d/M/yyyy', () => {
          let dateString = '4/11',
            dateValue;
          service.labels.dateFormat = 'd/M/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/11/');
        });
        it('should not append the right delimiter for d/M/yyyy when value = 2/1', () => {
          let dateString = '2/1',
            dateValue;
          service.labels.dateFormat = 'd/M/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('2/1');
        });
        it('should not append the right delimiter for M/d/yyyy when value = 4/3', () => {
          let dateString = '4/3',
            dateValue;
          service.labels.dateFormat = 'M/d/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/3');
        });
        it('should append the right delimiter for M/d/yyyy when value = 4/30', () => {
          let dateString = '4/30',
            dateValue;
          service.labels.dateFormat = 'M/d/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/30/');
        });
      });
    });
  });

  describe('Function: parseTimeString(timeString: string, militaryTime: boolean): Date', () => {
    it('should be defined', () => {
      expect(service.parseTimeString).toBeDefined();
    });
    it('should not parse if the string doesn\'t contain :', () => {
      let [value, timeString] = service.parseTimeString('', false);
      expect(timeString).toEqual('');
    });
    describe('for 24hour time', () => {
      it('should parse 1:45', () => {
        let [value, timeString] = service.parseTimeString('1:45', true);
        expect(value.getHours()).toEqual(1);
        expect(value.getMinutes()).toEqual(45);
      });
      it('should parse 07:45', () => {
        let [value, timeString] = service.parseTimeString('07:45', true);
        expect(value.getHours()).toEqual(7);
        expect(value.getMinutes()).toEqual(45);
      });
      it('should parse 12:45', () => {
        let [value, timeString] = service.parseTimeString('12:45', true);
        expect(value.getHours()).toEqual(12);
        expect(value.getMinutes()).toEqual(45);
      });
    });
    describe('for 12hour time', () => {
      describe('when timeString has an AM value', () => {
        beforeEach(() => {
          service.labels.timeFormatPlaceholderAM = 'hh:mm AM';
          service.labels.timeFormatAM = 'AM';
          service.labels.timeFormatPM = 'PM';
        });
        it('should convert 12:45 AM to 00:45', () => {
          let [value, timeString] = service.parseTimeString('12:45AM', false);
          expect(value.getHours()).toEqual(0);
          expect(value.getMinutes()).toEqual(45);
        });
        it('should convert 1:45 AM to 1:45', () => {
          let [value, timeString] = service.parseTimeString('12:45AM', false);
          expect(value.getHours()).toEqual(0);
          expect(value.getMinutes()).toEqual(45);
        });
      });
      describe('when timeString has a P.M. value', () => {
        beforeEach(() => {
          service.labels.timeFormatPlaceholderAM = 'hh:mm A.M.';
          service.labels.timeFormatAM = 'A.M.';
          service.labels.timeFormatPM = 'P.M.';
        });
        it('should convert 1:45 P.M. to 13:45', () => {
          let [value, timeString] = service.parseTimeString('1:45 P.M.', false);
          expect(value.getHours()).toEqual(13);
          expect(value.getMinutes()).toEqual(45);
        });
        it('should convert 12:45 P.M. to 12:45', () => {
          let [value, timeString] = service.parseTimeString('12:45 P.M.', false);
          expect(value.getHours()).toEqual(12);
          expect(value.getMinutes()).toEqual(45);
        });
      });
    });
  });

  describe('Function: parseString(dateTimeString: string, militaryTime: boolean, type: string)', () => {
    it('should be defined', () => {
      expect(service.parseString).toBeDefined();
    });
    it('should call parseDateString for dates', () => {
      spyOn(service, 'parseDateString');
      service.parseString('', false, 'date');
      expect(service.parseDateString).toHaveBeenCalled();
    });
    it('should call parseTimeString for time', () => {
      spyOn(service, 'parseTimeString');
      service.parseString('', false, 'time');
      expect(service.parseTimeString).toHaveBeenCalledWith('', false);
    });
  });

  describe('Function: isValidDatePart(value: string, format: string): boolean', () => {
    it('should be defined', () => {
      expect(service.isValidDatePart).toBeDefined();
    });
    it('should return false if format is m and value is 1', () => {
      expect(service.isValidDatePart('1', 'm')).toEqual(false);
    });
    it('should return true if format is m and value is 3', () => {
      expect(service.isValidDatePart('3', 'm')).toEqual(true);
    });
    it('should return false if format is m and value is 0', () => {
      expect(service.isValidDatePart('0', 'm')).toEqual(false);
    });
    it('should return false if format is d and value is 0', () => {
      expect(service.isValidDatePart('0', 'd')).toEqual(false);
    });
    it('should return false if format is d and value is 2', () => {
      expect(service.isValidDatePart('2', 'd')).toEqual(false);
    });
    it('should return true if format is d and value is 4', () => {
      expect(service.isValidDatePart('4', 'd')).toEqual(true);
    });
    it('should return false if format is y and value is 1', () => {
      expect(service.isValidDatePart('1', 'yyyy')).toEqual(false);
    });
    it('should return true if format is y and value is 1900', () => {
      expect(service.isValidDatePart('1900', 'yyyy')).toEqual(true);
    });
  });
});
