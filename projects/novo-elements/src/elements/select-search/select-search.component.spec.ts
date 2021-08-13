import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject, Subject } from 'rxjs';
import { delay, take, takeUntil } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils';
import { NovoFieldModule } from '../field';
import { NovoSelectElement, NovoSelectModule } from '../select';
import { NovoSelectSearchComponent } from './select-search.component';
import { NovoSelectSearchModule } from './select-search.module';

/* tslint:disable:component-selector */

interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'novo-select-search-test',
  template: `
    <h3>Single selection</h3>
    <p>
      <novo-field>
        <novo-select [formControl]="bankCtrl" placeholder="Bank" #selectSingle>
          <ngx-novo-select-search [formControl]="bankFilterCtrl" #selectSearchSingle></ngx-novo-select-search>
          <novo-option *ngFor="let bank of filteredBanks | async" [value]="bank">
            {{ bank.name }}
          </novo-option>
        </novo-select>
      </novo-field>
    </p>
    <p>Selected Bank: {{ bankCtrl.value?.name }}</p>
    <h3>Single selection inside novo-option</h3>
    <p>
      <novo-field>
        <novo-select [formControl]="bankCtrlMatOption" placeholder="Bank" #selectSingleMatOption>
          <novo-option>
            <ngx-novo-select-search [formControl]="bankFilterCtrlMatOption" #selectSearchSingleMatOption></ngx-novo-select-search>
          </novo-option>
          <novo-option *ngFor="let bank of filteredBanksMatOption | async" [value]="bank">
            {{ bank.name }}
          </novo-option>
        </novo-select>
      </novo-field>
    </p>
    <p>Selected Bank: {{ bankCtrlMatOption.value?.name }}</p>
    <h3>Multiple selection</h3>
    <p>
      <novo-field>
        <novo-select [formControl]="bankMultiCtrl" placeholder="Banks" [multiple]="true" #selectMulti>
          <ngx-novo-select-search [formControl]="bankMultiFilterCtrl" #selectSearchMulti></ngx-novo-select-search>
          <novo-option *ngFor="let bank of filteredBanksMulti | async" [value]="bank">
            {{ bank.name }}
          </novo-option>
        </novo-select>
      </novo-field>
    </p>
    <p>Selected Banks:</p>
    <ul *ngFor="let bank of bankMultiCtrl?.value">
      <li>{{ bank.name }}</li>
    </ul>
  `,
})
export class NovoSelectSearchTestComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('selectSingle', { static: false }) novoSelect: NovoSelectElement;
  @ViewChild('selectSingleMatOption', { static: false }) novoSelectOption: NovoSelectElement;
  @ViewChild('selectMulti', { static: false }) novoSelectMulti: NovoSelectElement;
  @ViewChild('selectSearchSingle', { static: false }) novoSelectSearch: NovoSelectSearchComponent;
  @ViewChild('selectSearchSingleMatOption', { static: false }) novoSelectSearchMatOption: NovoSelectSearchComponent;
  @ViewChild('selectSearchMulti', { static: false }) novoSelectSearchMulti: NovoSelectSearchComponent;

  // control for the selected bank
  public bankCtrl: FormControl = new FormControl();
  // control for the selected bank
  public bankCtrlMatOption: FormControl = new FormControl();
  // control for the NovoSelectElement filter keyword
  public bankFilterCtrl: FormControl = new FormControl();
  // control for the NovoSelectElement filter keyword
  public bankFilterCtrlMatOption: FormControl = new FormControl();

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the NovoSelectElement filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  // list of banks
  public banks: Bank[] = [
    { name: 'Bank A', id: 'A' },
    { name: 'Bank B', id: 'B' },
    { name: 'Bank C', id: 'C' },
    { name: 'Bank DC', id: 'DC' },
  ];

  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  public filteredBanksMatOption: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  /** list of banks filtered by search keyword for multi-selection */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  public initialSingleSelection: Bank = null;
  public initialSingleSelectionMatOption: Bank = null;
  public initialMultiSelection: Bank[] = [];

  // Subject that emits when the component has been destroyed.
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    // set initial selection
    if (this.initialSingleSelection) {
      this.bankCtrl.setValue(this.initialSingleSelection);
    }
    if (this.initialSingleSelectionMatOption) {
      this.bankCtrlMatOption.setValue(this.initialSingleSelectionMatOption);
    }
    if (this.initialMultiSelection) {
      this.bankMultiCtrl.setValue(this.initialMultiSelection);
    }

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());
    this.filteredBanksMatOption.next(this.banks.slice());
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterBanks();
    });
    this.bankFilterCtrlMatOption.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterBanksMatOption();
    });
    this.bankMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterBanksMulti();
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  private setInitialValue() {
    this.filteredBanks.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredBanks are loaded initially
      // and after the novo-option elements are available
      this.novoSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      this.novoSelectOption.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      this.novoSelectMulti.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
    });
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }

    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the banks
    this.filteredBanks.next(this.banks.filter((bank) => bank.name.toLowerCase().indexOf(search) > -1));
  }

  private filterBanksMatOption() {
    if (!this.banks) {
      return;
    }

    // get the search keyword
    let search = this.bankFilterCtrlMatOption.value;
    if (!search) {
      this.filteredBanksMatOption.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the banks
    this.filteredBanksMatOption.next(this.banks.filter((bank) => bank.name.toLowerCase().indexOf(search) > -1));
  }

  private filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(this.banks.filter((bank) => bank.name.toLowerCase().indexOf(search) > -1));
  }
}

