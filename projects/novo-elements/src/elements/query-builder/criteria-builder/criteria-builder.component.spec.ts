import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormBuilder } from '@angular/forms';
import { NovoLabelService } from '../../../services';
import { Condition, Criteria, NovoFlexModule, NovoQueryBuilderModule, Operator } from '../../index';
import { QueryBuilderService } from '../query-builder.service';
import { CriteriaBuilderComponent } from './criteria-builder.component';

const condition1: Condition = {
  field: 'Candidate.email',
  operator: 'excludeAny',
  value: [
    'cba',
    'fed',
  ],
};

const condition2: Condition = {
  field: 'Candidate.status',
  operator: Operator.equalTo,
  value: 'New Lead',
};

const condition3: Condition = {
  field: 'Candidate.email',
  operator: Operator.includeAny,
  value: [
    'abc',
    'def',
  ],
};

const testCriteria: Criteria = {
  criteria: [{
    $and: [condition1, condition2, condition3],
  }],
};

describe('CriteriaBuilderComponent', () => {
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  const parentForm = formBuilder.group({ criteria: [] });
  let fixture: ComponentFixture<CriteriaBuilderComponent>;
  let component: CriteriaBuilderComponent;

  class MockControlContainer {
    public control = parentForm;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriteriaBuilderComponent],
      providers: [
        { provide: QueryBuilderService, useClass: QueryBuilderService },
        { provide: ControlContainer, useClass: MockControlContainer },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
      imports: [
        NovoQueryBuilderModule,
        NovoFlexModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CriteriaBuilderComponent);
    component = fixture.debugElement.componentInstance;
    component.controlName = 'criteria';
    component.config = [{
      value: 'value',
      label: 'label',
    }];
  });

  it('should subscribe to changes in the parent form', () => {
    expect(parentForm.value).toEqual({ criteria: null });
    parentForm.setValue(testCriteria);
    expect(parentForm.value).toEqual(testCriteria);
  });
});
