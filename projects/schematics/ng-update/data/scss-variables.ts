import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface ScssVariableData {
  /** The CSS selector to replace. */
  replace: string;
  /** The new CSS selector. */
  replaceWith: string;
  /**
   * Controls which file types in which this replacement is made. If omitted, it is made in all
   * files.
   */
  replaceIn?: {
    /** Replace this name in stylesheet files. */
    stylesheet?: boolean;
    /** Replace this name in HTML files. */
    html?: boolean;
    /** Replace this name in TypeScript strings. */
    tsStringLiterals?: boolean;
  };
}

export const scssVariables: VersionChanges<ScssVariableData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
      changes: [
        { replace: '$base-font-size', replaceWith: '$font-size-base' },
        { replace: '$base-font-family', replaceWith: '$font-family-body' },
        { replace: '$base-font-color', replaceWith: '$font-color-base' },
        { replace: '$base-line-height', replaceWith: '$font-height-base' },
        { replace: '$alt-font-family', replaceWith: '$font-family-mono' },
        { replace: '$whiteframe-shadow-z1', replaceWith: '$shadow-1' },
        { replace: '$whiteframe-shadow-z2', replaceWith: '$shadow-2' },
        { replace: '$whiteframe-shadow-z3', replaceWith: '$shadow-3' },
        { replace: '$whiteframe-shadow-z4', replaceWith: '$shadow-4' },
        { replace: '$whiteframe-shadow-z5', replaceWith: '$shadow-5' },
        { replace: '$whiteframe-zindex-z1', replaceWith: '$zindex-1' },
        { replace: '$whiteframe-zindex-z2', replaceWith: '$zindex-2' },
        { replace: '$whiteframe-zindex-z3', replaceWith: '$zindex-3' },
        { replace: '$whiteframe-zindex-z4', replaceWith: '$zindex-4' },
        { replace: '$whiteframe-zindex-z5', replaceWith: '$zindex-5' },
      ],
    },
  ],
};
