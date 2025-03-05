import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import {
  AbstractConditionFieldDef,
  AddressCriteriaConfig,
  AddressRadiusUnitsName,
  Condition,
  Conjunction,
  CriteriaBuilderComponent,
  NovoLabelService,
  Operator,
} from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MockCandidateMeta, MockNoteMeta } from './MockMeta';

@Component({
  selector: 'custom-picker-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
          <novo-option>
            <novo-select-search [formControl]="searchCtrl"></novo-select-search>
          </novo-option>
          <novo-option *ngFor="let option of remoteResults | async" [value]="option.id">
            {{ option.name }}
          </novo-option>
        </novo-select>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CustomPickerConditionDef extends AbstractConditionFieldDef implements OnInit {
  defaultOperator = Operator.includeAny;
  searchCtrl: UntypedFormControl = new UntypedFormControl();
  /** list of results filtered by search keyword */
  remoteResults: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  http = inject(HttpClient);

  ngOnInit() {
    super.ngOnInit();
    this.searchCtrl.valueChanges
      .pipe(
        // filter((res) => res.length > 2),
        // Time in milliseconds between key events
        debounceTime(500),
        // If previous query is different from current
        distinctUntilChanged(),
        takeUntil(this._onDestroy),
      )
      .subscribe((term) => {
        const extra = term.length ? `/autocomplete?query=${term}` : '';
        this.http.get(`https://api.openbrewerydb.org/breweries${extra}`).subscribe((response: any) => {
          this.remoteResults.next(response);
        });
      });
    this.searchCtrl.setValue('', { emitEvent: true });
  }
}

/**
 * @title Just Criteria Example
 */
@Component({
  selector: 'just-criteria-example',
  templateUrl: 'just-criteria-example.html',
  styleUrls: ['just-criteria-example.css'],
})
export class JustCriteriaExample implements OnInit {
  criteriaBuilder = viewChild(CriteriaBuilderComponent);

  queryForm: AbstractControl;
  config: any = null;

  and = [Conjunction.AND];
  andOr = [Conjunction.AND, Conjunction.OR];
  andOrNot = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];

  addressConfig: AddressCriteriaConfig = {
    radiusEnabled: true,
    radiusUnits: 'miles'
  };
  addressRadiusEnabled: boolean = false;
  addressRadiusEnabledOptions: { label: string, value: boolean }[] = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  useNoteMeta: boolean = false;
  useNoteMetaOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  hideFirstOperator: boolean = true;
  hideFirstOperatorOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  canBeEmpty: boolean = false;
  canBeEmptyOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  editTypeFn = (field: any) => {
    if (field.optionsType === 'Brewery') return 'custom';
    return (field.inputType || field.dataType || field.type).toLowerCase();
  };

  constructor(private formBuilder: UntypedFormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.queryForm = this.formBuilder.group({ criteria: [] });
    this.getFieldConfig(this.useNoteMeta).then((fields) => {
      this.prepopulateForm();
      this.config = { fields };
      this.cdr.detectChanges();
    });
  }

  getFieldConfig(useNoteMeta: boolean) {
    const allMetas = useNoteMeta ? [MockCandidateMeta, MockNoteMeta] : [MockCandidateMeta];
    return Promise.all(allMetas).then((metas) => {
      return metas.map((it) => ({
        value: it.entity,
        label: it.label,
        options: it.fields,
        find: (name: string) => it.fields.find((f) => f.name === name),
        search: (term: string) => {
          return it.fields.filter((f) => f.name.includes(term) || f.label.includes(term));
        },
      }));
    });
  }

  setFieldConfig(useNoteMeta: boolean) {
    this.resetQueryForm();
    this.getFieldConfig(useNoteMeta).then((fields) => {
      this.config = { fields };
      this.cdr.detectChanges();
    });
  }

  prepopulateForm(addAdditionalScope = false) {
    const prepopulatedData: any = [
      {
        $and: [
          {
            field: 'id',
            operator: 'equalTo',
            scope: 'Candidate',
            value: 123,
          }, {
            field: 'availability',
            operator: 'includeAny',
            scope: 'Candidate',
            value: ['test'],
          }, {
            field: 'customDate1',
            operator: 'within',
            scope: 'Candidate',
            value: '-30',
          }, {
            field: 'address',
            operator: 'includeAny',
            scope: 'Candidate',
            value: null,
            supportingValue: 5,
          },
        ],
      },
    ];
    const prepopulatedNoteConditions: any = {
      $not: [
        {
          field: 'notes.action',
          operator: 'includeAny',
          scope: 'Note',
          value: ['Left Message'],
        }, {
          field: 'notes.dateAdded',
          operator: 'within',
          scope: 'Note',
          value: '-7',
        },
      ],
    };
    if (addAdditionalScope) {
      prepopulatedData.push(prepopulatedNoteConditions);
    }
    this.setQueryForm(prepopulatedData);
  }

  resetQueryForm(addAdditionalScope = false) {
    this.criteriaBuilder().clearAllConditions();
    this.prepopulateForm(addAdditionalScope);
  }

  setQueryForm(criteria?) {
    this.queryForm.setValue({ criteria });
  }

  onSubmit() {
    console.log('Your form data : ', this.queryForm.value);
  }

  resetGroups() {
    this.criteriaBuilder().clearAllConditions();
    this.criteriaBuilder().addConditionGroup();
  }

  addressRadiusEnabledChanged(enabled: boolean) {
    this.addressConfig = Object.assign({}, this.addressConfig, { radiusEnabled: enabled });
  }

  addressRadiusUnitsSelected(units: AddressRadiusUnitsName) {
    this.addressConfig = Object.assign({}, this.addressConfig, { radiusUnits: units });
  }
}
