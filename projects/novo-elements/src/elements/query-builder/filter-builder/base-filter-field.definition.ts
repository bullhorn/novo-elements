import { ContentChild, Directive, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { NOVO_FILTER_BUILDER } from '../query-builder.tokens';

/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface FilterFieldDef {
  template: TemplateRef<any>;
}

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[novoFilterFieldInputDef]' })
export class NovoFilterFieldInputDef implements FilterFieldDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[novoFilterFieldOperatorsDef]' })
export class NovoFilterFieldOperatorsDef implements FilterFieldDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
@Directive()
export class BaseFilterFieldDef {
  /** Unique name for this field. */
  @Input('novoFilterFieldDef')
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._setNameInput(name);
  }
  protected _name: string;

  @ContentChild(NovoFilterFieldInputDef) fieldInput: NovoFilterFieldInputDef;
  @ContentChild(NovoFilterFieldOperatorsDef) fieldOperators: NovoFilterFieldOperatorsDef;

  /**
   * Transformed version of the column name that can be used as part of a CSS classname. Excludes
   * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
   * do not match are replaced by the '-' character.
   */
  cssClassFriendlyName: string;
  _fieldCssClassName: string[];

  defaultOperator: string;

  constructor() {}

  /**
   * Overridable method that sets the css classes that will be added to every cell in this
   * column.
   * In the future, columnCssClassName will change from type string[] to string and this
   * will set a single string value.
   * @docs-private
   */
  protected _updateFieldCssClassName() {
    this._fieldCssClassName = [`novo-filter-field-${this.cssClassFriendlyName}`];
  }

  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  protected _setNameInput(value: string) {
    // If the directive is set without a name (updated programmatically), then this setter will
    // trigger with an empty string and should not overwrite the programmatically set value.
    if (value) {
      this._name = value;
      this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
      this._updateFieldCssClassName();
    }
  }
}

@Directive({
  selector: '[novoFilterFieldDef]',
})
export class NovoFilterFieldDef extends BaseFilterFieldDef {
  constructor(@Inject(NOVO_FILTER_BUILDER) @Optional() public _filterBuilder?: any) {
    super();
  }
}

@Directive({
  selector: '[novoFilterFieldTypeDef]',
})
export class NovoFilterFieldTypeDef extends BaseFilterFieldDef {
  constructor(@Inject(NOVO_FILTER_BUILDER) @Optional() public _filterBuilder?: any) {
    super();
  }
}
