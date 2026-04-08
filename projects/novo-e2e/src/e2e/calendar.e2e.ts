import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements, radioByValue } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent, verifyClassAbsent } from '../utils/VerifyUtil';
import {
  calendarDate,
  firstVisibleCalendarDate,
  lastVisibleCalendarDate,
  verifyCalendarDateSelected,
  verifyCalendarDatesSelected,
  calendarMonth,
  calendarYear,
  calendarMonthHeader,
  calendarYearHeader,
  calendarNextButton,
  calendarPreviousButton,
  calendarMonthText,
  calendarYearText,
  getMonthByOffset,
  getYearByOffset
} from '../utils/CalendarUtil';

describe('Calendar Demo Page', () => {
  const url = examplesUrl(COMPONENT_URLS.CALENDAR);

  before(async () => {
    await browser.navigateTo(url);
  });

  after(async () => {
    await browser.navigateTo(getURLs().HOME);
  });

  describe('Page Elements', () => {
    it('should display page title', async () => {
      await verifyPresent(elements.title);
      await verifyText(elements.title, 'Calendar', 'Calendar example page title');
    });

    it('should display calendar component', async () => {
      await verifyPresent(elements.calendar);
    });
  });

  describe('Calendar Navigation', () => {
    it('should navigate to next month using calendar-next button', async () => {
      await scrollIntoView(elements.calendar);
      const prevMonthHeader = await $(calendarMonthText()).getText();
      await click(calendarNextButton());
      const nextMonthHeader = await $(calendarMonthText()).getText();
      expect(prevMonthHeader).not.toEqual(nextMonthHeader);
    });

    it('should navigate to previous month using calendar-previous button', async () => {
      const currentMonthHeader = await $(calendarMonthText()).getText();
      await click(calendarPreviousButton());
      const prevMonthHeader = await $(calendarMonthText()).getText();
      expect(currentMonthHeader).not.toEqual(prevMonthHeader);
    });

    it('should open and change month', async () => {
      const initialMonth = await $(calendarMonthText()).getText();
      await click(calendarMonthHeader());
      const targetMonth = getMonthByOffset(-2);
      await click(calendarMonth(targetMonth));
      const newMonth = await $(calendarMonthText()).getText();
      expect(initialMonth).not.toEqual(newMonth);
    });

    it('should open and change year', async () => {
      const initialYear = await $(calendarYearText()).getText();
      await click(calendarYearHeader());
      const targetYear = getYearByOffset(-1);
      await click(calendarYear(targetYear));
      const newYear = await $(calendarYearText()).getText();
      expect(initialYear).not.toEqual(newYear);
    });
  });

  describe('Single Selection Mode', () => {
    it('should select a single date and display it in the output', async () => {
      await scrollIntoView(elements.calendar);
      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDateSelected(15);
    });

    it('should replace selection with a new date', async () => {
      await click(calendarDate(20));
      await verifyClassPresent(calendarDate(20), 'selected', 'calendar date 20');
      await verifyClassAbsent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDateSelected(20);
    });

    it('should select the first day of the month', async () => {
      await click(calendarDate(1));
      await verifyClassPresent(calendarDate(1), 'selected', 'calendar date 1');
      await verifyCalendarDateSelected(1);
    });

    it('should select the last day of the month', async () => {
      await click(calendarDate(30));
      await verifyClassPresent(calendarDate(30), 'selected', 'calendar date 30');
      await verifyCalendarDateSelected(30);
    });

    it('should select the first visible day in the calendar grid', async () => {
      await click(firstVisibleCalendarDate());
      await verifyClassPresent(firstVisibleCalendarDate(), 'selected', 'first visible day');
    });

    it('should select the last visible day in the calendar grid', async () => {
      await click(lastVisibleCalendarDate());
      await verifyClassPresent(lastVisibleCalendarDate(), 'selected', 'last visible day');
    });
  });

  describe.skip('Multiple Selection Mode', () => {
    before(async () => {
      // Switch to multiple selection mode
      await click(radioByValue('multiple'));
    });

    it('should select multiple dates and keep them all selected', async () => {
      // Select the 10th
      await click(calendarDate(10));
      await verifyClassPresent(calendarDate(10), 'selected', 'calendar date 10');
      await verifyCalendarDateSelected(10);

      // Select the 15th
      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDatesSelected([10, 15]);

      // Select the 20th
      await click(calendarDate(20));
      await verifyClassPresent(calendarDate(20), 'selected', 'calendar date 20');
      await verifyCalendarDatesSelected([10, 15, 20]);
    });

    it('should deselect a date when clicking it again in multiple mode', async () => {
      // Click the 15th again to deselect it
      await click(calendarDate(15));
      await verifyClassAbsent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDatesSelected([10, 20]);
    });

    it('should select and deselect the first day of the month', async () => {
      // Select the 1st
      await click(calendarDate(1));
      await verifyClassPresent(calendarDate(1), 'selected', 'calendar date 1');
      await verifyCalendarDatesSelected([1, 10, 20]);

      // Deselect the 1st
      await click(calendarDate(1));
      await verifyClassAbsent(calendarDate(1), 'selected', 'calendar date 1');
      await verifyCalendarDatesSelected([10, 20]);
    });

    it('should select and deselect the last day of the month', async () => {
      // Select the 30th
      await click(calendarDate(30));
      await verifyClassPresent(calendarDate(30), 'selected', 'calendar date 30');
      await verifyCalendarDatesSelected([10, 20, 30]);

      // Deselect the 30th
      await click(calendarDate(30));
      await verifyClassAbsent(calendarDate(30), 'selected', 'calendar date 30');
      await verifyCalendarDatesSelected([10, 20]);
    });
  });
});
