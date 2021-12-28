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

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        {
          replace: 'align',
          replaceWith: 'position',
          limitedTo: { elements: ['mat-drawer', 'mat-sidenav'] },
        },
      ],
    },

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        { replace: 'dividerColor', replaceWith: 'color', limitedTo: { elements: ['mat-form-field'] } },
        {
          replace: 'floatPlaceholder',
          replaceWith: 'floatLabel',
          limitedTo: { elements: ['mat-form-field'] },
        },
      ],
    },

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        {
          replace: 'mat-dynamic-height',
          replaceWith: 'dynamicHeight',
          limitedTo: { elements: ['mat-tab-group'] },
        },
      ],
    },

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [{ replace: 'align', replaceWith: 'labelPosition', limitedTo: { elements: ['mat-checkbox'] } }],
    },

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        {
          replace: 'tooltip-position',
          replaceWith: 'matTooltipPosition',
          limitedTo: { attributes: ['matTooltip'] },
        },
      ],
    },

    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        { replace: 'thumb-label', replaceWith: 'thumbLabel', limitedTo: { elements: ['mat-slider'] } },
        {
          replace: 'tick-interval',
          replaceWith: 'tickInterval',
          limitedTo: { elements: ['mat-slider'] },
        },
      ],
    },
  ],
};
