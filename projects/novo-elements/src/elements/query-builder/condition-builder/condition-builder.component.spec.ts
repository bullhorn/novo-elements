// NG2
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NovoQueryBuilderModule } from '../query-builder.module';
import { ConditionBuilderComponent } from './condition-builder.component';
import { ControlContainer, UntypedFormBuilder } from '@angular/forms';
import { QueryBuilderService } from '../query-builder.service';
import { BaseFieldDef } from '../query-builder.types';

// Mock representation of the template definition for each field type
const BooleanDef = Symbol('BooleanDef');

class MockQueryBuilderService {
    config: any;
    componentHost = false;
    private fieldDefs = new Map([
        ['BOOLEAN', BooleanDef],
    ]);
    getFieldDefsByName() {
        return this.fieldDefs;
    }
}

// App

describe('ConditionBuilderComponent', () => {
  let fixture: ComponentFixture<ConditionBuilderComponent>;
  let component: ConditionBuilderComponent;
  let queryBuilderService: QueryBuilderService;
  let createFieldOperators: jasmine.Spy;

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
    fields: [{
      value: 'MockEntity',
      label: 'Mock Entity',
      options: [defaultField],
      find: (field: string) => fieldConfig.fields[0].options.find(f => f.name === field),
    }],
  }

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
    createFieldOperators = spyOn<any>(component, 'createFieldOperators');
    parentForm.controls.field.setValue('testradio');
    spyOn<any>(component, 'createFieldInput');
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
    ]
    fixture.componentRef.setInput('config', fieldConfig);

    fixture.detectChanges();
    tick();
    expect(createFieldOperators).toHaveBeenCalledWith(queryBuilderService.getFieldDefsByName().get('SELECT'));

    createFieldOperators.calls.reset();

    defaultField.options = [
      { value: 0, label: 'Opt1' },
    ];

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
});
