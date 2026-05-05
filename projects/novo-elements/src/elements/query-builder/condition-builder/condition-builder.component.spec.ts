import { vi } from 'vitest';
// NG2
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ControlContainer, UntypedFormBuilder } from '@angular/forms';
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

// App

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

  beforeEach(waitForAsync(() => {
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
  }));

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should coalesce a radio input type to a boolean template', fakeAsync(() => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('BOOLEAN'));
  }));

  it('should coalesce a radio input type to a select template when 3 or 1 options are present', fakeAsync(() => {
    defaultField.dataType = 'String';
    defaultField.options = [
      { value: 0, label: 'Opt1' },
      { value: 1, label: 'Opt2' },
      { value: 2, label: 'Opt3' },
    ];
    fixture.componentRef.setInput('config', fieldConfig);

    fixture.detectChanges();
    tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('SELECT'));

    createFieldOperators.mockClear();

    defaultField.options = [{ value: 0, label: 'Opt1' }];

    component.resetInputAndOperator();

    fixture.detectChanges();
    tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('SELECT'));
  }));

  it('should coalesce a radio input type to a boolean template when 2 options are present', fakeAsync(() => {
    defaultField.options = [
      { value: 0, label: 'Opt1' },
      { value: 1, label: 'Opt2' },
    ];
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('BOOLEAN'));
  }));

  it('should skip createFieldTemplates when resetInputAndOperator is called with recreateTemplates=false', fakeAsync(() => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    tick();

    const createFieldTemplatesSpy = vi.spyOn(component as any, 'createFieldTemplates');
    createFieldOperators.mockClear();

    component.resetInputAndOperator(false);

    expect(createFieldTemplatesSpy).not.toHaveBeenCalled();
  }));

  it('should call createFieldTemplates when resetInputAndOperator is called with recreateTemplates=true (default)', fakeAsync(() => {
    fixture.componentRef.setInput('config', fieldConfig);
    fixture.detectChanges();
    tick();

    const createFieldTemplatesSpy = vi.spyOn(component as any, 'createFieldTemplates');
    createFieldOperators.mockClear();

    component.resetInputAndOperator(true);

    expect(createFieldTemplatesSpy).toHaveBeenCalled();
  }));

  describe('updateFieldSelection with allowEmptyField', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('config', fieldConfig);
      parentForm.controls.supportingValue = formBuilder.control(null);
      fixture.detectChanges();
    });

    it('should not set default field when allowEmptyField is true and no field is selected', fakeAsync(() => {
      component.allowEmptyField = true;
      parentForm.get('field')!.setValue(null);
      const getDefaultFieldSpy = vi.spyOn(component, 'getDefaultField');

      tick();

      component.updateFieldSelection();
      tick();

      // When allowEmptyField is true, getDefaultField should not be called
      expect(getDefaultFieldSpy).not.toHaveBeenCalled();
    }));

    it('should set default field when allowEmptyField is false and no field is selected', fakeAsync(() => {
      component.allowEmptyField = false;
      parentForm.get('field')!.setValue(null);
      const setValueSpy = vi.spyOn(parentForm.get('field')!, 'setValue');

      tick();

      component.updateFieldSelection();
      tick();

      // When allowEmptyField is false, should try to set default field
      expect(setValueSpy).toHaveBeenCalledWith(expect.anything());
    }));
  });

  describe('clearCondition', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('config', fieldConfig);
      parentForm.controls.supportingValue = formBuilder.control(null);
      fixture.detectChanges();
    });

    it('should clear all form values', fakeAsync(() => {
      // Set up form with values
      parentForm?.get('field')?.setValue('testradio');
      parentForm?.get('operator')?.setValue('equals');
      parentForm?.get('value')?.setValue('someValue');
      parentForm?.get('supportingValue')?.setValue('supportingValue');

      tick();

      // Spy on setValue to verify it's called with null
      const fieldSetValueSpy = vi.spyOn(parentForm.get('field')!, 'setValue');
      const operatorSetValueSpy = vi.spyOn(parentForm.get('operator')!, 'setValue');
      const valueSetValueSpy = vi.spyOn(parentForm.get('value')!, 'setValue');
      const supportingValueSetValueSpy = vi.spyOn(parentForm.get('supportingValue')!, 'setValue');

      // Call clearCondition
      component.clearCondition();

      // Verify setValue was called on each control with null
      expect(fieldSetValueSpy).toHaveBeenCalledWith(null);
      expect(operatorSetValueSpy).toHaveBeenCalledWith(null);
      expect(valueSetValueSpy).toHaveBeenCalledWith(null);
      expect(supportingValueSetValueSpy).toHaveBeenCalledWith(null);
    }));

    it('should reset the search term', fakeAsync(() => {
      component.searchTerm.setValue('test search');

      tick();

      const searchTermSetValueSpy = vi.spyOn(component.searchTerm, 'setValue');

      component.clearCondition();

      expect(searchTermSetValueSpy).toHaveBeenCalledWith('');
    }));

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
