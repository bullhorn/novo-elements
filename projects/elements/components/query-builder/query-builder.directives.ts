import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { QueryBuilderService } from './query-builder.service';

/** Base interface for a condidation template directives. */
export interface ConditionDef {
  template: TemplateRef<any>;
}

/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
@Directive({ selector: '[novoConditionInputDef]' })
export class NovoConditionInputDef implements ConditionDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
@Directive({ selector: '[novoConditionOperatorsDef]' })
export class NovoConditionOperatorsDef implements ConditionDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
@Directive()
export class BaseConditionFieldDef {
  /** Unique name for this field. */
  @Input('novoFilterFieldDef')
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._setNameInput(name);
  }
  protected _name: string;

  @ContentChild(NovoConditionInputDef) fieldInput: NovoConditionInputDef;
  @ContentChild(NovoConditionOperatorsDef) fieldOperators: NovoConditionOperatorsDef;

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
  selector: '[novoConditionFieldDef]',
})
export class NovoConditionFieldDef extends BaseConditionFieldDef {
  constructor(private qbs: QueryBuilderService) {
    super();
  }
  register() {
    this.qbs.registerFieldDef(this);
  }
  unregister() {
    this.qbs.unregisterFieldDef(this);
  }
}
