import { ConstructorChecksUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

/**
 * List of class names for which the constructor signature has been changed. The new constructor
 * signature types don't need to be stored here because the signature will be determined
 * automatically through type checking.
 */
export const constructorChecks: VersionChanges<ConstructorChecksUpgradeData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/9190',
      changes: ['NativeDateAdapter'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10319',
      changes: ['MatAutocomplete'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10344',
      changes: ['MatTooltip'],
    },
    {
      pr: 'https://github.com/angular/components/pull/10389',
      changes: ['MatIconRegistry'],
    },
    {
      pr: 'https://github.com/angular/components/pull/9775',
      changes: ['MatCalendar'],
    },
  ],
};
