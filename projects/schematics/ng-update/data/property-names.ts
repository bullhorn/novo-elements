import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10163',
      changes: [
        { replace: 'change', replaceWith: 'selectionChange', limitedTo: { classes: ['MatSelect'] } },
        {
          replace: 'onOpen',
          replaceWith: 'openedChange.pipe(filter(isOpen => isOpen))',
          limitedTo: { classes: ['MatSelect'] },
        },
        {
          replace: 'onClose',
          replaceWith: 'openedChange.pipe(filter(isOpen => !isOpen))',
          limitedTo: { classes: ['MatSelect'] },
        },
      ],
    },
  ],
};
