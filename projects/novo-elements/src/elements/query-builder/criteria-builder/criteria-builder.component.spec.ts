import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormBuilder, Validators } from '@angular/forms';
import { NovoLabelService } from '../../../services';
import { AddressData, Condition, Criteria, NovoFlexModule, NovoQueryBuilderModule, Operator } from '../../index';
import { QueryBuilderService } from '../query-builder.service';
import { CriteriaBuilderComponent } from './criteria-builder.component';

const testAddressValue: AddressData[] = [{
  address_components: [{
    long_name: '8485',
    short_name: '8485',
    types: ['street_number'],
  }, {
    long_name: 'Mexico Road',
    short_name: 'Mexico Rd',
    types: ['route'],
  }, {
    long_name: 'O\'Fallon',
    short_name: 'O\'Fallon',
    types: ['locality', 'political'],
  }, {
    long_name: 'Dardenne Township',
    short_name: 'Dardenne Township',
    types: ['administrative_area_level_3', 'political'],
  }, {
    long_name: 'St. Charles County',
    short_name: 'St Charles County',
    types: ['administrative_area_level_2', 'political'],
  }, {
    long_name: 'Missouri',
    short_name: 'MO',
    types: ['administrative_area_level_1', 'political'],
  }, {
    long_name: 'United States',
    short_name: 'US',
    types: ['country', 'political'],
  }, {
    long_name: '63366',
    short_name: '63366',
    types: ['postal_code'],
  }],
  formatted_address: '8485 Mexico Rd, O\'Fallon, MO 63366, USA',
  geometry: {
    location: {
      lat: 38.791613,
      lng: -90.6925924,
    },
    viewport: {
      south: 38.79027026970849,
      west: -90.6939395302915,
      north: 38.79296823029149,
      east: -90.6912415697085,
    },
  },
  place_id: 'ChIJ2cLuK-nQ3ocRh1uhB7-g30A',
  radius: {
    value: 30,
    units: 'miles',
  },
}, {
  address_components: [{
    long_name: 'Texas',
    short_name: 'TX',
    types: ['administrative_area_level_1', 'political'],
  }, {
    long_name: 'United States',
    short_name: 'US',
    types: ['country', 'political'],
  }],
  formatted_address: 'Texas, USA',
  geometry: {
    location: {
      lat: 31.9685988,
      lng: -99.9018131,
    },
    viewport: {
      south: 25.83711645856708,
      west: -106.6456460547471,
      north: 36.50112613904738,
      east: -93.50803894473373,
    },
  },
  place_id: 'ChIJSTKCCzZwQIYRPN4IGI8c6xY',
}, {
  address_components: [{
    long_name: 'United States',
    short_name: 'US',
    types: ['country', 'political'],
  }],
  formatted_address: 'United States',
  geometry: {
    location: {
      lat: 37.09024,
      lng: -95.712891,
    },
    viewport: {
      south: 15.7760139,
      west: -173.2992296,
      north: 72.7087158,
      east: -66.3193754,
    },
  },
  place_id: 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
  radius: {
    value: 30,
    units: 'miles',
  },
}];

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

const condition4: Condition = {
  field: 'address',
  operator: 'radius',
  value: testAddressValue,
};

