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

const mockCriteria: Criteria = {
  criteria: [{
    $and: [{
      field: 'address',
      operator: 'radius',
      value: [{
        address_components: [{
          long_name: '8485',
          short_name: '8485',
          types: ['street_number']
        }, {
          long_name: 'Mexico Road',
          short_name: 'Mexico Rd',
          types: ['route']
        }, {
          long_name: 'O\'Fallon',
          short_name: 'O\'Fallon',
          types: ['locality', 'political']
        }, {
          long_name: 'Dardenne Township',
          short_name: 'Dardenne Township',
          types: ['administrative_area_level_3', 'political']
        }, {
          long_name: 'St. Charles County',
          short_name: 'St Charles County',
          types: ['administrative_area_level_2', 'political']
        }, {
          long_name: 'Missouri',
          short_name: 'MO',
          types: ['administrative_area_level_1', 'political']
        }, {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political']
        }, {
          long_name: '63366',
          short_name: '63366',
          types: ['postal_code']
        }],
        formatted_address: '8485 Mexico Rd, O\'Fallon, MO 63366, USA',
        geometry: {
          location: {
            lat: 38.791613,
            lng: -90.6925924
          },
          viewport: {
            south: 38.79027026970849,
            west: -90.6939395302915,
            north: 38.79296823029149,
            east: -90.6912415697085
          }
        },
        place_id: 'ChIJ2cLuK-nQ3ocRh1uhB7-g30A'
      }, {
        address_components: [{
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political']
        }, {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political']
        }],
        formatted_address: 'Texas, USA',
        geometry: {
          location: {
            lat: 31.9685988,
            lng: -99.9018131
          },
          viewport: {
            south: 25.83711645856708,
            west: -106.6456460547471,
            north: 36.50112613904738,
            east: -93.50803894473373
          }
        },
        place_id: 'ChIJSTKCCzZwQIYRPN4IGI8c6xY'
      }, {
        address_components: [{
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political']
        }],
        formatted_address: 'United States',
        geometry: {
          location: {
            lat: 37.09024,
            lng: -95.712891
          },
          viewport: {
            south: 15.7760139,
            west: -173.2992296,
            north: 72.7087158,
            east: -66.3193754
          }
        },
        place_id: 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw'
      }]
    }, {
      field: 'id',
      operator: 'equalTo',
      value: 123,
    }, {
      field: 'availability',
      operator: 'includeAny',
      value: ['test'],
    }, {
      field: 'customDate1',
      operator: 'within',
      value: '-30',
    }, {
      field: 'customDate1',
      operator: 'within',
      value: '-30',
    }, {
      field: 'customDate2',
      operator: 'before',
      value: '2024-07-25T19:00:00.000Z'
    }],
    $or: [{
      field: 'activePlacements',
      operator: 'isEmpty',
      value: true,
    }, {
      field: 'canEnterTime',
      operator: 'include',
      value: false
    }]
  }]
}

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
  it('should populate with individual criteria row templates', () => {
    // TODO: Test that there is only the one default empty row template
    parentForm.setValue(mockCriteria);
    fixture.detectChanges();
    // TODO: Test the number of rows match the mock criteria
    expect(parentForm.value).toEqual(mockCriteria);
  });
});
