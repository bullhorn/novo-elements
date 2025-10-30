import { AnimationEvent } from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoAccordion } from './accordion';
import { NovoExpansionPanelContent } from './expansion-panel-content';
import * as i0 from "@angular/core";
/** NovoExpansionPanel's states. */
export type NovoExpansionPanelState = 'expanded' | 'collapsed';
/**
 * `<novo-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the NovoAccordion directive attached.
 */
export declare class NovoExpansionPanel extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {
    private _viewContainerRef;
    /** Whether the toggle indicator should be hidden. */
    get hideToggle(): boolean;
    set hideToggle(value: boolean);
    private _hideToggle;
    get padding(): boolean;
    set padding(value: boolean);
    private _padding;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    expandedChange: EventEmitter<boolean>;
    /** Stream that emits for changes in `@Input` properties. */
    readonly _inputChanges: Subject<SimpleChanges>;
    /** Optionally defined accordion the expansion panel belongs to. */
    accordion: NovoAccordion;
    /** Content that will be rendered lazily. */
    _lazyContent: NovoExpansionPanelContent;
    /** Portal holding the user's content. */
    _portal: TemplatePortal;
    /** ID for the associated header element. Used for a11y labelling. */
    _headerId: string;
    constructor(accordion: NovoAccordion, _changeDetectorRef: ChangeDetectorRef, _uniqueSelectionDispatcher: UniqueSelectionDispatcher, _viewContainerRef: ViewContainerRef);
    /** Whether the expansion indicator should be hidden. */
    _getHideToggle(): boolean;
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    _hasSpacing(): boolean;
    /** Gets the expanded state string. */
    _getExpandedState(): NovoExpansionPanelState;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    _bodyAnimation(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanel, [{ optional: true; host: true; }, null, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoExpansionPanel, "novo-expansion-panel", ["novoExpansionPanel"], { "hideToggle": { "alias": "hideToggle"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, { "opened": "opened"; "closed": "closed"; "expandedChange": "expandedChange"; }, ["_lazyContent"], ["novo-expansion-panel-header", "*", "novo-action-row"], false, never>;
}
export declare class NovoExpansionPanelActionRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelActionRow, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelActionRow, "novo-action-row", never, {}, {}, never, never, false, never>;
}
