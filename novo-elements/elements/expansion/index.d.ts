import * as i6 from '@angular/cdk/accordion';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import * as i0 from '@angular/core';
import { TemplateRef, AfterContentInit, OnChanges, OnDestroy, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewContainerRef, ElementRef } from '@angular/core';
import { AnimationTriggerMetadata, AnimationEvent } from '@angular/animations';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import * as i7 from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import * as i5 from '@angular/common';

/** NovoAccordion's display modes. */
type NovoAccordionDisplayMode = 'default' | 'flat';
/**
 * Directive for a Material Design Accordion.
 */
declare class NovoAccordion extends CdkAccordion {
    /** Whether the expansion indicator should be hidden. */
    get hideToggle(): boolean;
    set hideToggle(show: boolean);
    private _hideToggle;
    /**
     * The display mode used for all expansion panels in the accordion. Currently two display
     * modes exist:
     *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
     *     panel at a different elevation from the reset of the accordion.
     *  flat - no spacing is placed around expanded panels, showing all panels at the same
     *     elevation.
     */
    displayMode: NovoAccordionDisplayMode;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAccordion, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoAccordion, "novo-accordion", ["novoAccordion"], { "hideToggle": { "alias": "hideToggle"; "required": false; }; "displayMode": { "alias": "displayMode"; "required": false; }; }, {}, never, never, false, never>;
}

/** Time and timing curve for expansion panel animations. */
declare const EXPANSION_PANEL_ANIMATION_TIMING = "225ms cubic-bezier(0.4,0.0,0.2,1)";
/** Animations used by the Material expansion panel. */
declare const novoExpansionAnimations: {
    readonly indicatorRotate: AnimationTriggerMetadata;
    readonly expansionHeaderHeight: AnimationTriggerMetadata;
    readonly bodyExpansion: AnimationTriggerMetadata;
};

/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
declare class NovoExpansionPanelContent {
    _template: TemplateRef<any>;
    constructor(_template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelContent, "ng-template[matExpansionPanelContent]", never, {}, {}, never, never, false, never>;
}

/** NovoExpansionPanel's states. */
type NovoExpansionPanelState = 'expanded' | 'collapsed';
/**
 * `<novo-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the NovoAccordion directive attached.
 */
declare class NovoExpansionPanel extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {
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
declare class NovoExpansionPanelActionRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelActionRow, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelActionRow, "novo-action-row", never, {}, {}, never, never, false, never>;
}

/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
declare class NovoExpansionPanelHeader implements OnDestroy {
    panel: NovoExpansionPanel;
    private _element;
    private _changeDetectorRef;
    private _parentChangeSubscription;
    constructor(panel: NovoExpansionPanel, _element: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    /** Height of the header while the panel is expanded. */
    expandedHeight: string;
    /** Height of the header while the panel is collapsed. */
    collapsedHeight: string;
    /** Toggles the expanded state of the panel. */
    _toggle(): void;
    /** Gets whether the panel is expanded. */
    _isExpanded(): boolean;
    /** Gets the expanded state string of the panel. */
    _getExpandedState(): string;
    /** Gets the panel id. */
    _getPanelId(): string;
    /** Gets whether the expand indicator should be shown. */
    _showToggle(): boolean;
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelHeader, [{ host: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoExpansionPanelHeader, "novo-expansion-panel-header", never, { "expandedHeight": { "alias": "expandedHeight"; "required": false; }; "collapsedHeight": { "alias": "collapsedHeight"; "required": false; }; }, {}, never, ["novo-panel-title", "novo-panel-description", "*"], false, never>;
}
/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
declare class NovoExpansionPanelDescription {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelDescription, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelDescription, "novo-panel-description", never, {}, {}, never, never, false, never>;
}
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
declare class NovoExpansionPanelTitle {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelTitle, "novo-panel-title", never, {}, {}, never, never, false, never>;
}

declare class NovoExpansionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoExpansionModule, [typeof NovoAccordion, typeof NovoExpansionPanel, typeof NovoExpansionPanelActionRow, typeof NovoExpansionPanelHeader, typeof NovoExpansionPanelTitle, typeof NovoExpansionPanelDescription, typeof NovoExpansionPanelContent], [typeof i5.CommonModule, typeof i6.CdkAccordionModule, typeof i7.PortalModule], [typeof NovoAccordion, typeof NovoExpansionPanel, typeof NovoExpansionPanelActionRow, typeof NovoExpansionPanelHeader, typeof NovoExpansionPanelTitle, typeof NovoExpansionPanelDescription, typeof NovoExpansionPanelContent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoExpansionModule>;
}

export { EXPANSION_PANEL_ANIMATION_TIMING, NovoAccordion, NovoExpansionModule, NovoExpansionPanel, NovoExpansionPanelActionRow, NovoExpansionPanelContent, NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle, novoExpansionAnimations };
export type { NovoAccordionDisplayMode, NovoExpansionPanelState };
