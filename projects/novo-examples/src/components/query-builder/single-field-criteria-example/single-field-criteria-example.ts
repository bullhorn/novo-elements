import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder } from '@angular/forms';
import { CriteriaBuilderComponent, QueryBuilderConfig } from 'novo-elements';
import { MockCandidateMeta as MockMeta } from '../just-criteria/MockMeta';

/**
 * @title Single Field Criteria Example
 */
@Component({
    selector: 'single-field-criteria-example',
    templateUrl: 'single-field-criteria-example.html',
    styleUrls: ['single-field-criteria-example.css'],
    standalone: false,
})
export class SingleFieldCriteriaExample implements OnInit {
  @ViewChild('criteriaBuilder', { static: true }) criteriaBuilder: CriteriaBuilderComponent;

  queryForm: AbstractControl;
  config: QueryBuilderConfig | null = null;

  mockMetaFields = MockMeta.fields;

  editTypeFn = (field: any) => {
    if (field.optionsType === 'Brewery') {
      return 'custom';
    }
    return (field.inputType || field.dataType || field.type).toLowerCase();
  };

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.queryForm = this.formBuilder.group({field: '', operator: '', value: [] });
    const fields = this.getFieldConfig();
    this.resetQueryForm();
    this.config = {
      fields,
    };
    this.cdr.detectChanges();
  }

  getFieldConfig(): any {
    return [{
      value: MockMeta.entity,
      label: MockMeta.label,
      options: MockMeta.fields,
      find: (name: string) => MockMeta.fields.find((f) => f.name === name),
      search: (term: string) => {
        return MockMeta.fields.filter((f) => f.name.includes(term) || f.label.includes(term));
      },
    }];
  }

  updateConfig(values: any): void {
    this.config = { ...this.config, ...values };
  }

  resetQueryForm() {
    const prepopulatedData = {
      field: '',
      operator: 'includeAny',
      value: [],
    };
    this.setQueryForm(prepopulatedData);
  }

  setQueryForm(data) {
    this.queryForm.setValue(data);
  }

  onSubmit() {
    console.info('Your form data : ', this.queryForm.value);
  }
}
