import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        {
          replace: 'align',
          replaceWith: 'labelPosition',
          limitedTo: { elements: ['mat-radio-group', 'mat-radio-button'] },
        },
      ],
    },
  ],
  [TargetVersion.V8]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1355',
      changes: [
        {
          replace: 'theme',
          replaceWith: 'variant',
          limitedTo: { elements: ['button', 'novo-button'] },
        },
      ],
    },
  ],
};
