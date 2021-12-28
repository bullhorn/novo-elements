import { ElementSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const elementSelectors: VersionChanges<ElementSelectorUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        // { replace: 'button', replaceWith: 'novo-button' },
        // { replace: 'header', replaceWith: 'novo-header' },
        // { replace: 'utils', replaceWith: 'novo-utils' },
        { replace: 'util-action', replaceWith: 'novo-action' },
        { replace: 'novo-calendar-day', replaceWith: 'novo-agenda-day' },
        { replace: 'novo-calendar-week', replaceWith: 'novo-agenda-week' },
        { replace: 'novo-calendar-month', replaceWith: 'novo-agenda-month' },
        { replace: 'novo-calendar-date-change', replaceWith: 'novo-agenda-date-change' },
        { replace: 'list-item', replaceWith: 'novo-list-item' },
        { replace: 'item-header', replaceWith: 'novo-item-header' },
        { replace: 'item-title', replaceWith: 'novo-item-title' },
        { replace: 'item-header-end', replaceWith: 'novo-item-header-end' },
        { replace: 'item-end', replaceWith: 'novo-item-end' },
        { replace: 'item-avatar', replaceWith: 'novo-item-avatar' },
        { replace: 'item-content', replaceWith: 'novo-item-content' },
      ],
    },
  ],
};
