import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NovoSelectElement } from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { State, STATES } from '../states.data';
/**
 * @title Basic Select With Search Example
 */
@Component({
  selector: 'basic-select-with-search-example',
  templateUrl: 'basic-select-with-search-example.html',
  styleUrls: ['basic-select-with-search-example.css'],
})
export class BasicSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
  /** list of states */
  protected states: State[] = STATES;

  /** control for the selected state */
  public stateCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public stateFilterCtrl: FormControl = new FormControl();

  /** list of states filtered by search keyword */
  public filteredStates: ReplaySubject<State[]> = new ReplaySubject<State[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: NovoSelectElement;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    // set initial selection
    this.stateCtrl.setValue(this.states[10]);

    // load the initial state list
    this.filteredStates.next(this.states.slice());

    // listen for search field value changes
    this.stateFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterStates();
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
   * Sets the initial value after the filteredStates are loaded initially
   */
  protected setInitialValue() {
    this.filteredStates.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredStates are loaded initially
      // and after the mat-option elements are available
      this.singleSelect.compareWith = (a: State, b: State) => a && b && a.code === b.code;
    });
  }

  protected filterStates() {
    if (!this.states) {
      return;
    }
    // get the search keyword
    let search = this.stateFilterCtrl.value;
    if (!search) {
      this.filteredStates.next(this.states.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the states
    this.filteredStates.next(this.states.filter((state) => state.name.toLowerCase().indexOf(search) > -1));
  }
}
