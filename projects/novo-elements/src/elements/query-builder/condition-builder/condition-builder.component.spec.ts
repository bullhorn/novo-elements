import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormBuilder } from '@angular/forms';
import { tick } from 'novo-testing';
import { vi } from 'vitest';
import { NovoQueryBuilderModule } from '../query-builder.module';
import { QueryBuilderService } from '../query-builder.service';
import { BaseFieldDef } from '../query-builder.types';
import { ConditionBuilderComponent } from './condition-builder.component';

// Mock representation of the template definition for each field type
const BooleanDef = Symbol('BooleanDef');

class MockQueryBuilderService {
  config: any;
  componentHost = false;
  private fieldDefs = new Map([['BOOLEAN', BooleanDef]]);
  getFieldDefsByName() {
    return this.fieldDefs;
  }
}

describe('ConditionBuilderComponent', () => {
  let fixture: ComponentFixture<ConditionBuilderComponent>;
  let component: ConditionBuilderComponent;
  let queryBuilderService: QueryBuilderService;
  let createFieldOperators: ReturnType<typeof vi.fn>;

  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  const parentForm = formBuilder.group({ field: 'x', operator: 'includeAny', value: '' });

  class MockControlContainer {
    public control = parentForm;
  }

  const defaultField: BaseFieldDef = {
    name: 'testradio',
    type: 'SCALAR',
    dataType: 'Boolean',
    inputType: 'radio',
  };

  const fieldConfig = {
    fields: [
      {
        value: 'MockEntity',
        label: 'Mock Entity',
        options: [defaultField],
        find: (field: string) => fieldConfig.fields[0].options.find((f) => f.name === field),
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NovoQueryBuilderModule],
      providers: [
        { provide: ControlContainer, useClass: MockControlContainer },
        // { provide: QueryBuilderService, useClass: MockQueryBuilderService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ConditionBuilderComponent);
    fixture.componentRef.setInput('scope', 'MockEntity');
    component = fixture.debugElement.componentInstance;
    queryBuilderService = fixture.componentRef.injector.get(QueryBuilderService);
    createFieldOperators = vi.spyOn(component as any, 'createFieldOperators');
    parentForm.controls.field.setValue('testradio');
    vi.spyOn(component as any, 'createFieldInput');
  });

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should coalesce a radio input type to a boolean template', async () => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    await tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('BOOLEAN'));
  });

  it('should coalesce a radio input type to a select template when 3 or 1 options are present', async () => {
    defaultField.dataType = 'String';
    defaultField.options = [
      { value: 0, label: 'Opt1' },
      { value: 1, label: 'Opt2' },
      { value: 2, label: 'Opt3' },
    ];
    fixture.componentRef.setInput('config', fieldConfig);

    fixture.detectChanges();
    await tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('SELECT'));

    createFieldOperators.mockClear();

    defaultField.options = [{ value: 0, label: 'Opt1' }];

    component.resetInputAndOperator();

    fixture.detectChanges();
    await tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('SELECT'));
  });

  it('should coalesce a radio input type to a boolean template when 2 options are present', async () => {
    defaultField.options = [
      { value: 0, label: 'Opt1' },
      { value: 1, label: 'Opt2' },
    ];
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    await tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('BOOLEAN'));
  });

  it('should skip createFieldTemplates when resetInputAndOperator is called with recreateTemplates=false', async () => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    await tick();

    const createFieldTemplatesSpy = vi.spyOn(component as any, 'createFieldTemplates');
    createFieldOperators.mockClear();

    component.resetInputAndOperator(false);

    expect(createFieldTemplatesSpy).not.toHaveBeenCalled();
  });

  it('should call createFieldTemplates when resetInputAndOperator is called with recreateTemplates=true (default)', async () => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    await tick();

    const createFieldTemplatesSpy = vi.spyOn(component as any, 'createFieldTemplates');
    createFieldOperators.mockClear();

    component.resetInputAndOperator(true);

    expect(createFieldTemplatesSpy).toHaveBeenCalled();
  });

  describe('updateFieldSelection with allowEmptyField', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('config', fieldConfig);
      parentForm.controls.supportingValue = formBuilder.control(null);
      fixture.detectChanges();
    });

    it('should not set default field when allowEmptyField is true and no field is selected', async () => {
      component.allowEmptyField = true;
      parentForm.controls.field.setValue(null);
      const getDefaultFieldSpy = vi.spyOn(component, 'getDefaultField');

      await tick();

      component.updateFieldSelection();
      await tick();

      // When allowEmptyField is true, getDefaultField should not be called
      expect(getDefaultFieldSpy).not.toHaveBeenCalled();
    });

    it('should set default field when allowEmptyField is false and no field is selected', async () => {
      component.allowEmptyField = false;
      parentForm.controls.field.setValue(null);
      const setValueSpy = vi.spyOn(parentForm.controls.field, 'setValue');

      await tick();

      component.updateFieldSelection();
      await tick();

      // When allowEmptyField is false, should try to set default field
      expect(setValueSpy).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('clearCondition', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('config', fieldConfig);
      parentForm.controls.supportingValue = formBuilder.control(null);
      fixture.detectChanges();
    });

    it('should clear all form values', async () => {
      // Set up form with values
      parentForm?.get('field')?.setValue('testradio');
      parentForm?.get('operator')?.setValue('equals');
      parentForm?.get('value')?.setValue('someValue');
      parentForm?.get('supportingValue')?.setValue('supportingValue');

      await tick();

      // Spy on setValue to verify it's called with null
      const fieldSetValueSpy = vi.spyOn(parentForm.controls.field, 'setValue');
      const operatorSetValueSpy = vi.spyOn(parentForm.controls.operator, 'setValue');
      const valueSetValueSpy = vi.spyOn(parentForm.controls.value, 'setValue');
      const supportingValueSetValueSpy = vi.spyOn(parentForm.controls.supportingValue, 'setValue');

      // Call clearCondition
      component.clearCondition();

      // Verify setValue was called on each control with null
      expect(fieldSetValueSpy).toHaveBeenCalledWith(null);
      expect(operatorSetValueSpy).toHaveBeenCalledWith(null);
      expect(valueSetValueSpy).toHaveBeenCalledWith(null);
      expect(supportingValueSetValueSpy).toHaveBeenCalledWith(null);
    });

    it('should reset the search term', async () => {
      component.searchTerm.setValue('test search');

      await tick();

      const searchTermSetValueSpy = vi.spyOn(component.searchTerm, 'setValue');

      component.clearCondition();

      expect(searchTermSetValueSpy).toHaveBeenCalledWith('');
    });

    it('should reset internal state (_lastContext)', () => {
      // Mock to avoid side effects
      vi.spyOn(component, 'resetInputAndOperator');
      vi.spyOn(component, 'updateFieldSelection');

      // Manually set _lastContext to simulate previous state
      (component as any)._lastContext = { field: 'testradio', operator: 'equals' };

      component.clearCondition();

      // Verify _lastContext is reset to empty object
      expect((component as any)._lastContext).toEqual({});
    });
  });
});
