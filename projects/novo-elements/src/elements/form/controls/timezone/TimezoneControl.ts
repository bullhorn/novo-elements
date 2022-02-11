// APP
import { findTimeZone, getZonedTime, listTimeZones } from 'timezone-support';
import { formatZonedTime } from 'timezone-support/dist/parse-format';
import { BaseControl, NovoControlConfig } from '../BaseControl';

export class TimezoneControl extends BaseControl {
  controlType = 'timezone';
  options = [];

  constructor(config: NovoControlConfig) {
    super('TimezoneControl', config);
    this.options = this.buildTimezones(new Date());
    this.placeholder = config.placeholder || '';
    // current timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.value = tz;
  }

  private buildTimezones = (compareDate: Date) => {
    const timezones = listTimeZones()
      .map((zone) => {
        const timezone = findTimeZone(zone);
        const zonedTime = getZonedTime(compareDate, timezone);
        const formatted = formatZonedTime(zonedTime, `z - [${zone}] ([GMT] Z)`).replace('_', ' ');

        const option = {
          value: zone,
          label: formatted,
          offset: zonedTime.zone.offset,
        };
        // if (this.props.mapLabels) {
        //   option.label = this.props.mapLabels(option);
        // }
        return option;
      })
      // Formats 'noisy' timezones without a letter acronym.
      .map((option) => {
        const rgx = /(^(\+|-)\d+\s- )/;
        const matches = option.label.match(rgx);
        if (matches) {
          const prefix = matches[0];
          option.label = option.label.split(prefix)[1];
        }
        return option;
      })
      // Sorts W -> E, prioritizes america. could be more nuanced based on system tz but simple for now
      .sort((a, b) => {
        const offsetDelta = b.offset - a.offset;
        if (offsetDelta !== 0) {
          return offsetDelta;
        }
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
    return timezones;
  };
}
