import { SymbolRemovalUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const symbolRemoval: VersionChanges<SymbolRemovalUpgradeData> = {
  [TargetVersion.V13]: [
    // {
    //   pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
    //   changes: [
    //     'CanColorCtor',
    //     'CanDisableRippleCtor',
    //     'CanDisableCtor',
    //     'CanUpdateErrorStateCtor',
    //     'HasInitializedCtor',
    //     'HasTabIndexCtor',
    //   ].map(name => ({
    //     name,
    //     module: '@angular/material/core',
    //     message: `\`${name}\` is no longer necessary and has been removed.`,
    //   })),
    // },
  ],
};
