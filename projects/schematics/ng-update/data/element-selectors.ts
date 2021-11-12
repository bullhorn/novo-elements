import { ElementSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const elementSelectors: VersionChanges<ElementSelectorUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10297',
      changes: [
        { replace: 'button', replaceWith: 'novo-button' },
        { replace: 'header', replaceWith: 'novo-header' },
        { replace: 'util-action', replaceWith: 'novo-action' },
        { replace: 'novo-calendar-day', replaceWith: 'novo-agenda-day' },
        { replace: 'novo-calendar-week', replaceWith: 'novo-agenda-week' },
        { replace: 'novo-calendar-month', replaceWith: 'novo-agenda-month' },
        { replace: 'novo-calendar-date-change', replaceWith: 'novo-agenda-date-change' },
      ],
    },
  ],
};
