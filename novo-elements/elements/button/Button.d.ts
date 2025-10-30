import { ElementRef, OnChanges, Signal, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoButtonElement implements OnChanges {
    element: ElementRef;
    /**
     * The text color of the button. Should be used for Icon buttons. see theme.
     */
    color: string;
    /**
     * The side of the button to display the icon.
     */
    side: string;
    /**
     * If a second icon is specified it will default to the opposite side as the primary icon.
     */
    secondSide: Signal<string>;
    /**
     * 	Sets the size of the button. One of: sm, lg
     */
    size: string;
    /**
     * The base styling to apply to the button.
     */
    theme: string;
    /**
     * Conditionally show a spinner over the top of a button.
     */
    loading: boolean;
    /**
     * Optionally display `bullhorn-icon` with the button along with the text.
     */
    set icon(icon: string);
    get icon(): string;
    /**
     * A second icon can be specified, and it will take the opposite side of the primary icon.
     */
    set secondIcon(icon: string);
    get secondIcon(): string;
    leftSideIconClass: Signal<string>;
    rightSideIconClass: Signal<string>;
    /**
     * Make the button non-interactive.
     */
    disabled: boolean;
    disabledAttr: undefined | '';
    private _icon;
    private _secondIcon;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    handleKeydown(event: KeyboardEvent): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoButtonElement, "novo-button,button[theme]", never, { "color": { "alias": "color"; "required": false; }; "side": { "alias": "side"; "required": false; }; "size": { "alias": "size"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "secondIcon": { "alias": "secondIcon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}
