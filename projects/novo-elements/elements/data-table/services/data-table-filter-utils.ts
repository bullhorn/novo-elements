import * as dateFns from 'date-fns';

export class NovoDataTableFilterUtils {
  static constructFilter(filter?: any, type?: any, multiSelect?: boolean) {
    let actualFilter = filter;
    if (filter) {
      if (type && type === 'date') {
        if (filter.startDate && filter.endDate) {
          actualFilter = {
            min: dateFns.startOfDay(filter.startDate.date),
            max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(filter.endDate.date), 1)),
          };
        } else {
          actualFilter = {
            min: filter.min ? dateFns.addDays(dateFns.startOfToday(), filter.min) : dateFns.startOfToday(),
            max: filter.max ? dateFns.addDays(dateFns.endOfToday(), filter.max) : dateFns.endOfToday(),
          };
        }
      }

      if (multiSelect && Array.isArray(filter)) {
        actualFilter = filter.map((filterItem) => {
          if (filterItem && filterItem.hasOwnProperty('value')) {
            return filterItem.value;
          }
          return filterItem;
        });
      } else if (actualFilter && actualFilter.hasOwnProperty('value')) {
        actualFilter = filter.value;
      }
    }
    return actualFilter;
  }
}
