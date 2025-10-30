import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoSelectElement } from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { State } from '../states.data';
import * as i0 from "@angular/core";
/**
 * @title Multiple Select With Search Example
 */
export declare class MultipleSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
    /** list of states */
    protected states: State[];
    /** control for the selected state for multi-selection */
    stateMultiCtrl: UntypedFormControl;
    /** control for the NovoSelect filter keyword multi-selection */
    stateMultiFilterCtrl: UntypedFormControl;
    /** list of states filtered by search keyword */
    filteredStatesMulti: ReplaySubject<State[]>;
    multiSelect: NovoSelectElement;
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy: Subject<void>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Sets the initial value after the filteredStates are loaded initially
     */
    protected setInitialValue(): void;
    protected filterStatesMulti(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultipleSelectWithSearchExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultipleSelectWithSearchExample, "multiple-select-with-search-example", never, {}, {}, never, never, false, never>;
}
