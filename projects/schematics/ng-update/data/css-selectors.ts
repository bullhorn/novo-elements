import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface MaterialCssSelectorData {
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

export const cssSelectors: VersionChanges<MaterialCssSelectorData> = {
  [TargetVersion.V6]: [
    {
      pr: 'https://github.com/angular/components/pull/10296',
      changes: [
        { replace: '.mat-form-field-placeholder', replaceWith: '.mat-form-field-label' },
        { replace: '.mat-input-container', replaceWith: '.mat-form-field' },
        { replace: '.mat-input-flex', replaceWith: '.mat-form-field-flex' },
        { replace: '.mat-input-hint-spacer', replaceWith: '.mat-form-field-hint-spacer' },
        { replace: '.mat-input-hint-wrapper', replaceWith: '.mat-form-field-hint-wrapper' },
        { replace: '.mat-input-infix', replaceWith: '.mat-form-field-infix' },
        { replace: '.mat-input-invalid', replaceWith: '.mat-form-field-invalid' },
        { replace: '.mat-input-placeholder', replaceWith: '.mat-form-field-label' },
        { replace: '.mat-input-placeholder-wrapper', replaceWith: '.mat-form-field-label-wrapper' },
        { replace: '.mat-input-prefix', replaceWith: '.mat-form-field-prefix' },
        { replace: '.mat-input-ripple', replaceWith: '.mat-form-field-ripple' },
        { replace: '.mat-input-subscript-wrapper', replaceWith: '.mat-form-field-subscript-wrapper' },
        { replace: '.mat-input-suffix', replaceWith: '.mat-form-field-suffix' },
        { replace: '.mat-input-underline', replaceWith: '.mat-form-field-underline' },
        { replace: '.mat-input-wrapper', replaceWith: '.mat-form-field-wrapper' },
      ],
    },
  ],
};
