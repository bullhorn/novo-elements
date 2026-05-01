import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { elements } from '../utils/SelectorUtil';
import { verifyPresent, verifyText, verifyClassPresent, verifyClassAbsent } from '../utils/VerifyUtil';
import {
  calendarDate,
  calendarDateInMonth,
  calendar,
  verifyCalendarDateSelected,
  verifyCalendarDatesSelected,
  verifyCalendarDateRangeSelected,
  verifyCalendarWeekRangeDays,
  calendarMonth,
  calendarYear,
  getMonthByOffset,
  getYearByOffset,
  calendarSelectionMode,
  calendarNumberOfMonths,
  calendarWeekStart,
  getCalendarWeekdayHeaders,
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
      const prevMonthHeader = await $(calendar.monthText).getText();
      await click(calendar.nextButton);
      const nextMonthHeader = await $(calendar.monthText).getText();
      expect(prevMonthHeader).not.toEqual(nextMonthHeader);
    });

    it('should navigate to previous month using calendar-previous button', async () => {
      const currentMonthHeader = await $(calendar.monthText).getText();
      await click(calendar.previousButton);
      const prevMonthHeader = await $(calendar.monthText).getText();
      expect(currentMonthHeader).not.toEqual(prevMonthHeader);
    });

    it('should open and change month', async () => {
      const initialMonth = await $(calendar.monthText).getText();
      await click(calendar.monthHeader);
      const targetMonth = getMonthByOffset(-2);
      await click(calendarMonth(targetMonth));
      const newMonth = await $(calendar.monthText).getText();
      expect(initialMonth).not.toEqual(newMonth);
    });

    it('should open and change year', async () => {
      const initialYear = await $(calendar.yearText).getText();
      await click(calendar.yearHeader);
      const targetYear = getYearByOffset(-1);
      await click(calendarYear(targetYear));
      const newYear = await $(calendar.yearText).getText();
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
      await click(calendar.firstVisibleDate);
      await verifyClassPresent(calendar.firstVisibleDate, 'selected', 'first visible day');
    });

    it('should select the last visible day in the calendar grid', async () => {
      await click(calendar.lastVisibleDate);
      await verifyClassPresent(calendar.lastVisibleDate, 'selected', 'last visible day');
    });
  });

  describe('Multiple Selection Mode', () => {
    before(async () => {
      await browser.refresh();
      await click(calendarSelectionMode('multiple'));
    });

    it('should select multiple dates and keep them all selected', async () => {
      await click(calendarDate(10));
      await verifyClassPresent(calendarDate(10), 'selected', 'calendar date 10');
      await verifyCalendarDatesSelected([10]);

      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDatesSelected([10, 15]);

      await click(calendarDate(20));
      await verifyClassPresent(calendarDate(20), 'selected', 'calendar date 20');
      await verifyCalendarDatesSelected([10, 15, 20]);
    });

    it('should deselect a date when clicking it again in multiple mode', async () => {
      await click(calendarDate(15));
      await verifyClassAbsent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDatesSelected([10, 20]);
    });
  });

  describe('Range Selection Mode', () => {
    before(async () => {
      await browser.refresh();
      await click(calendarSelectionMode('range'));
    });

    it('should select a date range with start and end dates', async () => {
      await scrollIntoView(elements.calendar);
      await click(calendarDate(10));
      await verifyClassPresent(calendarDate(10), 'selected', 'calendar date 10');

      await click(calendarDate(20));
      await verifyClassPresent(calendarDate(10), 'rangeStart', 'calendar date 10');
      await verifyClassPresent(calendarDate(20), 'rangeEnd', 'calendar date 20');
      await verifyCalendarDateRangeSelected(10, 20);
    });

    it('should replace the range with a new selection', async () => {
      await click(calendarDate(5));
      await verifyClassPresent(calendarDate(5), 'selected', 'calendar date 5');

      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(5), 'rangeStart', 'calendar date 5');
      await verifyClassPresent(calendarDate(15), 'rangeEnd', 'calendar date 15');
      await verifyCalendarDateRangeSelected(5, 15);
    });
  });

  describe('Week Selection Mode', () => {
    before(async () => {
      await browser.refresh();
      await click(calendarSelectionMode('week'));
    });

    it('should select a full week when clicking a date', async () => {
      await scrollIntoView(elements.calendar);
      await click(calendarDate(10));
      await verifyClassPresent(calendarDate(10), 'inRange', 'calendar date 10 is in the selected week');
      await verifyCalendarWeekRangeDays();
    });

    it('should replace the week selection with a new week', async () => {
      await click(calendarDate(20));
      await verifyClassPresent(calendarDate(20), 'inRange', 'calendar date 20 is in the selected week');
      await verifyCalendarWeekRangeDays();
    });
  });

  describe('Two Month Display', () => {
    before(async () => {
      await browser.refresh();
      await click(calendarSelectionMode('single'));
      await click(calendarNumberOfMonths(2));
    });

    it('should display two months', async () => {
      await scrollIntoView(elements.calendar);
      const monthElements = await $$(calendar.monthText);
      expect(monthElements.length).toBe(2);
    });

    it('should select a date from the first month', async () => {
      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDateSelected(15);
    });

    it('should select a date from the second month', async () => {
      await click(calendarDateInMonth(10, 1));
      await verifyClassPresent(calendarDateInMonth(10, 1), 'selected', 'calendar date 10 in second month');
      await verifyCalendarDateSelected(10);
    });
  });

  describe('Week Start on Monday', () => {
    before(async () => {
      await browser.refresh();
      await click(calendarSelectionMode('single'));
      await click(calendarWeekStart(1));
    });

    it('should have Monday as the first day of the week', async () => {
      await scrollIntoView(elements.calendar);
      const weekdayHeaders = await getCalendarWeekdayHeaders();
      const firstDayText = await weekdayHeaders[0].getText();
      expect(firstDayText).toBe('Mo');
    });

    it('should select a date with Monday week start', async () => {
      await click(calendarDate(15));
      await verifyClassPresent(calendarDate(15), 'selected', 'calendar date 15');
      await verifyCalendarDateSelected(15);
    });
  });
});
