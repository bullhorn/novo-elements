import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
@Component({
  selector: 'novo-string-condition-def',
  template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <novo-chip-list #chipList aria-label="filter value" formControlName="value">
          <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
            <novo-icon novoChipRemove>close</novo-icon>
          </novo-chip>
          <input
            novoChipInput
            [placeholder]="labels.typeToAddChips"
            autocomplete="off"
            (novoChipInputTokenEnd)="add($event, formGroup)"
          />
        </novo-chip-list>
        <novo-autocomplete></novo-autocomplete>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  // Change detection is intentionally not set to OnPush. This component's template will be provided
  // to the table to be inserted into its view. This is problematic when change detection runs since
  // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
  // mean's the template in the table's view will not have the updated value (and in fact will cause
  // an ExpressionChangedAfterItHasBeenCheckedError).
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  defaultOperator = 'includeAny';

  getValue(formGroup: AbstractControl): any[] {
    return formGroup.value?.value || [];
  }

  add(event: any, formGroup: AbstractControl): void {
    const input = event.input;
    input.value = '';
    const valueToAdd = event.value;
    if (valueToAdd !== '') {
      const current = this.getValue(formGroup);
      if (!Array.isArray(current)) {
        formGroup.get('value').setValue([valueToAdd]);
      } else {
        formGroup.get('value').setValue([...current, valueToAdd]);
      }
    }
  }

  remove(valueToRemove: string, formGroup: AbstractControl): void {
    const current = this.getValue(formGroup);
    const index = current.indexOf(valueToRemove);
    if (index >= 0) {
      const oldValue = [...current]
      oldValue.splice(index, 1);
      formGroup.get('value').setValue(oldValue);
    }
  }
}
