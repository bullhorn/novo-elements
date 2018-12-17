// NG2
import { Injectable, Inject, Optional, LOCALE_ID } from '@angular/core';

@Injectable()
export class NovoLabelService {
  filters = 'Filter';
  clear = 'Clear';
  sort = 'Sort';
  distributionListOwner = 'Owner';
  dateAdded = 'Date Added';
  emptyTableMessage = 'No Records to display...';
  noMatchingRecordsMessage = 'No Matching Records';
  erroredTableMessage = 'Oops! An error occurred.';
  pickerError = 'Oops! An error occurred.';
  pickerEmpty = 'No results to display...';
  quickNoteError = 'Oops! An error occurred.';
  quickNoteEmpty = 'No results to display...';
  required = 'Required';
  numberTooLarge = 'Number is too large';
  save = 'Save';
  cancel = 'Cancel';
  next = 'Next';
  itemsPerPage = 'Items per page:';
  select = 'Select...';
  selected = 'Selected';
  selectAllOnPage = 'Select all on page';
  deselectAll = 'Deselect all';
  refresh = 'Refresh';
  close = 'Close';
  move = 'Move';
  startDate = 'Start Date';
  endDate = 'End Date';
  more = 'more';
  clearAll = 'CLEAR ALL';
  clearAllNormalCase = 'Clear All';
  clearSort = 'Clear Sort';
  clearFilter = 'Clear Filter';
  today = 'Today';
  now = 'Now';
  isRequired = 'is required';
  notValidYear = 'is not a valid year';
  isTooLarge = 'is too large';
  invalidAddress = 'requires at least one field filled out';
  invalidEmail = 'requires a valid email (ex. abc@123.com)';
  minLength = 'is required to be a minimum length of';
  past1Day = 'Past 1 Day';
  past7Days = 'Past 7 Days';
  past30Days = 'Past 30 Days';
  past90Days = 'Past 90 Days';
  past1Year = 'Past 1 Year';
  next1Day = 'Next 1 Day';
  next7Days = 'Next 7 Days';
  next30Days = 'Next 30 Days';
  next90Days = 'Next 90 Days';
  next1Year = 'Next 1 Year';
  customDateRange = 'Custom Date Range';
  backToPresetFilters = 'Back to Preset Filters';
  okGotIt = 'Ok, Got it';
  address = 'Address';
  address1 = 'Address';
  apt = 'Apt'; // TODO delete
  address2 = 'Apt';
  city = 'City / Locality';
  state = 'State / Region';
  zip = 'Postal Code';
  zipCode = 'Postal Code'; // TODO delete
  country = 'Country';
  or = 'or';
  clickToBrowse = 'click to browse';
  chooseAFile = 'Choose a file';
  no = 'No';
  yes = 'Yes';
  search = 'SEARCH';
  noItems = 'There are no items';
  dateFormat = 'MM/dd/yyyy';
  dateFormatPlaceholder = 'MM/DD/YYYY';
  timeFormatPlaceholderAM = 'hh:mm AM';
  timeFormatPlaceholder24Hour = 'HH:mm';
  timeFormatAM = 'AM';
  timeFormatPM = 'PM';
  confirmChangesModalMessage = 'Are you sure you want to change this field?';
  promptModalMessage = 'Do you want to perform the following changes?';
  asyncFailure = 'Async validation was not called within the 10s threshold, you might want to reload the page to try again';
  previous = 'Previous';
  actions = 'Actions';
  all = 'All';
  groupedMultiPickerEmpty = 'No items to display';
  groupedMultiPickerSelectCategory = 'Select a category from the right to get started';
  add = 'Add';
  encryptedFieldTooltip = 'This data has been stored at the highest level of security';
  noStatesForCountry = 'No states available for the selected country';
  selectCountryFirst = 'Please select a country before selecting a state';
  invalidIntegerInput = 'Special characters are not allowed for';

  constructor(
    @Optional()
    @Inject(LOCALE_ID)
    public userLocale: string = 'en-US',
  ) {}

  maxlengthMetWithField(field: string, maxlength: number): string {
    return `Sorry, you have reached the maximum character count of ${maxlength} for ${field}.`;
  }

  maxlengthMet(maxlength: number): string {
    return `Sorry, you have reached the maximum character count of ${maxlength} for this field.`;
  }

  invalidMaxlengthWithField(field: string, maxlength: number): string {
    return `Sorry, you have exceeded the maximum character count of ${maxlength} for ${field}.`;
  }

  invalidMaxlength(maxlength: number): string {
    return `Sorry, you have exceeded the maximum character count of ${maxlength} for this field.`;
  }

  getToManyPlusMore(toMany: { quantity: number }): string {
    return `+${toMany.quantity} more`;
  }

  selectedRecords(selected: number) {
    return `${selected} records are selected.`;
  }

  showingXofXResults(shown: number, total: number) {
    return `Showing ${shown} of ${total} Results.`;
  }

  totalRecords(total: number, select: boolean = false) {
    return select ? `Select all ${total} records.` : `De-select remaining ${total} records.`;
  }

  formatDateWithFormat(value: any, format: Intl.DateTimeFormatOptions) {
    let date = value instanceof Date ? value : new Date(value);
    if (date.getTime() !== date.getTime()) {
      return value;
    }
    return new Intl.DateTimeFormat(this.userLocale, format).format(date);
  }

  getWeekdays(): string[] {
    function getDay(dayOfWeek) {
      let dt = new Date();
      return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
    }

    return [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)].reduce((weekdays, dt) => {
      weekdays.push(new Intl.DateTimeFormat(this.userLocale, { weekday: 'long' }).format(dt));
      return weekdays;
    }, []);
  }

  getMonths(): string[] {
    function getMonth(month) {
      let dt = new Date();
      return dt.setMonth(month, 1);
    }

    return [
      getMonth(0),
      getMonth(1),
      getMonth(2),
      getMonth(3),
      getMonth(4),
      getMonth(5),
      getMonth(6),
      getMonth(7),
      getMonth(8),
      getMonth(9),
      getMonth(10),
      getMonth(11),
    ].reduce((months, dt) => {
      months.push(new Intl.DateTimeFormat(this.userLocale, { month: 'long' }).format(dt));
      return months;
    }, []);
  }

  getProperty(value: string) {
    return this[value];
  }

  getRangeText(page: number, pageSize: number, length: number, short: boolean): string {
    if (length === 0 || pageSize === 0) {
      return `Displaying 0 of ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return short ? `${startIndex + 1} - ${endIndex}/${length}` : `Displaying ${startIndex + 1} - ${endIndex} of ${length}`;
  }

  formatCurrency(value: number): string {
    let options = { style: 'currency', currency: 'USD' };
    return new Intl.NumberFormat(this.userLocale, options).format(value);
  }

  formatNumber(value: any, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.userLocale, options).format(value);
  }

  formatDateShort(value: any): string {
    let options: Intl.DateTimeFormatOptions = {
      // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    let _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
    return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
  }

  formatTime(value: any): string {
    let options: Intl.DateTimeFormatOptions = {
      // HH:MM A - 1:17 PM
      hour: '2-digit',
      minute: '2-digit',
    };
    let _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
    return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
  }

  formatDate(value: any): string {
    let options: Intl.DateTimeFormatOptions = {
      // DD/MM/YYYY - 02/14/2017
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    let _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
    return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
  }
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
