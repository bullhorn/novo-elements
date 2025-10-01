import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, UntypedFormBuilder } from '@angular/forms';
import { ConditionGroupComponent } from './condition-group.component';
import { QueryBuilderService } from '../query-builder.service';
import { NovoLabelService } from '../../../services';
import { NovoFlexModule } from '../../../elements/flex';
import { of } from 'rxjs';

/**
 * Test suite for the ConditionGroupComponent
 * 
 * This test suite covers the initialization and behavior of the ConditionGroupComponent,
 * specifically testing the cantRemoveRow method under various conditions.
 * 
 * It includes tests to verify:
 * - Component initialization
 * - Conditions for removing rows based on the number of groups in the parent form
 */
describe('ConditionGroupComponent', () => {
  let fixture: ComponentFixture<ConditionGroupComponent>;
  let component: ConditionGroupComponent;
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  const parentForm = formBuilder.group({ criteria: [] });

  class MockControlContainer {
    public control = parentForm;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionGroupComponent],
      providers: [
        { provide: QueryBuilderService, useClass: QueryBuilderService },
        { provide: ControlContainer, useClass: MockControlContainer },
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
      imports: [
        NovoFlexModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConditionGroupComponent);
    component = fixture.debugElement.componentInstance;
  });
  
  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnChanges', () => {
    it('should call updateGroupScopeAndEntity', () => {
      const updateSpy = jest.spyOn(component, 'updateGroupScopeAndEntity').mockImplementation();

      component.ngOnChanges();

      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});

  describe('updateGroupScopeAndEntity', () => {
    beforeEach(() => {
      component.controlName = '$and';
      jest.spyOn((component as any).qbs, 'scopes').mockReturnValue(['defaultScope']);
    });

    it('should update scope and entity from form values', () => {
      const mockParentForm = {
        value: {
          '$and': [
            { 
              scope: 'testScope', 
              entity: 'testEntity',
              field: 'testField' 
            }
          ]
        }
      };
      component.parentForm = mockParentForm as any;

      component.updateGroupScopeAndEntity();

      expect(component.scope).toBe('testScope');
      expect(component.entity).toBe('testEntity');
    });

    it('should use default scope when no scope in form values', () => {
      const mockParentForm = {
        value: {
          '$and': [{ field: 'testField' }] // No scope property
        }
      };
      component.parentForm = mockParentForm as any;

      component.updateGroupScopeAndEntity();

      expect(component.scope).toBe('defaultScope');
      expect(component.entity).toBeUndefined();
    });
  });

  describe('sanitizeCondition', () => {
    it('should return only the expected Condition properties', () => {
      const inputCondition = {
        conditionType: '$or',
        field: 'testField',
        operator: 'equals',
        scope: 'testScope',
        value: 'testValue',
        supportingValue: 'testSupportingValue',
        entity: 'testEntity',
        // Extra properties that should be filtered out
        extraProp1: 'should be removed',
        extraProp2: 123,
        someOtherData: { nested: 'object' }
      };

      const result = component['sanitizeCondition'](inputCondition);

      expect(result).toEqual({
        conditionType: '$or',
        field: 'testField',
        operator: 'equals',
        scope: 'testScope',
        value: 'testValue',
        supportingValue: 'testSupportingValue',
        entity: 'testEntity'
      });
    });

    it('should handle null and undefined values', () => {
      // Arrange
      const inputCondition = {
        conditionType: '$and',
        field: null,
        operator: undefined,
        scope: 'testScope',
        value: null,
        supportingValue: undefined,
        entity: null
      };

      const result: any = component['sanitizeCondition'](inputCondition);

      expect(result).toEqual({
        conditionType: '$and',
        field: null,
        operator: undefined,
        scope: 'testScope',
        value: null,
        supportingValue: undefined,
        entity: null
      });
    });

    it('should handle missing properties gracefully', () => {
      const inputCondition = {
        conditionType: '$and',
        field: 'testField'
        // Missing other properties
      };

      const result: any = component['sanitizeCondition'](inputCondition);

      expect(result).toEqual({
        conditionType: '$and',
        field: 'testField',
        operator: undefined,
        scope: undefined,
        value: undefined,
        supportingValue: undefined,
        entity: undefined
      });
    });
  });

  describe('addCondition', () => {
    it('should create and add new condition to FormArray', () => {
      const mockFormArray = { push: jest.fn(), value: [] };
      Object.defineProperty(component, 'root', { get: () => mockFormArray, configurable: true });
      
      const mockFormGroup = {} as any;
      jest.spyOn(component, 'newCondition').mockReturnValue(mockFormGroup);
      jest.spyOn(component['cdr'], 'markForCheck').mockImplementation();
      jest.spyOn(component.qbs, 'hasMultipleScopes').mockReturnValue(false);

      component.addCondition();

      expect(component.newCondition).toHaveBeenCalled();
      expect(mockFormArray.push).toHaveBeenCalledWith(mockFormGroup);
    });
  });

  describe('removeCondition', () => {
    beforeEach(() => {
      jest.spyOn(component['cdr'], 'markForCheck').mockImplementation();
      spyOn(component, 'addCondition');
    });

    it('should remove condition at specified index', () => {
      const mockFormArray = {
        removeAt: jest.fn(),
        length: 2
      };
      Object.defineProperty(component, 'root', {
        get: () => mockFormArray,
        configurable: true
      });
      
      jest.spyOn(component, 'cantRemoveRow').mockReturnValue(false);
      jest.spyOn(component.qbs as any, 'scopes').mockReturnValue(['primaryScope']);

      component.removeCondition(1);

      expect(mockFormArray.removeAt).toHaveBeenCalledWith(1);
      expect(component.addCondition).not.toHaveBeenCalled();
    });
    it('should call addCondition if cantRemoveRow is true', () => {
      const mockFormArray = {
        removeAt: jest.fn(),
        length: 2
      };
      Object.defineProperty(component, 'root', {
        get: () => mockFormArray,
        configurable: true
      });
      
      jest.spyOn(component, 'cantRemoveRow').mockReturnValue(true);
      jest.spyOn(component.qbs as any, 'scopes').mockReturnValue(['primaryScope']);

      component.removeCondition(1);

      expect(component.addCondition).toHaveBeenCalled();
    });
    it('should call addCondition if canBeEmpty is false', () => {
      const mockFormArray = {
        removeAt: jest.fn(),
        length: 1
      };
      Object.defineProperty(component, 'root', {
        get: () => mockFormArray,
        configurable: true
      });
      
      jest.spyOn(component, 'cantRemoveRow').mockReturnValue(false);
      jest.spyOn(component.qbs as any, 'scopes').mockReturnValue(['primaryScope']);
      component.scope = 'primaryScope';
      component.canBeEmpty = false;

      component.removeCondition(1);

      expect(component.addCondition).toHaveBeenCalled();
    });
  });

  describe('Function: cantRemoveRow', () => {
    it('should return false if the parent form has more than 1 group', () => {
      (component.parentForm as any) = {
        parent: [
          { form: { id: 1 } },
          { form: { id: 2 } },
        ],
      };
      expect(component.cantRemoveRow()).toBeFalsy();
    });
    it('should return true if the parent form has only 1 group', () => {
      jest.spyOn(component, 'root', 'get').mockReturnValue([{ form: { id: 1 } }] as any);
      (component.parentForm as any) = {
        parent: [
          { form: { id: 1 } },
        ],
      };
      expect(component.cantRemoveRow()).toBeTruthy();
    });
    it('should return true if the parent form has no groups', () => {
      jest.spyOn(component, 'root', 'get').mockReturnValue([] as any);
      (component.parentForm as any) = {
        parent: [],
      };
      expect(component.cantRemoveRow()).toBeTruthy();
    });
  });

  describe('root getter', () => {
    it('should return FormArray from parentForm using controlName', () => {
      const mockFormArray = new FormArray([]);
      const mockParentForm = {
        get: jest.fn().mockReturnValue(mockFormArray)
      };
      
      component.parentForm = mockParentForm as any;
      component.controlName = '$and';

      const result = component.root;

      expect(mockParentForm.get).toHaveBeenCalledWith('$and');
      expect(result).toBe(mockFormArray);
    });
  });
});
