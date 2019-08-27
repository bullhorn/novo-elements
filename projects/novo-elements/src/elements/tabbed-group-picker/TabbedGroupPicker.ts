import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export type TabbedGroupPickerSchema = {
  typeName: string;
  typeLabel: string;
  valueField: string;
  labelField: string;
} & ({ childTypeName?: string } | { parentTypeName?: string });

export type TabbedGroupPickerQuickSelect = {
  typeName: string;
  label: string;
  active?: boolean;
  all?: boolean;
  values?: any[];
};

export type SelectableItem = { selected?: boolean };

export type TabbedGroupPickerData = {
  [key: string]: SelectableItem[];
};

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
})
export class NovoTabbedGroupPickerElement implements OnInit {
  @Input() buttonConfig: {
    theme: string;
    side: string;
    icon: string;
    label: string;
  };
  @Input() schemata: TabbedGroupPickerSchema[];
  @Input() quickSelectConfig: { label: string; items: TabbedGroupPickerQuickSelect[] };
  @Input() data: TabbedGroupPickerData;
  displayData: TabbedGroupPickerData;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  activeSchema: TabbedGroupPickerSchema;
  filterText: BehaviorSubject<string> = new BehaviorSubject('');
  searchLabel: string = 'Search';

  loading = true;

  constructor(public labelService: NovoLabelService) {}

  ngOnInit(): void {
    this.validateData();
    this.displayData = this.data;
    if (this.quickSelectConfig) {
      this.validateQuickSelectConfig();
    }
    this.setActiveSchema(this.schemata[0]);
    this.loading = false;
    this.filterText.pipe(debounceTime(300)).subscribe({
      next: this.filter,
    });
  }

  setActiveSchema(newActiveSchema: TabbedGroupPickerSchema) {
    this.activeSchema = newActiveSchema;
  }

  validateData() {
    let warning = '';
    this.schemata.forEach((schema) => {
      if (this.data[schema.typeName] === undefined) {
        warning += `Property ${schema.typeName} is missing from data.\n`;
      } else if (!Array.isArray(this.data[schema.typeName])) {
        warning += `data.${schema.typeName} is not an array.\n`;
      } else {
        if (this.data[schema.typeName].some((item) => !(schema.valueField in item))) {
          warning += `At least one item in data.${schema.typeName} is missing the ${schema.valueField} property.\n`;
        }
        if (this.data[schema.typeName].some((item) => !(schema.labelField in item))) {
          warning += `At least one item in data.${schema.typeName} is missing the ${schema.labelField} property.\n`;
        }
      }
    });
    if (warning) {
      console.warn(`TabbedGroupPicker data validation warning:\n${warning}`);
    }
  }

