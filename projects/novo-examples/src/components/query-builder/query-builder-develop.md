---
section: Components
page: Query Builder
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/query-builder)
- **module:** `import { QueryBuilderModule } from 'novo-elements';`


**Basic Usage**

```html
<novo-query-builder controlName="criteria" [config]="config"></novo-query-builder>
```

# Roadmap

- [x] Custom conditions inputs
- [ ] Dark Mode

# Changelog

### 7.x.x

Initial Implementation

# Components

## QueryBuilderComponent `novo-query-builder`

All tabs must be incapsulated in a `novo-nav` container. The nav will control the context and active tab.

### Properties

<props-table component="QueryBuilderComponent"></props-table>

## ExpressionBuilderComponent `novo-expression-builder`

All tabs must be incapsulated in a `novo-nav` container. The nav will control the context and active tab.

### Properties

<props-table component="ExpressionBuilderComponent"></props-table>


# Custom Condition Field Definitions

Your implementation might require a custom input type to specifically define how you want to query against your data. Since your implementation will have to convert the query builder form to the query syntax of your system, you can add custom field definitions to override the defaults or provide new implementations.

First you need to create your custom condition

```typescript
// custom-condition-field-def.html
@Component({
  selector: 'custom-condition-field-def',
  template: 'custom-condition-field-def.html,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CustomConditionFieldDef extends DefaultFilterFieldDef implements OnInit {
  defaultOperator = 'includeAny';
}
```

```html
<!-- custom-condition-field-def.html -->
<ng-container novoFilterFieldTypeDef>
  <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
    <novo-select placeholder="Operator..." formControlName="operator">
      <novo-option value="includeAny">Include Any</novo-option>
      <novo-option value="includeAll">Include All</novo-option>
      <novo-option value="excludeAny">Exclude</novo-option>
    </novo-select>
  </novo-field>
  <novo-field *novoFilterFieldInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
    <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
      <novo-select-search [formControl]="searchCtrl"></novo-select-search>
      <novo-option *ngFor="let option of remoteResults | async" [value]="option.id">
        &#123;&#123; option.name &#125;&#125;
      </novo-option>
    </novo-select>
  </novo-field>
</ng-container>
```







#### **open(component, params)**

Used to open all modals via the service. Use `params` to pass values to you component.

| Name      | Description                                                                         |
| :-------- | :---------------------------------------------------------------------------------- |
| component | _Class_<br>The angular component which represents the Modal to be opened.           |
| params    | _Object_<br>**Optional** arguments that will be injected into `NovoAsideRef.params` |

_Note:_ All modal components should be declared as `entryComponents` in the module.
