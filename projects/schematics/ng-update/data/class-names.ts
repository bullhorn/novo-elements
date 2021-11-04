import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10291',
      changes: [
        { replace: 'FloatPlaceholderType', replaceWith: 'FloatLabelType' },
        { replace: 'MAT_PLACEHOLDER_GLOBAL_OPTIONS', replaceWith: 'MAT_LABEL_GLOBAL_OPTIONS' },
        { replace: 'PlaceholderOptions', replaceWith: 'LabelOptions' },
      ],
    },
  ],
};
