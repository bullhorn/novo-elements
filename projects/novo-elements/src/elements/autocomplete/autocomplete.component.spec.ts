import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { NovoChipList } from '../chips/ChipList';
import { NovoChipsModule } from '../chips/Chips.module';
import { NovoCommonModule } from '../common/common.module';
import { NovoOption, NovoOptionModule, NovoOptionSelectionChange } from '../common/option';
import { NovoFieldModule } from '../field/field.module';
import { NovoAutocompleteElement } from './autocomplete.component';
import { NovoAutoCompleteModule } from './autocomplete.module';

interface MockOption {
  label: string;
  id: string;
}

@Component({
  selector: 'test-autocomplete',
  template: `
    <novo-field>
      <novo-label>Favorite fruits</novo-label>
      <novo-chip-list #chipList [formControl]="chipsControl">
        @for (chip of chipList.value; track chip) {
          <novo-chip [value]="chip">{{ chip.label }}</novo-chip>
        }
        <input
          #chipInput
          novoChipInput
          [formControl]="textCtrl"/>
      </novo-chip-list>
      <novo-autocomplete [makeFirstItemActive]="makeFirstItemActive" (optionSelected)="selected($event)" [multiple]="multiple">
        @for (option of options$ | async; track option) {
          <novo-option [value]="option">{{ option.label }}</novo-option>
        }
      </novo-autocomplete>
    </novo-field>
  `,
  standalone: false,
})
class TestAutocompleteComponent {
  chipsControl = new FormControl<MockOption[]>([]);
  textCtrl = new FormControl('');
  makeFirstItemActive = false;
  multiple = false;
  options$ = new ReplaySubject<MockOption[]>(1);
}

describe('Elements: NovoAutocompleteElement', () => {
  let fixture: ComponentFixture<TestAutocompleteComponent>;
  let testComponent: TestAutocompleteComponent;
  let component: NovoAutocompleteElement;
  let chipList: NovoChipList;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NovoChipsModule, NovoFieldModule,
        NovoCommonModule, NovoAutoCompleteModule, NovoOptionModule],
      declarations: [TestAutocompleteComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAutocompleteComponent);
    testComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(NovoAutocompleteElement)).componentInstance;
    chipList = fixture.debugElement.query(By.directive(NovoChipList)).componentInstance;
  }));

  beforeEach(fakeAsync(() => {
    flush();
    fixture.detectChanges();
    flush();
    discardPeriodicTasks();
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

  describe('Option expansion', () => {

    let options = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' }
    ];

    it('should add a chip to the list when an option is selected', () => {
      testComponent.options$.next(options);
      fixture.detectChanges();

      const option = component.options.get(0);
      option.onSelectionChange.emit(new NovoOptionSelectionChange(option));
      fixture.detectChanges();
      expect(chipList.value).toContain(options[0]);
    });

    it('should activate the first option if the makeFirstItemActive option is set', fakeAsync(() => {
      component.makeFirstItemActive = true;
      testComponent.options$.next(options);
      fixture.detectChanges();
      flush();
      const option: NovoOption = component.options.get(0);
      expect(option.active).toBeTruthy();
    }));
  });
});
