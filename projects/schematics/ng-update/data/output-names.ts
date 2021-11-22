import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10163',
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
