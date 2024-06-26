// NG
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// App
import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';
import { NovoLabelService } from 'novo-elements/services';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <form [formGroup]="form">
    <novo-select #select extupdatefix formControlName="value" multiple>
      <novo-option value="1">One</novo-option>
      <novo-option value="2">Two</novo-option>
      <novo-option value="3">Three</novo-option>
    </novo-select>
  </form>`
})
class FixedSelectComponent {
  @ViewChild('select')
  select: NovoSelectElement;

  form = new FormGroup({
    value: new FormControl(['2'])
  });
}

describe('Directive: NovoSelectExtUpdateFix', () => {
  let fixture: ComponentFixture<FixedSelectComponent>;
  let comp: FixedSelectComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NovoSelectModule, NovoOptionModule, FormsModule, ReactiveFormsModule],
      providers: [NovoLabelService],
      declarations: [FixedSelectComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FixedSelectComponent);
    comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should update checkboxes when the ngmodel value is updated externally', () => {
    expect(comp.select.contentOptions.map(opt => opt.selected)).toEqual([false, true, false]);
    comp.form.controls.value.setValue(['1']);
    expect(comp.select.contentOptions.map(opt => opt.selected)).toEqual([true, false, false]);
  });

  // This case may arise if, for instance, a dynamic form is about to transform this
  // control from a novo-select to something else.
  it('should not trigger errors from negative use-case variables', () => {
    (comp.form.controls.value as FormControl).setValue('candy');
  })
});