xdescribe('NovoSelectSearchComponent', () => {
  let component: NovoSelectSearchTestComponent;
  let fixture: ComponentFixture<NovoSelectSearchTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule, ReactiveFormsModule, NovoFieldModule, NovoSelectModule, NovoSelectSearchModule],
      declarations: [NovoSelectSearchTestComponent],
      providers: [
        {
          provide: LiveAnnouncer,
          useValue: {
            announce: jest.fn(),
          },
        },
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: FormUtils, useClass: FormUtils },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoSelectSearchTestComponent);
    component = fixture.componentInstance;
  });

  describe('without initial selection', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show a search field and focus it when opening the select', (done) => {
      component.filteredBanks.pipe(take(1), delay(1)).subscribe(() => {
        // when the filtered banks are initialized
        fixture.detectChanges();

        component.novoSelect.openPanel();
        fixture.detectChanges();

        component.novoSelect.openedChange.pipe(take(1), delay(1)).subscribe((opened) => {
          expect(opened).toBe(true);
          const searchField = document.querySelector('.novo-select-search-inner .novo-select-search-input');
          const searchInner = document.querySelector('.novo-select-search-inner');
          expect(searchInner).toBeTruthy();
          expect(searchField).toBeTruthy();
          // check focus
          expect(searchField).toBe(document.activeElement);

          const optionElements = document.querySelectorAll('novo-option');
          expect(component.novoSelect.contentOptions.length).toBe(4);
          expect(optionElements.length).toBe(4);

          done();
        });
      });
    });

    it('should filter the options available and hightlight the first option in the list, filter the options by input "c" and reset the list', (done) => {
      component.filteredBanks.pipe(take(1), delay(1)).subscribe(() => {
        // when the filtered banks are initialized
        fixture.detectChanges();

        component.novoSelect.openPanel();
        fixture.detectChanges();

        component.novoSelect.openedChange.pipe(take(1)).subscribe((opened) => {
          expect(opened).toBe(true);
          const searchField = document.querySelector('.novo-select-search-inner .novo-select-search-input');
          expect(searchField).toBeTruthy();

          expect(component.novoSelect.contentOptions.length).toBe(4);

          // search for "c"
          component.novoSelectSearch._formControl.setValue('c');
          fixture.detectChanges();

          expect(component.bankFilterCtrl.value).toBe('c');
          expect(component.novoSelect.panelOpen).toBe(true);

          component.filteredBanks.pipe(take(1)).subscribe(() => {
            fixture.detectChanges();

            setTimeout(() => {
              expect(component.novoSelect.contentOptions.length).toBe(2);
              expect(component.novoSelect.contentOptions.first.value.id).toBe('C');
              expect(component.novoSelect.contentOptions.first.active).toBe(true);

              component.novoSelectSearch._reset(true);
              fixture.detectChanges();

              // check focus
              expect(searchField).toBe(document.activeElement);
              expect(component.novoSelect.panelOpen).toBe(true);

              component.filteredBanks.pipe(take(1)).subscribe(() => {
                fixture.detectChanges();
                if (component.novoSelectSearch.clearSearchInput) {
                  expect(component.novoSelect.contentOptions.length).toBe(4);
                } else {
                  expect(component.novoSelect.contentOptions.length).toBe(2);
                }

                done();
              });
            });
          });
        });
      });
    });

    it('should not announce active option if there are no options', (done) => {
      const announcer = TestBed.inject(LiveAnnouncer);
      component.filteredBanks.pipe(take(1), delay(1)).subscribe(() => {
        // when the filtered banks are initialized
        fixture.detectChanges();

        component.novoSelect.openPanel();
        fixture.detectChanges();

        component.novoSelect.openedChange.pipe(take(1)).subscribe((opened) => {
          // search for "something definitely not in the list"
          component.novoSelectSearch._formControl.setValue('something definitely not in the list');
          fixture.detectChanges();

          component.filteredBanks.pipe(take(1)).subscribe(() => {
            fixture.detectChanges();

            setTimeout(() => {
              expect(component.novoSelect.contentOptions.length).toBe(0);

              component.novoSelectSearch._handleKeyup({ keyCode: DOWN_ARROW } as KeyboardEvent);
              expect(announcer.announce).not.toHaveBeenCalled();
              done();
            });
          });
        });
      });
    });

    describe('inside novo-option', () => {
      it('should show a search field and focus it when opening the select', (done) => {
        component.filteredBanksMatOption.pipe(take(1), delay(1)).subscribe(() => {
          // when the filtered banks are initialized
          fixture.detectChanges();

          component.novoSelectOption.openPanel();
          fixture.detectChanges();

          component.novoSelectOption.openedChange.pipe(take(1), delay(1)).subscribe((opened) => {
            expect(opened).toBe(true);
            const searchField = document.querySelector('.novo-select-search-inner .novo-select-search-input');
            const searchInner = document.querySelector('.novo-select-search-inner');
            expect(searchInner).toBeTruthy();
            expect(searchField).toBeTruthy();
            // check focus
            expect(searchField).toBe(document.activeElement);

            const optionElements = document.querySelectorAll('novo-option');
            expect(component.novoSelectOption.contentOptions.length).toBe(5);
            expect(optionElements.length).toBe(5);

            done();
          });
        });
      });

      it('should filter the options available and hightlight the first option in the list, filter the options by input "c" and reset the list', (done) => {
        component.filteredBanksMatOption.pipe(take(1), delay(1)).subscribe(() => {
          // when the filtered banks are initialized
          fixture.detectChanges();

          component.novoSelectOption.openPanel();
          fixture.detectChanges();

          component.novoSelectOption.openedChange.pipe(take(1)).subscribe((opened) => {
            expect(opened).toBe(true);
            const searchField = document.querySelector('.novo-select-search-inner .novo-select-search-input');
            expect(searchField).toBeTruthy();

            expect(component.novoSelectOption.contentOptions.length).toBe(5);

            // search for "c"
            component.novoSelectSearchMatOption._formControl.setValue('c');
            fixture.detectChanges();

            expect(component.bankFilterCtrlMatOption.value).toBe('c');
            expect(component.novoSelectOption.panelOpen).toBe(true);

            component.filteredBanks.pipe(take(1)).subscribe(() => {
              fixture.detectChanges();

              setTimeout(() => {
                expect(component.novoSelectOption.contentOptions.length).toBe(3);
                expect(component.novoSelectOption.contentOptions.toArray()[1].value.id).toBe('C');
                expect(component.novoSelectOption.contentOptions.toArray()[1].active).toBe(true);

                component.novoSelectSearchMatOption._reset(true);
                fixture.detectChanges();

                // check focus
                expect(searchField).toBe(document.activeElement);
                expect(component.novoSelectOption.panelOpen).toBe(true);

                component.filteredBanks.pipe(take(1)).subscribe(() => {
                  fixture.detectChanges();
                  expect(component.novoSelectOption.contentOptions.length).toBe(5);

                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('with initial selection', () => {
    it('should set the initial selection of NovoSelectElement', async((done) => {
      component.initialSingleSelection = component.banks[3];
      fixture.detectChanges();

      component.filteredBanks.pipe(take(1), delay(1)).subscribe(() => {
        // when the filtered banks are initialized
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          component.novoSelect.contentOptions.changes.pipe(take(1)).subscribe(() => {
            expect(component.novoSelect.value).toEqual(component.banks[3]);

            component.novoSelect.openPanel();
            fixture.detectChanges();

            component.novoSelect.openedChange.pipe(take(1)).subscribe((opened) => {
              expect(opened).toBe(true);
              expect(component.novoSelect.value).toEqual(component.banks[3]);
              expect(component.bankCtrl.value).toEqual(component.banks[3]);

              done();
            });
          });
        });
      });
    }));

    it('set the initial selection with multi=true and filter the options available, filter the options by input "c" and select an option', async((
      done,
    ) => {
      component.initialMultiSelection = [component.banks[1]];
      fixture.detectChanges();

      component.filteredBanksMulti.pipe(take(1), delay(1)).subscribe(() => {
        // when the filtered banks are initialized
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          component.novoSelect.contentOptions.changes.pipe(take(1)).subscribe(() => {
            component.novoSelectMulti.openPanel();
            fixture.detectChanges();

            component.novoSelectMulti.openedChange.pipe(take(1)).subscribe((opened) => {
              expect(opened).toBe(true);
              expect(component.novoSelectMulti.value).toEqual([component.banks[1]]);
              expect(component.bankMultiCtrl.value).toEqual([component.banks[1]]);

              const searchField = document.querySelector('.novo-select-search-inner .novo-select-search-input');
              expect(searchField).toBeTruthy();

              expect(component.novoSelectMulti.contentOptions.length).toBe(4);

              // search for "c"
              component.novoSelectSearchMulti._formControl.setValue('c');
              fixture.detectChanges();

              expect(component.bankFilterCtrl.value).toBe('c');
              expect(component.novoSelectMulti.panelOpen).toBe(true);

              component.filteredBanks.pipe(take(1)).subscribe(() => {
                fixture.detectChanges();

                setTimeout(() => {
                  expect(component.novoSelectMulti.contentOptions.length).toBe(2);
                  expect(component.novoSelectMulti.contentOptions.first.value.id).toBe('C');
                  expect(component.novoSelectMulti.contentOptions.first.active).toBe(true);

                  component.novoSelectMulti.contentOptions.first._selectViaInteraction();

                  fixture.detectChanges();

                  // check focus
                  expect(component.novoSelectMulti.panelOpen).toBe(true);

                  setTimeout(() => {
                    fixture.detectChanges();
                    expect(component.novoSelectMulti.value).toEqual([component.banks[1], component.banks[2]]);
                    expect(component.bankMultiCtrl.value).toEqual([component.banks[1], component.banks[2]]);

                    // search for "d"
                    component.novoSelectSearchMulti._formControl.setValue('d');
                    fixture.detectChanges();

                    expect(component.bankFilterCtrl.value).toBe('d');
                    expect(component.novoSelectMulti.panelOpen).toBe(true);

                    component.filteredBanks.pipe(take(1)).subscribe(() => {
                      fixture.detectChanges();

                      setTimeout(() => {
                        expect(component.novoSelectMulti.contentOptions.length).toBe(1);
                        expect(component.novoSelectMulti.contentOptions.first.value.id).toBe('DC');
                        expect(component.novoSelectMulti.contentOptions.first.active).toBe(true);

                        component.novoSelectMulti.contentOptions.first._selectViaInteraction();

                        fixture.detectChanges();

                        // check focus
                        expect(component.novoSelectMulti.panelOpen).toBe(true);

                        setTimeout(() => {
                          fixture.detectChanges();
                          expect(component.novoSelectMulti.value).toEqual([component.banks[1], component.banks[2], component.banks[3]]);
                          expect(component.bankMultiCtrl.value).toEqual([component.banks[1], component.banks[2], component.banks[3]]);
                          done();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }));
  });
});
