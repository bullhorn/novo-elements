import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10163',
      changes: [
        {
          replace: '_onClosed',
          replaceWith: 'onClosed',
          limitedTo: { classes: ['NovoModalRef'] },
        },
      ],
    },
  ],
};
