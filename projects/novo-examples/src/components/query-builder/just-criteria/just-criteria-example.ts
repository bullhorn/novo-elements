import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { AbstractConditionFieldDef, Conjunction, CriteriaBuilderComponent, NovoLabelService } from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MockMeta } from './MockMeta';

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
  defaultOperator = 'includeAny';
  searchCtrl: FormControl = new FormControl();
  /** list of results filtered by search keyword */
  remoteResults: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(public http: HttpClient, labels: NovoLabelService) {
    super(labels);
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchCtrl.valueChanges
      .pipe(
        // filter((res) => res.length > 2),
        // Time in milliseconds between key events
        debounceTime(500),
        // If previous query is diffent from current
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
  @ViewChild('criteriaBuilder', { static: true }) criteriaBuilder: CriteriaBuilderComponent;

  queryForm: AbstractControl;
  config: any = null;

  and = [Conjunction.AND];
  andOr = [Conjunction.AND, Conjunction.OR];
  andOrNot = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];

  editTypeFn = (field: any) => {
    if (field.optionsType === 'Brewery') return 'custom';
    return (field.inputType || field.dataType || field.type).toLowerCase();
  };

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.queryForm = this.formBuilder.group({ criteria: [] });
    this.getFieldConfig().then((fields) => {
      this.prepopulateForm();
      this.config = { fields };
      this.cdr.detectChanges();
    });
    // this.setQueryForm([]);
  }

  getFieldConfig() {
    return Promise.all([MockMeta]).then((metas) => {
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

  prepopulateForm() {
    const prepopulatedData = [
      {
        scope: 'Candidate',
        field: 'id',
        operator: 'equalTo',
        value: 123,
      },
      {
        scope: 'Candidate',
        field: 'availability',
        operator: 'includeAny',
        value: ['test'],
      },
      {
        scope: 'Candidate',
        field: 'customDate1',
        operator: 'between',
        value: {
          startDate: '1922-01-01',
          endDate: '1922-01-17',
        }
      },
      // where=category IN (1,2,3)
      // where=category.id:[1 2 3]
    ];
    this.setQueryForm(prepopulatedData);
  }

  resetQueryForm() {
    this.setQueryForm({ criteria: [] });
  }

  setQueryForm(criteria?) {
    this.queryForm.setValue({ criteria });
  }

  onSubmit() {
    console.log('Your form data : ', this.queryForm.value);
  }
}
