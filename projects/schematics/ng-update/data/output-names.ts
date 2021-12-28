import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        {
          replace: 'change',
          replaceWith: 'selectionChange',
          limitedTo: {
            elements: ['novo-select'],
          },
        },
      ],
    },
  ],
};
