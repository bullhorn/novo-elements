import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        { replace: 'NovoCalendarMonthViewElement', replaceWith: 'NovoAgendaMonthViewElement' },
        { replace: 'NovoCalendarWeekViewElement', replaceWith: 'NovoAgendaWeekViewElement' },
        { replace: 'NovoCalendarDayViewElement', replaceWith: 'NovoAgendaDayViewElement' },
      ],
    },
  ],
};