const testCriteria: Criteria = {
  criteria: [{
    $and: [condition1, condition2, condition3, condition4],
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
        NovoFlexModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CriteriaBuilderComponent);
    component = fixture.debugElement.componentInstance;
    component.controlName = 'criteria';
    component.config = [{
      value: 'value',
      label: 'label',
    }];
    const mockPicker = {
        dropdown: {
            closePanel() {},
        },
    };
    component.innerForm = formBuilder.group({ criteria: formBuilder.array([]) });
    component.scopedFieldPicker = (() => mockPicker) as any;
  });

  it('should subscribe to changes in the parent form', () => {
    expect(parentForm.value).toEqual({ criteria: null });
    parentForm.setValue(testCriteria);
    expect(parentForm.value).toEqual(testCriteria);
  });

  describe('Function: isConditionGroup(group)', () => {
    it('should return true if all keys in group are $conjunctions', () => {
      const result = (component as any).isConditionGroup({ $and: [], $or: [], $not: [] });
      expect(result).toEqual(true);
    });
    it('should return true if group is empty', () => {
      const result = (component as any).isConditionGroup({});
      expect(result).toEqual(true);
    });
    it('should return false if any key in the group is not a $conjunction', () => {
      const result = (component as any).isConditionGroup({ $and: [], $or: [], $bad: [] });
      expect(result).toEqual(false);
    });
  });

  describe('Function: newCondition(condition)', () => {
    it('should set empty condition if no condition passed in', () => {
      const result = component.newCondition();
      const expected = formBuilder.group({
        conditionType: '$and',
        field: [null, Validators.required],
        operator: [null, Validators.required],
        scope: [null],
        value: [null],
      });
      expect(result.toString()).toEqual(expected.toString());
    });

    it('should initialize EMPTY_CONDITION with warnOnDelete as false and check all fields', () => {
      const result = component.newCondition();
      expect(result.get('conditionType')?.value).toBe('$and');
      expect(result.get('field')?.value).toBeNull();
      expect(result.get('operator')?.value).toBeNull();
      expect(result.get('scope')?.value).toBeNull();
      expect(result.get('value')?.value).toBeNull();
      expect(result.get('supportingValue')?.value).toBeNull();
      expect(result.get('entity')?.value).toBeNull();
      expect(result.get('warnOnDelete')?.value).toBe(false);
    });

    it('should set all values when passed a complete condition', () => {
      const testCondition: Condition = {
        field: 'Candidate.email',
        operator: 'contains',
        scope: 'Candidate',
        value: 'test@example.com',
        supportingValue: 'supportValue',
        entity: 'Candidate',
        warnOnDelete: true,
      };
      component.config = {
        fields: [
          { value: 'Candidate', entity: 'Candidate', label: 'Candidate' },
        ],
      };
      const result = component.newCondition(testCondition);
      expect(result.get('conditionType')?.value).toBe('$and');
      expect(result.get('field')?.value).toBe('Candidate.email');
      expect(result.get('operator')?.value).toBe('contains');
      expect(result.get('scope')?.value).toBe('Candidate');
      expect(result.get('value')?.value).toBe('test@example.com');
      expect(result.get('supportingValue')?.value).toBe('supportValue');
      expect(result.get('entity')?.value).toBe('Candidate');
      expect(result.get('warnOnDelete')?.value).toBe(true);
    });
  });

  describe('Function: onFieldSelect(field)', () => {
    const MOCK_FIELD = {
      name: 'mock field',
      scope: 'mockScope',
    };
    const MOCK_CONDITION_GROUP_1 = {
      addCondition: () => {},
      scope: 'mockScope',
    };
    const MOCK_CONDITION_GROUP_2 = {
      addCondition: () => {},
      scope: 'differentScope',
    };
    it('should close the dropdown', () => {
      spyOn(component.scopedFieldPicker().dropdown, 'closePanel');
      component.onFieldSelect(MOCK_FIELD);
      expect(component.scopedFieldPicker().dropdown.closePanel).toHaveBeenCalled();
    });
    it('if a scoped group already exists for the field, add the condition to that group', () => {
      spyOn(MOCK_CONDITION_GROUP_1, 'addCondition');
      spyOn(component, 'conditionGroups').and.returnValue([MOCK_CONDITION_GROUP_1, MOCK_CONDITION_GROUP_2]);
      component.onFieldSelect(MOCK_FIELD);
      expect(MOCK_CONDITION_GROUP_1.addCondition).toHaveBeenCalled();
    });
    it('if a scoped group does not already exist for the field, add a new group with the condition', () => {
      spyOn(component, 'addConditionGroup');
      spyOn(component, 'conditionGroups').and.returnValue([MOCK_CONDITION_GROUP_2]);
      component.onFieldSelect(MOCK_FIELD);
      expect(component.addConditionGroup).toHaveBeenCalled();
    });
  });

  describe('Function: getFieldEntity', () => {
    it('should return the entity when field with matching scope is found', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user', entity: 'User' },
          { value: 'company', entity: 'Company' },
          { value: 'contact', entity: 'Contact' },
        ],
      };
      const scope = 'company';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBe('Company');
    });
    it('should return undefined when no field with matching scope is found', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user', entity: 'User' },
          { value: 'company', entity: 'Company' },
        ],
      };
      const scope = 'nonexistent';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeUndefined();
    });
    it('should return null when fieldConfigs is null', () => {
      const fieldConfigs = null;
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeNull();
    });
    it('should return null when fieldConfigs is undefined', () => {
      const fieldConfigs = undefined;
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeNull();
    });
    it('should return null when fieldConfigs.fields is not an array', () => {
      const fieldConfigs = {
        fields: 'not an array',
      };
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeNull();
    });
    it('should return null when fieldConfigs.fields is null', () => {
      const fieldConfigs = {
        fields: null,
      };
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeNull();
    });
    it('should return undefined when fieldConfigs.fields is an empty array', () => {
      const fieldConfigs = {
        fields: [],
      };
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeUndefined();
    });
    it('should return the first matching entity when multiple fields have the same scope', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user', entity: 'User' },
          { value: 'user', entity: 'UserProfile' },
          { value: 'company', entity: 'Company' },
        ],
      };
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBe('User');
    });
    it('should handle fields without entity property gracefully', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user' },
          { value: 'company', entity: 'Company' },
        ],
      };
      const scope = 'user';

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBeUndefined();
    });
    it('should handle scope parameter being null', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user', entity: 'User' },
          { value: null, entity: 'NullScope' },
        ],
      };
      const scope = null;

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBe('NullScope');
    });
    it('should handle scope parameter being undefined', () => {
      const fieldConfigs = {
        fields: [
          { value: 'user', entity: 'User' },
          { value: undefined, entity: 'UndefinedScope' },
        ],
      };
      const scope = undefined;

      const result = component.getFieldEntity(fieldConfigs, scope);

      expect(result).toBe('UndefinedScope');
    });
  });
});