  validateQuickSelectConfig() {
    let warning = '';
    if (!('items' in this.quickSelectConfig)) {
      warning += `Invalid quick select: required field 'items' is not defined.\n`;
    } else if (!Array.isArray(this.quickSelectConfig.items)) {
      warning += `Invalid quick select: 'items' is not an array.\n`;
    } else if (!this.quickSelectConfig.items.length) {
      warning += `Invalid quick select: 'items' is empty.\n`;
    } else {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        let quickSelectIdentifier = '(Invalid quickSelect)';
        if (!quickSelect.typeName) {
          warning += `Invalid typeName: required field 'typeName' is not defined.\n`;
        } else if (!quickSelect.label) {
          warning += `Invalid label: required field 'label' is not defined.\n`;
        } else {
          quickSelectIdentifier = `${quickSelect.label} (${quickSelect.typeName})`;
        }
        const schema = this.schemata.find((schemaItem) => quickSelect.typeName === schemaItem.typeName);
        if (!schema) {
          warning += `Invalid typeName for ${quickSelectIdentifier} config: ${
            quickSelect.typeName
          } is not present in any configured typeSchema.\n`;
        }
        if ('values' in quickSelect && 'all' in quickSelect) {
          warning += `Invalid properties for ${quickSelectIdentifier} config: only one of 'values' and 'all' is allowed.\n`;
        } else if (!('values' in quickSelect) && !('all' in quickSelect)) {
          warning += `Invalid properties for ${quickSelectIdentifier} config: either 'values' or 'all' is required.\n`;
        }
        if ('values' in quickSelect) {
          if (!Array.isArray(quickSelect.values)) {
            warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property is not an array.\n`;
          } else if (!Array.isArray(quickSelect.values)) {
            warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property contains no values.\n`;
          } else if (
            !quickSelect.values.every((quickSelectValue) =>
              this.data[schema.typeName].some((dataItem) => dataItem[schema.valueField] === quickSelectValue),
            )
          ) {
            warning += `Invalid value for ${quickSelectIdentifier} config: at least one value in values is not present in any item in data.${
              schema.typeName
            }\n`;
          }
        }
      });
    }
    if (warning) {
      console.warn(`TabbedGroupPicker quickSelect validation warning:\n${warning}`);
    }
  }

  onDataListItemClicked(activeSchema: TabbedGroupPickerSchema, item: SelectableItem) {
    item.selected = !item.selected;
    this.onItemToggled(activeSchema);
  }

  onItemToggled(schema: TabbedGroupPickerSchema) {
    if (this.quickSelectConfig) {
      this.updateQuickSelectCheckboxes(schema);
    }
    this.emitSelectedValues();
  }

  onQuickSelectListItemClicked(quickSelect: TabbedGroupPickerQuickSelect) {
    quickSelect.active = !quickSelect.active;
    this.onQuickSelectToggled(quickSelect);
  }

  onQuickSelectToggled(quickSelect: TabbedGroupPickerQuickSelect) {
    const schema: TabbedGroupPickerSchema = this.schemata.find((schemaItem) => quickSelect.typeName === schemaItem.typeName);
    let itemsToSelect: SelectableItem[] = [];
    if (quickSelect.all) {
      itemsToSelect = this.data[schema.typeName];
    } else {
      itemsToSelect = this.data[schema.typeName].filter((item) => quickSelect.values.includes(item[schema.valueField]));
    }
    if (itemsToSelect && itemsToSelect.length) {
      itemsToSelect.forEach((itemToSelect) => {
        itemToSelect.selected = !!quickSelect.active;
      });
    }
    this.onItemToggled(schema);
  }

  updateQuickSelectCheckboxes(activeSchema: TabbedGroupPickerSchema) {
    const relevantQuickSelects = this.quickSelectConfig.items.filter((quickSelect) => activeSchema.typeName === quickSelect.typeName);
    relevantQuickSelects.forEach((quickSelect) => {
      let itemsToCheck: SelectableItem[] = [];
      if (quickSelect.all) {
        itemsToCheck = this.data[activeSchema.typeName];
      } else {
        itemsToCheck = this.data[activeSchema.typeName].filter((dataItem) =>
          quickSelect.values.includes(dataItem[activeSchema.valueField]),
        );
      }
      quickSelect.active = itemsToCheck.every((dataItem) => dataItem.selected === true);
    });
  }

  emitSelectedValues() {
    this.selectionChange.emit(this.getSelectedValues());
  }

  getSelectedValues = () =>
    this.schemata.reduce((prev, { typeName, valueField }) => {
      return {
        ...prev,
        [typeName]: this.data[typeName].filter((dataItem) => dataItem.selected).map((dataItem) => dataItem[valueField]),
      };
    }, {});

  onClearFilter(event) {
    Helpers.swallowEvent(event); // dunno if this is necessary
    this.filterText.next('');
  }

  onFilter(event: { target: { value: string } }) {
    this.filterText.next(event.target.value);
  }

  filter = (searchTerm: string) =>
    (this.displayData = this.schemata.reduce(
      (accumulator, { labelField, typeName }) => ({
        ...accumulator,
        [typeName]: this.data[typeName] && this.data[typeName].filter((item) => item[labelField].toLowerCase().includes(searchTerm.toLowerCase())),
      }),
      {},
    ));
}
