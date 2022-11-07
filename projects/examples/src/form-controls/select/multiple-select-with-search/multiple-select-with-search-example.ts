import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NovoSelectElement } from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { State, STATES } from '../states.data';

/**
 * @title Multiple Select With Search Example
 */
@Component({
  selector: 'multiple-select-with-search-example',
  templateUrl: 'multiple-select-with-search-example.html',
  styleUrls: ['multiple-select-with-search-example.css'],
})
export class MultipleSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
  /** list of states */
  protected states: State[] = STATES;

  /** control for the selected state for multi-selection */
  public stateMultiCtrl: FormControl = new FormControl();

  /** control for the NovoSelect filter keyword multi-selection */
  public stateMultiFilterCtrl: FormControl = new FormControl();

  /** list of states filtered by search keyword */
  public filteredStatesMulti: ReplaySubject<State[]> = new ReplaySubject<State[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: NovoSelectElement;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    // set initial selection
    this.stateMultiCtrl.setValue([this.states[10], this.states[11], this.states[12]]);

    // load the initial state list
    this.filteredStatesMulti.next(this.states.slice());

    // listen for search field value changes
    this.stateMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterStatesMulti();
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
    this.filteredStatesMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredStates are loaded initially
      // and after the novo-option elements are available
      this.multiSelect.compareWith = (a: State, b: State) => a && b && a.code === b.code;
    });
  }

  protected filterStatesMulti() {
    if (!this.states) {
      return;
    }
    // get the search keyword
    let search = this.stateMultiFilterCtrl.value;
    if (!search) {
      this.filteredStatesMulti.next(this.states.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the states
    this.filteredStatesMulti.next(this.states.filter((state) => state.name.toLowerCase().indexOf(search) > -1));
  }
}
