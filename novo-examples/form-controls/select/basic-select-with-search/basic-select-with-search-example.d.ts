import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoSelectElement } from 'novo-elements';
import { ReplaySubject, Subject } from 'rxjs';
import { State } from '../states.data';
import * as i0 from "@angular/core";
/**
 * @title Basic Select With Search Example
 */
export declare class BasicSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
    /** list of states */
    protected states: State[];
    /** control for the selected state */
    stateCtrl: UntypedFormControl;
    /** control for the MatSelect filter keyword */
    stateFilterCtrl: UntypedFormControl;
    /** list of states filtered by search keyword */
    filteredStates: ReplaySubject<State[]>;
    singleSelect: NovoSelectElement;
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
    protected filterStates(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicSelectWithSearchExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicSelectWithSearchExample, "basic-select-with-search-example", never, {}, {}, never, never, false, never>;
}
