import { endOfToday, startOfToday } from 'date-fns';
import { DateUtil } from 'novo-elements/utils';

export class NovoDataTableFilterUtils {
  static constructFilter(filter?: any, type?: any, multiSelect?: boolean) {
    let actualFilter = filter;
    if (filter) {
      if (type && type === 'date') {
        if (filter.startDate && filter.endDate) {
          actualFilter = {
            min: DateUtil.startOfDay(filter.startDate.date),
            max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(filter.endDate.date), 1)),
          };
        } else {
          actualFilter = {
            min: filter.min ? DateUtil.addDays(startOfToday(), filter.min) : startOfToday(),
            max: filter.max ? DateUtil.addDays(endOfToday(), filter.max) : endOfToday(),
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
