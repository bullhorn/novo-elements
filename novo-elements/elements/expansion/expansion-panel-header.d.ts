import { ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { NovoExpansionPanel } from './expansion-panel';
import * as i0 from "@angular/core";
/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
export declare class NovoExpansionPanelHeader implements OnDestroy {
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
export declare class NovoExpansionPanelDescription {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelDescription, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelDescription, "novo-panel-description", never, {}, {}, never, never, false, never>;
}
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export declare class NovoExpansionPanelTitle {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExpansionPanelTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoExpansionPanelTitle, "novo-panel-title", never, {}, {}, never, never, false, never>;
}
